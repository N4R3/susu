import { semesterResults, type SemesterResult, type CompletedSubjectResult } from "@/lib/mock-data/semester-results";

export function getSemesterResults(): SemesterResult[] {
  return semesterResults;
}

export function getSemesterResultById(id: string): SemesterResult | undefined {
  return semesterResults.find((s) => s.semesterId === id);
}

export function getLatestSemester(): SemesterResult | undefined {
  return semesterResults[semesterResults.length - 1];
}

export function calculateWeightedAverage(subjects: CompletedSubjectResult[]): number {
  const subjectsInAverage = subjects.filter((s) => s.includeInAverage && s.numericGrade !== null);
  if (subjectsInAverage.length === 0) return 0;

  const totalCredits = subjectsInAverage.reduce((sum, s) => sum + s.credit, 0);
  const weightedSum = subjectsInAverage.reduce((sum, s) => sum + (s.numericGrade || 0) * s.credit, 0);

  return totalCredits === 0 ? 0 : Math.round((weightedSum / totalCredits) * 100) / 100;
}

export function getCompletedCredits(subjects: CompletedSubjectResult[]): number {
  return subjects.filter((s) => s.completed).reduce((sum, s) => sum + s.credit, 0);
}

export function getGradeDistribution(subjects: CompletedSubjectResult[]): Record<number, number> {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  subjects.forEach((subject) => {
    if (subject.numericGrade !== null && subject.includeInAverage) {
      distribution[subject.numericGrade] = (distribution[subject.numericGrade] || 0) + 1;
    }
  });

  return distribution;
}

export function getBestSubjects(subjects: CompletedSubjectResult[], limit: number = 3): CompletedSubjectResult[] {
  const subjectsWithGrades = subjects
    .filter((s) => s.numericGrade !== null && s.includeInAverage)
    .sort((a, b) => (b.numericGrade || 0) - (a.numericGrade || 0));
  
  return subjectsWithGrades.slice(0, limit);
}

export function getWeakestSubjects(subjects: CompletedSubjectResult[], limit: number = 3): CompletedSubjectResult[] {
  const subjectsWithGrades = subjects
    .filter((s) => s.numericGrade !== null && s.includeInAverage)
    .sort((a, b) => (a.numericGrade || 0) - (b.numericGrade || 0));
  
  return subjectsWithGrades.slice(0, limit);
}

export function getSubjectByCode(code: string): CompletedSubjectResult | undefined {
  return semesterResults
    .flatMap((s) => s.subjects)
    .find((subject) => subject.code === code);
}
