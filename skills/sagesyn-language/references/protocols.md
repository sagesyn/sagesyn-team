# SageSyn Protocol Integration

SageSyn treats MCP, A2A, and AG-UI as first-class language constructs.

## MCP (Model Context Protocol)

MCP enables agents to connect to external tools and services.

### Declaring MCP Servers

```ssag
agent ResearchAgent {
  protocols:
    mcp:
      servers:
        // stdio transport (local process)
        - name: filesystem
          transport: stdio
          command: "npx"
          args: ["-y", "@modelcontextprotocol/server-filesystem"]
          env:
            ROOT_DIR: "/workspace"

        // SSE transport (remote server)
        - name: brave_search
          transport: sse
          url: "https://mcp.sagesyn.ai/brave"
          headers:
            Authorization: "Bearer ${env.BRAVE_API_KEY}"

        // HTTP transport
        - name: database
          transport: http
          url: "http://localhost:3000/mcp"
}
```

### Binding Tools to MCP

```ssag
agent SearchAgent {
  protocols:
    mcp:
      servers:
        - name: brave_search
          transport: sse
          url: "https://mcp.example.com/brave"

  // Tool bound to MCP server
  tool web_search(query: string) -> SearchResults {
    description: "Search the web"
    mcp_server: brave_search
    mcp_tool: search
  }

  // Tool with parameter mapping
  tool read_file(path: string) -> string {
    description: "Read a file"
    mcp_server: filesystem
    mcp_tool: read_file
    params:
      file_path: path  // Map param name
  }

  on user_message {
    let results = web_search(message.query)
    emit response(format_results(results))
  }
}
```

### MCP Resources

```ssag
agent DataAgent {
  protocols:
    mcp:
      servers:
        - name: database
          transport: http
          url: "http://localhost:3000/mcp"

  // Access MCP resources
  on agent_start {
    // Subscribe to resource
    let users = mcp.resource("database", "users://all")

    // Resource with URI template
    let user = mcp.resource("database", `users://${user_id}`)
  }
}
```

## A2A (Agent-to-Agent Protocol)

A2A enables agent discovery and communication.

### Declaring A2A Capabilities

```ssag
agent ResearchAgent {
  description: "Conducts deep research on topics"

  protocols:
    a2a:
      // Make this agent discoverable
      discoverable: true

      // Declare capabilities
      capabilities:
        - research
        - summarize
        - fact_check

      // Agent card metadata
      card:
        name: "Research Agent"
        version: "1.0.0"
        author: "SageSyn"
        icon: "search"
        tags: ["research", "ai", "knowledge"]

      // Access control
      accept_from:
        - agent://sagesyn/*          // All SageSyn agents
        - agent://trusted-partner/*   // Partner agents
      reject_from:
        - agent://untrusted/*        // Block untrusted

      // Rate limiting
      rate_limit:
        requests_per_minute: 60
        concurrent: 5
}
```

### Calling Other Agents

```ssag
agent OrchestratorAgent {
  protocols:
    a2a:
      discoverable: false  // Don't expose to others

  on user_message {
    // Discover agents with capability
    let researchers = await a2a.discover(
      capability: "research",
      limit: 3
    )

    // Call a specific agent
    let result = await a2a.call(
      agent: "agent://research-agent/v1",
      action: "research",
      input: {
        topic: message.query,
        depth: "comprehensive"
      },
      timeout: 60000
    )

    // Call multiple agents in parallel
    let results = await a2a.parallel([
      { agent: "agent://research-agent/v1", action: "research", input: query },
      { agent: "agent://fact-check-agent/v1", action: "verify", input: query }
    ])

    emit response(synthesize(results))
  }
}
```

### Agent Card (Generated)

When an agent is compiled, an A2A card is generated:

```json
{
  "agent_id": "agent://sagesyn/research-agent/v1",
  "name": "Research Agent",
  "version": "1.0.0",
  "description": "Conducts deep research on topics",
  "capabilities": ["research", "summarize", "fact_check"],
  "input_schema": {
    "type": "object",
    "properties": {
      "topic": { "type": "string" },
      "depth": { "type": "string", "enum": ["quick", "moderate", "comprehensive"] }
    }
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "summary": { "type": "string" },
      "sources": { "type": "array" }
    }
  },
  "endpoints": {
    "a2a": "https://agents.sagesyn.ai/research-agent/a2a"
  }
}
```

## AG-UI (Agent-User Interface Protocol)

AG-UI enables rich streaming to frontends.

### Declaring AG-UI

```ssag
agent InteractiveAgent {
  protocols:
    ag_ui:
      // Enable event streaming
      stream_events: true

      // Declare UI capabilities
      ui_components:
        - markdown
        - code_block
        - progress_bar
        - table
        - chart
        - form
        - approval_request

      // Event configuration
      events:
        buffer_size: 100
        heartbeat_interval: 5000
}
```

### Emitting UI Events

```ssag
agent ProcessingAgent {
  protocols:
    ag_ui:
      stream_events: true
      ui_components: [markdown, code_block, progress_bar]

  on process_request {
    // Progress updates
    emit ag_ui.progress({
      id: "main",
      percent: 0,
      label: "Starting..."
    })

    // Stream markdown
    emit ag_ui.markdown({
      content: "## Processing your request\n\nAnalyzing input..."
    })

    // Update progress
    emit ag_ui.progress({
      id: "main",
      percent: 50,
      label: "Halfway there..."
    })

    // Show code
    emit ag_ui.code_block({
      language: "python",
      content: generated_code,
      filename: "output.py"
    })

    // Complete
    emit ag_ui.progress({
      id: "main",
      percent: 100,
      label: "Complete!"
    })
  }
}
```

### Interactive Components

```ssag
agent ApprovalAgent {
  protocols:
    ag_ui:
      stream_events: true
      ui_components: [approval_request, form]

  on dangerous_action {
    // Request user approval
    let approved = await ag_ui.approval_request({
      title: "Confirm Action",
      description: "This will delete all files. Are you sure?",
      actions: [
        { id: "confirm", label: "Yes, delete", style: "danger" },
        { id: "cancel", label: "Cancel", style: "secondary" }
      ]
    })

    if approved.action == "confirm" {
      perform_deletion()
    }
  }

  on collect_info {
    // Show a form
    let response = await ag_ui.form({
      title: "Configuration",
      fields: [
        { id: "name", type: "text", label: "Name", required: true },
        { id: "count", type: "number", label: "Count", default: 10 },
        { id: "options", type: "select", label: "Option",
          choices: ["A", "B", "C"] }
      ]
    })

    process_config(response)
  }
}
```

### AG-UI Event Types

| Event | Purpose | Payload |
|-------|---------|---------|
| `ag_ui.markdown` | Render markdown | `{ content: string }` |
| `ag_ui.code_block` | Show code | `{ language, content, filename? }` |
| `ag_ui.progress` | Progress bar | `{ id, percent, label? }` |
| `ag_ui.table` | Render table | `{ headers, rows }` |
| `ag_ui.chart` | Render chart | `{ type, data, options }` |
| `ag_ui.approval_request` | Get approval | `{ title, description, actions }` |
| `ag_ui.form` | Show form | `{ title, fields }` |
| `ag_ui.status` | Status update | `{ status, message }` |
| `ag_ui.error` | Show error | `{ code, message, details? }` |

## Protocol Composition

Agents can use multiple protocols together:

```ssag
agent FullStackAgent {
  protocols:
    mcp:
      servers:
        - name: code_tools
          transport: stdio
          command: "code-mcp-server"

    a2a:
      discoverable: true
      capabilities: [code_generation, code_review]

    ag_ui:
      stream_events: true
      ui_components: [markdown, code_block, approval_request]

  tool generate_code(spec: string) -> Code {
    mcp_server: code_tools
    mcp_tool: generate
  }

  on code_request {
    emit ag_ui.progress({ id: "gen", percent: 0, label: "Generating..." })

    let code = generate_code(request.spec)

    emit ag_ui.code_block({
      language: code.language,
      content: code.content
    })

    let review = await a2a.call(
      agent: "agent://code-reviewer/v1",
      action: "review",
      input: code
    )

    emit ag_ui.markdown({ content: review.feedback })
  }
}
```
