# AI Skills

## Reusable Skills and Patterns

This document contains reusable skills, patterns, and implementations for common features in the student dashboard.

## Calendar Skill

### React Big Calendar Setup
```typescript
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Usage
<Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  style={{ height: 500 }}
  views={[Views.MONTH, Views.WEEK, Views.DAY]}
  defaultView={Views.MONTH}
/>
```

### Event Styling
- Color-code events by type (class, exam, assignment, deadline)
- Show subject color as border or background
- Display time and location in event card

### Date Range Limiting
```typescript
const minDate = new Date(semester.startDate)
const maxDate = new Date(semester.endDate)

<Calendar
  min={minDate}
  max={maxDate}
  // ...
/>
```

## React Flow Skill (Curriculum Map)

### Basic Setup
```typescript
import { ReactFlow, Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'

const nodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 0, y: 0 },
    data: { label: 'Subject 1', semester: '1', isCompleted: true },
  },
]

const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
  },
]

<ReactFlow
  nodes={nodes}
  edges={edges}
  fitView
>
  <Background />
  <Controls />
  <MiniMap />
</ReactFlow>
```

### Custom Node Component
```typescript
const SubjectNode = ({ data }) => {
  return (
    <div className={`p-4 rounded-lg border-2 ${data.isCompleted ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'}`}>
      <div className="font-semibold">{data.label}</div>
      <div className="text-sm text-gray-500">Semester {data.semester}</div>
    </div>
  )
}
```

### Graph Layout
- Group nodes by semester (horizontal or vertical)
- Use auto-layout algorithm (dagre or elk) for automatic positioning
- Show prerequisite edges with arrows
- Color-code by completion status

## File Preview Skill

### PDF Preview
```typescript
// Using iframe
<iframe
  src={fileUrl}
  className="w-full h-full"
  title={fileName}
/>

// Or using react-pdf
import { Document, Page } from 'react-pdf'

<Document file={fileUrl}>
  <Page pageNumber={1} />
</Document>
```

### Text/Markdown Preview
```typescript
import ReactMarkdown from 'react-markdown'

<ReactMarkdown>{content}</ReactMarkdown>
```

### Image Preview
```typescript
<Image
  src={fileUrl}
  alt={fileName}
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Docx Preview (Future)
```typescript
import mammoth from 'mammoth'

const convertDocx = async (file) => {
  const result = await mammoth.convertToHtml({ arrayBuffer: file })
  return result.value
}
```

## Tiptap Rich Text Editor Skill

### Basic Setup
```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello world!</p>',
})

<EditorContent editor={editor} />
```

### Common Extensions
```typescript
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Write something...',
    }),
    Link,
    Image,
  ],
})
```

### Toolbar
- Bold, italic, underline
- Headings (H1, H2, H3)
- Lists (ordered, unordered)
- Links
- Images

## tldraw Canvas Skill

### Basic Setup
```typescript
import { Tldraw } from '@tldraw/tldraw'
import 'tldraw/tldraw.css'

<Tldraw />
```

### Customization
- Set initial data
- Handle save events
- Custom tools
- Export as image/SVG

## AI Study Generation Skill (Future)

### Structured Content Blocks
```typescript
type StudyBlock =
  | { type: "explanation"; markdown: string }
  | { type: "formula"; latex: string }
  | { type: "example"; markdown: string }
  | { type: "exercise"; question: string; solution: string; checkerType: "exact" | "ai" | "math" | "code" }
```

### Formula Rendering
```typescript
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

<BlockMath math="E = mc^2" />
```

### Code Example Rendering
```typescript
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
  {code}
</SyntaxHighlighter>
```

### Exercise Checker
```typescript
// Exact match checker
const checkExact = (answer: string, solution: string) => {
  return answer.trim().toLowerCase() === solution.trim().toLowerCase()
}

// Code checker (basic)
const checkCode = (answer: string, solution: string) => {
  // Normalize whitespace and compare
  return normalizeCode(answer) === normalizeCode(solution)
}

// Math checker (future - use math.js or similar)
const checkMath = (answer: string, solution: string) => {
  // Parse and compare mathematical expressions
}
```

## Date Utilities

### Current Semester Detection
```typescript
const getCurrentSemester = (semesters: Semester[]): Semester | undefined => {
  const now = new Date()
  return semesters.find(sem => {
    const start = new Date(sem.startDate)
    const end = new Date(sem.endDate)
    return now >= start && now <= end
  })
}
```

### Date Formatting
```typescript
import { format, formatDistanceToNow } from 'date-fns'

format(new Date(), 'MMM d, yyyy') // "Jan 15, 2025"
formatDistanceToNow(new Date(), { addSuffix: true }) // "2 days ago"
```

## Color Utilities

### Subject Color Generation
```typescript
const subjectColors = [
  '#3b82f6', '#8b5cf6', '#14b8a6', '#f97316',
  '#ec4899', '#6366f1', '#06b6d4', '#10b981'
]

const getSubjectColor = (index: number) => {
  return subjectColors[index % subjectColors.length]
}
```

## Status Badge Utilities

### Completion Status Badge
```typescript
const getStatusBadge = (status: string) => {
  const variants = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    not_started: 'bg-gray-100 text-gray-800',
    failed: 'bg-red-100 text-red-800',
  }
  return variants[status] || variants.not_started
}
```

### Mode Badge
```typescript
const getModeBadge = (mode: string) => {
  const labels = {
    exam_online: 'Online Exam',
    exam_in_person: 'In-Person Exam',
    assignment: 'Assignment',
    full_online: 'Fully Online',
  }
  return labels[mode] || mode
}
```

## Responsive Layout Utilities

### Three-Column Layout
```typescript
// Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">Left panel</div>
  <div className="lg:col-span-1">Center panel</div>
  <div className="lg:col-span-1">Right panel</div>
</div>
```

### Persistent Sidebar Layout
```typescript
<div className="flex h-screen">
  <aside className="w-64 flex-shrink-0">Sidebar</aside>
  <main className="flex-1 overflow-auto">Main content</main>
</div>
```

## Mock Data Patterns

### ID Generation
```typescript
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
```

### Date Range Generation
```typescript
const generateSemesterDates = (year: number, semester: 1 | 2) => {
  if (semester === 1) {
    return {
      startDate: `${year}-09-01`,
      endDate: `${year + 1}-01-31`,
    }
  } else {
    return {
      startDate: `${year + 1}-02-01`,
      endDate: `${year + 1}-06-30`,
    }
  }
}
```
