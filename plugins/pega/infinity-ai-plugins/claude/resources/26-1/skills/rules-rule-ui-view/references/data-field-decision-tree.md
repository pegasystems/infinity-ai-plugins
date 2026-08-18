---
name: view-data-field-decision-tree
description: "Decision tree and dependency graphs for choosing and executing the correct data-field path — Embedded Data, Data Reference, User Reference, or Simple Table"
---
# Data Field Decision Tree & Dependency Graphs

Use this reference when adding a data-related field to a Constellation view.
The field type determines which prerequisite chain to follow.

## Decision Tree — Which Path?

```
What kind of data field?
│
├─ Inline embedded form (Page or PageList sub-view)
│  → Path A: Embedded Data
│    Component: Pega-UI-Content-Field-Data-Embedded
│    Examples:  rules-rule-ui-view/examples/pyContent/embedded-data
│               rules-rule-ui-view/examples/pxViewMetadata/embedded-data
│
│    Page (inline form) uses `context` in pyJsonConfig.
│    PageList (SimpleTable delegation) uses `authorContext` in pyJsonConfig.
│       Examples: rules-rule-ui-view/examples/pyContent/embedded-data-pagelist
│                 rules-rule-ui-view/examples/pxViewMetadata/embedded-data-pagelist
│
│    Infinity 26+ only option: EmbeddedDataMulti PageList table
│       Example: rules-rule-ui-view/examples/append/embedded-data-multi-field
│       Verify: methodology-explain-application (Server Version Discovery)
│
├─ Lookup/picker for a related data record
│  → Path B: Data Reference
│    Component: Pega-UI-Content-Field-Data-Reference
│    Example:   rules-rule-ui-view/examples/append/data-reference-field
│    Sub-view:  DataReference template (AutoComplete or SimpleTableSelect)
│    │
│    ├─ Single-select search box → AutoComplete
│    │  Example: rules-rule-ui-view/examples/data-reference-autocomplete-view
│    │
│    └─ Multi-select table picker → SimpleTableSelect
│       Example: rules-rule-ui-view/examples/data-reference-table-select-view
│
│    Infinity 26+ only option: ObjectReference direct data page binding
│       Example: rules-rule-ui-view/examples/append/object-reference-data-reference-field
│       Verify: methodology-explain-application (Server Version Discovery)
│
├─ Operator/user lookup
│  → Path C: User Reference  (lightweight — no class/view chain needed)
│    Component: Pega-UI-Content-Field-Text-UserReference
│    Examples:  rules-rule-ui-view/examples/pyContent/user-reference
│               rules-rule-ui-view/examples/pxViewMetadata/user-reference
│
└─ Editable inline table (PageList rows with columns)
   → Path D: Simple Table  (standalone view, not a field in another view)
     Template:  SimpleTable
      Example:   rules-rule-ui-view/examples/simple-table-view
```

## Dependency Graphs

### Path A — Embedded Data

```
1. Data class (Rule-Obj-Class)
   │
2. Properties on data class (Rule-Obj-Property × N)
   │
3. Sub-view on data class (Rule-UI-View, template: DefaultForm)
   │
4. Page/PageList property on parent (Rule-Obj-Property)
   │
5a. Infinity 24/25-compatible path:
    Parent view update — wire Pega-UI-Content-Field-Data-Embedded as reference
    (sub-view listed in pxContextMetadata.$views)

5b. Infinity 26+ EmbeddedDataMulti path:
    Parent view update — wire Pega-UI-Content-Field-Data-Embedded as EmbeddedDataMulti
    (PageList listed in pxContextMetadata.$pagelists with $actions/$views)
```

### Path B — Data Reference

```
1. Data class (Rule-Obj-Class)
   │
2. Properties on data class (Rule-Obj-Property × N)
   │
3. Data page for lookup (Rule-Declare-Pages)     ← extra layer vs Path A
   │
4a. Infinity 24/25-compatible path:
    DataReference template view on parent class
    (Rule-UI-View, template: DataReference)
    ├─ AutoComplete variant  (single-select search)
    └─ SimpleTableSelect variant (multi-select table)
    │
    Page/PageList property on parent (Rule-Obj-Property)
    │
    Parent view update — wire Pega-UI-Content-Field-Data-Reference as reference

4b. Infinity 26+ ObjectReference path:
    Page property on parent (Rule-Obj-Property)
    │
    Parent view update — wire Pega-UI-Content-Field-Data-Reference as ObjectReference
    (no DataReference template view; no $views entry for the ObjectReference itself)
```

### Paths C/D — User Reference and Simple Table

- Path C: create or verify a Text property on the parent class, then wire
  `Pega-UI-Content-Field-Text-UserReference`.
- Path D: create/verify data class, row properties, PageList property on parent, then
  create the `SimpleTable` view.

## Shared Steps (Paths A, B, D)

> All `create-rule` and `update-rule` calls require a `changeRequestID` from
> an active ChangeRequest case. See `methodology-change-request-workflow` for the full
> lifecycle.

### Step 0 — Load Skills

Load `rules-rule-obj-class`, `rules-rule-obj-property`, and `rules-rule-ui-view`.

### Step 1 — Check Prerequisites

Before creating anything, verify what already exists.

**1a. Does the data class exist?**

```
search-rules(ruleType="Rule-Obj-Class", searchText="{DataClassName}")
```

If found, skip to Step 1b. If not found, proceed to Step 2.

**1b. Do properties exist on the data class?**

For each needed property, run
`list-rules(ruleType="Rule-Obj-Property", className="{DataClassName}", ruleName="{PropertyName}")`.
Record which exist and which need creation.

**1c. Does the Page/PageList property exist on the parent class?**

`list-rules(ruleType="Rule-Obj-Property", className="{ParentClassName}", ruleName="{PagePropertyName}")`

**1d. (Path B only) Does the data page exist?**

`search-rules(ruleType="Rule-Declare-Pages", searchText="{DataPageName}")`

**1e. Does the sub-view / template view already exist?**

`list-rules(ruleType="Rule-UI-View", className="{ClassName}", ruleName="{ViewName}")`

If all prerequisites exist, skip ahead to the wiring step for your path.

### Step 2 — Create the Data Class (if missing)

Load `rules-rule-obj-class` and use the appropriate example:

- **Embedded class** (no persistence, lives on clipboard): `rules-rule-obj-class/examples/embed-class`
- **Data class** (persisted, shared): `rules-rule-obj-class/examples/data-class`

```
create-rule(ruleType="Rule-Obj-Class", content={...}, changeRequestID="{crKey}")
```

Verify:

```
search-rules(ruleType="Rule-Obj-Class", searchText="{DataClassName}")
```

### Step 3 — Create Properties on the Data Class

For each missing property, create it using `rules-rule-obj-property`.
Match the property type to the appropriate example (text, date, dropdown, etc.).

```
create-rule(ruleType="Rule-Obj-Property", content={...}, changeRequestID="{crKey}")
```

**Verify all properties exist before proceeding:**

```
list-rules(ruleType="Rule-Obj-Property", className="{DataClassName}")
```
