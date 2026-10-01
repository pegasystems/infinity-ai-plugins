---
name: Step Looping
description: Load when a step needs to iterate over a list, page group, or count. Covers all 5 loop types, the pyStepsRepeatDef fields, iteration counters, and sub-steps inside loops.
---

# Step Looping Reference

Activity steps support 5 loop types via `pyStepsRepeatDef.pyStepsRepeatDefHasRepeat`.
The loop definition lives in `pyStepsRepeatDef` (an `Embed-ActivityRepeat` object nested
inside the step). The iterating-class table `pyForEachValidClasses[]` is **inside**
`pyStepsRepeatDef` (not a sibling at the step level).

---

## pyStepsRepeatDef fields

| Field | Purpose |
|-------|---------|
| `pyStepsRepeatDefHasRepeat` | Loop type: `EMBEDDED`, `PAGE`, `REPEAT`, `PROPERTYLIST`, `PROPERTYGROUP`, or `""` (none) |
| `pyForEachProperty` | Property path for PROPERTYLIST/PROPERTYGROUP loops |
| `pyStepsRepeatDefStart` | Start value for REPEAT loops (e.g. `"1"`) |
| `pyStepsRepeatDefIteration` | Increment for REPEAT loops (e.g. `"1"`) |
| `pyStepsRepeatDefLimit` | Upper bound for REPEAT loops (e.g. `"10"` or a property reference) |
| `pyStepsRepeatDefStop` | When condition to stop early (rarely used) |
| `pyForEachValidClasses[].pyForEachClass` | Class filter for EMBEDDED/PAGE loops |

---

## Loop counter: `param.pyForEachCount`

During any loop iteration, Pega exposes `param.pyForEachCount` — a 1-based counter
that tracks the current iteration number. Use it in expressions and property paths:

```
param.pyForEachCount                          → current iteration (1, 2, 3...)
"ResultsPage.pxResults(" + param.pyForEachCount + ")"  → indexed access
```

For REPEAT loops, `<CURRENT>` also holds the counter value and can be used in
property path subscripts (e.g. `.pxResults(<CURRENT>).pyLabel`).

For PROPERTYLIST/PROPERTYGROUP loops, `<CURRENT>` holds the current element value
(or key for groups).

---

## Loop types summary

| Type | Use case | Key config |
|------|----------|------------|
| `EMBEDDED` | Iterate PageList/PageGroup elements | `pyStepsObjectName` = list path, `pyForEachClass` = element class |
| `PAGE` | Iterate top-level clipboard pages by class | `pyForEachClass` = class to match (rarely used) |
| `REPEAT` | Counted for-loop (1..N) | `Start`, `Iteration`, `Limit` fields |
| `PROPERTYLIST` | Iterate single-value list | `pyForEachProperty` = list path |
| `PROPERTYGROUP` | Iterate single-value group (key-value) | `pyForEachProperty` = group path |

---

## Non-looping steps (default)

Every step has a `pyStepsRepeatDef` with all blank fields. Agents do **not** need to
include `pyStepsRepeatDef` when authoring non-looping steps — include it only when
setting up a loop.

---

## Sub-steps inside loops

A looping step can contain nested sub-steps via a `pySteps[]` array inside the step.
These execute on each iteration.

Key points:
- Sub-steps have their own preconditions, transitions, and parameters
- `.property` references in sub-steps resolve to the current iteration element
- Sub-step numbering is independent (transitions refer to sub-step numbers)
- The parent step's `pyParamArray` executes first, then sub-steps run

---

## Preconditions as per-iteration filters

Preconditions on a looping step act as a **per-iteration filter** — the step body
only executes for iterations where the precondition is true.

---

## pyPagesAndClasses requirements for loops

When using EMBEDDED loops, the iterating class must be declared in `pyPagesAndClasses`.
Both the list container and the element class should be declared.

---

## Common patterns

| Pattern | Loop type | pyStepsObjectName | Notes |
|---------|-----------|-------------------|-------|
| Browse results processing | EMBEDDED | `BrowsePage.pxResults` | After Obj-Browse, loop over results |
| Data page iteration | EMBEDDED | `D_MyDataPage.pxResults` | Loop over data page results |
| Embedded PageList | EMBEDDED | `.pyItems` | Iterate over an embedded list on primary |
| Loop with sub-steps | EMBEDDED | (list path) | Add `pySteps[]` array for multi-step loop body |
| Counted index loop | REPEAT | (any) | Use `<CURRENT>` as subscript |
| Value list iteration | PROPERTYLIST | (any) | Set `pyForEachProperty` to the list path |
| Value group iteration | PROPERTYGROUP | (any) | `<CURRENT>` gives the key for each entry |
| Dispatch + enqueue | EMBEDDED | `WorkItems.pxResults` | Browse -> loop -> Queue-For-Processing per item |
