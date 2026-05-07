// Grading Architecture Plans
// This file contains architecture notes and stubs for future automatic grading
// DO NOT implement actual automatic grading yet
// DO NOT claim AI grading as official
// Current implementation uses manual self-scoring only

export type GradingMode = "manual" | "exact-output-later" | "unit-test-later" | "ai-assisted-later";

/**
 * Current grading mode: manual
 * The app currently uses manual self-scoring with user input
 */
export const CURRENT_GRADING_MODE: GradingMode = "manual";

/**
 * Manual Self-Scoring (Current Implementation)
 * 
 * The practice exam page allows users to:
 * - Mark each question as "Nem tudom", "Részben", or "Tudom"
 * - See estimated score calculation
 * - View status (Gyenge <50%, Átmenő közelében 50-65%, Rendben 65-80%, Erős 80%+)
 * 
 * Important: This is NOT an official grade
 * - It's for self-assessment only
 * - It's not validated by instructors
 * - It's meant for study support
 */
export const MANUAL_GRADING = {
  mode: "manual",
  features: [
    "User self-assessment per question",
    "Three levels: Nem tudom (0%), Részben (50%), Tudom (100%)",
    "Estimated score calculation",
    "Status badges (Gyenge, Átmenő közelében, Rendben, Erős)"
  ],
  disclaimer: "Önértékelés, nem hivatalos pontszám",
  benefits: [
    "User maintains control",
    "No backend required",
    "Transparent calculation",
    "Encourages honest self-assessment"
  ]
};

/**
 * Future Exact Output Grading Plan
 * 
 * Exact output grading would compare:
 * - User code output vs expected output
 * - String matching with tolerance
 * - Numerical value comparison
 * 
 * Use cases:
 * - Simple coding exercises with known output
 * - Algorithm verification
 * - Basic function testing
 * 
 * Limitations:
 * - Not suitable for open-ended problems
 * - May miss alternative correct solutions
 * - Requires careful test case design
 */
export const EXACT_OUTPUT_GRADING_PLAN = {
  status: "planned",
  useCases: [
    "Simple coding exercises",
    "Algorithm verification",
    "Function output testing"
  ],
  limitations: [
    "Rigid matching",
    "May miss alternative solutions",
    "Not suitable for creative problems"
  ],
  requirements: [
    "Expected output definitions",
    "Tolerance mechanisms",
    "Multiple test cases",
    "Clear pass/fail criteria"
  ]
};

/**
 * Future Unit Test Based Grading Plan
 * 
 * Unit test grading would run:
 * - Predefined test suites
 * - Assert statements
 * - Edge case coverage
 * 
 * Use cases:
 * - Complete function implementations
 * - Class implementations
 * - Project submissions
 * 
 * Benefits:
 * - More comprehensive than exact output
 * - Can test edge cases
 * - Standard in software development
 * 
 * Requirements:
 * - Code execution infrastructure (see code-execution-plans.ts)
 * - Test suite definitions
 * - Timeout handling
 * - Error reporting
 */
export const UNIT_TEST_GRADING_PLAN = {
  status: "planned",
  useCases: [
    "Complete function implementations",
    "Class implementations",
    "Project submissions"
  ],
  benefits: [
    "Comprehensive testing",
    "Edge case coverage",
    "Industry standard"
  ],
  requirements: [
    "Code execution infrastructure",
    "Test suite definitions",
    "Timeout handling",
    "Error reporting",
    "Test isolation"
  ],
  dependencies: [
    "code-execution-plans.ts implementation",
    "Test framework selection"
  ]
};

/**
 * Future AI Assisted Grading Plan
 * 
 * AI assisted grading would use:
 * - LLM for code review
 * - Pattern recognition
 * - Natural language feedback
 * 
 * Important considerations:
 * - NEVER treat AI grading as official
 * - Always indicate it's AI-assisted, not official
 * - Use for feedback only, not final grades
 * - Human review required for official assessment
 * 
 * Use cases:
 * - Code style feedback
 * - Algorithm suggestions
 * - Explanation generation
 * - Learning guidance
 * 
 * Risks:
 * - AI may make mistakes
 * - Bias in AI models
 * - Over-reliance on AI
 * - Privacy concerns with code submission
 */
export const AI_ASSISTED_GRADING_PLAN = {
  status: "planned",
  useCases: [
    "Code style feedback",
    "Algorithm suggestions",
    "Explanation generation",
    "Learning guidance"
  ],
  disclaimer: "AI segítséggel, nem hivatalos értékelés",
  risks: [
    "AI may make mistakes",
    "Bias in AI models",
    "Over-reliance on AI",
    "Privacy concerns with code submission"
  ],
  requirements: [
    "Clear AI usage disclosure",
    "Human review process",
    "Privacy protection",
    "Rate limiting",
    "Cost management"
  ],
  principles: [
    "AI for feedback, not final grades",
    "Always indicate AI assistance",
    "Human review for official assessment",
    "User consent required"
  ]
};

/**
 * Grading Principles
 * 
 * Core principles for any future grading implementation:
 */
export const GRADING_PRINCIPLES = {
  transparency: "Always clearly indicate how grading works",
  accuracy: "Acknowledge limitations and potential errors",
  privacy: "Protect user code and submissions",
  fairness: "Avoid bias in automated grading",
  humanOversight: "Human review for official assessment",
  educationalFocus: "Grading for learning, not punishment",
  userControl: "User maintains control over their learning"
};
