---
name: Sage Agent Language
description: This skill should be used when the user asks to "write .sag code", "understand agent syntax", "create agent definitions", "use language primitives", "compile agents", "define tools", "create handlers", or needs guidance on the Sage Agent Programming Language syntax, semantics, or compilation.
version: 0.1.0
---

# Sage Agent Programming Language

The Sage Agent Programming Language (`.sag`) is a domain-specific language for defining AI agents that compile to TypeScript, Python, or Go.

## Language Overview

**File Extension**: `.sag`
**Paradigm**: Declarative, event-driven
**Typing**: Static, structural

## Core Syntax

### Agent Definition

```sag
agent WeatherAgent {
  description: "Provides weather information"
  version: "1.0.0"

  model:
    provider: anthropic
    name: claude-sonnet-4
    context_window: 128000

  tool get_weather(city: string) -> WeatherData {
    description: "Fetch weather for a city"
    mcp_server: weather_service
  }

  on user_message {
    let weather = get_weather(message.city)
    emit response(format_weather(weather))
  }
}
```

### Type System

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text values | `"hello"` |
| `number` | Numeric values | `42`, `3.14` |
| `boolean` | True/false | `true`, `false` |
| `array<T>` | Typed arrays | `["a", "b"]` |
| `record<K, V>` | Key-value maps | `{key: "value"}` |
| `optional<T>` | Nullable values | `null` or value |

### Built-in Primitives

See `references/primitives.md` for complete list.

### Protocol Integration

See `references/protocols.md` for MCP, A2A, and AG-UI syntax.

## Compilation

```bash
# Compile to TypeScript
sag compile agent.sag --target typescript

# Compile to Python
sag compile agent.sag --target python

# Compile to Go
sag compile agent.sag --target go

# Validate syntax only
sag check agent.sag

# Run directly (development)
sag run agent.sag --input '{"message": "hello"}'
```

## Additional Resources

### Reference Files
- **`references/syntax.md`** - Complete syntax reference
- **`references/primitives.md`** - Built-in primitives
- **`references/protocols.md`** - Protocol integration

### Examples
- **`examples/basic-agent.sag`** - Simple agent
- **`examples/multi-agent.sag`** - Multi-agent system
- **`examples/mcp-server.sag`** - MCP server agent
