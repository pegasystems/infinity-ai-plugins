---
name: view-path-b-data-reference
description: "Path B — Data Reference: create data page, DataReference template view (AutoComplete or SimpleTableSelect), Page property, and wire Pega-UI-Content-Field-Data-Reference into the parent view"
---
# Path B — Data Reference

Continue from Shared Steps in `rules-rule-ui-view/references/data-field-decision-tree`.

> All `create-rule` and `update-rule` calls require a `changeRequestID`.

## Step B4 — Create the Data Page (if missing)

The data page provides the lookup source for the DataReference picker.
Load `rules-rule-declare-pages` for schema guidance.

```
create-rule(ruleType="Rule-Declare-Pages", content={...}, changeRequestID="{crKey}")
```

> Data pages use `create-rule`.

Verify:

```
search-rules(ruleType="Rule-Declare-Pages", searchText="{DataPageName}")
```

## Pattern Choice

- **Infinity 24/25 compatible:** use the DataReference template-view pattern in Step B5.
  This creates a standalone DataReference view and embeds it through a `reference`
  component in the parent view.
- **Infinity 26+ only:** use the ObjectReference pattern when the target environment is
  Infinity 26 or later. It binds the parent field directly to a data page and data
  class with `ObjectReference`; it does not use a DataReference template view.

Verify server version first using `methodology-explain-application` (Server Version
Discovery). Do not use ObjectReference examples for Infinity 24 or Infinity 25.

## Step B5 — Create the DataReference Template View

This is a standalone view that provides the lookup UI. It lives on the **parent class**
(or data class for multi-select table patterns).

Choose the variant:

- **AutoComplete** (single-select search box):
  Use `rules-rule-ui-view/examples/data-reference-autocomplete-view`
  - `pyTemplateName`: `"DataReference"`, `pxViewType`: `"datareference"`
  - Flat `pyContent` layout (AutoComplete + Views Region at top level)
  - `pyJsonConfig` declares `contextClass`, `referenceList` (data page name),
    `classKeys`, `selectionMode: "single"`
  - `$classesmetadata` lists the data class with `fetchDefaultDataSources: true`
  - `$pagelists` includes the data page with `metaDataOnly: true`

- **SimpleTableSelect** (multi-select table picker):
  Use `rules-rule-ui-view/examples/data-reference-table-select-view`
  - Same template/type as AutoComplete
  - `selectionMode: "multi"`, `displayAs: "simpleTable"`
  - Uses `Pega-UI-Content` (base class), not `Pega-UI-Content-Field-Text`
  - `presets` define table columns; `detailsDisplay` for row detail

```
create-rule(ruleType="Rule-UI-View", content={...}, changeRequestID="{crKey}")
```

Verify:

```
list-rules(ruleType="Rule-UI-View", className="{ClassName}", ruleName="{DataRefViewName}")
```

## Step B6 — Create Page Property on Parent

Create a **Page** property on the parent class pointing to the data class.
Use `rules-rule-obj-property/examples/page`.

For multi-select (SimpleTableSelect), create a **PageList** property instead
using `rules-rule-obj-property/examples/page-list`.

```
create-rule(ruleType="Rule-Obj-Property", content={...}, changeRequestID="{crKey}")
```

## Step B7 — Wire Data Reference Field in Parent View

**Discover the parent view's instance key:**

```
list-rules(ruleType="Rule-UI-View", className="{ParentClassName}", ruleName="{ParentViewName}")
→ Record the pzInsKey from the result.
```

**Fetch** the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

For Infinity 24/25-compatible template-view Data References, build the update using
`rules-rule-ui-view/examples/append/data-reference-field`.

For Infinity 26+ ObjectReference Data References, build the update using
`rules-rule-ui-view/examples/append/object-reference-data-reference-field`.

All three surfaces:

| Pattern | Surface | What to add |
|---------|---------|-------------|
| Template view pattern | `pyContent` | `Pega-UI-Content-Field-Data-Reference` with `pyJsonConfig` referencing the DataReference template view |
| Template view pattern | `pxViewMetadata` | `reference` child with the template view `name`, `referenceType: "Data"`, `ruleClass` |
| Template view pattern | `pxContextMetadata` | Property in `$properties`/`$fields`; template view in `$views` |
| ObjectReference (Infinity 26+) | `pyContent` | `Pega-UI-Content-Field-Data-Reference` with `pyComponentName: "ObjectReference"`, `pyDataSource`, target object fields |
| ObjectReference (Infinity 26+) | `pxViewMetadata` | `ObjectReference` child with `referenceList`, `targetObjectClass`, `componentType: "Combobox"` |
| ObjectReference (Infinity 26+) | `pxContextMetadata` | Property paths in `$properties`/`$fields`; data class in `$classesmetadata`; data page in `$pagelists` |

```
update-rule(key="{pzInsKey}", updates={...}, changeRequestID="{crKey}")
```

## Step B8 — Verify

Re-fetch the parent view:

```
get-rule(key="{pzInsKey}", detail="full")
```

Confirm:

1. `pyContent` contains a `Pega-UI-Content-Field-Data-Reference` entry
2. Template-view pattern: `pxViewMetadata.children` contains a `reference` with `referenceType: "Data"`
3. Template-view pattern: `pxContextMetadata.$views` contains the DataReference template view entry
4. ObjectReference pattern: `pyContent` contains `pyComponentName: "ObjectReference"`
5. ObjectReference pattern: `pxContextMetadata.$classesmetadata` contains the data class and `$pagelists` contains the data page
