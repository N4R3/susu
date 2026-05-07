// Progress Persistence for Private Study Use
// Uses localStorage for local/personal study use only
// Does NOT store sensitive file contents or documents
// Stores only small state: booleans, IDs, timestamps, progress percentages

export type StudyProgressState = {
  completedLessons: string[];
  completedPracticeQuestions: string[];
  completedChecklistItems: string[];
  completedQuickReviewCards: string[];
  lastUpdatedAt: string;
};

const STORAGE_KEY = "susu-study-progress";

const DEFAULT_STATE: StudyProgressState = {
  completedLessons: [],
  completedPracticeQuestions: [],
  completedChecklistItems: [],
  completedQuickReviewCards: [],
  lastUpdatedAt: new Date().toISOString(),
};

export function getProgressState(): StudyProgressState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;
    
    const parsed = JSON.parse(stored);
    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  } catch (error) {
    console.error("Error reading progress state:", error);
    return DEFAULT_STATE;
  }
}

export function setProgressState(partial: Partial<StudyProgressState>): void {
  if (typeof window === "undefined") return;
  
  try {
    const current = getProgressState();
    const updated = {
      ...current,
      ...partial,
      lastUpdatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving progress state:", error);
  }
}

export function markLessonComplete(lessonId: string): void {
  const current = getProgressState();
  if (!current.completedLessons.includes(lessonId)) {
    setProgressState({
      completedLessons: [...current.completedLessons, lessonId],
    });
  }
}

export function unmarkLessonComplete(lessonId: string): void {
  const current = getProgressState();
  setProgressState({
    completedLessons: current.completedLessons.filter(id => id !== lessonId),
  });
}

export function markPracticeQuestionDone(questionId: string): void {
  const current = getProgressState();
  if (!current.completedPracticeQuestions.includes(questionId)) {
    setProgressState({
      completedPracticeQuestions: [...current.completedPracticeQuestions, questionId],
    });
  }
}

export function unmarkPracticeQuestionDone(questionId: string): void {
  const current = getProgressState();
  setProgressState({
    completedPracticeQuestions: current.completedPracticeQuestions.filter(id => id !== questionId),
  });
}

export function markChecklistItemDone(itemId: string): void {
  const current = getProgressState();
  if (!current.completedChecklistItems.includes(itemId)) {
    setProgressState({
      completedChecklistItems: [...current.completedChecklistItems, itemId],
    });
  }
}

export function unmarkChecklistItemDone(itemId: string): void {
  const current = getProgressState();
  setProgressState({
    completedChecklistItems: current.completedChecklistItems.filter(id => id !== itemId),
  });
}

export function markQuickReviewCardDone(cardId: string): void {
  const current = getProgressState();
  if (!current.completedQuickReviewCards.includes(cardId)) {
    setProgressState({
      completedQuickReviewCards: [...current.completedQuickReviewCards, cardId],
    });
  }
}

export function unmarkQuickReviewCardDone(cardId: string): void {
  const current = getProgressState();
  setProgressState({
    completedQuickReviewCards: current.completedQuickReviewCards.filter(id => id !== cardId),
  });
}

export function getLessonProgress(lessonIds: string[]): number {
  const current = getProgressState();
  const completed = lessonIds.filter(id => current.completedLessons.includes(id)).length;
  return lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
}

export function getPracticeQuestionProgress(questionIds: string[]): number {
  const current = getProgressState();
  const completed = questionIds.filter(id => current.completedPracticeQuestions.includes(id)).length;
  return questionIds.length > 0 ? Math.round((completed / questionIds.length) * 100) : 0;
}

export function resetProgressForScope(scope: "lessons" | "practice" | "checklist" | "quickReview" | "all"): void {
  const current = getProgressState();
  
  switch (scope) {
    case "lessons":
      setProgressState({ completedLessons: [] });
      break;
    case "practice":
      setProgressState({ completedPracticeQuestions: [] });
      break;
    case "checklist":
      setProgressState({ completedChecklistItems: [] });
      break;
    case "quickReview":
      setProgressState({ completedQuickReviewCards: [] });
      break;
    case "all":
      localStorage.removeItem(STORAGE_KEY);
      break;
  }
}

export function isLessonComplete(lessonId: string): boolean {
  const current = getProgressState();
  return current.completedLessons.includes(lessonId);
}

export function isPracticeQuestionDone(questionId: string): boolean {
  const current = getProgressState();
  return current.completedPracticeQuestions.includes(questionId);
}

export function isChecklistItemDone(itemId: string): boolean {
  const current = getProgressState();
  return current.completedChecklistItems.includes(itemId);
}

export function isQuickReviewCardDone(cardId: string): boolean {
  const current = getProgressState();
  return current.completedQuickReviewCards.includes(cardId);
}
