# Story 1.1: Initialisation Monorepo et Structure Projet

Status: review

## Story

As a **developer**,
I want to have a properly configured monorepo with frontend and backend packages,
so that I can start developing with a clean, organized project structure.

## Acceptance Criteria

1. **Given** a new project directory
   **When** I run the initialization commands
   **Then** a pnpm workspace is created with `packages/frontend` and `packages/backend`

2. **Given** the monorepo structure
   **When** TypeScript is configured
   **Then** strict mode is enabled for both packages

3. **Given** the root package.json
   **When** I check the scripts
   **Then** it contains scripts for `dev:frontend`, `dev:backend`, and `dev` (parallel)

4. **Given** the git configuration
   **When** I check `.gitignore`
   **Then** it excludes `node_modules`, `.env`, and build artifacts (`dist/`)

## Tasks / Subtasks

- [x] **Task 1: Create Monorepo Root Structure** (AC: #1)
  - [x] 1.1 Create project directory structure `packages/frontend` and `packages/backend`
  - [x] 1.2 Initialize pnpm workspace (`pnpm init`)
  - [x] 1.3 Create `pnpm-workspace.yaml` with `packages: ['packages/*']`
  - [x] 1.4 Create root `package.json` with workspace scripts

- [x] **Task 2: Configure Root Package.json Scripts** (AC: #3)
  - [x] 2.1 Add `dev:frontend` script: `pnpm --filter frontend dev`
  - [x] 2.2 Add `dev:backend` script: `pnpm --filter backend dev`
  - [x] 2.3 Add `dev` script for parallel execution (using concurrently)
  - [x] 2.4 Add `build` and `test` scripts for monorepo

- [x] **Task 3: Initialize Frontend Package** (AC: #1, #2)
  - [x] 3.1 Navigate to `packages/frontend`
  - [x] 3.2 Create Vite React TypeScript project (`pnpm create vite@latest . --template react-ts`)
  - [x] 3.3 Configure `tsconfig.json` with strict mode
  - [x] 3.4 Configure path aliases (`@/` → `src/`)

- [x] **Task 4: Initialize Backend Package** (AC: #1, #2)
  - [x] 4.1 Navigate to `packages/backend`
  - [x] 4.2 Initialize package (`pnpm init`)
  - [x] 4.3 Install core dependencies (express, typescript, tsx, nodemon)
  - [x] 4.4 Create `tsconfig.json` with strict mode and Node.js target
  - [x] 4.5 Create basic `src/server.ts` entry point

- [x] **Task 5: Configure Git Exclusions** (AC: #4)
  - [x] 5.1 Create root `.gitignore` with standard exclusions
  - [x] 5.2 Add `.env` exclusion (security NFR11)
  - [x] 5.3 Add `node_modules/` and `dist/` exclusions
  - [x] 5.4 Create `.env.example` template file

- [x] **Task 6: Verify Setup** (AC: all)
  - [x] 6.1 Run `pnpm install` from root
  - [x] 6.2 Verify `pnpm dev` starts both frontend and backend
  - [x] 6.3 Confirm frontend accessible at localhost:5173
  - [x] 6.4 Confirm backend health endpoint at localhost:3000/api/health

## Dev Notes

### Architecture Compliance

**Source:** [architecture.md#Project Structure & Boundaries]

```
chatbot-mcp-lab/
├── packages/
│   ├── frontend/    # Vite + React + TypeScript
│   └── backend/     # Express + TypeScript
├── pnpm-workspace.yaml
├── package.json     # Workspace root scripts
├── .gitignore
└── .env.example
```

### Technical Requirements

**From Architecture - Starter Template & Project Setup:**
- Utiliser Vite Officiel + Setup Manuel (contrôle total architecture BMAD)
- Structure Monorepo pnpm workspace: packages/frontend + packages/backend
- TypeScript 5.x strict mode (frontend + backend)
- Node.js 20+ LTS runtime

**From Architecture - Development Tools:**
- pnpm 8.x - Package manager performant, workspace monorepo support
- tsx/nodemon - Backend dev hot reload
- Vite 6.x - Dev server ultra-rapide (HMR millisecond)

### Root package.json Template

```json
{
  "name": "poc_bmad",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend dev\"",
    "dev:frontend": "pnpm --filter frontend dev",
    "dev:backend": "pnpm --filter backend dev",
    "build": "pnpm --filter frontend build && pnpm --filter backend build",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

### pnpm-workspace.yaml Template

```yaml
packages:
  - 'packages/*'
```

### Backend tsconfig.json Requirements

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Frontend tsconfig.json Requirements

Vite template provides base config. Ensure:
- `"strict": true`
- Path alias `@/*` configured in both tsconfig.json and vite.config.ts

### .gitignore Requirements

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables (NFR11 - Security)
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Test coverage
coverage/
```

### .env.example Template

```env
# OpenAI API Configuration (FR22)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173
```

### NFRs Addressed

| NFR | Requirement | Implementation |
|-----|-------------|----------------|
| NFR8 | Démarrage serveur dev < 30s | Vite HMR + tsx hot reload |
| NFR9 | API keys dans fichier .env | .env.example template |
| NFR11 | .env exclu du git | .gitignore configuration |
| NFR29 | Setup complet < 5 minutes | Scripts pnpm simplifiés |

### Critical Warnings

1. **NE PAS** utiliser npm ou yarn - pnpm workspace est requis
2. **NE PAS** créer de fichiers hors de la structure packages/
3. **NE PAS** commit le fichier .env (sécurité)
4. **TOUJOURS** utiliser TypeScript strict mode

### Testing Verification

Après implémentation, vérifier:
```bash
# From root directory
pnpm install          # Should install all workspaces
pnpm dev              # Should start both servers in parallel
# Frontend: http://localhost:5173 (Vite default)
# Backend: http://localhost:3000/api/health → { "status": "ok" }
```

### Project Structure Notes

- Alignment avec unified project structure: ✅
- Monorepo pnpm workspace conforme à l'architecture
- Séparation frontend/backend claire avec boundaries établies

### References

- [Source: architecture.md#Project Structure & Boundaries]
- [Source: architecture.md#Technical Preferences Identified]
- [Source: architecture.md#First Implementation Priority]
- [Source: prd.md#FR22, FR23, NFR8, NFR9, NFR11, NFR29]
- [Source: epics.md#Story 1.1]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- pnpm install: 198 packages installed in 15.4s
- pnpm dev: Both servers started successfully (frontend on :5173, backend on :3000)

### Completion Notes List

- Created monorepo structure with pnpm workspace
- Frontend: Vite 7.3.1 + React + TypeScript with strict mode and @/ path alias
- Backend: Express 5.2.1 + TypeScript 5.9.3 with tsx hot reload
- Health check endpoint at /api/health returns { status: "ok" }
- All acceptance criteria validated

### Change Log

- 2026-01-15: Initial implementation of Story 1.1 - Monorepo setup complete

### File List

- package.json (modified - added workspace scripts)
- pnpm-workspace.yaml (created)
- .gitignore (modified - added comprehensive exclusions)
- .env.example (created)
- packages/frontend/ (created via Vite template)
- packages/frontend/tsconfig.app.json (modified - added path aliases)
- packages/frontend/vite.config.ts (modified - added @ alias)
- packages/backend/package.json (created)
- packages/backend/tsconfig.json (created)
- packages/backend/src/server.ts (created)
