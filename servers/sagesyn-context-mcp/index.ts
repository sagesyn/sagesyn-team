#!/usr/bin/env bun
/**
 * SageSyn Context MCP Server
 *
 * Provides tools for accessing SageSyn project context:
 * - Agent information
 * - Roadmap phases and milestones
 * - Team status
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";

// Load data files
const dataDir = process.env.SAGESYN_DATA_DIR || join(import.meta.dir, "../../data");

interface Agent {
  id: string;
  name: string;
  role: string;
  scope: string;
  color: string;
  skills: string[];
  phase1: number;
  phase2: number;
  phase3: number;
  phase4: number;
  collaborates: string[];
  outputs: string[];
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  status: "upcoming" | "in_progress" | "completed";
}

interface RoadmapPhase {
  id: number;
  name: string;
  quarter: string;
  goal: string;
  description: string;
  milestones: Milestone[];
  keyDeliverables: string[];
}

function loadData<T>(filename: string): T {
  const path = join(dataDir, filename);
  const content = readFileSync(path, "utf-8");
  return JSON.parse(content) as T;
}

const agents = loadData<Agent[]>("agents.json");
const roadmap = loadData<RoadmapPhase[]>("roadmap.json");

// Create MCP server
const server = new McpServer({
  name: "sagesyn-context",
  version: "0.1.0",
});

// Tool: Get agent context
server.tool(
  "get_agent_context",
  "Get detailed context and capabilities for a SageSyn agent",
  {
    agentId: z
      .string()
      .describe(
        "Agent ID (atlas, sage, forge, pixel, canvas, rust, bridge, sentinel, pipeline)"
      ),
  },
  async ({ agentId }) => {
    const agent = agents.find((a) => a.id === agentId);

    if (!agent) {
      const validIds = agents.map((a) => a.id).join(", ");
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              error: `Agent '${agentId}' not found`,
              validAgentIds: validIds,
            }),
          },
        ],
      };
    }

    // Get current phase (Phase 1 for now)
    const currentPhase = roadmap.find((p) => p.id === 1);
    const effortKey = `phase${currentPhase?.id || 1}` as keyof Agent;
    const currentEffort = agent[effortKey] as number;

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            agent: {
              ...agent,
              currentPhaseEffort: currentEffort,
            },
            currentPhase: currentPhase
              ? {
                  id: currentPhase.id,
                  name: currentPhase.name,
                  quarter: currentPhase.quarter,
                }
              : null,
          }),
        },
      ],
    };
  }
);

// Tool: Get roadmap phase
server.tool(
  "get_roadmap_phase",
  "Get detailed information about a roadmap phase including milestones and deliverables",
  {
    phaseId: z.number().min(1).max(4).describe("Phase number (1-4)"),
  },
  async ({ phaseId }) => {
    const phase = roadmap.find((p) => p.id === phaseId);

    if (!phase) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              error: `Phase ${phaseId} not found`,
              validPhases: [1, 2, 3, 4],
            }),
          },
        ],
      };
    }

    // Get agent efforts for this phase
    const agentEfforts = agents.map((agent) => {
      const effortKey = `phase${phaseId}` as keyof Agent;
      return {
        id: agent.id,
        name: agent.name,
        role: agent.role,
        effort: agent[effortKey] as number,
      };
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            phase,
            agentEfforts: agentEfforts.sort((a, b) => b.effort - a.effort),
          }),
        },
      ],
    };
  }
);

// Tool: Get team status
server.tool(
  "get_team_status",
  "Get an overview of all SageSyn agents and the current roadmap phase",
  {},
  async () => {
    const currentPhase = roadmap.find((p) => p.id === 1);

    const teamOverview = agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      color: agent.color,
      currentEffort: agent.phase1,
      skills: agent.skills,
    }));

    // Sort by current phase effort
    teamOverview.sort((a, b) => b.currentEffort - a.currentEffort);

    // Identify high-priority agents (effort >= 80%)
    const highPriority = teamOverview
      .filter((a) => a.currentEffort >= 80)
      .map((a) => a.name);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            currentPhase: currentPhase
              ? {
                  id: currentPhase.id,
                  name: currentPhase.name,
                  quarter: currentPhase.quarter,
                  goal: currentPhase.goal,
                  milestones: currentPhase.milestones,
                }
              : null,
            team: teamOverview,
            highPriorityAgents: highPriority,
            totalAgents: agents.length,
          }),
        },
      ],
    };
  }
);

// Tool: Get agent collaborations
server.tool(
  "get_agent_collaborations",
  "Get the collaboration matrix for agents - who works with whom",
  {
    agentId: z
      .string()
      .optional()
      .describe("Optional: specific agent ID to get collaborations for"),
  },
  async ({ agentId }) => {
    if (agentId) {
      const agent = agents.find((a) => a.id === agentId);
      if (!agent) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: `Agent '${agentId}' not found` }),
            },
          ],
        };
      }

      const collaborators =
        agent.collaborates[0] === "all"
          ? agents.filter((a) => a.id !== agentId).map((a) => a.id)
          : agent.collaborates;

      const collaboratorDetails = collaborators.map((id) => {
        const collab = agents.find((a) => a.id === id);
        return collab
          ? { id: collab.id, name: collab.name, role: collab.role }
          : { id, name: "Unknown", role: "Unknown" };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              agent: { id: agent.id, name: agent.name, role: agent.role },
              collaboratesWith: collaboratorDetails,
              outputs: agent.outputs,
            }),
          },
        ],
      };
    }

    // Return full collaboration matrix
    const matrix = agents.map((agent) => ({
      agent: { id: agent.id, name: agent.name },
      collaboratesWith:
        agent.collaborates[0] === "all"
          ? agents.filter((a) => a.id !== agent.id).map((a) => a.id)
          : agent.collaborates,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ collaborationMatrix: matrix }),
        },
      ],
    };
  }
);

// Tool: Search agents by skill
server.tool(
  "search_agents_by_skill",
  "Find agents that have a specific skill or capability",
  {
    skill: z.string().describe("Skill to search for (case-insensitive)"),
  },
  async ({ skill }) => {
    const skillLower = skill.toLowerCase();

    const matchingAgents = agents.filter((agent) =>
      agent.skills.some((s) => s.toLowerCase().includes(skillLower))
    );

    if (matchingAgents.length === 0) {
      // Return all skills for reference
      const allSkills = [...new Set(agents.flatMap((a) => a.skills))].sort();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              message: `No agents found with skill matching '${skill}'`,
              availableSkills: allSkills,
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            skill,
            matchingAgents: matchingAgents.map((a) => ({
              id: a.id,
              name: a.name,
              role: a.role,
              matchingSkills: a.skills.filter((s) =>
                s.toLowerCase().includes(skillLower)
              ),
              allSkills: a.skills,
            })),
          }),
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SageSyn Context MCP server running on stdio");
}

main().catch(console.error);
