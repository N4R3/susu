// User-specific subject state management
// Separates global curriculum data from user-specific progress

export type SubjectUserStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "failed"
  | "not_taken"
  | "waived";

export type SubjectVisualState =
  | "completed"
  | "in_progress"
  | "not_started"
  | "blocked"
  | "not_taken_failed";

export type UserSubjectState = {
  subjectId: string;
  status: SubjectUserStatus;
  grade?: number | null;
  resultText?: string | null;
  completedAt?: string | null;
  note?: string | null;
  updatedAt: string;
};

export type UserSubjectStateMap = Record<string, UserSubjectState>;

const STORAGE_KEY = "susu-user-subject-state";

/**
 * Get all user subject states from localStorage
 */
export function getAllUserSubjectStates(): UserSubjectStateMap {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load user subject state:", error);
    return {};
  }
}

/**
 * Get user state for a specific subject
 */
export function getUserSubjectState(subjectId: string): UserSubjectState | undefined {
  const states = getAllUserSubjectStates();
  return states[subjectId];
}

/**
 * Set user status for a subject
 */
export function setUserSubjectStatus(
  subjectId: string,
  status: SubjectUserStatus,
  note?: string
): void {
  const states = getAllUserSubjectStates();
  const existing = states[subjectId] || {
    subjectId,
    status: "not_started",
    updatedAt: new Date().toISOString(),
  };

  const updated: UserSubjectState = {
    ...existing,
    status,
    note: note || existing.note,
    updatedAt: new Date().toISOString(),
  };

  // Auto-set completedAt if status is completed and not already set
  if (status === "completed" && !existing.completedAt) {
    updated.completedAt = new Date().toISOString();
  }

  states[subjectId] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

/**
 * Set user grade for a subject
 */
export function setUserSubjectGrade(
  subjectId: string,
  grade: number | null,
  resultText?: string
): void {
  const states = getAllUserSubjectStates();
  const existing = states[subjectId] || {
    subjectId,
    status: "not_started",
    updatedAt: new Date().toISOString(),
  };

  const updated: UserSubjectState = {
    ...existing,
    grade,
    resultText: resultText || existing.resultText,
    updatedAt: new Date().toISOString(),
  };

  // Auto-set status based on grade
  if (grade !== null && grade >= 1 && grade <= 5) {
    if (grade >= 2) {
      updated.status = "completed";
      if (!existing.completedAt) {
        updated.completedAt = new Date().toISOString();
      }
    } else {
      updated.status = "failed";
    }
  }

  states[subjectId] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

/**
 * Check if a subject is completed by the user
 */
export function isSubjectCompleted(subjectId: string): boolean {
  const state = getUserSubjectState(subjectId);
  if (!state) return false;
  return state.status === "completed" || state.status === "waived";
}

/**
 * Check if a subject is blocked by missing prerequisites
 */
export function isSubjectBlocked(
  subjectId: string,
  dependencies: Array<{ from: string; to: string }>,
  states: UserSubjectStateMap
): boolean {
  const subjectDeps = dependencies.filter((dep) => dep.to === subjectId);
  
  for (const dep of subjectDeps) {
    const depState = states[dep.from];
    if (!depState || !isSubjectCompleted(dep.from)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Get blocking dependencies for a subject
 */
export function getBlockingDependencies(
  subjectId: string,
  dependencies: Array<{ from: string; to: string }>,
  states: UserSubjectStateMap
): string[] {
  const subjectDeps = dependencies.filter((dep) => dep.to === subjectId);
  const blocking: string[] = [];
  
  for (const dep of subjectDeps) {
    const depState = states[dep.from];
    if (!depState || !isSubjectCompleted(dep.from)) {
      blocking.push(dep.from);
    }
  }
  
  return blocking;
}

/**
 * Get subjects that depend on a given subject
 */
export function getDependentSubjects(
  subjectId: string,
  dependencies: Array<{ from: string; to: string }>
): string[] {
  return dependencies
    .filter((dep) => dep.from === subjectId)
    .map((dep) => dep.to);
}

/**
 * Get visual state for a subject based on user state and dependencies
 */
export function getSubjectVisualState(
  subjectId: string,
  dependencies: Array<{ from: string; to: string }>,
  states: UserSubjectStateMap,
  currentSemesterNumber?: number,
  subjectSemesterNumber?: number
): SubjectVisualState {
  const state = states[subjectId];
  
  // Check if blocked first
  if (isSubjectBlocked(subjectId, dependencies, states)) {
    return "blocked";
  }
  
  if (!state) {
    // No user state - determine based on semester
    if (subjectSemesterNumber && currentSemesterNumber) {
      if (subjectSemesterNumber <= currentSemesterNumber) {
        return "in_progress";
      }
    }
    return "not_started";
  }
  
  // Map user status to visual state
  switch (state.status) {
    case "completed":
    case "waived":
      return "completed";
    case "in_progress":
      return "in_progress";
    case "failed":
    case "not_taken":
      return "not_taken_failed";
    case "not_started":
    default:
      // Check if in current or past semester
      if (subjectSemesterNumber && currentSemesterNumber) {
        if (subjectSemesterNumber <= currentSemesterNumber) {
          return "in_progress";
        }
      }
      return "not_started";
  }
}

/**
 * Reset state for a specific subject
 */
export function resetSubjectState(subjectId: string): void {
  const states = getAllUserSubjectStates();
  delete states[subjectId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

/**
 * Initialize default user state from previous semester results
 * Only if no user state exists yet
 */
export function initializeDefaultUserState(): void {
  const states = getAllUserSubjectStates();
  
  // Only initialize if empty
  if (Object.keys(states).length > 0) {
    return;
  }
  
  const previousSemesterResults: Array<{
    subjectId: string;
    grade: number | null;
    resultText: string;
  }> = [
    { subjectId: "fizika", grade: 2, resultText: "Elégséges" },
    { subjectId: "hirkoz", grade: 4, resultText: "Jó" },
    { subjectId: "patronalas", grade: null, resultText: "Aláírva" },
    { subjectId: "inf-1", grade: 3, resultText: "Közepes" },
    { subjectId: "gazdasag", grade: 5, resultText: "Jeles" },
    { subjectId: "elektro", grade: 5, resultText: "Jeles" },
    { subjectId: "projekt-1", grade: 5, resultText: "Jeles" },
    { subjectId: "testneveles-1", grade: null, resultText: "Kiválóan megfelelt" },
    { subjectId: "info-jog", grade: 5, resultText: "Jeles" },
    { subjectId: "tanulastech", grade: 5, resultText: "Jeles" },
  ];
  
  // Initialize previous semester subjects
  previousSemesterResults.forEach((result) => {
    setUserSubjectGrade(result.subjectId, result.grade, result.resultText);
  });
  
  // Set May 9 subjects to in_progress
  const may9Subjects = ["bbxin2kblf", "bbxpr12blf"];
  may9Subjects.forEach((subjectId) => {
    setUserSubjectStatus(subjectId, "in_progress");
  });
}
