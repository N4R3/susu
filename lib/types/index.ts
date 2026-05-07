export type Program = {
  id: string;
  name: string;
  code: string;
  level: string;
  studyMode: string;
  admissionTerm: string;
  studentStatusStart: string;
  durationSemesters: number;
  field: string;
  careerOpportunities: string;
  mainSubjects: string[];
};

export type Semester = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  recommendedSemesterNumber: number;
  isCurrent?: boolean;
};

export type Subject = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semesterId: string;
  category: string;
  credits: number;
  recommendedSemester: number;
  requirementType: string;
  mode: "exam_online" | "exam_in_person" | "exam_unknown" | "assignment" | "full_online" | "single_occasion_pass_fail";
  completionStatus: "not_completed" | "in_progress" | "completed" | "failed";
  gradeType: "grade" | "pass_fail";
  color: string;
  followUpSubjectCount: number;
  prerequisiteSubjectIds: string[];
  unlocksSubjectIds: string[];
  grade?: 1 | 2 | 3 | 4 | 5;
  passFail?: "passed" | "failed";
  nextDeadline?: string;
  nextDeadlineType?: "exam" | "assignment" | "class" | "admin";
  quickLinks?: {
    label: string;
    url: string;
  }[];
};

export type CalendarEvent = {
  id: string;
  subjectId?: string;
  semesterId: string;
  title: string;
  type: "class" | "exam" | "assignment_deadline" | "admin_deadline" | "study_block";
  start: string;
  end?: string;
  location?: string;
  isOnline?: boolean;
  url?: string;
};

export type SubjectFile = {
  id: string;
  subjectId: string;
  fileName: string;
  fileType: "pdf" | "pptx" | "docx" | "txt" | "md" | "image" | "other";
  storageUrl: string;
  uploadedAt: string;
};

export type StudyModule = {
  id: string;
  subjectId: string;
  title: string;
  generatedByAi: boolean;
  contentBlocks: StudyBlock[];
};

export type StudyBlock =
  | { type: "explanation"; markdown: string }
  | { type: "formula"; latex: string }
  | { type: "example"; markdown: string }
  | { type: "exercise"; question: string; solution: string; checkerType: "exact" | "ai" | "math" | "code" };

export type ClassSession = {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline?: boolean;
  url?: string;
  topics?: string[];
  notes?: string;
  fileIds?: string[];
};

export type CurriculumNode = {
  id: string;
  subjectId: string;
  semesterId: string;
  position: { x: number; y: number };
  isRequired: boolean;
  isCompleted: boolean;
};

export type CurriculumEdge = {
  id: string;
  source: string;
  target: string;
  type: "prerequisite" | "unlocks";
};

export type CurriculumDependencyConfidence = "official" | "estimated" | "unknown";

export type CurriculumSubject = {
  id: string;
  name: string;
  code: string | null;
  isRequired: boolean;
  isCompleted: boolean;
};

export type CurriculumSemester = {
  semesterNumber: number;
  name: string;
  isCurrent?: boolean;
  subjects: CurriculumSubject[];
};

export type CurriculumDependency = {
  from: string;
  to: string;
  confidence: CurriculumDependencyConfidence;
};

export type CurriculumFilter = "all" | "current_path" | "cybersecurity" | "prerequisite_chains";

export type DeadlineType = "assignment" | "exam" | "online" | "single_occasion";

export type DeadlinePriority = "urgent" | "normal" | "low";

export type Deadline = {
  id: string;
  subjectName: string;
  type: DeadlineType;
  firstDeadline: string;
  secondDeadline: string | null;
  isDone: boolean;
  noMoreActionNeeded: boolean;
  gradeReceived: boolean;
  priority?: DeadlinePriority;
};

export type DeadlineGroup = "urgent" | "completedAwaitingGrade" | "closed" | "upcoming";

export type StudyTopic = {
  id: string;
  name: string;
  completed: boolean;
  notes?: string;
};

export type StudySection = {
  id: string;
  name: string;
  topics: StudyTopic[];
};

export type ExamSprintSubject = {
  subjectId: string;
  subjectName: string;
  examDate: string;
  status: string;
  studySections: StudySection[];
};

