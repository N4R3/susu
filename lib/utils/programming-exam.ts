// Helper functions for Programozás Exam Data

import {
  programmingExamTopics,
  programmingExamExercises,
  programmingExamRequirements,
  programmingExamMinimumPath,
  type ProgrammingExamTopic,
  type ProgrammingExamExercise,
  type ProgrammingExamRequirement
} from "@/lib/mock-data/programming-exam";

// Get all exam topics
export function getProgrammingExamTopics(): ProgrammingExamTopic[] {
  return programmingExamTopics;
}

// Get critical exam topics
export function getCriticalProgrammingExamTopics(): ProgrammingExamTopic[] {
  return programmingExamTopics.filter((topic) => topic.priority === "critical");
}

// Get high priority exam topics
export function getHighPriorityProgrammingExamTopics(): ProgrammingExamTopic[] {
  return programmingExamTopics.filter((topic) => topic.priority === "high");
}

// Get exam topic by ID
export function getProgrammingExamTopicById(id: string): ProgrammingExamTopic | undefined {
  return programmingExamTopics.find((topic) => topic.id === id);
}

// Get all exam exercises
export function getProgrammingExamExercises(): ProgrammingExamExercise[] {
  return programmingExamExercises;
}

// Get exam exercises by topic ID
export function getProgrammingExamExercisesByTopic(topicId: string): ProgrammingExamExercise[] {
  return programmingExamExercises.filter((exercise) => exercise.topicId === topicId);
}

// Get exam exercises by difficulty
export function getProgrammingExamExercisesByDifficulty(difficulty: "easy" | "medium" | "exam"): ProgrammingExamExercise[] {
  return programmingExamExercises.filter((exercise) => exercise.difficulty === difficulty);
}

// Get AI allowed exercises
export function getAIAllowedProgrammingExamExercises(): ProgrammingExamExercise[] {
  return programmingExamExercises.filter((exercise) => exercise.aiAllowed);
}

// Get all exam requirements
export function getProgrammingExamRequirements(): ProgrammingExamRequirement[] {
  return programmingExamRequirements;
}

// Get exam requirements by status
export function getProgrammingExamRequirementsByStatus(status: "known" | "unknown" | "partiallyKnown"): ProgrammingExamRequirement[] {
  return programmingExamRequirements.filter((req) => req.status === status);
}

// Get unknown exam requirements
export function getUnknownProgrammingExamRequirements(): ProgrammingExamRequirement[] {
  return programmingExamRequirements.filter((req) => req.status === "unknown");
}

// Get minimum study path
export function getProgrammingExamMinimumPath(): string[] {
  return programmingExamMinimumPath;
}

// Get topic count by priority
export function getProgrammingExamTopicCountByPriority(): {
  critical: number;
  high: number;
  medium: number;
} {
  return {
    critical: programmingExamTopics.filter((t) => t.priority === "critical").length,
    high: programmingExamTopics.filter((t) => t.priority === "high").length,
    medium: programmingExamTopics.filter((t) => t.priority === "medium").length
  };
}

// Get exercise count by difficulty
export function getProgrammingExamExerciseCountByDifficulty(): {
  easy: number;
  medium: number;
  exam: number;
} {
  return {
    easy: programmingExamExercises.filter((e) => e.difficulty === "easy").length,
    medium: programmingExamExercises.filter((e) => e.difficulty === "medium").length,
    exam: programmingExamExercises.filter((e) => e.difficulty === "exam").length
  };
}
