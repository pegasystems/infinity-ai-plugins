---
name: speckit-tasks
description: Instruction for the tasks step of SpecKit. Reads the Plan_<FeatureName>.md attachment from the Spec_<FeatureName> Rule-Application-UseCase instance, converts it into one backlog item per rule, and attaches the backlog as Task_<FeatureName>.md to the same spec rule via D_pxCreateSpecAttachments.
---

# Tasks Instruction

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). `$ARGUMENTS` may contain a feature name, additional backlog requirements, extra instructions, or any combination. Parse the full content — extract the feature name if present to locate the `Spec_<FeatureName>` rule instance, and treat any remaining content as additional guidance to apply when generating backlog items.

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

Read the `Plan_<FeatureName>.md` attachment from the `Spec_<FeatureName>` rule instance, convert each plan step into an actionable backlog item, and persist the backlog by attaching a `Task_<FeatureName>.md` file to the same spec rule via the `D_pxCreateSpecAttachments` data page.

## Procedure

### 1. Resolve the spec rule instance and its plan attachment

Parse `$ARGUMENTS` to extract the following:

- **`pzInsKey`** — if a full Pega instance key is present (e.g. `RULE-APPLICATION-USECASE EMPLOYEE CONFIGURESLABENEFITSENROLLMENT!CONFIGURESLA #20260827T104614.408 GMT`), use it directly with `get-rule` to fetch the spec. Skip name-based lookup.
- **Feature name** — if no `pzInsKey` is found, extract the feature name and locate the `Spec_<FeatureName>` rule instance via `get-rule` or `list-rules`.
- **Inline context** — any remaining content in `$ARGUMENTS` after extracting the key or name is treated as additional backlog requirements or instructions. Carry it forward when generating backlog items.

If neither a `pzInsKey` nor a feature name can be resolved, infer the feature name from the current conversation context.

If the `Spec_<FeatureName>` rule instance cannot be found, stop and instruct the user to run `/speckit.specify <FeatureName>` first.

Once the spec rule is found, locate the `Plan_<FeatureName>.md` attachment. Attachments are recorded in the `pyCustomFields` map on the spec rule — each entry contains:

| Field | Description                                               |
|-------|-----------------------------------------------------------|
| `pyCFieldName` | Filename of the attachment (e.g. `Plan_<FeatureName>.md`) |
| `pyCFileKey` | `pzInsKey` of the corresponding `Rule-File-Binary` rule   |

To retrieve the content:

1. Read the spec rule via `get-rule` with `detail=full`.
2. Scan `pyCustomFields` for the entry where `pyCFieldName` matches `Plan_<FeatureName>.md`.
3. Take the `pyCFileKey` value — this is the `pzInsKey` of the `Rule-File-Binary` rule.
4. Call `get-rule` with that `pzInsKey` and `detail=full` to fetch the binary rule.
5. Read the **`pyFileSource`** field directly — it contains the plain-text markdown plan.
6. **User story source** — scan the first line of the plan markdown for a `Source:` header. If it contains a `pzInsKey` that begins with `PEGA-AGILE-WORK` (e.g. `User Story: PEGA-AGILE-WORK US-162 ...`), record it as the **user story pzInsKey**. If not found in the plan, also check the `pyDescription` of the spec rule itself for a `Source:` line containing a `PEGA-AGILE-WORK` pzInsKey. Carry this value forward for use in the tasks markdown header.

If `Plan_<FeatureName>.md` cannot be found on the spec rule, stop and instruct the user to run `/speckit.plan <FeatureName>` first.

### 2. Confirm the plan has no blockers

Review the fetched plan for unresolved blockers. If blockers exist, instruct the user to resolve them in `/speckit.plan` first before proceeding.

### 3. Create one backlog item per plan step

For each step in the plan, produce a backlog item using **exactly** the following markdown template — every field is mandatory, no fields may be omitted or renamed:

```markdown
### TASK-XX: <Title>

- **Type:** <Rule type, e.g. Rule-Obj-FlowAction>
- **Description:** <What the rule must do, derived from the plan step and spec acceptance criteria>
- **Acceptance criteria:**
  - <Testable condition 1>
  - <Testable condition 2>
- **Depends on:** <TASK-XX, TASK-XX — or "None">
- **Iteration:** <From the plan's iteration assignment>
- **Release:** <From the plan's release assignment>
- **Effort:** <Inherited or refined from the plan step>
```

Field rules:

| Field | Description |
|-------|-------------|
| **ID** | Sequential identifier in `TASK-XX` format (e.g. `TASK-01`, `TASK-02`). Zero-padded to two digits. |
| **Title** | Short imperative statement — e.g. "Create SubmitClaim flow action" |
| **Type** | Rule type to be authored (e.g. `Rule-Obj-FlowAction`) |
| **Description** | What the rule must do, derived from the plan step and spec acceptance criteria |
| **Acceptance criteria** | One or more testable conditions scoped specifically to this rule |
| **Depends on** | `TASK-XX` IDs of backlog items that must be completed first, or "None" |
| **Iteration** | From the plan's iteration assignment |
| **Release** | From the plan's release assignment |
| **Effort** | Inherited or refined from the plan step |

Every backlog item in `Task_<FeatureName>.md` **must** use this template exactly. Do not invent additional fields, collapse fields, or use a different format (e.g. tables, prose, or bullet-only lists).

### 4. Group by iteration

Order backlog items grouped by iteration, sequenced by dependency within each group. Mark any blocked items explicitly with the blocker reason.

### 5. Attach the backlog to the spec rule

The backlog must be persisted as an attachment on the existing `Spec_<FeatureName>` rule — **no new Rule-Application-UseCase rule is created in this phase**.

#### 5a. Compose the tasks markdown

**This step is mandatory and must not be skipped.** Produce the full backlog as a single markdown document containing:
- A `Source:` header line — include the `Spec_<FeatureName>` rule's `pzInsKey`. If a user story pzInsKey was detected in step 1, also include it (e.g. `Source: RULE-APPLICATION-USECASE ... | User Story: PEGA-AGILE-WORK US-162 ...`).
- Each backlog item with: `TASK-XX` ID, title, rule type, description, acceptance criteria, dependencies (as `TASK-XX` references), iteration, and release

Name the file `Task_<FeatureName>.md`.

#### 5b. Call D_pxCreateSpecAttachments

**This step is mandatory and must not be skipped.** Invoke the `D_pxCreateSpecAttachments` data page as a **list** (POST). Pass `pzInsKey` and `filePageJSON` as `dataViewParameters` in the request body. The `filePageJSON` value must be the JSON object serialised as a string.

`filePageJSON` structure (before serialisation) — all fields are mandatory:

| Field | Type | Value |
|-------|------|-------|
| `pyFileSource` | string | Raw markdown content from step 5a (plain text) |
| `pyLabel` | string | `"Task_<FeatureName>"` (filename without extension) |
| `pyCategory` | string | `"New"` |
| `pyFileMimeType` | string | `"md"` |
| `pyFileType` | string | `"md"` |
| `pyNote` | string | `"Task_<FeatureName>"` (filename without extension) |
| `pyFileName` | string | `"Task_<FeatureName>.md"` |

Example payload shape:

```json
{
  "dataViewParameters": {
    "pzInsKey": "<pzInsKey of the Spec_<FeatureName> rule>",
    "filePageJSON": "{\"pyFileSource\":\"<raw markdown content>\",\"pyLabel\":\"Task_<FeatureName>\",\"pyCategory\":\"New\",\"pyFileMimeType\":\"md\",\"pyFileType\":\"md\",\"pyNote\":\"Task_<FeatureName>\",\"pyFileName\":\"Task_<FeatureName>.md\"}"
  }
}
```

The response is a list of all attachments on the spec rule, including the newly created one, returned under the `data` node.

**This call is mandatory and must not be skipped under any circumstances.** Do not proceed to step 5c or the phase-complete stop until this call has been made and confirmed successful.

If the call fails, stop immediately, report the error to the user, and do not advance. For **404 Not Found** specifically: verify the `pzInsKey` and spec rule first; if valid, inform the user this capability is unavailable in the current environment and stop processing the request. Do not present a phase-complete message until `D_pxCreateSpecAttachments` has returned a success response and `Task_<FeatureName>.md` is confirmed attached to the spec rule.

#### 5c. Verify attachment and update the Spec_<FeatureName> rule's pyCategory

Before calling `update-rule`, confirm the attachment actually persisted:

1. Call `get-rule` on the `Spec_<FeatureName>` rule with `detail=full`.
2. Scan `pyCustomFields` for an entry where `pyCFieldName` matches `Task_<FeatureName>.md`.
3. If the entry is **not found**, stop immediately, report the failure to the user, and do not call `update-rule`.
4. Only if the entry **is found**, proceed to update the spec rule via `update-rule` setting `pyCategory` to `Pending-Implement`.

**Do not call `update-rule` unless step 2 confirms the attachment is present.**

Present the spec rule's `pzInsKey`, the attachment filename (`Task_<FeatureName>.md`), and the full backlog list to the user.

## Phase complete — mandatory stop

**Before outputting the phase-complete message, verify:**
1. `D_pxCreateSpecAttachments` was called and returned success.
2. `Task_<FeatureName>.md` is confirmed attached to the spec rule.
3. `pyCategory` on the spec rule has been updated to `Pending-Implement`.

If any of the above have not been completed, do them now before proceeding. Do not output the phase-complete message until all three are satisfied.

After all three are confirmed, output exactly this and nothing more:

> **Tasks complete.** The backlog `<pyLabel>` has been saved.

Do not ask follow-up questions. Do not invoke implementation. Wait for the user to explicitly invoke the next command.

## Rules

- Accept a `pzInsKey` directly in `$ARGUMENTS` to fetch the spec without name-based lookup — do not require a feature name when a key is provided.
- Do not proceed without first fetching the `Spec_<FeatureName>` rule instance and its `Plan_<FeatureName>.md` attachment.
- One backlog item per plan step — do not bundle multiple plan steps into a single item and do not split a single plan step into multiple items.
- Do not begin authoring — this step produces and persists the backlog only.
- If a backlog item has an unresolved external dependency, mark it as blocked and note the reason.
- Acceptance criteria on each item must be independently verifiable for that rule alone.
- Do not create a new Rule-Application-UseCase rule — the backlog is attached to the existing spec rule as `Task_<FeatureName>.md`.
- Attaching `Task_<FeatureName>.md` via `D_pxCreateSpecAttachments` is mandatory — do not skip it, do not defer it, and do not present the phase-complete message until it succeeds.
- If `D_pxCreateSpecAttachments` fails, stop and report the error — do not advance.
- Stop after the attachment call succeeds — do not proceed to the next lifecycle stage.
- Report constitution-gate evidence: the in-memory snapshot was verified and source identities are unchanged, or report the rebaseline or gate failure and stop. Also state each in-scope constraint and the value applied to this phase's rule write.

