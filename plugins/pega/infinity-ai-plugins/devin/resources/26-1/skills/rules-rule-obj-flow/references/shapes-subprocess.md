---
name: shapes-subprocess
description: "Load when authoring a SubProcess or Spinoff shape in a flow — covers shape fields, parameter passing, the Spinoff dedicated subclass, and Annotation shapes."
---

## SubProcess Shapes

`pxObjClass: Data-MO-Activity-SubProcess` — inherit all Utility fields and add:

| Field | Description |
|-------|-------------|
| `pySubProcessCategory` | `"ProcessFlow"` (most common), `"ScreenFlow"` (when the sub-flow is a ScreenFlow), or **blank (`""`)** on `pxApproval`-wrapper SubProcesses. Preserve verbatim on recreation. |
| `pyDefineFlowOn` | `"Current"` runs on the current work object; `"Other"` on a named page |
| `pySpinOff` | `"true"` spins off a new work object |
| `pyStoreCompletedFlowPath` | Whether to store the completed flow path |
| `pyOtherWorkClass` | Work class when not running on current |
| `pyPageClass` / `pyPageRef` | Page context for the sub-process |
| `pyImplementation` | Sub-flow name to call |

### Server-written SubProcess empty placeholders

Every server-authored SubProcess shape also carries these empty placeholder
fields alongside the shape fields:

| Field | Value |
|---|---|
| `pyOtherWorkClass` | `""` |
| `pyPageClass` | `""` |
| `pyPageRef` | `""` |
| `pyWorkObjRef` | `""` |
| `pyUseCaseApplication` | `""` |
| `pyUseCaseName` | `""` |
| `pyUseCaseWorkType` | `""` (**blank on SubProcess**, unlike Utility/Decision/Assignment shapes which carry the work-type token — the server writes `""` for the approval-wrapper/sub-flow category) |
| `pzRuleParametersShowSkills` | `"false"` |
| `pyDisplayLink` | `"false"` — same routine boilerplate flag as on Start / End / Utility / Decision / GenAI shapes. Server emits on every SubProcess subclass including the Conversation-Question / Conversation-Message / Spinoff variants. |
| `pyFAProcessOnJump` | `"false"` — flow-action process-on-jump flag, routine boilerplate alongside `pySpinOff` / `pyStoreCompletedFlowPath`. Default `"false"` on all SubProcess shapes. |

See `examples/subprocess-approval.md` for a fully-populated `pxApproval`-wrapper
SubProcess with the canonical 26-row `pzRuleParameters` approval bundle.

### `pxApproval`-wrapper SubProcess — canonical 26-row `pzRuleParameters` bundle

Every row carries 10 fields: `pxObjClass`, `pyParametersParamName`,
`pyParametersParamDesc`, `pyParametersParamInOut`, `pyParametersParamType`,
`pyParametersParamReq`, `pyParametersParamSize`, `pyParametersParamIntelliRule`,
`pyParametersParamIntelliBaseClass`, `pyParametersParamIntelliValidateAs`.

Approval-bundle invariants (distinct from notify-wrapper rows — see
`shapes-utility.md`):

- `pyParametersParamInOut: ""` on every row (blank, **not** `"IN"`).
- `pyParametersParamType: "STRING"` on every row.
- `pyParametersParamIntelliBaseClass: "PageClass"` on every row.
- `pyParametersParamReq`: `"-1"` on `StepApprovalType` only; `"0"` on the other 25.
- `pyParametersParamSize`, `pyParametersParamIntelliRule`,
  `pyParametersParamIntelliValidateAs`: `""` on every row.
- `pyParametersParamDesc`: each row carries a canonical description string
  (table below) — **not** blank.

Per-row canonical `pyParametersParamDesc` (server-emitted order):

1. `StepApprovalType` → `Approval Type (Simple, Cascading)` (`pyParametersParamReq: "-1"`)
2. `ApprovalAction` → `Action to perform when approved`
3. `RejectionAction` → `Action to perform when rejected`
4. `ApprovalMetaData` → `Meta data of Action to perform when approved`
5. `ApprovalStatus` → `Status to be set when approving`
6. `RejectionMetaData` → `Meta data of Action to perform when rejected`
7. `RejectionStatus` → `Status to be set when rejecting`
8. `ApproverType` → `(Operator, ReportingManger, WorkGroupManager, CostCenterManager)`
9. `OperatorID` → `Operator ID (When Approver Type is Operator)`
10. `ApprovalType` → `Type of Approval required: Authority Matrix or Reporting Structure`
11. `DecisionTableName` → `Decision Table Name to be evaluated if Authority Matrix selected`
12. `ApproverListPage` → `Page List containing Decision Table results. This can be pre populated without using a desicion table too.`
13. `ApproverNameProperty` → `Property holding the Approver Name in the Page List`
14. `ManagerType` → `Type of Manager hierarchy evaluated for approval`
15. `WhenRules` → `When rule list to get the levels of iterations...`
16. `LevelsOfApproval` → `Levels of Approval required`
17. `EmailApproval` → `Email Approval`
18. `pyApprovalSectionName` → `Approval Section Name`
19. `ApprovalSLA` → `Approval SLA`
20. `CorrName` → `CorrName` *(audited)*
21. `EmailSubjectFV` → `EmailSubjectFV` *(audited)*
22. `SendAllAttachments` → `Send Work Attachments with Email Correspondence` *(audited)*
23. `AttachmentCategoriesToSend` → `Comma delimited list of attach categories to send` *(audited)*
24. `AttachmentFieldsToSend` → `Comma delimited list of attach fields to send` *(audited)*
25. `PushNotificationIsEnabled` → `Push Notification Is Enabled` *(audited)*
26. `DecisionTree` → `Business Logic Decision Tree` *(audited)*

> **Audited rows (7).** Rows 20–26 additionally carry `pxCreateOperator` /
> `pxCreateOpName` / `pxCreateDateTime` / `pxCreateSystemID` audit fields
> preserved from 2020-era edits. `pxCreateSystemID: "prpc"` on all 7
> (the 2020-era system ID — **not** `"pega"`). `pxCreateDateTime` is
> ISO-8601-Z with actual HH:MM:SS; the time-of-day component is
> diff-ignored, ISO-Z format is structural.

#### Populated `pyCallParams` defaults

The server emits five populated `pyCallParams` values on both Manager and
WorkBasket approver variants even when otherwise blank-configured; the
other 21 keys are `""`:

- `ApprovalAction: "Continue"`
- `RejectionAction: "UpdateStatus"`
- `RejectionMetaData: "Resolved-Rejected"`
- `RejectionStatus: "Approval Rejection"`
- `StepApprovalType: "Simple"`

> **Key-ordering caveat.** `pyCallParams` keys sort **case-insensitively**,
> so `pyApprovalSectionName` sorts into the `P`-block (between
> `PushNotificationIsEnabled` and `RejectionAction`), not at the tail.
> JSON serialization order is diff-ignored but canonical ordering is
> case-insensitive alphabetical.

#### `pzRuleParamsHolder` extended field set (WorkBasket variant)

On the WorkBasket-approver variant, the holder page carries these
additional fields alongside `pyApproverType` / `pyApprovalSection` /
`pyWorkBasketToAssign`: `pyOperatorToAssign: ""`,
`pyPostApprovalActions: "Continue"`, `pyPostRejectionActions: "UpdateStatus"`,
`pyRejectStatus: "Resolved-Rejected"`, `pySLA: ""`, `pySLAType: "Never"`,
`pyStepApprovalType: "Simple"`, `pzMarkRoutingChanged: "true"`.

### `pyRuleParamsStreamName` wrapper-flow-action convention

When the SubProcess calls an approval-wrapper flow (e.g. `pxApproval`), both
the **rule-level** and the **shape-level** `pyRuleParamsStreamName` are
populated with the wrapper-flow-action name — NOT a smart-shape stream
identifier:

| Location | Field | Typical value |
|---|---|---|
| Rule-level (top of Rule-Obj-Flow) | `pyRuleParamsStreamName` | `"pzApprovalFlowWrapper"` (approval wrappers) |
| Shape-level (per SubProcess) | `pyRuleParamsStreamName` | `"pzSimpleApproval"` / `"pzCascadingApproval"` on approval SubProcesses; `""` on plain non-approval SubProcesses |

This is the flow-action rule that provides the approval-configuration UI
when the author opens the SubProcess step properties. It is distinct from
the smart-shape Utility stream names (`pzRunDataTransform`,
`pzNotifyWrapper`, etc.); approval-wrapper SubProcesses reuse the
`pyRuleParamsStreamName` field with a different value space.

### SubProcess `pyCallParams` / `pzRuleParameters` size parity

Two related size/envelope rules that distinguish SubProcess from Utility:

**1. `pyCallParams` size mirrors `pzRuleParameters` size.** Every parameter
declared in `pzRuleParameters` gets a corresponding key in `pyCallParams` —
**even un-wired ones**. Un-wired parameters carry `""` values. Example:
if `pzRuleParameters` has 6 rows (`ActionToTake`, `ActionMetaData`,
`ActionStatus`, `PreviousStage`, `StageToMove`, `TempStageName`), then
`pyCallParams` has all 6 keys too, with `""` on the three that the parent
flow does not wire. Emitting only the wired subset is a recreation bug.

**2. `pzRuleParameters` rows carry the FULL descriptor envelope, not the
minimal 6-field shape.** On SubProcess shapes, each `pzRuleParameters`
row mirrors the parent flow's `pyParameters` row — including:

- `pyParametersParamDesc` (the descriptor text, e.g.
  `"(Operator, ReportingManger, WorkGroupManager, CostCenterManager)"`)
- `pyParametersParamIntelliBaseClass: "PageClass"`
- `pyParametersParamIntelliRule: ""`
- `pyParametersParamIntelliValidateAs: ""`
- `pyParametersParamReq: "-1"` on the first required row, `"0"` on the rest
  (contrast with the `"0"`-everywhere generic-placeholder convention on
  plain-activity Utility shapes)

Only **row 1** can be the minimal 6-field shape (and only when the parent
flow has no declared parameter set). Rows 2+ always carry the full
descriptor envelope. This contrasts with plain-activity Utility shapes,
which use a single minimal placeholder row with `pyParametersParamSize: "0"`.


## Spinoff Shape

The explicit spin-off primitive is a dedicated `Data-MO-Activity-SubProcess-*`
subclass — parallel to `-SplitForEach` and `-Conversation-Question` — **not**
a generic `Data-MO-Activity-SubProcess` with a `pySpinOff: "true"` boolean
flag. The server writes the dedicated subclass AND the flag together.

### Shape class / template pair

| Field | Value |
|---|---|
| `pxObjClass` | `Data-MO-Activity-SubProcess-Spinoff` |
| `pyFromMODefName` | `Spinoff` |
| `pyShapeType` | `Data-MO-Activity-SubProcess-Spinoff` (mirrors `pxObjClass` on this shape family) |
| `pySpinOff` | `"true"` (always — the subclass and the flag co-occur) |

### Spinoff shape field inventory

Observed on `pyRemoteProblem` (`Pega-ProcessEngine` shipped platform
error-handler flow). Inherits the SubProcess common field set; adds the
Spinoff-specific flags:

| Field | Typical value | Notes |
|---|---|---|
| `pyImplementation` | target flow name (e.g. `"ConnectionProblem"`) | Rule-Obj-Flow being forked onto |
| `pySpinOff` | `"true"` | Required with the dedicated subclass (not a substitute for it) |
| `pyDefineFlowOn` | `"Current"` | When forking on the **same** case (no child class). Use a different value only when spinning off onto a child case. |
| `pyOtherWorkClass` | `""` | Same-case spin-off — blank. Populated only when spinning off onto a different work class. |
| `pyPageClass` | `""` | Same-case spin-off — blank |
| `pyPageRef` | `""` | Same-case spin-off — blank |
| `pyWorkObjRef` | `""` | Same-case spin-off — blank |
| `pySubProcessCategory` | `"ProcessFlow"` | Legacy/shipped-platform flows; may be `""` on modern authored spin-offs |
| `pyShouldReload` | `"No"` | Capital N-o string (same convention as ConversationFlow shapes) |
| `pyStoreCompletedFlowPath` | `"false"` | |
| `pyTypeMismatch` | `"false"` | |
| `pyOnlyGoingBack` | `"false"` | Spin-off-specific back-navigation guard |
| `pyCallParams` | map | Parameters passed to the forked flow (one key per declared input) |
| `pzRuleParameters` | list of `Embed-MethodParams` rows | Mirrors the forked flow's declared parameters — uses the **rule-level** `pyParameters` placeholder convention (`ParamInOut: ""`, `ParamReq: "-1"`), NOT the notify-smart-shape or approval-bundle convention. See below. |
| `pzRuleParametersShowSkills` | `"false"` | |
| `pyRuleParamsStreamName` | `""` | Typically blank on spin-off (unlike smart-shape Utility) |

### Spin-off variants — same-case vs. child-case

Two spin-off patterns exist. Distinguish by the four child-class fields:

| Variant | `pyDefineFlowOn` | `pyOtherWorkClass` / `pyPageClass` / `pyPageRef` / `pyWorkObjRef` | Typical use |
|---|---|---|---|
| Same-case spin-off | `"Current"` | all `""` | Fork a parallel flow on the same case (e.g. notification / exception handler) |
| Child-case spin-off | non-`"Current"` | populated with target class / page binding | Spin off work onto a child case |

### Outgoing connector `pyFromClass`

Connectors leaving a Spinoff shape must carry
`pyFromClass: "Data-MO-Activity-SubProcess-Spinoff"` — the dedicated
subclass, not the parent `Data-MO-Activity-SubProcess`. This matches the
rule for all `Data-MO-Activity-SubProcess-*` subclass shapes (SplitForEach,
Conversation-Question, Conversation-Message).

### `pyUseCaseLinks` rollup exception

A Spinoff shape contributes a `pyUseCaseLinks` row whose
`pxLinkedClassTo` is the **parent** class `Data-MO-Activity-SubProcess`
— NOT the Spinoff subclass — even though the shape's own `pxObjClass`
is `Data-MO-Activity-SubProcess-Spinoff`. This exception applies to all
`Data-MO-Activity-SubProcess-*` subclass shapes. See SKILL.md
`pyUseCaseLinks` section.


## Annotation Shapes

`pxObjClass: Data-MO-Annotation-Comment` — free-form sticky-note annotations on
the canvas. Emitted under `pyModelProcess.pyAnnotationShapes` (a map keyed
by annotation ID, e.g. `"Annotation1"`), **not** under `pyShapes`.

### Row schema

| Field | Notes |
|---|---|
| `pxObjClass` | `"Data-MO-Annotation-Comment"`. |
| `pyAnnotation` | The annotation **text content** — the display body. **Not** `pyMOName`. |
| `pxCreateOperator` | Operator ID of the author (e.g. `"garga"`). Preserved from original creation. |
| `pxCreateDateTime` | ISO-8601-Z creation timestamp (optional). |
| `pyCoordX` / `pyCoordY` / `pyWidth` / `pyHeight` | May be present; filter-in-ignore-list per canvas coord handling. |

> **Do NOT use `pyMOName` for annotation text.** Authors sometimes mirror
> the shape convention and put the text in `pyMOName` — that round-trips
> incorrectly. The text field on `Data-MO-Annotation` is **`pyAnnotation`**.
> `pyMOName` is either absent or empty on annotation rows.

Annotations typically have no connectors, no `pyFromTasks` entry, and no
role in the execution graph — they are author-facing comments.

