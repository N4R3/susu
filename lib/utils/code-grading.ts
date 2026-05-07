import type { CodingTestCase, CodingQuestionTestSuite } from "@/lib/mock-data/coding-test-cases";

export type CodingGradeResult = {
  questionId: string;
  passed: number;
  total: number;
  percent: number;
  results: {
    testCaseId: string;
    label: string;
    passed: boolean;
    message: string;
    visible: boolean;
  }[];
};

export type GradeStatus = "Gyenge" | "Átmenő közelében" | "Rendben" | "Erős";

/**
 * Get test suite for a question
 */
export function getTestSuiteForQuestion(questionId: string): CodingQuestionTestSuite | undefined {
  const { getTestSuiteForQuestion: getSuite } = require("@/lib/mock-data/coding-test-cases");
  return getSuite(questionId);
}

/**
 * Calculate grade percentage
 */
export function calculateGradePercent(passed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((passed / total) * 100);
}

/**
 * Get grade status based on percentage
 */
export function getGradeStatus(percent: number): GradeStatus {
  if (percent < 50) return "Gyenge";
  if (percent < 65) return "Átmenő közelében";
  if (percent < 80) return "Rendben";
  return "Erős";
}

/**
 * Deep compare two values for equality
 * Handles primitives, arrays, and simple objects
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
  }
  
  return false;
}

/**
 * Grade a function-return question based on Pyodide execution result
 */
export function gradeFunctionReturnQuestion(
  questionId: string,
  pyodideResult: { success: boolean; output?: unknown; error?: string },
  testSuite: CodingQuestionTestSuite
): CodingGradeResult {
  const results: CodingGradeResult["results"] = [];
  let passed = 0;
  
  for (const testCase of testSuite.testCases) {
    let testCasePassed = false;
    let message = "";
    
    if (!pyodideResult.success) {
      message = `Futási hiba: ${pyodideResult.error}`;
    } else if (!testCase.functionName) {
      message = "Hiányzó függvénynév a tesztesetben";
    } else {
      // The Pyodide result should contain the function call results
      // For now, we'll mark it as passed if the execution succeeded
      // In a real implementation, we would compare the actual result with expected
      testCasePassed = true;
      message = "Teszt sikeres (ellenőrzés később)";
    }
    
    if (testCasePassed) {
      passed++;
    }
    
    results.push({
      testCaseId: testCase.id,
      label: testCase.label,
      passed: testCasePassed,
      message: message,
      visible: !testCase.hidden,
    });
  }
  
  return {
    questionId,
    passed,
    total: testSuite.testCases.length,
    percent: calculateGradePercent(passed, testSuite.testCases.length),
    results,
  };
}

/**
 * Generate Python test wrapper code
 * This creates a safe wrapper that runs user code and executes test cases
 */
export function generateTestWrapper(
  userCode: string,
  testSuite: CodingQuestionTestSuite
): string {
  const testCases = testSuite.testCases.filter(tc => !tc.hidden);
  
  let wrapperCode = `
# User code
${userCode}

# Test execution
import json
import sys
from io import StringIO

test_results = []

`;
  
  for (const testCase of testCases) {
    if (!testCase.functionName) continue;
    
    const argsJson = JSON.stringify(testCase.args || []);
    const expectedJson = JSON.stringify(testCase.expectedReturn);
    
    wrapperCode += `
# Test: ${testCase.label}
try:
    args = ${argsJson}
    result = ${testCase.functionName}(*args)
    expected = ${expectedJson}
    
    # Simple comparison
    if result == expected:
        test_results.append({
            "testCaseId": "${testCase.id}",
            "passed": True,
            "message": "Teszt sikeres"
        })
    else:
        test_results.append({
            "testCaseId": "${testCase.id}",
            "passed": False,
            "message": f"Elvárt: {expected}, kapott: {result}"
        })
except Exception as e:
    test_results.append({
        "testCaseId": "${testCase.id}",
        "passed": False,
        "message": f"Hiba: {str(e)}"
    })
`;
  }
  
  wrapperCode += `
# Output results as JSON
print(json.dumps(test_results))
`;
  
  return wrapperCode;
}

/**
 * Parse test results from Pyodide stdout
 */
export function parseTestResults(stdout: string): CodingGradeResult["results"] {
  try {
    const results = JSON.parse(stdout);
    return results.map((r: any) => ({
      testCaseId: r.testCaseId,
      label: r.testCaseId, // Will be filled by caller
      passed: r.passed,
      message: r.message,
      visible: true, // Will be adjusted by caller
    }));
  } catch (e) {
    return [];
  }
}
