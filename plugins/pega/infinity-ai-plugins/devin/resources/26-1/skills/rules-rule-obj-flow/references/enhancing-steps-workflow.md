---
name: enhancing-steps-workflow
description: "Load when modifying what an existing flow shape does — changing its backing FlowAction, Activity, Decision rule, or Correspondence — without adding or removing shapes."
---
# Enhancing Existing Flow Steps

How to update backing rules for steps already on the flow canvas.

## Assignment Step Enhancement

Backed by a FlowAction (`Rule-Obj-FlowAction`) and a View (`Rule-UI-View`).

**Common enhancements:**

| Change | Field to update |
|--------|----------------|
| Change submit button label | `pySubmitLabel` on FlowAction |
| Add pre-processing activity | `pyPreProcessingActivity` on FlowAction |
| Add local action activity | `pyLocalActionActivity` on FlowAction |
| Add validation | `pyValidateActivity` on FlowAction |
| Change routing | `pyNextAssignment*` flags on FlowAction |
| Add/remove/reorder form fields | Update View -- see `methodology-assignment-authoring` |

**Steps:**
1. `get-rule` on the FlowAction (`detail="full"`)
2. `update-rule` on the FlowAction with changed fields only
3. For form changes, load `methodology-assignment-authoring` (Scenario B)
4. Verify with `get-rule` on both FlowAction and View

## Decision Step Enhancement

Backed by a Decision Table, Decision Tree, or When rule.

**Common enhancements:**

| Change | Action |
|--------|--------|
| Add a new branch outcome | Update the Decision Table/Tree rule |
| Change a condition value | Update the Decision Table row |
| Change the When rule logic | Update the When rule |
| Switch which rule the shape uses | Update `pyImplementation` and `pyDecisionClass` on the Decision shape via `update-rule` on the flow |

**Steps:**
1. `search-rules` to find the decision rule
2. `get-rule` on the decision rule (`detail="full"`)
3. `update-rule` on the decision rule with new/modified rows
4. If shape must point to a different rule, `update-rule` on the flow to change the shape's `pyImplementation` and `pyDecisionClass`
5. Verify with `get-rule`

## Automation (Utility) Step Enhancement

Backed by an Activity (`Rule-Obj-Activity`) or Data Transform (`Rule-Obj-Model`).

**Common enhancements:**

| Change | Action |
|--------|--------|
| Add a step to the Activity | Add entry to `pySteps` |
| Change a Property-Set value | Update `pyParamArray` in `pySteps` |
| Change which data transform runs | Update the DT step's `DataTransform` param |
| Change routing target | Update routing Property-Set steps |

**Steps:**
1. `search-rules` to find the Activity/DT
2. `get-rule` (`detail="full"`)
3. `update-rule` on the Activity / DT with a sparse `pySteps` or `pyProperties`
   patch using `{}` placeholders for untouched rows, or the complete desired list
   with `listUpdateMode="replace"` when replacing / reordering actions. If only
   nested substeps should replace, use `listUpdateModeOverrides` such as
   `{"pySteps.pySteps":"replace"}`.
4. Verify with `get-rule`

## Notification Step Enhancement

Backed by a four-rule bundle (Rule-Notification, Rule-Obj-Corr, Rule-Obj-FieldValue,
flow Utility shape).

**Common enhancements:**

| Change | Action |
|--------|--------|
| Change notification message | Update `Rule-Obj-Corr` `pySourceStream` |
| Change recipient | Update Utility shape config or notification activity params |
| Change from push to email | Update activity name on Utility shape |

**Steps:**
1. `get-rule` on the flow (`detail="full"`) to identify the Utility shape's called activity
2. `search-rules` for the correspondence template (`Rule-Obj-Corr`)
3. `get-rule` on the template (`detail="full"`)
4. `update-rule` with updated message fields
5. For recipient changes, `update-rule` on the flow to update the Utility shape's config
