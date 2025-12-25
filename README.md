# SageSyn Team

A Claude Code plugin providing 9 specialized AI agents for building the SageSyn Agent Programming Language ecosystem.

## Overview

SageSyn Team implements a multi-agent development workflow where each agent has a specific role:

| Agent | Role | Color | Focus |
|-------|------|-------|-------|
| ATLAS | Orchestrator | #f59e0b | Project coordination, sprint planning |
| SAGE | Product | #8b5cf6 | Requirements, specs, user stories |
| FORGE | Architect | #ef4444 | System design, API contracts |
| PIXEL | UX/Design | #ec4899 | Interface design, components |
| CANVAS | Frontend | #3b82f6 | React, XY Flow, Monaco |
| RUST | Backend | #f97316 | Compiler, runtime, Tauri |
| BRIDGE | Protocols | #14b8a6 | MCP, A2A, AG-UI |
| SENTINEL | QA | #22c55e | Testing, security |
| PIPELINE | DevOps | #64748b | CI/CD, releases |

## Installation

### From GitHub

```bash
# Add to Claude Code plugins
claude plugins add github:sagesyn/sagesyn-team
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/sagesyn/sagesyn-team.git
cd sagesyn-team

# Install MCP server dependencies
cd servers/sagesyn-context-mcp
bun install
cd ../..

# Add as local plugin
claude plugins add ./sagesyn-team
```

## Usage

### Commands

```bash
# View team status and roadmap
/team-status

# Plan a sprint
/plan-sprint Implement the .ssag lexer
```

### Agents

Agents are automatically triggered based on your requests. You can also explicitly invoke them:

- Ask about architecture → FORGE agent
- Need Rust implementation → RUST agent
- Want to coordinate work → ATLAS agent

### Skills

Reference the `sagesyn-language` skill for .ssag syntax:

```
How do I define a tool in .ssag?
```

## Plugin Structure

```
sagesyn-team/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── agents/
│   ├── atlas-orchestrator.md
│   ├── forge-architect.md
│   └── rust-backend.md
├── commands/
│   ├── atlas/
│   │   └── plan-sprint.md
│   └── team/
│       └── status.md
├── skills/
│   └── sagesyn-language/
│       ├── SKILL.md
│       ├── references/
│       │   ├── syntax.md
│       │   ├── primitives.md
│       │   └── protocols.md
│       └── examples/
│           └── basic-agent.ssag
├── servers/
│   └── sagesyn-context-mcp/
│       ├── index.ts
│       └── package.json
├── data/
│   ├── agents.json
│   └── roadmap.json
├── .mcp.json
├── CLAUDE.md
└── README.md
```

## MCP Server

The plugin includes an MCP server for project context:

### Tools

| Tool | Description |
|------|-------------|
| `get_agent_context` | Get agent details and capabilities |
| `get_roadmap_phase` | Get phase milestones and deliverables |
| `get_team_status` | Overview of all agents |
| `get_agent_collaborations` | Who works with whom |
| `search_agents_by_skill` | Find agents by capability |

## SageSyn Project

This plugin supports development of the SageSyn Agent Programming Language:

- **Language**: Declarative syntax for defining AI agents
- **Compilation**: TypeScript, Python, Go targets
- **Protocols**: MCP, A2A, AG-UI as first-class constructs
- **Tooling**: LSP server, Visual IDE

### Roadmap

| Phase | Quarter | Goal |
|-------|---------|------|
| 1 | Q1 2026 | Core Language & TypeScript Compiler |
| 2 | Q2 2026 | Python/Go Compilers & Visual IDE |
| 3 | Q3 2026 | Protocols & v1.0 Release |
| 4 | Q4 2026 | Package Registry & Enterprise |

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache 2.0 - See [LICENSE](LICENSE) for details.

## Links

- [SageSyn Website](https://sagesyn.ai)
- [Documentation](https://sagesyn.ai/docs)
- [GitHub](https://github.com/sagesyn)
