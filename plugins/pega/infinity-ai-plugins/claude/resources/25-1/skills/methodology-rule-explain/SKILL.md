---
name: methodology-rule-explain
description: "Load when the user asks to explain what an existing rule instance of any rule type does. Resolves one exact rule target and returns a focused, functionality-only explanation. Use /explain for a concise summary or /explain indetails for a deep walkthrough. This skill is read-only and must never perform rule authoring actions."
---

# Recipe: Explain an Existing Rule

Use this skill when the user asks to explain, describe, or understand an existing Pega rule instance of any rule type.
The purpose of this skill is to explain **what the rule does** — its functionality only, in natural language. Do not surface warnings, risks, or review findings; use `methodology-rule-review` for that.

> **🚨 MANDATORY — ALWAYS FETCH LATEST DATA**
> Every time this skill is invoked, you MUST call `get-rule(detail="full")` for the target rule to retrieve current state.
> Do not rely on cached, previously fetched, or user-supplied data. Always get the live rule version from the server.

## Explain Modes

| Mode | Trigger | Output |
|------|---------|--------|
| **Default** | `/explain [rule]` | Concise natural-language summary: what the rule is, what it does, what it returns or produces |
| **Detailed** | `/explain in details [rule]` | Full natural-language walkthrough: business intent, step-by-step execution, conditions, branches, dependencies, data interactions |

## Trigger Phrases

| Trigger pattern | Example |
|-----------------|---------|
| `/explain` | "/explain pyDefault" |
| `explain [rule]` | "explain ValidatePortfolio" |
| `what does [rule] do` | "what does pzSetContextBasedOnClass do" |
| `walk me through [rule]` | "walk me through InitializeContext" |
| `help me understand [rule]` | "help me understand this flow action" |
| `/explain in details` | "/explain in details InitializeContext" |
| `explain in detail [rule]` | "explain in detail ValidatePortfolio" |

## When to Use

| Situation | Use this recipe |
|-----------|-----------------|
| Rule behavior is unclear | User wants to know what the rule does |
| Quick functional summary needed | User wants a short answer before deciding next steps |
| Deep walkthrough requested | User explicitly asks for detailed or in-depth explanation |

## Inputs Needed

- Preferred: exact `pzInsKey`
- Fallback: rule name, type, and class context
- If `pzInsKey` is not available, ask the user for rule context before proceeding.

## Workflow

### Step 1: Resolve one exact rule

1. If the user provides `pzInsKey`, use it.
2. Otherwise resolve using `list-rules` or `search-rules`.
3. If multiple candidates match, present options and ask the user to choose.

Do not explain an ambiguous target.

### Step 2: Fetch the source rule

1. Call `get-rule(detail="full")` for the resolved target.
2. For **detailed mode only**: if the rule references other artifacts (flow actions, activities, data pages), fetch those with additional `get-rule` calls as needed.
3. Keep exploration scoped to explanation only. Do not modify any rule.

### Step 3: Build and return the explanation

Before generating output, determine mode from the current request only:
1. If the current request explicitly asks for detailed mode, use detailed mode for this query.
2. Otherwise use default concise mode for this query.

**Default mode** — return a concise response covering:

1. **What it is** — rule type and class context
2. **What it does** — core functionality explained in natural language
3. **What it produces** — output, status, or side effect

**Detailed mode** — return a full walkthrough covering:

1. **Business intent** — what user outcome this rule supports
2. **Execution path** — ordered steps, conditions, and branch outcomes
3. **Dependencies** — rules and artifacts this rule references
4. **Data interactions** — key properties read and written

## Output Contract

**Default mode:**

- `TargetRule`: canonical key and display name
- `Summary`: one-paragraph functionality description
- `Produces`: what the rule outputs or changes

**Detailed mode:**

- `TargetRule`: canonical key and display name
- `Overview`: business-level explanation
- `ExecutionWalkthrough`: ordered behavior with conditions and branches
- `Dependencies`: referenced rules and artifacts
- `DataImpact`: important fields and statuses read/written

When present, include `pzInsKey` in response entities so UI can render link callbacks.

## Call Discipline

| Rule | Agent behavior |
|------|----------------|
| One target at a time | Resolve one canonical rule before analysis |
| Evidence only | Do not infer behavior not visible in fetched rule data |
| Read-only | No create, copy, or update calls during explain flow |
| Functionality only | Do not surface warnings, risks, or review findings |
| Scope control | Analyze only user-requested rule; fetch dependencies only in detailed mode |
| Clarify ambiguity | Ask user when multiple candidate rules match |

## Anti-Patterns

- Explaining a rule without resolving the exact target
- Surfacing warnings or risks — use `methodology-rule-review` for that
- Mixing review or authoring changes into explain-only flow
- Presenting speculation as fact
- Fetching deep dependencies in default mode — keep it concise
- Expanding to unrelated case types or applications without user request
