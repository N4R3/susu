// Helper functions for May 9 Exam Strategy

import {
  may9StrategyBlocks,
  may9SurvivalPath,
  may9TimeBoxPlans,
  may9QuickLinks,
  type May9StrategyBlock,
  type SurvivalPathItem,
  type TimeBoxPlan
} from "@/lib/mock-data/may9-exam-strategy";
import { getCriticalWinsocModules } from "@/lib/utils/winsoc-readiness";
import { getWinsocUnknownRequirements } from "@/lib/utils/winsoc-readiness";
import { getCriticalProgrammingExamTopics, getProgrammingExamExercises, getUnknownProgrammingExamRequirements } from "@/lib/utils/programming-exam";

// Get all strategy blocks
export function getMay9StrategyBlocks(): May9StrategyBlock[] {
  return may9StrategyBlocks;
}

// Get primary strategy block (Informatika II.)
export function getPrimaryMay9StrategyBlock(): May9StrategyBlock | undefined {
  return may9StrategyBlocks.find((block) => block.priority === "primary");
}

// Get secondary strategy block (Programozás)
export function getSecondaryMay9StrategyBlock(): May9StrategyBlock | undefined {
  return may9StrategyBlocks.find((block) => block.priority === "secondary");
}

// Get survival path
export function getMay9SurvivalPath(): SurvivalPathItem[] {
  return may9SurvivalPath;
}

// Get survival path by subject
export function getMay9SurvivalPathBySubject(subjectId: string): SurvivalPathItem[] {
  return may9SurvivalPath.filter((item) => item.subjectId === subjectId);
}

// Get time-boxed plans
export function getMay9TimeBoxPlans(): TimeBoxPlan[] {
  return may9TimeBoxPlans;
}

// Get time-boxed plan by minutes
export function getMay9TimeBoxPlanByMinutes(minutes: 30 | 60 | 120): TimeBoxPlan | undefined {
  return may9TimeBoxPlans.find((plan) => plan.minutes === minutes);
}

// Get quick links
export function getMay9QuickLinks(): Array<{ label: string; href: string; subject: string }> {
  return may9QuickLinks;
}

// Get quick links by subject
export function getMay9QuickLinksBySubject(subjectId: string): Array<{ label: string; href: string; subject: string }> {
  return may9QuickLinks.filter((link) => link.subject === subjectId);
}

// Get combined unknown requirements from both exams
export function getMay9UnknownRequirements(): {
  informatika2: Array<{ question: string }>;
  programozas: Array<{ title: string; description: string }>;
} {
  const winsocUnknown = getWinsocUnknownRequirements();
  const programmingUnknown = getUnknownProgrammingExamRequirements();
  
  return {
    informatika2: winsocUnknown.map((req) => ({ question: req.question })),
    programozas: programmingUnknown.map((req) => ({ title: req.title, description: req.description }))
  };
}

// Get critical topics for both exams
export function getMay9CriticalTopics(): {
  informatika2: Array<{ title: string; priority: string }>;
  programozas: Array<{ title: string; priority: string }>;
} {
  const winsocCritical = getCriticalWinsocModules();
  const programmingCritical = getCriticalProgrammingExamTopics();
  
  return {
    informatika2: winsocCritical.map((mod) => ({ title: mod.title, priority: "critical" })),
    programozas: programmingCritical.map((topic) => ({ title: topic.title, priority: topic.priority }))
  };
}

// Get top 3 critical topics for each exam
export function getMay9TopCriticalTopics(): {
  informatika2: string[];
  programozas: string[];
} {
  const criticalTopics = getMay9CriticalTopics();
  
  return {
    informatika2: criticalTopics.informatika2.slice(0, 3).map((t) => t.title),
    programozas: criticalTopics.programozas.slice(0, 3).map((t) => t.title)
  };
}

// Get top 3 exercises for Programozás
export function getMay9ProgrammingExercises(): Array<{ title: string; difficulty: string; topic: string }> {
  const exercises = getProgrammingExamExercises();
  return exercises.slice(0, 3).map((ex) => ({
    title: ex.title,
    difficulty: ex.difficulty,
    topic: ex.topicId
  }));
}
