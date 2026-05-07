// Python sandbox policy for controlled execution
// This defines what operations are allowed/disallowed in the Python execution environment

export const SANDBOX_POLICY = {
  // Allowed modules
  allowedModules: [
    "math",
    "random",
    "string",
    "re",
    "datetime",
    "json",
    "collections",
    "itertools",
    "functools",
  ],

  // Disallowed modules (security-sensitive)
  disallowedModules: [
    "os",
    "sys",
    "subprocess",
    "shutil",
    "pathlib",
    "io",
    "socket",
    "urllib",
    "requests",
    "http",
    "ftplib",
    "smtplib",
    "pickle",
    "shelve",
    "sqlite3",
    "eval",
    "exec",
    "compile",
    "importlib",
    "__import__",
  ],

  // Maximum execution time in milliseconds
  maxExecutionTime: 5000, // 5 seconds

  // Maximum output size in characters
  maxOutputSize: 10000,

  // Memory limit (not directly enforceable in Pyodide, but documented)
  memoryLimitMB: 128,
};

export function validateCode(code: string): { valid: boolean; error?: string } {
  const lowerCode = code.toLowerCase();

  // Check for disallowed patterns
  const disallowedPatterns = [
    /\bimport\s+os\b/,
    /\bimport\s+sys\b/,
    /\bimport\s+subprocess\b/,
    /\bfrom\s+os\s+import\b/,
    /\bfrom\s+sys\s+import\b/,
    /\bexec\s*\(/,
    /\beval\s*\(/,
    /\b__import__\s*\(/,
    /\bopen\s*\(/,
    /\bcompile\s*\(/,
  ];

  for (const pattern of disallowedPatterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: "A kód tartalmaz tiltott műveleteket (fájlrendszer, hálózat, vagy veszélyes függvények).",
      };
    }
  }

  // Check for infinite loop patterns (basic detection)
  const loopPatterns = [
    /while\s+True\s*:/,
    /for\s+\w+\s+in\s+range\s*\(\s*\d+\s*\*\s*\d+\s*\)/,
  ];

  for (const pattern of loopPatterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: "A kód tartalmaz potenciálisan végtelen ciklust.",
      };
    }
  }

  return { valid: true };
}

export function sanitizeOutput(output: string): string {
  // Truncate output if too long
  if (output.length > SANDBOX_POLICY.maxOutputSize) {
    return output.substring(0, SANDBOX_POLICY.maxOutputSize) + "\n... (többnyelvű kimenet levágva)";
  }
  return output;
}
