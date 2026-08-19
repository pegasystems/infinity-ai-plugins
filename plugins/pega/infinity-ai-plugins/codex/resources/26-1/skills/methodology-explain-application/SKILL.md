---
name: methodology-explain-application
description: "Load when answering questions about the current Pega application -- app stats, workflows, case types, data objects. Uses get-application as the primary source before any rule-level exploration."
---

Use `get-application` as the **single primary source** for application understanding questions.

## Trigger phrases

Treat these as application-state requests:
- current application, app overview, explain application, application summary
- application stats, app stats, current state, state of the app
- workflows present, case types in app, data objects in app, personas in app

When intent matches, do **not** start with `search-rules` or multiple `get-rule` calls.

## Workflow

### Step 1: Determine app context

| Situation | Action |
|-----------|--------|
| Both `appName` and `appVersion` known | Proceed to Step 2 |
| Neither known | Call `get-application` with no parameters (discovers default app) |
| Only one known | Ask for the missing value |

### Step 2: Fetch application payload

**Tool:** `get-application`
**Parameters:** `appName`, `appVersion` (both optional), `detail="summary"` (default)

The summary includes: application label/description, case types, lifecycle structures
(stages/processes/steps), data objects, and personas.

**Decision gate:** If the payload answers the question, stop and respond. Only escalate
if a specific requested field is missing.

### Step 3: Build response from payload

| Section | Source fields |
|---------|---------------|
| Application definition | `pyDADInfo.pyLabel`, `pyDADInfo.pyDescription` |
| Stats | Counts of `pyCandidateCaseTypes[]`, `pyCandidateDataObjects[]`, `pyCandidatePersonas[]` |
| Workflows | Case types → `pyDCDInfo` → `pyCandidateStages[]` → `pyCandidateStageProcesses[]` → `pyCandidateStageSteps[]` |
| Data objects | `pyCandidateDataObjects[]` → `pyCandidateFields[]` with types and references |

Use resolved labels (persona/object names), not raw GUIDs.

### Step 4: Offer deep dive

After the summary, ask whether the user wants:
- workflow-by-workflow walkthrough
- field-level data model details
- rule-level implementation drill-down

## Call discipline

| Rule | Guidance |
|------|----------|
| Minimum-call | Start with exactly one `get-application` call |
| Stop condition | If payload contains the answer, stop tool-calling |
| Escalation condition | Only when a required detail is absent — state missing field(s) first |
| No over-fetching | Never fetch flows/rules "just in case" |

## Escalation path

Use rule-level exploration only if:
- User explicitly asks for implementation details, OR
- `get-application` summary lacks a specific technical detail

Escalation sequence:
1. `search-rules` to locate artifacts
2. `get-rule detail="summary"` first
3. `get-rule detail="full"` only when raw fields required

## Server version discovery

To find the Pega platform version, search for `Rule-RuleSet-Version` rules named `Pega-RULES`.
The highest `08-XX-YY` pattern maps to the Infinity release year: `08-24` = Infinity '24,
`08-25` = Infinity '25. The patch (`YY`) indicates update level.

## Output template

1. **Application overview** (purpose)
2. **Current stats** (case types/data objects/personas counts)
3. **Workflows present** (case types + lifecycle highlights)
4. **Data objects present** (object + key fields/references)
5. **Next options** (ask for deep dive preference)

## Anti-patterns

- Don't begin with many rule-level calls
- Don't provide only `appName` or only `appVersion` — provide both or neither
- Don't run additional tools when the answer is already available
- Don't dump full raw payload by default
- Don't expose noisy internals (`pyGUID`, `pxObjClass`) unless debugging
