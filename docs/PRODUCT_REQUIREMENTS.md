# Product Requirements

## Functional Requirements

### Homepage (Dashboard)
- **Semester Selector**
  - Display all available semesters (2025/26/1, 2025/26/2)
  - Automatically highlight current semester based on date (2025/26/2 if today is 2026-01-22 to 2026-06-30)
  - Allow manual semester selection

- **Subject List (Left Panel)**
  - Display all subjects in selected semester (8 subjects for 2025/26/2)
  - Each subject card shows:
    - Subject code (e.g., BBXPR12BLF)
    - Subject name (e.g., Programozás)
    - Color indicator
    - Badge: requirement type (Vizsga, Beadandó, Full online, Megfelelt / Nem megfelelt)
    - Category badge (Kötelező törzsanyag)
    - Credits
    - Completion status
    - Number of dependent/follow-up subjects

- **Calendar (Center Panel)**
  - Display current month with today highlighted
  - Allow month navigation within semester period
  - Show classes, exams, assignments, and deadlines as events
  - Calendar view limited to selected semester date range
  - Use ilamy-calendar if integration is simple, otherwise custom monthly calendar

- **Global Notes (Right Panel)**
  - Text input area for notes
  - Drawing/canvas area with tldraw placeholder for freehand sketches
  - Independent from subjects (global scope)

### Subject Detail Pages
- **Persistent Navigation**
  - Top navbar always visible
  - Left subject submenu always visible

- **Submenu Items**
  - Notes
  - Study
  - Classes
  - Subject description
  - 1-2 quick links

### Notes Page
- File upload functionality
- Display uploaded files list
- Preview supported files:
  - PDF (via iframe or react-pdf)
  - txt/md (custom viewer)
  - images (native display)
- Architecture prepared for docx and pptx preview

### Study Page
- AI-generated learning content (mock initially)
- Programming subjects:
  - Concept explanations
  - Code examples
  - Practice tasks
  - Answer checking
- Mathematics subjects:
  - Formula display
  - Explanations
  - Useful notes
  - Exercises
  - Local solution verification where possible
- Structured content blocks:
  - Explanation
  - Formula
  - Example
  - Exercise
  - Solution checker

### Classes Page
- Display scheduled classes
- Show what will be covered or what was covered
- Allow class notes
- Link files to class sessions

### Subject Description Page
- Display exam type
- Requirements
- Credits
- Prerequisites
- Dependent subjects
- Deadlines
- Quick links

### Curriculum Map Page
- **React Flow Integration**
  - Visual graph of entire program with prerequisites and dependencies
  - 7 semester columns displayed as grid
  - Each subject is a node with name and optional code
  - Current semester visually highlighted (green border)
  - Completed subjects appear muted/with opacity
  - Current active subjects have stronger border
  - Future subjects visible but slightly faded
  - Required subjects and elective subjects visually distinct
  - Dependency edges with confidence levels:
    - Solid line = official dependency
    - Dashed line = estimated dependency (from curriculum image)
    - Unknown dependencies not drawn
  - Filters:
    - Show only current path
    - Show all subjects
    - Show only cybersecurity subjects
    - Show only prerequisite chains
  - Legend explaining visual indicators

### Exam Sprint Page
- **Exam Focus Hierarchy**
  - Display exam subjects with priority hierarchy (primary/secondary/deferred)
  - Primary focus: Informatika II. (bbxin2kblf) – Windows SOC Analyst Tool project, harder practical exam
  - Secondary focus: Programozás (bbxpr12blf) – Python basics, easier foundational block, AI allowed
  - Deferred: Network (bbxvn12blf) – TCP/IP, routing, switching, later exam date (2026-05-23)
  - Visual differentiation between primary and secondary focus (color, badges, prominence)
  - Two prominent cards at top showing exam priority hierarchy

- **Subject-Specific Study Sections**
  - Informatika II.: 10 SOC-focused sections (SOC project overview, project structure, Mock Log Generator, Windows Log Parser, Anomaly Detector, Integrity Checker, Report Generator, Unit testing, Full pipeline, Exam minimum)
  - Programozás: AI allowed badge, ady_demo_zh.zip source reference
  - Network: Later exam focus (2026-05-23), disabled action

### Programozás HUB
- **Winsoc Track**
  - Dedicated track for Windows SOC Analyst Tool project preparation
  - 10 SOC-focused lessons covering full SOC pipeline
  - 7 SOC-oriented exercises (string template, random event, log parsing, counter statistics, file hash, JSON report, unit test)
  - Lesson metadata linking to Informatika II. subject with high exam priority
  - Dedicated /programozas/winsoc page with:
    - SOC project overview
    - Pipeline modules (Mock Log, Parser, Anomaly, Integrity, Report)
    - Learning path with lesson list
    - Exam materials section
    - Exam minimum checklist
  - SOC project section on main /programozas page with module overview and link to winsoc page

- **Exam Materials Data Model**
  - Exam material metadata with priority hierarchy (primary/secondary/deferred)
  - Helper functions for filtering exam materials by subject, priority, inspection status
  - Exam focus hierarchy clearly communicated in UI

## Non-Functional Requirements

### Performance
- Fast initial load with mock data
- Smooth transitions between pages
- Responsive calendar and graph rendering

### Design
- Clean, modern, minimal interface
- No clutter
- Strong information hierarchy
- Rounded cards, subtle shadows, excellent spacing
- Light and dark mode ready
- Mobile responsive (desktop-first)
- Clear subject colors (not childish)
- Badges and small labels for status

### Accessibility
- Accessible labels on all controls
- Keyboard-friendly navigation
- Proper semantic HTML

### Technical
- No demo-only code
- Clean TypeScript types
- Small, reusable components
- Reusable layout patterns
- No hardcoded data in components (use mock data files)
- No MUI or Chakra UI
- No gradient buttons
- No sensitive data in localStorage

## Technical Constraints
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide React for icons
- React Big Calendar or FullCalendar for calendar
- React Flow for curriculum map
- Tiptap for rich text notes
- tldraw for drawing/canvas notes
- Supabase or local mock data first
