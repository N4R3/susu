# Research Notes

## Calendar Libraries

### ilamy-calendar
- **Status**: Free, open-source
- **Pros**:
  - TypeScript support
  - Tailwind CSS 4 compatible
  - shadcn/ui integration
  - Drag-and-drop support
  - RFC 5545 recurring event support (good for correspondence study schedules)
  - Resource management
- **Cons**:
  - Newer library, smaller community
- **Decision**: Primary choice for calendar integration

### React Big Calendar
- **Status**: Free, open-source
- **Pros**:
  - React-specific
  - Customizable
  - Good documentation
  - Active community
  - Supports month, week, day, agenda views
- **Cons**:
  - Less feature-rich than FullCalendar
  - Styling can be tricky
- **Decision**: Backup option if ilamy-calendar integration is complex

### FullCalendar
- **Status**: Free tier available, paid for advanced features
- **Pros**:
  - More feature-rich
  - Better scheduler support
  - Resource management
  - Excellent documentation
- **Cons**:
  - Some features require paid license
  - Not React-native (wrapper)
- **Decision**: Keep as backup if needed

## Graph Visualization

### React Flow
- **Status**: Free, open-source
- **Pros**:
  - Purpose-built for node-edge graphs
  - Highly customizable
  - Built-in controls (zoom, pan, minimap)
  - Good performance
  - TypeScript support
  - Active development
  - Many examples
- **Cons**:
  - Learning curve for custom nodes
- **Decision**: Primary choice for curriculum map

### Alternatives Considered
- **Cytoscape.js**: More general-purpose, steeper learning curve
- **Vis.js Network**: Good but less React-friendly
- **D3.js**: Too low-level, requires more code

## Rich Text Editors

### Tiptap
- **Status**: Free, open-source
- **Pros**:
  - Headless editor framework
  - Highly extensible
  - Good TypeScript support
  - Modern architecture (ProseMirror-based)
  - Active development
  - Many extensions available
- **Cons**:
  - Requires more setup than pre-built editors
- **Decision**: Primary choice for notes

### Alternatives Considered
- **Quill**: Older, less extensible
- **Draft.js**: Facebook's, less active development
- **Slate**: Good but more complex than Tiptap

## Drawing/Canvas Libraries

### tldraw
- **Status**: Free, open-source
- **Pros**:
  - Modern drawing experience
  - Good for freehand sketches
  - Can export as image/SVG
  - React-specific
  - Active development
  - Rich feature set
- **Cons**:
  - Larger bundle size
- **Decision**: Primary choice for drawing notes

### Alternatives Considered
- **React Canvas Draw**: Simpler but less features
- **Fabric.js**: Not React-specific
- **Konva**: Good but more complex API

## File Preview

### PDF
- **react-pdf**: React-specific, good features
- **iframe**: Native browser support, simplest
- **Decision**: Start with iframe, use react-pdf if more control needed

### Markdown
- **react-markdown**: Simple, customizable
- **Decision**: Primary choice

### Code Syntax Highlighting
- **react-syntax-highlighter**: Popular, many themes
- **Prism**: Lightweight, good performance
- **Decision**: react-syntax-highlighter for ease of use

### Docx (Future)
- **mammoth.js**: Client-side conversion to HTML
- **Server-side conversion**: More reliable but requires backend
- **Decision**: mammoth.js for MVP, server-side for production

### Pptx (Future)
- **No good client-side solution**
- **Server-side conversion required**
- **Decision**: Download only for MVP, server-side preview for production

## Student Planner Inspirations

### ClassPlanner
- **Source**: GitHub (open-source)
- **Features**: Class scheduling, assignment tracking
- **Notes**: Good for reference, not 1:1 fit

### Study Smart
- **Source**: Various app stores
- **Features**: Study timers, task management
- **Notes**: Focus on time management, not curriculum

### Student Timetable Planner
- **Source**: Multiple web apps
- **Features**: Timetable visualization
- **Notes**: Good for calendar inspiration

## AI Study Generation (Future)

### Options
- **OpenAI GPT-4**: Most capable, higher cost
- **Claude**: Good for explanations, competitive pricing
- **Local RAG**: Lower cost, more control, requires setup

### Implementation Strategy
- Start with mock AI content
- Test prompts and content structure
- Evaluate quality and cost
- Choose provider based on needs

## Backend Options

### Supabase
- **Pros**:
  - PostgreSQL database
  - Built-in authentication
  - Real-time subscriptions
  - File storage
  - Free tier available
  - Good TypeScript support
- **Cons**:
  - Vendor lock-in
- **Decision**: Primary choice for Phase 4

### Alternatives
- **Firebase**: Good but NoSQL (less structured)
- **PostgreSQL + Drizzle**: More control, more setup
- **PlanetScale**: MySQL-based, good scaling

## Authentication Options

### Clerk
- **Pros**:
  - Excellent UX
  - Easy integration
  - Good documentation
- **Cons**:
  - Cost for production
- **Decision**: Consider for Phase 4

### Supabase Auth
- **Pros**:
  - Free with Supabase
  - Good features
  - Integrated with database
- **Cons**:
  - Less polished UX than Clerk
- **Decision**: Strong contender if using Supabase

### NextAuth
- **Pros**:
  - Flexible
  - Free
- **Cons**:
  - More setup required
- **Decision**: Good fallback option

## Date Utilities

### date-fns
- **Pros**:
  - Modular (tree-shakeable)
  - Immutable
  - Good TypeScript support
  - Functional approach
- **Cons**:
  - Slightly larger than Day.js
- **Decision**: Primary choice

### Day.js
- **Pros**:
  - Tiny bundle size
  - Moment.js-compatible API
- **Cons**:
  - Less features than date-fns
- **Decision**: Good alternative if bundle size is concern

## Math Rendering (Future)

### KaTeX
- **Pros**:
  - Fast rendering
  - No dependencies
  - Good LaTeX support
- **Cons**:
  - Less features than MathJax
- **Decision**: Primary choice for formula display

### MathJax
- **Pros**:
  - More features
  - Better for complex math
- **Cons**:
  - Slower rendering
  - Larger bundle
- **Decision**: Backup for complex formulas

## Performance Considerations

### Code Splitting
- Use Next.js dynamic imports for heavy components
- Lazy load calendar and graph
- Split routes automatically with App Router

### Bundle Optimization
- Tree-shake unused code
- Analyze bundle size regularly
- Use lighter alternatives when possible

### Rendering Strategy
- Server components for static content
- Client components for interactivity
- Use React.memo for expensive renders

## Accessibility

### Tools
- axe DevTools for testing
- WAVE for visual feedback
- Keyboard navigation testing

### Guidelines
- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels where needed
- Focus management
- Color contrast ratios

## Mobile Responsiveness

### Strategy
- Desktop-first design
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Touch-friendly targets (44x44px minimum)
- Test on actual devices

### Framework
- Tailwind responsive utilities
- CSS Grid and Flexbox
- Media queries when needed

## Internationalization (Future)

### Options
- next-intl: Next.js-specific, good App Router support
- react-i18next: Popular, flexible
- **Decision**: next-intl if i18n needed

## Testing Strategy

### Unit Tests
- Jest for utilities
- React Testing Library for components
- Focus on critical paths

### Integration Tests
- Playwright for E2E
- Test key user flows
- Cross-browser testing

### Accessibility Tests
- Automated a11y tests
- Manual keyboard testing
- Screen reader testing
