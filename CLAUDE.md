# SageSyn Team Plugin - Claude Code Instructions

This is a Claude Code plugin that provides 9 specialized AI agents for building the SageSyn Agent Programming Language ecosystem.

## Quick Start

Use `/team-status` to see the current team overview and roadmap phase.

## Available Agents

| Agent | Role | When to Use |
|-------|------|-------------|
| ATLAS | Orchestrator | Project coordination, sprint planning, ADRs |
| FORGE | Architect | System design, API specs, technical decisions |
| RUST | Backend | Rust implementation, parser, compiler, Tauri |

## Available Commands

| Command | Purpose |
|---------|---------|
| `/team-status` | Display team status and roadmap phase |
| `/plan-sprint <goal>` | Create a sprint plan with task allocation |

## Available Skills

| Skill | Purpose |
|-------|---------|
| `sagesyn-language` | .ssag syntax reference and examples |

## MCP Server

The `sagesyn-context` MCP server provides:
- `get_agent_context` - Get agent details
- `get_roadmap_phase` - Get phase milestones
- `get_team_status` - Team overview
- `get_agent_collaborations` - Collaboration matrix
- `search_agents_by_skill` - Find agents by capability

## Project Context

### SageSyn Product
- **What**: Agent Programming Language (.ssag files)
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
