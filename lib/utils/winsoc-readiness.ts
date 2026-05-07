// Helper functions for Informatika II. SOC Exam Readiness

import {
  winsocModules,
  winsocReadinessChecklist,
  winsocUnknownRequirements,
  minimumWinsocExamPath,
  type WinsocModule,
  type WinsocReadinessChecklistItem,
  type WinsocUnknownRequirement
} from "@/lib/mock-data/winsoc-exam-readiness";

// Get all Winsoc modules
export function getWinsocModules(): WinsocModule[] {
  return winsocModules;
}

// Get critical Winsoc modules (examPriority: "critical")
export function getCriticalWinsocModules(): WinsocModule[] {
  return winsocModules.filter((m) => m.examPriority === "critical");
}

// Get high priority Winsoc modules (examPriority: "high")
export function getHighPriorityWinsocModules(): WinsocModule[] {
  return winsocModules.filter((m) => m.examPriority === "high");
}

// Get Winsoc module by ID
export function getWinsocModuleById(id: string): WinsocModule | undefined {
  return winsocModules.find((m) => m.id === id);
}

// Get Winsoc modules by exam priority
export function getWinsocModulesByPriority(priority: "critical" | "high" | "medium"): WinsocModule[] {
  return winsocModules.filter((m) => m.examPriority === priority);
}

// Get all readiness checklist items
export function getWinsocChecklist(): WinsocReadinessChecklistItem[] {
  return winsocReadinessChecklist;
}

// Get readiness checklist items by category
export function getWinsocChecklistByCategory(category: "setup" | "concept" | "code" | "test" | "report" | "exam"): WinsocReadinessChecklistItem[] {
  return winsocReadinessChecklist.filter((item) => item.category === category);
}

// Get readiness checklist items by priority
export function getWinsocChecklistByPriority(priority: "critical" | "high" | "medium"): WinsocReadinessChecklistItem[] {
  return winsocReadinessChecklist.filter((item) => item.priority === priority);
}

// Get minimum exam path (ordered checklist items)
export function getMinimumWinsocExamPath(): WinsocReadinessChecklistItem[] {
  return minimumWinsocExamPath
    .map((id) => winsocReadinessChecklist.find((item) => item.id === id))
    .filter((item): item is WinsocReadinessChecklistItem => item !== undefined);
}

// Get unknown exam requirements
export function getWinsocUnknownRequirements(): WinsocUnknownRequirement[] {
  return winsocUnknownRequirements;
}

// Get unknown requirements by status
export function getWinsocUnknownRequirementsByStatus(status: "unknown" | "partiallyKnown" | "known"): WinsocUnknownRequirement[] {
  return winsocUnknownRequirements.filter((req) => req.status === status);
}

// Get exercises for a specific module
export function getWinsocExercisesByModule(moduleId: string): string[] {
  const mod = getWinsocModuleById(moduleId);
  return mod?.exercises || [];
}

// Get all exercises across all modules
export function getAllWinsocExercises(): string[] {
  return winsocModules.flatMap((m) => m.exercises);
}

// Get module count by exam priority
export function getWinsocModuleCountByPriority(): { critical: number; high: number; medium: number } {
  return {
    critical: winsocModules.filter((m) => m.examPriority === "critical").length,
    high: winsocModules.filter((m) => m.examPriority === "high").length,
    medium: winsocModules.filter((m) => m.examPriority === "medium").length
  };
}

// Get checklist progress
export function getWinsocChecklistProgress(): { total: number; done: number; percentage: number } {
  const total = winsocReadinessChecklist.length;
  const done = winsocReadinessChecklist.filter((item) => item.done).length;
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, percentage };
}

// Get critical checklist items
export function getCriticalWinsocChecklist(): WinsocReadinessChecklistItem[] {
  return winsocReadinessChecklist.filter((item) => item.priority === "critical");
}
