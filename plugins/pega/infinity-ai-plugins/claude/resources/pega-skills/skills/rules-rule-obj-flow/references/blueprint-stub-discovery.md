---
name: blueprint-stub-discovery
description: "Load when working with a BluePrint-generated application to identify which flow shapes are stubs — placeholders without backing rules that need to be wired."
---
# Blueprint Stub Discovery

How to identify and present stub shapes in a BluePrint-generated application.
BluePrint generates flow rules for every case type, but the canvas shapes are
**stubs** -- placeholder shapes without backing rules (FlowActions, Activities,
Decision rules, etc.).

## Step 1: List All Flows

**Tool:** `list-rules` with `ruleType="Rule-Obj-Flow"`

Focus on flows in the application's own ruleset (not `Pega-` or `@baseclass` flows).

## Step 2: Inspect Each Flow for Stubs

**Tool:** `get-rule` with `key="{FlowKey}"`, `detail="full"`

Extract:
1. `pyFromTasks` -- all shape names on the canvas
2. `pyLocalActions` -- FlowAction names wired to assignment shapes
3. `references` -- rules already backing canvas shapes

### Classify Each Shape

| Shape prefix | How to detect a stub |
|--------------|-----|
| `Assignment` | No matching entry in `pyLocalActions`, or the `Rule-Obj-FlowAction` does not exist on the class |
| `Utility` | No `Rule-Obj-Activity` referenced, or the activity does not exist in the application ruleset |
| `Decision` | No `Rule-Declare-DecisionTable`, `Rule-Declare-DecisionTree`, or `Rule-Obj-When` in `references` |
| `SubProcess` | The referenced sub-flow is a scaffold (empty canvas) |
| `GenerativeAI` | `pzRuleParamsHolder.pyServiceName` is blank or absent |
| `Start`, `End` | Not stubs -- skip |

## Step 3: Confirm with Search

**Tool:** `search-rules` with `searchText="{ExpectedRuleName}"`, `allApps="false"`

A stub is confirmed when:
- No result is returned, **or**
- The only result is from a platform/built-on ruleset (not the application's own)

## Step 4: Build the Stub Inventory

For each confirmed stub:

| Field | Description |
|-------|-------------|
| Flow name | The `Rule-Obj-Flow` rule name |
| Flow class | The work class |
| Shape name | e.g., `Assignment1` |
| Shape type | Assignment / Utility / Decision / SubProcess / GenerativeAI |
| Expected rule | The backing rule that needs to be created |
| Status | `missing` (no rule exists) or `incomplete` (rule exists but is a stub) |

## Step 5: Present to User

```
Found N stub(s) across M flow(s):

Case Type: {ClassName}
  Flow: {FlowName}
    - [{ShapeType}] {ShapeName} -> needs {RuleType} "{ExpectedRuleName}"
    - [{ShapeType}] {ShapeName} -> needs {RuleType} (name TBD)
```

Ask which stub to implement first.

## Step 6: Implement

Route to the appropriate workflow:
- **Assignment stub** -> create FlowAction + View, wire into flow
- **Utility stub** -> create Activity or Data Transform, wire shape
- **Decision stub** -> create Decision Table/Tree/When, wire shape
- **SubProcess stub** -> create sub-flow
- **GenAI stub** -> create connector + FieldValue, wire shape

Repeat: after each stub implementation, present remaining stubs to the user.
