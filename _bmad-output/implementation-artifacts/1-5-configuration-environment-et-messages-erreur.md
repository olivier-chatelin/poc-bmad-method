# Story 1.5: Configuration Environment et Messages d'Erreur

Status: done

## Story

As a **developer**,
I want environment configuration with clear error messages if something is missing,
so that I can quickly identify and fix configuration issues (FR22, FR25).

## Acceptance Criteria

1. **Given** the backend server
   **When** `OPENAI_API_KEY` is missing from `.env`
   **Then** the server logs a clear error message: "Missing required environment variable: OPENAI_API_KEY"
   **And** the server still starts but indicates config incomplete

2. **Given** a `.env.example` file exists
   **When** I copy it to `.env` and fill in values
   **Then** the server loads the configuration successfully
   **And** API keys are never logged (NFR10 partial)

3. **Given** the server is running
   **When** I check the startup logs
   **Then** I see a configuration summary (without secrets)
   **And** missing environment variables are clearly listed

4. **Given** the frontend is running
   **When** backend configuration is missing or invalid
   **Then** the UI displays a friendly error message with actionable steps

## Tasks / Subtasks

- [ ] **Task 1: Create .env.example Template** (AC: #2)
  - [ ] 1.1 Create `.env.example` in project root
  - [ ] 1.2 Add `OPENAI_API_KEY=your-api-key-here` with comment
  - [ ] 1.3 Add `PORT=3000` (backend port)
  - [ ] 1.4 Add `FRONTEND_URL=http://localhost:5173` (CORS)
  - [ ] 1.5 Add `NODE_ENV=development`
  - [ ] 1.6 Add comments explaining each variable

- [ ] **Task 2: Create Environment Configuration Module** (AC: #1, #3)
  - [ ] 2.1 Create `packages/backend/src/config/env.ts`
  - [ ] 2.2 Define ConfigSchema interface for all env variables
  - [ ] 2.3 Implement loadConfig() function with validation
  - [ ] 2.4 Implement validateConfig() to check required variables
  - [ ] 2.5 Return configuration object with typed properties

- [ ] **Task 3: Implement Configuration Error Handling** (AC: #1, #3)
  - [ ] 3.1 Create custom ConfigError class in `src/config/errors.ts`
  - [ ] 3.2 Check for missing OPENAI_API_KEY in validation
  - [ ] 3.3 Log clear error message with variable name
  - [ ] 3.4 Allow server to start with warning (graceful degradation)
  - [ ] 3.5 Set isConfigComplete flag in configuration object

- [ ] **Task 4: Update server.ts with Configuration Module** (AC: #1, #3)
  - [ ] 4.1 Import loadConfig from config/env
  - [ ] 4.2 Call loadConfig() before server initialization
  - [ ] 4.3 Log configuration summary (mask API keys with ***)
  - [ ] 4.4 Display warning banner if config incomplete
  - [ ] 4.5 Store config in global or module scope for use

- [ ] **Task 5: Add Configuration Status Endpoint** (AC: #4)
  - [ ] 5.1 Create GET /api/config/status endpoint
  - [ ] 5.2 Return { configured: boolean, missing: string[] }
  - [ ] 5.3 Never expose actual API key values
  - [ ] 5.4 Include documentation links in response

- [ ] **Task 6: Update .gitignore** (AC: #2, NFR11)
  - [ ] 6.1 Verify `.env` is in .gitignore
  - [ ] 6.2 Ensure `.env.example` is NOT in .gitignore
  - [ ] 6.3 Add comment explaining the distinction

- [ ] **Task 7: Frontend Configuration Error UI** (AC: #4)
  - [ ] 7.1 Create ConfigErrorBanner component
  - [ ] 7.2 Fetch /api/config/status on app mount
  - [ ] 7.3 Display banner at top if config incomplete
  - [ ] 7.4 Show list of missing variables with setup instructions
  - [ ] 7.5 Add "Dismiss" button (stores in sessionStorage)

- [ ] **Task 8: Documentation and Testing** (AC: all)
  - [ ] 8.1 Add configuration section to README
  - [ ] 8.2 Document all environment variables
  - [ ] 8.3 Test server start with missing OPENAI_API_KEY
  - [ ] 8.4 Test server start with valid .env
  - [ ] 8.5 Verify API keys never appear in console logs

## Dev Notes

### Architecture Compliance

**Source:** [architecture.md#Backend Structure]

```
packages/backend/src/
├── config/
│   ├── env.ts          # Environment configuration loader (NEW)
│   ├── errors.ts       # Custom error classes (NEW)
│   └── index.ts        # Barrel export (NEW)
├── routes/
├── middleware/
├── types/
└── server.ts
```

**Source:** [architecture.md#Frontend Structure]

```
packages/frontend/src/
├── components/
│   └── custom/
│       └── ConfigErrorBanner.tsx  # Configuration error UI (NEW)
├── lib/
└── App.tsx
```

### Technical Requirements

**From PRD - Configuration Requirements (FR22, FR25):**
- FR22: Développeurs peuvent configurer l'API key GPT-4o via fichier .env
- FR25: Système peut afficher des messages d'erreur clairs si configuration manquante

**From Architecture - Security (NFR9-NFR11):**
- NFR9: API keys GPT-4o doivent être stockées dans fichier .env (pas hardcodées)
- NFR10: API keys ne doivent jamais apparaître dans les logs observability UI
- NFR11: Fichier .env doit être exclu du contrôle de version (.gitignore)

**From Architecture - Reliability (NFR14):**
- NFR14: Échecs de connexion MCP doivent afficher message d'erreur explicite (pas de crash silencieux)

### Previous Story Intelligence (1.1, 1.2, 1.3, 1.4)

**From Story 1.3 - Backend Configuration:**
- dotenv already imported with `import 'dotenv/config'` in server.ts
- Configuration logging already exists (masks OPENAI_API_KEY with '***configured***' or 'NOT SET')
- Environment variables: PORT, FRONTEND_URL, OPENAI_API_KEY

**From Story 1.4 - Frontend Structure:**
- React 19 with TypeScript
- Custom components in `src/components/custom/`
- Testing setup with Vitest (App.test.tsx pattern)
- shadcn/ui components: Button, Card, Badge available

**Learnings from Previous Stories:**
- Always create tests alongside components (Story 1.4 code review)
- Use TypeScript interfaces for type safety
- Follow naming conventions: PascalCase components, camelCase files
- Add TODO comments linking to future stories
- Keep code simple - don't over-engineer MVP

### Environment Variables Schema

**Required Variables:**
```typescript
interface Config {
  // API Configuration
  OPENAI_API_KEY: string | undefined  // Required for LLM integration (Story 4.5)

  // Server Configuration
  PORT: number                         // Default: 3000
  NODE_ENV: 'development' | 'production' | 'test'

  // CORS Configuration
  FRONTEND_URL: string                 // Default: http://localhost:5173

  // Configuration Status
  isConfigComplete: boolean            // Derived: all required vars present
}
```

**Validation Rules:**
- `OPENAI_API_KEY`: Warn if missing (not fatal for MVP - some features disabled)
- `PORT`: Default to 3000 if not provided
- `FRONTEND_URL`: Default to http://localhost:5173 if not provided
- `NODE_ENV`: Default to 'development' if not provided

### Configuration Module Design

**packages/backend/src/config/env.ts:**
```typescript
import 'dotenv/config'

export interface Config {
  openaiApiKey?: string
  port: number
  frontendUrl: string
  nodeEnv: string
  isConfigComplete: boolean
  missingVars: string[]
}

export function loadConfig(): Config {
  const missingVars: string[] = []

  // Check required variables
  if (!process.env.OPENAI_API_KEY) {
    missingVars.push('OPENAI_API_KEY')
  }

  const config: Config = {
    openaiApiKey: process.env.OPENAI_API_KEY,
    port: parseInt(process.env.PORT || '3000', 10),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    nodeEnv: process.env.NODE_ENV || 'development',
    isConfigComplete: missingVars.length === 0,
    missingVars,
  }

  // Log configuration summary
  logConfigSummary(config)

  return config
}

function logConfigSummary(config: Config): void {
  console.log('=== Configuration Status ===')
  console.log(`  PORT: ${config.port}`)
  console.log(`  FRONTEND_URL: ${config.frontendUrl}`)
  console.log(`  NODE_ENV: ${config.nodeEnv}`)
  console.log(`  OPENAI_API_KEY: ${config.openaiApiKey ? '***configured***' : '❌ NOT SET'}`)

  if (!config.isConfigComplete) {
    console.warn('\n⚠️  WARNING: Configuration incomplete')
    console.warn(`Missing required variables: ${config.missingVars.join(', ')}`)
    console.warn('Some features will be disabled until configuration is complete.')
    console.warn('See .env.example for required variables.\n')
  }

  console.log('============================\n')
}
```

### Error Handling Pattern

**Custom ConfigError Class:**
```typescript
// packages/backend/src/config/errors.ts
export class ConfigError extends Error {
  constructor(
    public variable: string,
    public message: string,
    public suggestion?: string
  ) {
    super(`Configuration Error: ${message}`)
    this.name = 'ConfigError'
  }
}

// Usage example
if (!process.env.OPENAI_API_KEY) {
  throw new ConfigError(
    'OPENAI_API_KEY',
    'Missing required environment variable: OPENAI_API_KEY',
    'Copy .env.example to .env and add your OpenAI API key'
  )
}
```

**Note:** For MVP, we log warnings instead of throwing errors to allow graceful degradation.

### Frontend Configuration Status UI

**ConfigErrorBanner Component:**
```typescript
// packages/frontend/src/components/custom/ConfigErrorBanner.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface ConfigStatus {
  configured: boolean
  missing: string[]
}

export function ConfigErrorBanner() {
  const [status, setStatus] = useState<ConfigStatus | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check sessionStorage for dismissal
    const wasDismissed = sessionStorage.getItem('config-banner-dismissed')
    if (wasDismissed) {
      setDismissed(true)
      return
    }

    // Fetch configuration status
    fetch('http://localhost:3000/api/config/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error('Failed to fetch config status:', err))
  }, [])

  const handleDismiss = () => {
    sessionStorage.setItem('config-banner-dismissed', 'true')
    setDismissed(true)
  }

  if (dismissed || !status || status.configured) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Configuration Incomplete</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Missing required environment variables: <strong>{status.missing.join(', ')}</strong>
        </p>
        <p className="text-sm">
          Copy <code>.env.example</code> to <code>.env</code> and add your API keys.
          See README for setup instructions.
        </p>
      </AlertDescription>
      <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={handleDismiss}>
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}
```

### .env.example Template

```env
# Backend Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# OpenAI API Key (Required for LLM integration)
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

# Future: MCP Server Configuration (Story 2.1)
# MCP_SERVER_URL=
# MCP_SERVER_TOKEN=
```

### NFRs Addressed

| NFR | Requirement | Implementation |
|-----|-------------|----------------|
| NFR9 | API keys stockées .env (pas hardcodées) | Configuration module loads from .env |
| NFR10 | API keys jamais dans logs | Masking with *** in log output |
| NFR11 | .env exclu contrôle version | .gitignore includes .env |
| NFR14 | Messages erreur explicites | Clear error messages with suggestions |

### Critical Warnings

1. **NE PAS** logger les valeurs réelles des API keys - toujours masquer avec `***`
2. **NE PAS** inclure `.env` dans git - vérifier `.gitignore`
3. **TOUJOURS** fournir `.env.example` avec tous les champs nécessaires
4. **TOUJOURS** permettre au serveur de démarrer même avec config incomplète (graceful degradation)
5. **NE PAS** exposer les API keys via l'endpoint `/api/config/status`

### Testing Verification

```bash
# Test 1: Server start without .env
rm .env
pnpm dev:backend
# Expected: Warning logged, server starts, isConfigComplete = false

# Test 2: Server start with valid .env
cp .env.example .env
# Edit .env and add OPENAI_API_KEY
pnpm dev:backend
# Expected: Configuration summary logged, no warnings

# Test 3: Verify API keys never logged
grep "sk-" backend-logs.txt
# Expected: No matches (keys are masked)

# Test 4: Frontend config error banner
pnpm dev:frontend
# Navigate to http://localhost:5173
# Expected: Banner appears if backend config incomplete
```

### Integration with Future Stories

**Story 2.1 (MCP Configuration Form):**
- Will use the same configuration pattern
- Add MCP_SERVER_URL, MCP_SERVER_TOKEN to .env.example
- Extend Config interface with MCP fields

**Story 4.5 (GPT4oStrategy Implementation):**
- Will use config.openaiApiKey from this story
- Should check isConfigComplete before making API calls
- Display error if OPENAI_API_KEY not configured

**Story 3.2 (Pino Logger):**
- Logger should use configuration module
- Never log API keys in structured logs
- Include masking middleware for sensitive fields

### Project Structure Notes

- Configuration module is reusable for all env variables
- Error classes follow architecture custom error pattern
- Frontend banner can be extended for other warnings
- Pattern established for graceful degradation

### References

- [Source: epics.md#Story 1.5]
- [Source: architecture.md#Security (NFR9-NFR11)]
- [Source: architecture.md#Reliability (NFR14)]
- [Source: prd.md#FR22, FR25]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

- Backend compilation: 0 TypeScript errors
- Frontend compilation: 0 TypeScript errors
- Backend tests: 12/12 passing (env.test.ts: 9 tests, errors.test.ts: 3 tests)
- Frontend tests: 30/30 passing (ConfigErrorBanner.test.tsx: 7 tests)
- Manual test: /api/config/status endpoint verified
- Manual test: Configuration logging verified (with/without OPENAI_API_KEY)
- Code Review: 8 issues fixed (3 HIGH, 5 MEDIUM) - 2026-01-17

### Completion Notes List

- Created comprehensive .env.example with all required variables and comments
- Implemented Config interface with typed properties and validation flags
- Created loadConfig() function with graceful degradation pattern
- Implemented ConfigError class for future use cases
- Refactored server.ts to use centralized configuration module
- Created /api/config/status endpoint that never exposes API key values (NFR10)
- Updated .gitignore with explicit comments about .env vs .env.example
- Created ConfigErrorBanner component with sessionStorage dismissal
- Integrated banner into App.tsx Chat panel
- Added shadcn/ui Alert component
- API keys properly masked in logs as "***configured***" (NFR10)
- Missing OPENAI_API_KEY triggers warning but allows server to start (graceful degradation)
- All 4 Acceptance Criteria validated with tests

### Code Review Fixes (2026-01-17)

**HIGH Issues Fixed:**
1. ✅ URL backend hardcodée → Ajout VITE_BACKEND_URL avec fallback
2. ✅ README.md manquant → Créé README complet avec section configuration
3. ✅ Validation PORT invalide → Ajout validation NaN et range (1-65535)

**MEDIUM Issues Fixed:**
4. ✅ Gestion erreur fetch → Banner "Cannot Connect to Backend" si échec
5. ✅ SessionStorage dismiss → Expiration 24h avec timestamp
6. ✅ Tests PORT invalid → 4 nouveaux tests (invalid, out of range, boundaries)
7. ✅ Retry logic fetch → 3 tentatives avec exponential backoff
8. ✅ .gitkeep supprimé → Nettoyage fichier obsolète

**Total:** 8 problèmes corrigés (3 HIGH, 5 MEDIUM) - Story complète et production-ready

### Change Log

- 2026-01-15: Initial implementation of Story 1.5 - Configuration Environment et Messages d'Erreur
- 2026-01-15: All tasks completed, tests passing, ready for code review
- 2026-01-17: Code review completed - 8 issues fixed (3 HIGH, 5 MEDIUM)
- 2026-01-17: Story marked as DONE - all ACs validated, production-ready

### File List

**Backend:**
- .env.example (modified - enhanced with backend/frontend separation and detailed comments)
- packages/backend/src/config/env.ts (modified - added PORT validation with range check)
- packages/backend/src/config/errors.ts (created - ConfigError class)
- packages/backend/src/config/index.ts (created - barrel export)
- packages/backend/src/config/env.test.ts (modified - added 4 PORT validation tests, total 9 tests)
- packages/backend/src/config/errors.test.ts (created - 3 unit tests)
- packages/backend/src/routes/config.routes.ts (created - /api/config/status endpoint)
- packages/backend/src/server.ts (modified - integrated loadConfig(), removed manual logging)
- packages/backend/package.json (modified - added vitest scripts)
- packages/backend/vitest.config.ts (created - Vitest configuration)

**Frontend:**
- packages/frontend/.env.example (created - VITE_BACKEND_URL configuration)
- packages/frontend/src/components/custom/ConfigErrorBanner.tsx (modified - retry logic, 24h expiration, error handling)
- packages/frontend/src/components/custom/ConfigErrorBanner.test.tsx (created - 7 unit tests)
- packages/frontend/src/components/custom/index.ts (modified - added barrel export)
- packages/frontend/src/components/ui/alert.tsx (created - shadcn/ui Alert component)
- packages/frontend/src/App.tsx (modified - integrated ConfigErrorBanner)

**Project:**
- README.md (created - complete documentation with configuration guide)
- .gitignore (modified - added explicit .env.example comment)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified - story status: done)

