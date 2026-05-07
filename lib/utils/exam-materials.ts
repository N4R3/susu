// Helper functions for exam materials
import { examMaterials, examFocusSubjects, type ExamMaterial, type ExamMaterialPriority } from "@/lib/mock-data/exam-materials";

export function getMaterialsForSubject(subjectId: string): ExamMaterial[] {
  return examMaterials.filter((m) => m.subjectId === subjectId);
}

export function getPrimaryExamMaterials(): ExamMaterial[] {
  return examMaterials.filter((m) => m.priority === "primary");
}

export function getMaterialsByPriority(priority: ExamMaterialPriority): ExamMaterial[] {
  return examMaterials.filter((m) => m.priority === priority);
}

export function getMaterialsNeedingInspection(): ExamMaterial[] {
  return examMaterials.filter((m) => m.status === "needsInspection");
}

export function getExamFocusSubjects() {
  return examFocusSubjects;
}

export function getStudyBlocksForSubject(subjectId: string) {
  const materials = getMaterialsForSubject(subjectId);
  const subjectInfo = examFocusSubjects.find((s) => s.subjectId === subjectId);
  
  return {
    subjectId,
    subjectName: subjectInfo?.subjectName || "",
    priority: subjectInfo?.priority || "secondary",
    difficulty: subjectInfo?.difficulty || "medium",
    examDate: subjectInfo?.examDate || "",
    examType: subjectInfo?.examType || "",
    topic: subjectInfo?.topic || "",
    materials: materials,
    cta: subjectInfo?.cta || "",
    aiAllowed: subjectInfo?.aiAllowed || false,
  };
}

export function getPrimaryExamSubject() {
  return examFocusSubjects.find((s) => s.priority === "primary");
}

export function getSecondaryExamSubject() {
  return examFocusSubjects.find((s) => s.priority === "secondary");
}

export function getLaterExamSubjects() {
  return examFocusSubjects.filter((s) => s.priority === "later");
}
