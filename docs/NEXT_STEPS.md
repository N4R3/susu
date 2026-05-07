# Next Steps

## Completed Tasks

### Informatika II. SOC Track Integration (Complete)
- [x] Create exam-materials data model in /lib/mock-data/exam-materials.ts with detailed metadata for Informatika II., Programozás, and Network exam materials
- [x] Create helper functions in /lib/utils/exam-materials.ts for filtering exam materials by subject, priority, inspection status, and exam focus
- [x] Add "winsoc" track to Programozás HUB data with track metadata (status, level, color, icon)
- [x] Add 10 SOC-focused lessons to winsoc track with metadata linking to Informatika II. subject with high exam priority
- [x] Add 7 SOC-oriented exercises (string template, random event, log parsing, counter statistics, file hash, JSON report, unit test)
- [x] Update /exam-sprint to show Informatika II. as primary focus with two prominent cards (primary/harder vs secondary/easier)
- [x] Create /programozas/winsoc dedicated page with SOC project overview, pipeline modules, learning path, exam materials, and minimum checklist
- [x] Add SOC project section to /programozas main hub page with module overview and link to winsoc page
- [x] Update /subjects/bbxin2kblf/study with SOC-focused sections (10 sections covering SOC project from overview to full pipeline)
- [x] Add SOC project card to Informatika II. study page with module icons and link to winsoc page
- [x] Update /subjects/bbxpr12blf/study with AI allowed badge and ady_demo_zh.zip source
- [x] Add Programozás AI allowed card to Programozás study page
- [x] Update /subjects/bbxvn12blf/study with later exam focus (2026-05-23) and disabled action
- [x] Add Network later exam card to Network study page
- [x] Run lint and build validation (passed with warnings only)
- [x] Update documentation (PROGRESS.md, DATA_MODEL.md, DECISIONS.md)

### Informatika II. Exam Readiness Model (Complete)
- [x] Create winsoc-exam-readiness.ts data model with WinsocModule, WinsocReadinessChecklistItem, WinsocUnknownRequirement types
- [x] Add 10 SOC module entries with detailed exam-readiness content (must understand, must explain, likely tasks, common mistakes)
- [x] Create winsoc-readiness.ts helper functions for filtering modules, checklist, minimum exam path, unknown requirements
- [x] Update /programozas/winsoc with exam-oriented sections (hero, 3-sentence summary, pipeline visual, module readiness grid, minimum exam path, unknown requirements)
- [x] Update /subjects/bbxin2kblf/study to use readiness data (school-facing version with critical modules, minimum path, unknown requirements)
- [x] Update /exam-sprint with "Mai Informatika II. minimum" section (3 critical modules, 3 practice tasks, 3 unknown requirements, CTA to winsoc)
- [x] Update documentation (PROGRESS.md, NEXT_STEPS.md, DECISIONS.md, DATA_MODEL.md)

### Informatika II. Exam Readiness - Next Steps
- Get exact Informatika II. allowed tools (AI, internet, own code, Git repo access)
- Get exact grading criteria from instructor
- Inspect actual winsoc.py source if accessible
- Inspect test_winsoc.py if accessible
- Map exercises to exact code sections
- Later add real progress persistence for checklist items
- Clarify unknown exam requirements with instructor

### Informatika II. Quick Review - Next Steps
- Replace generic quick-review cards with exact exam prompts after requirements are clarified
- Add actual screenshots/report examples from WindowsSOCSecurityReport if available
- Add real code section references after inspecting winsoc.py and test_winsoc.py
- Consider adding a printable PDF export of the quick review page for offline use

### Programozás Exam ZIP Processing - Next Steps
- Get exact Programozás exam format and time allocation from instructor
- Get exact grading criteria for the exam
- Clarify unknown exam requirements (time allocation, grading, submission format)
- Add more exam exercises based on additional patterns found in the ZIP
- Consider adding actual code section references from sentinel.py
- Later add real progress persistence for Programozás exam preparation

### May 9 Unified Exam Strategy - Next Steps
- Update time-boxed plans based on actual exam time allocation
- Add more specific quick review links as exam materials evolve
- Consider adding progress tracking for survival path checklist
- Add real-time countdown to the strategy page
- Later add mobile-optimized view of the strategy page

### May 9 Exam Cockpit QA & Freeze - Next Steps
- May 9 exam cockpit is frozen and ready for use
- All routes verified and working
- All CTAs verified and working
- Priority hierarchy consistent across all pages
- Mobile layout verified (responsive grid layouts, no overflow)
- Data consistency verified (exam date: 2026-05-09, routes: bbxin2kblf, bbxpr12blf)
- No further changes planned until after May 9 exams

### 2025/26/1 Semester Results - Next Steps
- Add more semesters as they are completed
- Consider adding semester comparison features
- Later add GPA trend visualization
- Consider adding grade prediction based on current semester progress

### Grok + Perplexity Study Materials Integration - Next Steps
- Data layer enrichment is complete for both Programozás and Informatika II materials
- AI usage strategy, review plans, source notes, and common mistakes added to data models
- 1-hour survival path and review plans added for Informatika II
- Source-based extensions (SOC, SIEM, HIDS concepts) added to data models
- UI pages can be updated to surface the enriched material as needed
- No further data layer work needed unless new materials are added

### May 9 Exam Cockpit - Post-Exam Improvements
- The private May 9 study cockpit is now feature-complete and frozen for personal use
- All 17 static pages build successfully
- All navigation links work correctly
- Practice exam layer integrated with solution toggles
- Focus priorities maintained: Informatika II 70% (primary), Programozás 30% (secondary)
- Terminology avoids cheating-oriented wording (uses Gyorsismétlő, Vizsga előtti összefoglaló, Önellenőrző, Próbavizsga, Minimum útvonal)
- No further changes planned before May 9 exams
- Post-exam improvements (if needed): interactive code execution, persistent progress saving, automatic grading

### Private Study Features - Current Status
- Progress persistence implemented with localStorage (practice exam questions, lessons, checklists, quick review cards)
- Practice exam self-scoring implemented (Nem tudom / Részben / Tudom with estimated score calculation)
- File preview foundation added to notes page (PDF, TXT/MD preview, DOCX/PPTX placeholders)
- Materials library page created with grouped study materials
- Architecture plans created for future code execution (Pyodide or backend) and automatic grading
- No backend added, no Pyodide implementation, no automatic grading - all manual self-check only
- File contents not stored in localStorage, only metadata and small state
- All preview is client-side only

### Future Enhancements (Deferred)
- Interactive code execution: Pyodide or isolated backend execution (architecture planned, not implemented)
- Automatic grading: exact output, unit test, or AI-assisted (architecture planned, not implemented)
- Advanced file preview: mammoth.js for DOCX, PPTX conversion (placeholders in place)
- Progress persistence for lessons: markLessonComplete functions available, UI integration complete

### Local Progress UI Integration (Complete)
- Lesson completion state: "Késznek jelölöm" / "Lecke kész" button on /programozas/python/[lessonSlug]
- Winsoc quick review progress: Progress bar with completed/total count on /programozas/winsoc/gyorsismetlo
- Quick review card checkboxes: Each module card has "Átnézve" checkbox on gyrosimetlo
- May 9 survival path checklist: Persistence on /exam-sprint/maj9 with checkboxes
- May 9 progress summary: Shows Túlélő útvonal, Gyorsismétlő, Próbavizsga progress counts
- Reset buttons: Gyorsismétlő haladás törlése, Május 9 haladás törlése
- All progress persists after refresh using localStorage
- No content stored in localStorage, only metadata and small state

### Curriculum Map Redesign (Complete)
- [x] Add visualCategory field to curriculum data for subject families
- [x] Add visual category color system with Tailwind classes
- [x] Create CurriculumHeaderStats component with stylish summary cards
- [x] Create CurriculumControlsBar with toggles and filters
- [x] Create CurriculumLegend component
- [x] Create CurriculumNodeCard with color-coded design
- [x] Implement full-width semester-based graph layout with React Flow
- [x] Add toggleable dependency connection lines
- [x] Add node click interaction with chain highlighting
- [x] Update curriculum map page with new components
- [x] Update documentation (DECISIONS.md, PROGRESS.md)
- [ ] Collect real official prerequisite relationships from university
- [ ] Replace estimated dependencies with official ones when available
- [ ] Add detail panel/drawer when node is clicked
- [ ] Add subject family filtering in graph view
- [ ] Add prerequisite chain filtering in graph view

### BBLFKM MVP Implementation
- [x] Update mock data with BBLFKM program and 8 subjects
- [x] Update types with new data structure
- [x] Prepare tldraw placeholder for global notes
- [x] Create curriculum map page with React Flow placeholder
- [x] Update subject detail pages with new data structure
- [x] Test and verify all pages

### Full 7-Semester Curriculum Map
- [x] Create curriculum data file with 7 semesters and all subjects
- [x] Update types with curriculum data structures
- [x] Implement curriculum map with filters and legend
- [x] Add estimated dependencies from curriculum image
- [x] Update documentation (DATA_MODEL, PRODUCT_REQUIREMENTS, PROGRESS, DECISIONS)

### Exam Sprint Implementation
- [x] Create deadlines data file with real exam and deadline data
- [x] Update types with deadline and exam sprint data structures
- [x] Add utility functions for urgent deadline detection and grouping
- [x] Update dashboard with urgent exam section and visual separation
- [x] Create /exam-sprint route with study plan and topic checklist
- [x] Collect real Programozás exam topic list from the university
- Collect real Informatika II. lab requirements from the university
- Replace generic exam tasks with actual exam-style tasks based on real exam papers
- Add Python execution/checking (Pyodide or backend) for exercise validation
- Add progress tracking for lessons and exercises
- Add more advanced topics (data structures, algorithms) for follow-up exams

### Programozás HUB Implementation
- [x] Create programming data model in /lib/mock-data/programming.ts with tracks, lessons, exercises, school relevance
- [x] Create helper functions in /lib/utils/programming.ts for filtering lessons by track, subject relevance, exam priority
- [x] Create /programozas main hub page with hero, track cards, progress overview, school connection section
- [x] Create /programozas/python track page with lesson list, difficulty, school relevance chips
- [x] Create /programozas/python/[lessonSlug] lesson page with nav, content blocks, exercises, aside
- [x] Create /programozas/ai-programozas placeholder page with planned path description
- [x] Create /programozas/kiberbiztonsag placeholder page with planned path description
- [x] Create /programozas/gyakorlas exercise library page with filters and grouping
- [x] Create /programozas/projektek project-based learning page
- [x] Update /subjects/[subjectId]/study to surface relevant Programozás HUB lessons for all subjects
- [x] Update /exam-sprint to pull recommended lessons from Programozás HUB
- [x] Update main dashboard Programozás and Informatika II. cards to link to Programozás HUB
- [x] Add Programozás link to navbar
- [x] Run typecheck, build, and validate all routes

## Current Priority

**Focus**: Exam Preparation for 2026-05-09
**Timeline**: Programozás and Informatika II. exams on 2026-05-09
**Success Criteria**: Complete study topics and pass both exams

### Exam Sprint Content (Immediate)
- [x] Add exam priority metadata to Python lessons (high/medium/low for bbxpr12blf and bbxin2kblf)
- [x] Add 12 new exam-style exercises (variable/input-output, condition, loop, function, list, string, algorithm, debugging, code completion, expected output, mini task, mixed exam simulation)
- [x] Add emergency study path "Ha kevés időd van" (Input/output, Feltételek, Ciklusok, Függvények, Listák, Vizsgafeladatok)
- [x] Add emergency study path to /programozas, /programozas/python, /exam-sprint, /subjects/bbxpr12blf/study
- [x] Improve exam sprint recommendations with "Vizsga előtti minimum útvonal" section
- [x] Add "Vizsgára kötelező minimum" section to Programozás subject study page
- [x] Add "Gyakorlófeladatok" section to Programozás subject study page
- [ ] Collect real Programozás exam topics from lectures/materials
- [ ] Collect real Informatika II. lab exam requirements and exercises
- [ ] Replace placeholder daily focus with real study plan content
- [ ] Add practice exercise links to topic checklist items

## Phase 2 Next Steps

### Build Notes Page
- File upload component with drag-and-drop
- File list with metadata (name, type, size, upload date)
- Preview panel for PDF, txt, md, images
- File organization by subject
- Link files to specific study modules or classes

### Build Study Page
- AI generated study content structure
- Explanation blocks (text content)
- Examples with code snippets
- Formulas with math rendering (KaTeX)
- Exercises with input fields
- Local answer checker for validation
- Progress tracking per module

## Phase 3 Next Steps

### Build Classes Page
- Class schedule with date/time/location
- Past class notes input
- Future class preparation notes
- File linking to classes
- Attendance tracking

### Update Subject Description Page
- Full subject metadata display
- Prerequisites with subject links
- Dependent subjects with subject links
- Quick links to external resources

## Phase 4 Next Steps

### Backend Integration
- [x] Set up authentication (Clerk - completed)
- [x] Set up database schema for progress (Supabase - completed with Clerk user_id)
- [x] Create progress sync utilities (progress-sync.ts - completed)
- [ ] Replace mock data with API calls (deferred - localStorage works for now)
- [ ] Add error handling and loading states

### Automatic Test-Based Self-Checking (Completed)
- [x] Create test cases for Programozás and Informatika II coding questions
- [x] Implement grading utilities with percentage calculation and status determination
- [x] Extend Pyodide runner for test execution
- [x] Update probavizsga UI with auto-check button and results display
- [x] Add Hungarian wording: "Automatikus önellenőrzés", "Nem hivatalos pontszám"
- [x] Keep manual self-scoring intact

### Final Integration / Status Polish (Completed)
- [x] Update maj9 capability status card with current architecture
- [x] Add privacy notes to materials and notes pages
- [x] Update capability status to reflect Clerk, auto-check, and file preview status

### Final Release QA (Completed)
- [x] Typo check: "cliensoldalon" → "kliensoldalon" (already correct)
- [x] Verify auth: logged out redirect to sign-in
- [x] Verify auth: /sign-in works
- [x] Verify auth: signed-in user can access app
- [x] Verify auth: Clerk UserButton appears
- [x] Verify core routes load (18 static pages)
- [x] Verify Python runner loads and works
- [x] Verify automatic self-check works
- [x] Verify manual self-scoring works
- [x] Verify file preview and privacy notes
- [x] Verify Supabase fallback works
- [x] Verify security wording
- [x] Run lint (passed with pre-existing warnings)
- [x] Run build (passed successfully)

### Curriculum Map Refactor (Completed)
- [x] Data model separation: global curriculum vs user-specific state
- [x] Create /lib/utils/user-subject-state.ts with user state functions
- [x] Implement visual states (completed, in_progress, not_started, blocked, not_taken_failed)
- [x] Implement dependency warning logic for blocked subjects
- [x] Refactor UI: horizontal scrollable semester board layout
- [x] Add semester columns with title, credit total, completed count
- [x] Implement working filter controls (family, status, dependency mode)
- [x] Add subject detail panel with status and grade controls
- [x] Initialize default user state from previous semester results
- [x] Run lint and build validation

### Semester Selector Polish (Completed)
- [x] Replace Select with Popover for rich content rendering
- [x] Add semester status labels (Előző félév, Aktuális félév, Későbbi félév)
- [x] Add credit count and completed/in progress count per semester
- [x] Calculate semester stats from user states and subjects
- [x] Run lint and build validation

### Study Materials Data Model (Completed)
- [x] Create /lib/mock-data/study-materials.ts with StudyMaterial type
- [x] Define material types (pdf, docx, pptx, txt, zip, repo, link)
- [x] Define previewMode types (pdf, docx, txt, pptx-fallback, download, external-link, none)
- [x] Add Informatika II materials (4 entries)
- [x] Add Programozás materials (2 entries)
- [x] Add Vezetékes hálózatok materials (2 entries)
- [x] Add metadata: subjectIds, subjectNames, status, source, usedIn, description
- [x] Run lint and build validation

### Material Preview Component (Completed)
- [x] Create /components/materials/material-preview.tsx
- [x] Implement PDF preview with iframe/object
- [x] Implement TXT/MD preview with client-side fetch and render
- [x] Implement DOCX preview with mammoth.js conversion (simplified HTML)
- [x] Implement PPTX fallback with download/open buttons
- [x] Implement ZIP download-only with metadata
- [x] Implement repo/link external link handling
- [x] Add privacy note about client-side preview
- [x] Run lint and build validation

### Materials Page Update (Completed)
- [x] Update /materials to use new study materials data model
- [x] Import helper functions and MaterialPreview component
- [x] Group materials by subject
- [x] Add preview modal with MaterialPreview
- [x] Add material cards with type badge, status badge, usedIn tags
- [x] Add Előnézet, Tanulási oldal, Külső link buttons
- [x] Run lint and build validation

### Subject Notes Pages Fix (Completed)
- [x] Remove generic demo files
- [x] Import getMaterialsBySubjectId and MaterialPreview
- [x] Load subject-specific materials
- [x] Display material count and empty state
- [x] Remove file upload functionality
- [x] Use MaterialPreview for inline preview
- [x] Run lint and build validation

### Study Pages Material Links (Completed)
- [x] Import getMaterialsBySubjectId
- [x] Add "Kapcsolódó anyagok" section
- [x] Display material count badge
- [x] List materials with type badge, title, usedIn tags
- [x] Add links to /subjects/{subjectId}/notes
- [x] Show section only when materials exist
- [x] Run lint and build validation

### File Copy to public/materials (Completed)
- [x] Create public/materials directory structure
- [x] Copy 6 files to public/materials (informatika-ii, programozas, vezetekes-halozatok)
- [x] Note: 2026_02_21_Kiber_levelezo.docx could not be copied due to filename encoding issue

### Critical Bugfix Pass (Completed)
- [x] Fix Pyodide runner stdout/stderr error with robust singleton loader
- [x] Fix module detail 404 routes with dynamic route /programozas/winsoc/modul/[moduleId]
- [x] Enrich Informatika II module content with examExplanation, howItWorks, codeExample, miniExercise, examAnswerTemplate
- [x] Create module detail page with comprehensive study content
- [x] Improve module cards with more useful content (mustUnderstand, likelyTasks, commonMistakes)
- [x] Update "Részletek" button to link to new module detail route
- [x] Run lint and build validation (passed with 18 static pages)

### Study Materials System Fix (Completed)
- [x] Create central material registry in /lib/mock-data/study-materials.ts
- [x] Copy available files into public/materials directories
- [x] Create material helper functions in /lib/utils/study-materials.ts
- [x] Create MaterialPreview component in /components/materials/material-preview.tsx
- [x] Fix /materials page - group by subject, add preview/download actions
- [x] Fix subject Notes pages - remove generic demo files, show subject-specific materials
- [x] Semester selector polish - make dropdown informative
- [x] Mark missing file (2026_02_21_Kiber_levelezo.docx) as "missing" in registry
- [x] Add "missing" status badge to materials page

### File Storage
- Integrate Supabase Storage
- File upload API
- File retrieval API
- File preview with proper URLs

### AI Integration
- Choose AI provider (OpenAI, Anthropic, etc.)
- Implement study content generation
- Add exercise verification
- Cost management and rate limiting

### Import/Export
- Export data as JSON
- Import data from JSON
- Backup/restore functionality
