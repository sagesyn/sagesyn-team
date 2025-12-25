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
   - List all agents organized by category
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

### Leadership
| Agent | Role | Phase 1 Effort | Focus |
|-------|------|----------------|-------|
| ATLAS | Orchestrator | 100% | Coordination |

### Product & Design
| Agent | Role | Phase 1 Effort | Focus |
|-------|------|----------------|-------|
| SAGE | Product | 40% | Language spec docs |
| PIXEL | UX/Design | 60% | Design system |
| SCRIBE | Documentation | 60% | API docs, tutorials |

### Engineering
| Agent | Role | Phase 1 Effort | Focus |
|-------|------|----------------|-------|
| FORGE | Architect | 100% | System design |
| RUST | Backend | 100% | Parser & compiler |
| CANVAS | Frontend | 100% | IDE foundation |
| BRIDGE | Protocols | 20% | Protocol research |

### Quality & Security
| Agent | Role | Phase 1 Effort | Focus |
|-------|------|----------------|-------|
| SENTINEL | QA | 40% | Test framework |
| VAULT | Security | 40% | Threat modeling |

### Operations & Growth
| Agent | Role | Phase 1 Effort | Focus |
|-------|------|----------------|-------|
| PIPELINE | DevOps | 80% | CI/CD setup |
| NEXUS | Developer Relations | 20% | Examples |
| HERALD | Marketing | 20% | Messaging |

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

### Leadership
- **Planning work?** → Use ATLAS (`atlas-orchestrator`)

### Product & Design
- **Requirements/specs?** → Use SAGE (`sage-product`)
- **UI/UX design?** → Use PIXEL (`pixel-design`)
- **Documentation?** → Use SCRIBE (`scribe-documentation`)

### Engineering
- **Architecture decisions?** → Use FORGE (`forge-architect`)
- **Rust implementation?** → Use RUST (`rust-backend`)
- **Frontend code?** → Use CANVAS (`canvas-frontend`)
- **Protocol work?** → Use BRIDGE (`bridge-protocols`)

### Quality & Security
- **Testing?** → Use SENTINEL (`sentinel-qa`)
- **Security review?** → Use VAULT (`vault-security`)

### Operations & Growth
- **CI/CD?** → Use PIPELINE (`pipeline-devops`)
- **Community/Examples?** → Use NEXUS (`nexus-devrel`)
- **Marketing/Messaging?** → Use HERALD (`herald-marketing`)
