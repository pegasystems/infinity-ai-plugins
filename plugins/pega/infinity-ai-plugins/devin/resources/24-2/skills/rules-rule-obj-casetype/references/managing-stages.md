---
name: Managing Lifecycle Stages
description: Procedures for inserting, renaming, changing the flow of, reordering, and removing stages on an existing case type — including renumbering, supporting-rule dependencies, verification, and troubleshooting.
---

Use this reference when modifying the `pyStages` array on an already-created
case type. For the data-shape rules these procedures depend on (Embed-Stage
class, `pyProcesses` semantics, ALT vs PRIM separation, full-array PUT
semantics, terminal-stage checklist), see the parent `SKILL.md` "Authoring
notes".

For initial case type authoring (creating the case type itself), see
`Simple Linear` or `Stub Casetype`.

## Prerequisite — capture the current case type

Before any stage change, fetch the case type and record:

- Each stage's `pyStageID` (`PRIM0`, `PRIM1`, …)
- Each stage's `pyStageName` and `pyFlowName`
- Current `pyStageIDMax` (count of PRIMARY stages, as a numeric string — equals (highest PRIM index) + 1 since PRIM IDs are zero-indexed)
- `pyIsInitializationStage` and `pyIsTerminalStage` flags
- Total number of stages

```
get-rule key="{CaseTypeInsKey}" detail="full"
```

Then search for hard-coded stage ID references that may need updating after
renumbering:

```
search-rules searchText="pxChangeToSpecifiedStage"  (filter to the work class)
```

## Branch authoring

When authoring inside a ChangeRequest branch, use the branch ruleset name
(`{base}_Branch_{branchID}`) and version `01-01-01` — **not** the base
ruleset version. See `rules-rule-ruleset-branch` for the full protocol.

---

## Scenario A — Insert a new stage

### A-1. Choose the insertion position

Decide the 0-based position N the new stage will occupy.

- New stage gets ID `PRIM{N}`.
- Stages currently at positions N, N+1, … must be renumbered to
  `PRIM{N+1}`, `PRIM{N+2}`, … — update `pyStageID` on each.
- `pyStageIDMax` increments by 1.

Never reuse an existing stage ID. ALT stages use a separate series and are
not renumbered (see `SKILL.md`).

**Inserting at the end (before the resolution stage)** is the simplest
case — no downstream renumbering. Prefer it when the lifecycle order allows
it.

**Inserting at position 0** — the new stage must have
`pyIsInitializationStage: "true"`; the old first stage must be updated to
`pyIsInitializationStage: "false"`.

### A-2. Create the supporting rule bundle

Create rules in dependency order. The case type referencing `pyFlowName`
will not resolve unless the flow already exists; the flow will not resolve
unless its FlowActions and views exist.

| Order | Rule | Reference |
|------|------|-----------|
| 1 | Properties (`Rule-Obj-Property`) | Load `rules-rule-obj-property` |
| 2 | Computed properties (`Rule-Declare-Expression`) on embed classes | Load `rules-rule-obj-property` |
| 3 | Views (`Rule-UI-View`) — same name as the FlowAction (naming convention) | Load `rules-rule-ui-view` |
| 4 | FlowActions (`Rule-Obj-FlowAction`) | Load `rules-rule-obj-flowaction` |
| 5 | Data Transform (`Rule-Obj-Model`) — if the stage scores or prepares data | Load `rules-rule-obj-model` |
| 6 | Notification bundle — if stakeholder alerts are needed | Load `rules-rule-corrtype` |
| 7 | Stage flow (`Rule-Obj-Flow`) — **must exist before** step A-3 | Create via App Studio Process Modeler or REST |

All fields on every supporting rule must be concrete — no TBD labels, empty
arrays, or stub payloads. See each linked skill / recipe for the exact
required-field list.

### A-3. Update the case type — insert the stage and renumber

```
update-rule key="{CaseTypeInsKey}" updates={...}
```

Provide the **full** `pyStages` array (Pega replaces the entire array on
PUT — omitting any stage deletes it) with:

1. The new stage object inserted at position N.
2. All displaced downstream stages renumbered (`pyStageID` incremented
   by 1).
3. `pyStageIDMax` incremented by 1.

For the structural rules of an `Embed-Stage` entry (required fields,
`pyProcesses` semantics — typically populated on non-terminal stages,
empty/omitted on terminal stages — the `Embed-Rule-Obj-CaseType-Stages`
warning), see `SKILL.md` "Authoring notes". `pxListSubscript` is
platform-maintained and does not need to be set on author-side payloads.

**New stage entry — minimal valid shape (non-terminal):**

For terminal stages (`pyIsTerminalStage: "true"` with
`pyStageTransition: "resolution"`), leave `pyProcesses` empty or
omitted and use `pyCleanupProcess` / `pyResolveChildCases` /
`pyChildCaseStatus` instead — see
`Terminal Resolution`.

```json
{
  "pxObjClass": "Embed-Stage",
  "pxFlowIDMax": "0",
  "pyChannelMenuLabel": "Add channel process",
  "pyStageID": "PRIM{N}",
  "pyStageName": "New Stage Name",
  "pyStageTransition": "automatic",
  "pyIsTerminalStage": "false",
  "pyIsInitializationStage": "false",
  "pxAdditionalProcessingEvents": [],
  "pyLocalActions": [],
  "pyOptionalProcesses": [],
  "pyRequiredCategories": [],
  "pyProcesses": [
    {
      "pxObjClass": "Embed-StageProcess",
      "pxFlowID": "FLOW0",
      "pyFlowName": "NewStageName_Flow",
      "pyLabel": "New Stage Name",
      "pyLaunchOnReentry": "true",
      "pySkipOrAllowType": "always",
      "pySLAType": "Never",
      "pyStartType": "PARALLEL",
      "pyCallParams": []
    }
  ]
}
```

**Example — inserting at position 2 in a 5-stage lifecycle (result has 6 stages; schematic):**
```text
{
  "pyStageIDMax": "6",
  "pyStages": [
    { "pyStageID": "PRIM0" },
    { "pyStageID": "PRIM1", ... },
    { "pyStageID": "PRIM2", "pyStageName": "New Stage", ... },
    { "pyStageID": "PRIM3", ... },
    { "pyStageID": "PRIM4", ... },
    { "pyStageID": "PRIM5", ... }
  ]
}
```

### A-4. Update flows that hard-code displaced stage IDs

If the prerequisite search found `pxChangeToSpecifiedStage` shapes that
referenced any displaced stage ID, update those flows. Provide the full
`pyFromTasks` and `pyModelProcess` object — flow rules require the
full-shape PUT semantics described in `methodology-rule-authoring`.

### A-5. Verify

```
get-rule key="{CaseTypeInsKey}" detail="summary"
```

Check:

- `pyStages` contains the new stage at the correct position.
- Downstream stages have correct incremented IDs.
- `pyStageIDMax` equals the count of PRIMARY stages.
- The new stage's `pyFlowName` resolves to the flow created in step A-2.

Then `get-rule` on the new flow rule to confirm `pyRuleAvailable: Yes` and
that `references` includes the expected FlowActions and views.

---

## Scenario B — Edit an existing stage

### B-1. Identify the change type

| Change | Procedure |
|--------|-----------|
| Rename | B-2 — update `pyStageName` |
| Change flow reference | B-2 — update `pyFlowName` (replacement flow must exist) |
| Change lifecycle flags | B-2 — update `pyIsTerminalStage`, etc. |
| Reorder | B-3 |
| Remove | B-4 |

### B-2. Update stage metadata

```
update-rule key="{CaseTypeInsKey}" updates={...}
```

Provide the **full** `pyStages` array with only the target stage's fields
modified. Do not omit any stage — Pega replaces the entire array on PUT.

### B-3. Reorder stages

1. Determine the desired ordering of stages.
2. Reassign `pyStageID` as `PRIM0`, `PRIM1`, … based on the new
   positions.
3. Update `pyStageIDMax` to the count of PRIMARY stages.
4. Verify `pyIsInitializationStage` is `"true"` only on the new position 0.
5. Submit the full updated `pyStages` array.
6. Search all flows on the work class for `pxChangeToSpecifiedStage` and
   update any that referenced the old stage IDs.

### B-4. Remove a stage

1. Remove the stage entry from the array.
2. Renumber remaining downstream stages so PRIMARY IDs are contiguous from
   `PRIM0`.
3. Decrement `pyStageIDMax` by 1.
4. Verify `pyIsInitializationStage` is still `"true"` on position 0.
5. Submit the full updated `pyStages` array.
6. Search all flows on the work class for `pxChangeToSpecifiedStage` and
   update any that referenced the removed or renumbered IDs.

The stage flow and supporting rules (FlowActions, views, data transforms)
that were exclusively used by the removed stage **are not auto-deleted**.
Clean them up in App Studio if no longer needed.

### B-5. Verify

```
get-rule key="{CaseTypeInsKey}" detail="summary"
```

Check:
- `pyStages` contains the expected stages in the correct order.
- PRIMARY stage IDs are contiguous (`PRIM0` … `PRIM{N}`).
- `pyStageIDMax` equals the count of PRIMARY stages.
- `pyIsInitializationStage` is `"true"` only on position 0.
- All `pyFlowName` references resolve to existing rules.

---

## Dependency graph (Scenario A)

```
Case type update (pyStages insert + downstream renumber)
  -> Stage flow (Rule-Obj-Flow) — referenced by pyFlowName
       -> FlowActions (Rule-Obj-FlowAction) — wired via pyLocalActions
            -> Views (Rule-UI-View) — same name as FlowAction (naming convention)
                 -> Properties (Rule-Obj-Property) — fields shown on the view
  -> Data Transform (Rule-Obj-Model) — called by Utility shape in the flow
       -> Properties (Rule-Obj-Property) — read/written by the transform
  -> Notification (Rule-Notification) — scaffolded before the flow shape is wired
```

---

## Common variations

- **Adding at the end (before the resolution stage)** — no downstream
  renumbering. Just increment `pyStageIDMax` and append.
- **Multiple assignment steps in one stage** — one FlowAction + View pair
  per step; add all FlowActions to the flow's `pyLocalActions` and wire
  each to its canvas Assignment shape.
- **Stage with only an automation (no human step)** — omit the FlowAction
  / View pair; create only the flow and a data transform or activity for
  the Utility shape.
- **Stage with manager approval sub-process** — add a SubProcess shape in
  the stage flow pointing to `pxApproval` (or a custom approval flow); no
  separate flow needs to be created.
- **Stage with a conditional branch (approve / reject)** — add a Decision
  shape after the assignment with a `Rule-Obj-When` or
  `Rule-Declare-DecisionTable`. The two connectors out of the Decision
  shape use `pyConditionType: "Else"` (default) and `pyConditionType:
  "When"` (conditional). Load `rules-rule-obj-when` or
  `rules-rule-declare-decision-table` to author the condition rule.

---

## Verification checklists

For the cross-rule reflection / "bundle eval" pattern (record what worked,
what failed, next fix for every created or updated rule), see
`methodology-rule-authoring`.

### Scenario A — new stage

- [ ] Properties: `pyRuleFormStatus: Good`; correct class and type
- [ ] Views: same name as FlowAction; `Good` status; expected fields in
  `pyContent`
- [ ] FlowActions: `Good` status; `pyAutoHTML: true`; companion view
  resolves
- [ ] Data Transform: `pyProperties` contains real assignments (not
  `COMMENT`-only); `pyCallSuperClassModel: false`
- [ ] Notification (if any): `pyPurpose == pyRuleName`; `pyCorrespondence`
  = `"{Name} Email"`
- [ ] Stage flow: `Good` status; `pyFromTasks` contains the expected
  Assignment / Utility shapes
- [ ] Case type: new stage at correct position; `pyStageIDMax`
  incremented; downstream IDs renumbered
- [ ] Any flows using `pxChangeToSpecifiedStage` still reference valid
  stage IDs

### Scenario B — reorder or remove

- [ ] `pyStages` reflects the correct final order; PRIMARY IDs contiguous
  (`PRIM0` … `PRIM{N}`)
- [ ] `pyStageIDMax` equals the count of PRIMARY stages
- [ ] `pyIsInitializationStage: "true"` only on position 0
- [ ] All `pyFlowName` references resolve to existing rules
- [ ] Flows using `pxChangeToSpecifiedStage` updated to match the new
  numbering

For any failed checklist item, call `get-rule` with `detail="full"` on the
rule's `pzInsKey` and inspect `references` and `pxDependencies` for
downstream rules that may also need updating.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Stage flow not found after case type save | Flow created after case type update, or `pyFlowName` does not match `pyRuleName` exactly | Create the flow first; verify `pyFlowType == pyRuleName` |
| Duplicate stage IDs | `pyStageIDMax` not incremented, or downstream stages not renumbered | Audit all `pyStageID` values for uniqueness |
| Stage missing from lifecycle in App Studio | Stage omitted from the `pyStages` PUT payload | Re-read with `get-rule detail=full` and resubmit with all stages included |
| View not shown on assignment | View name does not match FlowAction name exactly | Verify the view's `pyRuleName` equals the FlowAction's `pyRuleName` / `pyStreamName` |
| Data transform produces wrong values in a loop | Property reference uses `.Property` instead of `Primary.Property` inside `FOR_EACH_PAGE_IN` | Use `Primary.PropertyName` for cross-page references inside loops |
| `pxChangeToSpecifiedStage` routes to wrong stage | Hard-coded stage ID points to the now-displaced ID | Search all flows on the work class and update to the new ID |
| Notification channels not set | `pyChannelsList` cannot be configured via PUT | Configure channels in App Studio / Process Modeler manually |
| Gap in stage IDs after reorder or removal | ID sequence has holes (e.g., `PRIM0`, `PRIM2`) | Rebuild `pyStages` with contiguous IDs from `PRIM0` |
| Case designer fails to render / lifecycle canvas broken | Stage saved with `pxObjClass: Embed-Rule-Obj-CaseType-Stages` instead of `Embed-Stage` | See `SKILL.md` "Authoring notes" — `Embed-Stage` vs `Embed-Rule-Obj-CaseType-Stages` |
| Non-terminal stage sits idle after entry | `pyProcesses` is empty or omitted on a non-terminal stage — structurally valid, but the runtime has no flow to launch | Add at least one `Embed-StageProcess` entry naming the stage's flow, or rely on an ad-hoc process / explicit stage change |
