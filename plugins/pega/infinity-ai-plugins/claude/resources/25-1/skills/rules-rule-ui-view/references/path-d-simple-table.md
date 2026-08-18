---
name: view-path-d-simple-table
description: "Path D — Simple Table: create PageList property and SimpleTable view with editable columns"
---
# Path D — Simple Table

> All `create-rule` calls require a `changeRequestID`.

## Step D1 — Complete Shared Steps 0–3

Ensure data class and column properties exist.
See `rules-rule-ui-view/references/data-field-decision-tree` for Shared Steps.

## Step D2 — Create PageList Property on Parent

Create a **PageList** property on the parent class pointing to the data class.
Use `rules-rule-obj-property/examples/page-list`.

```
create-rule(ruleType="Rule-Obj-Property", content={...}, changeRequestID="{crKey}")
```

## Step D3 — Create the SimpleTable View

Use `rules-rule-ui-view/examples/simple-table-view` as the template.

Key fields:
- `pyTemplateName`: `"SimpleTable"`, `pxViewType`: `"multirecordlist"`
- No `pyContent` — entire structure is in `pxViewMetadata` and `pyJsonConfig`
- `referenceList`: `"@P .{PageListPropertyName}"` (case property, not data page)
- `contextClass`: the data class
- `parentClass`: the owning case class
- Define columns inside `config.children` as a `Columns` Region

```
create-rule(ruleType="Rule-UI-View", content={...}, changeRequestID="{crKey}")
```

## Step D4 — Wire Table into Parent View (if needed)

If the SimpleTable is embedded in another view (e.g., an assignment form), wire it
as an embedded data field using Path A Step A6. The SimpleTable view name goes in
`pyRuleName` and `$views`.

If the SimpleTable is the assignment form itself (standalone), no additional wiring
is needed — just reference it from the FlowAction's `pyViewReference`.
