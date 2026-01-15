# Story 1.3: Setup Backend avec Express et TypeScript

Status: done

## Story

As a **developer**,
I want a backend server with Express and TypeScript,
so that I have an API server ready to handle MCP and LLM integration.

## Acceptance Criteria

1. **Given** the monorepo structure from Story 1.1
   **When** I run `pnpm dev:backend`
   **Then** Express server starts on port 3000 with hot reload (tsx watch)

2. **Given** the backend package
   **When** TypeScript is configured
   **Then** TypeScript is configured for Node.js environment with strict mode

3. **Given** the CORS configuration
   **When** the frontend makes requests
   **Then** CORS is configured to allow requests from frontend (localhost:5173)

4. **Given** the API endpoints
   **When** I call `GET /api/health`
   **Then** it returns `{ status: "ok" }`

## Tasks / Subtasks

- [x] **Task 1: Verify Existing Backend Setup** (AC: #1, #2)
  - [x] 1.1 Confirm Express 5.x is installed and working
  - [x] 1.2 Verify TypeScript strict mode is enabled in tsconfig.json
  - [x] 1.3 Test `pnpm dev:backend` starts with tsx hot reload
  - [x] 1.4 Verify server restarts on file changes

- [x] **Task 2: Configure CORS and Middleware** (AC: #3)
  - [x] 2.1 Verify CORS allows localhost:5173 origin
  - [x] 2.2 Add CORS configuration for credentials if needed
  - [x] 2.3 Verify express.json() middleware is configured

- [x] **Task 3: Verify Health Endpoint** (AC: #4)
  - [x] 3.1 Test GET /api/health returns { status: "ok" }
  - [x] 3.2 Ensure response format matches AC (minimal response)

- [x] **Task 4: Create Backend Directory Structure** (AC: all)
  - [x] 4.1 Create src/routes/ directory for Express routes
  - [x] 4.2 Create src/middleware/ directory for custom middleware
  - [x] 4.3 Create src/types/ directory for TypeScript types
  - [x] 4.4 Create src/config/ directory for configuration
  - [x] 4.5 Add .gitkeep files to empty directories

- [x] **Task 5: Configure Socket.io Infrastructure** (Prep for Story 3.1)
  - [x] 5.1 Install socket.io package
  - [x] 5.2 Add basic Socket.io server setup to server.ts
  - [x] 5.3 Configure Socket.io CORS to match Express CORS
  - [x] 5.4 Add /observability namespace placeholder

- [x] **Task 6: Add Environment Configuration** (AC: #1)
  - [x] 6.1 Import and configure dotenv at server start
  - [x] 6.2 Add PORT and FRONTEND_URL environment variables
  - [x] 6.3 Log configuration status at startup (without secrets)

- [x] **Task 7: Verify Complete Setup** (AC: all)
  - [x] 7.1 Run `pnpm dev:backend` and verify starts < 5s
  - [x] 7.2 Test health endpoint from browser/curl
  - [x] 7.3 Verify TypeScript compilation has 0 errors
  - [x] 7.4 Test hot reload by modifying server.ts

## Dev Notes

### Architecture Compliance

**Source:** [architecture.md#Backend Structure]

```
packages/backend/src/
├── adapters/         # Strategy Pattern (GPT4oStrategy, future ClaudeStrategy)
├── transformers/     # Canonical Format mappers
├── mcp/              # MCP client, protocol handling
├── observability/    # Logging, tracing middleware
├── routes/           # Express routes
├── middleware/       # Custom middleware
├── config/           # Configuration management
├── types/            # TypeScript types
└── server.ts         # Entry point
```

### Technical Requirements

**From Architecture - Backend Stack:**
- Express 5.x framework (already installed: 5.2.1)
- Socket.io 4.x pour WebSocket server
- Pino 8.x pour structured logging (Story 3.2)
- tsx watch pour hot reload development (already configured)

**From Architecture - API Design:**
- REST API pattern (Express routes)
- Endpoints: POST /api/mcp/connect, DELETE /api/mcp/disconnect, GET /api/mcp/tools, GET /api/mcp/status, POST /api/chat/message, GET /api/health
- APIResponse standard format avec success, data, error

**From Architecture - Real-time Events (Socket.io):**
- Server → Client: observability:log, mcp:status, chat:response, error
- Client → Server: chat:message, mcp:connect, mcp:disconnect

### Previous Story Intelligence (1.1 & 1.2)

**From Story 1.1 - Already Implemented:**
- Backend package initialized with package.json
- Express 5.2.1 installed with cors and dotenv
- TypeScript 5.9.3 configured with strict mode
- tsx watch configured for hot reload
- Health endpoint at GET /api/health exists
- CORS configured for localhost:5173

**From Story 1.2 Code Review - Learnings:**
- React 19 used instead of React 18 (accepted)
- Tailwind 4.x requires `@tailwindcss/postcss` and CSS-first config
- Always add .gitkeep to empty directories for git tracking
- Version updates from architecture spec are acceptable if stable

**Files Already Created (Story 1.1):**
- packages/backend/package.json
- packages/backend/tsconfig.json
- packages/backend/src/server.ts

### Dependencies to Install

```bash
# In packages/backend

# Real-time communication (required for observability)
pnpm add socket.io

# Types for Socket.io
pnpm add -D @types/socket.io
```

### Socket.io Basic Setup Template

```typescript
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Observability namespace
const observabilityNamespace = io.of('/observability');

observabilityNamespace.on('connection', (socket) => {
  console.log('Client connected to observability namespace');

  socket.on('disconnect', () => {
    console.log('Client disconnected from observability namespace');
  });
});

// Use server.listen instead of app.listen for Socket.io
server.listen(PORT, () => {
  console.log(`Backend server with Socket.io running on http://localhost:${PORT}`);
});
```

### NFRs Addressed

| NFR | Requirement | Implementation |
|-----|-------------|----------------|
| NFR8 | Démarrage serveur dev < 30s | tsx watch hot reload |
| NFR9 | API keys dans fichier .env | dotenv configuration |
| NFR14 | Messages erreur explicites | Error handling middleware |
| NFR17 | Redémarrage propre | Graceful shutdown handling |

### Critical Warnings

1. **NE PAS** oublier d'importer dotenv avant d'utiliser process.env
2. **NE PAS** logger les API keys ou secrets
3. **TOUJOURS** utiliser server.listen() quand Socket.io est configuré (pas app.listen())
4. **TOUJOURS** configurer CORS identique pour Express et Socket.io

### Testing Verification

```bash
# From root directory
pnpm dev:backend    # Should start on :3000 with hot reload

# Test endpoints
curl http://localhost:3000/api/health
# Expected: {"status":"ok"}

# Verify hot reload
# Modify server.ts → server should restart automatically
```

### Project Structure Notes

- Alignment avec unified project structure: ✅
- Backend structure préparé pour futures features (adapters, transformers, mcp)
- Socket.io préparé pour observability real-time

### References

- [Source: architecture.md#Backend Stack]
- [Source: architecture.md#API Design]
- [Source: architecture.md#Real-time Communication]
- [Source: prd.md#FR22, FR23, NFR8, NFR14, NFR17]
- [Source: epics.md#Story 1.3]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- TypeScript compilation: 0 errors
- Backend startup: immediate (< 1s)
- Socket.io: WebSocket server ready

### Completion Notes List

- Express 5.2.1 verified working with tsx hot reload
- TypeScript strict mode confirmed in tsconfig.json
- CORS configured for localhost:5173 with credentials
- Health endpoint simplified to return exactly `{ status: "ok" }` (AC#4)
- Backend directory structure created: routes/, middleware/, types/, config/
- Socket.io 4.8.3 installed and configured with /observability namespace
- dotenv configured via `import 'dotenv/config'`
- Configuration logging at startup (secrets masked)
- All acceptance criteria validated

### Change Log

- 2026-01-15: Initial implementation of Story 1.3 - Backend setup complete
- 2026-01-15: Code Review - Added graceful shutdown handling (NFR17), updated File List

### Senior Developer Review

**Review Date:** 2026-01-15
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)

**Issues Found:**
| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| MEDIUM-1 | Medium | pnpm-lock.yaml not documented in File List | Added to File List |
| MEDIUM-2 | Medium | `io` variable appears unused (false positive) | Dismissed - used for observabilityNamespace and graceful shutdown |
| MEDIUM-3 | Medium | No graceful shutdown handling per NFR17 | Added SIGTERM/SIGINT handlers with 10s timeout |
| LOW-1 | Low | Obsolete code in Dev Notes | Cleaned up |
| LOW-2 | Low | Test script placeholder | Acceptable - tests added in Epic 8 |

**Verdict:** ✅ APPROVED - All critical issues resolved, code meets acceptance criteria

### File List

- packages/backend/src/server.ts (modified - added Socket.io, dotenv, config logging, graceful shutdown)
- packages/backend/src/routes/.gitkeep (created)
- packages/backend/src/middleware/.gitkeep (created)
- packages/backend/src/types/.gitkeep (created)
- packages/backend/src/config/.gitkeep (created)
- packages/backend/package.json (modified - added socket.io dependency)
- pnpm-lock.yaml (modified - updated dependencies)

