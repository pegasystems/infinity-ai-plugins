---
name: rules-rule-obj-casetype
description: Schema and authoring guide for Pega case type rules (Rule-Obj-CaseType), including lifecycle stages, local actions, child cases, and process configuration
---

**Prerequisite:** Load `methodology-rule-authoring` first

For the full field-level contract (types, required flags, allowed
values), see `schema/rule-obj-casetype.json`.

## Examples

Top-level case type examples (full-rule payloads):

| Skill | Description |
|-------|-------------|
| `Stub Casetype` | Minimal case type — smallest valid create payload with a single stage |
| `Simple Linear` | Three primary stages (Create, Fulfillment, Completed) with one alternate stage (Withdrawn) |
| `Complex with Local Actions` | Case-wide and stage-level local actions, child cases with property mapping, expression-based conditions, SLAs |
| `Auto Transition` | Automatic stage transitions with conditional process execution |
| `Pipeline with Params` | Data pipeline with parameterized processes (pyCallParams), conditional stage skipping, and process-level SLAs |
| `Parent Child Dependencies` | Parent case with multiple child case types, dependency fulfillment auto-start, required children, data transforms, and status groups |
| `Approval with SLA` | Manual stage transitions, case-level and stage-level SLAs, cascading approval type, required attachment categories |
| `Adhoc Processes and Starting Flows` | Starting flows (pyCasetypeStartingFlows, pyFlowsToStart), case-wide and stage-level optional processes, multi-channel intake, case parameters |

### Focused snippets per embedded structure

For quick lookup of a single stage / process / channel shape without
parsing a whole case type, use the per-field example folders below.
Each file contains a single, minimal JSON snippet for one variant.

`examples/pyStages/` — `Embed-Stage` variants:

| Skill | Description |
|-------|-------------|
| `Initialization Stage` | First primary stage (PRIM0) with `pyIsInitializationStage` + `CreateForm_Default` |
| `Automatic Transition` | Mid-lifecycle auto-advancing stage with `pyStageEntryStatus` |
| `Manual Transition` | Stage that waits for explicit user/system action (`pyStageTransition: manual`) |
| `Terminal Resolution` | Final primary stage with resolution, cleanup, and child resolution cascade |
| `Alternate Withdrawn` | Alternate ALT1 withdrawal stage with cascading cancellation |
| `Alternate Rejected` | Alternate ALT2 rejection stage |
| `Conditional Skip When For Stage` | Stage skipped via `pySkipStageWhen` when-rule |
| `Conditional Skip Expression` | Stage gated by inline `pyExpressionToSkipOrAllow` |
| `With Required Attachments` | Stage requiring an attachment category before advancing |
| `With Stage SLA` | Stage-level SLA via `pySLAType: Always` |
| `With Validation` | Stage running a validate rule on entry (`pyValidate`) |
| `With Local Actions` | Stage exposing stage-scoped local actions |
| `Multi Process Pipeline` | Single stage with PARALLEL + SEQUENTIAL processes |

`examples/pyProcesses/` — `Embed-StageProcess` variants:

| Skill | Description |
|-------|-------------|
| `Parallel Basic` | Process that starts immediately on stage entry |
| `Sequential Basic` | Process that waits for preceding processes to finish |
| `Create Form` | Standard `CreateForm_Default` initialization process |
| `Conditional When` | Process started only when a when-rule is true (`pyStartWhen`) |
| `Conditional Skip When For Process` | Process skipped when a when-rule is true (`pyWhenToSkip`) |
| `Conditional Expression` | Process gated by inline expression |
| `With Process SLA` | Process-level SLA via `pyStepSLA` |
| `With Call Params` | Process passing values to its flow via `pyCallParams` |
| `With Rule Parameters` | Process declaring formal parameter contract via `pzRuleParameters` |
| `Channel Specific` | Process scoped to a single channel via `pyChannelName` |
| `Optional Adhoc` | Operator-launched optional/ad-hoc process |

`examples/pyChannels/` — `Data-Channel-Configuration` variants:

| Skill | Description |
|-------|-------------|
| `Default Channel` | Standard single-channel configuration |
| `Web Channel` | Web (browser/portal) channel entry |
| `Mobile Channel` | Mobile-app channel entry |
| `Email Channel` | Inbound email channel entry |
| `Hidden Channel` | Defined but inactive channel (`pyShowChannel: false`) |
| `Multi Channel` | Full `pyChannels` array combining Default + Web + Email + Mobile |

## References

Operational guides for mutating an already-created case type:

| Skill | Description |
|-------|-------------|
| `Managing Lifecycle Stages` | Procedures for inserting, renaming, changing the flow of, reordering, and removing stages on an existing case type — including renumbering, supporting-rule dependencies, verification, and troubleshooting |

## Functionality Reference

| Functionality | Description | Best Practices |
|---------------|-------------|----------------|
| Primary stages (`pyStages`) | Ordered lifecycle stages the case flows through from creation to resolution | Always use `pxObjClass: "Embed-Stage"` — never `Embed-Rule-Obj-CaseType-Stages`. Re-send ALL stages on every PUT (full array replacement). |
| Alternate stages (`pyAlternateStages`) | Exception off-ramp stages (Withdrawn, Rejected, Cancelled) reachable from any primary stage | Virtually always terminal: set `pyIsTerminalStage: "true"`, `pyStageTransition: "resolution"`, and a resolved `pyStageWorkStatus`. Re-send alongside `pyStages` on every PUT. |
| Stage IDs (`pyStageID`) | String identifiers `PRIM0`, `PRIM1`, … and `ALT1`, `ALT2`, … assigned to each stage | Manual renumbering required on insert, remove, or reorder. Keep `pyStageIDMax` / `pyAltStageIDMax` in sync with the actual stage count. |
| Processes (`pyProcesses`) | Flows that execute when the case enters a stage | Leave empty on terminal stages. First process in a stage should be `PARALLEL`. |
| Starting flows | Entry points that create the case | `pyCasetypeStartingFlows` is required — never omit. `pyFlowsToStart` declares manual-start user flows. |
| Local actions | Flow actions available to operators during a case | Case-wide actions go in `pyCaseWideLocalActions`; stage-scoped in `pyStages[n].pyLocalActions`. Both require `pyActionName` and `pyClassName`. |
| Conditional execution | When-rule or expression gates on stages and processes | Prefer `when` for reusable conditions; use `expression` for one-off inline gates. Match `pySkipOrAllowType` to the companion field (`pySkipStageWhen`, `pyStartWhen`, `pyWhenToSkip`, `pyExpressionToSkipOrAllow`). |
| Child cases (`pyCoverableClasses`) | Child case relationships defined on the parent case type | Set `pyResolveChildCases: "true"` + `pyChildCaseStatus` on terminal stages to cascade resolution. Use `pyRequired: "true"` to block parent resolution until child resolves. |
| SLAs | Goal/deadline timers at case, stage, or process level | Attach at the most specific level needed. Default is `pySLAType: "Never"`. Custom SLA rules require `pySLAType: "Use existing"` + rule name in `pyStepSLA`. |
| Attachments | Document categories at case-wide or stage level | Stage-level `pyRequiredCategories` blocks advancement until the attachment is provided. Case-wide `pyAttachments` are available throughout the lifecycle. |
| Channels (`pyChannels`) | Intake channels (Web, Mobile, Email, Default) | Always include a `Default` channel. Channel-specific processes use `pyChannelName` on `Embed-StageProcess`. |
| `pyWorkPartiesRule` | Party role configuration for the case | Required field — never omit. Almost always `"pyCaseManagementDefault"`. |
| `pxListSubscript` | 1-based position marker on embedded entries | Do not set — platform-maintained. Treat as read-only in `get-rule` responses. |

## Authoring notes

### Identity fields

Every Rule-Obj-CaseType has constant identity fields:
- `pyRuleName` is always `"pyDefault"`
- `pyPurpose` is always `"pyDefault"`
- `pyClassName` is the sole varying key — the fully qualified class name

The class referenced by `pyClassName` must exist as a `Rule-Obj-Class`
before the case type is created.

### Lifecycle arrays: `pyStages` vs `pyAlternateStages`

The case lifecycle is defined by two parallel top-level arrays, both
holding `Embed-Stage` entries:

- **`pyStages`** — ordered primary stages the case flows through from
  creation to resolution. At least one stage is required; the last
  primary stage is typically a terminal resolution stage.
- **`pyAlternateStages`** — exception/off-ramp stages (e.g., `Withdrawn`,
  `Rejected`, `Failed`, `Cancelled`) that a case jumps to from *any*
  primary stage rather than flowing into sequentially. Alternate stages
  should virtually always be terminal: `pyIsTerminalStage: "true"`,
  `pyStageTransition: "resolution"`, and a resolved `pyStageWorkStatus`.

Both arrays share the same `Embed-Stage` shape (same fields). They
differ only in their stage-ID series (`PRIM*` vs `ALT*`) and in how the
runtime reaches them (sequential flow vs. explicit jump, typically via
a `pyChangeStage` flow action or cascading cancellation).

A case type with no alternate paths can omit `pyAlternateStages`
entirely (or send an empty array); `pyAltStageIDMax` should then be
`"0"`. See `Simple Linear` for a minimal alternate-stage
example and `Parent Child Dependencies` /
`Approval with SLA` for richer ones.

### Stage IDs

Primary stages use `PRIM0`, `PRIM1`, `PRIM2`, etc. (zero-indexed) and
live in `pyStages`. Alternate stages use `ALT1`, `ALT2`, etc.
(one-indexed) and live in `pyAlternateStages`.
The first primary stage is typically the initialization stage
(`pyIsInitializationStage: "true"`). Terminal stages set
`pyIsTerminalStage: "true"` and use `pyStageTransition: "resolution"`.

Set `pyStageIDMax` to the count of primary stages and `pyAltStageIDMax`
to the count of alternate stages.

`pyStageID` values are **stored strings**, not computed from array
position. Inserting, removing, or reordering a stage requires manually
renumbering `pyStageID` on every displaced stage. If `pyStageIDMax` is
allowed to drift out of sync, App Studio will later generate a
colliding ID.

ALT stages use a separate ID series and are not affected by PRIMARY
renumbering.

### `pxListSubscript` is runtime-maintained — do not author it

`pxListSubscript` appears on every embedded entry in API responses as a
1-based position marker, but it is maintained by the platform and does
**not** need to be set when creating or updating a case type. Submitting
case type / stage / process payloads without `pxListSubscript` is the
norm — Pega assigns the correct value on save. Treat any `pxListSubscript`
that surfaces in a `get-rule` response as read-only metadata, not as an
input contract.

### `pyProcesses` on stages

`pyProcesses` is an array of `Embed-StageProcess` entries naming the
flows that run when the case enters the stage. Pega accepts the array
empty or omitted on any stage — there is no schema-level minimum and
the validator does not reject null / empty `pyProcesses`. The field's
content only governs runtime behavior:

- **Non-terminal stages** typically declare at least one process so the
  case has work to perform on entry. A non-terminal stage with no
  processes is structurally valid but will sit idle once entered until
  something else (e.g., a stage change action, an ad-hoc process from
  `pyOptionalProcesses`) advances or fills it.
- **Terminal stages** (`pyIsTerminalStage: "true"` with
  `pyStageTransition: "resolution"`) resolve the case on entry and do
  not run a flow — leave `pyProcesses` empty or omitted (see
  `Terminal Resolution`,
  `Alternate Rejected`,
  `Alternate Withdrawn`, and the terminal stages in
  the top-level examples such as `Simple Linear` and
  `Auto Transition`). Cleanup work is configured via
  `pyCleanupProcess: "true"`, `pyResolveChildCases`, and
  `pyChildCaseStatus`, not via a process.
- **Init-and-terminal stage** — a single stage that is *both* the
  initialization stage and a terminal stage (`pyIsInitializationStage:
  "true"` *and* `pyIsTerminalStage: "true"`) typically still carries
  `pyProcesses` so the create form / initial flow runs before the stage
  resolves. See `Stub Casetype` for the canonical shape.

### `Embed-Stage` vs `Embed-Rule-Obj-CaseType-Stages` — always use `Embed-Stage`

Two embedded classes can appear in a `pyStages` entry:

- **`Embed-Stage`** — the correct runtime class. Carries the full
  structure: `pyChannelMenuLabel`, `pyProcesses` sub-array,
  `pyLocalActions`, `pyOptionalProcesses`, etc.
- **`Embed-Rule-Obj-CaseType-Stages`** — an internal class written by
  App Studio during intermediate / partially completed saves. Carries
  only a lightweight set of fields (`pyFlowName`, `pyStageID`,
  `pyStageName`, `pyStageType`) and has no `pyProcesses`.

If a stage entry is PUT with `pxObjClass: "Embed-Rule-Obj-CaseType-Stages"`,
Pega accepts the save **without error** but the **entire case designer
stops rendering** — App Studio's lifecycle canvas fails to load for that
case type until the entry is corrected. Always use `pxObjClass:
"Embed-Stage"`.

The presence of `pyStageType` on a stage entry is a smell — the field
is not part of `Embed-Stage` and indicates the wrong embedded class was
written.

### Full `pyStages` array replacement on PUT

Pega's REST API replaces the entire embedded PageList when you PUT an
update. Omitting any existing stage from a `pyStages` PUT payload will
delete it from the lifecycle. The same rule applies to
`pyAlternateStages` — both arrays are replaced wholesale on each PUT,
so every alternate stage must be re-sent even when only a primary
stage is being changed (and vice versa). Always re-read the case type
with `get-rule detail="full"` before constructing a stage update.

### Stage transitions

| `pyStageTransition` | Behavior |
|---------------------|----------|
| `automatic` | Advances when all processes in the stage complete |
| `manual` | Requires explicit user/system action to advance |
| `resolution` | Terminal — resolves the case with `pyStageWorkStatus` |

### Process start types

| `pyStartType` | Behavior |
|----------------|----------|
| `PARALLEL` | Starts immediately when the stage is entered |
| `SEQUENTIAL` | Starts after preceding processes complete |

The first process in a stage should typically be `PARALLEL`.

### Local actions scope

- **Case-wide** (`pyCaseWideLocalActions`): Available across all stages
- **Stage-level** (`pyStages[n].pyLocalActions`): Available only within that stage

Both reference flow action rules via `pyActionName` and apply-to class via
`pyClassName`. Built-in actions like `pyUpdateCaseDetails` work on the parent
work class; custom actions typically target the specific case class.

### Conditional execution (four modes)

Stages, processes, and local actions support conditional execution via
`pySkipOrAllowType`:

| Value | Behavior | Companion field |
|-------|----------|----------------|
| `always` / `Always` | Unconditional | — |
| `when` | Governed by a when-rule | `pySkipStageWhen` (stages), `pyStartWhen` / `pyWhenToSkip` (processes), `pyWhen` (actions) |
| `expression` | Governed by an inline expression | `pyExpressionToSkipOrAllow` |
| `never` | Always skipped/hidden | — |

Use `when` for reusable conditions (the when-rule can be shared across
case types). Use `expression` for one-off conditions that don't warrant
a separate rule.

### Child cases (`pyCoverableClasses`)

Child case relationships support:
- **Auto-start**: `pyAutomaticStart: "true"` with `pyAutomaticStartOption: "ParentCaseStart"`
- **Manual creation**: `pyManualStart: "true"`
- **Required completion**: `pyRequired: "true"` blocks parent resolution until the child resolves
- **Data mapping**: Use `pyApplyDataTransform` (data transform name) or
  `pyProperties` (direct property-to-property mapping with `pyFrom`/`pyTo` entries)
- **Cascading cancellation**: Set `pyCascadingCancellation: "true"` on the parent
  case type to auto-cancel children when the parent is withdrawn

On terminal stages, use `pyResolveChildCases: "true"` with
`pyChildCaseStatus: "Resolved-Completed"` to cascade resolution to children.

### Process parameters (`pyCallParams` and `pzRuleParameters`)

Stage processes can pass parameters to their flows in two ways:
- `pyCallParams` — key-value object with actual parameter values
  (e.g., `{"DataSyncType": "ADM", "Operation": "export"}`)
- `pzRuleParameters` — formal parameter definitions declaring name, type,
  description, and required flag (array of `Embed-MethodParams`)

`pyCallParams` provides the values; `pzRuleParameters` describes the interface.
Both are optional. The same flow can be reused across stages with different
`pyCallParams` values (common in pipeline case types).

### Process-level SLAs

Set `pySLAType: "Always"` on an `Embed-StageProcess` to attach an SLA, and
specify the SLA rule name in `pyStepSLA`. SLAs can also be set at the stage
level (`pySLAType` on `Embed-Stage`) or case level (`pySLAType` at the top).

### Remote fields (`pyRemoteFields`)

When `pyDefaultValuesFromFedarated` is `"true"`, the case type exposes
properties for remote/federated access. Standard exposed properties include
`pyID`, `pyLabel`, `pyStatusWork`, `pxUrgencyWork`, and
`pxAssignedOperatorID`. Each entry specifies `pyExposedProperty`,
`pyIsDefaultExposed`, and `pyPropDesc`.

### Attachments

Attachment categories are defined at two levels:
- **Case-wide** (`pyAttachments`): Available throughout the case lifecycle
- **Stage-level** (`pyStages[n].pyAttachments`): Available only in that stage

Stages can require specific categories via `pyRequiredCategories`, blocking
advancement until attachments are provided.

### Status groups (`pyStatusGroups`)

Status groups organize case statuses into named categories for dashboards
and reporting (e.g., 'New', 'Open', 'Pending', 'Resolved'). Each group
has a `pyStatusGroup` name, optional `pyClassName` scope, and a
`pyStatusWorkList` of status entries.

### Locking modes

- `Default` — Pessimistic locking. Locks the case when opened for edit.
  Use for low-concurrency cases where data integrity is critical.
- `Optimistic` — Allows concurrent edits, detects conflicts at save time.
  Use for high-concurrency scenarios like agile boards.

### Pega field misspelling

The field `pyDefaultValuesFromFedarated` is misspelled in Pega (should be
"Federated"). Use the misspelled form — it is the actual field name.
Similarly, `pyPropertyValueFromFedarated` uses the same misspelling.

### Empty arrays in API responses

Full API responses include empty placeholder arrays for fields like
`pyLocalActions`, `pyOptionalProcesses`, `pyRequiredCategories`, etc.
These are cosmetic — you don't need to include empty arrays when creating
a case type.

### `pyWorkPartiesRule`

Required field. Almost always set to `"pyCaseManagementDefault"` which
provides standard case management party roles (owner, customer, etc.).

### Terminal stage checklist

Every terminal stage (primary or alternate) should set:
1. `pyIsTerminalStage: "true"`
2. `pyStageTransition: "resolution"`
3. `pyStageWorkStatus` to a resolved status (e.g., `"Resolved-Completed"`)
4. `pyCleanupProcess: "true"` to cancel running flows
5. Optionally `pyResolveChildCases: "true"` + `pyChildCaseStatus` to cascade
