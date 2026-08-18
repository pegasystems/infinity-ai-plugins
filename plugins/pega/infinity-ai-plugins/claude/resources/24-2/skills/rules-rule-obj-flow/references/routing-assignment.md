---
name: routing-assignment
description: "Load when configuring who a flow's Assignment shape routes work to — current operator, worklist, or workbasket. Explains the two-level routing pattern and which fields to set for each routing target."
---

## Two-Level Routing

Assignment shapes use **two** `pyImplementation` fields at different nesting levels.
Each means something different, and mixing them up is the most common flow-authoring
bug.

| Level | Field path | Valid values | Purpose |
|---|---|---|---|
| Shape-level | `pyImplementation` | `"WorkList"`, `"WorkBasket"` | The **routing activity** — creates the assignment record and places it on a list |
| Nested | `pyRouterProp.pyImplementation` | `"ToCurrentOperator"`, `"ToWorklist"`, `"ToWorkbasket"`, `"ToSkilledGroup"` | The **router** — decides which operator or workbasket receives the work |

The shape-level field is the activity that runs; the nested router is the logic it
uses to pick a target.

## Common Routing Combinations

| Routing target | `pyImplementation` | `pyRouterProp.pyImplementation` | `pyDisplayRouteTo` | `pyRouteTo` |
|---|---|---|---|---|
| Current operator | `"WorkList"` | `"ToCurrentOperator"` | `"USER"` | `"Current operator"` |
| Specific operator worklist | `"WorkList"` | `"ToWorklist"` | `"USER"` | `"Specific operator"` |
| Workbasket | `"WorkBasket"` | `"ToWorkbasket"` | `"USER"` | `"Workbasket"` (literal token — basket name lives in `pyWorkBasket` and `pyRouterProp.pyCallParams.Workbasket`) |
| Skilled group | `"WorkList"` | `"ToSkilledGroup"` | `"USER"` | skill name |

### Minimal routing payload (current operator)

```json
"Assignment1": {
  "pxObjClass": "Data-MO-Activity-Assignment",
  "pyMOId": "Assignment1",
  "pyFromMODefName": "Assignment",
  "pyMOName": "ReviewComplete",
  "pyFlowAction": "ReviewComplete",
  "pyImplementation": "WorkList",
  "pyRouterProp": {
    "pxObjClass": "Data-MO-Activity-Router",
    "pyImplementation": "ToCurrentOperator"
  },
  "pyDisplayRouteTo": "USER",
  "pyRouteTo": "Current operator"
}
```

### Workbasket routing

FlowStandard Assignment shapes use the **same** `pyRouteTo: "Workbasket"` literal-token
encoding as ScreenFlow Start routing — the actual basket name lives in `pyWorkBasket`
(shape-level) and `pyRouterProp.pyCallParams.Workbasket` (router-level), not in
`pyRouteTo`. `pyDisplayRouteTo` is `"USER"` (not `"WORKBASKET"`).

FlowStandard Assignments also carry the same `pyCallParams` boilerplate as ScreenFlow
AssignmentSF shapes (`ConfirmationNote`, `DoNotPerform`, `HarnessPurpose`, `Instructions`,
`StatusAssign`, `StatusWork`, `UseCurOperIfBasketNotFound`, `ViewPolicy`) plus
`pyViewPolicy: "USE_CASE_POLICY"`.

```json
"Assignment2": {
  "pxObjClass": "Data-MO-Activity-Assignment",
  "pyMOId": "Assignment2",
  "pyFromMODefName": "Assignment",
  "pyMOName": "SeniorReview",
  "pyFlowAction": "SeniorReview",
  "pyImplementation": "WorkBasket",
  "pyDisplayRouteTo": "USER",
  "pyRouteTo": "Workbasket",
  "pyWorkBasket": "MyOrg:SeniorReviewers",
  "pyViewPolicy": "USE_CASE_POLICY",
  "pyCallParams": {
    "ConfirmationNote": "pyStepRoutedConfirmation",
    "DoNotPerform": "",
    "HarnessPurpose": "",
    "Instructions": "",
    "StatusAssign": "",
    "StatusWork": "",
    "UseCurOperIfBasketNotFound": "",
    "ViewPolicy": "USE_CASE_POLICY"
  },
  "pyRouterProp": {
    "pxObjClass": "Data-MO-Activity-Router",
    "pyImplementation": "ToWorkbasket",
    "pyIsCustomRouter": "false",
    "pyCallParams": { "Workbasket": "MyOrg:SeniorReviewers" }
  }
}
```

> **`pyRouterProp.pyIsCustomRouter` — stock vs custom router flag.** Every
> `pyRouterProp` page carries `pyIsCustomRouter` as a string boolean. Stock
> routers (`ToWorkbasket`, `ToWorklist`, `ToCurrentOperator`, `ToSkilledGroup`)
> use `"false"`. Custom routers (user-authored routing activities) use `"true"`.
> Include the field on every Assignment and AssignmentSF router page.

## Anti-Pattern

Setting the shape-level `pyImplementation` to the router name produces a broken
assignment that cannot route:

```json
// WRONG — pyImplementation holds a router name, not a routing activity
"Assignment1": {
  "pyImplementation": "ToCurrentOperator",
  "pyRouterProp": { "pyImplementation": "ToCurrentOperator" }
}
```

The shape-level field must always be `"WorkList"` or `"WorkBasket"`. Router names
(`ToCurrentOperator`, `ToWorklist`, `ToWorkbasket`, `ToSkilledGroup`) belong only
inside `pyRouterProp.pyImplementation`.

## Router Placeholder Skills Row

Every `pyRouterProp` carries a `pySkills` page list with at least one placeholder
entry — even when the shape is not routing to a skilled group. On non-skilled
routes (current operator, worklist, workbasket) the single row is an empty-skill
placeholder:

```json
"pyRouterProp": {
  "pxObjClass": "Data-MO-Activity-Router",
  "pyImplementation": "ToWorkbasket",
  "pySkills": [
    {
      "pxObjClass": "Embed-Rule-Obj-Flow-RoutingSkills",
      "pySkillLevel": "1",
      "pySkillName": "",
      "pySkillRequired": "true"
    }
  ]
}
```

Omitting `pySkills` entirely works at runtime, but server-authored flows always
carry the placeholder row. When recreating an existing flow, include it; for new
authoring it is safe (but not strictly required) to include it for parity.

## Routing Activities Registered as Dependencies

When you save a flow with Assignment shapes, Pega populates `pxRuleReferences` and
`pxDataReferences` with:

- `WorkList` (API) — routes to the current operator's worklist
- `WorkBasket` (API) — routes to a workbasket
- `ToCurrentOperator` (API) — routes to the currently logged-in operator
- `ToWorklist` (API) — alternative worklist routing
- `ToWorkbasket` (API) — alternative workbasket routing
- Workbasket data references (e.g., `MyOrg:SeniorReviewers`) when routing to workbaskets

These are auto-managed — do not edit them directly.

## Smart-Shape UI Stream Names (Utility Shapes)

See `references/shapes-utility` for the full smart-shape catalog
(`pzRunDataTransform`, `pzNotifyWrapper`, `pxConnectToGenerativeAI`,
`pxChangeToSpecifiedStage`), including `pyRuleParamsStreamName`,
`pzRuleParamsHolder`, and `pyCallParams` wiring.


## `pyRouterProp` Inert-Field Set (Assignment shapes)

On Assignment shapes with real routing, `pyRouterProp` carries a block of
inert/bookkeeping fields alongside `pyImplementation`, `pyIsCustomRouter`,
`pyCallParams`, and `pySkills`. These are auto-written by Process Modeler
and should be included on recreation:

| Field | Value |
|---|---|
| `pyInLane` | `"false"` |
| `pyMOName` | `""` |
| `pzRuleParametersShowSkills` | `"false"` |
| `pzRuleParameters` | single generic empty `Embed-MethodParams` placeholder row (same 5-field shape as plain-activity Utility — `pyParametersParamInOut: "IN"`, `pyParametersParamIntelliBaseClass: "PageClass"`, `pyParametersParamSize: "0"`, `pyParametersParamType: "STRING"`, all other fields blank) |
| `pyCallParams.<router-declared-param>` | `""` (blank placeholder, **even when the Assignment-level `pyCallParams` carries the populated value for the same key** — e.g., `CheckAvailability: ""` on the router block while the Assignment's own `pyCallParams.CheckAvailability` is populated) |

The `pyCallParams` key list on `pyRouterProp` mirrors the router activity's
declared parameter names, not the Assignment's configured values. For
`ToCurrentOperator`, that means `CheckAvailability: ""` on the router
block.

## Router-Parameter Descriptor Rows on Assignment `pzRuleParameters`

When the routing activity declares parameters (e.g. `ToCurrentOperator`
declares `CheckAvailability`), the **Assignment shape's own**
`pzRuleParameters` carries a descriptor row mirroring each declared
parameter. This is distinct from the inert placeholder on
`pyRouterProp.pzRuleParameters`.

Descriptor-row shape for `ToCurrentOperator` / `CheckAvailability`:

```json
{
  "pxObjClass": "Embed-MethodParams",
  "pyParametersParamName": "CheckAvailability",
  "pyParametersParamDesc": "Check the operator's availability",
  "pyParametersParamInOut": "IN",
  "pyParametersParamType": "BOOLEAN",
  "pyParametersParamReq": "0",
  "pyParametersParamSize": "0",
  "pyParametersParamDefaultValue": "",
  "pyParametersParamIntelliBaseClass": "PageClass",
  "pyParametersParamIntelliValidateAs": ""
}
```

Key distinctions from other `pzRuleParameters` row schemas:

- `pyParametersParamType: "BOOLEAN"` (not `"STRING"`) for boolean params.
- `pyParametersParamDesc` carries the router activity's parameter
  description text verbatim.
- Uses `pyParametersParamDefaultValue` (notify-wrapper-style 10-field
  schema), not `pyParametersParamSize` variants used on approval bundles.

On recreation, include one descriptor row per router-declared parameter.
For routers without declared parameters, the Assignment carries `[]`.


