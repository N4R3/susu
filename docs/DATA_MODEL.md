# Data Model

## Core Types

### Program
```typescript
type Program = {
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
```

### Semester
```typescript
type Semester = {
  id: string;
  name: string; // "2025/26/1"
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  recommendedSemesterNumber: number;
  isCurrent?: boolean; // Computed from current date
};
```

### Subject
```typescript
type Subject = {
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
```

### Curriculum Data (7-semester map)
```typescript
type CurriculumSubject = {
  id: string;
  name: string;
  code: string | null;
  isRequired: boolean;
  isCompleted: boolean;
};

type CurriculumSemester = {
  semesterNumber: number;
  name: string;
  isCurrent?: boolean;
  subjects: CurriculumSubject[];
};

type CurriculumDependencyConfidence = "official" | "estimated" | "unknown";

type CurriculumDependency = {
  from: string;
  to: string;
  confidence: CurriculumDependencyConfidence;
};

type CurriculumFilter = "all" | "current_path" | "cybersecurity" | "prerequisite_chains";
```

### Calendar Event
```typescript
type CalendarEvent = {
  id: string;
  subjectId?: string;
  semesterId: string;
  title: string;
  type: "class" | "exam" | "assignment_deadline" | "admin_deadline" | "study_block";
  start: string; // ISO date string
  end?: string; // ISO date string
  location?: string;
  isOnline?: boolean;
  url?: string;
};
```

### Subject File
```typescript
type SubjectFile = {
  id: string;
  subjectId: string;
  fileName: string;
  fileType: "pdf" | "pptx" | "docx" | "txt" | "md" | "image" | "other";
  storageUrl: string;
  uploadedAt: string; // ISO date string
};
```

### Study Module
```typescript
type StudyModule = {
  id: string;
  subjectId: string;
  title: string;
  generatedByAi: boolean;
  contentBlocks: StudyBlock[];
};
```

### Study Block
```typescript
type StudyBlock =
  | { type: "explanation"; markdown: string }
  | { type: "formula"; latex: string }
  | { type: "example"; markdown: string }
  | { type: "exercise"; question: string; solution: string; checkerType: "exact" | "ai" | "math" | "code" };
```

### Class Session
```typescript
type ClassSession = {
  id: string;
  subjectId: string;
  title: string;
  date: string; // ISO date string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location?: string;
  isOnline?: boolean;
  url?: string;
  topics?: string[];
  notes?: string;
  fileIds?: string[];
};
```

### Curriculum Node
```typescript
type CurriculumNode = {
  id: string;
  subjectId: string;
  semesterId: string;
  position: { x: number; y: number };
  isRequired: boolean;
  isCompleted: boolean;
};
```

### Curriculum Edge
```typescript
type CurriculumEdge = {
  id: string;
  source: string; // subjectId
  target: string; // subjectId
  type: "prerequisite" | "unlocks";
};
```

## Data Relationships

- **Semester** has many **Subjects**
- **Subject** belongs to one **Semester**
- **Subject** has many **Calendar Events**
- **Subject** has many **Subject Files**
- **Subject** has many **Study Modules**
- **Subject** has many **Class Sessions**
- **Subject** has prerequisite relationships with other **Subjects**
- **Subject** unlocks relationships with other **Subjects**

## Mock Data Structure

Mock data will be stored in `/lib/mock-data/` directory:
- `semesters.ts` - Semester data
- `subjects.ts` - Subject data
- `events.ts` - Calendar events
- `curriculum.ts` - Curriculum nodes and edges
- `classes.ts` - Class sessions
- `files.ts` - Subject files
- `study-modules.ts` - Study modules
- `programming.ts` - Programming learning content (Programozás HUB)

## Programozás HUB Data Model

### ProgrammingTrack
```typescript
type ProgrammingTrack = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "active" | "planned";
  level: "beginner" | "intermediate" | "advanced";
  color: string;
};
```

### ProgrammingLesson
```typescript
type ProgrammingLesson = {
  id: string;
  slug: string;
  title: string;
  trackId: "python" | "ai-programozas" | "kiberbiztonsag" | "automatizalas" | "projektek";
  order: number;
  level: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  summary: string;
  learningGoals: string[];
  tags: string[];
  schoolRelevance: SchoolSubjectRelevance[];
  contentBlocks: ProgrammingContentBlock[];
  exercises: ProgrammingExercise[];
  nextLessonIds: string[];
  previousLessonIds: string[];
};
```

### ProgrammingContentBlock
```typescript
type ProgrammingContentBlock =
  | { type: "explanation"; title: string; markdown: string }
  | { type: "code"; title?: string; language: "python" | "bash" | "typescript" | "text"; code: string; explanation?: string }
  | { type: "example"; title: string; markdown: string; code?: string }
  | { type: "commonMistake"; title: string; markdown: string }
  | { type: "cybersecurityContext"; title: string; markdown: string }
  | { type: "aiContext"; title: string; markdown: string };
```

### ProgrammingExercise
```typescript
type ProgrammingExercise = {
  id: string;
  lessonId: string;
  title: string;
  difficulty: "easy" | "medium" | "exam" | "hard";
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  solution?: string;
  checkerType: "manual" | "exactOutput" | "futureAi" | "futurePyodide";
  tags: string[];
};
```

### SchoolSubjectRelevance
```typescript
type SchoolSubjectRelevance = {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  relevance: "direct" | "related" | "background";
  reason: string;
  examPriority?: "high" | "medium" | "low";
};
```

## Exam Preparation Layer

The Programozás HUB includes an exam preparation layer that filters and prioritizes lessons based on exam requirements for specific school subjects.

### Emergency Study Path
The emergency study path ("Ha kevés időd van") provides a minimum viable path for exam preparation:
- **Lesson IDs**: p-004 (Input/output), p-005 (Feltételek), p-006 (Ciklusok), p-007 (Függvények), p-008 (Listák), p-011 (Vizsgafeladatok)
- **Quick Exercises**: Up to 5 prioritized exercises from emergency path lessons
- **Display Locations**: /programozas, /programozas/python, /exam-sprint, /subjects/bbxpr12blf/study

### Exam Priority Metadata
Lessons are tagged with examPriority for school subjects:
- **bbxpr12blf (Programozás)**: High priority for core lessons (Python környezet, Változók, Input/output, Feltételek, Ciklusok, Függvények, Listák, Stringkezelés, Vizsgafeladatok); Medium for Fájlkezelés, Jelszóerősség mini projekt
- **bbxin2kblf (Informatika II.)**: High for Fájlkezelés; Medium for Python környezet, Változók, Input/output, Feltételek, Ciklusok, Függvények, Listák, Stringkezelés, Vizsgafeladatok

### Helper Functions
```typescript
// Get emergency study path lessons
getEmergencyStudyPathLessons(): ProgrammingLesson[]

// Get quick exercises for emergency study
getQuickExercisesForEmergencyPath(): ProgrammingExercise[]
```

### ProgrammingProject
```typescript
type ProgrammingProject = {
  id: string;
  slug: string;
  title: string;
  trackId: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  requiredLessonIds: string[];
  tags: string[];
  estimatedHours: number;
  status?: "active" | "planned";
};
```

## Exam Materials Data Model

### ExamMaterial
```typescript
type ExamMaterial = {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  examDate: string; // ISO date string (YYYY-MM-DD)
  examType: string;
  topic: string;
  priority: "primary" | "secondary" | "deferred";
  materials: ExamMaterialFile[];
  status: "active" | "needs_inspection" | "complete";
  aiAllowed?: boolean;
};

type ExamMaterialFile = {
  type: string;
  name: string;
  description?: string;
  url?: string;
};

type ExamMaterialPriority = "primary" | "secondary" | "deferred";
```

### Helper Functions
```typescript
// Get all exam focus subjects
getExamFocusSubjects(): ExamMaterial[]

// Get primary exam subject (highest priority)
getPrimaryExamSubject(): ExamMaterial | null

// Get secondary exam subject
getSecondaryExamSubject(): ExamMaterial | null

// Get materials for specific subject
getMaterialsForSubject(subjectId: string): ExamMaterial[]

// Get materials by priority
getMaterialsByPriority(priority: ExamMaterialPriority): ExamMaterial[]

// Get materials needing inspection
getMaterialsNeedingInspection(): ExamMaterial[]
```

### Exam Focus Hierarchy
The exam materials model establishes a priority hierarchy for exam preparation:
- **Primary (bbxin2kblf)**: Informatika II. (laborgyak) – Windows SOC Analyst Tool project, harder practical exam
- **Secondary (bbxpr12blf)**: Programozás – Python basics, easier foundational block, AI allowed
- **Deferred (bbxvn12blf)**: Network – TCP/IP, routing, switching, later exam date (2026-05-23)

### Exam Materials Storage
Mock data stored in `/lib/mock-data/exam-materials.ts` with helper functions in `/lib/utils/exam-materials.ts`

## Informatika II. SOC Exam Readiness Model

### WinsocModule
```typescript
type WinsocModule = {
  id: string;
  title: string;
  shortDescription: string;
  roleInPipeline: string;
  mustUnderstand: string[];
  mustExplain: string[];
  likelyTasks: string[];
  commonMistakes: string[];
  relatedProgrammingLessonIds: string[];
  exercises: string[];
  examPriority: "critical" | "high" | "medium";
};
```

### WinsocReadinessChecklistItem
```typescript
type WinsocReadinessChecklistItem = {
  id: string;
  title: string;
  category: "setup" | "concept" | "code" | "test" | "report" | "exam";
  priority: "critical" | "high" | "medium";
  description: string;
  done: boolean;
};
```

### WinsocUnknownRequirement
```typescript
type WinsocUnknownRequirement = {
  id: string;
  question: string;
  whyItMatters: string;
  status: "unknown" | "partiallyKnown" | "known";
};
```

### Helper Functions
```typescript
// Get all Winsoc modules
getWinsocModules(): WinsocModule[]

// Get critical Winsoc modules (examPriority: "critical")
getCriticalWinsocModules(): WinsocModule[]

// Get Winsoc module by ID
getWinsocModuleById(id: string): WinsocModule | undefined

// Get all readiness checklist items
getWinsocChecklist(): WinsocReadinessChecklistItem[]

// Get readiness checklist items by category
getWinsocChecklistByCategory(category: "setup" | "concept" | "code" | "test" | "report" | "exam"): WinsocReadinessChecklistItem[]

// Get minimum exam path (ordered checklist items)
getMinimumWinsocExamPath(): WinsocReadinessChecklistItem[]

// Get unknown exam requirements
getWinsocUnknownRequirements(): WinsocUnknownRequirement[]

// Get exercises for a specific module
getWinsocExercisesByModule(moduleId: string): string[]

// Get module count by exam priority
getWinsocModuleCountByPriority(): { critical: number; high: number; medium: number }

// Get checklist progress
getWinsocChecklistProgress(): { total: number; done: number; percentage: number }
```

### SOC Modules
The exam readiness model includes 10 SOC modules:
1. **Template Engine** (critical) - HTML template rendering with variable substitution
2. **Mock Log Generator** (high) - Generates fake Windows event logs for testing
3. **Windows Log Parser** (critical) - Parses raw Windows event logs into structured event objects
4. **Anomaly Detector** (critical) - Detects suspicious patterns (brute force, suspicious IPs)
5. **Integrity Checker** (critical) - Detects file changes using hash-based integrity checking
6. **Report Generator** (high) - Generates HTML and JSON reports from analysis results
7. **Main Application** (high) - Orchestrates the full SOC pipeline
8. **Command Line Interface** (medium) - CLI for running the SOC tool with arguments
9. **Unit Tests** (high) - Tests individual modules in isolation
10. **Integration Test** (medium) - Tests the full pipeline end-to-end

### Exam Readiness Storage
Mock data stored in `/lib/mock-data/winsoc-exam-readiness.ts` with helper functions in `/lib/utils/winsoc-readiness.ts`

## Informatika II. Quick Review Model

### WinsocQuickReviewCard
```typescript
type WinsocQuickReviewCard = {
  id: string;
  moduleId: string;
  title: string;
  oneSentence: string;
  explainLikeExamAnswer: string[];
  keyCodeConcepts: string[];
  likelyExamPrompts: string[];
  commonMistakes: string[];
  lastMinuteChecklist: string[];
};
```

### WinsocCheatSheetSection
```typescript
type WinsocCheatSheetSection = {
  id: string;
  title: string;
  priority: "critical" | "high" | "medium";
  content: string[];
};
```

### Helper Functions
```typescript
// Get all quick review cards
getWinsocQuickReviewCards(): WinsocQuickReviewCard[]

// Get quick review card by module ID
getWinsocQuickReviewCard(moduleId: string): WinsocQuickReviewCard | undefined

// Get quick review card by card ID
getWinsocQuickReviewCardById(id: string): WinsocQuickReviewCard | undefined

// Get all cheat sheet sections
getWinsocCheatSheetSections(): WinsocCheatSheetSection[]

// Get critical cheat sheet sections
getCriticalCheatSheetSections(): WinsocCheatSheetSection[]

// Get cheat sheet section by ID
getWinsocCheatSheetSection(id: string): WinsocCheatSheetSection | undefined

// Get last minute checklist
getLastMinuteChecklist(): string[]

// Get quick review cards by priority
getWinsocQuickReviewCardsByPriority(): {
  critical: WinsocQuickReviewCard[];
  high: WinsocQuickReviewCard[];
  medium: WinsocQuickReviewCard[];
}
```

### Quick Review Cards
The quick review model includes 10 module cards with exam-facing content:
1. **Template Engine** - HTML template rendering with variable substitution
2. **Mock Log Generator** - Generates fake Windows event logs for testing
3. **Windows Log Parser** - Parses raw Windows event logs into structured event objects
4. **Anomaly Detector** - Detects suspicious patterns (brute force, suspicious IPs)
5. **Integrity Checker** - Detects file changes using hash-based integrity checking
6. **Report Generator** - Generates HTML and JSON reports from analysis results
7. **Main Application** - Orchestrates the full SOC pipeline
8. **Command Line Interface** - CLI for running the SOC tool with arguments
9. **Unit Tests** - Tests individual modules in isolation
10. **Integration Test** - Tests the full pipeline end-to-end

### Cheat Sheet Sections
The cheat sheet includes 5 sections:
- 5-minute overview (critical)
- Key concepts (critical)
- Likely exam tasks (critical)
- Common mistakes (high)
- Last minute checklist (critical)

### Quick Review Storage
Mock data stored in `/lib/mock-data/winsoc-quick-review.ts` with helper functions in `/lib/utils/winsoc-quick-review.ts`

## Programozás Exam Model

### ProgrammingExamTopic
```typescript
type ProgrammingExamTopic = {
  id: string;
  title: string;
  priority: "critical" | "high" | "medium";
  summary: string;
  sourceFiles: string[];
  relatedLessonIds: string[];
  likelyTasks: string[];
  commonMistakes: string[];
};
```

### ProgrammingExamExercise
```typescript
type ProgrammingExamExercise = {
  id: string;
  title: string;
  topicId: string;
  difficulty: "easy" | "medium" | "exam";
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  solution?: string;
  sourceFile?: string;
  aiAllowed: boolean;
};
```

### ProgrammingExamRequirement
```typescript
type ProgrammingExamRequirement = {
  id: string;
  title: string;
  status: "known" | "unknown" | "partiallyKnown";
  description: string;
};
```

### Helper Functions
```typescript
// Get all exam topics
getProgrammingExamTopics(): ProgrammingExamTopic[]

// Get critical exam topics
getCriticalProgrammingExamTopics(): ProgrammingExamTopic[]

// Get exam topic by ID
getProgrammingExamTopicById(id: string): ProgrammingExamTopic | undefined

// Get all exam exercises
getProgrammingExamExercises(): ProgrammingExamExercise[]

// Get exam exercises by topic ID
getProgrammingExamExercisesByTopic(topicId: string): ProgrammingExamExercise[]

// Get exam exercises by difficulty
getProgrammingExamExercisesByDifficulty(difficulty: "easy" | "medium" | "exam"): ProgrammingExamExercise[]

// Get AI allowed exercises
getAIAllowedProgrammingExamExercises(): ProgrammingExamExercise[]

// Get all exam requirements
getProgrammingExamRequirements(): ProgrammingExamRequirement[]

// Get exam requirements by status
getProgrammingExamRequirementsByStatus(status: "known" | "unknown" | "partiallyKnown"): ProgrammingExamRequirement[]

// Get unknown exam requirements
getUnknownProgrammingExamRequirements(): ProgrammingExamRequirement[]

// Get minimum study path
getProgrammingExamMinimumPath(): string[]

// Get topic count by priority
getProgrammingExamTopicCountByPriority(): {
  critical: number;
  high: number;
  medium: number;
}

// Get exercise count by difficulty
getProgrammingExamExerciseCountByDifficulty(): {
  easy: number;
  medium: number;
  exam: number;
}
```

### Exam Topics
The Programozás exam model includes 10 topics extracted from ady_demo_zh.zip:
1. **String Normalization** (critical) - Convert strings to canonical form using regex
2. **Sets for O(1) Lookup** (critical) - Use Python sets for fast membership testing
3. **File I/O and Streaming** (critical) - Read files line-by-line, write output, handle encoding
4. **Command-line Argument Parsing** (high) - Parse CLI arguments using argparse
5. **Bcrypt Password Hashing** (critical) - Verify bcrypt hashes, extract cost factor
6. **Environment Variables** (high) - Read environment variables (PEPPER)
7. **Unit Testing with unittest** (critical) - Write unit tests using unittest module
8. **Error Handling and Exceptions** (high) - Define custom exceptions, handle errors gracefully
9. **Regular Expressions** (high) - Use regex patterns for string matching
10. **Output Separation (stdout/stderr)** (medium) - Separate clean output from verbose messages

### Exam Exercises
The model includes 5 exercises based on test patterns:
1. String Normalization Exercise (easy)
2. Set Lookup Exercise (medium)
3. Bcrypt Verification Exercise (exam)
4. CLI Argument Parsing Exercise (medium)
5. Unit Test Exercise (medium)

### Exam Requirements
The model includes 7 requirements:
- AI allowed (known)
- Python version 3.8+ (known)
- Dependencies: bcrypt (known)
- Exam format (partially known)
- Time allocation (unknown)
- Grading criteria (unknown)
- Submission format (unknown)

### Minimum Study Path
The minimum study path includes 10 steps:
1. Python alapok: változók, típusok, műveletek
2. String műveletek: lower(), strip(), regex
3. Adatszerkezetek: list, set, dict
4. Fájl I/O: olvasás, írás, encoding
5. Függvények: paraméterek, visszatérési érték, type hints
6. CLI: argparse, argumentumok
7. Hibakezelés: try-except, egyedi kivételek
8. Bcrypt: hash ellenőrzés, cost faktor
9. Környezeti változók: os.environ
10. Unit tesztelés: unittest, TestCase, assert

### Exam Storage
Mock data stored in `/lib/mock-data/programming-exam.ts` with helper functions in `/lib/utils/programming-exam.ts`

## May 9 Exam Strategy Model

### May9StrategyBlock
```typescript
type May9StrategyBlock = {
  id: string;
  title: string;
  subjectId: string;
  focusWeight: number;
  priority: "primary" | "secondary";
  badges: string[];
  summary: string;
  quickLinks: { label: string; href: string }[];
  topTopics: string[];
  likelyTasks: string[];
  commonMistakes: string[];
};
```

### SurvivalPathItem
```typescript
type SurvivalPathItem = {
  id: string;
  order: number;
  subjectId: string;
  title: string;
  why: string;
  link?: string;
};
```

### TimeBoxPlan
```typescript
type TimeBoxPlan = {
  id: string;
  minutes: 30 | 60 | 120;
  title: string;
  steps: string[];
};
```

### Helper Functions
```typescript
// Get all strategy blocks
getMay9StrategyBlocks(): May9StrategyBlock[]

// Get primary strategy block (Informatika II.)
getPrimaryMay9StrategyBlock(): May9StrategyBlock | undefined

// Get secondary strategy block (Programozás)
getSecondaryMay9StrategyBlock(): May9StrategyBlock | undefined

// Get survival path
getMay9SurvivalPath(): SurvivalPathItem[]

// Get survival path by subject
getMay9SurvivalPathBySubject(subjectId: string): SurvivalPathItem[]

// Get time-boxed plans
getMay9TimeBoxPlans(): TimeBoxPlan[]

// Get time-boxed plan by minutes
getMay9TimeBoxPlanByMinutes(minutes: 30 | 60 | 120): TimeBoxPlan | undefined

// Get quick links
getMay9QuickLinks(): Array<{ label: string; href: string; subject: string }>

// Get quick links by subject
getMay9QuickLinksBySubject(subjectId: string): Array<{ label: string; href: string; subject: string }>

// Get combined unknown requirements from both exams
getMay9UnknownRequirements(): {
  informatika2: Array<{ question: string }>;
  programozas: Array<{ title: string; description: string }>;
}

// Get critical topics for both exams
getMay9CriticalTopics(): {
  informatika2: Array<{ title: string; priority: string }>;
  programozas: Array<{ title: string; priority: string }>;
}

// Get top 3 critical topics for each exam
getMay9TopCriticalTopics(): {
  informatika2: string[];
  programozas: string[];
}

// Get top 3 exercises for Programozás
getMay9ProgrammingExercises(): Array<{ title: string; difficulty: string; topic: string }>
```

### Strategy Blocks
The model includes 2 strategy blocks:
1. **Informatika II.** (70% primary) - Windows SOC Analyst Tool, SOC pipeline, Template Engine, Parser + Detector, Report Generator
2. **Programozás** (30% secondary) - Project Sentinel, string normalization, bcrypt, CLI, unit tests

### Survival Path
The survival path includes 10 combined steps:
1. Informatika II.: SOC pipeline megértése
2. Informatika II.: Template Engine
3. Informatika II.: Parser + Detector
4. Informatika II.: Report Generator
5. Informatika II.: Unit tests / integration test
6. Programozás: string normalization
7. Programozás: sets + file I/O
8. Programozás: argparse + environment variables
9. Programozás: bcrypt
10. Programozás: unittest

### Time-Boxed Plans
The model includes 3 time-boxed plans:
- **30 perc terv**: Quick review of SOC pipeline, Template Engine, Programozás critical topics
- **60 perc terv**: Detailed SOC review, 2 SOC tasks, Programozás topics, 2 Programozás exercises
- **120 perc terv**: Full quick review, SOC critical modules, 3 SOC tasks, Programozas minimum path, 3 Programozás exercises

### Quick Links
The model includes 5 quick review links:
- Informatika II. gyorsismétlő → /programozas/winsoc/gyorsismetlo
- SOC részletes felkészülés → /programozas/winsoc
- Programozás vizsgafókusz → /subjects/bbxpr12blf/study
- Programozás HUB → /programozas
- Informatika II. subject page → /subjects/bbxin2kblf/study

### Strategy Storage
Mock data stored in `/lib/mock-data/may9-exam-strategy.ts` with helper functions in `/lib/utils/may9-exam-strategy.ts`

## Semester Results Model

### CompletedSubjectResult
```typescript
type CompletedSubjectResult = {
  id: string;
  name: string;
  code: string;
  credit: number;
  type: string;
  resultText: string;
  numericGrade: number | null;
  completed: boolean;
  includeInAverage: boolean;
};
```

### SemesterResult
```typescript
type SemesterResult = {
  semesterId: string;
  name: string;
  credits: number;
  enrolledCredits: number;
  completedCredits: number;
  weightedAverage: number;
  cumulativeWeightedAverage: number;
  subjects: CompletedSubjectResult[];
};
```

### Helper Functions
```typescript
// Get all semester results
getSemesterResults(): SemesterResult[]

// Get semester result by ID
getSemesterResultById(id: string): SemesterResult | undefined

// Get latest semester
getLatestSemester(): SemesterResult | undefined

// Calculate weighted average from subjects
calculateWeightedAverage(subjects: CompletedSubjectResult[]): number

// Get completed credits
getCompletedCredits(subjects: CompletedSubjectResult[]): number

// Get grade distribution (count of 5, 4, 3, 2, 1)
getGradeDistribution(subjects: CompletedSubjectResult[]): Record<number, number>

// Get best subjects by grade
getBestSubjects(subjects: CompletedSubjectResult[], limit?: number): CompletedSubjectResult[]

// Get weakest subjects by grade
getWeakestSubjects(subjects: CompletedSubjectResult[], limit?: number): CompletedSubjectResult[]

// Get subject by code
getSubjectByCode(code: string): CompletedSubjectResult | undefined
```

### Grade Mapping
```typescript
const gradeMapping: Record<string, number | null> = {
  "Elégtelen": 1,
  "Elégséges": 2,
  "Közepes": 3,
  "Jó": 4,
  "Jeles": 5,
  "Aláírva": null,
  "Megfelelt": null,
  "Kiválóan megfelelt": 5,
};
```

### Semester Data
The model includes 1 semester:
- **2025/26/1**: 10 subjects, 30 credits, 4.13 weighted average, 4.13 cumulative weighted average

**Subjects in 2025/26/1:**
1. Mérnöki fizika (természettudományi alapok) - BTXFZ11BLF - 4 kredit - Elégséges (2)
2. Hírközléstechnika - BBXHZ11BLF - 4 kredit - Jó (4)
3. Patronálás - BTIPAT1BLF - 0 kredit - Aláírva (null)
4. Informatika I. - BBXIN1KBLF - 5 kredit - Közepes (3)
5. Gazdálkodási és vállalkozási (Startup) ismeretek - BTXGV11BLF - 4 kredit - Jeles (5)
6. Elektrotechnika, digitális technika - BBXED11BLF - 5 kredit - Jeles (5)
7. Projektfeladat - BBPPF11BLF - 2 kredit - Jeles (5)
8. Testnevelés I. - OTTESI1BLF - 1 kredit - Kiválóan megfelelt (5)
9. Információbiztonság jogi- és humán aspektusai - BTXJH11BLF - 3 kredit - Jeles (5)
10. Tanulástechnika és tutorálás - BTXTU11BLF - 2 kredit - Jeles (5)

**Note:** Kiválóan megfelelt is treated as 5 for statistics because it matches the Neptun weighted average of 4.13.

### Semester Results Storage
Mock data stored in `/lib/mock-data/semester-results.ts` with helper functions in `/lib/utils/semester-results.ts`

## External Study Materials Model

### ExternalStudySection
```typescript
type ExternalStudySection = {
  id: string;
  title: string;
  category:
    | "topic"
    | "codeExample"
    | "exercise"
    | "commonMistake"
    | "reviewPlan"
    | "aiStrategy"
    | "survivalPath"
    | "sourceBasedExtension";
  priority: "critical" | "high" | "medium";
  summary: string;
  relatedTopicIds: string[];
  relatedLessonIds: string[];
  source: "grok" | "perplexity" | "combined";
};
```

### ExternalStudyMaterial
```typescript
type ExternalStudyMaterial = {
  id: string;
  title: string;
  subjectId: string;
  sourceType: "grok" | "perplexity" | "combined";
  fileName: string;
  priority: "primary" | "secondary";
  summary: string;
  extractedSections: ExternalStudySection[];
  integrationTargets: string[];
};
```

### Helper Functions
```typescript
// Get all external materials
getExternalMaterials(): ExternalStudyMaterial[]

// Get external material by ID
getExternalMaterialById(id: string): ExternalStudyMaterial | undefined

// Get external materials by subject
getExternalMaterialsBySubject(subjectId: string): ExternalStudyMaterial[]

// Get sections from a material
getExternalMaterialSections(materialId: string): ExternalStudySection[]

// Get sections by category
getSectionsByCategory(materialId: string, category: ExternalStudySection["category"]): ExternalStudySection[]
```

### External Materials
The model includes 2 external study materials:
- **Programozás – Vizsgafelkészítő tananyag** (bbxpr12blf): Project Sentinel / Secret Database CLI Tool material with 16 sections (topics, AI strategy, review plans, common mistakes)
- **Informatika II. – Vizsgafelkészítő tananyag** (bbxin2kblf): Python-based Windows SOC Analyst Tool material with 23 sections (10 modules, survival path, review plans, common mistakes, source-based extensions)

### External Study Materials Storage
Mock data stored in `/lib/mock-data/external-study-materials.ts`

## Programozás Exam Extended Model

### Extended Types
```typescript
type ProgrammingAiStrategy = {
  title: string;
  useFor: string[];
  avoidFor: string[];
  verificationSteps: string[];
};

type ProgrammingReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

type ProgrammingSourceNotes = {
  topic: string;
  summary: string;
  sources: string[];
};
```

### Extended Data
- **programmingAiStrategy**: AI usage strategy for Programozás exam (AI is allowed)
- **programmingReviewPlans**: 30/60/120 minute review plans
- **programmingSourceNotes**: Source-based notes with references
- **programmingCommonMistakesExtended**: Extended common mistakes list from Grok + Perplexity

### Programozás Exam Extended Storage
Extended data stored in `/lib/mock-data/programming-exam.ts`

## Winsoc Exam Readiness Extended Model

### Extended Types
```typescript
type WinsocReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

type WinsocSurvivalPath = {
  duration: string;
  steps: { time: string; action: string }[];
};

type WinsocSourceBasedExtension = {
  id: string;
  title: string;
  category: "soc" | "siem" | "hids" | "parsing" | "regex" | "brute-force" | "hashing";
  summary: string;
  keyConcepts: string[];
};
```

### Extended Data
- **winsocReviewPlans**: 30/60/120 minute review plans
- **winsocSurvivalPath**: 1-hour survival path
- **winsocCommonMistakesExtended**: Extended common mistakes from Grok + Perplexity
- **winsocSourceBasedExtensions**: Source-based extensions (SOC, SIEM, HIDS, parsing, regex, brute-force, hashing)

### Winsoc Exam Readiness Extended Storage
Extended data stored in `/lib/mock-data/winsoc-exam-readiness.ts`

### Winsoc Exam Readiness Model

### WinsocModule
```typescript
type WinsocModule = {
  id: string;
  title: string;
  shortDescription: string;
  roleInPipeline: string;
  mustUnderstand: string[];
  mustExplain: string[];
  likelyTasks: string[];
  commonMistakes: string[];
  relatedProgrammingLessonIds: string[];
  exercises: string[];
  examPriority: "critical" | "high" | "medium";
  examExplanation: string;
  howItWorks: string[];
  codeExample?: string;
  miniExercise?: {
    title: string;
    prompt: string;
    starterCode?: string;
    solution?: string;
  };
  examAnswerTemplate?: string;
};
```

### New Fields (2026-05-07)
- **examExplanation**: Hungarian explanation of what the module does in exam context
- **howItWorks**: Step-by-step Hungarian bullet list of how the module works
- **codeExample**: Python code example for critical modules (windows-log-parser, anomaly-detector, integrity-checker, main-application, cli, unit-tests)
- **miniExercise**: Practice exercise with prompt, starter code, and solution (anomaly-detector)
- **examAnswerTemplate**: Hungarian spoken/written answer template for exam

### Winsoc Modules
10 modules: template-engine, mock-log-generator, windows-log-parser, anomaly-detector, integrity-checker, report-generator, main-application, cli, unit-tests, integration-test

### Winsoc Exam Readiness Storage
Data stored in `/lib/mock-data/winsoc-exam-readiness.ts`

## Study Materials Model

### StudyMaterial
```typescript
type StudyMaterial = {
  id: string;
  title: string;
  fileName?: string;
  type: "pdf" | "docx" | "pptx" | "txt" | "zip" | "repo" | "link";
  subjectIds: string[];
  subjectNames?: string[];
  status: "uploaded" | "processed" | "linked" | "generated" | "missing";
  source: "uploaded" | "external" | "generated" | "repo";
  publicPath?: string;
  externalUrl?: string;
  usedIn: string[];
  description?: string;
  previewMode: "pdf" | "docx" | "txt" | "pptx-fallback" | "download" | "external-link" | "none";
};
```

### Material Types
- **pdf**: PDF document with iframe preview
- **docx**: Word document with simplified HTML preview (mammoth.js fallback)
- **pptx**: PowerPoint presentation with fallback (download/open buttons)
- **txt**: Text file with fetch and display
- **zip**: ZIP archive (download-only)
- **repo**: Git repository (external link)
- **link**: External URL (external link)

### Status Values
- **uploaded**: File uploaded to public/materials
- **processed**: File processed for preview
- **linked**: External resource linked
- **generated**: Content generated (e.g., from AI)
- **missing**: File not available (red badge, previewMode: "none")

### Preview Modes
- **pdf**: iframe/object preview
- **docx**: mammoth.js simplified HTML preview
- **txt**: fetch and display text
- **pptx-fallback**: fallback card with open/download buttons
- **download**: download-only card
- **external-link**: external link card
- **none**: no preview available

### Materials by Subject
- **Informatika II (bbxin2kblf)**: 4 materials
  - kiber_levelezo-potjegyzet.pdf (uploaded, pdf preview)
  - kiber_levelezo-potjegyzet.docx (uploaded, docx preview)
  - 2026_02_21_Kiber_levelezo.docx (missing, no preview)
  - Winsoc Git repo (linked, external-link)
- **Programozás (bbxpr12blf)**: 2 materials
  - ady_demo_zh.zip (uploaded, download)
  - programozas-vizsgafelkészito.txt (generated, txt preview)
- **Vezetékes hálózatok (bbxvn12blf)**: 2 materials
  - W_WL_Network1.1.pptx (uploaded, pptx-fallback)
  - W_WL_Network1.2.pptx (uploaded, pptx-fallback)

### Study Materials Storage
Data stored in `/lib/mock-data/study-materials.ts`
Helper functions in `/lib/utils/study-materials.ts`
Preview component in `/components/materials/material-preview.tsx`

### File Storage
Files served from `public/materials/` directory:
- `public/materials/informatika-ii/`
- `public/materials/programozas/`
- `public/materials/vezetekes-halozatok/`

### Privacy Note
"A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba."

## Winsoc Quick Review Extended Model

### Extended Types
```typescript
type WinsocReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

type WinsocSurvivalPath = {
  duration: string;
  steps: { time: string; action: string }[];
};
```

### Extended Data
- **winsocQuickReviewPlans**: 30/60/120 minute review plans
- **winsocQuickSurvivalPath**: 1-hour survival path

### Winsoc Quick Review Extended Storage
Extended data stored in `/lib/mock-data/winsoc-quick-review.ts`

## Clerk Authentication Model

### User Identity
**Decision**: Authentication is handled by Clerk. Supabase is used only for database/progress storage (optional). Progress records use Clerk user ID as text (e.g., user_xxx), not Supabase auth.users UUID.

### Clerk User ID
```typescript
type ClerkUserId = string; // Format: "user_xxx" from Clerk
```

### Progress Storage Tables (Supabase)
The Supabase database schema uses TEXT user_id to store Clerk user IDs:

#### study_progress table
```sql
CREATE TABLE study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,  -- Clerk user ID (e.g., user_xxx)
  scope TEXT NOT NULL,
  item_id TEXT NOT NULL,
  status TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scope, item_id)
);
```

#### practice_exam_attempts table
```sql
CREATE TABLE practice_exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,  -- Clerk user ID (e.g., user_xxx)
  exam_id TEXT NOT NULL,
  score_percent NUMERIC,
  achieved_points NUMERIC,
  total_points NUMERIC,
  answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### material_notes table
```sql
CREATE TABLE material_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,  -- Clerk user ID (e.g., user_xxx)
  subject_id TEXT,
  material_id TEXT,
  title TEXT,
  content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policy Helper Function
```sql
-- Helper function to extract Clerk user ID from JWT claims
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.jwt() ->> 'sub'::text;
$$;
```

### RLS Policies
All RLS policies use the requesting_user_id() helper function to match the Clerk user ID from JWT claims.

### Progress Sync Utilities
The progress-sync.ts utilities now accept an optional clerkUserId parameter for Clerk integration.

### Environment Variables
```bash
# Clerk Authentication (required for private access)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database (optional - for progress persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Migration Note
Supabase Auth magic link flow was removed/deprecated. The migration 001_study_progress.sql was updated to use TEXT user_id for Clerk user IDs instead of UUID references to auth.users.

## Practice Exam Model

### PracticeExamQuestionType
```typescript
type PracticeExamQuestionType = "coding" | "explanation" | "debugging" | "multipleChoice" | "shortAnswer";
```

### PracticeExamQuestion
```typescript
type PracticeExamQuestion = {
  id: string;
  type: PracticeExamQuestionType;
  title: string;
  prompt: string;
  starterCode?: string;
  options?: string[];
  expectedAnswer?: string;
  points: number;
  relatedTopicIds: string[];
};
```

### PracticeExamSolution
```typescript
type PracticeExamSolution = {
  questionId: string;
  solution: string;
  explanation: string;
  gradingCriteria: string[];
};
```

### PracticeExam
```typescript
type PracticeExam = {
  id: string;
  title: string;
  subjectId: string;
  durationMinutes: number;
  difficulty: "easy" | "medium" | "exam";
  description: string;
  questions: PracticeExamQuestion[];
  solutionKey: PracticeExamSolution[];
};
```

### Practice Exams
The model includes 2 practice exams for private study support:
- **Informatika II. próbavizsga** (bbxin2kblf): 60 minutes, 7 questions covering Windows SOC pipeline, parsing, brute force detection, integrity checking, report generation, and unit testing
- **Programozás próbavizsga** (bbxpr12blf): 45 minutes, 7 questions covering string normalization, set operations, file I/O, argparse, bcrypt/environment variables, unittest, and stdout/stderr

### Helper Functions
```typescript
// Get all practice exams
getAllPracticeExams(): PracticeExam[]

// Get practice exam by ID
getPracticeExamById(id: string): PracticeExam | undefined

// Get practice exams by subject
getPracticeExamsBySubject(subjectId: string): PracticeExam[]
```

### Practice Exam Storage
Mock data stored in `/lib/mock-data/practice-exams.ts`

## Progress Persistence Model

### StudyProgressState
```typescript
type StudyProgressState = {
  completedLessons: string[];
  completedPracticeQuestions: string[];
  completedChecklistItems: string[];
  completedQuickReviewCards: string[];
  lastUpdatedAt: string;
};
```

### Storage Location
- Storage: localStorage in browser
- Storage key: "susu-study-progress"
- Purpose: Private local/personal study use only
- Data stored: Only small state (booleans, IDs, timestamps, progress percentages)
- Data NOT stored: File contents, documents, sensitive data

### Helper Functions
```typescript
// Get all progress state
getProgressState(): StudyProgressState

// Set partial progress state
setProgressState(partial: Partial<StudyProgressState>): void

// Mark lesson as complete
markLessonComplete(lessonId: string): void

// Unmark lesson as complete
unmarkLessonComplete(lessonId: string): void

// Mark practice question as done
markPracticeQuestionDone(questionId: string): void

// Unmark practice question as done
unmarkPracticeQuestionDone(questionId: string): void

// Mark checklist item as done
markChecklistItemDone(itemId: string): void

// Unmark checklist item as done
unmarkChecklistItemDone(itemId: string): void

// Mark quick review card as done
markQuickReviewCardDone(cardId: string): void

// Unmark quick review card as done
unmarkQuickReviewCardDone(cardId: string): void

// Get lesson progress percentage
getLessonProgress(lessonIds: string[]): number

// Get practice question progress percentage
getPracticeQuestionProgress(questionIds: string[]): number

// Reset progress for scope
resetProgressForScope(scope: "lessons" | "practice" | "checklist" | "quickReview" | "all"): void

// Check if lesson is complete
isLessonComplete(lessonId: string): boolean

// Check if practice question is done
isPracticeQuestionDone(questionId: string): boolean

// Check if checklist item is done
isChecklistItemDone(itemId: string): boolean

// Check if quick review card is done
isQuickReviewCardDone(cardId: string): boolean
```

### Progress Storage Location
Storage implementation in `/lib/utils/progress-storage.ts`

## Code Execution Architecture Plans

### CodeExecutionMode
```typescript
type CodeExecutionMode = "none" | "future-pyodide" | "future-backend";
```

### Current Mode
- Current execution mode: "none"
- The app currently uses manual self-check and solution toggles
- No Pyodide implementation
- No backend implementation

### Future Plans
- Pyodide execution planned for simple Python exercises (client-side, WebWorker isolation)
- Backend execution planned for full Python environment (container-based isolation)
- Architecture plans documented in `/lib/utils/code-execution-plans.ts`
- No implementation yet

### Code Execution Plans Location
Architecture plans in `/lib/utils/code-execution-plans.ts`

## Grading Architecture Plans

### GradingMode
```typescript
type GradingMode = "manual" | "exact-output-later" | "unit-test-later" | "ai-assisted-later";
```

### Current Mode
- Current grading mode: "manual"
- Practice exam self-scoring: Nem tudom (0%), Részben (50%), Tudom (100%)
- Estimated score calculation with status badges
- No automatic grading implementation

### Future Plans
- Exact output grading planned for simple coding exercises
- Unit test based grading planned for complete implementations
- AI assisted grading planned for feedback only (not official grades)
- Architecture plans documented in `/lib/utils/grading-plans.ts`
- No implementation yet

### Grading Principles
- Transparency: Always clearly indicate how grading works
- Accuracy: Acknowledge limitations and potential errors
- Privacy: Protect user code and submissions
- Fairness: Avoid bias in automated grading
- Human oversight: Human review for official assessment
- Educational focus: Grading for learning, not punishment
- User control: User maintains control over their learning

### Grading Plans Location
Architecture plans in `/lib/utils/grading-plans.ts`

## Automatic Test-Based Self-Checking Model

### CodingTestCase
```typescript
type CodingTestCase = {
  id: string;
  questionId: string;
  label: string;
  functionName?: string;
  args?: unknown[];
  expectedReturn?: unknown;
  stdin?: string;
  expectedStdout?: string;
  expectedStderr?: string;
  hidden?: boolean;
  explanation?: string;
};
```

### CodingQuestionTestSuite
```typescript
type CodingQuestionTestSuite = {
  questionId: string;
  title: string;
  mode: "function-return" | "stdout" | "conceptual-manual";
  testCases: CodingTestCase[];
};
```

### CodingGradeResult
```typescript
type CodingGradeResult = {
  questionId: string;
  passed: number;
  total: number;
  percent: number;
  results: {
    testCaseId: string;
    label: string;
    passed: boolean;
    message: string;
    visible: boolean;
  }[];
};
```

### Test Suites Storage
Mock data stored in `/lib/mock-data/coding-test-cases.ts`

### Test Suites Created
- Programozás: String normalization (5 test cases) - mode: function-return
- Programozás: Set duplicate detection (5 test cases) - mode: function-return
- Programozás: File I/O streaming simulation (4 test cases) - mode: function-return
- Informatika II: Log line parsing (4 test cases) - mode: function-return
- Informatika II: Failed login count by IP (4 test cases) - mode: function-return
- Informatika II: Brute force detection (4 test cases) - mode: function-return

### Grading Utilities
```typescript
// Get test suite for a question
getTestSuiteForQuestion(questionId: string): CodingQuestionTestSuite | undefined

// Calculate grade percentage
calculateGradePercent(passed: number, total: number): number

// Get grade status based on percentage
getGradeStatus(percent: number): "Gyenge" | "Átmenő közelében" | "Rendben" | "Erős"

// Grade a function-return question based on Pyodide execution result
gradeFunctionReturnQuestion(questionId: string, pyodideResult, testSuite): CodingGradeResult

// Generate Python test wrapper code
generateTestWrapper(userCode: string, testSuite: CodingQuestionTestSuite): string

// Parse test results from Pyodide stdout
parseTestResults(stdout: string): CodingGradeResult["results"]
```

### Grading Utilities Location
Implementation in `/lib/utils/code-grading.ts`

### Pyodide Test Execution
```typescript
type TestExecutionResult = ExecutionResult & {
  testResults?: any[];
};

// Run Python code with test cases
runPythonWithTests(code: string, testSuite: CodingQuestionTestSuite): Promise<TestExecutionResult>
```

### Test Execution Location
Extended implementation in `/lib/utils/pyodide-runner.ts`

### Privacy Note
- Only test results (passed/total, percentage) are stored in localStorage, not full user code
- User code is executed in-browser through Pyodide for controlled practice tasks
- Full code content is not stored in Supabase by default
- Test cases are deterministic and simple (function return, stdout comparison)
- Grading is educational only, not official assessment
- Hungarian wording used: "Automatikus önellenőrzés", "Nem hivatalos pontszám" to clarify educational purpose

## Curriculum Map User-Specific State Model

### Purpose
Separate global curriculum data from user-specific progress tracking to prevent data duplication and allow personal progress tracking without affecting shared curriculum structure.

### Global Shared Data
(stored in `/lib/mock-data/curriculum.ts`):
- Curriculum structure (semesters, subjects)
- Subject names, codes, credits
- Recommended semester
- Subject families (programming, cybersecurity, networks, math, project, elective, pe, thesis)
- Official/estimated dependencies
- Learning materials
- Practice exams
- Programming lessons
- Winsoc lessons
- Exam preparation content

### User-Specific Data
(stored in localStorage under `susu-user-subject-state`):
- Grades
- Completion status
- Current subject progress
- Notes
- Practice exam attempts
- Checklist progress
- Selected subject state
- Personal curriculum map status

### User Subject State Types

```typescript
type SubjectUserStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "failed"
  | "not_taken"
  | "waived";

type SubjectVisualState =
  | "completed"
  | "in_progress"
  | "not_started"
  | "blocked"
  | "not_taken_failed";

type UserSubjectState = {
  subjectId: string;
  status: SubjectUserStatus;
  grade?: number | null;
  resultText?: string | null;
  completedAt?: string | null;
  note?: string | null;
  updatedAt: string;
};
```

### User Subject State Functions
(in `/lib/utils/user-subject-state.ts`):
- `getAllUserSubjectStates()`: Get all user subject states from localStorage
- `getUserSubjectState(subjectId)`: Get user state for a specific subject
- `setUserSubjectStatus(subjectId, status, note?)`: Set user status for a subject
- `setUserSubjectGrade(subjectId, grade, resultText?)`: Set user grade for a subject
- `isSubjectCompleted(subjectId)`: Check if a subject is completed by the user
- `isSubjectBlocked(subjectId, dependencies, states)`: Check if a subject is blocked by missing prerequisites
- `getBlockingDependencies(subjectId, dependencies, states)`: Get blocking dependencies for a subject
- `getDependentSubjects(subjectId, dependencies)`: Get subjects that depend on a given subject
- `getSubjectVisualState(subjectId, dependencies, states, currentSemesterNumber, subjectSemesterNumber)`: Get visual state for a subject
- `resetSubjectState(subjectId)`: Reset state for a specific subject
- `initializeDefaultUserState()`: Initialize default user state from previous semester results

### Storage
- localStorage key: `susu-user-subject-state`
- Storage format: JSON object mapping subjectId to UserSubjectState
- Only user-specific state is stored
- No global curriculum data duplication
- No learning content storage

### Default Initialization
Previous semester subjects initialized as completed with grades:
- Mérnöki fizika: grade 2
- Hírközléstechnika: grade 4
- Patronálás: aláírva
- Informatika I.: grade 3
- Gazdálkodási és vállalkozási / Startup: grade 5
- Elektrotechnika, digitális technika: grade 5
- Projektfeladat: grade 5
- Testnevelés I.: kiválóan megfelelt
- Információbiztonság jogi- és humán aspektusai: grade 5
- Tanulástechnika és tutorálás: grade 5

May 9 subjects set to in_progress by default:
- Programozás (bbxpr12blf)
- Informatika II. (bbxin2kblf)

### Visual State Logic
- `completed`: User marked completed OR grade exists and passing (≥2)
- `in_progress`: Current semester or manually marked in progress
- `not_started`: Future/not touched
- `blocked`: Prerequisite missing (shows warning icon)
- `not_taken_failed`: Greyed out for failed/not taken subjects

### Dependency Warning Logic
- If a subject has dependencies, check whether all dependencies are completed or waived
- If not, subject is blocked
- Show warning icon on blocked subjects
- Show missing prerequisite list in detail panel
- Official dependencies use solid line / stronger warning
- Estimated dependencies use dashed line / softer warning

### UI Components
- Horizontal scrollable semester board layout (replaced ReactFlow graph)
- Each semester column has: title, credit total, completed count
- Subject cards show: name, code, credit, status badge, grade, warning icon if blocked
- Subject detail panel on click with:
  - Subject information (semester, credits, type, status)
  - Current grade/result
  - Blocking dependencies list
  - Dependent subjects list
  - Status controls (Nem kezdtem el, Folyamatban, Teljesítve, Nincs meg, Nem vettem fel, Felmentve)
  - Grade controls (1-5, Aláírva, Megfelelt, Kiválóan megfelelt)
  - Reset button

### Filter Controls
- Show dependencies toggle
- Show estimated dependencies toggle
- Highlight current semester toggle
- Family filter (all, programming, cybersecurity, networks, math, project, elective, pe, thesis)
- Status filter (all, completed, in_progress, not_started, blocked)
- Dependency mode (none, selected chain, all official, all estimated)

### Privacy Notes
- User-specific state stored in localStorage only
- No server-side storage of user progress
- Curriculum structure is shared and immutable per user
- No risk of users modifying shared curriculum data
- Simplifies future multi-user support if needed

## Materials Library Model

### Material
```typescript
type Material = {
  id: string;
  title: string;
  subject: string;
  type: "PDF" | "DOCX" | "PPTX" | "TXT" | "ZIP" | "REPO";
  status: "uploaded" | "processed" | "needs-inspection" | "linked";
  usedIn: string[];
  externalLink?: string;
  studyLink?: string;
};
```

### Materials Storage
Mock data stored in `/app/materials/page.tsx`

### Supported File Types
- PDF: Preview via iframe/object URL
- TXT/MD: Show text content
- DOCX: Placeholder (mammoth.js planned for future)
- PPTX: Placeholder (download or conversion planned for future)

## Progress UI Integration

### Lesson Completion State
**Location**: `/programozas/python/[lessonSlug]`
**UI Element**: "Késznek jelölöm" / "Lecke kész" button in lesson summary card
**Storage**: Uses `markLessonComplete()` and `isLessonComplete()` from progress-storage.ts
**Stored**: lessonId only (boolean completion state)

### Winsoc Quick Review Progress
**Location**: `/programozas/winsoc/gyrosimetlo`
**UI Elements**:
- Progress bar showing completed/total cards
- Checkbox on each quick review card
- "Átnézve" badge on completed cards
- Reset button: "Gyorsismétlő haladás törlése"
**Storage**: Uses `markQuickReviewCardDone()`, `isQuickReviewCardDone()`, `resetProgressForScope("quickReview")`
**Stored**: cardId only (boolean completion state)

### May 9 Survival Path Checklist
**Location**: `/exam-sprint/maj9`
**UI Elements**:
- Progress summary card showing:
  - Túlélő útvonal: X/Y kész
  - Gyorsismétlő: X/Y átnézve
  - Próbavizsga: X/Y kész
- Checkboxes on survival path items
- Reset button: "Haladás törlése"
**Storage**: Uses `markChecklistItemDone()`, `isChecklistItemDone()`, `resetProgressForScope("checklist")`
**Stored**: itemId only (boolean completion state)

### Reset Functionality
**Scope-based reset**:
- `resetProgressForScope("lessons")` - Clears lesson completion state
- `resetProgressForScope("practice")` - Clears practice question state
- `resetProgressForScope("checklist")` - Clears checklist item state
- `resetProgressForScope("quickReview")` - Clears quick review card state
- `resetProgressForScope("all")` - Clears all progress state

**Reset buttons**:
- Gyorsismétlő haladás törlése - Resets quick review scope
- Haladás törlése (maj9) - Resets checklist scope






