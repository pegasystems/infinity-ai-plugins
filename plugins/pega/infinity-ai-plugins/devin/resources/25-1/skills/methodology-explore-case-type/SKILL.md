---
name: methodology-explore-case-type
description: "Load when exploring a case type to find what needs work. Drills down incrementally through lifecycle levels (case type → flows → assignments → properties → SLAs) and stops at the first actionable issue."
---

Explore a case type **incrementally** — fetch one level at a time, check for issues,
and stop as soon as you find the first actionable item. Do not audit the entire case
type upfront.

## Core principle

The parent delegates exploration **one level at a time**. Each subtask:
1. Completes its level
2. Returns findings and instance keys
3. Lets the parent decide whether to continue

**You will only be asked to do one level.** Complete it and return your findings.

## Parent orchestration

### Across levels: stop on issues before drilling deeper

When a subtask returns issues at Level N, **do not** automatically proceed to Level N+1:
1. Present issues to the user
2. Ask whether to fix now or continue exploring
3. Only delegate Level N+1 after user explicitly says to continue

### Within levels: one item at a time

When a level has multiple items (e.g., multiple stage flows), explore them sequentially:
1. Explore first item
2. Present findings to user
3. Ask before continuing to next item

**Do not queue all items upfront.** The user may want to fix issues in the first item
before seeing the second.

## Application scoping

Use `applicationNames` parameter on every `list-rules` call to scope results to the
current application. Without this, `list-rules` returns platform rules that are
irrelevant to the case type being explored.

## Drill-down levels

| Level | What to inspect | Stop if |
|-------|-----------------|---------|
| 0 | User stories (if provided by parent) | — |
| 1 | Case type rule | Missing description, no references, broken status |
| 2 | Stage flows (one at a time) | Stub steps, blank configs, draft mode |
| 3 | Assignments and views | No view configured, view has no fields |
| 4 | Properties and data model | Stub properties, missing properties |
| 5 | SLAs, routing, access | Missing SLAs, default routing, no persona access |

### Level 1: Case type rule

**Tool:** `get-rule` with `detail="summary"` (use instance key if parent provides it,
otherwise `list-rules` with `className` + `ruleType="Rule-Obj-CaseType"` + `applicationNames`)

**Check for:**
- Missing or blank `pyDescription`
- References list — does it point to flows, properties, views?
- Any warnings in rule status

### Level 2: Stage flows

**Tool:** `get-rule` with flow's instance key, `detail="full"`

**Check for:**

| Issue | Pattern |
|-------|---------|
| Stub utility step | Calls `pzRunDataTransform` with no DataTransformName |
| Blank GenAI step | `pyServiceName` is empty |
| Unconfigured decision | No rule configured |
| Empty Generate Document | No template |
| Default assignment | No flow action or default routing |
| Missing stage-change params | Utility step missing parameters |
| Missing notification | Notification step with no rule |
| Draft mode | Flow not checked in |

### Level 3: Assignments and views

**Tool:** `get-rule` on flow action, then `get-rule` on view

**Check for:**
- Flow action with no view configured
- View with no fields or only default fields
- Missing properties referenced by view

### Level 4: Properties and data model

**Tool:** `list-rules` with `ruleType="Rule-Obj-Property"`, case type's class, `applicationNames`

**Check for:**
- Stub properties (no type, no label)
- Missing properties referenced by views/flows
- Data transform steps referencing nonexistent properties

### Level 5: SLAs, routing, access

**Check for:**
- SLA configuration on assignment steps (`pySLAType: Never` = not configured)
- Routing configuration (workbaskets, skill-based routing)
- Persona access (which access groups can see this case type)

## What to return

At whatever level you stop:

1. **Level reached** (e.g., "Stopped at Level 2: first stage flow")
2. **Issues found** — specific problems with rule names, step names, instance keys
3. **What's working** — brief confirmation of levels that passed
4. **Instance keys for next level** — so parent can delegate without re-discovery

## Anti-patterns

| Don't | Do instead |
|-------|------------|
| Call `get-application` during exploration | Use application name from parent context |
| Call `list-rules` without `ruleType` | Always provide `ruleType` |
| Explore multiple flows in one subtask | One flow per subtask, let parent orchestrate |
| Skip `applicationNames` filter | Always include to avoid platform rules |

## Mapping to Blueprint Delivered stages

| Level | Blueprint Delivered stage |
|-------|--------------------------|
| 1 | Foundation (import validation) |
| 2 | Foundation + Automation |
| 3 | Case & Usability |
| 4 | Foundation + Security & Data |
| 5 | Case & Usability + Security & Data |
