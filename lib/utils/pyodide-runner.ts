import { validateCode, sanitizeOutput, SANDBOX_POLICY } from "./python-sandbox-policy";
import type { CodingQuestionTestSuite } from "@/lib/mock-data/coding-test-cases";
import { generateTestWrapper, parseTestResults } from "./code-grading";

export type ExecutionResult = {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
};

export type TestExecutionResult = ExecutionResult & {
  testResults?: any[];
};

let pyodideInstance: any | null = null;
let pyodideLoadingPromise: Promise<any> | null = null;

async function loadPyodideFromCDN(): Promise<any> {
  // Load Pyodide from CDN dynamically (only works in browser)
  const pyodide = await (window as any).loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
  });
  // Load micropip package
  await pyodide.loadPackage("micropip");
  return pyodide;
}

export async function getPyodideInstance(): Promise<any> {
  // Check if we're in browser
  if (typeof window === "undefined") {
    throw new Error("A Python futtatás csak böngészőben támogatott.");
  }

  // Return cached instance if available
  if (pyodideInstance) {
    return pyodideInstance;
  }

  // Return loading promise if already loading
  if (pyodideLoadingPromise) {
    return pyodideLoadingPromise;
  }

  // Start loading and cache the promise
  pyodideLoadingPromise = loadPyodideFromCDN()
    .then((pyodide) => {
      pyodideInstance = pyodide;
      return pyodide;
    })
    .catch((error) => {
      pyodideLoadingPromise = null;
      console.error("Error loading Pyodide:", error);
      throw new Error("Nem sikerült betölteni a Pyodide-ot. Ellenőrizd, hogy böngészőben vagy.");
    });

  return pyodideLoadingPromise;
}

async function setupStdoutStderrCapture(pyodide: any): Promise<{ stdout: string; stderr: string }> {
  let stdout = "";
  let stderr = "";

  // Try to use setStdout/setStderr if available (Pyodide v0.23+)
  if (pyodide.setStdout && typeof pyodide.setStdout === "function") {
    try {
      pyodide.setStdout({
        batched: (text: string) => {
          stdout += text + "\n";
        },
      });
    } catch (e) {
      console.warn("setStdout failed, using fallback:", e);
    }
  }

  if (pyodide.setStderr && typeof pyodide.setStderr === "function") {
    try {
      pyodide.setStderr({
        batched: (text: string) => {
          stderr += text + "\n";
        },
      });
    } catch (e) {
      console.warn("setStderr failed, using fallback:", e);
    }
  }

  // If setStdout/setStderr are not available or failed, use Python-side StringIO fallback
  if (!pyodide.setStdout || typeof pyodide.setStdout !== "function") {
    try {
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);
    } catch (e) {
      console.warn("Python-side stdout/stderr setup failed:", e);
    }
  }

  return { stdout, stderr };
}

async function getCapturedOutput(pyodide: any, localStdout: string, localStderr: string): Promise<string> {
  let output = localStdout + localStderr;

  // If we used Python-side StringIO fallback, retrieve the output
  if (!pyodide.setStdout || typeof pyodide.setStdout !== "function") {
    try {
      const pythonOutput = pyodide.runPython(`
import sys
stdout_content = sys.stdout.getvalue()
stderr_content = sys.stderr.getvalue()
sys.stdout = StringIO()
sys.stderr = StringIO()
f"{stdout_content}\\n{stderr_content}"
      `);
      output = pythonOutput || output;
    } catch (e) {
      console.warn("Failed to retrieve Python-side output:", e);
    }
  }

  return output;
}

export async function executePythonCode(
  code: string,
  input: string = ""
): Promise<ExecutionResult> {
  const startTime = Date.now();

  try {
    // Validate code before execution
    const validation = validateCode(code);
    if (!validation.valid) {
      return {
        success: false,
        output: "",
        error: validation.error || "A kód validálása sikertelen.",
        executionTime: Date.now() - startTime,
      };
    }

    // Load Pyodide with robust singleton
    const pyodide = await getPyodideInstance();

    // Set up stdout/stderr capture
    const { stdout: localStdout, stderr: localStderr } = await setupStdoutStderrCapture(pyodide);

    // Execute with timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Időtúllépés: a kód futtatása túl sokáig tart.")), SANDBOX_POLICY.maxExecutionTime);
    });

    const executionPromise = (async () => {
      try {
        // Redirect stdin if input is provided
        if (input) {
          pyodide.runPython(`
import sys
from io import StringIO
sys.stdin = StringIO("${input.replace(/"/g, '\\"')}")
          `);
        }

        // Execute user code
        pyodide.runPython(code);
      } catch (error) {
        throw error;
      }
    })();

    await Promise.race([executionPromise, timeoutPromise]);

    // Get captured output
    const output = await getCapturedOutput(pyodide, localStdout, localStderr);
    const sanitizedOutput = sanitizeOutput(output);

    return {
      success: true,
      output: sanitizedOutput || "Kód sikeresen futtatva (nincs kimenet).",
      executionTime: Date.now() - startTime,
    };
  } catch (error) {
    let errorMessage = "Ismeretlen hiba történt.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Provide user-friendly Hungarian error messages
    if (errorMessage.includes("Pyodide") || errorMessage.includes("loadPyodide")) {
      errorMessage = "A Python futtató még nem töltött be.";
    } else if (errorMessage.includes("syntax") || errorMessage.includes("SyntaxError")) {
      errorMessage = "Szintaktikai hiba a kódban.";
    } else if (errorMessage.includes("NameError") || errorMessage.includes("name")) {
      errorMessage = "Hiányzó változó vagy függvény.";
    } else if (errorMessage.includes("timeout") || errorMessage.includes("Időtúllépés")) {
      errorMessage = "A kód futtatása túl sokáig tartott.";
    }

    return {
      success: false,
      output: "",
      error: errorMessage,
      executionTime: Date.now() - startTime,
    };
  }
}

export function resetPyodide(): void {
  pyodideInstance = null;
  pyodideLoadingPromise = null;
}

export function isPyodideLoaded(): boolean {
  return pyodideInstance !== null;
}

export async function runPythonWithTests(
  code: string,
  testSuite: CodingQuestionTestSuite
): Promise<TestExecutionResult> {
  const startTime = Date.now();

  try {
    // Validate code before execution
    const validation = validateCode(code);
    if (!validation.valid) {
      return {
        success: false,
        output: "",
        error: validation.error || "A kód validálása sikertelen.",
        executionTime: Date.now() - startTime,
      };
    }

    // Load Pyodide with robust singleton
    const pyodide = await getPyodideInstance();

    // Generate test wrapper code
    const wrappedCode = generateTestWrapper(code, testSuite);

    // Set up stdout/stderr capture
    const { stdout: localStdout, stderr: localStderr } = await setupStdoutStderrCapture(pyodide);

    // Execute with timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Időtúllépés: a kód futtatása túl sokáig tart.")), SANDBOX_POLICY.maxExecutionTime);
    });

    const executionPromise = (async () => {
      try {
        // Execute wrapped code with tests
        pyodide.runPython(wrappedCode);
      } catch (error) {
        throw error;
      }
    })();

    await Promise.race([executionPromise, timeoutPromise]);

    // Get captured output
    const output = await getCapturedOutput(pyodide, localStdout, localStderr);

    // Parse test results from stdout
    const testResults = parseTestResults(output.trim());
    const sanitizedOutput = sanitizeOutput(output);

    return {
      success: true,
      output: sanitizedOutput || "Tesztek sikeresen futtatva.",
      executionTime: Date.now() - startTime,
      testResults,
    };
  } catch (error) {
    let errorMessage = "Ismeretlen hiba történt.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Provide user-friendly Hungarian error messages
    if (errorMessage.includes("Pyodide") || errorMessage.includes("loadPyodide")) {
      errorMessage = "A Python futtató még nem töltött be.";
    } else if (errorMessage.includes("syntax") || errorMessage.includes("SyntaxError")) {
      errorMessage = "Szintaktikai hiba a kódban.";
    } else if (errorMessage.includes("NameError") || errorMessage.includes("name")) {
      errorMessage = "Hiányzó változó vagy függvény.";
    } else if (errorMessage.includes("timeout") || errorMessage.includes("Időtúllépés")) {
      errorMessage = "A kód futtatása túl sokáig tartott.";
    } else if (errorMessage.includes("AssertionError")) {
      errorMessage = "Egy vagy több teszt nem sikerült.";
    }

    return {
      success: false,
      output: "",
      error: errorMessage,
      executionTime: Date.now() - startTime,
    };
  }
}
