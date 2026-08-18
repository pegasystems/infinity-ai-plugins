---
name: view-path-a-embedded-data
description: "Path A — Embedded Data: create sub-view, Page/PageList property, and wire Pega-UI-Content-Field-Data-Embedded into the parent view"
---
# Path A — Embedded Data

Continue from Shared Steps in `rules-rule-ui-view/references/data-field-decision-tree`.

> All `create-rule` and `update-rule` calls require a `changeRequestID`.

## Step A4 — Create the Sub-View (DefaultForm)

This view renders the embedded object's fields. It lives on the **data class**.

Follow the **Required Tool Sequence** from `rules-rule-ui-view`:

1. **list-rules** — verify every property exists on the data class
2. **Build the view payload** — use `rules-rule-ui-view/examples/stub`; set `pyClassName` to the
   data class, add a field entry per property
3. **create-rule** — submit the view

```
create-rule(ruleType="Rule-UI-View", content={...}, changeRequestID="{crKey}")
```

Verify:

```
list-rules(ruleType="Rule-UI-View", className="{DataClassName}", ruleName="{SubViewName}")
```

## Step A5 — Create Page/PageList Property on Parent

Use `rules-rule-obj-property`:

- Single object → `rules-rule-obj-property/examples/page` (`pyPropertyMode`: `"Page"`)
- List of objects → `rules-rule-obj-property/examples/page-list` (`pyPropertyMode`: `"PageList"`)

Set `pyPageClass` to the data class name.

```
create-rule(ruleType="Rule-Obj-Property", content={...}, changeRequestID="{crKey}")
```

## Step A6 — Wire Embedded Data Field in Parent View

**Discover the parent view's instance key:**

```
list-rules(ruleType="Rule-UI-View", className="{ParentClassName}", ruleName="{ParentViewName}")
→ Record the pzInsKey from the result.
```

**Fetch** the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

Choose the parent-view pattern:

- **Infinity 24/25/26 Page (inline form):** use
  `rules-rule-ui-view/examples/append/embedded-data-field`, or merge the fragments from
  `rules-rule-ui-view/examples/pyContent/embedded-data` and
  `rules-rule-ui-view/examples/pxViewMetadata/embedded-data` following
  `rules-rule-ui-view/references/view-update-workflow`.
  Uses `context` in `pyJsonConfig`. The `$views` entry includes `context`.
- **Infinity 24/25/26 PageList (SimpleTable delegation):** use
  `rules-rule-ui-view/examples/append/embedded-data-pagelist-field`, or merge the fragments from
  `rules-rule-ui-view/examples/pyContent/embedded-data-pagelist` and
  `rules-rule-ui-view/examples/pxViewMetadata/embedded-data-pagelist`.
  Uses `authorContext` in `pyJsonConfig`. The `$views` entry does NOT include `context`.
- **Infinity 26+ only embedded PageList table:** use
  `rules-rule-ui-view/examples/append/embedded-data-multi-field`. This uses
  `EmbeddedDataMulti`, `pyPrimaryFields` columns, `$pagelists.$actions`, and
  `$pagelists.$views`. Verify server version first using
  `methodology-explain-application` (Server Version Discovery). Do not use it for
  Infinity 24 or Infinity 25.
All three surfaces must be updated:

| Pattern | Surface | What to add |
|---------|---------|-------------|
| Embedded sub-view | `pyContent` | `Pega-UI-Content-Field-Data-Embedded` element with `pyRuleName` (sub-view), `pyType` (Page/PageList) |
| Embedded sub-view | `pxViewMetadata` | `reference` child with sub-view `name`, `ruleClass`, `type: "view"` |
| Embedded sub-view | `pxContextMetadata` | Sub-view in `$views` (do NOT add embedded data to `$properties`/`$fields` — server strips them) |
| EmbeddedDataMulti (Infinity 26+) | `pyContent` | `Pega-UI-Content-Field-Data-Embedded` with `pyComponentName: "EmbeddedDataMulti"` |
| EmbeddedDataMulti (Infinity 26+) | `pxViewMetadata` | `EmbeddedDataMulti` child with table/edit/column config |
| EmbeddedDataMulti (Infinity 26+) | `pxContextMetadata` | Data class in `$classesmetadata`; PageList entry in `$pagelists` with `$actions`, `$views`, and `includePrimaryFields` |

```
update-rule(key="{pzInsKey}", updates={...}, changeRequestID="{crKey}")
```

## Step A7 — Verify

Re-fetch the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

Confirm:

1. `pyContent` contains a `Pega-UI-Content-Field-Data-Embedded` entry
2. `pxViewMetadata.children` contains a `reference` for the sub-view
3. `pxContextMetadata.$views` contains `{ "name": "{SubViewName}", "ruleClass": "{DataClassName}" }`
4. For EmbeddedDataMulti, `pyContent` contains `pyComponentName: "EmbeddedDataMulti"`
5. For EmbeddedDataMulti, `pxContextMetadata.$pagelists` contains the PageList with `$actions`, `$views`, and `includePrimaryFields`
