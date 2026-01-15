# Story 1.3: Setup Backend avec Express et TypeScript

Status: ready-for-dev

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

- [ ] **Task 1: Verify Existing Backend Setup** (AC: #1, #2)
  - [ ] 1.1 Confirm Express 5.x is installed and working
  - [ ] 1.2 Verify TypeScript strict mode is enabled in tsconfig.json
  - [ ] 1.3 Test `pnpm dev:backend` starts with tsx hot reload
  - [ ] 1.4 Verify server restarts on file changes

- [ ] **Task 2: Configure CORS and Middleware** (AC: #3)
  - [ ] 2.1 Verify CORS allows localhost:5173 origin
  - [ ] 2.2 Add CORS configuration for credentials if needed
  - [ ] 2.3 Verify express.json() middleware is configured

- [ ] **Task 3: Verify Health Endpoint** (AC: #4)
  - [ ] 3.1 Test GET /api/health returns { status: "ok" }
  - [ ] 3.2 Ensure response format matches AC (minimal response)

- [ ] **Task 4: Create Backend Directory Structure** (AC: all)
  - [ ] 4.1 Create src/routes/ directory for Express routes
  - [ ] 4.2 Create src/middleware/ directory for custom middleware
  - [ ] 4.3 Create src/types/ directory for TypeScript types
  - [ ] 4.4 Create src/config/ directory for configuration
  - [ ] 4.5 Add .gitkeep files to empty directories

- [ ] **Task 5: Configure Socket.io Infrastructure** (Prep for Story 3.1)
  - [ ] 5.1 Install socket.io package
  - [ ] 5.2 Add basic Socket.io server setup to server.ts
  - [ ] 5.3 Configure Socket.io CORS to match Express CORS
  - [ ] 5.4 Add /observability namespace placeholder

- [ ] **Task 6: Add Environment Configuration** (AC: #1)
  - [ ] 6.1 Import and configure dotenv at server start
  - [ ] 6.2 Add PORT and FRONTEND_URL environment variables
  - [ ] 6.3 Log configuration status at startup (without secrets)

- [ ] **Task 7: Verify Complete Setup** (AC: all)
  - [ ] 7.1 Run `pnpm dev:backend` and verify starts < 5s
  - [ ] 7.2 Test health endpoint from browser/curl
  - [ ] 7.3 Verify TypeScript compilation has 0 errors
  - [ ] 7.4 Test hot reload by modifying server.ts

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

### Current Backend State Analysis

**server.ts Current Implementation:**
```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
```

**Assessment:**
- ✅ Express 5.x configured
- ✅ CORS configured for frontend
- ✅ JSON middleware enabled
- ✅ Health endpoint exists
- ⚠️ dotenv not imported (needs fixing)
- ⚠️ No Socket.io setup yet
- ⚠️ Directory structure for future features not created

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

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List

