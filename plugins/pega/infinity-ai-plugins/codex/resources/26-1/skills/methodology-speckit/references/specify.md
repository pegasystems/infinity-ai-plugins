---
name: speckit-specify
description: Instruction for the specify step of SpecKit. Guides the agent to capture business intent, Pega context, desired outcome, constraints, and acceptance criteria — then creates a Rule-Application-UseCase instance named Spec_<FeatureName>. Does not determine rule types or implementation approach.
---

# Specify Instruction

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). `$ARGUMENTS` may contain:

Before proceeding, load and execute `methodology-speckit/references/constitution`.
This is a blocking precondition for the specify phase. Resolve the platform
constitution, then resolve the application constitution by calling `get-application`
to obtain the current application's `Rule-Application` `pzInsKey` and calling
`get-rule` with that key and `detail=full` to read `pyAppConstitution`. Build the
consolidated snapshot in active agent memory and associate it with this lifecycle. Do
not persist the snapshot in the spec rule, attachments, files, or conversation output.
If `pyAppConstitution` is absent or unavailable on the retrieved rule, use the platform
constitution unchanged. Do not create the spec if the snapshot cannot be built.

Then compile the resolved guidance into the constraint list and bind each constraint to
its tool parameter or payload field. The `create-rule` call for `Spec_<FeatureName>` is
itself a rule write and MUST satisfy every in-scope constraint. Set each bound value
explicitly; do not rely on a tool default to satisfy a constraint.

- A feature name and/or inline requirements — parse as before.
- A `Rule-Application-Requirement` instance key (e.g. `RULE-APPLICATION-REQUIREMENT EMPLOYEE CONFIGURESLABENEFIT!CONFIGURESLABENEFIT #20260827T104614.408 GMT`) — if detected, fetch the rule using `get-rule` and read its `pyDescription` field as the full requirements source. Use the rule name as the feature name unless the user provided a different one.
- A user story reference (e.g. `US-162` or `PEGA-AGILE-WORK US-162`) — if detected, resolve the `pzInsKey` and fetch the case via `get-case-details`; use `pyDescription` as the requirements source and `pyUserStoryAcceptanceCriteria` as the starting acceptance criteria. See **User story resolution** below.
- Any combination of the above — fetch all referenced artifacts and merge them as described in the requirements source resolution table.

**`pzInsKey` format for `Rule-Application-Requirement` and `Rule-Application-UseCase`:**

Both rule types share the same `pzInsKey` format. Example: `RULE-APPLICATION-REQUIREMENT EMPLOYEE CONFIGURESLABENEFITSENROLLMENT!CONFIGURESLA #20260827T104614.408 GMT`

Detect a `Rule-Application-Requirement` key by the presence of the `RULE-APPLICATION-REQUIREMENT` prefix at the start of the token. Detect a `Rule-Application-UseCase` key by the `RULE-APPLICATION-USECASE` prefix. Do not confuse the two — they are distinct rule types.

### Requirements source resolution

| `$ARGUMENTS` content | Action |
|---|---|
| Inline text (feature name, requirements, constraints) | Use directly as the requirements source |
| `Rule-Application-Requirement` instance key | Fetch via `get-rule`, use `pyDescription` as the requirements source |
| Both a key and additional inline text | Fetch the rule, then merge the inline text as supplementary requirements |
| User story reference (`US-162` or `PEGA-AGILE-WORK US-162`) | Resolve to a `pzInsKey` then fetch via `get-case-details`; use `pyDescription` as the requirements source and `pyUserStoryAcceptanceCriteria` as the acceptance criteria source — see **User story resolution** below |
| All three (inline text + `Rule-Application-Requirement` key + user story reference) | Fetch both the rule and the user story case in parallel; merge all three sources — user story `pyDescription` is primary, rule `pyDescription` is secondary, inline text is supplementary; union all acceptance criteria from `pyUserStoryAcceptanceCriteria` and inline text, deduplicating overlaps |
| Empty | **Stop and ask the user for the requirements before proceeding** — do not infer, assume, or continue without an explicit requirements source |

When a `Rule-Application-Requirement` instance is provided, do not ask the user to re-describe the requirements — treat `pyDescription` as the authoritative source and proceed directly to analysis.

When a user story reference is provided, do not ask the user to re-describe the requirements — treat the fetched case data as the authoritative source and proceed directly to analysis.

#### User story resolution

When `$ARGUMENTS` contains a user story reference (e.g. `US-162` or `PEGA-AGILE-WORK US-162`):

1. **Resolve the `pzInsKey`** — use `list-cases` with `objClass` set to `Pega-Agile-Work-UserStory` and search for the matching ID (e.g. `US-162`). Extract the `pzInsKey` from the result.
2. **Fetch case details** — call `get-case-details` with the resolved `pzInsKey`.
3. **Extract requirements** — use `pyDescription` as the full requirements source.
4. **Extract acceptance criteria** — use the `pyUserStoryAcceptanceCriteria` list entries as the starting set; convert each entry into a testable criterion in `pyAcceptanceCriteriaList`. Then review the full `pyDescription` and any inline context — if gaps remain (behaviors, constraints, or outcomes not covered by the existing criteria), derive and append additional criteria to ensure complete coverage. If the list is empty, derive all criteria from `pyDescription` as normal.
5. **Record the `pzInsKey`** — include it in the `Source:` line of `pyDescription` (see field table in Step 7).

## Core Principle

> Specify defines **what** Pega capability is required and **what** successful completion looks like. It must not determine which Pega rule types, rulesets, tools, APIs, or implementation sequence are required.

## Procedure

### 1. Capture Pega context

Ask the user only for what is not already known from `$ARGUMENTS` or the conversation context:

| Field | Required | Notes |
|-------|----------|-------|
| **Application** | Yes | Pega application the change belongs to — ask if not provided |
| **Case Type** | Only if case-type-specific | Omit for application-wide or structural changes |
| **Feature / Capability** | Yes | Derive from the full requirements context — the name must represent the overall feature or requirement, not echo the raw argument verbatim |
| **Existing Pega artifact** | If known | Existing rule, model, view, portal, data object, etc. |
| **Requested change** | Yes | What the user wants to add, modify, or remove — sourced from inline input or `Rule-Application-Requirement.pyDescription` |

Do not yet determine whether the change requires a `Rule-Obj-Property`, `Rule-Obj-Model`, or any other rule type.

### 2. Capture desired behavior and outcome

Derive current state and expected state from the requirements source (inline or `Rule-Application-Requirement.pyDescription`):

```text
Current:
<What is true today — what is missing or broken>

Expected:
<What should be true after the change — what the user or system can do>
```

Also capture:
- What existing behavior must be preserved
- What business outcome is expected

### 3. Preserve user implementation hints without acting on them

If the user provides implementation hints (e.g. "create a new property called Container Target"), capture them as **user intent** in the spec:

```text
Requested change:
Create a new property for Container Target.
```

Do not decide rule type, ruleset, tool, or API at this step. Those belong to the Plan phase.

### 4. Capture Pega-specific constraints

Capture constraints that affect the requirement:

- Existing behavior must not change
- Existing data model must be reused
- Feature may be scoped to a specific case type
- Platform or application boundary must be respected
- Existing rules must be preserved
- Backward compatibility is required

Do not capture implementation rules (e.g. "always call `pzSearchRule` before `pzUpdateRule`") — those belong in the relevant authoring skill.

### 5. Derive acceptance criteria

Do not always require the user to provide acceptance criteria. Derive reasonable, testable criteria from the requirement and present them for confirmation. Ask for clarification only when the requirement is ambiguous.

Example:

```text
Acceptance Criteria:
1. Portal model captures Container Target.
2. Container Target is available in the resulting model.
3. Existing Portal model behavior remains unchanged.
```

Acceptance criteria must be testable and scoped to the requested change.

### 6. Separate gaps from assumptions

If required information is missing, mark it explicitly rather than inventing an answer:

```text
Known:
Portal model should capture Container Target.

Unknown / Clarification needed:
Whether Container Target already exists as a property in the application.
```

Gaps are resolved in the clarify step — do not block the spec on them.

### 7. Create the Rule-Application-UseCase instance

Before creating the rule instance:
1. Load `methodology-rule-authoring` — follow its workflow for creating a rule.
2. Load `rules-rule-application-usecase` — read the package schema file as the source of truth for required fields, valid enum values, and auto-filled fields.

Follow these two steps in order — do not skip or reorder them:

**Step A — Collect all field values first.**
Within this phase, derive and resolve every field in the table below before making any tool call. All values must come from work done in this same specify phase: the Pega context gathered, the desired behavior and outcome captured, the implementation hints noted, the constraints identified, the acceptance criteria derived, and any gaps flagged. Do not call `create-rule` until every row in the table has a concrete value. Treat any unresolved row as a blocker. Do not defer collection to a later phase.

**Step B — Invoke `create-rule` exactly once.**
Only after all field values are confirmed, call `create-rule` with the complete payload in a single tool call. Do not follow it with an `update-rule` call. Every field, including `pyAcceptanceCriteriaList`, must be present in the payload.

| Field | Value |
|-------|-------|
| **Rule name** | `Spec_<FeatureName>` — derive from the overall feature or requirement context, PascalCase, no spaces (e.g. `Spec_SubmitFraudClaim`). Do not echo the raw `$ARGUMENTS` value — synthesise a name that accurately represents the full scope of the requirement. |
| **`pyLabel`** | `Spec_<FeatureName>` — same derived name; maximum 50 characters — truncate or abbreviate if needed |
| **`pyClassName`** | Case class of the application (e.g. `MyCo-MyApp-Work-FraudReview`) — use `list-casetypes` to resolve if not known |
| **`pyOwner`** | Feature name associated with this requirement — identifies the feature or capability area (e.g., `FraudReview`); must not be empty |
| **`pyProductName`** | Application name (e.g. `MyCo`) |
| **`pyDescription`** | Full specification text — current state, expected state, constraints, and gaps. Always prepend a `Source:` line as the **first line** to record the origin of the requirements. The `Source:` value is determined by the requirements origin detected in the `$ARGUMENTS` parsing and **User story resolution** steps above — it is not derived from the content of the requirements themselves. See the `Source:` line format table below. If sourced from a `Rule-Application-Requirement` instance, include the original `pyDescription` content plus any additional analysis. If sourced from a user story, include the fetched requirements content plus any additional analysis. |
| **`pyAcceptanceCriteriaList`** | One entry per acceptance criterion — **mandatory**; must fully cover the complete user intent; every desired outcome, constraint, and behavioral expectation from the requirement must be represented as a testable criterion |
| **`pyPurpose`** | Brief label identifying the intent or goal this spec fulfils — derive from the feature name (e.g. `FraudReview`, `BenefitName`). **Must be at most 15 characters** — truncate or abbreviate if needed. |
| **`pySpecFormat`** | `UserStory` |
| **`pyCategory`** | `Pending-Plan` |
| **`pyEstimatedDevelopmentEffort`** | Derive from scope and complexity — `Low` for simple single-rule changes, `Medium` for moderate multi-rule features, `High` for complex cross-cutting features with many dependencies |
| **`pyBusinessImpact`** | Derive from the business outcome — `Low` for minor improvements, `Medium` for significant capability additions, `High` for critical business processes or customer-facing features |

**`Source:` line format:**

The `Source:` value must reflect the actual origin of the requirements as resolved during `$ARGUMENTS` parsing — not the content or style of the requirements text. Even when requirements are passed as inline text, if they originated from a user story that was resolved to a `pzInsKey`, that `pzInsKey` is the source.

| Requirements origin | `Source:` line |
|---|---|
| Inline text only — no user story or `Rule-Application-Requirement` reference was present in `$ARGUMENTS` | `Source: Inline` |
| `Rule-Application-Requirement` only | `Source: <pzInsKey>` (e.g. `Source: RULE-APPLICATION-REQUIREMENT EMPLOYEE CONFIGURESLABENEFITSENROLLMENT!CONFIGURESLA #20260827T104614.408 GMT`) |
| User story resolved to a `pzInsKey` (whether passed as `US-162`, `PEGA-AGILE-WORK US-162`, or a full `pzInsKey`) | `Source: <pzInsKey>` (e.g. `Source: PEGA-AGILE-WORK US-162 ...`) — use the full resolved `pzInsKey` from the **User story resolution** step, not the short ID |
| Multiple sources | `Source: <pzInsKey>, <pzInsKey>, Inline` — list all that apply, comma-separated |

This step is **mandatory** — the spec must be persisted as a rule instance before the
phase is complete. The constitution snapshot remains in active agent memory and must
not be added to the rule payload. If the local snapshot is unavailable, report the
failure and stop.

### 8. Link the Rule-Application-Requirement to the spec (Rule-Application-Requirement source only)

This step applies **only** when one or more `Rule-Application-Requirement` instance keys were present in `$ARGUMENTS` and their `pzInsKey` values were resolved during requirements source resolution. Skip entirely if the requirements source is inline text or a user story only.

After `create-rule` succeeds and the `Spec_<FeatureName>` `pzInsKey` is known, call `run-data-page` with `dataPage=D_pxLinkRequirementToSpecification` and `dataPageType=page`, passing both parameters — both are mandatory:

| Parameter | Required | Value |
|-----------|----------|-------|
| `targetSpecificationInsKey` | **Yes** | `pzInsKey` of the newly created `Spec_<FeatureName>` rule |
| `requirementRuleInsKeys` | **Yes** | Comma-separated list of all `Rule-Application-Requirement` `pzInsKey` values resolved from `$ARGUMENTS` |

If the call fails, report the error to the user — do not suppress it. The spec rule itself is already created; this step links the requirement to it.

Present the created rule's `pzInsKey` to the user.

## Phase complete — mandatory stop

After presenting the `pzInsKey`, output exactly this and nothing more:

> **Specify complete.** The spec `<pyLabel>` has been saved.

Do not ask follow-up questions. Do not summarise next steps in detail. Do not invoke clarify, plan, tasks, or implementation. Wait for the user to explicitly invoke the next command.

## Rules

- Do not determine rule types, rulesets, tools, or APIs at this step.
- Do not invent missing context — mark it as a clarification gap.
- Derive acceptance criteria from the requirement; ask only when ambiguous.
- Creating the `Rule-Application-UseCase` instance is mandatory — do not skip it.
- **Link requirements when sourced from `Rule-Application-Requirement`.** After `create-rule` succeeds, call `D_pxLinkRequirementToSpecification` with the spec `pzInsKey` and all resolved requirement `pzInsKey` values. Skip this call entirely when the source is inline text or a user story only.
- Stop after the rule instance is created (and linked, if applicable) — do not proceed to the next lifecycle stage.
- Report constitution-gate evidence: the in-memory snapshot was created and source identities recorded, or report the gate failure and stop. Also state each in-scope constraint and the value applied to the `create-rule` call for the spec.
- **`Source:` must reflect the resolved origin, not the content.** If a user story `pzInsKey` was resolved during `$ARGUMENTS` parsing, that `pzInsKey` must appear in the `Source:` line — even when the requirements were passed as inline text. Write `Source: Inline` only when no user story or `Rule-Application-Requirement` reference was present in `$ARGUMENTS` at all.

