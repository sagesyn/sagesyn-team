---
name: plan-sprint
description: Create a sprint plan with ATLAS orchestrating task allocation across agents
arguments:
  - name: goal
    description: The goal for this sprint (what we want to accomplish)
    required: true
  - name: duration
    description: Sprint duration in weeks (default 2)
    required: false
---

# Plan Sprint

ATLAS will create a comprehensive sprint plan, allocating work across the appropriate specialist agents.

## Instructions

When this command is invoked with a sprint goal, create a detailed sprint plan:

### 1. Analyze the Goal

First, understand the sprint goal in context of:
- Current roadmap phase (Phase 1: Language Foundation)
- Phase milestones and deliverables
- Dependencies between agents

### 2. Decompose Into Tasks

Break down the goal into specific, actionable tasks:
- Each task should be completable in 1-3 days
- Tasks should have clear acceptance criteria
- Identify dependencies between tasks

### 3. Assign to Agents

Match tasks to the most appropriate agent:
- **FORGE** - Architecture, design, API specs
- **RUST** - Rust implementation, compiler, runtime
- **CANVAS** - React/TypeScript, IDE frontend
- **SAGE** - Requirements, documentation
- **PIXEL** - UI/UX design, components
- **BRIDGE** - Protocol implementation
- **SENTINEL** - Testing, security
- **PIPELINE** - CI/CD, builds

### 4. Map Dependencies

Create a dependency graph showing:
- Which tasks block other tasks
- Critical path to completion
- Parallel workstreams

### 5. Define Success Criteria

Clear, measurable criteria for sprint completion.

## Output Format

```markdown
# Sprint Plan: [Sprint Name derived from goal]

## Overview

| Attribute | Value |
|-----------|-------|
| Goal | $ARGUMENTS |
| Duration | [2] weeks |
| Phase | Phase 1 - Language Foundation |
| Start Date | [Today] |
| End Date | [+2 weeks] |

---

## Task Allocation

### FORGE - Architecture
| Task | Priority | Est. | Acceptance Criteria |
|------|----------|------|---------------------|
| [Task 1] | High | 2d | [Criteria] |
| [Task 2] | Medium | 1d | [Criteria] |

### RUST - Implementation
| Task | Priority | Est. | Acceptance Criteria |
|------|----------|------|---------------------|
| [Task 1] | High | 3d | [Criteria] |

### CANVAS - Frontend
| Task | Priority | Est. | Acceptance Criteria |
|------|----------|------|---------------------|
| [Task 1] | Medium | 2d | [Criteria] |

### SENTINEL - Testing
| Task | Priority | Est. | Acceptance Criteria |
|------|----------|------|---------------------|
| [Task 1] | High | 1d | [Criteria] |

### PIPELINE - DevOps
| Task | Priority | Est. | Acceptance Criteria |
|------|----------|------|---------------------|
| [Task 1] | Low | 1d | [Criteria] |

---

## Dependencies

```
FORGE: Design Parser Architecture
    │
    ▼
RUST: Implement Lexer
    │
    ├──► RUST: Implement Parser
    │        │
    │        ▼
    │    SENTINEL: Parser Tests
    │
    ▼
CANVAS: LSP Integration
```

### Critical Path
1. [Task A] → 2. [Task B] → 3. [Task C]

### Parallel Workstreams
- **Stream 1**: FORGE design → RUST implement
- **Stream 2**: PIXEL design → CANVAS implement

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Medium | High | [Mitigation] |

---

## Success Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## Daily Standup Format

Each day, track progress:

### [Date]
| Agent | Yesterday | Today | Blockers |
|-------|-----------|-------|----------|
| RUST | [Done] | [Doing] | [None] |
| FORGE | [Done] | [Doing] | [None] |
```

## Example

**Input**: `/plan-sprint Implement the .sag lexer and basic parser`

**Creates sprint with**:
- FORGE tasks: Parser architecture design, AST node specification
- RUST tasks: Lexer implementation, parser implementation, error handling
- SENTINEL tasks: Lexer tests, parser tests
- PIPELINE tasks: CI workflow for tests

## Context

The sprint plan should reference:
- **Phase 1 Milestones**: 1.1 Language Spec, 1.2 Parser & AST, 1.3 TS Compiler, 1.4 LSP Core
- **Tech Stack**: Rust (logos + nom), TypeScript targets
- **Crate Structure**: sag-parser, sag-lexer, sag-codegen
