# SageSyn Language Syntax Reference

## File Structure

A `.ssag` file consists of one or more top-level declarations:

```ssag
// Comments use double slashes

agent MyAgent {
  // Agent body
}

skill MySkill {
  // Skill body
}

type CustomType {
  // Type definition
}
```

## Agent Declaration

```ssag
agent AgentName {
  // Metadata (optional)
  description: "Agent description"
  version: "1.0.0"

  // Model configuration (optional)
  model:
    provider: anthropic | openai | google | custom
    name: "model-name"
    context_window: 128000
    temperature: 0.7

  // State (optional)
  state {
    history: Message[]
    context: Record<string, any>
  }

  // Tools
  tool tool_name(param: type) -> return_type {
    description: "Tool description"
    // Tool implementation or MCP binding
  }

  // Event handlers
  on event_name {
    // Handler body
  }
}
```

## Tool Definition

```ssag
// Inline tool
tool greet(name: string) -> string {
  description: "Greet a person"
  return "Hello, " + name
}

// MCP-bound tool
tool search(query: string) -> SearchResults {
  description: "Search the web"
  mcp_server: brave_search
  mcp_tool: search
}

// Tool with multiple parameters
tool create_user(
  name: string,
  email: string,
  role: optional<string>
) -> User {
  description: "Create a new user"
}
```

## Event Handlers

```ssag
// User message handler
on user_message {
  let response = process(message)
  emit response(response)
}

// Tool result handler
on tool_result {
  if result.success {
    emit response(result.data)
  } else {
    emit error(result.error)
  }
}

// Lifecycle handlers
on agent_start {
  // Initialize state
}

on agent_stop {
  // Cleanup
}
```

## Expressions

### Variables

```ssag
let name = "value"           // Immutable binding
var counter = 0              // Mutable binding
const MAX_RETRIES = 3        // Constant
```

### Control Flow

```ssag
// Conditionals
if condition {
  // ...
} else if other_condition {
  // ...
} else {
  // ...
}

// Pattern matching
match value {
  "option1" => handle_option1(),
  "option2" => handle_option2(),
  _ => handle_default()
}

// Loops
for item in collection {
  process(item)
}

while condition {
  // ...
}
```

### Functions

```ssag
// Function declaration
fn process_message(msg: Message) -> Response {
  // Function body
  return create_response(msg)
}

// Arrow function
let double = (x: number) => x * 2

// Async function
async fn fetch_data(url: string) -> Data {
  let response = await http.get(url)
  return response.json()
}
```

## Types

### Primitive Types

```ssag
string      // Text
number      // Integer or float
boolean     // true or false
null        // Null value
```

### Composite Types

```ssag
// Arrays
array<string>           // Array of strings
string[]                // Shorthand

// Records/Maps
record<string, number>  // String keys, number values

// Tuples
tuple<string, number>   // Fixed-length, typed

// Optional
optional<string>        // String or null
string?                 // Shorthand
```

### Custom Types

```ssag
type User {
  id: string
  name: string
  email: string
  role: optional<Role>
  created_at: timestamp
}

type Role = "admin" | "user" | "guest"

type ApiResponse<T> {
  success: boolean
  data: optional<T>
  error: optional<string>
}
```

## Keywords

| Keyword | Purpose |
|---------|---------|
| `agent` | Declare an agent |
| `skill` | Declare a skill |
| `tool` | Declare a tool |
| `type` | Declare a custom type |
| `on` | Event handler |
| `emit` | Emit an event |
| `let` | Immutable binding |
| `var` | Mutable binding |
| `const` | Constant |
| `fn` | Function declaration |
| `async` | Async function |
| `await` | Await async operation |
| `if` | Conditional |
| `else` | Else branch |
| `match` | Pattern matching |
| `for` | For loop |
| `while` | While loop |
| `return` | Return value |
| `import` | Import module |
| `export` | Export declaration |

## Comments

```ssag
// Single-line comment

/*
 * Multi-line
 * comment
 */

/// Documentation comment
/// Supports markdown
agent DocumentedAgent {
  /// This tool does something
  tool my_tool() -> void
}
```
