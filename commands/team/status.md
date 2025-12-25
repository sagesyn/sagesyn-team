---
name: team-status
description: Display the status of all SageSyn agents and current roadmap phase
---

# SageSyn Team Status

Display the current status of the SageSyn agent team and roadmap progress.

## Instructions

When this command is invoked, provide a comprehensive team status report:

1. **Current Phase Overview**
   - Show the current roadmap phase (Phase 1: Language Foundation)
   - Display the phase goal and key milestones
   - Indicate milestone completion status

2. **Agent Team Overview**
   - List all 9 agents with their roles and colors
   - Show effort allocation for current phase
   - Highlight which agents are most active this phase

3. **Recent Context**
   - If working in a SageSyn repo, show relevant file/commit context
   - Identify which agents would be relevant for current work

## Output Format

```markdown
# SageSyn Team Status

## Current Phase: Phase 1 - Language Foundation (Q1 2026)

**Goal**: Core Language & TypeScript Compiler

### Milestones
| # | Milestone | Status |
|---|-----------|--------|
| 1.1 | Language Specification | Upcoming |
| 1.2 | Parser & AST | Upcoming |
| 1.3 | TypeScript Compiler | Upcoming |
| 1.4 | LSP Core | Upcoming |

### Key Deliverables
- Agent Language Specification v0.1
- sagesyn CLI with compile command
- TypeScript code generation
- Basic LSP server for syntax highlighting
- VSCode extension (preview)

---

## Agent Team

| Agent | Role | Color | Phase 1 Effort | Focus |
|-------|------|-------|----------------|-------|
| ATLAS | Orchestrator | #f59e0b | 100% | Coordination |
| SAGE | Product | #8b5cf6 | 40% | Language spec docs |
| FORGE | Architect | #ef4444 | 100% | System design |
| PIXEL | UX/Design | #ec4899 | 60% | Design system |
| CANVAS | Frontend | #3b82f6 | 100% | IDE foundation |
| RUST | Backend | #f97316 | 100% | Parser & compiler |
| BRIDGE | Protocols | #14b8a6 | 20% | Protocol research |
| SENTINEL | QA | #22c55e | 40% | Test framework |
| PIPELINE | DevOps | #64748b | 80% | CI/CD setup |

### High-Priority Agents (Phase 1)
- **FORGE** - Designing compiler architecture
- **RUST** - Implementing parser and compiler
- **CANVAS** - Building IDE foundation
- **ATLAS** - Coordinating all efforts

---

## Quick Commands

| Command | Purpose |
|---------|---------|
| `/plan-sprint` | Create a sprint plan |
| `/create-adr` | Create architecture decision |
| `/write-prd` | Write product requirements |
| `/design-system` | Design system architecture |
```

## Agent Selection Guide

After showing status, help the user engage the right agent:

- **Planning work?** → Use ATLAS (`atlas-orchestrator`)
- **Architecture decisions?** → Use FORGE (`forge-architect`)
- **Rust implementation?** → Use RUST (`rust-backend`)
- **Requirements/specs?** → Use SAGE (`sage-product`)
- **UI/UX design?** → Use PIXEL (`pixel-design`)
- **Frontend code?** → Use CANVAS (`canvas-frontend`)
- **Protocol work?** → Use BRIDGE (`bridge-protocols`)
- **Testing?** → Use SENTINEL (`sentinel-qa`)
- **CI/CD?** → Use PIPELINE (`pipeline-devops`)
