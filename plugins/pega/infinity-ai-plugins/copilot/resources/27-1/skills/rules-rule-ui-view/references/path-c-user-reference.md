---
name: view-path-c-user-reference
description: "Path C — User Reference: ensure text property and wire Pega-UI-Content-Field-Text-UserReference into the parent view"
---
# Path C — User Reference

This is the lightest path — no class or view chain needed.

> All `update-rule` calls require a `changeRequestID`.

## Step C1 — Ensure Property Exists

The property must be a `String/Text` on the parent class.

```
list-rules(ruleType="Rule-Obj-Property", className="{ParentClassName}", ruleName="{PropertyName}")
```

If missing, create it using `rules-rule-obj-property` `rules-rule-obj-property/examples/stub`.

```
create-rule(ruleType="Rule-Obj-Property", content={...}, changeRequestID="{crKey}")
```

## Step C2 — Wire User Reference Field in Parent View

**Discover the parent view's instance key:**

```
list-rules(ruleType="Rule-UI-View", className="{ParentClassName}", ruleName="{ParentViewName}")
→ Record the pzInsKey from the result.
```

**Fetch** the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

**Build the update** using `rules-rule-ui-view/examples/pyContent/user-reference`,
`rules-rule-ui-view/examples/pxViewMetadata/user-reference`, and
`rules-rule-ui-view/references/view-update-workflow`.

Three surfaces plus extra metadata:

| Surface | What to add |
|---------|-------------|
| `pyContent` | `Pega-UI-Content-Field-Text-UserReference` with `pyJsonConfig` referencing `D_pyC11nOperatorsList` |
| `pxViewMetadata` | `UserReference` child with `@USER .PropertyName` value annotation |
| `pxContextMetadata` | Property in `$properties`/`$fields`; property path in `$users`; `D_pyC11nOperatorsList` in `$pagelists` with `metaDataOnly: true` |

```
update-rule(key="{pzInsKey}", updates={...}, changeRequestID="{crKey}")
```

## Step C3 — Verify

Re-fetch the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

Confirm:

1. `pyContent` contains a `Pega-UI-Content-Field-Text-UserReference` entry
2. `pxViewMetadata.children` contains a `UserReference` node
3. `pxContextMetadata.$users` contains the property path
4. `pxContextMetadata.$pagelists` contains `D_pyC11nOperatorsList`
