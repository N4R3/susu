/**
 * Helper functions for surfacing Programozás HUB content into Tanuló HUB pages.
 * 
 * These functions filter and retrieve programming lessons based on:
 * - Track (python, ai-programozas, kiberbiztonsag, etc.)
 * - School subject relevance (bbxpr12blf, bbxin2kblf, etc.)
 * - Exam priority
 * - Difficulty
 */

import {
  programmingLessons,
  programmingTracks,
  ProgrammingLesson,
  ProgrammingTrack,
  ProgrammingExercise,
} from "@/lib/mock-data/programming";

/**
 * Get all tracks
 */
export function getProgrammingTracks(): ProgrammingTrack[] {
  return programmingTracks;
}

/**
 * Get track by slug
 */
export function getProgrammingTrackBySlug(slug: string): ProgrammingTrack | undefined {
  return programmingTracks.find((t) => t.slug === slug);
}

/**
 * Get track by id
 */
export function getProgrammingTrackById(id: string): ProgrammingTrack | undefined {
  return programmingTracks.find((t) => t.id === id);
}

/**
 * Get lessons for a specific track
 */
export function getProgrammingLessonsByTrack(trackId: string): ProgrammingLesson[] {
  return programmingLessons
    .filter((l) => l.trackId === trackId)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get lesson by slug
 */
export function getProgrammingLessonBySlug(slug: string): ProgrammingLesson | undefined {
  return programmingLessons.find((l) => l.slug === slug);
}

/**
 * Get lesson by id
 */
export function getProgrammingLessonById(id: string): ProgrammingLesson | undefined {
  return programmingLessons.find((l) => l.id === id);
}

/**
 * Get lessons relevant to a specific school subject
 */
export function getLessonsRelevantToSubject(subjectId: string): ProgrammingLesson[] {
  return programmingLessons.filter((lesson) =>
    lesson.schoolRelevance.some((rel) => rel.subjectId === subjectId)
  );
}

/**
 * Get high priority exam lessons for a specific school subject
 */
export function getHighPriorityExamLessons(subjectId: string): ProgrammingLesson[] {
  return programmingLessons.filter((lesson) =>
    lesson.schoolRelevance.some(
      (rel) => rel.subjectId === subjectId && rel.examPriority === "high"
    )
  );
}

/**
 * Get lessons for exam sprint (multiple subject IDs)
 */
export function getLessonsForExamSprint(subjectIds: string[]): ProgrammingLesson[] {
  return programmingLessons.filter((lesson) =>
    lesson.schoolRelevance.some(
      (rel) => subjectIds.includes(rel.subjectId) && rel.examPriority === "high"
    )
  );
}

/**
 * Get exercises for a specific lesson
 */
export function getProgrammingExercisesForLesson(lessonId: string): ProgrammingExercise[] {
  const lesson = programmingLessons.find((l) => l.id === lessonId);
  return lesson?.exercises || [];
}

/**
 * Get next recommended programming lesson
 */
export function getNextRecommendedProgrammingLesson(currentLessonId: string): ProgrammingLesson | undefined {
  const currentLesson = programmingLessons.find((l) => l.id === currentLessonId);
  if (!currentLesson?.nextLessonIds.length) return undefined;
  return getProgrammingLessonById(currentLesson.nextLessonIds[0]);
}

/**
 * Get previous programming lesson
 */
export function getPreviousProgrammingLesson(currentLessonId: string): ProgrammingLesson | undefined {
  const currentLesson = programmingLessons.find((l) => l.id === currentLessonId);
  if (!currentLesson?.previousLessonIds.length) return undefined;
  return getProgrammingLessonById(currentLesson.previousLessonIds[0]);
}

/**
 * Get lessons by difficulty
 */
export function getProgrammingLessonsByDifficulty(difficulty: ProgrammingLesson["level"]): ProgrammingLesson[] {
  return programmingLessons.filter((l) => l.level === difficulty);
}

/**
 * Get lessons by tag
 */
export function getProgrammingLessonsByTag(tag: string): ProgrammingLesson[] {
  return programmingLessons.filter((l) => l.tags.includes(tag));
}

/**
 * Search lessons by title or summary
 */
export function searchProgrammingLessons(query: string): ProgrammingLesson[] {
  const lowerQuery = query.toLowerCase();
  return programmingLessons.filter(
    (l) =>
      l.title.toLowerCase().includes(lowerQuery) ||
      l.summary.toLowerCase().includes(lowerQuery) ||
      l.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get emergency study path lessons (Ha kevés időd van)
 * Order: Input/output -> Feltételek -> Ciklusok -> Függvények -> Listák -> Tipikus vizsgafeladatok
 */
export function getEmergencyStudyPathLessons(): ProgrammingLesson[] {
  const emergencyLessonIds = ["p-004", "p-005", "p-006", "p-007", "p-008", "p-011"];
  return programmingLessons.filter((l) => emergencyLessonIds.includes(l.id));
}

/**
 * Get quick exercises for emergency study (5 exercises from emergency path lessons)
 */
export function getQuickExercisesForEmergencyPath(): ProgrammingExercise[] {
  const emergencyLessonIds = ["p-004", "p-005", "p-006", "p-007", "p-008", "p-011"];
  const allExercises: ProgrammingExercise[] = [];
  
  emergencyLessonIds.forEach((lessonId) => {
    const lesson = programmingLessons.find((l) => l.id === lessonId);
    if (lesson) {
      allExercises.push(...lesson.exercises);
    }
  });
  
  // Return up to 5 exercises, prioritizing exam and medium difficulty
  return allExercises
    .sort((a, b) => {
      const priority = { exam: 0, medium: 1, hard: 2, easy: 3 };
      return (priority[a.difficulty] || 99) - (priority[b.difficulty] || 99);
    })
    .slice(0, 5);
}
