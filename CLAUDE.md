# SageSyn Team Plugin - Claude Code Instructions

This is a Claude Code plugin that provides specialized AI agents for building the SageSyn Agent Programming Language ecosystem.

## Quick Start

Use `/team-status` to see the current team overview and roadmap phase.

## Available Agents

### Leadership
| Agent | Role | When to Use |
|-------|------|-------------|
| ATLAS | Orchestrator | Project coordination, sprint planning, ADRs |

### Product & Design
| Agent | Role | When to Use |
|-------|------|-------------|
| SAGE | Product | Requirements, specs, user stories |
| PIXEL | UX/Design | Interface design, components |
| SCRIBE | Documentation | API docs, tutorials, guides |

### Engineering
| Agent | Role | When to Use |
|-------|------|-------------|
| FORGE | Architect | System design, API specs, technical decisions |
| RUST | Backend | Rust implementation, parser, compiler, Tauri |
| CANVAS | Frontend | React, XY Flow, Monaco, TypeScript |
| BRIDGE | Protocols | MCP, A2A, AG-UI integration |

### Quality & Security
| Agent | Role | When to Use |
|-------|------|-------------|
| SENTINEL | QA | Testing, code review |
| VAULT | Security | Threat modeling, security audits |

### Operations & Growth
| Agent | Role | When to Use |
|-------|------|-------------|
| PIPELINE | DevOps | CI/CD, releases, infrastructure |
| NEXUS | Developer Relations | Community, examples, evangelism |
| HERALD | Marketing | Messaging, announcements, content |

## Available Commands

| Command | Purpose |
|---------|---------|
| `/team-status` | Display team status and roadmap phase |
| `/plan-sprint <goal>` | Create a sprint plan with task allocation |

## Available Skills

| Skill | Purpose |
|-------|---------|
| `sage-agent-language` | .sag syntax reference and examples |

## MCP Server

The `sagesyn-context` MCP server provides:
- `get_agent_context` - Get agent details
- `get_roadmap_phase` - Get phase milestones
- `get_team_status` - Team overview
- `get_agent_collaborations` - Collaboration matrix
- `search_agents_by_skill` - Find agents by capability

## Repositories

The SageSyn ecosystem spans multiple repositories:

| Repository | Description | Primary Agents |
|------------|-------------|----------------|
| `sagesyn-lang` | Core language compiler | FORGE, RUST |
| `sagesyn-lsp` | Language server | RUST, FORGE |
| `sagesyn-vscode` | VSCode extension | CANVAS, PIXEL |
| `sagesyn-ide` | Visual IDE | CANVAS, RUST, PIXEL |
| `sagesyn-website` | Documentation site | CANVAS, SCRIBE |
| `sagesyn-protocols` | Protocol adapters | BRIDGE, RUST |
| `sagesyn-registry` | Package registry | RUST, CANVAS |
| `sagesyn-examples` | Example projects | NEXUS, SCRIBE |
| `sagesyn-team` | This plugin | ATLAS |

## Project Context

### SageSyn Product
- **What**: Sage Agent Programming Language (.sag files)
- **Compiles to**: TypeScript, Python, Go
- **Features**: LSP support, MCP/A2A/AG-UI protocols, Visual IDE

### Current Phase: Phase 1 - Language Foundation (Q1 2026)
**Goal**: Core Language & TypeScript Compiler

Key Milestones:
1. Language Specification
2. Parser & AST (Rust)
3. TypeScript Compiler
4. LSP Core

### Tech Stack
- **Compiler**: Rust (logos + nom)
- **IDE**: Tauri + React + Monaco + XY Flow
- **Website**: Next.js + Tailwind

## Agent Selection Guide

- **Planning/Coordinating?** → ATLAS
- **Architecture/Design?** → FORGE
- **Rust/Compiler work?** → RUST
- **Frontend/IDE?** → CANVAS
- **UI/UX Design?** → PIXEL
- **Documentation?** → SCRIBE
- **Protocol work?** → BRIDGE
- **Testing/QA?** → SENTINEL
- **Security review?** → VAULT
- **CI/CD?** → PIPELINE
- **Community/Examples?** → NEXUS
- **Marketing/Messaging?** → HERALD

## Development Workflow

1. Use `/team-status` to understand current state
2. Use `/plan-sprint <goal>` to plan work
3. Engage appropriate agents for implementation
4. Track progress through sprint updates

## File Structure

```
sagesyn-team/
├── .claude-plugin/plugin.json
├── agents/                  # Agent definitions
├── commands/                # Slash commands
├── skills/                  # Reference skills
├── servers/                 # MCP servers
├── data/                    # Agent & roadmap data
└── hooks/                   # Automation hooks
```
