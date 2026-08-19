---
name: shapes-parallel
description: "Load when authoring parallel execution in a flow — SplitForEach iteration, SplitJoin parallel branches, Fork shapes, and their pyFromTasks wiring."
---

## SplitForEach Shapes

`pxObjClass: Data-MO-Activity-SubProcess-SplitForEach` — iterates a body
flow over every element of a list property. Widely used for the sub-case
spin-off pattern (one sub-case per list element, seeded via call-params).

### Canonical shape-level field inventory

| Field | Value / Example | Notes |
|---|---|---|
| `pxObjClass` | `"Data-MO-Activity-SubProcess-SplitForEach"` | |
| `pyMOId` | e.g. `"SPLITFOREACH1"` | Shape ID. |
| `pyFromMODefName` | `"SplitForEach"` | Legacy MO-def name. |
| `pyMOName` | author-visible label | e.g. `"For each product"`. |
| `pyImplementation` | body-flow rule name (e.g. `"pyCreateSubCases"`) | The flow executed per element. |
| `pyPreviousRule` | Sub-case ChildClass name (e.g. `"PegaSample-Repair"`) on sub-case spin-off patterns; absent on plain iteration shapes | SplitForEach overloads this field to carry the ChildClass when spinning off sub-cases. |
| `pySubProcessCategory` | `"ProcessFlow"` | Mandatory on SplitForEach; distinct from approval-wrapper SubProcess's blank `pySubProcessCategory`. |
| `pyDefineFlowOn` | `"Current"` | Body-flow context. |
| `pyPageRef` | list property path (e.g. `".pyProductList"`) | The list being iterated. **Not** `pySplitForEachPropertyName`. |
| `pyPageClass` | element class of the list (e.g. `"Data-SampleSRProduct"`) | **Not** `pySplitForEachValidCls`. |
| `pyJoinAllAny` | `"Iterate"`, `"All"`, or `"Any"` | Join mode — `"Iterate"` for sequential iteration, `"All"` / `"Any"` for parallel sub-case patterns. **Not** `pySplitAllOrAny` (that lives in `pyTaskInfo`). |
| `pyProcessRemainingSubscripts` | `"true"` / `"false"` | Continue on per-element failure. |
| `pySpinOff` | `"false"` | Always false for sub-case-via-callparams pattern — the spin-off happens inside the body flow, not via this flag. |
| `pyStoreCompletedFlowPath` | `"false"` / `"true"` | Audit toggle. |
| `pyAbortIterationWhenRule` | when-rule name or `""` | Early-termination guard. |
| `pyWhenRule` | when-rule name or `""` | Per-element guard. |
| `pyHeaderLabelProperty` | property name or `""` | Optional iteration-header label. |
| `pyUseCaseApplication` / `pyUseCaseWorkType` | use-case stamps | As for other shapes. |
| `pyCallParams` | sub-case param map (see next table) | Drives the spin-off. |

### Sub-case spin-off via `pyCallParams`

The `pyCreateSubCases` body flow consumes these five call-param keys.
Setting all five is how the flow spawns one sub-case per list element
without a dedicated `pxSpinOff` shape.

| Key | Value | Meaning |
|---|---|---|
| `ChildClass` | sub-case class (e.g. `"PegaSample-Repair"`) | Class of the child case to instantiate. |
| `FlowName` | starting flow of the child (e.g. `"pyStartRepair"`) | Child's entry flow. |
| `DataTransform` | seed transform (e.g. `"pyCopyProblemDataToChild"`) | Parent → child property copy. |
| `CopyAllPageDataToChild` | `"false"` / `"true"` | Selective (via DataTransform) vs wholesale page copy. |
| `SourcePageParamName` | per-element page param name (e.g. `"SelectedProduct"`) | The body flow addresses the current element under this name. |

> **`pySplitForEachRef` / `pySplitForEachValidCls` / `pySplitAllOrAny`
> live in `pyTaskInfo` only, NOT on the shape.** The `pyTaskInfo` map is a
> server-derived cache that the authoring UI regenerates on open; do **not**
> author these derived tokens on the shape directly. Authors write
> `pyPageRef` / `pyPageClass` / `pyJoinAllAny`; the derived names appear
> only in cached `pyTaskInfo` entries.

See `examples/split-foreach-subcase.md` for the full canvas.

## SplitJoin Container Shapes

`pxObjClass: Data-MO-Container-SplitJoin` — a parallel-execution container
holding one or more child shapes (typically SubProcesses). A **single**
SplitJoin shape acts as both the split (fan-out) entry point and the join
(fan-in) exit point for its contained children. There is no separate
"Split" and "Join" shape — just one container.

| Field | Value |
|---|---|
| `pxObjClass` | `Data-MO-Container-SplitJoin` |
| `pyFromMODefName` | `"SplitJoin"` |
| `pyMOName` | Display label (e.g. `"Simple approvers"`, `"Cascading approvers"`) |
| `pyJoinAllAny` | `"All"` (wait for all children) / `"Any"` (first child to finish wins) |
| `pyExitSomeIterationType` | `"When"` (default) |
| `pySplitSomeCount` | `"0"` (default) |
| `pyCategory` | `"FlowStandard"` |
| `pyShapeRefs` | **PageGroup** whose values are **class names** (see below) |
| `pyShapeRefsOrdered` | **list of child shape IDs** (strings) |
| `pyConnectorRefs` | PageGroup whose values are class names (see below) |
| `pyContainerRef` | `""` on the SplitJoin shape itself (the container has no parent container) |
| `pyRouterProp` | `{ "pxObjClass": "Data-MO-Activity-Router" }` (empty Router) |
| `pyCallParams` | present as key with an **empty body** (no map entries) |

### Fields ABSENT on SplitJoin

Unlike Decision / SubProcess / Utility shapes, SplitJoin container shapes
do **NOT** carry:

- `pyClassName` — absent
- `pyBaseClass` — absent

Even though `pyCategory: "FlowStandard"` is present, the class-stamp fields
that every other FlowStandard shape carries are omitted on SplitJoin. Do
not emit them on recreation.

### Container child-map encoding — values are CLASS NAMES

`pyShapeRefs` and `pyConnectorRefs` are PageGroup maps whose **values are
the contained child's class name**, NOT the child's ID repeated:

```json
"pyShapeRefs": {
  "SubProcess1": "Data-MO-Activity-SubProcess"
},
"pyShapeRefsOrdered": [ "SubProcess1" ],
"pyConnectorRefs": {
  "Transition7": "Data-MO-Connector-Transition",
  "Transition8": "Data-MO-Connector-Transition"
}
```

- `pyShapeRefs`: `{ <shapeId>: <shapeClass> }` — values like
  `"Data-MO-Activity-SubProcess"`, `"Data-MO-Gateway-Decision"`.
- `pyShapeRefsOrdered`: plain list of shape IDs (ordered). No class names.
- `pyConnectorRefs`: `{ <transitionId>: "Data-MO-Connector-Transition" }` —
  all contained connectors are transitions, so the value is uniform.

Do NOT emit `{ "SubProcess1": "SubProcess1" }` — that is a common authoring
error. The child-map values are CLASS names.

### Synthetic dual-aliasing in `pyFromTasks`

The single SplitJoin shape projects **two synthetic logical task names**
into `pyFromTasks`, reflecting its dual split/join role:

- `SplitSplitJoinN` — the split (fan-out) phase
- `JoinSplitJoinN` — the join (fan-in) phase

Neither synthetic name appears in `pyShapes`. Both appear **only** in
`pyFromTasks` as keys and `pyFromTaskName` values. In `pyConnectors`,
every connector that touches the container uses the real `SplitJoinN`
shape ID — never the synthetic alias.

The four-row `pyFromTasks` pattern for a single-child SplitJoin:

```
pyFromTasks:
  - pyFromTaskName: <UpstreamShape>        # e.g. Decision1
    pyToTasks:
      SplitSplitJoinN:
        pyID: <TransIntoContainer>          # connector pyTo = SplitJoinN
        pyTaskStatusOrWhen: WHEN/ALWAYS
        pxSubscript: SplitSplitJoinN

  - pyFromTaskName: SplitSplitJoinN         # synthetic — not in pyShapes
    pyToTasks:
      <ChildShape>:                         # e.g. SubProcess1
        pyID: <TransInsideContainer>        # connector pyFrom = SplitJoinN, pyTo = ChildShape
        pyTaskStatusOrWhen: ALWAYS
        pxSubscript: <ChildShape>

  - pyFromTaskName: <ChildShape>
    pyToTasks:
      JoinSplitJoinN:                       # synthetic — not in pyShapes
        pyID: <TransReturnToContainer>      # connector pyTo = SplitJoinN (real ID!)
        pyTaskStatusOrWhen: ALWAYS
        pxSubscript: JoinSplitJoinN

  - pyFromTaskName: JoinSplitJoinN          # synthetic
    pyToTasks:
      <DownstreamShape>:                    # e.g. Decision2
        pyID: <TransOutOfContainer>         # connector pyFrom = SplitJoinN
        pyTaskStatusOrWhen: ALWAYS
        pxSubscript: <DownstreamShape>
```

Key asymmetry: **`pyFromTasks` uses the synthetic aliases** (`SplitSplitJoinN` /
`JoinSplitJoinN`) as keys and `pyFromTaskName` values; **`pyConnectors`
always uses the real `SplitJoinN` shape ID** for both `pyFrom` (post-join
outbound) and `pyTo` (intra-container return). The synthetic aliases never
appear as a connector's `pyFrom` or `pyTo`.

**In particular:** intra-container return connectors
(`<ChildShape>` → container) target `pyTo: <SplitJoinN>` (the real ID).
Do **not** use `pyTo: JoinSplitJoinN` — that synthetic name appears only
in `pyFromTasks`.

### Child shapes inside a SplitJoin

Child shapes (typically SubProcesses) inside a SplitJoin carry:

- `pyContainerRef: "<SplitJoinN>"` — back-pointer to the parent container.
  This is the ONE place where `pyContainerRef` is populated (non-empty);
  on connectors it is always `""`.

Otherwise child-shape field sets match their normal shape-kind encoding
(e.g. SubProcess inside a SplitJoin carries all normal SubProcess fields).

See `examples/fork-split-join.md` for a fully-worked SplitJoin flow with
two parallel approval sub-processes converging on a downstream decision.

### Shape-level `pzRuleParamsHolder` on SubProcess

See `references/shapes-subprocess.md` for the full `pzRuleParamsHolder`
field set on approval SubProcesses (Manager and WorkBasket variants),
the `pyRuleParamsStreamName` wrapper-flow-action convention, and
`pyCallParams`/`pzRuleParameters` size parity rules.
See `examples/subprocess-approval.md` for a fully-worked example.

### Compact `pzRuleParameters` placeholder variant

In addition to the 5-field generic placeholder row documented for
plain-activity Utility (`pxObjClass`, `pyParametersParamInOut`,
`pyParametersParamIntelliBaseClass`, `pyParametersParamSize`,
`pyParametersParamType`), some SubProcess / Utility shapes carry an even
more compact 2-field row:

```json
{ "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "" }
```

Preserve whichever variant the server wrote on recreation. The 2-field form
and the 5-field form are not interchangeable — each appears in different
contexts (the 5-field form on the Assignment router-block and plain-activity
Utility; the 2-field form on some standalone SubProcess / Utility shapes).

