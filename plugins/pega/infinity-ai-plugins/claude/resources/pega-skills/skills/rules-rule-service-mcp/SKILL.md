---
name: rules-rule-service-mcp
description: Load when authoring Rule-Service-MCP rules. Covers tool configuration (pzMCPTools, pzCaseTypeTools), MCP version settings, and the mandatory pre-creation workflow for selecting AI tools.
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|-------|-------------|
| `Minimal MCP Service` | Smallest valid Rule-Service-MCP create payload -- MCP service with no custom tools. |
| `MCP Service with Custom Tools` | MCP service with custom tools configured for case management and knowledge agent integration. |
| `MCP Service with Case Type Tools` | MCP service with case type tools configured to expose specific case types as MCP tools. |
| `MCP Service with Multiple Categories` | MCP service with tools spanning automation and data page categories |

## Mandatory Pre-Creation Workflow: Tool Configuration

**Before creating a Rule-Service-MCP, you MUST complete the following interactive
steps. Do NOT skip this workflow — an MCP service without tools is useless.**

1. **List available Rule-AI-Tool instances** — call `list-rules` with
   `ruleType=Rule-AI-Tool` to discover all available tools in the application.
   For each tool, call `get-rule` to retrieve its full details (especially
   `pyIntentActionPage.pyCategory` and `pyIntentActionPage.pyClassName`).
2. **Separate tools by category into two groups:**
   - **Case-type tools (`pzCaseTypeTools`)** — those with
     `pyIntentActionPage.pyCategory: "Rule-Obj-CaseType"`
   - **Non-case-type tools (`pzMCPTools`)** — those with
     `pyIntentActionPage.pyCategory` other than `"Rule-Obj-CaseType"`
     (e.g., `"Rule-Obj-Activity"`, `"Data page"`)
3. **Present each group separately and ask the user to select tools for each group
   independently.** This ensures the user explicitly chooses which tools go into
   `pzCaseTypeTools` and which go into `pzMCPTools`.

   **For case-type tools (`pzCaseTypeTools`):** Present a list showing each tool's
   **pyLabel**, **pyRuleName**, **pyIntentDescription**, and **case type class**
   (`pyIntentActionPage.pyClassName`). Ask the user which case-type tools to
   configure. If no case-type tools exist, inform the user and skip this group.

   **For non-case-type tools (`pzMCPTools`):** Present a separate list showing each
   tool's **pyLabel**, **pyRuleName**, **pyCategory**
   (`pyIntentActionPage.pyCategory`), and **pyIntentDescription**. Ask the user
   which non-case-type tools to configure. If no non-case-type tools exist, inform
   the user and skip this group.

4. **Wait for explicit confirmation** on both groups before proceeding. The user
   may select tools from one group, both groups, or neither.
5. **If no Rule-AI-Tool instances exist at all**, inform the user that tools must
   be created first before an MCP service can be configured, and stop.
6. **If the user explicitly declines all tools from both groups**, confirm they
   want to create an empty service (stub) before proceeding.

Only after the user has confirmed their tool selection should you proceed to create
the Rule-Service-MCP rule with the selected tools in `pzMCPTools` and/or
`pzCaseTypeTools`.

## Authoring Notes

### Identity key

An MCP Service is uniquely identified by `pyClassName` + `pyRuleName`. The `pyServiceName`
field defines the endpoint routing name and typically matches `pyRuleName`.

### MCP version

`pyMCPVersion` specifies the MCP protocol version (e.g., `01-01-01`). This determines
which MCP protocol features are available to connecting clients.

### Enabled state

Set `pyIsMCPServiceEnabled` explicitly in every payload. Use `"true"` when at least
one tool is configured (in `pzMCPTools` or `pzCaseTypeTools`) so the service is
enabled and accessible at the endpoint URL. Use `"false"` for stub services with
no tools.

### Tool types

The service exposes tools through two arrays. Follow the
**Mandatory Pre-Creation Workflow** above to populate these — never create a
Rule-Service-MCP without first presenting available tools to the user.

- **pzMCPTools** -- Non-case-type tools (those with `pyIntentActionPage.pyCategory`
  other than `"Rule-Obj-CaseType"`, e.g., `"Rule-Obj-Activity"`, `"Data page"`).
- **pzCaseTypeTools** -- Case-type tools (`pyIntentActionPage.pyCategory: "Rule-Obj-CaseType"`).

For every tool entry in either array:

- **pyPurpose** -- The `pyRuleName` of an existing Rule-AI-Tool instance. This becomes
  the tool name visible to MCP clients (e.g., `pxGetCaseTypes`). Must reference an existing
  Rule-AI-Tool — never use case type class IDs, labels, or arbitrary strings.
- **pyCategory** -- The exact `pyIntentActionPage.pyCategory` value from the referenced
  Rule-AI-Tool instance (e.g., `"Rule-Obj-Activity"`, `"Data page"`,
  `"Rule-Obj-CaseType"`). Do not use mapped labels like `"Automation"`.

**Important:** Never guess or fabricate `pyPurpose` values. The value must always be
the `pyRuleName` of an existing `Rule-AI-Tool` instance. If no suitable Rule-AI-Tool
instances exist, inform the user that tools need to be created first before they can
be configured on the service.


### Class scoping

- Use `@baseclass` for application-wide MCP services (most common); use a narrower
  class only when the service must be constrained to a specific class hierarchy.
- For `pzCaseTypeTools`, preserve the case type class from the referenced
  Rule-AI-Tool (`pyIntentActionPage.pyClassName`) when presenting/confirming tool
  selections with the user.
- For `pzMCPTools` (non-case-type), keep the class context defined by the
  referenced Rule-AI-Tool; do not invent or remap class scopes in the MCP service.
- Typical backing tool classes include `Pega-API-CaseManagement`, `Assign-`, and
  `@baseclass`, depending on the operation exposed by each Rule-AI-Tool.
