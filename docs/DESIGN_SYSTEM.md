# SUSU Design System — Exam Command Center

> Last updated: 2025-05-06 | Theme: dark-first, slate/zinc base, cybersecurity-inspired

## Design Principles

### Core Values
- **Clean**: Minimal clutter, command center focus
- **Modern**: Dark-first, calm premium aesthetic
- **Obvious**: Within 3 seconds the user understands what is urgent
- **Hierarchical**: Urgent > Active > Awaiting > Done — clear visual weight

### Visual Keywords
`command center` · `study cockpit` · `cybersecurity` · `focused` · `calm` · `premium`

### Anti-patterns (Forbidden)
- Loud full-card red backgrounds for urgency
- Neon gamer overload
- Excessive gradients or glassmorphism
- Constant distracting animations
- Generic admin-template grey aesthetics

### Visual Style
- **Rounded corners**: Consistent border-radius (8px-12px for cards, 4px-6px for buttons)
- **Subtle shadows**: Soft, diffused shadows for depth
- **Excellent spacing**: Generous padding and margins (8px grid system)
- **Subject colors**: Distinct but professional color palette (not childish)

## Color System

### Base Palette (Dark-first)
| Token | Value | Usage |
|---|---|---|
| `background` | `zinc-950` | Page background |
| `card` | `zinc-900/30–40` | Card surfaces |
| `border` | `zinc-700/50–60` | Default borders |
| `muted` | `zinc-500–600` | Secondary text |
| `foreground` | `zinc-100` | Primary text |

### Semantic Color Tokens
| Role | Color | Tailwind |
|---|---|---|
| **urgent** | Amber/Red | `amber-500`, `red-500` |
| **warning** | Amber | `amber-400/600` |
| **success** | Emerald | `emerald-400/500` |
| **info / focus** | Cyan | `cyan-400/500` |
| **academic** | Violet/Indigo | `violet-400/500` |
| **muted / inactive** | Zinc | `zinc-500/600` |
| **cybersecurity accent** | Cyan | `cyan-400` |

### Curriculum Map Visual Categories
The curriculum map uses a subject-family color system for visual categorization:

| Category | Color | Tailwind Classes | Accent Color |
|---|---|---|---|
| **Programming** | Blue/Indigo | `bg-blue-50 text-blue-700 border-blue-200` | `#3b82f6` |
| **Cybersecurity** | Rose/Red | `bg-rose-50 text-rose-700 border-rose-200` | `#e11d48` |
| **Networks** | Cyan/Sky | `bg-cyan-50 text-cyan-700 border-cyan-200` | `#0891b2` |
| **Math** | Violet/Slate-blue | `bg-violet-50 text-violet-700 border-violet-200` | `#8b5cf6` |
| **Project** | Amber/Orange | `bg-amber-50 text-amber-700 border-amber-200` | `#f59e0b` |
| **Elective** | Purple/Violet | `bg-purple-50 text-purple-700 border-purple-200` | `#a855f7` |
| **Physical Education** | Green | `bg-emerald-50 text-emerald-700 border-emerald-200` | `#10b981` |
| **Thesis** | Darker Neutral | `bg-slate-50 text-slate-700 border-slate-200` | `#64748b` |

**Usage Rules**:
- Use visual category colors consistently across curriculum map nodes, badges, and legends
- Accent colors are used for visual category indicator bars and edge highlighting
- Maintain sufficient contrast for readability (WCAG AA compliant)
- Use lighter backgrounds for cards with stronger text colors for hierarchy

### Badge Variant Styles
| Variant | Background | Border | Text |
|---|---|---|---|
| `urgent` | `amber-500/15` | `amber-500/30` | `amber-300` |
| `exam` | `red-500/15` | `red-500/30` | `red-300` |
| `focus` | `amber-500/20` | `amber-500/40` | `amber-300` |
| `assignment` | `violet-500/15` | `violet-500/30` | `violet-300` |
| `completed` | `emerald-500/15` | `emerald-500/30` | `emerald-400` |
| `awaitingGrade` | `amber-500/15` | `amber-500/30` | `amber-400` |
| `online` | `cyan-500/15` | `cyan-500/30` | `cyan-300` |
| `passFail` | `slate-500/15` | `slate-500/30` | `slate-400` |
| `closed` | `zinc-700/50` | `zinc-600/40` | `zinc-400` |

### Subject Color Palette
- Programozás: `#3b82f6` (blue)
- Informatika II.: `#f59e0b` (amber)
- Adatvédelem: `#8b5cf6` (violet)
- Hálózatok: `#06b6d4` (cyan)
- Dokumentumvédelem: `#f43f5e` (rose)
- Matematika I.: `#6366f1` (indigo)
- Tanulásmódszertan: `#10b981` (emerald)
- Testnevelés: `#64748b` (slate)

## Typography

### Font Family
| Role | Font | Variable |
|---|---|---|
| UI / body | Geist Sans | `--font-sans` |
| Mono | Geist Mono | `--font-mono` |

### Mono Font Usage (IMPORTANT)
Use `font-mono` / `var(--font-mono)` ONLY for:
- Subject codes (`BBXPR12BLF`)
- Dates and deadlines (`2026-05-09`)
- Countdown numbers (`3 nap`)
- Progress percentages (`87%`)
- Technical chips and metadata

Do NOT use mono for: body text, card titles, badges, navigation

### Font Sizes
- **Page title** (`text-xl font-bold`): Dashboard / section titles
- **Card title** (`text-base font-semibold`): Card headers
- **Body** (`text-sm`): Default content
- **Label / meta** (`text-xs`): Badges, chips, secondary info
- **Tiny** (`text-[10px]` or `text-[9px]`): Compact chips, codes

### Heading Scale
```
text-2xl font-bold    — Hero section title
text-xl font-bold     — Page title
text-lg font-semibold — Section/card title (large)
text-base font-semibold — Card title
text-sm font-medium   — Sub-label
text-xs               — Meta / chip
```

## Component Rules

### Cards
```
Border: border border-zinc-700/50
Background: bg-zinc-900/30
Radius: rounded-xl (large) / rounded-lg (default)
Padding: p-4 (default) / p-6 (hero)
Hover: transition on border color only
```

**Urgent card behavior:**
- Border: `border-amber-500/50`
- Background: `bg-amber-950/15–20`
- No loud full-card red — use a left accent or border only
- Pulse indicator: tiny 2.5px dot with `animate-ping`

**Completed/closed card:**
- Background: `bg-emerald-950/10`
- Border: `border-emerald-600/25`
- Opacity: `opacity-60` on content

### Buttons
- No gradient buttons
- Primary action (urgent): `bg-amber-500 hover:bg-amber-400 text-zinc-950`
- Primary action (normal): `bg-cyan-600 hover:bg-cyan-500 text-zinc-950`
- Ghost: `text-muted-foreground hover:text-foreground hover:bg-zinc-800/50`
- Outline: `border-zinc-700 hover:border-zinc-500`

### Badges
```
Radius: rounded-md (not pill — more premium feel)
Padding: px-1.5 py-0.5
Font: text-[10px] font-medium
Border: always include a thin border (not borderless)
```

### Progress Bars
```
Track: h-2 rounded-full bg-zinc-800
Fill color by progress:
  0–39%:  bg-amber-500
  40–69%: bg-cyan-500
  70–100%: bg-emerald-500
```

## Spacing System

### Scale (Tailwind-based)
- 4px: xs
- 8px: sm
- 16px: md
- 24px: lg
- 32px: xl
- 48px: 2xl

### Usage
- **Component padding**: md (16px) or lg (24px)
- **Gap between items**: sm (8px) or md (16px)
- **Section margins**: lg (24px) or xl (32px)
- **Page padding**: xl (32px) or 2xl (48px)

## Layout

### Dashboard Layout
- **Three-column layout** (desktop):
  - Left: 300px (subject list)
  - Center: flex (calendar)
  - Right: 300px (global notes)
- **Responsive**: Stack on tablet/mobile

### Subject Detail Layout
- **Persistent top navbar**: 60px height
- **Left sidebar**: 250px width (submenu)
- **Main content**: Remaining space

## Icons

### Icon Library
- Lucide React
- Consistent stroke width (2px)
- Size: 16px-24px depending on context

### Usage
- **Navigation icons**: 20px
- **Action icons**: 16px
- **Feature icons**: 24px

## Motion Rules

### Allowed Animations
| Animation | Usage | Duration |
|---|---|---|
| Card entrance | `opacity 0→1, y 8→0` | 250ms ease-out |
| Subject switch | `opacity + x slide` | 200ms |
| Progress bar fill | `width 0→N%` | 500ms ease-out |
| Section accordion | `height 0→auto` | 180ms |
| Card hover lift | `y 0→-2` | 150ms |
| Urgent pulse dot | `animate-ping` on 2.5px dot | Continuous (subtle) |

### Forbidden
- Large moving backgrounds
- Animated gradients on cards
- Constant spinning or flashing indicators
- Page-level scale transforms
- Heavy parallax effects

### Urgent Indicator (standard)
```jsx
<span className="relative flex h-2.5 w-2.5">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50" />
  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
</span>
```
Use this ONLY in headers or hero sections for active exam sprint. Not on every card.

## Accessibility

### Keyboard Navigation
- All interactive elements focusable
- Visible focus states
- Logical tab order

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Alt text for images

### Color Contrast
- WCAG AA compliant (4.5:1 for normal text)
- Test in both light and dark modes

## Responsive Breakpoints

### Tailwind Default
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Strategy
- Desktop-first design
- Mobile adaptations
- Tablet considerations
