---
name: shapes-assignment
description: "Load when authoring an Assignment shape in a flow — covers routing fields, BPMN differences, ticket wiring, and server-written boilerplate specific to Assignments."
---

## Assignment Shapes

`pxObjClass: Data-MO-Activity-Assignment` — route work to an operator or workbasket.

### Primary routing fields

| Field | Description |
|-------|-------------|
| `pyImplementation` | **Shape-level routing activity.** `"WorkList"` or `"WorkBasket"`. **Not** the router name — see `references/routing-assignment.md`. |
| `pyRouterProp` | Embedded `Data-MO-Activity-Router` — nested `pyImplementation` names the router (e.g., `"ToCurrentOperator"`, `"ToWorkbasket"`) |
| `pyDisplayRouteTo` | `"USER"` for current operator, worklist, skilled-group, and workbasket routing (all use `"USER"`). Legacy flows may carry `"WORKBASKET"`. |
| `pyRouteTo` | Literal token: `"Current operator"`, `"Workbasket"`, `"Specific operator"`, or skill name. **Actual basket/operator identity lives in `pyWorkBasket`/`pyOperator` and `pyRouterProp.pyCallParams`.** |
| `pyWorkBasket` | Workbasket name (e.g., `"MyOrg:Reviewers"`). Empty unless routing to a workbasket. |
| `pyViewPolicy` | `"CUSTOM"` or `"USE_CASE_POLICY"` — preserve whichever the server emits. |
| `pyCallParams` | Shape-level parameter boilerplate — see "Server-written Assignment boilerplate" below. |
| `pyTicketShapes` | Category-aware. On **FlowStandard** Assignments: single-row placeholder `[{ "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" }]`. On **ScreenFlow** AssignmentSF: `[]` (empty). See the category-aware rule in the boilerplate section above. |
| `pyUseCaseName` | Use-case link to the backing FlowAction. |
| `pyLocalActionsPL` | `Embed-Pega-AssignAction` entries for local actions — single empty-row placeholder on server-authored Assignments with no local actions. |
| `pyNotifyProp` | `Data-MO-Activity-Notify` — notification configuration (minimal stub when no notification is wired). |

> **`pyFlowAction` — canonical location is the outgoing connector.** On
> server-authored FlowStandard workbasket Assignments, the flow-action binding is
> **not** written on the shape itself. Instead, the outgoing `Action` connector's
> `pyExpression` carries the flow-action name (e.g.,
> `Transition3.pyExpression: "RecordScores"`), mirrored by the `pyFromTasks` row's
> `pyTaskStatus` / `pyTaskWhen`. The shape-level `pyFlowAction` field may appear on
> some Assignment variants (verify before relying on it); for FlowStandard
> workbasket Assignments, omit it on recreation.

> **Legacy fields — do not invent.** `pyShouldReload`, `pyOperator` (for
> workbasket variants), `pySkipAssignment`, and `pyDoNotPerform` are **not**
> server-written on FlowStandard workbasket Assignments. Do not add them to new
> payloads. Preserve them only if the existing server payload already contains
> them on an update.

> **BPMN-category Assignment shapes differ.** On BPMN flows
> (`pyCategory: "BPMN"`), the shape-level field set is:
>
> - **Shape-level populated fields:** `pyHarnessPurpose` (e.g. `"Perform"`),
> `pySLA` (e.g. `"Default"`), `pyWorkStatus` (e.g. `"Open"`),
> `pyPreviousRule` (breadcrumb), `pyUseCaseWorkType`, `pyImplementation`
> (`"WorkList"` / `"WorkBasket"`).
> - **Shape-level `pyCallParams`:** exactly five keys —
> `ConfirmationNote`, `DoNotPerform`, `HarnessPurpose`, `Instructions`,
> `UseCurOperIfBasketNotFound`. **Not** `ServiceLevel`, **not**
> `StatusWork`, **not** `Workbasket`.
> - **Workbasket target lives under `pyRouterProp.pyCallParams.Workbasket`**,
> NOT at shape level. The value is literal-string-quoted (see).
> - **Do NOT emit** `pyRouteTo`, `pyOperator`, `pyWorkBasket`,
> `pyDisplayRouteTo`, `pyShouldReload`, `pySkipAssignment`,
> `pyDoNotPerform`, or `pyViewPolicy` at shape level on BPMN Assignments —
> those are Process-Modeler-UI-facing names that do not round-trip through
> the BPMN persistence. Rule-authored FlowStandard Assignments carry a
> different set (see "Primary routing fields" table above).

### Literal-string `pyCallParams` values are double-quote-wrapped

String-literal call-param values are wrapped in **literal** double-quote
characters in the persisted rule body. Examples:

- `"ConfirmationNote": "\"The Case is created and ready to be managed\""`
  (Assignment shape).
- `"Workbasket": "\"default@pega.com\""` (inside
  `pyRouterProp.pyCallParams`).
- `"DataTransform": "\"pyCopyProblemDataToChild\""` (SplitForEach
  pyCallParams).

The outer quotes are **part of the value**, not JSON string delimiters.
Preserve the escaped `\"` wrapping verbatim on recreation; do NOT strip
the outer quotes. Parallel convention to `pyPropertyAssigns` with
`pyActionName: "SET"` (see `references/routing-assignment.md` and
`examples/loopback-cascading-approval.md`).

### Ticket wiring on Assignment / Utility shapes

When an Assignment or Utility shape is wired to a Ticket (platform-wide
interrupt signal), the shape emits a populated `pyTicketShapes` row AND
a `pyModifierRefs` map, in tandem with a top-level `pyModelProcess.pyModifiers.<TicketId>`
entry.

**`pyTicketShapes[0]` row schema** — three fields only:

| Field | Value | Notes |
|---|---|---|
| `pxSubscript` | `<TicketId>` (e.g. `"Ticket1"`) | Same as the key in `pyModifiers`. |
| `pyMOId` | `<TicketId>` (same as above) | Shape-level ID mirror. |
| `pyMOName` | ticket **rule name** (e.g. `"AllCoveredResolved"`) | **Not** `pyTicketName` / `pyTicketClass` — those field names do NOT exist on this row. |

**`pyModifierRefs`** — a single-entry map from the TicketId to its class
(always `"Data-MO-Event-Exception"`):

```json
"pyModifierRefs": { "Ticket1": "Data-MO-Event-Exception" }
```

**Top-level `pyModelProcess.pyModifiers.<TicketId>`** — the ticket node
itself:

```json
"pyModifiers": {
  "Ticket1": {
    "pxObjClass": "Data-MO-Event-Exception",
    "pyFromMODefName": "Ticket",
    "pyMOName": "AllCoveredResolved"
  }
}
```

> **Ticket class is NOT stored on the flow.** The ticket's applies-to
> class (e.g. `"Work-Cover-"`) is resolved by `pxRuleReferences` against
> the ticket rule itself, not persisted on the flow body. Authors who try
> to write `pyTicketClass` anywhere in the flow payload will see it
> silently dropped on round-trip.

> **`pyTicketShapes` placeholder is category-aware.** FlowStandard
> Assignment and Utility shapes emit a single placeholder row
> `[{ "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" }]` even
> when no ticket is wired. ScreenFlow AssignmentSF shapes emit `[]`
> (empty). See the `pyTicketShapes` entry in the primary routing fields
> table above.

### Server-written Assignment boilerplate

Every FlowStandard Assignment shape carries these shape-level empty placeholders
alongside the primary routing fields. They are auto-written by Process Modeler;
include them on recreation.

| Field | Value |
|---|---|
| `pySLA` | `""` |
| `pySLAType` | `"Never"` |
| `pyEffortCost` | `""` |
| `pyHarnessPurpose` | `""` |
| `pyActivityTypeSelector` | `""` |
| `pyAutomationAppliesTo` | `""` |
| `pyWorkStatus` | `""` |
| `pyContextRefs` | `[]` |
| `pySkipAssignmentParams` | `[]` |
| `pyLocalActionsPL` | `[{ "pxObjClass": "Embed-Pega-AssignAction", "pyActionName": "" }]` (single placeholder row) |
| `pyNotifyProp` | Variant-specific empty stub — see below. |

> **`pyNotifyProp` empty-stub shape differs by Assignment variant.**
>
> | Assignment variant | Empty `pyNotifyProp` stub |
> |---|---|
> | `Data-MO-Activity-Assignment` (FlowStandard) | `{ "pxObjClass": "Data-MO-Activity-Notify", "pyImplementation": "", "pyMOName": "", "pyCallParams": {} }` — includes `pyMOName: ""` |
> | `Data-MO-Activity-Assignment-WorkAction` (ScreenFlow `AssignmentSF`) | `{ "pxObjClass": "Data-MO-Activity-Notify", "pyImplementation": "", "pyCallParams": {} }` — omits `pyMOName` |
>
> The two variants were verified on separate flows. On a configured (non-empty)
> notification the `pyMOName` field carries the notification display label on
> both variants.

For the `pyCallParams` shape-level boilerplate values and workbasket routing
example, see `references/routing-assignment.md`.

