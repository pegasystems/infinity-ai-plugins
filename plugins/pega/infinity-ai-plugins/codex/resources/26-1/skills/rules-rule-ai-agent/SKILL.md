---
name: rules-rule-ai-agent
description: Schema and authoring guide for Pega AI Agent rules (Rule-AI-Agent), including GenAI configuration, system prompts, tools, data sources, and agent examples. Requires Pega Infinity 25+ (08-25-01+).
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

### Full Agent Examples

| Skill | Description |
|-------|-------------|
| `Minimal AI Agent` | Minimal create payload with no tools or AI data sources |
| `Data Transform Authoring Agent` | Full Rule-AI-Agent example scoped to `Rule-Obj-Model` with one automation action tool |
| `Case Type Authoring Agent` | Full Rule-AI-Agent example scoped to `Rule-Obj-CaseType` with one automation action tool and one data page knowledge tool |
| `Delegating Insight Agent` | Full Rule-AI-Agent example that uses `pzAgentTools` to delegate insight generation to another agent |
| `Documentation Guidance Agent` | Full Rule-AI-Agent example that uses a Buddy-backed knowledge tool for documentation questions |

### List Property Examples (row/shape types)

| Skill | Description |
|-------|-------------|
| `pzActionTools entry - Automation backed Tool` | Action-tool row example (`Rule-AI-Tool`) for `pzActionTools` |
| `pzKnowledgeTools entry - Data Page backed Tool` | Knowledge-tool row example (`Rule-AI-Tool`) for `pzKnowledgeTools` — data page backed |
| `pzKnowledgeTools entry - Buddy backed Tool` | Knowledge-tool row example (`Rule-AI-Tool`) for `pzKnowledgeTools` — buddy backed |
| `pzKnowledgeTools entry - Section backed Tool` | Knowledge-tool row example (`Rule-AI-Tool`) for `pzKnowledgeTools` — section backed |
| `pzAgentTools entry - Agent` | Agent-tool row example (`Rule-AI-Tool`) for `pzAgentTools` |
| `pzCaseTypeTools entry - Case type backed Tool` | Case-type-tool row example (`Rule-AI-Tool`) for `pzCaseTypeTools` |
| `pzAIDataSources entry - Primary fields` | Data-source row example (`Embed-DataPage`) for `pzAIDataSources` — primary fields |
| `pzAIDataSources entry - Data model fields` | Data-source row example (`Embed-DataPage`) for `pzAIDataSources` — data model fields |
| `A2A External Agent` | External-agent connection example (`Rule-Connect-Agent`) for `pzExternalAgents` |
| `MCP Client Connection pzMCPClients- MCP connection` | MCP connection example (`Rule-Connect-MCP`) for `pzMCPClients` |

## Authoring notes

Rule-AI-Agent defines AI agents in Pega Infinity that assist developers with specific tasks. **Available from Pega Infinity 25+ (08-25-01 and above).**

Key concepts:

### Core Structure
- **pxObjClass**: Always `Rule-AI-Agent`
- **pyClassName**: Applies-to class (e.g., `@baseclass`, `Rule-Obj-Model`, `Rule-Obj-CaseType`)
- **pyPurpose**: Identifier name for the agent (e.g., `pzDataTransformAgent`)
- **pyAgentScope**: Scope of the agent — `Other`, `Application`, `CaseType`, or `Data`

### GenAI Configuration

`pyGenAIConfig` → `pyModelConfiguration` nested object:

Before creating or updating `pyModelConfiguration`, execute `run-data-page` for `D_pxAIModelsForCoachOrAgent` with `dataPageType: "list"`. Use the selected row from the `data` array in the response (note: this data page returns results under `data`, not the usual `pxResults`) as the source of truth for model metadata. When no model is specified, prefer the row where `pyIsDefaultForAgent` is `true`. Do not rely on a hard-coded repository model catalog.

| Field | Description | Example |
|-------|-------------|---------|
| `pyModelId` | Logical model ID | `pega-default-smart`, `bedrock/anthropic/Claude-Sonnet-45/1` |
| `pyProvider` | LLM provider/hosting backend | `bedrock`, `azure`, `vertex` |
| `pyModelName` | Display name | `Pega-Default-Smart(Claude-Sonnet-45)` |
| `pyCreator` | Model vendor (differs from provider) | `anthropic`, `openai`, `google`, `amazon` |

> `pyProvider` is the hosting backend; `pyCreator` is the model maker. E.g., Azure OpenAI: `pyProvider: "azure"`, `pyCreator: "openai"`.

Copy these values from the selected `data` row when present:

- `pyModelId`
- `pyModelName`
- `pyProvider`
- `pyDescription`
- `pySupportedCapabilities.pyIsFunctionSupported`
- `pySupportedCapabilities.pyIsJsonModeSupported`
- `pySupportedCapabilities.pyIsMutlmodalSupported`
- `pySupportedCapabilities.pyIsStreamingSupported`
- `pySupportedCapabilities.pyIsparallelFunctionSupported`
- `pyModelDeprecationInfo` (when present)
- Full `pyModelParameters` list

If `pyModelDeprecationInfo` is present and non-empty, warn the user that the selected model is scheduled for deprecation before proceeding.

Examples in this skill may show illustrative model IDs, but the live data page result is authoritative for the target environment.

### GenAI Definition

`pyGenAIDef` fields:

| Field | Description |
|-------|-------------|
| `pySystemPrompt` | System prompt text guiding agent behavior |
| `pyGuardrailsPrompt` | Restrictions and rules the agent must follow |
| `pyResponseStylePrompt` | Response formatting instructions |
| `pyExamples` | Array of `{pxObjClass, pyExample, pyInstruction}` — example queries and instructions |

### Tools and Data Sources

> **MANDATORY**: After creating the agent rule, you MUST ask the user whether they want to configure tools and AI data sources. Do NOT skip this step. Always present the full list of configurable tool types and data sources to the user for selection before considering the agent creation complete.


When authoring an agent, first ask the user whether they want to configure tools. If the user wants to configure tools, prompt the corresponding tool list to the user for selection based on the tool types below.

| List Property | Type | Row shape | `pyCategory` meaning | Notes |
|---------------|------|-----------|----------------------|-------|
| `pzActionTools` | Action | `Rule-AI-Tool` | Display label: `Automation`, `Flow action` | Inspect sibling live rules if you need exact `pyIntentActionPage` wiring. |
| `pzKnowledgeTools` | Knowledge | `Rule-AI-Tool` | Display label: `Data page`, `Buddy`, `Section` | In inspected live rules, `pyIntentActionPage.pyCategory` was not a reliable knowledge-row discriminator. |
| `pzAgentTools` | Agent | `Rule-AI-Tool` | Display label: `Agent` | In inspected live rules, `pyIntentActionPage.pyCategory` was not a reliable agent-row discriminator. |
| `pzCaseTypeTools` | Case type | `Rule-AI-Tool` | Display label: `Case type` | Example shape only — no non-empty live rows were available in the inspected environment. |
| `pzExternalAgents` | External agent | `Rule-Connect-Agent` | n/a | Requires `pyEnableExternalAccess` on the referenced agent. |
| `pzMCPClients` | MCP | `Rule-Connect-MCP` | n/a | Example shape only — no non-empty live rows were available in the inspected environment. |
| `pzAIDataSources` | Data source | `Embed-DataPage` | Free-text display label/description | No `pyIntentActionPage`; prompt user to select data pages; multiple allowed. |

Row-shape guidance:
- `pzActionTools`, `pzKnowledgeTools`, `pzAgentTools`, and `pzCaseTypeTools` use Rule-AI-Tool rows. Treat `pyCategory` as the primary display label and inspect sibling live rules in your app if you need exact `pyIntentActionPage` wiring.
- `pzCaseTypeTools` rows use display `pyCategory: "Case type"`. Follow the example shape and verify against sibling rules in your app when possible.
- `pzAIDataSources` rows use Embed-DataPage shape with `pyDPName`, `pyCategory`, optional `pyApplyDataTransform`, optional `pyDPParams`, and optional `pzRuleParameters`. These rows do not use `pyIntentActionPage`.
- `pzExternalAgents` rows use Rule-Connect-Agent shape.
- `pzMCPClients` rows use Rule-Connect-MCP shape. The included example is schema-based because no non-empty live rows were available in the inspected environment.
- When a data source parameter is required (`pyParametersParamReq` non-zero), include the matching key in `pyDPParams`.

### Decision Guide: pzAIDataSources vs pzKnowledgeTools

> **MANDATORY**: For every `Rule-AI-Agent` create or update, use this decision guide for every agent and for each data page considered as additional context (`pzAIDataSources`).

| Pattern | When to use | Runtime behavior | Token impact |
|---------|-------------|------------------|--------------|
| `pzAIDataSources` | Agent needs the data consistently as baseline context | Loaded during agent deployment/warm-up | Higher (data is preloaded) |
| `pzKnowledgeTools` (data-page-backed `Rule-AI-Tool`) | Data should be fetched only when a user query requires it | Retrieved on demand | Lower (best-practice default) |

> **MANDATORY**: On every `Rule-AI-Agent` create or update, when a data page is proposed for `pzAIDataSources`, always ask for confirmation on the intended approach before applying changes. Do not skip this step.
- Continue with `pzAIDataSources` (always-available context), or
- Switch to knowledge-tool pattern (on-demand retrieval).

> **MANDATORY EXECUTION RULES (EVERY TIME)**:
> - Apply this decision-and-confirmation step for every case, every request, and every `Rule-AI-Agent` create/update.
> - Do not treat a prior case decision as reusable for a later case.
> - Do not treat a prior data-page decision as reusable for a different data page.
> - If multiple data pages are proposed, run this confirmation loop for each data page.

If the user chooses the knowledge-tool pattern, first check for an existing data-page-backed `Rule-AI-Tool` that uses the required data page and is accessible from the agent's class; if one exists, reuse it under `pzKnowledgeTools`. Otherwise, create a new `Rule-AI-Tool` backed by the provided data page and configure it under `pzKnowledgeTools`.

Do not configure the same data page in both `pzAIDataSources` and `pzKnowledgeTools` at the same time unless the user explicitly requests and accepts the token tradeoff.

### Common Patterns
- `pyVersionNumber: v2` indicates modern schema
- `pyAgentVersion: 1.0.0` is the standard agent version

### Pitfalls
- **Pega version requirement**: Rule-AI-Agent requires Pega Infinity 25+ (08-25-01+)
- Do not add `pyPagesAndClasses`; it is not needed for Rule-AI-Agent authoring in this skill
- System prompts can be very long — truncate for examples
- Tools must reference existing Rule-AI-Tool instances
- Data sources must reference existing Data Pages
