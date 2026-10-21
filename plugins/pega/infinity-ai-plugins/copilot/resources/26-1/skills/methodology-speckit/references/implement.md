---
name: speckit-implement
description: Instruction for the implementation step of SpecKit. Reads the Task_<FeatureName>.md attachment from the Spec_<FeatureName> Rule-Application-UseCase instance (stored as a Rule-File-Binary rule) and authors each backlog item through the ChangeRequest workflow in dependency order, one rule at a time. No new Rule-Application-UseCase instance is created in this phase.
---

# Implementation Instruction

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). `$ARGUMENTS` may contain a feature name, specific authoring instructions, scope overrides, or any combination. Parse the full content — extract the feature name if present to locate the `Spec_<FeatureName>` rule instance, and treat any remaining content as additional instructions to apply during authoring.

Before proceeding, load and execute `methodology-speckit/references/constitution`.
Validate the canonical snapshot in active agent memory and perform the source-identity
freshness check. If the in-memory snapshot is missing or invalid, load the current
platform constitution and application constitution extension, resolve them, and create
a new session-local snapshot before continuing. If an existing source changed, pause
for explicit rebaseline approval and verify the replacement in-memory snapshot before
authoring. Do not silently replace an existing snapshot.

Then compile the resolved guidance into the constraint list and bind each constraint to
its tool parameter or payload field. Every rule authored in this phase MUST satisfy
every in-scope constraint. Freshness alone is not compliance.

## Goal

Read the `Task_<FeatureName>.md` attachment from the `Spec_<FeatureName>` rule instance and author every backlog item through the Pega ChangeRequest workflow, one rule at a time, in dependency order.

## Procedure

### 1. Resolve the spec rule instance and its tasks attachment

Parse `$ARGUMENTS` to extract the following:

- **`pzInsKey`** — if a full Pega instance key is present (e.g. `RULE-APPLICATION-USECASE EMPLOYEE CONFIGURESLABENEFITSENROLLMENT!CONFIGURESLA #20260827T104614.408 GMT`), use it directly with `get-rule` to fetch the spec. Skip name-based lookup.
- **Feature name** — if no `pzInsKey` is found, extract the feature name and locate the `Spec_<FeatureName>` rule instance via `get-rule` or `list-rules`.
- **Inline context** — any remaining content in `$ARGUMENTS` after extracting the key or name is treated as specific authoring instructions or scope overrides. Carry it forward during authoring.

If neither a `pzInsKey` nor a feature name can be resolved, infer the feature name from the current conversation context.

If the `Spec_<FeatureName>` rule instance cannot be found, stop and instruct the user to run `/speckit.specify <FeatureName>` first.

#### Reading the Task_<FeatureName>.md attachment

The `Task_<FeatureName>.md` file is stored as a `Rule-File-Binary` attachment on the spec rule. Attachments are recorded in the `pyCustomFields` map on the spec rule — each entry contains:

| Field | Description |
|-------|-------------|
| `pyCFieldName` | Filename of the attachment (e.g. `Task_<FeatureName>.md`) |
| `pyCFileKey` | `pzInsKey` of the corresponding `Rule-File-Binary` rule |

To retrieve the content:

1. Read the spec rule via `get-rule` with `detail=full`.
2. Scan `pyCustomFields` for the entry where `pyCFieldName` matches `Task_<FeatureName>.md`.
3. Take the `pyCFileKey` value — this is the `pzInsKey` of the `Rule-File-Binary` rule.
4. Call `get-rule` with that `pzInsKey` and `detail=full` to fetch the binary rule.
5. Read the **`pyFileSource`** field directly — it contains the plain-text markdown backlog.
6. **User story source** — scan the first line of the tasks markdown for a `Source:` header. If it contains a `pzInsKey` that begins with `PEGA-AGILE-WORK` (e.g. `User Story: PEGA-AGILE-WORK US-162 ...`), record it as the **user story pzInsKey**. If not found in the tasks markdown, also check the `pyDescription` of the spec rule itself for a `Source:` line containing a `PEGA-AGILE-WORK` pzInsKey. Carry this value forward for use in step 11.

If `Task_<FeatureName>.md` cannot be found as an attachment on the spec rule, stop and instruct the user to run `/speckit.tasks <FeatureName>` first.

### 2. Load the authoring prerequisite

Load `methodology-rule-authoring` before authoring the first rule. Apply it for every rule in the backlog.

### 3. Initialize the authored-rules tracker

Before authoring begins, initialize an in-memory list to track every rule created or updated during this phase. For each rule authored, immediately capture the following properties from the `create-rule` or `update-rule` response — **do not defer to a later `get-rule` call**:

| Property | Source from create/update response |
|----------|-----------------------------------|
| `pzInsKey` | `pzInsKey` (full instance key) |
| `pxInsName` | `pxInsName` (short instance name) |
| `pyRuleName` | `pyRuleName` |
| `pyClassName` | `pyClassName` (applies-to class) |
| `pyLabel` | `pyLabel` |
| `pyRuleSet` | `pyRuleSet` |
| `pyRuleSetVersion` | `pyRuleSetVersion` |
| `pyProductName` | `pyProductName` |
| `pyProductVersion` | `pyProductVersion` |
| `pyRuleAvailable` | `pyRuleAvailable` |

Also record the rule type class (e.g. `Rule-Obj-Activity`) and its human-readable label (e.g. `Activity`) based on the rule being authored. This tracking eliminates extra `get-rule` calls when populating `pyLinkedImps` at the end of the implement phase.

### 4. Select the next unblocked item

Work through the backlog in dependency order. Pick the first item where all dependencies are already complete. Skip blocked items and inform the user. Repeat steps 5–8 for every item in the backlog until all unblocked items are authored — do not stop after the first item.

### 5. Load the rule-type skill

Before authoring each rule, use `search-skills` to find the relevant `rules-*` skill for that rule type and load it. Apply its guidance for field values, constraints, and validation.

### 6. Author the rule

Before calling `create-rule`, `update-rule`, or `copy-rule`, run the constitution
pre-write check:

1. Re-read the constraint list compiled at the start of this phase.
2. Identify every constraint whose scope covers this write.
3. Set the bound parameter or payload field explicitly to the required value. Where a
   constraint binds to an optional parameter, omitting it is a violation even when the
   call succeeds, because the tool substitutes its own default silently.
4. If an in-scope constraint cannot be satisfied, stop and ask the user. Do not fall
   back to a default or substitute target.

Create or update the rule through the ChangeRequest process. Do not skip the ChangeRequest workflow for any rule regardless of size or simplicity. **Immediately after a successful `create-rule` or `update-rule`, capture the required tracking properties from the response into the authored-rules tracker (see step 3).**

### 7. Verify the rule

After authoring, confirm:
- `pyRuleFormStatus` on the rule is `Good` (no errors) — check this via `get-rule` after saving
- The rule satisfies every in-scope constitution constraint, confirmed against the
  values returned by `get-rule` rather than the values intended in the request
- Acceptance criteria for this backlog item are satisfied
- No unintended side effects on existing rules

If `pyRuleFormStatus` is not `Good`, stop and present the errors to the user before proceeding to the next item.

If the saved rule violates an in-scope constraint, stop and report the violation to the
user before authoring the next item. Do not continue and reconcile later.

### 8. Mark the item complete and continue

Report the rule name, its validation status, and what was set. Then move to the next unblocked item in dependency order.

### 9. Handle blockers

If an item cannot be authored due to an unresolved external dependency:
- Skip it
- Inform the user of the blocker
- Continue with remaining unblocked items

### 10. Update the spec rule's pyCategory and pyLinkedImps

Once all unblocked items are authored, update the `Spec_<FeatureName>` rule via `update-rule` with both changes in a single call:

1. Set `pyCategory` to `Pending-Review`.
2. Populate `pyLinkedImps` with one entry per rule created or updated during this implement phase.

Build each `pyLinkedImps` entry **from the authored-rules tracker populated during step 6** — do not call `get-rule` again for each authored rule. Map the tracked fields as follows:

| `pyLinkedImps` field | Source | Required |
|----------------------|--------|----------|
| `pxObjClass` | `"Data-Rule-Summary"` (fixed value) | **Yes** |
| `pzInsKey` | Tracked `pzInsKey` | **Yes** |
| `pyRuleKey` | Tracked `pzInsKey` (same value) | **Yes** |
| `pxInsName` | Tracked `pxInsName` | **Yes** |
| `pyRuleName` | Tracked `pyRuleName` (or `pyLabel` if absent) | **Yes** |
| `pyClassName` | Tracked `pyClassName` (applies-to class) | **Yes** |
| `pyClass` | Rule type class (e.g. `"Rule-Obj-Flow"`) | **Yes** |
| `pyClassLabel` | Human-readable rule type label (e.g. `"Flow"`) | **Yes** |
| `pyLabel` | Tracked `pyLabel` | No |
| `pyProductName` | Tracked `pyProductName` (or empty string if absent) | No |
| `pyProductVersion` | Tracked `pyProductVersion` (or empty string if absent) | No |
| `pyRuleAvailable` | Tracked `pyRuleAvailable` | No |
| `pyRuleSet` | Tracked `pyRuleSet` | No |
| `pyRuleSetVersion` | Tracked `pyRuleSetVersion` | No |

**All fields marked "Yes" are mandatory** — the update will fail if any mandatory field is missing.

Use `listUpdateMode='replace'` with `listUpdateModeOverrides={"pyLinkedImps":"replace"}` so the list is fully replaced with the authored rules rather than merged.

This step is **mandatory** — do not skip it and do not proceed to the summary until the update succeeds.

### 11. Advance the user story to Open-Review (user story source only)

This step applies **only** when a user story pzInsKey was recorded in step 1. Skip entirely if no user story was detected.

**Prerequisite:** Every task listed in `Task_<FeatureName>.md` must be successfully authored (status `Good`) before this step runs. If any task is still pending, blocked, or failed, do not advance the user story — stop and report the outstanding tasks to the user instead.

When all tasks in `Task_<FeatureName>.md` are successfully authored and the spec rule has been updated in step 10, advance the user story case to `Open-Review` status using the `D_pxChangeStage` data page:

1. Call `run-data-page` with `dataPage=D_pxChangeStage` and `dataPageType=page`, passing both parameters — both are mandatory, omitting either will cause the call to fail:

   | Parameter | Required | Value |
   |-----------|----------|-------|
   | `caseID` | **Yes** | The user story `pzInsKey` recorded in step 1 |
   | `stageID` | **Yes** | `Review` |

2. After the call completes, call `get-case-details` on the user story `pzInsKey` and verify that `pyStatusWork` is `Open-Review`.
3. If `pyStatusWork` is not `Open-Review`, report the current status to the user and stop — do not retry.

### 12. Present completion summary

Once all unblocked items are authored, present a summary to the user:

| Rule Name | Rule Type | Status |
|-----------|-----------|--------|
| ... | ... | Good / Warning / Blocked |

Below the table, state constitution compliance explicitly: list each in-scope
constraint, the value required, and the value actually applied. If any rule deviates,
say so plainly rather than reporting overall success.

Include the same compliance statement in the `pyChangeSummary` presented at the
ChangeRequest review gate, so the human reviewer can see which constraints were applied
before approving.

## Rules

- Accept a `pzInsKey` directly in `$ARGUMENTS` to fetch the spec without name-based lookup — do not require a feature name when a key is provided.
- Do not proceed without first fetching the `Spec_<FeatureName>` rule instance and reading the `Task_<FeatureName>.md` attachment from the associated `Rule-File-Binary` rule.
- Author one rule at a time — do not batch multiple rules in a single ChangeRequest.
- Never author a rule before its dependencies are complete.
- Never skip the ChangeRequest workflow, even for simple rules.
- Always load the relevant `rules-*` skill before authoring — do not rely on training data alone.
- Stop and present to the user if a rule fails validation — do not proceed to the next item until the error is resolved or the user explicitly instructs to skip.
- **Track all created rule details**: after each successful `create-rule` or `update-rule`, capture the response properties into the authored-rules tracker. Do not call `get-rule` again to retrieve these values when populating `pyLinkedImps`.
- After all unblocked items are authored, update the spec rule's `pyCategory` to `Pending-Review` **and** populate `pyLinkedImps` with an entry for every rule authored in this phase — both must be set in a single `update-rule` call before presenting the summary. This is mandatory.
- **Mandatory `pyLinkedImps` fields**: `pxObjClass`, `pzInsKey`, `pyRuleKey`, `pxInsName`, `pyRuleName`, `pyClassName`, `pyClass`, `pyClassLabel` — all must be present for each entry.
- Use `listUpdateModeOverrides={"pyLinkedImps":"replace"}` when updating `pyLinkedImps` to replace the full list.
- No new `Rule-Application-UseCase` instance is created in this phase.
- **User story advancement** — if the spec was sourced from a user story (detected via the `Source:` line in the tasks or spec `pyDescription`), advance the user story case to `Open-Review` status only after **every task listed in `Task_<FeatureName>.md` has been successfully authored** (all statuses `Good`) and the spec rule update in step 10 succeeds. Use `run-data-page` with `D_pxChangeStage` (`caseID` = user story `pzInsKey`, `stageID` = `Review`) — do not use case assignment or `perform-action` APIs for this transition. Verify `pyStatusWork` equals `Open-Review` via `get-case-details` after the call. If any task is still pending, blocked, or failed, do not advance — stop and report the outstanding tasks to the user. Skip this step entirely if no user story source was detected.
- Immediately before every `create-rule` or `update-rule` call, repeat the constitution freshness check from `constitution`, including before the final spec update. Stop if the check fails or rebaseline approval is missing.
- **Bind every in-scope constraint on every rule write.** Set each bound parameter or payload field explicitly. Relying on a tool default is a violation even when the call succeeds. This applies to the final spec `update-rule` call as well as every backlog rule.
- **Verify compliance from the saved rule.** After each write, confirm the persisted values satisfy the in-scope constraints via `get-rule`. If a saved rule violates a constraint, stop and report it before authoring the next item.
- Report constitution-gate evidence in the completion summary: the in-memory snapshot was verified and source identities are unchanged, or the approved rebaseline and its verification. State each in-scope constraint, its required value, and the value actually applied.

