---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - '_bmad-output/analysis/brainstorming-session-2026-01-12.md'
date: 2026-01-12
author: Olivier
---

# Product Brief: Chatbot MCP Lab

## Executive Summary

Chatbot MCP Lab est un orchestrateur d'automatisations permettant aux développeurs de tester et combiner rapidement des MCP (Model Context Protocol) locaux et distants avec différents LLMs (OpenAI GPT-4o, Claude). L'outil résout le problème de lenteur et complexité actuelle lors de l'expérimentation MCP via des outils comme Claude Code ou GitHub Copilot, en permettant de brancher/débrancher des MCP en quelques clics via une interface Web.

Au-delà de l'apprentissage personnel, ce projet sert d'esquisse pour une future feature professionnelle nécessitant l'implémentation d'un bot avec MCP, offrant ainsi un double ROI: validation d'architecture et R&D pour besoins métier.

---

## Core Vision

### Problem Statement

Les développeurs voulant expérimenter avec MCP font face à un processus lent et technique. Tester différents MCP ou combinaisons (Notion+Teams+GitHub+Figma+Playwright) via des outils existants (Claude Code, GitHub Copilot) nécessite des manipulations répétitives, sans persistance de configuration, et sans capacité de comparaison rapide entre différentes combinaisons.

De plus, la documentation MCP étant récente et instable, il est critique de pouvoir expérimenter rapidement pour découvrir ce qui fonctionne réellement versus ce qui est théorique.

### Problem Impact

**Pour les développeurs:**
- Apprentissage MCP ralenti par friction technique
- POCs MCP prennent trop de temps
- Impossibilité de tester rapidement des hypothèses ("et si je combinais A+B+C?")
- Risque de perdre du temps sur des approches non viables

**Pour les organisations:**
- R&D MCP coûteuse en temps développeur
- Difficile d'évaluer la faisabilité de workflows MCP avant implémentation production
- Pas d'outil pour valider architectures multi-LLM + MCP

### Why Existing Solutions Fall Short

**Claude Code / GitHub Copilot:**
- Pas conçus pour expérimentation MCP rapide
- Aucune interface de gestion MCP (brancher/débrancher en clics)
- Pas de persistance de configurations MCP testées
- Impossibilité de comparer comportements entre LLMs sur même MCP
- Pas d'observabilité sur pipeline complet (UI → LLM → MCP)

**Approches manuelles (code direct):**
- Trop lent: modification code, redémarrage serveur à chaque test
- Risque de code spaghetti lors d'expérimentations rapides
- Pas de réutilisabilité entre POCs

**Aucune solution existante ne permet:**
- Configuration MCP par UI (pas fichiers)
- Switching LLM dynamique (optimisation coûts tokens)
- Orchestration multi-MCP en quelques clics
- Observabilité complète pour debug et apprentissage

### Proposed Solution

Chatbot MCP Lab est une application Web locale permettant de:

**1. Gestion MCP Simplifiée**
- Brancher/débrancher MCP (locaux ou distants) via interface UI
- Configuration en clics, pas en code
- Catalogue de MCP testés avec métadonnées (performance, compatibilité)

**2. Multi-LLM Intelligent**
- Switch entre OpenAI GPT-4o (tokens quasi-illimités) et Claude (tokens limités)
- Optimisation économique automatique
- Comparaison comportements LLMs sur mêmes workflows

**3. Orchestration Workflow**
- Tester combinaisons MCP (ex: Notion+Teams+GitHub+Figma+Playwright)
- Workflows pré-configurés réutilisables
- Discovery de patterns efficaces multi-MCP

**4. Observabilité Développeur**
- Traçage complet: UI → Adapter → LLM → MCP
- Debug visuel des transformations Tools→Functions
- Logs et métriques pour optimisation

**5. Architecture Propre (Validation BMAD)**
- Développé avec méthode BMAD pour éviter code spaghetti
- Patterns réutilisables (Strategy Pattern adapter, Canonical Format mapping)
- Foundation solide pour projets professionnels futurs

### Key Differentiators

**1. UI-First pour Développeurs**
- Première solution permettant configuration MCP sans toucher au code
- Expérience optimisée pour POCs rapides (10 POCs/jour vs 1/semaine)

**2. Multi-LLM Économique**
- Seul outil permettant switch LLM dynamique pour optimisation coûts tokens
- Insights uniques sur forces/faiblesses de chaque LLM avec MCP

**3. Laboratoire d'Orchestration**
- Focus sur combinaisons MCP (pas MCP individuels)
- Discovery de workflows cross-platform (Design→Code→Deploy automatisés)

**4. Observabilité Complète**
- Traçabilité totale pour apprentissage et debug
- Visualisation transformations MCP→LLM

**5. Production-Ready Architecture**
- Pas un hack - architecture solide réutilisable en production
- Esquisse validée pour projets professionnels
- Patterns éprouvés, pas expérimentations jetables

**6. Timing Parfait**
- MCP récent = peu d'experts, opportunité devenir thought leader
- Besoin professionnel futur = double ROI immédiat

---

## Target Users

### Primary Users

**Persona: Alex - Développeur Full-Stack Explorateur MCP**

**Contexte:**
- Développeur full-stack (3-7 ans expérience)
- Licences OpenAI + Claude disponibles
- Besoin professionnel imminent: implémenter bot avec MCP
- Utilise actuellement Claude Code ou GitHub Copilot

**Problème Expérimenté:**
- Teste MCP via outils généralistes (Claude Code) - c'est **long**
- Chaque test MCP nécessite reformulation, pas de persistance config
- Impossible de tester rapidement combinaisons (Notion+Teams+GitHub...)
- Documentation MCP récente/instable = besoin d'expérimenter pour apprendre

**Motivations:**
- Maîtriser MCP avant projet pro (avantage compétitif)
- Éviter code spaghetti lors d'expérimentations
- Valider architectures avant implémentation production
- Devenir expert d'un domaine émergent

**Succès Pour Alex:**
"Je branche GitHub MCP en 2 clics, je teste avec GPT-4o, puis je switch vers Claude pour comparer - total 5 minutes. J'ai une trace complète de ce qui s'est passé. Demain j'ajoute Notion MCP et je teste la combo GitHub+Notion. En une semaine, j'ai validé 3 architectures différentes et je sais laquelle utiliser au boulot."

### Secondary Users

**N/A pour MVP** - Utilisateur unique.

**Pour versions futures:**
- **Dev Teams**: Équipes voulant standardiser workflows MCP
- **Engineering Managers**: Évaluer faisabilité MCP avant investir
- **MCP Developers**: Tester leurs propres MCP contre différents LLMs

### User Journey

**Discovery (Semaine 0):**
- Alex a un projet pro nécessitant bot MCP dans 2-3 mois
- Cherche outil pour expérimenter rapidement
- Trouve Chatbot MCP Lab (GitHub, bouche-à-oreille dev)

**Onboarding (Jour 1 - 6.5h):**
- Clone repo, suit README
- Spike #1: Teste Strategy Pattern adapter (4h)
- Premier MCP GitHub connecté via UI
- **Aha moment:** "J'ai branché un MCP sans toucher au code!"

**Core Usage (Semaines 1-4):**
- S1: Spikes architecturaux, décisions tech stack
- S2: MVP mono-LLM (GPT-4o) + GitHub MCP fonctionnel
- S3: **Utilise quotidiennement** pour POCs
- S4: Décision go/no-go multi-LLM

**Success Moment (Semaine 3):**
Alex teste combo GitHub+Playwright en 10 minutes. L'observabilité UI montre exactement le pipeline complet. Il découvre un pattern MCP qu'il pourra réutiliser au boulot. "C'est exactement ce que je cherchais!"

**Long-term (Mois 2-3):**
- Lab devient indispensable
- 10+ POCs MCP testés
- Architecture validée pour projet pro
- Alex partage learnings en interne, devient référent MCP

---

## Success Metrics

### User Success Metrics

**Vitesse d'Expérimentation MCP:**
- **Métrique:** Temps moyen pour tester un nouveau MCP
- **Objectif:** < 5 minutes (vs ~30-60min avec Claude Code)
- **Mesure:** Tracking UI temps entre "add MCP" et "première réponse LLM"

**Fréquence POCs:**
- **Métrique:** Nombre de POCs MCP réalisés par semaine
- **Objectif:** 10 POCs/jour vs 1 POC/semaine (70x improvement)
- **Mesure:** Compteur configurations MCP testées

**Adoption Quotidienne:**
- **Métrique:** Utilisation quotidienne du lab
- **Objectif:** 3+ utilisations/semaine minimum en Semaine 3
- **Mesure:** Logs utilisation, sessions actives

**Insights MCP Découverts:**
- **Métrique:** Découvertes inattendues sur MCP ou combinaisons
- **Objectif:** 1+ insight majeur par semaine
- **Mesure:** Documentation learnings

**Succès Architecture:**
- **Métrique:** Code reste propre (pas spaghetti) après 4 semaines
- **Objectif:** Architecture respecte ADRs, maintenabilité haute
- **Mesure:** Code review S4, dette technique

### Business Objectives

**Objectif 1: Validation BMAD (Meta-Objectif)**
- Timeline: 4 semaines
- Critère: Code propre sans spaghetti, ADRs suivis, architecture solide
- Impact: Méthode BMAD validée pour projets complexes

**Objectif 2: R&D Projet Professionnel**
- Timeline: 2-3 mois
- Critère: Architecture validée et réutilisable pour bot professionnel
- Impact: Économie temps R&D, esquisse production-ready

**Objectif 3: Maîtrise MCP**
- Timeline: 3 mois
- Critère: 10+ MCP testés, patterns documentés, expert reconnu
- Impact: Avantage compétitif professionnel, thought leadership

**Objectif 4: Tooling Personnel**
- Timeline: 3 mois
- Critère: Lab utilisé quotidiennement, indispensable au workflow
- Impact: Productivité développement x10

### Key Performance Indicators

**KPIs Semaine 4 (MVP Validation):**

✅ **Architecture KPIs:**
- Strategy Pattern Adapter propre (code review clean)
- 1 MCP GitHub fonctionnel GPT-4o (tests passent)
- Observability debug fonctionnelle (tracés UI)
- Zéro code spaghetti (revue architecture)

✅ **Usage KPIs:**
- Lab utilisé 3× minimum S3 (logs)
- 1+ POC MCP < 10min (mesure temps)
- 1+ insight MCP inattendu (documentation)

✅ **BMAD Validation KPIs:**
- Tous ADRs documentés et suivis
- Pas code vite fait non testé (coverage > 70%)
- Confiance architecture scale (Go multi-LLM)

**KPIs 3 Mois (Production Maturity):**

📈 **Adoption:**
- Lab 5+ jours/semaine
- 10+ MCP testés
- 3+ combos workflow validés

📈 **Learning:**
- 5+ patterns documentés
- 3+ ADRs architecturaux
- 1+ présentation interne

📈 **Business Impact:**
- Architecture réutilisée projet pro
- 10h+/semaine gagnées
- Coûts tokens optimisés

---

## MVP Scope

### Core Features (Semaines 1-4)

**Phase 1 - MVP Ruthless (S1-S2):**

**1. Adapter Multi-LLM (GPT-4o Only pour MVP)**
- Strategy Pattern adapter implémenté
- Support GPT-4o uniquement (pas Claude en MVP)
- API key management simple (env file)
- **Rationale:** Valider architecture sans complexité multi-LLM

**2. Intégration MCP Unique (GitHub Only)**
- Connexion 1 MCP distant (GitHub)
- Configuration via UI basique (pas fichier config)
- Test workflow: UI → Adapter → GPT-4o → GitHub MCP
- **Rationale:** Prouver concept end-to-end avec MCP le plus simple

**3. Canonical Format Transformation**
- Format intermédiaire unifié défini
- Mapper MCP Tools → Canonical → GPT-4o Functions
- Gestion erreurs transformation basique
- **Rationale:** Foundation pour multi-LLM futur

**4. Observability-First**
- Logging complet (UI → Adapter → LLM → MCP)
- Tracing requêtes avec timestamps
- UI debug affichant logs/traces en temps réel
- **Rationale:** Essentiel pour apprentissage MCP et debug

**5. UI Web Minimale**
- Interface brancher/débrancher GitHub MCP (clics)
- Sélection LLM (GPT-4o pour MVP)
- Chat interface basique
- Vue logs/observability
- **Rationale:** Juste assez UI pour valider concept "configuration par clics"

### Out of Scope for MVP

**❌ Multi-LLM (Claude, Gemini)**
- Décision: Mono-LLM (GPT-4o) seulement
- Pourquoi defer: Complexité adapter, focus MCP d'abord
- Quand: Semaine 4 (go/no-go après S3 validation)

**❌ Multiple MCP**
- Décision: 1 seul MCP (GitHub)
- Pourquoi defer: Valider pattern avec 1 MCP avant scale
- Quand: Post-S4 si Go

**❌ Orchestration Combos MCP**
- Décision: Pas combos (Notion+Teams+GitHub) en MVP
- Pourquoi defer: Complexité exponentielle
- Quand: Phase 3 (S5-S8)

**❌ Persistence Conversations**
- Décision: Pas DB, sessions in-memory
- Pourquoi defer: Pas critique validation POC
- Quand: V2 si adoption quotidienne

**❌ Advanced UI Features**
- Pas visualization transformations MCP→LLM
- Pas multi-keys management
- Pas export conversations
- Quand: Post-MVP si adoption

**❌ MCP Locaux**
- Décision: MCP distants seulement
- Pourquoi defer: Moins complexité setup
- Quand: V2 si besoin

**❌ Tests Automatisés Complets**
- Décision: Tests manuels MVP, quelques tests unitaires
- Quand: Phase 4 (S9-12) contract testing

### MVP Success Criteria (Validation S4)

**Go/No-Go Decision Criteria (Fin Semaine 4):**

✅ **GO si:**
- Strategy Pattern adapter propre, maintenable
- GitHub MCP fonctionne avec GPT-4o
- Observability permet debug/learning
- Utilisé 3× durant S3 minimum
- 1+ POC MCP < 10min
- Confiance architecture peut scale
- BMAD a empêché spaghetti

❌ **NO-GO si:**
- Code spaghetti après S2
- Adapter trop complexe
- GitHub MCP non fiable
- Aucune utilisation S3
- Paralysie planning

**Si GO:** Multi-LLM (Claude en S5-S8)
**Si NO-GO:** Itérer mono-LLM ou pivoter

### Future Vision

**Phase 2 - Multi-LLM (Si GO, S5-S8):**
- Ajouter Claude (valider Strategy Pattern scale)
- Switching LLM dynamique via UI
- Comparaison GPT-4o vs Claude
- Optimisation coûts tokens

**Phase 3 - Orchestration MCP (S9-S12+):**
- 3 combos magiques validés
- Workflows pré-configurés réutilisables
- Catalogue MCP testés

**Phase 4 - Production Maturity (Mois 3+):**
- Architecture réutilisée projet pro
- MCP locaux supportés
- Persistence conversations (DB)
- Tests contract-based complets
- Visualization transformations

**Vision Long-Terme (6-12 mois):**
- Plateforme open-source développeurs
- Bibliothèque patterns MCP documentés
- Support Gemini, Llama, autres LLMs
- Thought leadership MCP
- Communauté contributeurs
