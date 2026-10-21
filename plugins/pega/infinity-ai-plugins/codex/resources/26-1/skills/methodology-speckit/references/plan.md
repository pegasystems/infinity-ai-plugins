---
name: speckit-plan
description: Instruction for the plan step of SpecKit. Reads the Spec_<FeatureName> Rule-Application-UseCase instance, derives a sequenced development plan across all required Pega rule types, and attaches the plan as Plan_<FeatureName>.md to the existing spec rule via D_pxCreateSpecAttachments.
---

# Plan Instruction

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). `$ARGUMENTS` may contain a feature name, additional planning constraints, extra instructions, or any combination. Parse the full content — extract the feature name if present to locate the `Spec_<FeatureName>` rule instance, and treat any remaining content as additional constraints or guidance to apply during planning.

Before proceeding, load and execute `methodology-speckit/references/constitution`.
Validate the canonical snapshot in active agent memory and perform the source-identity
freshness check. If the in-memory snapshot is missing or invalid, load the current
platform constitution and application constitution extension, resolve them, and create
a new session-local snapshot before continuing. If an existing source changed, pause
for explicit rebaseline approval, do not silently replace it.

Then compile the resolved guidance into the constraint list and bind each constraint to
its tool parameter or payload field. Apply every in-scope constraint to the
`update-rule` call made on the spec rule in this phase. Freshness alone is not
compliance.

## Goal

Read the `Spec_<FeatureName>` rule instance, derive the full set of Pega rules needed to implement the feature in the correct build order, and persist the plan by attaching a `Plan_<FeatureName>.md` file to the existing spec rule via the `D_pxCreateSpecAttachments` data page.

## Procedure

### 1. Resolve the spec rule instance

Parse `$ARGUMENTS` to extract the following:

- **`pzInsKey`** — if a full Pega instance key is present (e.g. `RULE-APPLICATION-USECASE EMPLOYEE CONFIGURESLABENEFITSENROLLMENT!CONFIGURESLA #20260827T104614.408 GMT`), use it directly with `get-rule` to fetch the spec. Skip name-based lookup.
- **Feature name** — if no `pzInsKey` is found, extract the feature name and locate the `Spec_<FeatureName>` rule instance via `get-rule`.
- **Inline context** — any remaining content in `$ARGUMENTS` after extracting the key or name is treated as additional planning constraints or instructions. Carry it forward to step 3.

If neither a `pzInsKey` nor a feature name can be resolved, infer the feature name from the current conversation context.

If the spec rule instance cannot be found, stop and instruct the user to run `/speckit.specify <FeatureName>` first.

### 2. Extract spec context

From the fetched spec rule, read:

- **`pyDescription`** — the primary context for planning. Decode HTML entities and strip tags to get plain text. This is the authoritative description of what needs to be built.
- **`pyAcceptanceCriteriaList[*].pyCriteria`** — each criterion adds a testable constraint to drive rule selection and sequencing.
- **Inline context from `$ARGUMENTS`** — any user-supplied constraints, scope overrides, or instructions passed alongside the key or feature name supplement but do not replace the spec content.
- **User story source** — scan the first line of `pyDescription` for a `Source:` line. If it contains a `pzInsKey` that begins with `PEGA-AGILE-WORK` (e.g. `Source: PEGA-AGILE-WORK US-162 ...`), record it as the **user story pzInsKey**. This value is used when composing the plan markdown header and is carried forward to the implement phase.

Combine these three sources as the planning context for steps 3–6.

### 3. Confirm the spec is ready

Verify the fetched spec has no unresolved gaps or items marked "Unknown / Clarification needed". If gaps remain, instruct the user to run `/speckit.clarify` first.

### 4. Identify required rule types

Analyse the spec context assembled in step 2 — `pyDescription`, acceptance criteria,
and inline constraints — to derive the full set of Pega artifacts required. Do not
assume a fixed rule set.

Resolve rule types by loading relevant rule-type skills as needed (for example via
`search-skills` followed by `get-skill`) and use those skills as the source of truth
for applicability and sequencing decisions in this plan.

### 5. Sequence the steps

Order rules to respect build dependencies:

- Properties before flows, views, data pages, and validate rules
- Data pages before flows and flow actions that consume them
- Flows before flow actions and SLAs
- Validate rules before the flow actions that invoke them
- Connectors before data pages that use them
- Activities before flows that call them

### 6. Check for reuse

Before adding a rule to the plan, consider whether an existing rule already fulfils the need. Flag reuse opportunities rather than creating duplicates.

### 7. Identify blockers

If a dependency cannot be resolved (e.g. a required connector does not exist), flag it explicitly as a blocker with the reason.

### 8. Attach the plan to the spec rule

The plan must be persisted as an attachment on the existing `Spec_<FeatureName>` rule — **no new Rule-Application-UseCase rule is created in this phase**.

#### 8a. Compose the plan markdown

**This step is mandatory and must not be skipped.** Produce the full plan as a single markdown document containing:
- A `Source:` header line — include the `Spec_<FeatureName>` rule's `pzInsKey`. If a user story pzInsKey was detected in step 2, also include it (e.g. `Source: RULE-APPLICATION-USECASE ... | User Story: PEGA-AGILE-WORK US-162 ...`).
- Each plan step with: step number, rule name, rule type, purpose, dependencies, iteration, and release

Name the file `Plan_<FeatureName>.md`.

#### 8b. Call D_pxCreateSpecAttachments

**This step is mandatory and must not be skipped.** Invoke the `D_pxCreateSpecAttachments` data page as a **list** (POST). Pass `pzInsKey` and `filePageJSON` as `dataViewParameters` in the request body. The `filePageJSON` value must be the JSON object serialised as a string.

`filePageJSON` structure (before serialisation) — all fields are mandatory:

| Field | Type | Value |
|-------|------|-------|
| `pyFileSource` | string | Raw markdown content from step 8a (plain text) |
| `pyLabel` | string | `"Plan_<FeatureName>"` (filename without extension) |
| `pyCategory` | string | `"New"` |
| `pyFileMimeType` | string | `"md"` |
| `pyFileType` | string | `"md"` |
| `pyNote` | string | `"Plan_<FeatureName>"` (filename without extension) |
| `pyFileName` | string | `"Plan_<FeatureName>.md"` |

Example payload shape:

```json
{
  "dataViewParameters": {
    "pzInsKey": "<pzInsKey of the Spec_<FeatureName> rule>",
    "filePageJSON": "{\"pyFileSource\":\"<raw markdown content>\",\"pyLabel\":\"Plan_<FeatureName>\",\"pyCategory\":\"New\",\"pyFileMimeType\":\"md\",\"pyFileType\":\"md\",\"pyNote\":\"Plan_<FeatureName>\",\"pyFileName\":\"Plan_<FeatureName>.md\"}"
  }
}
```

The response is a list of all attachments on the spec rule, including the newly created one, returned under the `data` node.

**This call is mandatory and must not be skipped under any circumstances.** Do not proceed to step 8c or the phase-complete stop until this call has been made and confirmed successful.

If the call fails, stop immediately, report the error to the user, and do not advance.
Do not present a phase-complete message until `D_pxCreateSpecAttachments` has returned
a success response and `Plan_<FeatureName>.md` is confirmed attached to the spec rule.

#### 8c. Verify attachment and update the Spec_<FeatureName> rule's pyCategory

Before calling `update-rule`, confirm the attachment actually persisted:

1. Call `get-rule` on the `Spec_<FeatureName>` rule with `detail=full`.
2. Scan `pyCustomFields` for an entry where `pyCFieldName` matches `Plan_<FeatureName>.md`.
3. If the entry is **not found**, stop immediately, report the failure to the user, and do not call `update-rule`.
4. Only if the entry **is found**, proceed to update the spec rule via `update-rule` setting `pyCategory` to `Pending-Tasks`.

**Do not call `update-rule` unless step 2 confirms the attachment is present.**

Present the spec rule's `pzInsKey`, the attachment filename (`Plan_<FeatureName>.md`), and the full plan table to the user for confirmation.

## Phase complete — mandatory stop

**Before outputting the phase-complete message, verify:**
1. `D_pxCreateSpecAttachments` was called and returned success.
2. `Plan_<FeatureName>.md` is confirmed attached to the spec rule.
3. `pyCategory` on the spec rule has been updated to `Pending-Tasks`.

If any of the above have not been completed, do them now before proceeding. Do not output the phase-complete message until all three are satisfied.

After all three are confirmed, output exactly this and nothing more:

> **Plan complete.** The plan `Plan_<FeatureName>.md` has been attached to `<pyLabel>`.

Do not ask follow-up questions. Do not invoke tasks or implementation. Wait for the user to explicitly invoke the next command.

## Rules

- Accept a `pzInsKey` directly in `$ARGUMENTS` to fetch the spec without name-based lookup — do not require a feature name when a key is provided.
- Always read `pyDescription` from the fetched spec rule and use it as primary planning context.
- Combine `pyDescription`, acceptance criteria, and user-supplied inline context — do not plan from inline context alone.
- Do not proceed without first fetching the `Spec_<FeatureName>` rule instance.
- Do not author any rules at this step — produce the plan only.
- Do not hardcode rule types — derive them from the spec.
- Keep the plan scoped strictly to the current spec — do not expand scope without user confirmation.
- Do not create a new Rule-Application-UseCase rule — the plan is attached to the existing spec rule as `Plan_<FeatureName>.md`.
- Attaching `Plan_<FeatureName>.md` via `D_pxCreateSpecAttachments` is mandatory — do not skip it, do not defer it, and do not present the phase-complete message until it succeeds.
- Stop after the attachment call succeeds — do not proceed to the next lifecycle stage.
- Report constitution-gate evidence: the in-memory snapshot was verified and source identities are unchanged, or report the rebaseline or gate failure and stop. Also state each in-scope constraint and the value applied to this phase's rule write.
