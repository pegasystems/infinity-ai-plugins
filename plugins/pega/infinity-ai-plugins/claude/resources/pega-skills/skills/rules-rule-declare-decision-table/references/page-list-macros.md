---
name: decision-table-page-list-macros
description: Use when decision table property columns target page lists and need `<APPEND>` and `<LAST>` macros to build rows correctly.
---

# Page List Macros in Property Paths

When property columns target a page list, use `<APPEND>` and `<LAST>` macros to
build the list row-by-row:

| Macro | Purpose | Usage |
|-------|---------|-------|
| `<APPEND>` | Appends a new page to the page list | First property column -- creates the page |
| `<LAST>` | References the last-appended page | Subsequent columns -- sets properties on it |

Example property column paths:
```
.pxResults(<APPEND>).Name      ← creates new page, sets Name
.pxResults(<LAST>).Class       ← sets Class on last-appended page
.pxResults(<LAST>).Message     ← sets Message on last-appended page
```

**Requirements for page list macros:**
- `pyEvaluateAllRows` must be `"yes"` -- each row appends one page
- `pyPagesAndClasses` must declare the page list class mapping
- Only the first property column should use `<APPEND>` -- subsequent columns use `<LAST>`
- `pyDelegatedRestrictions.default.pyEvaluateAllRows` should also be `"yes"` for consistency

## pyPagesAndClasses

Declares page-to-class mappings for page list targets:

```json
"pyPagesAndClasses": [
  {
    "pxObjClass": "Embed-PagesAndClasses",
    "pyPageName": ".pxResults",
    "pyPageClass": "Embed-Rule-Obj-Guardrail"
  }
]
```

Only needed when property column paths reference page lists with `<APPEND>`/`<LAST>`.
Not needed for simple property paths or `Param.Name` references.
