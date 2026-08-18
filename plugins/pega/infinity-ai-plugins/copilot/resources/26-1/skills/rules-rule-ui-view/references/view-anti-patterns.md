---
name: view-anti-patterns
description: Common mistakes in view authoring — load before any view create or update task
---

# View Anti-Patterns

Common mistakes in view authoring. Load this reference before any view
create or update task.

## 1. DataReference field duplication

When a DataReference component is used, the **template view** owns all field
display for the referenced page. The parent view contains ONLY the
DataReference component — no standalone field components for the same
properties.

**Wrong:**
```
Parent view: ConfirmScope
  ├── DataReference(.ClientInformation)  → renders template CollectData_ClientInformation
  ├── TextInput(.ClientInformation.ClientName)        ← DUPLICATE
  ├── TextInput(.ClientInformation.ContactPerson)     ← DUPLICATE
  ├── TextInput(.ClientInformation.ContactEmail)      ← DUPLICATE
  └── ...
```

**Right:**
```
Parent view: ConfirmScope
  └── DataReference(.ClientInformation)  → renders template CollectData_ClientInformation
                                            └── TextInput(.ClientName)
                                            └── TextInput(.ContactPerson)
                                            └── TextInput(.ContactEmail)
                                            └── ...
```

**Why it breaks:** The user sees every field twice. Edits may not sync between
the two copies. The DataReference template is the authoritative field layout —
standalone duplicates in the parent view conflict with it.

**Pre-execution check:** Before updating a view that contains a DataReference,
verify that no property exposed by the DataReference template also appears as
a standalone component in the same parent view.

## 2. Region-wrapping a DataReference view

DataReference template views use a **flat `pyContent` layout** — the
AutoComplete/TableSelect field and the Views Region sit at the top level of
`pyContent`, NOT nested inside a Fields Region.

**Wrong:** Wrapping DataReference content in a `"Pega-UI-Content-Region"`
with `pyTemplateName: "DefaultForm"`.

**Right:** Top-level array with the picker field and Views Region as siblings.

See `references/view-template-patterns` for the correct flat layout.

## 3. Plan ambiguity on field placement

When a plan says "add 5 fields to the view," it must specify **where** the
fields go:

- Inside a DataReference template view (the template owns the fields)
- In the parent view as standalone components (no DataReference involved)
- In a Region within the parent view

"Add field X to view Y" is insufficient when DataReferences are involved.
The SA must state the exact component tree level.
