---
name: top-level-rollups
description: "Load when a flow needs rule-level summary lists that mirror shape-level data — pyUseCaseLinks, pyCoveredBy, pyTaskInfo, and pxDataReferences rollup mechanics."
---

## Top-level Reference and Link Rows

Server-authored flows carry several top-level page lists that mirror shape-level
information for traceability and rule-reference tracking. They are auto-managed
by Process Modeler and Pega's reference collector. Include them when recreating
existing flows for byte-level parity.

### `pyUseCaseLinks` — per-shape use-case rollup

A page list with one row per shape. Each row carries a `Link-UseCase` entry
that mirrors the shape's use-case tokens onto the flow-level record.
This is a Pega **page link** (`Link-*` class), not an `Embed-*` row.

| Field | Value |
|---|---|
| `pxObjClass` | `"Link-UseCase"` |
| `pxLinkedClassTo` | Varies by shape type — e.g. `"Data-MO-Activity-Assignment"` (Assignment), `"Rule-Obj-FlowAction"` (FlowAction), `"Rule-Obj-Activity"` (Utility), `"Data-MO-Gateway-DataXOR"` (Decision), `"Rule-HTML-Harness"` (Start), `"Data-MO-Activity-SubProcess"` (SubProcess), `"EXPRESSION"` (inline Decision), etc. |
| `pxLinkedRefTo` | Backing rule name or label — varies by shape type (e.g. harness name on Start, flow-action name on Assignment) |
| `pyApplicationName` | Short application name |
| `pyFlowKey` | Flow rule key (e.g., `pyRuleName`) |
| `pyFlowType` | Same as flow's `pyFlowType` |
| `pyImplementationType` | Implementation type token |
| `pyLabel` | `"Application Link"` |
| `pyLinkedClassName` | Work class |
| `pyTaskID` | Start shape's `pyMOId` (e.g., `"Start1"`) |
| `pyTaskName` | Start shape's `pyMOName` |
| `pyUseCaseName` | Mirrors Start shape's `pyUseCaseName` |
| `pyWorkTypeName` | Short case-type name |

Do not fabricate these values — they are derived from the Start shape. When
recreating a flow, copy them from the existing server payload.

### `pyCoveredBy` — covering case-type references

A page list of `Embed-Rule-Obj-Flow-CoveredBy` rows identifying case types that
**cover** this flow (i.e., case types whose stage model embeds this flow as a
step). On stand-alone or sub-flows with no covering case types, the server
still writes a single empty placeholder row:

| Field | Value |
|---|---|
| `pxObjClass` | `"Embed-Rule-Obj-Flow-CoveredBy"` |
| `pyCoveringWorkClass` | covering case-type class (empty `""` on the placeholder row) |
| `pySubTaskHarness` | sub-task harness name (empty `""` on the placeholder row) |
| `pySubTaskModel` | sub-task model name (empty `""` on the placeholder row) |

> **Legacy `pyCoveredBy` placeholder also carries `pzIndex*` audit
> scalars.** On legacy / shipped-platform flows the single
> empty row may additionally include `pzIndexOwnerKey` (the owning
> rule key) and `pzIndexes.AddWorkProcesses` (a small integer string,
> e.g. `"17"`). These are server-managed audit-index scalars that
> co-travel with the placeholder row. Preserve them verbatim on
> recreation; on fresh authoring the server will write them. The
> placeholder remains semantically meaningful — it signals the flow
> CAN be invoked as a sub-process from a covering case type, even when
> no specific cover is currently registered.

### `pyTaskInfo` — server-derived per-shape task rollup

`pyTaskInfo` is a top-level **map** (one entry per shape, keyed by the
shape's `pyMOId` / `pxSubscript`) that mirrors each shape's coordinates,
dimensions, and labels alongside task-transition-type tags and routing /
queue / decision metadata. Server-maintained: the field round-trips on
update and is part of the persisted rule. On fresh authoring the server
will fill it; for byte-level recreation parity, copy the server's value
verbatim.

**Per-shape-kind contents:**

| Shape kind (`pyTaskTransitionType`) | Required `pyTaskInfo` fields |
|---|---|
| Start (`FLOWSTART`) | `pyTaskTransitionType: "FLOWSTART"`, `pyTaskLabel`, `pyShapeCoordX` / `pyShapeCoordY`, `pyHeight` / `pyWidth` (mirrors shape), and on routed Starts: `pyRoutingRule` (e.g. `"ToCustomer"`), `pyRoutingParams` (key/value list), `pySkills` placeholder. |
| End (`FLOWEND`) | `pyTaskTransitionType: "FLOWEND"`, `pyTaskLabel`, coords, dims. |
| Assignment / AssignmentSF (`ASSIGNMENT`) | `pyTaskTransitionType: "ASSIGNMENT"`, `pyTaskLabel`, coords, dims, `pyActivityToQueue: "WorkList"` (or `"WorkBasket"` per routing), `pyActivityCallParams` mirroring the shape's `pyCallParams`. |
| Decision (`DECISION`) | `pyTaskTransitionType: "DECISION"`, `pyTaskLabel`, coords, dims, `pyDecisionMapType` (e.g. `"EXPRESSION"` for DataXOR expression-mode forks; `"DECISIONTABLE"` / `"DECISIONTREE"` for rule-driven decisions). |
| Utility / GenAI / smart-shapes (`TASK`) | `pyTaskTransitionType: "TASK"`, `pyTaskLabel`, coords, dims. |
| SubProcess (`FLOW`) | `pyTaskTransitionType: "FLOW"`, `pyTaskLabel`, coords, dims. |
| SplitForEach (`SPLITFOREACH`) | `pyTaskTransitionType: "SPLITFOREACH"`, `pyTaskLabel`, coords, dims. |

**Authoring guidance:**
- Emit `pyTaskInfo` on round-trip / recreation; the entry **must** exist
  for every shape in `pyShapes`.
- Coordinates and dimensions in `pyTaskInfo` mirror the shape's
  `pyCoordX` / `pyCoordY` / `pyWidth` / `pyHeight` (same units — fractional
  inches for shapes, see `references/canvas-structure.md`).
- `pyTaskLabel` mirrors the shape's `pyMOName` (or display-label override
  on legacy flows where `pyMOName == ""`).
- Do not derive routing / activity / decision metadata from
  `pyTaskInfo` for runtime — the shapes themselves are authoritative.
  `pyTaskInfo` is a **rollup index** consumed by the modeler and audit
  views.

### `pxDataReferences` — data-instance references

A page list of `Embed-Reference-Data` rows identifying data-instance rules this
flow depends on (workbaskets, operators, organizations, etc.). The field names
use `pxRuleObjClass` and `pyRuleName` — **not** `pxDataType` or `pxDataName`.

| Field | Value |
|---|---|
| `pxObjClass` | `"Embed-Reference-Data"` |
| `pxRuleObjClass` | Data instance's Pega class (e.g., `"Data-Admin-WorkBasket"`, `"Data-Admin-Operator-ID"`) |
| `pyRuleName` | Data instance name (e.g., `"MyOrg:Reviewers"`) |

Example — a flow routing to a workbasket carries at minimum:

```json
"pxDataReferences": [
  {
    "pxObjClass": "Embed-Reference-Data",
    "pxRuleObjClass": "Data-Admin-WorkBasket",
    "pyRuleName": "MyOrg:Reviewers"
  }
]
```

`pxDataReferences` (data instances) is distinct from `pxRuleReferences` (rule
types referenced — flow actions, activities, decision tables, etc.). Both are
auto-populated by the reference collector on save; do not edit them directly
on a live save. When recreating, include them verbatim.
