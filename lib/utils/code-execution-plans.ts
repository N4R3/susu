// Code Execution Architecture Plans
// This file contains architecture notes and stubs for future Python code execution
// DO NOT implement actual code execution yet
// DO NOT add Pyodide yet
// DO NOT execute arbitrary code yet

export type CodeExecutionMode = "none" | "future-pyodide" | "future-backend";

/**
 * Current execution mode: none
 * The app currently uses manual self-check and solution toggles
 */
export const CURRENT_EXECUTION_MODE: CodeExecutionMode = "none";

/**
 * Future Pyodide Execution Plan
 * 
 * Pyodide can run Python in-browser, which is useful for:
 * - Simple exercises
 * - Code demonstrations
 * - Basic algorithm testing
 * 
 * Limitations:
 * - Not good for unrestricted filesystem/network access
 * - Needs sandboxing and timeout
 * - Performance considerations for large codebases
 * 
 * Implementation considerations:
 * - Load Pyodide from CDN
 * - Set up WebWorker for isolation
 * - Implement timeout mechanism
 * - Capture stdout/stderr
 * - Handle errors gracefully
 */
export const PYODIDE_EXECUTION_PLAN = {
  status: "planned",
  reasons: [
    "Client-side execution without backend",
    "Good for simple Python exercises",
    "No server infrastructure needed"
  ],
  limitations: [
    "Filesystem access is restricted",
    "Network requests need special handling",
    "Performance overhead for large computations",
    "Requires careful timeout and memory management"
  ],
  requirements: [
    "WebWorker isolation",
    "Timeout mechanism (e.g., 10-30 seconds)",
    "Memory limits",
    "Stdout/stderr capture",
    "Error handling and user feedback"
  ]
};

/**
 * Future Backend Execution Plan
 * 
 * Backend execution would be needed for:
 * - Full filesystem access
 * - Network operations
 * - Long-running computations
 * - Complex project builds
 * 
 * Security considerations:
 * - Strong isolation required (containers, sandboxes)
 * - Resource limits (CPU, memory, disk)
 * - Network restrictions
 * - Timeouts
 * - User authentication/authorization
 */
export const BACKEND_EXECUTION_PLAN = {
  status: "planned",
  reasons: [
    "Full Python environment access",
    "Filesystem operations",
    "Network capabilities",
    "Long-running tasks"
  ],
  requirements: [
    "Container-based isolation (Docker)",
    "Resource quotas",
    "Network filtering",
    "Timeout enforcement",
    "User authentication",
    "Rate limiting"
  ],
  alternatives: [
    "AWS Lambda with timeout",
    "Google Cloud Functions",
    "Azure Container Apps",
    "Self-hosted with Docker Swarm"
  ]
};

/**
 * Current Approach: Manual Self-Check
 * 
 * For now, the app uses:
 * - Manual self-check checklists
 * - Solution toggles (hidden by default)
 * - Practice exam self-scoring
 * - Progress persistence in localStorage
 * 
 * This is sufficient for private study support without:
 * - Backend infrastructure
 * - Code execution risks
 * - Security concerns
 * - Additional complexity
 */
export const CURRENT_APPROACH = {
  method: "manual-self-check",
  features: [
    "Solution toggles",
    "Self-check checklists",
    "Practice exam self-scoring",
    "Progress persistence",
    "User-controlled pace"
  ],
  benefits: [
    "No backend required",
    "No security risks from code execution",
    "Simple and reliable",
    "User maintains control",
    "Works offline"
  ]
};

/**
 * Badge text for practice exam page
 */
export const CODE_EXECUTION_BADGE = "Automatikus kódfuttatás: később";
