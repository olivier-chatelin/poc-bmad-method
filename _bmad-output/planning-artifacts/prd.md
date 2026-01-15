---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-poc_bmad-2026-01-12.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-12.md'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
workflowType: 'prd'
classification:
  projectType: 'Developer Tool + Web App'
  domain: 'General'
  complexity: 'Medium'
  projectContext: 'Greenfield'
---

# Product Requirements Document - poc_bmad

**Author:** Olivier
**Date:** 2026-01-12

## Success Criteria

### User Success

**Le Moment "Aha!":**
L'instant où tu branches un MCP (GitHub) en 2 clics via l'UI, tu testes avec GPT-4o, et tu vois la trace complète du pipeline dans l'observability UI - sans avoir touché au code. Total: 5 minutes max.

**Succès Utilisateur Défini Par:**
- **Vitesse d'Expérimentation:** Tester un nouveau MCP en < 5 minutes (baseline actuelle: 30-60min avec Claude Code)
- **Fréquence POCs:** Réaliser 10 POCs MCP/jour vs 1 POC/semaine actuellement (70x improvement)
- **Adoption Quotidienne:** Lab utilisé minimum 3× par semaine dès Semaine 3
- **Discovery Insights:** 1+ insight MCP inattendu par semaine (patterns, combos, comportements LLM)
- **Confiance Architecture:** Fin S4, tu sais que l'architecture peut scale vers multi-LLM

**État Émotionnel de Succès:**
- **Fierté:** Architecture propre, pas de spaghetti - BMAD a fonctionné
- **Soulagement:** Pas tombé dans le piège du code jetable inmaintenable
- **Excitation:** Tool réellement utile quotidiennement, pas juste POC théorique

### Business Success

**Objectif Meta - Validation BMAD:**
Prouver que la méthode BMAD empêche le code spaghetti sur un projet techniquement complexe.

**Critères Go/No-Go Semaine 4:**

✅ **GO si:**
- Strategy Pattern Adapter propre et maintenable
- GitHub MCP fonctionne de manière fiable avec GPT-4o
- Observability UI permet debug/learning efficace
- Lab utilisé 3× minimum durant S3
- 1+ POC MCP réalisé en < 10min
- Confiance que l'architecture peut scale
- BMAD a empêché spaghetti

❌ **NO-GO si:**
- Code spaghetti détecté après S2
- Adapter pattern trop complexe à maintenir
- GitHub MCP non fiable
- Aucune utilisation réelle en S3
- Paralysie par over-planning

**Objectifs 3 Mois:**
- Lab utilisé 5+ jours/semaine (outil quotidien indispensable)
- 10+ MCP testés et catalogués
- 3+ combos workflow validés (ex: GitHub+Playwright)
- Architecture réutilisée pour projet professionnel
- Patterns MCP documentés
- Reconnaissance comme expert MCP (thought leadership interne)

**ROI Double:**
1. **R&D Projet Pro:** Architecture validée et réutilisable pour bot professionnel avec MCP
2. **Validation Méthode:** BMAD prouvée sur projet complexe, patterns réutilisables

### Technical Success

**Architecture (Non-Négociable):**
- Strategy Pattern pour Adapter LLM (propre, extensible, testable)
- Canonical Format Intermédiaire pour mapping MCP→LLM
- Zéro code spaghetti après S2 (revue architecture)
- ADRs documentés et suivis pour toutes décisions majeures
- Tests coverage > 70% (pas code vite fait non testé)

**Observability (First-Class Citizen):**
- Logging complet: UI → Adapter → LLM → MCP
- Tracing requêtes avec timestamps
- UI debug affichant pipeline en temps réel
- Capacité identifier bottlenecks et erreurs transformation

**Performance & Fiabilité:**
- Temps réponse acceptable pour POCs (pas de latence excessive)
- Gestion erreurs robuste (transformation, API calls, MCP failures)
- GitHub MCP stable et fiable

**Maintenabilité:**
- Code review S4 confirme architecture solide
- Nouvelle Strategy LLM ajoutée facilement (si Go multi-LLM)
- Pas de dette technique bloquante

### Measurable Outcomes

**Semaine 4 (MVP Validation):**
- ✅ 1 MCP GitHub fonctionnel avec GPT-4o
- ✅ 1+ POC réalisé en < 10 minutes
- ✅ Lab utilisé 3+ fois en S3
- ✅ 1+ insight MCP inattendu découvert
- ✅ Architecture code review: PASS (pas spaghetti)
- ✅ ADRs: 3+ décisions documentées
- ✅ Tests coverage: > 70%

**3 Mois (Production Maturity):**
- 📈 Lab utilisé 5+ jours/semaine
- 📈 10+ MCP testés et catalogués
- 📈 3+ combos workflow validés
- 📈 5+ patterns MCP documentés
- 📈 Architecture réutilisée projet pro
- 📈 10h+/semaine gagnées en productivité

## Product Scope

### MVP - Minimum Viable Product

**Phase 1 - MVP Ruthless (Semaines 1-4):**

**1. Adapter Multi-LLM (GPT-4o SEULEMENT pour MVP)**
- Strategy Pattern adapter implémenté
- Support GPT-4o uniquement (pas Claude en MVP)
- API key management simple (env file)
- **Rationale:** Valider architecture sans complexité multi-LLM

**2. Intégration MCP Unique (GitHub SEULEMENT)**
- Connexion 1 MCP distant: GitHub
- Configuration via UI basique (pas fichier config)
- Test workflow complet: UI → Adapter → GPT-4o → GitHub MCP
- **Rationale:** Prouver concept end-to-end avec MCP le plus simple

**3. Canonical Format Transformation**
- Format intermédiaire unifié défini
- Mapper: MCP Tools → Canonical → GPT-4o Functions
- Gestion erreurs transformation basique
- **Rationale:** Foundation pour multi-LLM futur

**4. Observability-First**
- Logging complet pipeline (UI → Adapter → LLM → MCP)
- Tracing requêtes avec timestamps
- UI debug affichant logs/traces temps réel
- **Rationale:** Essentiel apprentissage MCP et debug

**5. UI Web Minimale**
- Interface brancher/débrancher GitHub MCP (clics)
- Sélection LLM (GPT-4o pour MVP)
- Chat interface basique
- Vue logs/observability
- **Rationale:** Juste assez UI pour valider "configuration par clics"

**Hors Scope MVP:**
❌ Multi-LLM (Claude, Gemini) - Décision après S4
❌ Multiple MCP - 1 seul (GitHub) pour valider pattern
❌ Orchestration combos MCP - Phase 3
❌ Persistence conversations - Sessions in-memory
❌ Advanced UI features - Juste fonctionnel
❌ MCP locaux - Distants seulement
❌ Tests automatisés complets - Tests manuels + quelques unitaires

### Growth Features (Post-MVP)

**Phase 2 - Multi-LLM (Si GO après S4, Semaines 5-8):**
- Ajouter Claude (valider Strategy Pattern scale)
- Switching LLM dynamique via UI
- Comparaison GPT-4o vs Claude comportements
- Optimisation coûts tokens (Claude limité, GPT-4o illimité)

**Décision S4:** Si architecture solide et lab utilisé régulièrement → GO Phase 2

### Vision (Future)

**Phase 3 - Orchestration MCP (Semaines 9-12+):**
- Support 3+ MCP additionnels (Notion, Teams, Playwright, Figma)
- 3 combos workflow "magiques" validés
- Workflows pré-configurés réutilisables
- Catalogue MCP testés avec métadonnées

**Phase 4 - Production Maturity (Mois 3+):**
- Architecture réutilisée projet professionnel
- MCP locaux supportés
- Persistence conversations (DB)
- Tests contract-based complets
- Visualization transformations MCP→LLM
- Advanced UI features (multi-keys, export, etc.)

**Vision Long-Terme (6-12 mois):**
- Plateforme open-source pour développeurs
- Bibliothèque patterns MCP documentés
- Support Gemini, Llama, autres LLMs
- Thought leadership MCP
- Communauté contributeurs

## User Journeys

### Journey 1 - Jour 1: Le Moment "Aha!" (Premier MCP Branché Sans Code)

**Personnage:** Olivier, développeur full-stack avec projet bot MCP pro dans 2-3 mois

**Opening Scene:**
C'est lundi matin. Olivier vient de finir ses spikes architecturaux (Strategy Pattern, Canonical Format). Il a 6.5h devant lui. L'objectif: brancher le premier MCP (GitHub) avec GPT-4o et voir le pipeline complet fonctionner. La peur en arrière-plan: "Est-ce que je vais tomber dans le spaghetti comme la dernière fois avec vibe coding?"

**Rising Action:**
- Olivier lance le lab local (localhost)
- Interface UI simple s'affiche: "MCP Configuration" + "Chat"
- Il clique sur "+ Add MCP" → Formulaire apparaît: URL GitHub MCP, credentials
- Il remplit les champs (pas de code, pas de fichier config à éditer)
- Clic "Connect" → Loading... → ✅ "GitHub MCP Connected"
- L'UI affiche: "Tools Available: [create_issue, search_repos, create_pr...]"
- Olivier tape dans le chat: "List my repositories"

**Climax:**
L'observability UI s'anime en temps réel:
```
[UI] → [Adapter] "List repos" request
[Adapter] → [GPT-4o] Transformed to function call
[GPT-4o] → [MCP] search_repos()
[MCP] → Response: [repo1, repo2, repo3...]
[Adapter] → [UI] Formatted response
```

Les repos s'affichent dans le chat. **Total elapsed: 3 minutes depuis le lancement.**

Le moment "Aha!": **"J'ai connecté un MCP distant, testé avec un LLM, et je VOIS tout le pipeline - sans toucher au code. Ça marche. Et l'architecture est propre."**

**Resolution:**
Olivier sent un mélange de **fierté** (l'architecture fonctionne) et **soulagement** (pas de spaghetti en vue). Il a validé le concept end-to-end. Il documente dans `ADR-001-strategy-pattern.md`: "✅ Strategy Pattern validated - adding GPT-4o successful". Il sait que la Phase 1 va fonctionner. Le lab n'est plus une hypothèse - c'est un outil réel.

**Emotional Arc:** Anxiété → Concentration → Surprise (ça marche vite) → Excitation → Fierté

**Capabilities Revealed:**
- MCP connection UI (formulaire, validation, health check)
- Adapter transformation (MCP Tools → Canonical → GPT-4o Functions)
- Chat interface basique
- Observability UI temps réel (pipeline tracing)
- Error handling gracieux (si connexion échoue)

---

### Journey 2 - Semaine 3: Usage Quotidien (POC Rapide)

**Personnage:** Olivier, maintenant utilisateur régulier du lab (S3 = validation usage)

**Opening Scene:**
Mercredi après-midi, S3. Olivier a une idée: "Et si je testais un workflow GitHub automatisé: créer une issue, puis créer une branche, puis un PR?" Il veut valider si les combos MCP sont vraiment possibles. Il ouvre le lab - c'est devenu un réflexe.

**Rising Action:**
- Lab démarre en 30 secondes (serveur local)
- GitHub MCP déjà configuré (persistence config fonctionne)
- Olivier écrit dans le chat: "Create an issue titled 'Test automated workflow' in repo poc_bmad"
- Observability UI montre: `create_issue()` → Success
- Il continue: "Now create a branch called 'feature/test-workflow' from main"
- `create_branch()` → Success
- "Create a PR from that branch with title 'Automated test PR'"
- `create_pr()` → Success

**Climax:**
3 commandes, 3 outils MCP différents, orchestration fluide. Total: **7 minutes** pour tester un workflow complet multi-étapes.

Olivier check GitHub dans son browser: Issue créée ✅, Branche créée ✅, PR ouverte ✅.

**"Putain, ça marche vraiment. Je viens de tester un workflow automatisé en 7 minutes. Avec Claude Code ça m'aurait pris 45 minutes minimum."**

**Resolution:**
Olivier ajoute une note dans `ideas-parking-lot.md`: "Workflow orchestration combos = Phase 3 priority". Il réalise que le lab n'est pas juste un POC - c'est un **accélérateur de découverte**. Il l'a utilisé 4 fois cette semaine (dépasse objectif 3×). État émotionnel: **Confiance** - le tool est utile quotidiennement.

**Emotional Arc:** Curiosité → Focus → Fluidité → Surprise (vitesse) → Satisfaction → Confiance

**Capabilities Revealed:**
- Persistance configuration MCP (pas besoin reconnecter)
- Orchestration multi-tool seamless
- Conversation contextuelle (LLM maintient contexte entre commandes)
- Performance acceptable (pas de latence frustrante)
- Logs permettent debug si quelque chose rate

---

### Journey 3 - Fin S4: Go/No-Go Decision (Architecture Validation)

**Personnage:** Olivier, à la croisée des chemins - décision multi-LLM

**Opening Scene:**
Vendredi fin S4. Olivier fait sa rétrospective BMAD. Il ouvre `prd.md` section "Success Criteria S4". Check-list:
- ✅ Strategy Pattern propre (code review confirmé)
- ✅ GitHub MCP fiable (15+ POCs sans fail)
- ✅ Observability debug OK (sauvé 3 fois lors de bugs transformation)
- ✅ Lab utilisé 5× en S3 (dépassé objectif)
- ✅ 2 POCs < 10min (record: 7min)
- ✅ ADRs: 4 documentés
- ✅ Tests coverage: 73%

Tous les critères GO sont ✅. Mais la vraie question: "Est-ce que je me sens **confiant** que l'architecture peut scale vers Claude?"

**Rising Action:**
Olivier ouvre `src/adapters/GPT4oStrategy.ts`. Il lit le code. Propre. Testable. Le Canonical Format est bien défini. Il imagine mentalement créer `ClaudeStrategy.ts` - ça serait un copier-coller de la structure avec transformation différente.

Il regarde l'observability UI - elle a été **cruciale** pour debug 3 bugs de mapping subtils en S2.

Il relit le brainstorming Chapeau Noir: "Risque #1 - Adapter Pattern Compliqué". Il sourit - "On l'a géré. BMAD a empêché le spaghetti."

**Climax:**
Olivier écrit dans `retrospective-s4.md`:

**"✅ GO Phase 2 - Multi-LLM"**

**Justification:**
- Architecture prouvée solide
- Pas de dette technique bloquante
- Lab utilisé quotidiennement (pas théorique)
- Confiance: ajouter Claude = 2-3 jours max
- BMAD validé - méthode a fonctionné

**Resolution:**
Sentiment: **Fierté professionnelle**. Olivier a prouvé qu'on peut éviter le spaghetti avec discipline architecturale. Le lab est son outil quotidien. Et il a une esquisse production-ready pour le projet pro. Double ROI atteint.

Lundi S5, il commence Spike #3: ClaudeStrategy. Il sait que ça va marcher.

**Emotional Arc:** Réflexion → Analyse → Confiance croissante → Décision → Fierté → Excitation (Phase 2)

**Capabilities Revealed:**
- Code review tooling intégré? (ou manuel externe)
- Metrics dashboard (usage stats, POC counts)
- ADR documentation system
- Test coverage reporting
- Retrospective facilitation (méthodologie BMAD intégrée?)

---

### Journey 4 - Mois 3: Réutilisation Professionnelle (Architecture au Boulot)

**Personnage:** Olivier, maintenant expert MCP reconnu, face à projet pro réel

**Opening Scene:**
3 mois plus tard. Réunion d'équipe au boulot. Chef de projet: "On a besoin d'un bot avec intégration GitHub + Notion + Slack pour automatiser le workflow de release. Olivier, tu peux estimer la complexité?"

Olivier sourit intérieurement. Il a déjà testé ce combo dans son lab (Phase 3).

**Rising Action:**
- Olivier ouvre son lab durant la pause
- GitHub MCP + Notion MCP + Slack MCP déjà configurés
- Il teste le workflow: "Créer issue Notion, créer branche GitHub, poster notification Slack"
- Fonctionne en 5 minutes
- Il documente les learnings: patterns d'erreur, latences, limites API

Retour en réunion. Olivier présente:
- "Faisable. J'ai déjà prototypé l'architecture."
- Il montre `docs/adr/adr-001-strategy-pattern.md` de son lab
- "On peut réutiliser ce pattern. Voici les risques identifiés..."
- Il ouvre son catalogue MCP testé: "15 MCP validés, voici leurs performances"

**Climax:**
L'équipe est impressionnée. Le chef de projet: **"Tu as déjà fait tout ça? C'est exactement ce qu'on cherche."**

Olivier est assigné lead technique. Il copie l'architecture validée du lab vers le repo pro. Ce qui aurait pris 2-3 semaines de R&D est déjà fait. **10h+/semaine gagnées.**

**Resolution:**
Olivier réalise: le lab n'était pas juste un POC perso - c'était une **R&D stratégique**. Il a:
- Architecture production-ready validée
- Catalogue MCP testé (évite pièges connus)
- Patterns documentés réutilisables
- Expertise MCP reconnue (thought leader interne)

Il devient la référence MCP dans l'équipe. Les collègues lui demandent conseil. Il envisage documenter publiquement ses learnings (blog posts, talks).

État émotionnel: **Accomplissement professionnel**. Double ROI complètement atteint.

**Emotional Arc:** Opportunité → Confiance (j'ai déjà ça) → Démonstration → Reconnaissance → Accomplissement → Vision (partage public)

**Capabilities Revealed:**
- Export/documentation system (ADRs, learnings)
- MCP catalog avec métadonnées (performance, compatibilité, pièges)
- Pattern library réutilisable
- Architecture portability (lab → production)
- Combo workflow templates pré-validés

---

### Journey Requirements Summary

**Core Capabilities Identifiées Across Journeys:**

**1. MCP Management (J1, J2):**
- UI configuration MCP (formulaire, pas fichier config)
- Health check & validation connexion
- Persistence configuration (pas reconnecter à chaque session)
- Support MCP distants (GitHub initial, extensible)

**2. Adapter & Transformation (J1, J2):**
- Strategy Pattern LLM adapter (GPT-4o MVP, Claude Phase 2)
- Canonical Format transformation (MCP Tools → LLM Functions)
- Error handling gracieux (transformation fails, API errors)

**3. Chat Interface (J1, J2):**
- Interface chat basique fonctionnelle
- Contexte conversationnel maintenu (multi-turn)
- Affichage réponses formatées

**4. Observability & Debug (J1, J2, J3):**
- Pipeline tracing temps réel (UI → Adapter → LLM → MCP)
- Logging complet avec timestamps
- UI debug first-class (essentiel apprentissage)
- Error visualization

**5. Orchestration Multi-Tool (J2):**
- Enchaînement commandes seamless
- Contexte partagé entre tools
- Performance acceptable (pas latence excessive)

**6. Quality & Validation (J3):**
- Code review intégration (manuel ou tooling)
- Test coverage reporting
- ADR documentation system
- Metrics/usage tracking

**7. Knowledge Management (J4):**
- Catalogue MCP avec métadonnées
- Pattern library documentation
- Export learnings/ADRs
- Architecture portability guides

**Minimum Coverage for MVP (J1+J2):**
- MCP config UI + persistence
- Adapter Strategy Pattern (GPT-4o)
- Canonical Format transformation
- Chat interface basique
- Observability UI (logs, tracing)
- Error handling

**Growth Features (J3+J4):**
- Multi-LLM switching
- MCP catalog system
- Pattern documentation
- Metrics dashboard
- Export/sharing capabilities

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Canonical Format Transformation Layer**
Format intermédiaire unifié permettant de mapper n'importe quel MCP Tool vers n'importe quel LLM Provider. Abstraction rarement vue dans l'écosystème MCP actuel où la plupart des intégrations sont point-to-point.

**2. Observability-First Architecture**
Tracing pipeline complet (UI→Adapter→LLM→MCP) comme citizen de première classe dès MVP, pas afterthought. Essentiel pour comprendre comportements LLM et debug transformations.

**3. Strategy Pattern Multi-LLM Adapter**
Architecture permettant switch dynamique entre providers LLM (GPT-4o, Claude, Gemini) sans réécrire l'application. Pattern sous-utilisé dans l'espace MCP.

**4. Configuration UI vs Code**
Connexion MCP par interface graphique (clics) vs édition fichiers config JSON - réduit friction expérimentation de 30-60min à <5min.

### Market Context & Competitive Landscape

**État actuel écosystème MCP:**
- MCP est émergent (Anthropic, 2024)
- Intégrations majoritairement CLI/fichiers config
- Peu d'outils exploration visuelle MCP
- Pas de standard transformation multi-LLM

**Différenciateur MCP Lab:**
Focus R&D rapide et observability vs production deployment. Niche "laboratoire d'expérimentation" non adressée par outils existants.

### Validation Approach

**MVP Validation (S4):**
- Architecture Strategy Pattern scale-t-elle? (ajout Claude Phase 2)
- Canonical Format gère-t-il edge cases transformation?
- Observability UI révèle-t-elle insights utiles?
- Réduction temps POC mesurable: <10min vs baseline 30-60min

**Production Validation (3 mois):**
- Architecture réutilisée projet professionnel = validation portabilité
- 10+ MCP testés = validation robustesse transformation
- Usage quotidien (5+jours/semaine) = validation utilité réelle

### Risk Mitigation

**Risque: Canonical Format trop complexe**
Mitigation: Start simple (MVP), itérer basé sur edge cases réels découverts

**Risque: Strategy Pattern over-engineering**
Mitigation: BMAD architecture review S4, ADRs documentés, code review

**Risque: Innovation théorique sans usage**
Mitigation: Critère Go/No-Go S4 basé sur usage réel (3×/semaine minimum)

**Fallback général:** Si innovation échoue, architecture reste solide pour cas d'usage plus simple (single LLM, single MCP).

## Developer Tool + Web App Specific Requirements

### Project-Type Overview

**Hybrid Architecture:**
MCP Lab combine un outil de développement (exploration MCP, debug, R&D) avec une Web App (UI interactive, observability dashboard). Cible principale: développeurs solo testant MCP rapidement.

**Developer Tool Aspect:**
- Exploration/testing MCP servers
- Debug pipeline LLM↔MCP
- R&D rapid prototyping
- Local development environment

**Web App Aspect:**
- Interface configuration via browser
- Chat interface temps réel
- Observability dashboard
- Session-based (in-memory pour MVP)

### Technical Architecture Considerations

**Stack Technique (MVP):**
- **Frontend:** React/Next.js ou similaire (SPA)
- **Backend:** Node.js (runtime MCP standard)
- **MCP Client:** Protocol MCP Anthropic
- **LLM Integration:** OpenAI SDK (GPT-4o), future: Anthropic SDK (Claude)
- **Deployment:** Localhost uniquement (MVP), pas de cloud hosting

**Browser Support:**
- Chrome/Edge (primary - dernières 2 versions)
- Firefox (best effort)
- Safari (non prioritaire MVP)
- Mobile browsers: hors scope MVP

**Real-Time Requirements:**
- WebSocket ou Server-Sent Events pour observability streaming
- Chat interface: requête/réponse (pas streaming nécessaire MVP)
- Logs/traces: affichage temps réel requis

**Responsive Design:**
- Desktop-first (1920×1080 baseline)
- Minimum viable: 1366×768
- Mobile: hors scope MVP (outil dev desktop)

### Implementation Considerations

**Installation & Setup:**
- `npm install` ou `yarn install`
- `.env` file pour API keys (GPT-4o)
- `npm run dev` → localhost:3000
- Pas de build distribué MVP (dev mode seulement)

**API Surface (pour futurs MCP):**
- Canonical Format schema documenté
- Adapter interface claire pour ajouter LLM providers
- MCP connection abstraction extensible

**Configuration Management:**
- MCP config via UI (formulaire)
- Persistence: localStorage MVP (upgrade DB Phase 2+)
- API keys: .env file (pas de vault MVP)

**Code Examples & Documentation:**
- README quickstart (5min setup goal)
- ADR templates pré-configurés
- Canonical Format examples
- Strategy Pattern implementation guide

**Performance Targets:**
- MCP connection: <5s
- Chat response: variable (dépend LLM), affichage streaming si >2s
- UI responsiveness: <100ms interactions
- Observability logs: affichage <500ms après événement

**Accessibility:**
- WCAG 2.1 Level A minimum (MVP)
- Keyboard navigation basique
- Pas de screen reader optimization (hors scope MVP)
- Contrast ratios respectés (dev tool audience)

**SEO:**
- Non applicable (localhost tool, pas de web public)

**Migration Path:**
- MVP → Phase 2: localStorage → DB migration script
- Single LLM → Multi-LLM: Strategy Pattern déjà en place
- Local → Cloud (si futur): containerization ready

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving + Validation MVP

Prouver que BMAD empêche le spaghetti sur un projet techniquement complexe. Le lab doit être utilisable quotidiennement (pas juste théorique) et valider l'architecture Strategy Pattern avant décision multi-LLM.

**MVP Timeline:** 4 semaines (Semaines 1-4)

**Resource Requirements:**
- 1 développeur full-stack (toi)
- 6.5h/jour disponibles
- GPT-4o API access (illimité)
- GitHub MCP (gratuit)

**Go/No-Go Decision Point:** Fin S4 avec critères mesurables

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Journey 1: Premier MCP branché sans code (Jour 1, 5min max)
- Journey 2 (partiel): Usage quotidien POC rapide (S3 validation)

**Must-Have Capabilities:**
1. **Adapter Multi-LLM** - GPT-4o uniquement, Strategy Pattern implémenté
2. **MCP Unique** - GitHub MCP, configuration UI, pas fichier config
3. **Canonical Format** - Transformation MCP Tools → GPT-4o Functions
4. **Observability-First** - Logging/tracing pipeline complet, UI temps réel
5. **UI Web Minimale** - Config MCP, chat basique, logs/observability

**Out of Scope (MVP):**
- Multi-LLM (décision après S4)
- Multiple MCP simultanés
- Persistence conversations (in-memory)
- Tests automatisés complets
- MCP locaux
- Advanced UI features

### Post-MVP Features

**Phase 2 - Multi-LLM (Semaines 5-8, si GO):**
- Ajouter Claude Strategy
- Switching LLM dynamique UI
- Comparaison comportements GPT-4o vs Claude
- Optimisation coûts tokens

**Décision Gate:** Architecture solide + lab utilisé régulièrement (3+×/semaine)

**Phase 3 - Orchestration MCP (Semaines 9-12+):**
- Support 3+ MCP additionnels (Notion, Teams, Playwright, Figma)
- Combos workflow validés
- Catalogue MCP testé

**Phase 4 - Production Maturity (Mois 3+):**
- Architecture réutilisée projet pro
- MCP locaux
- Persistence DB
- Tests contract-based
- Advanced UI

### Risk Mitigation Strategy

**Technical Risks:**
- **Risque:** Canonical Format trop complexe
- **Mitigation:** Start simple MVP, itérer sur edge cases réels

- **Risque:** Strategy Pattern over-engineering
- **Mitigation:** Code review S4, ADRs documentés, tests coverage >70%

**Market/Usage Risks:**
- **Risque:** Lab théorique, pas utilisé quotidiennement
- **Mitigation:** Critère Go/No-Go S4 basé sur usage réel (3×/semaine minimum S3)

- **Risque:** Innovation sans validation
- **Mitigation:** Métriques mesurables (POC <10min, insights/semaine)

**Resource Risks:**
- **Risque:** Paralysie par over-planning (anti-pattern BMAD)
- **Mitigation:** Timeboxing strict 4 semaines MVP, décision Go/No-Go forcée

- **Risque:** Temps insuffisant
- **Mitigation:** MVP ruthless - 1 LLM, 1 MCP, fonctionnel seulement

**Contingency Plan:**
Si NO-GO fin S4 → Stopper. Architecture validée reste réutilisable pour projet pro simplifié.

## Functional Requirements

### MCP Connection & Management

- FR1: Développeurs peuvent connecter un MCP serveur distant via formulaire UI (URL, credentials)
- FR2: Système peut valider la connexion MCP et afficher le statut (connected/failed)
- FR3: Développeurs peuvent voir la liste des tools disponibles du MCP connecté
- FR4: Développeurs peuvent déconnecter un MCP serveur via UI
- FR5: Système peut persister la configuration MCP entre sessions (localStorage)

### LLM Adapter & Transformation

- FR6: Système peut transformer MCP Tools vers format Canonical intermédiaire
- FR7: Système peut transformer format Canonical vers GPT-4o function calling format
- FR8: Système peut gérer les erreurs de transformation avec messages explicites
- FR9: Système peut router les requêtes utilisateur vers l'adapter LLM sélectionné (GPT-4o MVP)
- FR10: Système peut traiter les réponses LLM et les formatter pour affichage UI

### Chat Interface

- FR11: Développeurs peuvent envoyer des commandes texte via interface chat
- FR12: Système peut maintenir le contexte conversationnel entre commandes multiples
- FR13: Développeurs peuvent voir l'historique de conversation dans la session courante
- FR14: Système peut afficher les réponses LLM formatées dans le chat
- FR15: Développeurs peuvent voir les indicateurs de chargement pendant traitement requête

### Observability & Debug

- FR16: Système peut logger toutes les étapes du pipeline (UI → Adapter → LLM → MCP)
- FR17: Développeurs peuvent voir les logs en temps réel dans l'UI observability
- FR18: Système peut tracer les requêtes avec timestamps pour chaque étape pipeline
- FR19: Développeurs peuvent identifier les erreurs de transformation dans les logs
- FR20: Système peut afficher les payloads transformés à chaque étape (debug)
- FR21: Développeurs peuvent filtrer les logs par niveau (info/error/debug)

### Configuration & Settings

- FR22: Développeurs peuvent configurer l'API key GPT-4o via fichier .env
- FR23: Système peut démarrer en mode développement local (npm run dev)
- FR24: Développeurs peuvent voir quelle LLM strategy est actuellement active
- FR25: Système peut afficher des messages d'erreur clairs si configuration manquante

### MCP Tool Execution

- FR26: Système peut exécuter les tools MCP demandés par le LLM
- FR27: Système peut gérer les réponses MCP et les retourner au LLM
- FR28: Système peut gérer les échecs d'exécution MCP avec retry logic basique
- FR29: Développeurs peuvent voir les tools MCP appelés dans l'observability UI

### Health & Monitoring

- FR30: Développeurs peuvent voir le statut de santé de la connexion MCP
- FR31: Système peut détecter les déconnexions MCP et notifier l'utilisateur
- FR32: Développeurs peuvent voir les métriques basiques (temps réponse, nombre requêtes)

## Non-Functional Requirements

### Performance

**Response Times:**
- NFR1: Interface UI doit répondre aux interactions utilisateur en <100ms (clics, formulaires)
- NFR2: Connexion MCP doit s'établir en <5 secondes
- NFR3: Observability logs doivent s'afficher en <500ms après événement pipeline
- NFR4: Chat interface doit afficher indicateur de chargement si réponse LLM >2s

**Throughput:**
- NFR5: Système doit gérer minimum 10 requêtes chat consécutives sans dégradation performance
- NFR6: Pipeline de transformation (MCP→Canonical→LLM) doit compléter en <1s (hors appel LLM externe)

**Resource Usage:**
- NFR7: Application localhost doit fonctionner avec <1GB RAM utilisée
- NFR8: Démarrage serveur dev (npm run dev) doit compléter en <30 secondes

### Security

**API Key Management:**
- NFR9: API keys GPT-4o doivent être stockées dans fichier .env (pas hardcodées)
- NFR10: API keys ne doivent jamais apparaître dans les logs observability UI
- NFR11: Fichier .env doit être exclu du contrôle de version (.gitignore)

**Data Protection:**
- NFR12: Historique conversation reste en mémoire uniquement (pas de persistence fichier MVP)
- NFR13: MCP credentials (si sensibles) doivent être chiffrées dans localStorage

### Reliability

**Error Handling:**
- NFR14: Échecs de connexion MCP doivent afficher message d'erreur explicite (pas de crash silencieux)
- NFR15: Erreurs transformation doivent être loggées avec contexte complet pour debug
- NFR16: Échecs appel LLM doivent permettre retry manuel via UI

**Availability:**
- NFR17: Application localhost doit redémarrer proprement après crash (pas de state corrompu)
- NFR18: Déconnexion MCP ne doit pas crasher l'application (graceful degradation)

### Integration & Compatibility

**MCP Protocol:**
- NFR19: Système doit supporter MCP protocol specification Anthropic (version courante)
- NFR20: Système doit gérer MCP servers distants via stdio transport
- NFR21: Échecs MCP tool execution doivent être retournés au LLM avec error messages

**LLM API Compatibility:**
- NFR22: Adapter GPT-4o doit supporter OpenAI API v1 (function calling)
- NFR23: Système doit gérer rate limits API avec backoff exponentiel

**Browser Compatibility:**
- NFR24: UI doit fonctionner sur Chrome/Edge dernières 2 versions
- NFR25: UI doit rester fonctionnelle sur Firefox (best effort, pas bloquant)

### Maintainability

**Code Quality:**
- NFR26: Code coverage tests doit atteindre >70% pour validation S4
- NFR27: ADRs doivent être documentés pour toutes décisions architecturales majeures
- NFR28: Strategy Pattern doit permettre ajout nouvelle LLM Strategy en <1 jour (validation Phase 2)

**Documentation:**
- NFR29: README doit permettre setup complet en <5 minutes pour développeur
- NFR30: Canonical Format schema doit être documenté avec exemples
