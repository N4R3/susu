# AI Rules

## Coding Rules

### General Principles
- **No demo-only code**: All code must be production-ready or clearly marked as placeholder
- **Clean types**: Use TypeScript interfaces/types for all data structures
- **Small components**: Keep components focused and single-responsibility
- **Reusable layouts**: Create layout components that can be reused across pages
- **No hardcoding**: Move data to mock data files, not component props

### File Organization
```
/app
  /layout.tsx          # Root layout
  /page.tsx            # Homepage
  /subjects
    /[subjectId]
      /page.tsx        # Subject detail
      /notes
        /page.tsx      # Notes page
      /study
        /page.tsx      # Study page
      /classes
        /page.tsx      # Classes page
      /description
        /page.tsx      # Subject description page
  /curriculum-map
    /page.tsx          # Curriculum map page
/components
  /ui                  # shadcn/ui components
  /layout              # Layout components
  /dashboard           # Dashboard-specific components
  /subject             # Subject-specific components
/lib
  /mock-data           # Mock data files
  /types               # TypeScript types
  /utils               # Utility functions
/docs                  # Documentation files
```

### Component Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
- Use TypeScript for all components
- Add JSDoc comments for complex functions
- Keep prop interfaces at top of file

### State Management
- Use React hooks (useState, useEffect, useContext) for local state
- Use React Context for global state if needed
- Consider Zustand or Jotai for complex state (later phases)
- No Redux (overkill for this project)

### Styling
- Use Tailwind CSS for all styling
- Use shadcn/ui for base components
- Custom styles only when absolutely necessary
- Use CSS modules for component-specific styles if needed
- No inline styles except for dynamic values

### Imports
- Keep imports at top of file
- Group imports: React/Next.js → Third-party → Local components → Types → Utils
- Use absolute imports with @/ prefix after configuring tsconfig

## Product Rules

### User Experience
- **Fast performance**: Optimize for quick loads and smooth interactions
- **Clear hierarchy**: Use size, color, spacing to establish visual hierarchy
- **Obvious affordances**: Make interactive elements clearly clickable
- **Feedback**: Provide visual feedback for all user actions
- **Error handling**: Graceful error states with helpful messages

### Data Handling
- **No sensitive data in localStorage**: Don't store passwords, tokens, or PII
- **Mock data first**: Use local mock data before connecting to backend
- **Type safety**: Ensure all data is properly typed
- **Validation**: Validate user inputs on client side

### Accessibility
- **Semantic HTML**: Use proper HTML5 elements
- **Keyboard navigation**: Ensure all features work with keyboard
- **Screen reader support**: Add ARIA labels where needed
- **Color contrast**: Meet WCAG AA standards
- **Focus states**: Visible focus indicators

### Mobile Responsiveness
- **Desktop-first**: Design for desktop first, then adapt for mobile
- **Touch targets**: Minimum 44x44px for touch elements
- **Readable text**: Minimum 16px for body text on mobile
- **Responsive layouts**: Use flexbox/grid for adaptive layouts

## Technology Constraints

### Allowed Libraries
- Next.js 15 App Router
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React
- React Big Calendar or FullCalendar
- React Flow
- Tiptap
- tldraw

### Not Allowed
- MUI (Material UI)
- Chakra UI
- Gradient buttons
- Hardcoded data in components
- Demo-only code without path to production

### Future Considerations (Phase 4+)
- Supabase for backend
- Clerk or Supabase Auth for authentication
- OpenAI or Claude for AI features
- File storage solution

## Development Workflow

### Before Coding
1. Create/update documentation files in /docs/
2. Review PROGRESS.md and NEXT_STEPS.md
3. Check DECISIONS.md for architectural decisions
4. Review AI_SKILLS.md for reusable patterns

### During Coding
1. Write clean, typed code
2. Keep components small and focused
3. Use mock data from /lib/mock-data/
4. Follow design system from DESIGN_SYSTEM.md
5. Test responsive behavior

### After Coding
1. Update PROGRESS.md with completed tasks
2. Update DECISIONS.md with any new decisions
3. Update NEXT_STEPS.md with next tasks
4. Document any research in RESEARCH_NOTES.md

## Code Quality

### TypeScript
- Enable strict mode
- Use proper type annotations
- Avoid `any` type
- Use interfaces for object shapes
- Use type aliases for unions/primitives

### React Best Practices
- Use functional components
- Proper dependency arrays in useEffect
- Memoize expensive computations
- Use React.memo for component optimization when needed
- Follow Rules of Hooks

### Testing
- Write unit tests for utilities
- Write integration tests for key user flows
- Test accessibility with keyboard navigation
- Test responsive behavior

## Performance

### Optimization
- Code splitting with Next.js dynamic imports
- Lazy load heavy components (calendar, graph)
- Optimize images with next/image
- Use React.memo for expensive renders
- Virtualize long lists if needed

### Bundle Size
- Keep dependencies minimal
- Tree-shake unused code
- Use dynamic imports for large libraries
- Monitor bundle size in development
