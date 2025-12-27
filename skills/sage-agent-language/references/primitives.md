# SageSyn Built-in Primitives

## Core Primitives

### String Operations

```sag
// Concatenation
let greeting = "Hello, " + name

// Interpolation
let message = `Hello, ${name}!`

// Methods
string.length           // Length
string.upper()          // Uppercase
string.lower()          // Lowercase
string.trim()           // Trim whitespace
string.split(delim)     // Split to array
string.replace(a, b)    // Replace
string.contains(sub)    // Check contains
string.starts_with(s)   // Check prefix
string.ends_with(s)     // Check suffix
```

### Number Operations

```sag
// Arithmetic
a + b                   // Addition
a - b                   // Subtraction
a * b                   // Multiplication
a / b                   // Division
a % b                   // Modulo
a ** b                  // Power

// Methods
number.round()          // Round
number.floor()          // Floor
number.ceil()           // Ceiling
number.abs()            // Absolute value
number.to_string()      // Convert to string
```

### Array Operations

```sag
// Creation
let arr = [1, 2, 3]
let empty: array<number> = []

// Access
arr[0]                  // Get element
arr.length              // Length
arr.first()             // First element
arr.last()              // Last element

// Transformation
arr.map(fn)             // Transform elements
arr.filter(fn)          // Filter elements
arr.reduce(fn, init)    // Reduce to value
arr.flat()              // Flatten nested
arr.flat_map(fn)        // Map and flatten

// Search
arr.find(fn)            // Find first match
arr.find_index(fn)      // Find index
arr.contains(val)       // Check contains
arr.index_of(val)       // Get index

// Modification
arr.push(val)           // Add to end
arr.pop()               // Remove from end
arr.shift()             // Remove from start
arr.unshift(val)        // Add to start
arr.concat(other)       // Concatenate
arr.slice(start, end)   // Get slice
arr.reverse()           // Reverse
arr.sort(fn)            // Sort
```

### Record Operations

```sag
// Creation
let obj = { name: "Alice", age: 30 }
let empty: record<string, any> = {}

// Access
obj.name                // Dot notation
obj["name"]             // Bracket notation
obj.keys()              // Get keys
obj.values()            // Get values
obj.entries()           // Get key-value pairs

// Modification
obj.set(key, val)       // Set value
obj.delete(key)         // Delete key
obj.merge(other)        // Merge records
obj.has(key)            // Check key exists
```

## Agent-Specific Primitives

### Context

```sag
// Agent context
context.agent_id        // Current agent ID
context.session_id      // Session ID
context.model           // Model config
context.tools           // Available tools
context.state           // Agent state

// Message context
context.message         // Current message
context.history         // Message history
context.turn_count      // Turn number
```

### Events

```sag
// Emit events
emit response(data)           // Send response
emit error(message)           // Send error
emit status(status)           // Send status
emit progress(percent)        // Send progress
emit stream(chunk)            // Stream chunk

// Event types
type MessageEvent {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: timestamp
}

type ToolEvent {
  tool: string
  args: record<string, any>
  result: any
}
```

### Workflow Primitives

```sag
// Perceive - gather input
perceive {
  from: trigger.user_input
  validate: schema.InputSchema
}

// Reason - think about input
reason {
  depth: 3                    // Reasoning depth
  strategy: chain_of_thought  // Reasoning strategy
}

// Execute - take action
execute {
  tools: [tool1, tool2]
  parallel: true              // Run in parallel
  timeout: 30000              // Timeout ms
}

// Respond - generate output
respond {
  format: markdown            // Output format
  stream: true                // Stream response
}
```

## Protocol Primitives

### MCP (Model Context Protocol)

```sag
// MCP server declaration
protocols:
  mcp:
    servers:
      - name: filesystem
        transport: stdio
        command: "npx"
        args: ["-y", "@modelcontextprotocol/server-filesystem"]
      - name: brave_search
        transport: sse
        url: "https://mcp.example.com/brave"

// Using MCP tools
tool search(query: string) -> Results {
  mcp_server: brave_search
  mcp_tool: web_search
}
```

### A2A (Agent-to-Agent)

```sag
// A2A configuration
protocols:
  a2a:
    discoverable: true
    capabilities:
      - research
      - summarize
      - translate
    accept_from:
      - agent://trusted-agent/*

// Calling another agent
let result = await a2a.call(
  agent: "agent://research-agent/v1",
  action: "research",
  input: { topic: query }
)
```

### AG-UI (Agent-User Interface)

```sag
// AG-UI configuration
protocols:
  ag_ui:
    stream_events: true
    ui_components:
      - progress_bar
      - code_block
      - markdown

// Emitting UI events
emit ag_ui.progress({ percent: 50, label: "Processing..." })
emit ag_ui.code({ language: "python", content: code })
emit ag_ui.markdown({ content: "## Results\n..." })
```

## Utility Primitives

### JSON

```sag
json.parse(string)      // Parse JSON string
json.stringify(value)   // Convert to JSON string
json.valid(string)      // Check if valid JSON
```

### HTTP

```sag
http.get(url, options)      // GET request
http.post(url, body, opts)  // POST request
http.put(url, body, opts)   // PUT request
http.delete(url, opts)      // DELETE request
```

### Time

```sag
time.now()              // Current timestamp
time.parse(string)      // Parse time string
time.format(ts, fmt)    // Format timestamp
time.diff(a, b)         // Difference
time.add(ts, duration)  // Add duration
```

### Logging

```sag
log.debug(message)      // Debug level
log.info(message)       // Info level
log.warn(message)       // Warning level
log.error(message)      // Error level
```
