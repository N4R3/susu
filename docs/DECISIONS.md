# Decisions

## Technology Choices

### Frontend Framework
**Decision**: Next.js 15 App Router
**Reasoning**:
- Latest stable version with App Router for improved routing
- Built-in optimization and performance features
- Server components for better performance
- Strong TypeScript support
- Large ecosystem and community

### Calendar Library
**Decision**: ilamy-calendar (primary), custom calendar as fallback
**Reasoning**:
- TypeScript support
- Tailwind CSS 4 compatible
- shadcn/ui integration
- Drag-and-drop support
- RFC 5545 recurring event support (good for correspondence study)
- If integration is complex, use improved custom calendar component

## Data and Design Decisions

### Curriculum Data Source
**Decision**: The curriculum image is used as a first visual source for the curriculum map. The current semester subject codes provided manually by the user are authoritative. Dependency edges extracted from the image are marked as estimated until verified against official prerequisite data.
**Reasoning**:
- The image provides the complete 7-semester structure and subject relationships
- User-provided BLF codes for current semester are accurate and authoritative
- Estimated dependencies from the image serve as a starting point
- Dependencies will be updated to "official" once verified against official prerequisite data from Neptun

### Exam Sprint Priority Mode
**Decision**: The project temporarily prioritizes the Exam Sprint workflow because Programozás and Informatika II. have exams on 2026-05-09. The general dashboard remains important, but urgent exam preparation comes first.
**Reasoning**:
- Programozás and Informatika II. both have urgent exams on the same date
- These are the highest priority subjects for the user
- Exam Sprint page provides focused study preparation
- Dashboard highlights urgent exams with visual separation
- General dashboard remains available for other subjects

### Styling
**Decision**: Tailwind CSS
**Reasoning**:
- Utility-first approach for rapid development
- Consistent design system
- Easy responsive design
- Small bundle size with purging
- Industry standard for modern React apps

### UI Component Library
**Decision**: shadcn/ui
**Reasoning**:
- Built on Radix UI (accessible primitives)
- Customizable and not opinionated
- Copy-paste components (full control)
- Modern design aesthetic
- TypeScript support
- No runtime overhead

### Animation Library
**Decision**: Framer Motion
**Reasoning**:
- Declarative API
- Powerful animations with minimal code
- Good performance
- React-specific
- Great for micro-interactions

### Icons
**Decision**: Lucide React
**Reasoning**:
- Consistent stroke width
- Tree-shakeable
- Modern design
- Large icon library
- React-specific

### Calendar Library
**Decision**: React Big Calendar (initially)
**Reasoning**:
- Free and open-source
- React-specific
- Customizable
- Good documentation
- Alternative: FullCalendar (more features, but paid for some)

### Curriculum Graph
**Decision**: React Flow
**Reasoning**:
- Purpose-built for node-edge graphs
- Highly customizable
- Built-in controls and minimap
- Good performance
- TypeScript support
- Active development

### Rich Text Editor
**Decision**: Tiptap
**Reasoning**:
- Headless editor framework
- Highly extensible
- Good TypeScript support
- Modern architecture
- ProseMirror-based (stable)

### Drawing/Canvas
**Decision**: tldraw
**Reasoning**:
- Modern drawing experience
- Good for freehand sketches
- Can export as image/SVG
- React-specific
- Active development

### Backend (Future)
**Decision**: Supabase
**Reasoning**:
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- File storage
- Free tier available
- Good TypeScript support

## Architecture Decisions

### Data Strategy
**Decision**: Local mock data first, Supabase later
**Reasoning**:
- Faster development initially
- No backend setup required for MVP
- Easy to swap with API calls later
- Type-safe mock data ensures good data model

### State Management
**Decision**: React hooks + Context (if needed)
**Reasoning**:
- Built-in React state is sufficient for current scope
- Context for global state (current semester, user preferences)
- Avoid over-engineering with Redux/Zustand initially
- Can add later if complexity grows

### File Organization
**Decision**: Feature-based structure under /app directory
**Reasoning**:
- Follows Next.js 15 App Router conventions
- Co-located components with routes
- Clear separation of concerns
- Easy to navigate

### Component Size
**Decision**: Small, focused components
**Reasoning**:
- Easier to test
- Better reusability
- Clearer responsibilities
- Follows single responsibility principle

### Styling Approach
**Decision**: Tailwind utility classes + shadcn/ui components
**Reasoning**:
- Consistent design system
- No custom CSS needed for most cases
- shadcn/ui provides accessible base components
- Easy to customize

## Design Decisions

### Color Scheme
**Decision**: Professional color palette for subjects, not childish
**Reasoning**:
- Target audience is university students (adults)
- Professional appearance
- Clear distinction between subjects
- Accessibility considerations

### Layout Strategy
**Decision**: Desktop-first, three-column dashboard
**Reasoning**:
- Primary use case is desktop
- Information density requires space
- Three-column layout maximizes screen real estate
- Responsive adaptation for mobile

### Information Hierarchy
**Decision**: Strong hierarchy through size, color, spacing
**Reasoning**:
- Reduces cognitive load
- Makes scanning easier
- Guides user attention
- Professional appearance

### Card Design
**Decision**: Rounded corners (12px), subtle shadows, good spacing
**Reasoning**:
- Modern aesthetic
- Visual depth without clutter
- Touch-friendly
- Consistent with design trends

## UX Decisions

### Semester Selection
**Decision**: Automatic current semester highlighting
**Reasoning**:
- Reduces friction
- Most common use case
- Can still manually select other semesters
- Date-based calculation

### Subject Cards
**Decision**: Comprehensive information in compact cards
**Reasoning**:
- All key info visible at a glance
- Badges for quick status recognition
- Color coding for visual distinction
- Next deadline for urgency

### Calendar Scope
**Decision**: Limited to selected semester period
**Reasoning**:
- Relevant information only
- Avoids clutter from past/future
- Context-aware
- Better UX

### Global Notes
**Decision**: Independent from subjects, always accessible
**Reasoning**:
- Quick capture of thoughts
- Not tied to specific subjects
- Always visible on dashboard
- Drawing capability for visual notes

### Subject Navigation
**Decision**: Persistent navbar and submenu
**Reasoning**:
- Easy navigation between subject sections
- Always visible context
- Consistent UX
- Reduces clicks

## Implementation Decisions

### Phase Approach
**Decision**: 4-phase implementation
**Reasoning**:
- Manageable scope
- Early feedback possible
- Incremental value delivery
- Reduces risk

### Mock Data Structure
**Decision**: Separate files by domain
**Reasoning**:
- Clear organization
- Easy to maintain
- Type-safe
- Reusable patterns

### TypeScript Strict Mode
**Decision**: Enable strict mode
**Reasoning**:
- Catch errors early
- Better type safety
- Improved developer experience
- Higher code quality

### No Demo-Only Code
**Decision**: All code must be production-ready or clearly marked
**Reasoning**:
- Avoids technical debt
- Clear path to production
- Professional development practices
- Easier to maintain

## Future Decisions (To Be Made)

### AI Provider
- OpenAI vs Claude vs Local RAG
- Cost considerations
- Quality of responses
- Integration complexity

### Authentication
- Clerk vs Supabase Auth vs NextAuth
- User experience
- Security requirements
- Cost

### File Storage
- Supabase Storage vs AWS S3 vs Cloudflare R2
- Cost
- Performance
- Integration ease

---

## Design Decisions

### Fast Design Upgrade: Exam Command Center (2025-05-06)
**Decision**: Fast design upgrade focuses on an Exam Command Center layout. The goal is immediate visual prioritization of urgent exams, not adding new features.
**Reasoning**:
- Programozás and Informatika II. exams are on 2026-05-09 — urgent exam preparation is the top UX priority
- The dashboard must answer within 3 seconds: what is urgent, which exam is next, how much time is left, what to study today
- Dark-first theme with slate/zinc base gives a focused command center feel appropriate for a cybersecurity student
- Amber/red for urgent states, cyan for active/info, emerald for completed — all low-saturation on dark background
- Framer Motion used minimally: card entrance, subject switcher animation, progress bar fill
- No authentication, no database, no AI backend added in this pass

**Impact**:
- All pages now use `bg-zinc-950` dark background
- `ExamCommandHero` component is the primary dashboard widget
- `SubjectCard` component handles urgency styling data-driven from deadline data
- `/exam-sprint` page is a full 3-column cockpit with accordion study sections, sticky panels, and pre-flight checklist
- Calendar upgraded with today dot indicator and exam day highlighting
- Curriculum map uses consistent dark node styling with semester state visual hierarchy
- `DESIGN_SYSTEM.md` updated with all color tokens, badge variants, motion rules, typography rules

### Programozás HUB Architecture (2025-05-06)
**Decision**: Programozás HUB is an independent, broad programming learning platform with its own routes (`/programozas`, `/programozas/python`, `/programozas/ai-programozas`, etc.) and dedicated data model (`/lib/mock-data/programming.ts`). It serves as the primary source of truth for programming content, which is then reused, surfaced, embedded, or linked into the Tanuló HUB (student dashboard and university subject pages) rather than duplicating content.
**Reasoning**:
- Programming learning is a broad, independent domain that extends beyond any single university subject
- The same Python lessons apply to Programozás, Informatika II., and future subjects (AI, Kiberbiztonság)
- Avoiding content duplication reduces maintenance burden and ensures consistency
- The Programozás HUB can be useful even outside the university context (self-directed learning, professional development)
- School subject pages surface relevant lessons via metadata-driven filtering (subjectId, examPriority)
- Integration points include `/subjects/bbxpr12blf/study`, `/subjects/bbxin2kblf/study`, `/exam-sprint`, and main dashboard subject cards
- The architecture allows future expansion to AI programming, cybersecurity automation without affecting subject-specific pages

**Implementation Details**:
- Data model: `ProgrammingTrack`, `ProgrammingLesson`, `ProgrammingContentBlock`, `ProgrammingExercise`, `SchoolSubjectRelevance`
- Helper functions: `getProgrammingLessonsByTrack`, `getLessonsRelevantToSubject`, `getHighPriorityExamLessons`, `getLessonsForExamSprint`
- Routes: `/programozas` (hub), `/programozas/python` (track), `/programozas/python/[lessonSlug]` (lesson), `/programozas/ai-programozas` (planned), `/programozas/kiberbiztonsag` (planned), `/programozas/gyakorlas` (exercises), `/programozas/projektek` (projects)
- Integration: Subject study pages show relevant lessons with exam priority badges, exam-sprint shows recommended lessons, dashboard cards link to Programozás HUB
- Design: Light, clean aesthetic matching the rest of the app, with sky/amber color coding for relevance and urgency

**Impact**:
- 12 Python lessons with full content blocks and exercises are now available
- Programozás and Informatika II. subject study pages surface relevant lessons with exam priority
- Exam-sprint page shows recommended programming lessons in the right panel
- Dashboard cards for bbxpr12blf and bbxin2kblf include "Programozás HUB" buttons
- Navbar includes "Programozás" link for direct access
- All routes validated through successful build

### Stabilization Pass: Technical Lessons Learned (2025-05-06)
**Decision**: Document technical patterns and pitfalls discovered during Programozás HUB stabilization to avoid future issues.
**Reasoning**:
- The initial implementation revealed several TypeScript/Next.js patterns that require careful handling
- Documenting these patterns helps prevent similar issues in future development
- Provides guidance for maintaining the codebase correctly

**Technical Patterns**:
- **Data strings with code**: Store code examples in dedicated `code` fields of content block types, not as markdown code fences inside markdown strings. This avoids escaping issues and keeps data clean.
- **Next.js 15 dynamic route params**: Dynamic route params may be Promise-based. Handle them by marking the component as `async` and awaiting `params`: `const { lessonSlug } = await params;`
- **shadcn Button component**: The Button component may not support `asChild` prop depending on local implementation. Use Link wrapping instead: `<Link href="..."><Button>...</Button></Link>`
- **Structured content blocks**: Use discriminated union types for content blocks (explanation, code, example, etc.) with type-safe field access rather than generic markdown strings.
- **Helper functions over inline logic**: Use helper functions from `/lib/utils/programming.ts` for filtering and transforming data rather than complex inline logic in components.

**Impact**:
- All Programozás HUB data is stored in clean, type-safe structures
- Dynamic routes handle Promise-based params correctly
- Button usage is consistent and avoids unsupported props
- Content rendering is type-safe and maintainable

### Exam Preparation Layer (2025-05-06)
**Decision**: Add an exam-preparation layer to Programozás HUB while keeping the HUB as the main independent programming curriculum.
**Reasoning**:
- The Programozás HUB remains the primary source of truth for programming learning content
- Exam Sprint and subject pages now consume filtered lessons and exercises from the HUB based on metadata
- This avoids duplication while providing exam-focused navigation and prioritization
- The exam layer is a view/filter layer on top of the core curriculum

**Exam Layer Components**:
- **Emergency study path**: "Ha kevés időd van" - 6 must-study lessons (Input/output, Feltételek, Ciklusok, Függvények, Listák, Vizsgafeladatok)
- **Exam priority metadata**: Lessons tagged with examPriority (high/medium/low) for bbxpr12blf and bbxin2kblf
- **Quick exercises**: 5 prioritized exercises from emergency path lessons
- **Subject page sections**: "Vizsgára kötelező minimum" and "Gyakorlófeladatok" for Programozás subject
- **Exam sprint recommendations**: "Vizsga előtti minimum útvonal" with must-study lessons and quick exercises

**Impact**:
- Programozás HUB now serves as both independent curriculum and exam preparation resource
- Emergency study path provides a minimum viable path for exam preparation
- Exam priority metadata enables filtering lessons by exam relevance
- Subject pages show exam-focused sections without duplicating content

## Informatika II. SOC Track Integration Decision (2025-01-21)

**Decision**: Prioritize Informatika II. (Windows SOC Analyst Tool project) as the harder/primary exam focus, with Programozás as easier/secondary, and Network as deferred.

**Reasoning**:
- Informatika II. (laborgyak) is significantly harder with a complex SOC project requiring log parsing, anomaly detection, integrity checking, and report generation
- Programozás is an easier foundational block with AI allowed during exam
- Network exam is later (2026-05-23) and should be deferred until after May 9 exams
- Need dedicated SOC project preparation content in Programozás HUB
- UI should clearly communicate the priority hierarchy

**Implementation**:
- **Exam materials data model**: `/lib/mock-data/exam-materials.ts` with priority hierarchy (primary/secondary/deferred)
- **Helper functions**: `/lib/utils/exam-materials.ts` for filtering exam materials by subject, priority, inspection status
- **Winsoc track**: Added to Programozás HUB with 10 SOC-focused lessons (w-001 to w-010) covering full SOC pipeline
- **SOC exercises**: 7 exercises (string template, random event, log parsing, counter statistics, file hash, JSON report, unit test)
- **Exam-sprint update**: Two prominent cards showing Informatika II. as primary/harder vs Programozás as secondary/easier
- **Winsoc page**: `/programozas/winsoc` dedicated page with SOC project overview, pipeline modules, learning path, exam materials, minimum checklist
- **Programozas update**: SOC project section with module overview and link to winsoc page
- **Informatika II. study update**: 10 SOC-focused sections (from project overview to full pipeline) + SOC project card
- **Programozás study update**: AI allowed badge and ady_demo_zh.zip source + AI allowed card
- **Network study update**: Later exam focus (2026-05-23) + disabled action card

**Impact**:
- Clear exam priority hierarchy: Informatika II. (primary/harder) → Programozás (secondary/easier) → Network (deferred)
- Dedicated SOC project preparation track with 10 lessons and 7 exercises
- Prominent SOC project cards in exam-sprint, programozas, and subject study pages
- Subject-specific study sections focused on SOC project topics for Informatika II.
- AI allowed indication for Programozás exam
- Later exam indication for Network subject
- All changes validated with lint and build (passed with warnings only)

## Informatika II. Exam Readiness Model Decision (2025-01-22)

**Decision**: Represent Informatika II. exam preparation as a dedicated exam-readiness model with module checklists, likely tasks, common mistakes, and unknown exam requirements. The Winsoc track remains inside Programozás HUB, but exam-specific readiness data is separated into a dedicated model.

**Reasoning**:
- The Winsoc track in Programozás HUB provides lesson content and exercises
- Exam readiness requires additional metadata: what to understand, explain, likely tasks, common mistakes
- Unknown exam requirements need to be tracked and clarified with instructors
- A minimum exam path provides actionable steps for students
- Separating readiness data from lesson content keeps the HUB as a general learning resource

**Implementation**:
- **Exam readiness data model**: `/lib/mock-data/winsoc-exam-readiness.ts` with WinsocModule, WinsocReadinessChecklistItem, WinsocUnknownRequirement types
- **Helper functions**: `/lib/utils/winsoc-readiness.ts` for filtering modules, checklist, minimum exam path, unknown requirements
- **10 SOC modules**: Template Engine, Mock Log Generator, Windows Log Parser, Anomaly Detector, Integrity Checker, Report Generator, Main Application, CLI, Unit Tests, Integration Test
- **Module content**: Each module has mustUnderstand, mustExplain, likelyTasks, commonMistakes, examPriority
- **Readiness checklist**: 13 checklist items organized by category (setup, concept, code, test, report, exam)
- **Minimum exam path**: 9 ordered steps from setup to report explanation
- **Unknown requirements**: 9 questions about exam conditions (AI, internet, own code, Git repo, grading rubric, submission format, time allocation, test cases)
- **Winsoc page update**: Exam-oriented sections (hero, 3-sentence summary, pipeline visual, module readiness grid, minimum exam path, unknown requirements)
- **Study page update**: School-facing version with critical modules, minimum path, unknown requirements, CTA to winsoc
- **Exam-sprint update**: "Mai Informatika II. minimum" section (3 critical modules, 3 practice tasks, 3 unknown requirements, CTA to winsoc)

**Impact**:
- Informatika II. preparation is now represented as a SOC exam-readiness model
- Students can see what they must understand, explain, and be able to do for each module
- Unknown exam requirements are tracked and highlighted for clarification
- Minimum exam path provides actionable steps for exam preparation
- Exam-sprint shows practical daily actions for Informatika II.
- Winsoc track remains in Programozás HUB as the single source of truth for lesson content

## Informatika II. Quick Review Layer Decision (2025-01-22)

**Decision**: Create a dedicated quick-review and cheat-sheet layer for Informatika II. exam preparation. This is a compressed exam-facing summary that students can open before the exam to see the entire SOC project on one page. It is separate from the deeper Winsoc readiness model and serves as a last-minute review tool.

**Reasoning**:
- The Winsoc readiness model provides deep exam preparation with detailed module metadata
- Students need a condensed overview for last-minute review before the exam
- Exam-facing content (what to say if asked, likely prompts, common mistakes) should be easily accessible
- A single-page cheat sheet with key concepts and last-minute checklist is valuable for exam day
- This layer should be linked from all relevant pages (winsoc, study, exam-sprint)

**Implementation**:
- **Quick review data model**: `/lib/mock-data/winsoc-quick-review.ts` with WinsocQuickReviewCard and WinsocCheatSheetSection types
- **Helper functions**: `/lib/utils/winsoc-quick-review.ts` for filtering cards, cheat sheet sections, last minute checklist
- **10 quick review cards**: Each module has one sentence, exam answer bullets, key code concepts, likely exam prompts, common mistakes, last minute checklist
- **Cheat sheet sections**: 5-minute overview, key concepts, likely exam tasks, common mistakes, last minute checklist
- **Quick review page**: `/programozas/winsoc/gyorsismetlo` with hero, 5-minute overview, pipeline strip, module quick cards, last-minute checklist, unknown requirements
- **Links from winsoc page**: Button "Gyorsismétlő megnyitása" in hero section
- **Links from study page**: Button "Gyorsismétlő" alongside "Részletes felkészülés" button
- **Links from exam-sprint**: Compact card "Informatika II. gyorsismétlő" with CTA

**Impact**:
- Informatika II. now has a dedicated quick-review layer for last-minute exam preparation
- Students can open one page before the exam and see the entire SOC project
- Exam-facing content (what to say, likely prompts, common mistakes) is easily accessible
- Quick review is linked from all relevant pages for easy access
- This is separate from the deeper Winsoc readiness model and serves as a compressed summary

## Programozás Exam ZIP Processing Decision (2025-01-22)

**Decision**: Process the ady_demo_zh.zip file to extract exam-relevant content for the Programozás exam. The ZIP contains a complete Python CLI tool (Project Sentinel) with source code, tests, and documentation. This provides concrete exam preparation material for the secondary May 9 exam block.

**Reasoning**:
- The ady_demo_zh.zip is the primary source material for the Programozás exam
- Extracting and analyzing the ZIP provides concrete exam topics, exercises, and requirements
- Programozás is the secondary/easier exam (AI allowed), so it benefits from structured preparation
- The extracted content can be integrated into the Programozás HUB and subject study pages
- This makes Programozás exam preparation more concrete and actionable

**Implementation**:
- **ZIP extraction**: Extracted ady_demo_zh.zip to temp_exam_extract folder
- **File analysis**: Identified sentinel.py (main CLI tool), test_sentinel.py (unit tests), README.md (documentation), requirements.txt (dependencies)
- **Exam topics**: 10 topics extracted (string normalization, sets lookup, file I/O, argparse, bcrypt, environment variables, unit testing, error handling, regex, stdout/stderr)
- **Exam exercises**: 5 exercises created based on test patterns (normalization, set lookup, bcrypt verification, argparse, unit testing)
- **Data model**: `/lib/mock-data/programming-exam.ts` with ProgrammingExamTopic, ProgrammingExamExercise, ProgrammingExamRequirement types
- **Helper functions**: `/lib/utils/programming-exam.ts` for filtering topics, exercises, requirements, minimum path
- **Study page update**: Added critical exam topics, minimum exam path, exam exercises cards to /subjects/bbxpr12blf/study
- **Exam-sprint update**: Added Programozás minimum review section (critical topics, exercises, minimum path, AI allowed badge)
- **Programozás page update**: Added exam focus section with Project Sentinel overview, critical topics, exercises, minimum path
- **Minimum study path**: 10-step path from Python basics to unit testing

**Impact**:
- Programozás exam preparation is now based on the inspected ady_demo_zh.zip content
- Programozás remains the secondary May 9 focus, while Informatika II. remains the primary/harder exam block
- Students can see concrete exam topics, exercises, and minimum study path
- AI allowed indication is prominently displayed
- Exam-sprint shows Programozás minimum review alongside Informatika II. focus
- Programozás HUB now links to the exam-focused study page

## May 9 Unified Exam Strategy Decision (2025-01-22)

**Decision**: Create a unified May 9 exam strategy page at /exam-sprint/maj9 to coordinate Informatika II. as the 70% primary focus and Programozás as the 30% secondary review block. After both May 9 exam sources were processed (Winsoc for Informatika II. and Project Sentinel for Programozás), a unified strategy page helps students understand the overall exam day approach.

**Reasoning**:
- Both exams are on May 9, 2026
- Informatika II. is the primary/harder exam (70% focus)
- Programozás is the secondary/easier exam with AI allowed (30% review)
- Students need a clear strategy for allocating time between the two exams
- A unified page shows the minimum survival path combining both exams
- Time-boxed plans help students prepare with limited time
- Quick review links provide easy access to all relevant materials

**Implementation**:
- **Data model**: `/lib/mock-data/may9-exam-strategy.ts` with May9StrategyBlock, SurvivalPathItem, TimeBoxPlan types
- **Strategy blocks**: 2 blocks (Informatika II. 70% primary, Programozás 30% secondary) with badges, summaries, quick links, top topics, likely tasks, common mistakes
- **Survival path**: 10-step combined ordered checklist from SOC pipeline to Programozás unittest
- **Time-boxed plans**: 3 plans (30 min, 60 min, 120 min) for last-minute preparation
- **Quick links**: 5 links to all relevant pages (Informatika II. quick review, SOC prep, Programozás exam focus, Programozás HUB, Informatika II. subject page)
- **Helper functions**: `/lib/utils/may9-exam-strategy.ts` for filtering strategy blocks, survival path, time-boxed plans, quick links, unknown requirements, critical topics, exercises
- **Route page**: `/exam-sprint/maj9/page.tsx` with hero (date, exams, strategy sentence), strategy split (two large cards), minimum survival path (checklist), quick review links, unknown requirements (grouped by exam), last-minute plan (time-boxed plans)
- **CTA on exam-sprint**: Prominent card "Május 9. vizsgastratégia" with button to /exam-sprint/maj9
- **CTA on programozas**: Small CTA "Május 9. stratégia" in exam focus section

**Impact**:
- Students now have a unified view of both May 9 exams
- Clear focus allocation: Informatika II. 70%, Programozás 30%
- Minimum survival path provides a concrete ordered checklist
- Time-boxed plans help with last-minute preparation
- Quick review links provide easy access to all relevant materials
- Unknown requirements are clearly displayed for both exams
- Exam-sprint and Programozas pages now link to the unified strategy page
- Informatika II. remains the primary/harder exam block
- Programozás remains the secondary/easier exam block with AI allowed

### May 9 Exam Cockpit Freeze Decision (2026-05-07)
**Decision**: The May 9 exam preparation cockpit is frozen and ready for use. All verification tasks completed successfully.
**Rationale**: 
- All May 9 routes load correctly (/exam-sprint, /exam-sprint/maj9, /programozas/winsoc, /programozas/winsoc/gyorsismetlo, /subjects/bbxin2kblf/study, /subjects/bbxpr12blf/study)
- All CTAs in navigation strip work correctly (Exam Sprint, Május 9 stratégia, Informatika II SOC, Informatika II gyorsismétlő, Programozás ismétlés)
- Priority hierarchy is consistent everywhere (Informatika II = primary / 70% / harder / SOC project, Programozás = secondary / 30% / AI allowed / Project Sentinel)
- Mobile layout verified (no horizontal overflow with overflow-x-auto, cards stack with grid-cols-1 md:grid-cols-2/3, buttons remain visible)
- Data consistency verified (exam date: 2026-05-09, Informatika II route: bbxin2kblf, Programozás route: bbxpr12blf, quick review slug: /programozas/winsoc/gyorsismetlo)
**Impact**: No further changes planned until after May 9 exams. The exam cockpit is stable and ready for use.

### 2025/26/1 Semester Results Decision (2026-05-07)
**Decision**: Previous semester results were added as structured data. Hungarian textual grades are mapped to numeric values for statistics. Kiválóan megfelelt is treated as 5 for displayed statistics because it matches the Neptun weighted average of 4.13.
**Rationale**:
- Students need visibility into their previous semester performance to inform current semester study focus
- Informatika I. grade 3 highlights the need for focused preparation on Informatika II. (primary exam focus)
- Hírközléstechnika grade 4 provides foundation for Vezetékes és vezeték nélküli hálózatok
- Strong jeles results (5) across multiple subjects validate the study system approach
- Grade mapping enables statistical calculations (weighted average, distribution, best/weakest subjects)
- Kiválóan megfelelt is treated as 5 for statistics to match the Neptun weighted average of 4.13
**Impact**:
- Previous semester results are now available at /results with full statistics and insights
- Dashboard shows previous semester summary card with quick access to detailed results
- Navigation includes Eredményés link for easy access
- Study insight card connects past performance to current semester focus (Informatika II. needs focused preparation)
- Informatika II. remains the primary exam focus (70%) based on Informatika I. grade 3
- Programozás remains the secondary exam focus (30%) with AI allowed
- No changes to May 9 exam cockpit architecture or priority hierarchy

### Grok + Perplexity Study Materials Integration Decision (2026-05-07)
**Decision**: External Grok + Perplexity study materials were integrated as structured enrichment data, not hardcoded page text. They enrich the Programozás Project Sentinel and Informatika II Winsoc exam-preparation layers.
**Rationale**:
- Students need access to AI-generated study materials that summarize key exam topics
- Programozás material includes: string normalization, set usage, file I/O, argparse, bcrypt, environment variables, unittest, error handling, regex, stdout/stderr, AI usage strategy, 30/60/120 minute review plans, common mistakes
- Informatika II material includes: 10 modules (Template Engine, Mock Log Generator, Windows Log Parser, Anomaly Detector, Integrity Checker, Report Generator, Main Application, CLI, Unit Tests, Integration Test), review plans, 1-hour survival path, common mistakes, source-based extensions (SOC, SIEM, HIDS concepts)
- Grade mapping enables statistical calculations (weighted average, distribution, best/weakest subjects)
- Kiválóan megfelelt is treated as 5 for statistics to match the Neptun weighted average of 4.13
**Impact**:
- External study materials are now available in /lib/mock-data/external-study-materials.ts with structured sections
- Programozás exam data enriched with AI usage strategy, review plans, source notes, extended common mistakes
- Informatika II Winsoc data enriched with review plans, 1-hour survival path, extended common mistakes, source-based extensions (SOC, SIEM, HIDS concepts)
- Quick review data enriched with review plans and survival path
- Data layer is ready for UI integration when needed
- No changes to May 9 exam cockpit architecture or priority hierarchy
- No backend/auth/database/Pyodide added
### Practice Exam Layer Decision (2026-05-07)
**Decision**: A practice exam layer was added for private study support, not as a cheating tool. The implementation uses terminology like "Gyorsismétlő", "Vizsga előtti összefoglaló", "Önellenőrző", "Próbavizsga", and "Minimum útvonal" instead of "puska".
**Rationale**:
- Students need a way to test their knowledge before the actual exam
- Practice exams provide self-check with questions, solutions, and grading criteria
- The system is intended for private study support, not for cheating during exams
- UI language avoids cheating-oriented wording and uses quick review, self-check, and practice exam terminology
- Two practice exams created: Informatika II. (60 minutes, 7 questions) and Programozás (45 minutes, 7 questions)
- Solutions are hidden behind toggle to encourage self-check before revealing answers
**Impact**:
- Practice exam data layer created in /lib/mock-data/practice-exams.ts with structured types
- /exam-sprint/probavizsga page provides exam selector, question list, solution toggle, self-check checklist
- Links integrated to /exam-sprint, /exam-sprint/maj9, /programozas/winsoc/gyorsismetlo, /subjects/[subjectId]/study
- Private use status card added to /exam-sprint/maj9 showing system readiness
- No backend/auth/database/Pyodide added
- No interactive code execution or persistent progress saving (marked as "Később" for future)
- Current implementation is sufficient for private study support without violating academic integrity

### May 9 Exam Cockpit Freeze Decision (2026-05-07)
**Decision**: The private May 9 study cockpit is now feature-complete and frozen for personal use. No further changes will be made before the May 9 exams.
**Rationale**:
- All 17 static pages build successfully
- All navigation links work correctly
- Practice exam layer integrated with solution toggles
- Focus priorities maintained: Informatika II 70% (primary), Programozás 30% (secondary)
- Terminology avoids cheating-oriented wording (uses Gyrosismétlő, Vizsga előtti összefoglaló, Önellenőrző, Próbavizsga, Minimum útvonal)
- Lint passes with only pre-existing warnings
- Build passes successfully

### Study Materials Data Model Decision (2026-05-07)

**Decision**: Create a centralized study materials data model in `/lib/mock-data/study-materials.ts` with global shared records. Materials are subject-agnostic in the data model and filtered by subjectId in UI components (Notes page, Materials page, Study pages). File preview is client-side only with no localStorage storage of file contents.

**Rationale**:
- Study materials should be global shared records, not duplicated per subject
- A single source of truth ensures consistency across the app
- Subject-specific filtering happens in UI components, not in data layer
- Client-side preview avoids server-side file storage complexity
- No localStorage storage of file contents ensures privacy and reduces storage bloat
- Materials include publicPath for browser preview and externalUrl for external links
- Preview modes handle different file types appropriately (PDF inline, TXT fetch, DOCX mammoth.js, PPTX fallback, ZIP download, repo/link external)

**Implementation**:
- **Data model**: `/lib/mock-data/study-materials.ts` with StudyMaterial type
- **Material types**: pdf, docx, pptx, txt, zip, repo, link
- **Preview modes**: pdf, docx, txt, pptx-fallback, download, external-link, none
- **8 materials**: Informatika II (4 entries: PDF, DOCX, DOCX, Git repo), Programozás (2 entries: ZIP, TXT), Vezetékes hálózatok (2 entries: PPTX, PPTX)
- **Helper functions**: `/lib/utils/study-materials.ts` with getAllStudyMaterials, getMaterialsBySubjectId, getMaterialById, getMaterialsByType, getPreviewUrl, isPreviewable, getMaterialOpenAction, groupMaterialsBySubject
- **Preview component**: `/components/materials/material-preview.tsx` with PDF iframe, TXT fetch, DOCX mammoth.js, PPTX fallback, ZIP download, repo/link external
- **Materials page**: Updated to use central data model, grouped by subject, with preview modal
- **Notes pages**: Updated to show only subject-specific materials, no generic demo files, empty state when no materials
- **Study pages**: Added "Kapcsolódó anyagok" section with links to notes page
- **File storage**: 6 files copied to public/materials (informatika-ii, programozas, vezetekes-halozatok) for browser preview
- **Privacy note**: "A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba."

**Impact**:
- Study materials are now centralized in a single data model
- No generic demo files per subject - only subject-specific materials shown
- Materials page groups materials by subject with preview functionality
- Notes pages show only relevant materials for the subject
- Study pages include material links for easy access
- File preview is client-side only with privacy note
- 1 file (2026_02_21_Kiber_levelezo.docx) could not be copied due to filename encoding issue
- No backend/auth/database changes - files served from public/ directory
- No localStorage storage of file contents - only metadata and small state

### Clerk Auth Migration Decision (2026-05-07)
**Decision**: Authentication migrated from Supabase Auth to Clerk. Clerk handles authentication and private route protection. Supabase is used only for database/progress storage (optional). Progress records use Clerk user_id as text (e.g., user_xxx), not Supabase auth.users UUID.
**Rationale**:
- Clerk provides a more complete authentication solution with better UX
- Clerk handles private route protection via middleware
- Supabase Auth magic link flow was removed/deprecated
- Supabase remains as optional database backend for progress persistence
- localStorage remains as offline fallback
- Progress sync utilities updated to use Clerk user ID
- RLS policies updated to use Clerk user ID from JWT claims
**Implementation**:
- Installed @clerk/nextjs@5 (compatible with Next.js 15.0.3)
- Updated middleware.ts to use clerkMiddleware with protected routes
- Updated app/layout.tsx with ClerkProvider wrapper
- Created app/sign-in/[[...sign-in]]/page.tsx with Clerk SignIn component
- Removed /login page (Supabase magic link auth)
- Updated .env.example with Clerk env vars
- Updated Supabase migration 001_study_progress.sql to use TEXT user_id
- Updated RLS policies to use requesting_user_id() helper function
- Updated progress-sync.ts to use Clerk user ID
- Added Clerk UserButton to navbar
- Removed PrivateAppGate fallback component
**Impact**:
- Authentication is now handled by Clerk
- Supabase Auth magic link flow removed
- Supabase used only for optional database storage
- Progress records use Clerk user_id (TEXT, e.g., user_xxx)
- RLS policies updated to use requesting_user_id() helper
- middleware.ts uses clerkMiddleware for route protection
- app/sign-in/[[...sign-in]] page uses Clerk SignIn component
- UserButton added to navbar for sign-out
- localStorage fallback remains for offline use
- No breaking changes to authentication flow - just different provider

### Critical Bugfix Pass Decision (2026-05-07)
**Decision**: Fixed 3 critical issues: Pyodide runner stdout/stderr error, module detail 404 routes, and Informatika II module cards being too thin. Implemented robust Pyodide singleton loader, created dynamic module detail route, and enriched Winsoc module data with exam-ready content.
**Rationale**:
- Python runner was crashing with "Cannot read properties of undefined (reading 'setStdout')" error
- Module detail "Részletek" buttons led to 404 pages instead of real content
- Informatika II module cards showed only 1-2 vague lines, not useful for exam preparation
- User emphasized code execution is the most important feature
- Winsoc modules needed exam-ready explanations, code examples, and answer templates

**Implementation**:
- **Pyodide runner fix**: `/lib/utils/pyodide-runner.ts`
  - Implemented robust singleton loader with `pyodideLoadingPromise` to prevent race conditions
  - Added `getPyodideInstance()` function that returns cached instance or loading promise
  - Created `setupStdoutStderrCapture()` with safe fallback for setStdout/setStderr
  - Added `getCapturedOutput()` with Python-side StringIO fallback when setStdout unavailable
  - Added Hungarian error messages for user-friendly feedback
  - Updated both `executePythonCode()` and `runPythonWithTests()` to use new safe loading
- **Module detail route**: `/app/programozas/winsoc/modul/[moduleId]/page.tsx`
  - Created dynamic route for module detail pages
  - Loads module by moduleId from winsoc-exam-readiness data
  - Shows notFound() for invalid moduleId
  - Displays comprehensive study content: exam explanation, how it works, must explain, likely tasks, common mistakes, code examples, mini exercises, exam answer templates
  - Includes back links to Informatika II SOC, Gyorsismétlő, Május 9 stratégia, Próbavizsga
- **Winsoc module data enrichment**: `/lib/mock-data/winsoc-exam-readiness.ts`
  - Added `examExplanation` field: Hungarian explanation of what the module does in exam context
  - Added `howItWorks` field: Step-by-step Hungarian bullet list of how the module works
  - Added `codeExample` field: Python code example for critical modules (windows-log-parser, anomaly-detector, integrity-checker, main-application, cli, unit-tests)
  - Added `miniExercise` field: Practice exercise with prompt, starter code, and solution (anomaly-detector)
  - Added `examAnswerTemplate` field: Hungarian spoken/written answer template for exam
  - Updated all 10 modules with new fields
- **Module cards improvement**: `/app/programozas/winsoc/page.tsx`
  - Changed "Must understand" to "Fontos tudnivalók" (Hungarian)
  - Changed "Likely tasks" to "Vizsgafeladatok" (Hungarian)
  - Added "Gyakori hiba" section showing first common mistake
  - Increased mustUnderstand bullets from 2 to 3
  - Updated "Részletek" button href from programming lesson slug to `/programozas/winsoc/modul/${module.id}`

**Impact**:
- Python runner no longer crashes with stdout/stderr errors - uses robust singleton with safe fallback
- Module detail buttons now link to real dynamic route with comprehensive study content
- Informatika II module cards show more useful content for exam preparation
- Winsoc modules now have exam-ready explanations, code examples, mini exercises, and answer templates
- 18 static pages generated successfully in build
- Lint passed with only pre-existing warning in curriculum-map
- No auth/database/backend changes - all fixes are frontend/data layer only
- No breaking changes to existing features - only improvements and bugfixes

### Study Materials System Decision (2026-05-07)
**Decision**: Study materials are global shared records. Subject Notes pages filter materials by subjectId, while user notes/progress remain user-specific. Materials are served from public/ directory for browser preview without backend storage.
**Rationale**:
- Previous subject Notes pages showed generic demo files for every subject (Vizsga összefoglaló.pdf, Labor gyak feladatok.docx)
- /materials page listed files but they were not really openable/previewable online
- Each subject should show only its own related files
- Files should open in browser where possible (PDF iframe, TXT fetch, DOCX simplified, PPTX fallback, ZIP download)
- No backend file storage needed - files served from public/ directory
- Privacy: client-side preview only, no localStorage storage of file contents

**Implementation**:
- **Central material registry**: `/lib/mock-data/study-materials.ts` with StudyMaterial type
  - 8 materials across 3 subjects: Informatika II (4), Programozás (2), Vezetékes hálózatok (2)
  - Material types: pdf, docx, pptx, txt, zip, repo, link
  - Fields: id, title, fileName, type, subjectIds, subjectNames, status, source, publicPath, externalUrl, usedIn, description, previewMode
  - Status values: uploaded, processed, linked, generated, missing
  - Preview modes: pdf, docx, txt, pptx-fallback, download, external-link, none
  - Missing file (2026_02_21_Kiber_levelezo.docx) marked as status: "missing", previewMode: "none"
- **File storage**: Files copied to public/materials directories
  - public/materials/informatika-ii/: kiber_levelezo-potjegyzet.pdf, kiber_levelezo-potjegyzet.docx
  - public/materials/programozas/: ady_demo_zh.zip, programozas-vizsgafelkészito.txt
  - public/materials/vezetekes-halozatok/: W_WL_Network1.1.pptx, W_WL_Network1.2.pptx
  - Safe ASCII filenames for URLs
- **Helper functions**: `/lib/utils/study-materials.ts`
  - getAllStudyMaterials(): Returns all materials
  - getMaterialsBySubjectId(subjectId): Filters materials by subjectId
  - getMaterialById(id): Returns material by ID
  - getMaterialsByType(type): Filters materials by type
  - getPreviewUrl(material): Returns preview URL (publicPath or externalUrl)
  - isPreviewable(material): Checks if material is previewable in browser
  - getMaterialOpenAction(material): Returns action type (preview/download/external/none)
  - groupMaterialsBySubject(): Groups materials by subjectId
- **MaterialPreview component**: `/components/materials/material-preview.tsx`
  - PDF: iframe/object preview with open new tab + download
  - TXT/MD: fetch and display text
  - DOCX: mammoth simplified HTML preview (fallback with open/download)
  - PPTX: fallback card with open/download buttons
  - ZIP: download-only card
  - repo/link: external link card
  - Privacy note: "A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba."
- **Materials page**: `/app/materials/page.tsx`
  - Groups materials by subject using groupMaterialsBySubject()
  - Each card has type badge, status badge, usedIn tags
  - Actions: Előnézet (preview modal), Megnyitás új lapon, Letöltés, Tanulási oldal
  - Preview modal with MaterialPreview component
  - Privacy note displayed
- **Subject Notes pages**: `/app/subjects/[subjectId]/notes/page.tsx`
  - Uses getMaterialsBySubjectId(subjectId) to load subject-specific materials
  - Shows empty state when no materials exist for subject
  - Material list on left, preview panel on right
  - No generic demo files - only subject-specific materials
- **Semester selector polish**: `/components/dashboard/SemesterSelector.tsx`
  - Shows "teljesítve" when all credits completed
  - Shows "folyamatban" when in progress
  - Compact but informative dropdown with credits and status
  - Avoids empty-looking popover

**Impact**:
- Study materials are now centralized in a single data model
- No generic demo files per subject - only subject-specific materials shown
- Materials page groups materials by subject with preview functionality
- Subject Notes pages show only relevant materials for the subject
- File preview is client-side only with privacy note
- 1 file (2026_02_21_Kiber_levelezo.docx) marked as missing with red badge
- No backend/auth/database changes - files served from public/ directory
- No localStorage storage of file contents - only metadata and small state

- All protected routes redirect to /sign-in when not authenticated
- Supabase is used only for database/progress storage (optional)
- Progress records use Clerk user_id as text, not Supabase auth.users UUID
- localStorage remains as offline fallback
- Build passed successfully with 18 static pages (including /sign-in)
- No broken imports or route slugs
- Próbavizsga added to ExamNavigationStrip for easy access
**Impact**:
- The system is stable and ready for private study support
- No further changes planned before May 9 exams
- Post-exam improvements (if needed): interactive code execution, persistent progress saving, automatic grading
- The cockpit remains a private, personal study tool without backend/database/Pyodide

### Private Study Features Enhancement Decision (2026-05-07)
**Decision**: Enhanced the private study dashboard with progress persistence (localStorage), practice exam self-scoring, file preview foundation, materials library, and architecture plans for future code execution and grading. No backend, Pyodide, or automatic grading implemented.
**Rationale**:
- Progress persistence using localStorage is sufficient for private local/personal study use
- File contents are NOT stored in localStorage, only metadata and small state (booleans, IDs, timestamps, progress percentages)
- Practice exam self-scoring provides estimated scores for self-assessment (not official grades)
- File preview foundation allows client-side PDF/TXT viewing with placeholders for DOCX/PPTX
- Materials library page provides centralized access to study materials
- Architecture plans for code execution and grading document future possibilities without implementation
**Impact**:
- Progress storage created in /lib/utils/progress-storage.ts with functions for lessons, practice questions, checklists, quick review cards
- Practice exam page upgraded with self-scoring (Nem tudom / Részben / Tudom) and estimated score calculation
- Notes page improved with file selection, preview for PDF/TXT/MD, placeholders for DOCX/PPTX
- Materials library page created at /materials with grouped study materials by subject
- 'Anyagok' link added to root page navbar
- Code execution architecture plans created in /lib/utils/code-execution-plans.ts (no Pyodide implementation)
- Grading architecture plans created in /lib/utils/grading-plans.ts (no automatic grading implementation)
- No backend added, no Pyodide implementation, no automatic grading - all manual self-check only

### PDFCraft Evaluation Decision (2026-05-07)
**Decision**: PDFCraft (https://github.com/PDFCraftTool/pdfcraft) was evaluated as a privacy-first browser PDF toolkit inspiration. Because of AGPL-3.0 licensing, the project is used as a design/architecture reference only, not copied directly.
**Rationale**:
- PDFCraft provides a good reference for client-side PDF tooling architecture
- AGPL-3.0 license requires careful consideration for code reuse
- Prefer using standard libraries directly (react-pdf/pdf.js for PDF rendering)
- Current implementation uses simple iframe/object URL preview for PDF files
- Future enhancements could integrate react-pdf/pdf.js for better PDF rendering
**Impact**:
- No code copied from PDFCraft due to AGPL-3.0 licensing considerations
- PDFCraft used as design/architecture reference only
- Current PDF preview uses browser's native PDF viewer via iframe
- File preview is client-side only, no server upload

### Automatic Test-Based Self-Checking Decision

**Date**: 2026-05-07
**Context**: Need to provide students with automated feedback on coding practice questions for Programozás and Informatika II exams.

**Decision**: Implement automatic test-based self-checking using Pyodide for in-browser Python execution, with test suites for each coding question.

**Rationale**:
- Educational purpose: Helps students verify their understanding before exams
- Privacy: All code execution happens client-side, no server-side code storage
- Hungarian UI: Uses "Nem hivatalos pontszám" to clarify this is not official grading
- Non-blocking: Manual self-scoring remains available as alternative
- Test-based: Uses predefined test cases rather than AI evaluation

**Implementation**:
- Created `/lib/mock-data/coding-test-cases.ts` with test suites for Programozás and Informatika II questions
- Created `/lib/utils/code-grading.ts` with grading utilities and test result parsing
- Updated `/lib/utils/pyodide-runner.ts` to support test execution with structured output
- Updated `/app/exam-sprint/probavizsga/page.tsx` to integrate auto-check UI
- Added "Automatikus önellenőrzés" button and detailed test results display

**Impact**:
- Students can run tests on their code and see pass/fail results
- Test output shows which tests passed/failed with expected vs actual values
- No official grading claims - clearly labeled as self-check
- Manual self-scoring remains intact for subjective assessment
- All execution happens in browser, no server-side code storage

### Curriculum Map Data Model Separation Decision

**Date**: 2026-05-07
**Context**: The curriculum map needs to support user-specific progress tracking while keeping the curriculum structure shared across all users.

**Decision**: Separate global curriculum data from user-specific state. Global curriculum structure and learning content remain shared, while user-specific data (grades, completion status, progress, notes) is stored separately.

**Rationale**:
- Shared data: Curriculum structure, semesters, subject names, codes, credits, dependencies, learning materials are the same for all students
- User-specific data: Grades, completion status, progress, notes, practice exam attempts are personal to each user
- Prevents data duplication: No need to copy entire curriculum per user
- Allows personalization: Each user can track their own progress without affecting others
- Simplifies updates: Curriculum structure changes only need to be made once

**Implementation**:
- Created `/lib/utils/user-subject-state.ts` with user-specific state functions
- Global curriculum data remains in `/lib/mock-data/curriculum.ts`
- User state stored in localStorage under `susu-user-subject-state`
- User state types: `SubjectUserStatus` (not_started, in_progress, completed, failed, not_taken, waived)
- User state includes: status, grade, resultText, completedAt, note, updatedAt
- Functions: getUserSubjectState, setUserSubjectStatus, setUserSubjectGrade, isSubjectCompleted, isSubjectBlocked, getBlockingDependencies, getDependentSubjects, getSubjectVisualState
- Default initialization: Previous semester subjects initialized with grades, May 9 subjects set to in_progress

**Impact**:
- Curriculum structure is shared and immutable per user
- User progress is stored separately and persisted in localStorage
- No risk of users modifying shared curriculum data
- Simplifies future multi-user support if needed
- Each user gets personalized progress tracking

### Curriculum Map UI Refactor Decision

**Date**: 2026-05-07
**Context**: The original curriculum map used ReactFlow graph visualization which was cramped, hard to read, and had non-functional filter controls.

**Decision**: Refactor from ReactFlow graph to horizontal scrollable semester board layout with interactive subject cards and working filter controls.

**Rationale**:
- Readability: Cards need to be readable at 100% zoom without cramming
- Usability: All filter controls must actually work
- Interactivity: Users need to set subject status and grades
- Dependency visibility: Blocked subjects should show warnings
- Mobile-friendly: Horizontal scroll works better than complex graph on smaller screens

**Implementation**:
- Replaced ReactFlow with horizontal scrollable semester board layout
- Each semester column has: title, credit total, completed count
- Subject cards show: name, code, credit, status badge, grade, warning icon if blocked
- Clicking a subject opens detail panel with:
  - Subject information (semester, credits, type, status)
  - Current grade/result
  - Blocking dependencies list
  - Dependent subjects list
  - Status controls (Nem kezdtem el, Folyamatban, Teljesítve, Nincs meg, Nem vettem fel, Felmentve)
  - Grade controls (1-5, Aláírva, Megfelelt, Kiválóan megfelelt)
  - Reset button
- Working filter controls:
  - Show dependencies toggle
  - Show estimated dependencies toggle
  - Highlight current semester toggle
  - Family filter (all, programming, cybersecurity, networks, math, project, elective, pe, thesis)
  - Status filter (all, completed, in_progress, not_started, blocked)
  - Dependency mode (none, selected chain, all official, all estimated)

**Impact**:
- Curriculum map is now readable and interactive
- Users can track their progress with status and grade controls
- Dependency warnings show when subjects are blocked
- All filters work and visibly change the UI
- Better UX for personal progress tracking

