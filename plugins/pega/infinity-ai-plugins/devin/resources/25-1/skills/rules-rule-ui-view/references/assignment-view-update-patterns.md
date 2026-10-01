---
name: view-assignment-update-patterns
description: "Assignment Rule-UI-View update patterns for adding, changing, reordering, removing, and verifying form fields"
---
# Assignment View Update Patterns

Apply all field changes -- adds, updates, reorders, and removals -- in a **single**
`update-rule` call on the main view. Piecemeal calls risk
intermediate divergence.

Always update `pxViewMetadata`, `pyContent`, and `pxContextMetadata` together.

## Classify Each Requested Field

For each field in scope, search for it and determine which operation applies.

| Classification | Condition | Action |
|----------------|-----------|--------|
| **A — New** | Property does not exist on the class | Create property, then add to view |
| **B — Add to view** | Property exists on class but is not in `pyContent` | Add to view only |
| **C — Update view entry** | Property exists and is in `pyContent`; change component, order, or read-only | Update view entry in place |
| **D — Update property** | Property exists; change label, max length, description, or type | Update property, then update view if component changes |
| **E — Remove from view** | Property should no longer appear on this form | Remove entry from all three surfaces |

Resolve all classifications before making any changes. For Classification A, new
properties must exist **before** the view is updated to reference them.

## Adding A New Field

Append a new entry to `children` in `pxViewMetadata` and a matching entry to
`pyContent`. Add the field name to `$properties` and `$fields` in `pxContextMetadata`.

```json
{
  "pxViewMetadata": "<updated JSON string -- append new entry to children>",
  "pyContent": [{
    "pxObjClass": "Pega-UI-Content-Region",
    "pyName": "Fields",
    "pyPromptClass": "Org-App-Work-CaseType",
    "pyComponentName": "Region",
    "pyContent": [
      "// ... all existing entries verbatim ...",
      {
        "pxObjClass": "Pega-UI-Content-Field-Text",
        "pyFieldReference": "NewField",
        "pyValueWithoutAnnotation": ".NewField",
        "pyValue": ".NewField",
        "pyComponentName": "TextInput",
        "pyPromptClass": "Org-App-Work-CaseType",
        "pyLabel": ".NewField",
        "pyLabelOption": "field",
        "pyDisplayLabel": "Text (single line)"
      }
    ],
    "pyDisplayLabel": "Region"
  }],
  "pxContextMetadata": "<updated JSON string -- add .NewField to $properties and $fields>"
}
```

## Dropdown/Picklist Field

When a property has associated `Rule-Obj-FieldValue` prompt values, all four wiring
layers must be set in a single update.

Prerequisites:

- The property must exist as `Text` type with `pyStreamName: "pxDropdown"`.
- `Rule-Obj-FieldValue` rules must define the allowed values for the property.

`pxViewMetadata` entry:

```json
{"config":{"datasource":"@ASSOCIATED .PropertyName","deferDatasource":true,"label":"@FL .PropertyName","labelOption":"default","listType":"associated","placeholder":"@L Select...","value":"@P .PropertyName"},"type":"Dropdown"}
```

`pyContent` entry:

```json
{"pxObjClass":"Pega-UI-Content-Field-Picklist","pyComponentName":"Dropdown","pyDisplayLabel":"Picklist","pyFieldReference":"PropertyName","pyLabel":".PropertyName","pyLabelOption":"field","pyPromptClass":"Org-App-Work-CaseType","pyValue":".PropertyName","pyValueWithoutAnnotation":".PropertyName","pyDatasource":".","pyDeferDatasource":"true","pyIsAssociated":"true","pyJsonConfig":"{\"datasource\":\"@ASSOCIATED .PropertyName\"}","pyListType":"associated","pyPlaceholder":"Select..."}
```

`pxContextMetadata.$associated` entry:

```json
{"$associated":[{"name":".PropertyName","deferDatasource":true}]}
```

`pxDependencies.components` must include `"Dropdown"` (not `"Picklist"` or `"DropDown"`).

Key differences from TextInput:

- `pxViewMetadata.type` is `Dropdown`.
- `pxViewMetadata.config` includes `datasource`, `deferDatasource`, `listType`, and `placeholder`.
- `datasource` uses `@ASSOCIATED .PropertyName`.
- `pyContent.pxObjClass` is `Pega-UI-Content-Field-Picklist`.
- `pyComponentName` is `Dropdown` (lowercase d, NOT `DropDown`).
- `pyContent` includes `pyDatasource`, `pyDeferDatasource`, `pyIsAssociated`,
  `pyJsonConfig`, `pyListType`, and `pyPlaceholder`.

## Updating A Field's Component Type

Locate the field's entry in `pxViewMetadata.children[*].children` and change its
`type`. Locate the matching entry in `pyContent[*].pyContent` and change
`pxObjClass` and `pyComponentName` to match the new component.

| UI control | `pxViewMetadata` `type` | `pxObjClass` | `pyComponentName` |
|------------|-------------------------|--------------|-------------------|
| Single-line text | `TextInput` | `Pega-UI-Content-Field-Text` | `TextInput` |
| Multi-line text | `TextArea` | `Pega-UI-Content-Field-Text` | `TextArea` |
| Date | `DateTime` | `Pega-UI-Content-Field-Date` | `DateTime` |
| Dropdown | `Dropdown` | `Pega-UI-Content-Field-Picklist` | `Dropdown` |
| Radio buttons | `RadioButtons` | `Pega-UI-Content-Field-Text` | `RadioButtons` |
| Checkbox (boolean) | `Checkbox` | `Pega-UI-Content-Field-Boolean` | `Checkbox` |
| Data reference | `reference` | `Pega-UI-Content-Field-Data-Reference` | `reference` |

## Other View-Only Changes

- **Read-only field:** In `pxViewMetadata`, add `"readOnly": true` to the field's
  `config` object. No change is needed to `pyContent` or `pxContextMetadata` for
  read-only alone.
- **Override a field label on this form only:** In `pxViewMetadata`, set
  `"labelOption": "custom"` and replace `"label"` with a literal string. The
  property's `pyLabel` is unchanged.
- **Reorder fields:** Reorder entries in both `pxViewMetadata.children[*].children`
  and `pyContent[*].pyContent` identically. `pxContextMetadata` does not need to
  change for a reorder.
- **Remove a field:** Omit the field's entry from both `pxViewMetadata` and `pyContent`.
  Remove it from `$properties` and `$fields` in `pxContextMetadata`. The underlying
  property is preserved.

## Critical Rules

- Always include **all** retained fields in `pyContent` -- any entry omitted is removed
  from the form.
- Copy retained `pyContent` entries **verbatim** from the `get-rule` output.
- Preserve `pyJsonConfig` values on data reference fields exactly.
- All three fields (`pxViewMetadata`, `pyContent`, `pxContextMetadata`) must be
  submitted in the same update call.

## Verify

Use `get-rule` on the main view with `detail="full"` and check:

- `pyRuleFormStatus: Good`.
- `pxWarnings[0]` is empty.
- `pyContent[N]` count matches the expected total number of fields (added - removed).
- `pxContextMetadata.$fields` reflects the final set of field names with no stale entries.
- `pxDependencies` includes component types in use (e.g., `DateTime`, `TextArea`).
- For updated components, confirm the new `pyComponentName` is present in `pyContent`.
- For removed fields, confirm they are absent from `pyContent` and `pxContextMetadata`.
