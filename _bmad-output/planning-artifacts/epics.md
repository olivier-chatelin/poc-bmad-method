---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
status: complete
completedAt: '2026-01-15'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# poc_bmad - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for poc_bmad (Chatbot MCP Lab), decomposing the requirements from the PRD, UX Design and Architecture documents into implementable stories.

## Requirements Inventory

### Functional Requirements

**MCP Connection & Management (FR1-FR5)**
- FR1: Développeurs peuvent connecter un MCP serveur distant via formulaire UI (URL, credentials)
- FR2: Système peut valider la connexion MCP et afficher le statut (connected/failed)
- FR3: Développeurs peuvent voir la liste des tools disponibles du MCP connecté
- FR4: Développeurs peuvent déconnecter un MCP serveur via UI
- FR5: Système peut persister la configuration MCP entre sessions (localStorage)

**LLM Adapter & Transformation (FR6-FR10)**
- FR6: Système peut transformer MCP Tools vers format Canonical intermédiaire
- FR7: Système peut transformer format Canonical vers GPT-4o function calling format
- FR8: Système peut gérer les erreurs de transformation avec messages explicites
- FR9: Système peut router les requêtes utilisateur vers l'adapter LLM sélectionné (GPT-4o MVP)
- FR10: Système peut traiter les réponses LLM et les formatter pour affichage UI

**Chat Interface (FR11-FR15)**
- FR11: Développeurs peuvent envoyer des commandes texte via interface chat
- FR12: Système peut maintenir le contexte conversationnel entre commandes multiples
- FR13: Développeurs peuvent voir l'historique de conversation dans la session courante
- FR14: Système peut afficher les réponses LLM formatées dans le chat
- FR15: Développeurs peuvent voir les indicateurs de chargement pendant traitement requête

**Observability & Debug (FR16-FR21)**
- FR16: Système peut logger toutes les étapes du pipeline (UI → Adapter → LLM → MCP)
- FR17: Développeurs peuvent voir les logs en temps réel dans l'UI observability
- FR18: Système peut tracer les requêtes avec timestamps pour chaque étape pipeline
- FR19: Développeurs peuvent identifier les erreurs de transformation dans les logs
- FR20: Système peut afficher les payloads transformés à chaque étape (debug)
- FR21: Développeurs peuvent filtrer les logs par niveau (info/error/debug)

**Configuration & Settings (FR22-FR25)**
- FR22: Développeurs peuvent configurer l'API key GPT-4o via fichier .env
- FR23: Système peut démarrer en mode développement local (npm run dev)
- FR24: Développeurs peuvent voir quelle LLM strategy est actuellement active
- FR25: Système peut afficher des messages d'erreur clairs si configuration manquante

**MCP Tool Execution (FR26-FR29)**
- FR26: Système peut exécuter les tools MCP demandés par le LLM
- FR27: Système peut gérer les réponses MCP et les retourner au LLM
- FR28: Système peut gérer les échecs d'exécution MCP avec retry logic basique
- FR29: Développeurs peuvent voir les tools MCP appelés dans l'observability UI

**Health & Monitoring (FR30-FR32)**
- FR30: Développeurs peuvent voir le statut de santé de la connexion MCP
- FR31: Système peut détecter les déconnexions MCP et notifier l'utilisateur
- FR32: Développeurs peuvent voir les métriques basiques (temps réponse, nombre requêtes)

### NonFunctional Requirements

**Performance (NFR1-NFR8)**
- NFR1: Interface UI doit répondre aux interactions utilisateur en <100ms (clics, formulaires)
- NFR2: Connexion MCP doit s'établir en <5 secondes
- NFR3: Observability logs doivent s'afficher en <500ms après événement pipeline
- NFR4: Chat interface doit afficher indicateur de chargement si réponse LLM >2s
- NFR5: Système doit gérer minimum 10 requêtes chat consécutives sans dégradation performance
- NFR6: Pipeline de transformation (MCP→Canonical→LLM) doit compléter en <1s (hors appel LLM externe)
- NFR7: Application localhost doit fonctionner avec <1GB RAM utilisée
- NFR8: Démarrage serveur dev (npm run dev) doit compléter en <30 secondes

**Security (NFR9-NFR13)**
- NFR9: API keys GPT-4o doivent être stockées dans fichier .env (pas hardcodées)
- NFR10: API keys ne doivent jamais apparaître dans les logs observability UI
- NFR11: Fichier .env doit être exclu du contrôle de version (.gitignore)
- NFR12: Historique conversation reste en mémoire uniquement (pas de persistence fichier MVP)
- NFR13: MCP credentials (si sensibles) doivent être chiffrées dans localStorage

**Reliability (NFR14-NFR18)**
- NFR14: Échecs de connexion MCP doivent afficher message d'erreur explicite (pas de crash silencieux)
- NFR15: Erreurs transformation doivent être loggées avec contexte complet pour debug
- NFR16: Échecs appel LLM doivent permettre retry manuel via UI
- NFR17: Application localhost doit redémarrer proprement après crash (pas de state corrompu)
- NFR18: Déconnexion MCP ne doit pas crasher l'application (graceful degradation)

**Integration & Compatibility (NFR19-NFR25)**
- NFR19: Système doit supporter MCP protocol specification Anthropic (version courante)
- NFR20: Système doit gérer MCP servers distants via stdio transport
- NFR21: Échecs MCP tool execution doivent être retournés au LLM avec error messages
- NFR22: Adapter GPT-4o doit supporter OpenAI API v1 (function calling)
- NFR23: Système doit gérer rate limits API avec backoff exponentiel
- NFR24: UI doit fonctionner sur Chrome/Edge dernières 2 versions
- NFR25: UI doit rester fonctionnelle sur Firefox (best effort, pas bloquant)

**Maintainability (NFR26-NFR30)**
- NFR26: Code coverage tests doit atteindre >70% pour validation S4
- NFR27: ADRs doivent être documentés pour toutes décisions architecturales majeures
- NFR28: Strategy Pattern doit permettre ajout nouvelle LLM Strategy en <1 jour (validation Phase 2)
- NFR29: README doit permettre setup complet en <5 minutes pour développeur
- NFR30: Canonical Format schema doit être documenté avec exemples

### Additional Requirements

**From Architecture - Starter Template & Project Setup:**
- Utiliser Vite Officiel + Setup Manuel (contrôle total architecture BMAD)
- Structure Monorepo pnpm workspace: packages/frontend + packages/backend
- TypeScript 5.x strict mode (frontend + backend)
- Node.js 20+ LTS runtime

**From Architecture - Frontend Stack:**
- React 18.x pour UI components
- Vite 6.x pour dev server et build
- Tailwind CSS 4.x + shadcn/ui pour styling
- Zustand 4.x pour state management (mcpStore, chatStore, observabilityStore)
- socket.io-client 4.x pour real-time communication
- Lucide React pour icons

**From Architecture - Backend Stack:**
- Express 4.x framework
- Socket.io 4.x pour WebSocket server
- Pino 8.x pour structured logging
- tsx + nodemon pour hot reload development

**From Architecture - Core Patterns:**
- Canonical Format: JSON Schema compatible structure (CanonicalTool, CanonicalParameters, CanonicalResponse)
- Strategy Pattern: LLMStrategy interface avec GPT5oStrategy implementation
- Factory Pattern: LLMAdapterFactory pour créer adapters
- Custom Error Classes: MCPError, TransformationError, LLMError (erreurs éducatives)

**From Architecture - API Design:**
- REST API pattern (Express routes)
- Endpoints: POST /api/mcp/connect, DELETE /api/mcp/disconnect, GET /api/mcp/tools, GET /api/mcp/status, POST /api/chat/message, GET /api/health
- APIResponse standard format avec success, data, error

**From Architecture - Real-time Events (Socket.io):**
- Server → Client: observability:log, mcp:status, chat:response, error
- Client → Server: chat:message, mcp:connect, mcp:disconnect

**From Architecture - Testing:**
- Vitest v1.x framework
- React Testing Library pour component tests
- Tests co-localisés (*.test.ts / *.test.tsx)
- Coverage target 70%

**From Architecture - Naming Conventions:**
- Composants React: PascalCase (ChatInterface.tsx)
- Fichiers utilitaires: camelCase (canonicalTransformer.ts)
- Variables/fonctions: camelCase
- API endpoints: kebab-case (/api/mcp/connect)
- Socket.io events: namespace:action (observability:log)
- Types/Interfaces: PascalCase

**From UX - Design System:**
- Dark mode par défaut (développeurs)
- Accent Blue #3b82f6 (confiance, technologie)
- Font Inter (UI) + Fira Code (code/logs)
- Layout 50/50: Chat | Observability Panel

**From UX - Interaction Patterns:**
- Configuration MCP sans code via formulaire UI
- Observability Panel toujours visible (first-class citizen)
- Streaming responses si > 2s
- Loading states subtils (progress bar top 1px)
- Expand/collapse détails logs
- Export traces: Copy as JSON/Markdown

**From UX - Error Handling UX:**
- Erreurs avec contexte complet (quelle étape pipeline?)
- Suggestions actionnables avec liens documentation
- Stack trace expand optionnel

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Connexion MCP via formulaire UI |
| FR2 | Epic 2 | Validation connexion MCP |
| FR3 | Epic 2 | Liste tools MCP disponibles |
| FR4 | Epic 2 | Déconnexion MCP via UI |
| FR5 | Epic 2 | Persistence configuration localStorage |
| FR6 | Epic 4 | Transformation MCP Tools → Canonical |
| FR7 | Epic 4 | Transformation Canonical → GPT-4o |
| FR8 | Epic 4 | Gestion erreurs transformation |
| FR9 | Epic 4 | Routing vers adapter LLM |
| FR10 | Epic 4 | Formatting réponses LLM |
| FR11 | Epic 5 | Commandes texte via chat |
| FR12 | Epic 5 | Contexte conversationnel |
| FR13 | Epic 5 | Historique conversation |
| FR14 | Epic 5 | Affichage réponses formatées |
| FR15 | Epic 5 | Indicateurs chargement |
| FR16 | Epic 3 | Logging toutes étapes pipeline |
| FR17 | Epic 3 | Logs temps réel UI |
| FR18 | Epic 3 | Tracing avec timestamps |
| FR19 | Epic 3 | Identification erreurs transformation |
| FR20 | Epic 3 | Affichage payloads transformés |
| FR21 | Epic 3 | Filtrage logs par niveau |
| FR22 | Epic 1 | Configuration API key .env |
| FR23 | Epic 1 | Démarrage mode dev local |
| FR24 | Epic 4 | Affichage LLM strategy active |
| FR25 | Epic 1 | Messages erreur config manquante |
| FR26 | Epic 6 | Exécution tools MCP |
| FR27 | Epic 6 | Gestion réponses MCP |
| FR28 | Epic 6 | Retry logic échecs MCP |
| FR29 | Epic 6 | Tools MCP visibles observability |
| FR30 | Epic 7 | Statut santé connexion MCP |
| FR31 | Epic 7 | Détection déconnexions MCP |
| FR32 | Epic 7 | Métriques basiques |

## Epic List

### Epic 1: Environnement de Développement Fonctionnel
Le projet démarre et affiche l'interface de base. L'utilisateur peut lancer `npm run dev` et voir l'interface 50/50 (Chat | Observability) prête à être utilisée.

**FRs couverts:** FR22, FR23, FR25
**NFRs:** NFR8, NFR9, NFR11, NFR29

---

### Epic 2: Connexion et Gestion MCP
Connecter un MCP distant via l'interface et voir les tools disponibles. L'utilisateur peut connecter GitHub MCP en 2 clics, voir les tools disponibles, et sa configuration persiste entre sessions.

**FRs couverts:** FR1, FR2, FR3, FR4, FR5
**NFRs:** NFR2, NFR13, NFR14

---

### Epic 3: Observabilité Pipeline en Temps Réel
Voir chaque étape du pipeline dans l'UI. L'utilisateur voit le pipeline s'animer en temps réel: UI → Adapter → LLM → MCP → Response, avec filtrage et détails des payloads.

**FRs couverts:** FR16, FR17, FR18, FR19, FR20, FR21
**NFRs:** NFR3, NFR10, NFR15

---

### Epic 4: Adapter LLM et Transformation
Le système transforme les tools MCP vers le format GPT-4o. L'architecture Strategy Pattern permet au système de parler le langage de GPT-4o avec les tools MCP via le Canonical Format.

**FRs couverts:** FR6, FR7, FR8, FR9, FR10, FR24
**NFRs:** NFR6, NFR22, NFR28

---

### Epic 5: Interface Chat et Conversation
Interagir avec le LLM via une interface chat naturelle. L'utilisateur tape des commandes, voit l'historique, et reçoit des réponses formatées avec indicateurs de chargement.

**FRs couverts:** FR11, FR12, FR13, FR14, FR15
**NFRs:** NFR1, NFR4, NFR5, NFR12

---

### Epic 6: Exécution Tools MCP
Le LLM exécute les tools MCP et retourne les résultats. Quand l'utilisateur demande une action, le système exécute réellement les tools MCP (create_issue, search_repos, etc.).

**FRs couverts:** FR26, FR27, FR28, FR29
**NFRs:** NFR19, NFR20, NFR21, NFR23

---

### Epic 7: Monitoring Santé et Métriques
Surveiller la santé du système et voir les métriques. L'utilisateur voit si GitHub MCP est connecté, reçoit des notifications en cas de déconnexion, et accède aux stats d'utilisation.

**FRs couverts:** FR30, FR31, FR32
**NFRs:** NFR17, NFR18, NFR7, NFR24, NFR25

---

### Epic 8: Qualité et Validation BMAD (S4)
Tests et documentation pour validation Go/No-Go S4. L'architecture est validée avec 70% coverage, ADRs documentés, README complet, et Canonical Format documenté.

**FRs couverts:** Support transversal
**NFRs:** NFR26, NFR27, NFR29, NFR30

---

## Epic 1: Environnement de Développement Fonctionnel

Le projet démarre et affiche l'interface de base. L'utilisateur peut lancer `npm run dev` et voir l'interface 50/50 (Chat | Observability) prête à être utilisée.

### Story 1.1: Initialisation Monorepo et Structure Projet

As a developer,
I want to have a properly configured monorepo with frontend and backend packages,
So that I can start developing with a clean, organized project structure.

**Acceptance Criteria:**

**Given** a new project directory
**When** I run the initialization commands
**Then** a pnpm workspace is created with `packages/frontend` and `packages/backend`
**And** TypeScript is configured in strict mode for both packages
**And** a root `package.json` contains scripts for `dev:frontend`, `dev:backend`, and `dev` (parallel)
**And** `.gitignore` excludes `node_modules`, `.env`, and build artifacts

### Story 1.2: Setup Frontend avec Vite, React et Tailwind

As a developer,
I want a frontend application with Vite, React, TypeScript, and Tailwind CSS,
So that I have a fast development environment with modern styling capabilities.

**Acceptance Criteria:**

**Given** the monorepo structure from Story 1.1
**When** I run `pnpm dev:frontend`
**Then** Vite dev server starts on port 5173 in <30 seconds (NFR8)
**And** React 18.x is configured with TypeScript strict mode
**And** Tailwind CSS 4.x is configured with custom design tokens (colors, fonts)
**And** shadcn/ui is initialized with Button, Card, Input, Badge components
**And** path aliases (`@/`) are configured in tsconfig and vite.config

### Story 1.3: Setup Backend avec Express et TypeScript

As a developer,
I want a backend server with Express and TypeScript,
So that I have an API server ready to handle MCP and LLM integration.

**Acceptance Criteria:**

**Given** the monorepo structure from Story 1.1
**When** I run `pnpm dev:backend`
**Then** Express server starts on port 3000 with hot reload (tsx + nodemon)
**And** TypeScript is configured for Node.js environment
**And** CORS is configured to allow requests from frontend (localhost:5173)
**And** a health endpoint `GET /api/health` returns `{ status: "ok" }`

### Story 1.4: Layout Principal 50/50 (Chat | Observability)

As a developer,
I want to see the basic UI layout with Chat and Observability panels,
So that the foundation for the main interface is ready.

**Acceptance Criteria:**

**Given** the frontend is running
**When** I navigate to localhost:5173
**Then** I see a header bar with placeholder status indicators
**And** the main content is split 50/50 horizontally (Chat left | Observability right)
**And** the layout uses CSS Grid and fills the viewport height
**And** dark mode is applied by default (Slate 900 background)
**And** Typography uses Inter (UI) and Fira Code (future code/logs)

### Story 1.5: Configuration Environment et Messages d'Erreur

As a developer,
I want environment configuration with clear error messages if something is missing,
So that I can quickly identify and fix configuration issues (FR22, FR25).

**Acceptance Criteria:**

**Given** the backend server
**When** `OPENAI_API_KEY` is missing from `.env`
**Then** the server logs a clear error message: "Missing required environment variable: OPENAI_API_KEY"
**And** the server still starts but indicates config incomplete

**Given** a `.env.example` file exists
**When** I copy it to `.env` and fill in values
**Then** the server loads the configuration successfully
**And** API keys are never logged (NFR10 partial)

### Story 1.6: README et Documentation Setup

As a developer,
I want a complete README with setup instructions,
So that I can get the project running in <5 minutes (NFR29).

**Acceptance Criteria:**

**Given** a new clone of the repository
**When** I follow the README instructions
**Then** I can complete setup in <5 minutes
**And** the README includes: Prerequisites, Installation, Configuration, Running, Project Structure
**And** `.env.example` is documented with all required variables

---

## Epic 2: Connexion et Gestion MCP

Connecter un MCP distant via l'interface et voir les tools disponibles. L'utilisateur peut connecter GitHub MCP en 2 clics, voir les tools disponibles, et sa configuration persiste entre sessions.

### Story 2.1: Formulaire de Configuration MCP

As a developer,
I want a form to configure MCP connection settings,
So that I can connect to a remote MCP server without editing config files (FR1).

**Acceptance Criteria:**

**Given** the main UI is displayed
**When** I click "+ Add MCP" button
**Then** a modal/panel appears with a configuration form
**And** the form includes fields: MCP Type (dropdown: GitHub, Custom), URL, Credentials (optional token)
**And** the form has real-time validation (URL format, required fields)
**And** a "Connect" button is disabled until form is valid
**And** a "View Raw JSON" toggle shows the raw configuration (advanced mode)

### Story 2.2: Connexion MCP et Validation Statut

As a developer,
I want to connect to a remote MCP server and see the connection status,
So that I know if the MCP is properly connected (FR2).

**Acceptance Criteria:**

**Given** a valid MCP configuration in the form
**When** I click "Connect"
**Then** a loading state shows "Connecting to MCP..."
**And** the connection completes in <5 seconds (NFR2)
**And** on success: status shows "✅ Connected" with green indicator
**And** on failure: status shows "❌ Connection Failed" with clear error message (NFR14)
**And** the header bar updates to show MCP connection status

### Story 2.3: Affichage des Tools MCP Disponibles

As a developer,
I want to see the list of available tools from the connected MCP,
So that I know what capabilities are available (FR3).

**Acceptance Criteria:**

**Given** a successfully connected MCP
**When** the connection is established
**Then** the system fetches and displays the list of available tools
**And** each tool shows: name, description (truncated)
**And** the total count is displayed (e.g., "12 tools available")
**And** tools are displayed in a scrollable list or grid

### Story 2.4: Déconnexion MCP

As a developer,
I want to disconnect from the current MCP server,
So that I can connect to a different MCP or reset the connection (FR4).

**Acceptance Criteria:**

**Given** an active MCP connection
**When** I click "Disconnect" button
**Then** the MCP connection is terminated
**And** the status updates to "Disconnected"
**And** the tools list is cleared
**And** the header bar reflects the disconnected state
**And** no error is thrown during disconnection

### Story 2.5: Persistence Configuration MCP (localStorage)

As a developer,
I want my MCP configuration to persist between sessions,
So that I don't have to reconfigure every time I restart the app (FR5).

**Acceptance Criteria:**

**Given** a successful MCP connection
**When** I close and reopen the application
**Then** the previous MCP configuration is loaded from localStorage
**And** the app attempts to reconnect automatically (or shows "Reconnect" button)
**And** credentials are stored in localStorage (plain text acceptable for MVP)

**Given** I want to clear saved configuration
**When** I click "Clear Saved Config"
**Then** localStorage is cleared and app shows fresh state

---

## Epic 3: Observabilité Pipeline en Temps Réel

Voir chaque étape du pipeline dans l'UI. L'utilisateur voit le pipeline s'animer en temps réel: UI → Adapter → LLM → MCP → Response, avec filtrage et détails des payloads.

### Story 3.1: Infrastructure Socket.io pour Communication Temps Réel

As a developer,
I want a real-time communication channel between backend and frontend,
So that logs and events can stream to the UI instantly.

**Acceptance Criteria:**

**Given** the backend and frontend are running
**When** the frontend connects to the backend
**Then** a Socket.io connection is established
**And** the connection uses namespaces: `/observability` for logs
**And** reconnection is automatic if connection drops
**And** connection status is visible in the UI (connected/disconnected indicator)

### Story 3.2: Configuration Logger Pino avec Streaming

As a developer,
I want structured logging with Pino that streams to the frontend,
So that all pipeline events are captured and displayed in real-time (FR16).

**Acceptance Criteria:**

**Given** any backend operation (API call, transformation, MCP interaction)
**When** the operation executes
**Then** logs are created with Pino in structured JSON format
**And** logs include: timestamp, level, component (ui/adapter/llm/mcp), message, context
**And** logs are streamed to frontend via Socket.io in <500ms (NFR3)
**And** API keys are automatically redacted from log output (NFR10)
**And** child loggers are used for each pipeline component

### Story 3.3: Composant ObservabilityPanel avec Timeline

As a developer,
I want an observability panel showing pipeline logs in real-time,
So that I can watch the pipeline flow as it happens (FR17).

**Acceptance Criteria:**

**Given** the main UI is displayed
**When** logs arrive via Socket.io
**Then** they appear in the ObservabilityPanel (right 50% of screen)
**And** logs are displayed in chronological order (newest at bottom)
**And** each log entry shows: timestamp, component badge (color-coded), message preview
**And** the panel auto-scrolls to show new logs
**And** smooth scrolling animation is applied

### Story 3.4: Affichage Détaillé des Logs avec Expand/Collapse

As a developer,
I want to expand log entries to see full details,
So that I can inspect payloads and debug issues (FR20).

**Acceptance Criteria:**

**Given** a log entry in the ObservabilityPanel
**When** I click on the log entry
**Then** it expands to show full details
**And** expanded view shows: full message, context object, stack trace (if error)
**And** JSON payloads are syntax-highlighted and formatted
**And** I can collapse the entry by clicking again
**And** "Copy as JSON" and "Copy as Markdown" buttons are available

### Story 3.5: Tracing Pipeline avec Timestamps

As a developer,
I want to see the complete pipeline trace with timestamps,
So that I can understand the flow and timing of each step (FR18).

**Acceptance Criteria:**

**Given** a request flows through the pipeline
**When** I view the logs
**Then** I can see the sequence: UI → Adapter → LLM → MCP → Response
**And** each step shows duration (e.g., "Adapter: 45ms")
**And** pipeline steps are visually connected (timeline/waterfall style)
**And** total request duration is calculated and displayed

### Story 3.6: Identification et Affichage des Erreurs

As a developer,
I want errors to be clearly highlighted with full context,
So that I can quickly identify and debug transformation issues (FR19, NFR15).

**Acceptance Criteria:**

**Given** an error occurs in the pipeline
**When** the error log appears
**Then** it is visually highlighted (red background/border)
**And** error details include: error code, message, context, suggestion
**And** the pipeline step where error occurred is clearly indicated
**And** error count badge appears in header bar

### Story 3.7: Filtrage des Logs par Niveau

As a developer,
I want to filter logs by level (info/error/debug),
So that I can focus on specific types of events (FR21).

**Acceptance Criteria:**

**Given** the ObservabilityPanel with multiple logs
**When** I select a filter (All / Info / Error / Debug)
**Then** only logs matching the selected level are displayed
**And** filter selection is visually indicated (active button state)
**And** filtered count is shown (e.g., "Showing 5 of 23 logs")
**And** "Clear Logs" button clears all logs from the panel

---

## Epic 4: Adapter LLM et Transformation

Le système transforme les tools MCP vers le format GPT-4o. L'architecture Strategy Pattern permet au système de parler le langage de GPT-4o avec les tools MCP via le Canonical Format.

### Story 4.1: Définition du Canonical Format (Interfaces TypeScript)

As a developer,
I want well-defined TypeScript interfaces for the Canonical Format,
So that all transformations have a consistent intermediate representation.

**Acceptance Criteria:**

**Given** the need for a universal tool format
**When** I create the Canonical Format types
**Then** `CanonicalTool` interface is defined with: id, name, description, parameters
**And** `CanonicalParameters` interface supports: type, properties, required fields
**And** `CanonicalParameter` supports: string, number, boolean, array, object types
**And** `CanonicalResponse` interface is defined with: toolCallId, toolName, result, error
**And** interfaces are documented with JSDoc comments and examples (NFR30)

### Story 4.2: Transformer MCP Tools vers Canonical Format

As a developer,
I want to transform MCP tool definitions to Canonical Format,
So that any MCP can be used with any LLM adapter (FR6).

**Acceptance Criteria:**

**Given** MCP tools from a connected MCP server
**When** `MCPToCanonicalTransformer.transform()` is called
**Then** MCP tools are converted to `CanonicalTool[]`
**And** JSON Schema properties are mapped correctly
**And** nested objects and arrays are handled
**And** transformation completes in <500ms for 50 tools
**And** unit tests cover edge cases (missing fields, invalid schemas)

### Story 4.3: Transformer Canonical vers GPT-4o Function Format

As a developer,
I want to transform Canonical Format to OpenAI function calling format,
So that GPT-4o can use MCP tools (FR7).

**Acceptance Criteria:**

**Given** tools in Canonical Format
**When** `CanonicalToGPT4oTransformer.transform()` is called
**Then** tools are converted to OpenAI `Function[]` format
**And** parameter types are mapped to JSON Schema
**And** required fields are preserved
**And** output is compatible with OpenAI API v1 (NFR22)
**And** unit tests verify correct mapping

### Story 4.4: Interface Strategy Pattern (LLMStrategy)

As a developer,
I want a Strategy Pattern interface for LLM adapters,
So that new LLM providers can be added in <1 day (NFR28).

**Acceptance Criteria:**

**Given** the need for extensible LLM support
**When** I define `LLMStrategy` interface
**Then** it includes: `name`, `transformTools()`, `transformResponse()`, `executeChat()`
**And** the interface is well-documented with usage examples
**And** a developer can implement a new strategy by following the interface
**And** the interface is stable and won't require changes for new providers

### Story 4.5: Implémentation GPT4oStrategy

As a developer,
I want a concrete GPT-4o strategy implementation,
So that the system can communicate with OpenAI's API (FR9).

**Acceptance Criteria:**

**Given** the `LLMStrategy` interface
**When** `GPT4oStrategy` is implemented
**Then** it uses OpenAI SDK with function calling
**And** `transformTools()` converts Canonical to OpenAI format
**And** `transformResponse()` converts OpenAI response to Canonical
**And** `executeChat()` sends messages with tools and returns response
**And** rate limits are handled with exponential backoff (NFR23)
**And** integration tests verify API communication

### Story 4.6: Factory Pattern pour Création Adapter

As a developer,
I want a factory to create LLM adapters,
So that adapter selection is centralized and consistent.

**Acceptance Criteria:**

**Given** the need to select an LLM adapter
**When** `LLMAdapterFactory.create('gpt4o', apiKey)` is called
**Then** a `GPT4oStrategy` instance is returned
**And** calling with 'claude' throws "Not implemented - Phase 2"
**And** calling with unknown type throws descriptive error
**And** factory is used consistently throughout the codebase

### Story 4.7: Gestion des Erreurs de Transformation

As a developer,
I want clear error handling for transformation failures,
So that I can debug issues quickly (FR8).

**Acceptance Criteria:**

**Given** an error during transformation
**When** the transformer fails
**Then** a `TransformationError` is thrown with: step, inputPayload, message, suggestion
**And** error includes which transformation step failed (mcp-to-canonical, canonical-to-llm)
**And** original payload is preserved for debugging
**And** error is logged to observability with full context
**And** UI displays user-friendly error message

### Story 4.8: Affichage LLM Strategy Active

As a developer,
I want to see which LLM strategy is currently active,
So that I know which provider is being used (FR24).

**Acceptance Criteria:**

**Given** the application is running
**When** I look at the header bar
**Then** I see the active LLM indicator (e.g., "LLM: GPT-4o ✅")
**And** the indicator updates if strategy changes
**And** clicking the indicator shows strategy details (name, model version)

---

## Epic 5: Interface Chat et Conversation

Interagir avec le LLM via une interface chat naturelle. L'utilisateur tape des commandes, voit l'historique, et reçoit des réponses formatées avec indicateurs de chargement.

### Story 5.1: Composant ChatInterface avec Zustand Store

As a developer,
I want a chat interface component with state management,
So that I have a foundation for sending and receiving messages.

**Acceptance Criteria:**

**Given** the main UI layout
**When** the ChatInterface component renders
**Then** it displays in the left 50% of the screen
**And** a Zustand `chatStore` manages: messages[], isLoading, error
**And** the store provides actions: sendMessage(), clearHistory()
**And** UI responds to interactions in <100ms (NFR1)

### Story 5.2: Envoi de Messages Texte

As a developer,
I want to send text commands through the chat interface,
So that I can interact with the LLM (FR11).

**Acceptance Criteria:**

**Given** the chat interface is displayed
**When** I type a message and press Enter (or click Send)
**Then** the message appears in the chat history
**And** the message is sent to the backend via API
**And** the input field is cleared after sending
**And** the Send button is disabled while processing
**And** I can send messages with Ctrl+Enter as alternative

### Story 5.3: Affichage des Réponses LLM Formatées

As a developer,
I want to see LLM responses formatted nicely in the chat,
So that I can easily read and understand the output (FR14).

**Acceptance Criteria:**

**Given** a response from the LLM
**When** it arrives in the chat
**Then** it is displayed with proper formatting (markdown support)
**And** code blocks are syntax-highlighted
**And** lists and tables are rendered correctly
**And** user messages and LLM responses are visually distinct (different backgrounds)
**And** timestamps are shown for each message

### Story 5.4: Indicateurs de Chargement

As a developer,
I want loading indicators while waiting for LLM responses,
So that I know the system is processing my request (FR15).

**Acceptance Criteria:**

**Given** a message has been sent
**When** waiting for LLM response
**Then** a loading indicator appears (typing dots or spinner)
**And** if response takes >2s, a progress bar appears (NFR4)
**And** the loading state is reflected in the Zustand store
**And** I can see "Processing..." status in the chat

### Story 5.5: Contexte Conversationnel Multi-Tour

As a developer,
I want the conversation context to be maintained across messages,
So that I can have natural multi-turn conversations (FR12).

**Acceptance Criteria:**

**Given** I have sent multiple messages
**When** I send a follow-up message
**Then** the LLM receives the full conversation history
**And** the LLM can reference previous messages in its response
**And** context is maintained for at least 10 consecutive messages (NFR5)
**And** conversation history is stored in-memory only (NFR12)

### Story 5.6: Historique de Conversation et Navigation

As a developer,
I want to see and scroll through conversation history,
So that I can review previous exchanges (FR13).

**Acceptance Criteria:**

**Given** a conversation with multiple messages
**When** I view the chat interface
**Then** all messages from the current session are displayed
**And** I can scroll up to see older messages
**And** new messages auto-scroll to bottom
**And** "Jump to bottom" button appears when scrolled up
**And** clearing history removes all messages and resets context

---

## Epic 6: Exécution Tools MCP

Le LLM exécute les tools MCP et retourne les résultats. Quand l'utilisateur demande une action, le système exécute réellement les tools MCP (create_issue, search_repos, etc.).

### Story 6.1: Client MCP avec Transport Stdio

As a developer,
I want an MCP client that communicates via stdio transport,
So that the system can connect to remote MCP servers (NFR19, NFR20).

**Acceptance Criteria:**

**Given** MCP configuration with server URL
**When** the MCP client initializes
**Then** it establishes connection via stdio transport
**And** it follows Anthropic MCP protocol specification
**And** connection timeout is <5 seconds
**And** client handles protocol handshake correctly
**And** connection errors are wrapped in `MCPError` class

### Story 6.2: Exécution des Tools MCP

As a developer,
I want the system to execute MCP tools requested by the LLM,
So that chat commands result in real actions (FR26).

**Acceptance Criteria:**

**Given** the LLM requests a tool call (e.g., `search_repositories`)
**When** the tool execution is triggered
**Then** the MCP client sends the tool call to the MCP server
**And** tool parameters are validated before execution
**And** execution is logged to observability with full payload
**And** execution timeout is configurable (default 30s)

### Story 6.3: Gestion des Réponses MCP

As a developer,
I want MCP responses to be properly handled and returned to the LLM,
So that the conversation can continue with tool results (FR27).

**Acceptance Criteria:**

**Given** a tool execution completes
**When** MCP server returns a response
**Then** the response is transformed to Canonical format
**And** the result is sent back to the LLM for continuation
**And** the LLM can use the result in its next response
**And** successful responses are logged with result summary

### Story 6.4: Retry Logic pour Échecs MCP

As a developer,
I want automatic retry for transient MCP failures,
So that temporary issues don't break the workflow (FR28).

**Acceptance Criteria:**

**Given** a tool execution fails with a transient error
**When** the error is retryable (timeout, network issue)
**Then** the system retries up to 3 times
**And** exponential backoff is applied (1s, 2s, 4s)
**And** each retry is logged to observability
**And** after max retries, error is returned to LLM (NFR21)
**And** non-retryable errors fail immediately

### Story 6.5: Affichage Tools MCP dans Observability

As a developer,
I want to see MCP tool calls in the observability panel,
So that I can track what tools are being executed (FR29).

**Acceptance Criteria:**

**Given** a tool is executed
**When** I view the observability panel
**Then** I see the tool call with: tool name, parameters, status
**And** tool calls are tagged with "MCP" component badge
**And** execution duration is displayed
**And** I can expand to see full request/response payload
**And** failed tool calls are highlighted in red

### Story 6.6: Gestion des Erreurs MCP vers LLM

As a developer,
I want MCP errors to be returned to the LLM with context,
So that the LLM can handle failures gracefully (NFR21).

**Acceptance Criteria:**

**Given** a tool execution fails permanently
**When** the error cannot be recovered
**Then** error details are formatted for LLM consumption
**And** error includes: error code, message, failed tool name
**And** LLM receives the error as a tool response
**And** LLM can explain the error to the user
**And** user sees both LLM explanation and raw error in UI

---

## Epic 7: Monitoring Santé et Métriques

Surveiller la santé du système et voir les métriques. L'utilisateur voit si GitHub MCP est connecté, reçoit des notifications en cas de déconnexion, et accède aux stats d'utilisation.

### Story 7.1: Affichage Statut Santé MCP

As a developer,
I want to see the health status of the MCP connection,
So that I know if the system is fully operational (FR30).

**Acceptance Criteria:**

**Given** the application is running
**When** I view the header bar
**Then** I see the MCP health indicator (🟢 Connected / 🟡 Connecting / 🔴 Disconnected)
**And** hovering shows last successful ping timestamp
**And** clicking opens a detailed health panel
**And** health check runs every 30 seconds in background

### Story 7.2: Détection et Notification Déconnexions MCP

As a developer,
I want to be notified when MCP connection drops,
So that I can take action to restore connectivity (FR31).

**Acceptance Criteria:**

**Given** an active MCP connection
**When** the connection is lost (timeout, server down)
**Then** a notification toast appears with warning
**And** the header indicator changes to 🔴 Disconnected
**And** a "Reconnect" button is displayed
**And** the system attempts automatic reconnection (3 attempts)
**And** disconnection is logged to observability

### Story 7.3: Métriques Basiques (Temps Réponse, Compteurs)

As a developer,
I want to see basic usage metrics,
So that I can understand system performance (FR32).

**Acceptance Criteria:**

**Given** I have used the chat interface
**When** I view the metrics panel (in header or footer)
**Then** I see: total requests count, average response time
**And** metrics are displayed in compact format (e.g., "42 req | avg 1.2s")
**And** metrics reset on page refresh (in-memory)
**And** clicking shows detailed breakdown per component

### Story 7.4: Graceful Degradation sans MCP

As a developer,
I want the application to remain functional when MCP is disconnected,
So that partial failures don't crash the entire app (NFR18).

**Acceptance Criteria:**

**Given** the MCP connection is lost
**When** I continue using the application
**Then** the UI remains responsive
**And** chat shows "MCP unavailable" message instead of crashing
**And** observability panel continues to work
**And** I can attempt reconnection at any time
**And** no unhandled exceptions occur

### Story 7.5: Redémarrage Propre sans State Corrompu

As a developer,
I want the application to restart cleanly after a crash,
So that I don't encounter corrupted state (NFR17).

**Acceptance Criteria:**

**Given** the application crashed or was force-closed
**When** I restart the application
**Then** it starts normally without errors
**And** localStorage config is still valid
**And** no corrupted state prevents startup
**And** previous session data (chat history) is cleared on restart

### Story 7.6: Compatibilité Navigateurs (Chrome/Edge/Firefox)

As a developer,
I want the application to work on major browsers,
So that I can use my preferred development browser (NFR24, NFR25).

**Acceptance Criteria:**

**Given** the application is running
**When** I access it from Chrome (latest 2 versions)
**Then** all features work correctly

**Given** the application is running
**When** I access it from Edge (latest 2 versions)
**Then** all features work correctly

**Given** the application is running
**When** I access it from Firefox (latest version)
**Then** core features work (best effort, minor issues acceptable)

---

## Epic 8: Qualité et Validation BMAD (S4)

Tests et documentation pour validation Go/No-Go S4. L'architecture est validée avec 70% coverage, ADRs documentés, README complet, et Canonical Format documenté.

### Story 8.1: Tests Unitaires Transformers

As a developer,
I want comprehensive unit tests for all transformers,
So that transformation logic is verified and regression-free.

**Acceptance Criteria:**

**Given** the transformation layer
**When** I run `pnpm test`
**Then** MCPToCanonicalTransformer has tests for: valid input, missing fields, invalid schema
**And** CanonicalToGPT4oTransformer has tests for: correct mapping, edge cases
**And** GPT4oToCanonicalTransformer has tests for: response parsing, error handling
**And** all transformer tests pass
**And** transformers achieve >80% code coverage

### Story 8.2: Tests Intégration Strategy Pattern

As a developer,
I want integration tests for the LLM strategy pattern,
So that the adapter architecture is validated.

**Acceptance Criteria:**

**Given** the GPT4oStrategy implementation
**When** I run integration tests
**Then** tests verify: tool transformation end-to-end, response handling, error scenarios
**And** tests use mocked OpenAI API (no real API calls in CI)
**And** factory pattern tests verify correct adapter creation
**And** tests document extensibility (adding new strategy)

### Story 8.3: Tests Composants React

As a developer,
I want component tests for all React components,
So that UI behavior is verified.

**Acceptance Criteria:**

**Given** the React components
**When** I run component tests
**Then** ChatInterface tests: send message, display response, loading state
**And** ObservabilityPanel tests: render logs, filter, expand/collapse
**And** MCPConfigForm tests: validation, submit, error display
**And** tests use React Testing Library best practices
**And** components achieve >70% code coverage

### Story 8.4: Couverture de Code 70% Globale

As a developer,
I want overall test coverage to reach 70%,
So that the codebase meets BMAD validation criteria (NFR26).

**Acceptance Criteria:**

**Given** all tests are written
**When** I run `pnpm test:coverage`
**Then** global coverage is ≥70%
**And** coverage report is generated in HTML format
**And** critical paths (transformers, strategies, API routes) have >80% coverage
**And** coverage badge can be added to README

### Story 8.5: Documentation ADRs

As a developer,
I want ADRs documented for all major architectural decisions,
So that decisions are traceable and justified (NFR27).

**Acceptance Criteria:**

**Given** the architectural decisions made
**When** I review the docs/adr folder
**Then** ADR-001: Canonical Format design is documented
**And** ADR-002: Strategy Pattern for LLM adapters is documented
**And** ADR-003: Real-time communication (Socket.io vs SSE) is documented
**And** ADR-004: State management (Zustand) is documented
**And** each ADR follows template: Context, Decision, Consequences

### Story 8.6: Documentation Canonical Format

As a developer,
I want the Canonical Format schema fully documented with examples,
So that future developers can understand and extend it (NFR30).

**Acceptance Criteria:**

**Given** the Canonical Format specification
**When** I read docs/canonical-format.md
**Then** all interfaces are documented with descriptions
**And** JSON schema is provided
**And** examples show: MCP tool → Canonical → GPT-4o function
**And** transformation rules are clearly explained
**And** error scenarios are documented

