# Story 1.4: Layout Principal 50/50 (Chat | Observability)

Status: done

## Story

As a **developer**,
I want to see the basic UI layout with Chat and Observability panels,
so that the foundation for the main interface is ready.

## Acceptance Criteria

1. **Given** the frontend is running
   **When** I navigate to localhost:5173
   **Then** I see a header bar with placeholder status indicators

2. **Given** the main layout
   **When** I view the page
   **Then** the main content is split 50/50 horizontally (Chat left | Observability right)

3. **Given** the layout structure
   **When** I inspect the CSS
   **Then** the layout uses CSS Grid and fills the viewport height

4. **Given** the visual theme
   **When** I view the page
   **Then** dark mode is applied by default (Slate 900 background)

5. **Given** the typography
   **When** I inspect the fonts
   **Then** Typography uses Inter (UI) and Fira Code (future code/logs)

## Tasks / Subtasks

- [x] **Task 1: Create Header Component** (AC: #1)
  - [x] 1.1 Create `src/components/custom/Header.tsx` component
  - [x] 1.2 Add placeholder MCP status indicator (disconnected state)
  - [x] 1.3 Add placeholder LLM status indicator (GPT-4o ready)
  - [x] 1.4 Add application title/logo area
  - [x] 1.5 Style with fixed height 64px, dark background

- [x] **Task 2: Create ChatPanel Placeholder** (AC: #2)
  - [x] 2.1 Create `src/components/custom/ChatPanel.tsx` component
  - [x] 2.2 Add placeholder message area (empty state with instruction)
  - [x] 2.3 Add placeholder input area at bottom
  - [x] 2.4 Style with full height, proper padding

- [x] **Task 3: Create ObservabilityPanel Placeholder** (AC: #2)
  - [x] 3.1 Create `src/components/custom/ObservabilityPanel.tsx` component
  - [x] 3.2 Add placeholder "Pipeline Logs" header
  - [x] 3.3 Add empty state message ("No logs yet")
  - [x] 3.4 Add placeholder filter buttons (All/Info/Error/Debug)
  - [x] 3.5 Style with full height, monospace font for logs area

- [x] **Task 4: Implement Main Layout** (AC: #2, #3)
  - [x] 4.1 Update `App.tsx` with CSS Grid layout
  - [x] 4.2 Configure grid-template-columns: 1fr 1fr (50/50 split)
  - [x] 4.3 Configure height: calc(100vh - 64px) for main content
  - [x] 4.4 Add resizable divider between panels (optional, nice-to-have) - Skipped: border-r used as simple divider

- [x] **Task 5: Configure Dark Mode Theme** (AC: #4)
  - [x] 5.1 Verify Tailwind dark mode is configured
  - [x] 5.2 Apply slate-900 background to body/root
  - [x] 5.3 Configure dark mode as default (no toggle needed MVP)
  - [x] 5.4 Update global CSS with dark theme colors

- [x] **Task 6: Configure Typography** (AC: #5)
  - [x] 6.1 Import Inter font (Google Fonts or local)
  - [x] 6.2 Import Fira Code font for monospace
  - [x] 6.3 Configure Tailwind fontFamily extending defaults
  - [x] 6.4 Apply Inter to body, Fira Code to code/log elements

- [x] **Task 7: Verify Layout Responsiveness** (AC: all)
  - [x] 7.1 Test layout at 1920x1080 (baseline)
  - [x] 7.2 Test layout at 1366x768 (minimum)
  - [x] 7.3 Ensure no horizontal scroll
  - [x] 7.4 Verify both panels are visible and usable

## Dev Notes

### Architecture Compliance

**Source:** [architecture.md#Frontend Structure]

```
packages/frontend/src/
├── components/
│   ├── ui/           # shadcn/ui (Button, Input, Card...)
│   └── custom/       # Custom components (Header, ChatPanel, ObservabilityPanel)
├── lib/              # Utilities, helpers
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
├── App.tsx
└── main.tsx
```

### Technical Requirements

**From UX Design Specification - Layout:**
- Layout 50/50: Chat (left) | Observability Panel (right)
- Header fixed 64px height
- Main content height: `calc(100vh - 64px)`
- No footer (maximize useful content)
- CSS Grid for layout (`grid-template-columns: 1fr 1fr`)

**From UX Design Specification - Visual Design:**
- Dark mode by default (Slate 900 background `#0f172a`)
- Primary accent: Blue `#3b82f6`
- Success: Green `#10b981`
- Error: Red `#ef4444`
- Warning: Yellow `#f59e0b`

**From UX Design Specification - Typography:**
- UI Font: Inter (sans-serif)
- Code/Logs Font: Fira Code (monospace)
- Body text: 16px normal, line-height 1.5
- Code text: 14px, line-height 1.6

**From Architecture - Design System:**
- Tailwind CSS 4.x configured
- shadcn/ui initialized (Button, Card, Badge available)
- Lucide React for icons

### Previous Story Intelligence (1.1, 1.2, 1.3)

**From Story 1.1 - Project Structure:**
- Monorepo with pnpm workspace
- Frontend on port 5173 (Vite)
- Backend on port 3000 (Express)
- Path alias `@/` configured

**From Story 1.2 - Frontend Setup:**
- React 19 (not React 18 as in architecture spec - accepted)
- Tailwind CSS 4.x with `@tailwindcss/postcss`
- CSS-first configuration (`@import "tailwindcss"`, `@theme inline`)
- shadcn/ui initialized with basic components
- Vite 6.x dev server configured

**From Story 1.3 - Backend Ready:**
- Backend running with Express 5.2.1
- Socket.io 4.8.3 ready for real-time (Story 3.1)
- Health endpoint at GET /api/health
- CORS configured for localhost:5173

### Component Structure

**Header Component:**
```typescript
// src/components/custom/Header.tsx
interface HeaderProps {
  mcpStatus?: 'disconnected' | 'connecting' | 'connected';
  llmStatus?: 'ready' | 'error';
}

// Visual elements:
// - Logo/Title: "Chatbot MCP Lab"
// - MCP Status: Badge with dot indicator
// - LLM Status: Badge showing "GPT-4o"
```

**ChatPanel Component:**
```typescript
// src/components/custom/ChatPanel.tsx
// Placeholder for Story 5.1 (ChatInterface with Zustand)

// Visual elements:
// - Messages area (scrollable, empty state)
// - Input area at bottom (disabled placeholder)
// - "Chat" title in header
```

**ObservabilityPanel Component:**
```typescript
// src/components/custom/ObservabilityPanel.tsx
// Placeholder for Story 3.3 (ObservabilityPanel with Timeline)

// Visual elements:
// - "Pipeline Logs" title
// - Filter buttons row (All/Info/Error/Debug)
// - Logs area (scrollable, empty state)
// - Uses Fira Code font
```

### Tailwind Configuration

**tailwind.config.js should include:**
```javascript
// Extend with custom fonts and colors
theme: {
  extend: {
    colors: {
      // Design system colors from UX spec
      primary: '#3b82f6',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      transform: '#8b5cf6',
      'mcp-call': '#ec4899',
      'llm-response': '#06b6d4',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'Courier New', 'monospace'],
    },
  }
}
```

**Note:** With Tailwind 4.x CSS-first config, these may need to be defined in index.css using `@theme` directive instead of JS config.

### Font Installation

**Option 1: Google Fonts (Recommended for MVP)**
```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
```

**Option 2: Local fonts (Phase 2)**
```bash
# Install @fontsource packages
pnpm add @fontsource/inter @fontsource/fira-code
```

### CSS Grid Layout

**Main layout structure in App.tsx:**
```tsx
<div className="h-screen bg-slate-900 text-slate-50">
  <Header />
  <main className="grid grid-cols-2 h-[calc(100vh-64px)]">
    <ChatPanel />
    <ObservabilityPanel />
  </main>
</div>
```

### NFRs Addressed

| NFR | Requirement | Implementation |
|-----|-------------|----------------|
| NFR1 | UI interactions < 100ms | Minimal components, no heavy state |
| NFR24 | Chrome/Edge latest 2 versions | CSS Grid, standard Tailwind |
| NFR25 | Firefox best effort | Standard CSS, no experimental features |

### Critical Warnings

1. **NE PAS** ajouter de logique de state complexe - c'est juste le layout
2. **NE PAS** connecter au backend encore - placeholders seulement
3. **TOUJOURS** utiliser les classes Tailwind du design system
4. **TOUJOURS** tester sur 1920x1080 et 1366x768 minimum
5. **Tailwind 4.x**: Attention au format CSS-first, pas de fichier JS config traditionnel

### Testing Verification

```bash
# Start frontend
pnpm dev:frontend

# Open in browser
# Navigate to http://localhost:5173

# Verify:
# 1. Header visible with 64px height
# 2. Two panels visible side by side (50/50)
# 3. Dark mode applied (slate-900 background)
# 4. No horizontal scrollbar
# 5. Fonts loading (Inter for UI, Fira Code for code areas)
```

### Design Reference

**Header:**
- Height: 64px
- Background: slate-800 or slate-900
- Left: App title
- Right: Status badges (MCP, LLM)

**ChatPanel:**
- Background: slate-900
- Border-right: 1px slate-700 (divider)
- Padding: 16px
- Header: "Chat" with subtle styling

**ObservabilityPanel:**
- Background: slate-900
- Padding: 16px
- Header: "Pipeline Logs"
- Filter buttons: badge-style buttons

### Project Structure Notes

- Components go in `src/components/custom/`
- Keep shadcn/ui components in `src/components/ui/`
- Use path alias `@/` for imports
- Follow naming convention: PascalCase for components

### References

- [Source: architecture.md#Frontend Structure]
- [Source: ux-design-specification.md#Design Direction]
- [Source: ux-design-specification.md#Visual Design Foundation]
- [Source: ux-design-specification.md#Core User Experience]
- [Source: epics.md#Story 1.4]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- TypeScript compilation: 0 errors
- Vite build: success (4.88s)
- Dev server: running on http://localhost:5173

### Completion Notes List

- Created `src/components/custom/` directory structure per architecture spec
- Header component with MCP/LLM status indicators (Badge with dot indicators)
- ChatPanel with empty state message and disabled input placeholder
- ObservabilityPanel with filter buttons (All/Info/Error/Debug) and monospace font area
- App.tsx refactored to use CSS Grid with `grid-cols-2` for 50/50 split
- Dark mode configured with slate-900 background (`hsl(222.2 47.4% 11.2%)`)
- Typography configured with Inter (sans) and Fira Code (mono) in @theme directive
- Google Fonts already loaded in index.html from Story 1.2
- Barrel export created at `src/components/custom/index.ts`

### Change Log

- 2026-01-15: Initial implementation of Story 1.4 - Layout Principal 50/50
- 2026-01-15: Code Review - Added tests (23 tests, 4 files), fixed MEDIUM issues

### Senior Developer Review

**Review Date:** 2026-01-15
**Reviewer:** Claude Sonnet 4.5 (Adversarial Code Review)

**Issues Found:**
| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| HIGH-1 | High | Tests completely missing - ACs not validated | **FIXED** - Created 4 test files with 23 tests total (App.test.tsx, Header.test.tsx, ChatPanel.test.tsx, ObservabilityPanel.test.tsx) |
| MEDIUM-2 | Medium | `activeFilter` variable unused in ObservabilityPanel | **FIXED** - Added TODO comment linking to Story 3.3 |
| MEDIUM-3 | Medium | Settings button clickable but no handler - bad UX | **FIXED** - Disabled button with title "Settings coming soon" |
| MEDIUM-4 | Medium | Tailwind 4.x font-mono not visually tested | **FIXED** - Verified configuration in index.css, Google Fonts loading confirmed |
| LOW-1 | Low | Barrel export unused | Accepted - kept for future consistency |
| LOW-2 | Low | ChatPanel input placeholder generic | Accepted - placeholder is adequate |
| LOW-3 | Low | Hardcoded "GPT-4o" in Header | Accepted - will be refactored in Story 4.5 |

**Test Coverage Added:**
- App.test.tsx: 4 tests (AC#1-4 validation)
- Header.test.tsx: 8 tests (status indicators, height, props)
- ChatPanel.test.tsx: 5 tests (empty state, placeholders)
- ObservabilityPanel.test.tsx: 6 tests (filters, font-mono, empty state)

**Total:** 23 tests passing ✅

**Verdict:** ✅ **APPROVED** - All critical and medium issues resolved, comprehensive test coverage added

### File List

- packages/frontend/src/components/custom/Header.tsx (created, modified - disabled Settings button)
- packages/frontend/src/components/custom/ChatPanel.tsx (created)
- packages/frontend/src/components/custom/ObservabilityPanel.tsx (created, modified - TODO comment)
- packages/frontend/src/components/custom/index.ts (created)
- packages/frontend/src/App.tsx (modified - refactored to use custom components)
- packages/frontend/src/index.css (modified - dark mode slate-900, font-family config)
- packages/frontend/src/App.test.tsx (created - 4 tests for AC#1-4)
- packages/frontend/src/components/custom/Header.test.tsx (created - 8 tests)
- packages/frontend/src/components/custom/ChatPanel.test.tsx (created - 5 tests)
- packages/frontend/src/components/custom/ObservabilityPanel.test.tsx (created - 6 tests)
- packages/frontend/src/test/setup.ts (created - test configuration)
- packages/frontend/vitest.config.ts (created - Vitest configuration)
- packages/frontend/package.json (modified - test scripts, test dependencies)
- packages/frontend/tsconfig.app.json (modified - added @testing-library/jest-dom types)

