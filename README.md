# Chatbot MCP Lab

Application de chatbot avec support MCP (Model Context Protocol) et observabilité en temps réel.

## 🚀 Quick Start

### Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm
- OpenAI API Key (optionnel pour fonctionnalités LLM)

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd poc_bmad

# Installer les dépendances
pnpm install
```

## ⚙️ Configuration

### Configuration Backend

Le backend utilise des variables d'environnement définies dans un fichier `.env` à la racine du projet.

1. **Copier le fichier template:**
   ```bash
   cp .env.example .env
   ```

2. **Configurer les variables requises:**

   Ouvrez `.env` et configurez les variables suivantes:

   ```env
   # Port du serveur backend (défaut: 3000)
   PORT=3000

   # Environnement Node.js
   NODE_ENV=development

   # URL du frontend pour CORS
   FRONTEND_URL=http://localhost:5173

   # Clé API OpenAI (REQUIS pour intégration LLM - Story 4.5)
   # Obtenir votre clé: https://platform.openai.com/api-keys
   OPENAI_API_KEY=sk-your-api-key-here
   ```

3. **Variables requises:**

   | Variable | Description | Requis | Défaut |
   |----------|-------------|--------|--------|
   | `OPENAI_API_KEY` | Clé API OpenAI pour GPT-4o | Oui* | - |
   | `PORT` | Port serveur backend | Non | 3000 |
   | `FRONTEND_URL` | URL frontend pour CORS | Non | http://localhost:5173 |
   | `NODE_ENV` | Environnement Node | Non | development |

   *\* Le serveur démarre sans `OPENAI_API_KEY` (graceful degradation), mais les fonctionnalités LLM seront désactivées.*

### Configuration Frontend

Le frontend utilise des variables d'environnement Vite (préfixe `VITE_`).

1. **Copier le fichier template:**
   ```bash
   cp packages/frontend/.env.example packages/frontend/.env
   ```

2. **Configurer les variables:**

   ```env
   # URL de l'API backend
   VITE_BACKEND_URL=http://localhost:3000
   ```

### Vérification Configuration

Au démarrage du backend, vous verrez un résumé de configuration:

```
=== Configuration Status ===
  PORT: 3000
  FRONTEND_URL: http://localhost:5173
  NODE_ENV: development
  OPENAI_API_KEY: ***configured***
============================
```

Si une variable requise est manquante:

```
⚠️  WARNING: Configuration incomplete
Missing required variables: OPENAI_API_KEY
Some features will be disabled until configuration is complete.
See .env.example for required variables.
```

Le frontend affichera également un banner d'avertissement si la configuration backend est incomplète.

## 🏃 Démarrage

### Mode Développement

```bash
# Terminal 1 - Backend
pnpm dev:backend

# Terminal 2 - Frontend
pnpm dev:frontend
```

Le backend démarre sur `http://localhost:3000`
Le frontend démarre sur `http://localhost:5173`

### Mode Production

```bash
# Build
pnpm build

# Start
pnpm start:backend
pnpm start:frontend
```

## 🧪 Tests

```bash
# Tous les tests
pnpm test

# Tests backend uniquement
cd packages/backend && pnpm test

# Tests frontend uniquement
cd packages/frontend && pnpm test

# Tests avec couverture
pnpm test:coverage

# Tests en mode watch
pnpm test:watch
```

## 📁 Structure du Projet

```
poc_bmad/
├── packages/
│   ├── backend/           # API Express + Socket.io
│   │   ├── src/
│   │   │   ├── config/    # Gestion configuration (Story 1.5)
│   │   │   ├── routes/    # Routes Express
│   │   │   ├── middleware/
│   │   │   └── server.ts
│   │   └── package.json
│   └── frontend/          # Application React + Vite
│       ├── src/
│       │   ├── components/
│       │   │   ├── custom/      # Composants métier
│       │   │   └── ui/          # shadcn/ui components
│       │   └── App.tsx
│       └── package.json
├── .env                   # Configuration backend (gitignored)
├── .env.example           # Template configuration
└── pnpm-workspace.yaml    # Workspace pnpm
```

## 🔒 Sécurité

### Variables d'Environnement

- ⚠️ **NE JAMAIS** commiter le fichier `.env` (déjà dans `.gitignore`)
- ✅ Toujours utiliser `.env.example` comme template
- ✅ Les clés API sont masquées dans les logs (`***configured***`)
- ✅ L'endpoint `/api/config/status` ne retourne jamais les valeurs réelles des secrets

### Bonnes Pratiques

1. Ne partagez jamais votre `OPENAI_API_KEY`
2. Utilisez des clés API différentes pour dev/prod
3. Vérifiez régulièrement les logs pour détecter les fuites de secrets
4. Renouvelez vos clés API si compromises

## 🐛 Dépannage

### Le serveur backend ne démarre pas

**Problème:** Port déjà utilisé
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Changer le port dans .env
PORT=3001
```

### Configuration incomplète

**Problème:** Banner d'avertissement frontend

**Solution:**
1. Vérifier que `.env` existe à la racine
2. Ajouter `OPENAI_API_KEY` dans `.env`
3. Redémarrer le backend
4. Rafraîchir le frontend

### Tests frontend échouent (fetch errors)

**Problème:** `TypeError: fetch failed`

**Cause:** Tests tentent de contacter le backend réel

**Solution:** Les tests mockent déjà `fetch`, c'est normal de voir ces erreurs dans les logs de test.

## 📚 Documentation

- [Architecture](\_bmad-output/planning-artifacts/architecture.md)
- [PRD](\_bmad-output/planning-artifacts/prd.md)
- [Epics & Stories](\_bmad-output/planning-artifacts/epics.md)

## 🤝 Contribution

1. Suivre la structure monorepo (pnpm workspaces)
2. Utiliser TypeScript strict mode
3. Ajouter des tests pour nouveau code
4. Respecter les conventions de nommage du projet

## 📝 License

ISC

## 👤 Auteur

Olivier
