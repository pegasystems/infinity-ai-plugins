---
name: shapes-start-end
description: "Load when authoring Start or End shapes in a flow — covers field subsets for each, ScreenFlow Start variant, server-written extras, and Change-to-Stage End wiring."
---

## Start Shapes

FlowStandard flows use `Start1` with `pxObjClass: Data-MO-Event-Start`.
ScreenFlow flows use `Start62` with `pxObjClass: Data-MO-Event-Start-StartScreenFlow`
(the screen-flow subtype — **not** the plain `Data-MO-Event-Start`).

| Field | Applies to | Description |
|-------|-----------|-------------|
| `pyStartingHarness` | Both | Harness shown when starting the flow. On `Start1`, server defaults to `"NewSample"` for new cases. |
| `pyTriggerType` | Both | Usually `"None"` |
| `pyUseCaseName` | `Start1` | Scaffolding step name — server writes `"pzStubStep_StartingScreen"` on new FlowStandard starts. Preserve on recreation. |
| `pyUseCaseWorkType` | `Start1` | Short case-type name (e.g., `"MyCase"`) — matches the FlowStandard shape boilerplate above. |
| `pyScreenFlowTemplate` | `Start62` only | Screen flow template (e.g., `"TabbedScreenFlow7"`) |
| `pyAllowErrors` | `Start62` only | Allow errors to proceed in a screen flow |
| `pySaveLater` | `Start62` only | Enable Save Later |
| `pyRouter` | `Start62` only | Routing activity name for the screen flow start |

> **Start shapes DO carry `pyCategory`, but the value matches the flow category.**
> `Start1` on FlowStandard flows carries `pyCategory: "FlowStandard"`; `Start62`
> on ScreenFlow flows carries `pyCategory: "ScreenFlow"`. Start shapes do NOT
> carry `pyBaseClass` and do NOT carry the single-row `pyTicketShapes`
> placeholder — the server writes `pyTicketShapes: []` on Start shapes. See
> "Start-shape extra server-written fields" below.

### ScreenFlow Start variant (`Start62`) — additional shape-level fields

`Start62` on ScreenFlow flows carries these extra fields beyond the universal
Start set. The `pyImplementation` here is the **shape-level routing activity**
for the ScreenFlow Start (not the router name — see `routing.md` for the routing
hierarchy).

| Field | Value |
|---|---|
| `pyFlowType` | `"ScreenFlowStandard"` on modern non-self-registering ScreenFlow Starts (FlowStandard Start omits this). **On legacy/self-registering ScreenFlow flows** the shape-level `pyFlowType` mirrors the rule-level value, which equals `pyRuleName`. E.g. `CustomerFeedback` legacy ScreenFlow Start → `pyFlowType: "ScreenFlowStandard"` is still permitted at shape level, but the rule-level field carries `"CustomerFeedback"`. Preserve verbatim on recreation. |
| `pyImplementation` | Routing activity — e.g., `"WorkBasket"` for workbasket-routed ScreenFlow Starts, `"WorkList"` for worklist-routed |
| `pyScreenFlowTemplate` | `"TabbedScreenFlow7"` or similar template identifier |
| `pyStartingHarness` | Harness name, e.g., `"New"` |
| `pySkills` | Single blank-placeholder row: `[{ "pxObjClass": "Embed-Rule-Obj-Flow-RoutingSkills", "pySkillName": "", "pySkillLevel": "", "pySkillRequired": "" }]` — all fields blank |
| `pzRuleParameters` | Single blank row: `[{ "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "" }]` |
| `pzRuleParametersShowSkills` | `"false"` |

### Start-shape extra server-written fields

In addition to the Start-specific fields above (and the universal shape
placeholders), the server writes these empty placeholders on every Start shape.
Include them on recreation for parity.

| Field | Value |
|---|---|
| `pyTemplateInputBox` | `""` |
| `pyTypeMismatch` | `"false"` |
| `pyWorkStatus` | `""` |
| `pxWarningsToDisplay` | `[]` |
| `pyCallParams` | `{}` |
| `pyContextRefs` | `[]` |
| `pyRouterProp` | `{ "pxObjClass": "Data-MO-Activity-Router" }` (minimal stub, same shape as End and degenerate-Decision) |
| `pyTicketShapes` | `[]` (empty list — same as every non-End shape) |
| `pyFlowType` | `"FlowStandard"` on non-screen-flow Start shapes (**shape-level**, independent of rule-level `pyFlowType`, which is the flow's own rule name; AND independent of rule-level `pyCategory`, including `pyCategory: "BPMN"` — the Start shape still carries `pyFlowType: "FlowStandard"` on BPMN flows). ScreenFlow Starts use `"ScreenFlowStandard"`. Always emit on Start — the value is fixed per category regardless of the flow's rule name or category. |

> **`pyShapeType` on Start is era+category dependent.** The rule depends on
> the flow's category and the Start shape's provenance:
>
> | Variant | `pyShapeType` on Start |
> |---|---|
> | **ScreenFlow** Start (`Data-MO-Event-Start-StartScreenFlow`, any era) | `pyShapeType: "Data-MO-Event-Start-StartScreenFlow"` (equals `pxObjClass`) |
> | **FlowStandard 2013-era legacy** Start (`Data-MO-Event-Start` with pre-modern `pxCreateSystemID`) | `pyShapeType: "Data-MO-Event-Start"` (equal to `pxObjClass`) |
> | **FlowStandard modern** Start | Not yet observed on a real 2026-authored flow — preserve whatever the server writes on recreation; omit on fresh authoring |
>
> On recreation, copy verbatim from the server payload. On fresh FlowStandard
> authoring, the safest default is to omit `pyShapeType` unless seeding a
> 2013-era-lineage flow.

## End Shapes

`pxObjClass: Data-MO-Event-End`. Add every End shape name to the flow's top-level
`pyEndingActivities` array.

> **Preserve legacy End IDs on updates and recreations.** For **new** flows use
> `End1`. For **updates or recreations of existing flows**, preserve the existing
> End shape ID exactly — `END52`, `END66`, `FLOWEND`, etc. — and do not rename it
> to `End1`. The same rule applies to any other legacy shape IDs on the canvas
> (`ASSIGNMENT63`, `UTILITY12`, etc.): keep what the server has.

### End shape field subset (FlowStandard)

Server-written End shapes on FlowStandard flows carry a specific, narrow field
set. Do **not** add `pyBaseClass`, `pyImplementation`, or `pyAutomationAppliesTo`
to End shapes — they are not server-written there.

| Field | Value |
|---|---|
| `pxObjClass` | `"Data-MO-Event-End"` |
| `pyMOId` | End shape ID (e.g., `"End1"`, `"END52"`) |
| `pyMOName` | `""` |
| `pyFromMODefName` | `"End"` |
| `pyCategory` | `"FlowStandard"` |
| `pyTriggerType` | `"None"` |
| `pyStatus` | `""` |
| `pyUseCaseWorkType` | `""` (empty — **not** populated with the case-type name, unlike Assignment/Utility/Decision shapes) |
| `pyCoordX` / `pyCoordY` / `pyWidth` / `pyHeight` | layout |
| `pyCallParams` | `{}` |
| `pyContextRefs` | `[]` |
| `pyModifierRefs` | `null` |
| `pyRouterProp` | `{ "pxObjClass": "Data-MO-Activity-Router" }` — minimal stub |
| `pyTicketShapes` | `[{ "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" }]` |

On **modern** ScreenFlow flows End shapes additionally carry
`pyCategory: "ScreenFlowStandard"` and `pyFlowType: "ScreenFlowStandard"`
shape-level stamps — see the ScreenFlow section below. **Legacy
2013-imported ScreenFlow End shapes** (Pega-ProCom-era, semantic-name IDs
like `FLOWEND`, on flows like `CustomerFeedback`) **omit both fields
entirely**: server emits no shape-level `pyCategory` and no shape-level
`pyFlowType` on the End shape — only the universal Start/End placeholder
set plus `pxObjClass: Data-MO-Event-End`, `pyTriggerType: "None"`, and
`pyTicketShapes`. Trigger detection: if the flow's connector
IDs are non-contiguous (legacy import) AND the rule-level `pyFlowType`
equals `pyRuleName` (self-registering), omit the
`pyCategory` / `pyFlowType` stamps from the End shape.

### Change-to-Stage End event (no distinct subclass)

A "Change to Stage" terminal on the authoring-tool canvas is **just a plain
`Data-MO-Event-End`** with a populated `pyStatus` set to the destination stage
ID. There is **no** distinct subclass, and **no** shape-level
`pyChangeToStage` / `pyStageID` / `pyImplementation` fields.

| Field | Value on Change-to-Stage End |
|---|---|
| `pxObjClass` | `"Data-MO-Event-End"` (same as plain End — **not** a distinct subclass) |
| `pyFromMODefName` | `"End"` |
| `pyStatus` | destination **stage ID** (e.g. `"PRIM1"`, `"PRIM2"`, `"ALT1"`) |
| `pyMOName` | mirrors `pyStatus` (e.g. `"PRIM1"`) — the stage ID, not a label |
| `pyUseCaseWorkType` | short case-type name (e.g. `"ChangeRequest"`) — populated on Change-to-Stage ends, unlike plain ends which have `""` |

Do **not** invent a `pyChangeToStage` or `pyStageID` field and do **not**
set `pyImplementation` on the End shape. The stage-change itself is
performed by the upstream Utility (`pxChangeToSpecifiedStage` — see the
Utility section); the End shape only records the resulting stage ID in
`pyStatus`.

