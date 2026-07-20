---
name: business-action-reference-field-mapping
description: Load when a Business Action form has case, data, user reference or embedded data fields. Contains DX API pyForm mapping, Playwright automation, and input parameterization rules.
---

## Identify reference fields in the view

Read the component from `pyContent` or `pxViewMetadata`; do not infer the type from labels.

| View component | Type | `pyParameterType` | Key view properties |
|------------------------|------|-------------------|---------------------|
| `ObjectReference` with `pyMode` / `config.mode: "single"` | Single reference (case/data) | `Reference` | `pyFieldReference`, `pyValue`, `pyReferenceComponentType`, `pyDisplayAs` / `config.displayAs`, labels |
| `ObjectReference` with `pyMode` / `config.mode: "multi"` | Multi reference (case/data) | `Multi-Reference` | `pyFieldReference`, `pySelectionKey`, `pyReferenceComponentType`, `pyDisplayAs` / `config.displayAs`, labels |
| `UserReference` | User/operator reference | Standard field mapping | `pyFieldReference`, `pyValue`, `pyDisplayAs`, `pyReferenceList`, labels |
| `reference` with `pyRuleType: "view"` | Embedded page (single object); fields come from the referenced view | `Embedded Data` | `pyContextField`, `pyClassContext`, `pyRuleName` |
| `EmbeddedDataMulti` | Embedded data list; table for one PageList property | `Embedded List` | `pyEditType`, `pyAddEditView`, `pyAddEditAction`/`pyEditAction`, `pyColumns`, `pyDisplayAs`, `pyEditModeConfig`, `pyLabel`/`pyLabelOption` |

> `Embedded Data` and `Embedded List` author the object inline (you build the data),
> so they may nest any field type — `String`, `Reference`, `Multi-Reference`, `Embedded Data`,
> or `Embedded List` — to any depth. `Reference`/`Multi-Reference` only carry the link key(s).
>
> **Source rule:** single `Reference` supports `pyMapActionParameterFrom: Input` (or `Constant`), including when nested inside embedded structures.
> `Multi-Reference`, `Embedded Data`, and `Embedded List` are **Constant only** — never `Input`, including when nested.

## Key view property purposes

| Property | Purpose |
|----------|---------|
| `pyFieldReference` | Names the parent field in `pyForm`; do not use it as the display label. |
| `pyMode` / `config.mode` | Identifies single versus multi ObjectReference behavior. |
| `pyValue` / `config.value` | Identifies the reference binding; use the last segment as the single-reference selection key. |
| `pySelectionKey` / `config.selectionKey` | Names the property stored for each multi-reference row; strip the leading dot before using it in `pyParameterName`. |
| `pyReferenceComponentType` / `config.componentType` | Tells UI automation which widget to use: `Combobox` maps to `autocomplete`, `Table` maps to `table`. |
| `pyDisplayAs` / `config.displayAs` | Identifies the picker display mode for `ObjectReference` and `UserReference` fields (`Drop-down list`, `Search box`, `advancedSearch`); `advancedSearch` applies to either reference kind. This affects UI automation only. |
| `pyReferenceList` / `config.referenceList` | Data page backing the picker; `UserReference` commonly uses `D_pyC11nOperatorsList`. |
| `pyLabel` / `pyLabelOption` / `config.label` | Supplies labels: `text`/`@L` is literal; `field`, `default`, or `@FL` means fetch the property label. |
| `pyContextField` / `config.context` | Identifies the embedded page context or binding; do not treat it as the only field to map. |
| `pyClassContext` / `config.ruleClass` / `pyTargetObjectClass` | Gives the data class used to fetch and interpret referenced views or list entries. |
| `pyRuleName` / `config.name` | Names the underlying view for embedded single objects. |
| `pyColumns` / `config.columns` | Lists existing-row table display fields; may reference `pyPrimaryFields`. |
| `pyPagelistValue` / `config.pagelistValue` | Identifies the PageList property used as the embedded-list wrapper field. |
| `pyEditType` / `config.editType` | Selects embedded-list row-editor source: direct view (`view`) or Flow Action (`action`). |
| `pyAddEditView` / `config.addEditView` | Names the direct row-editor `Rule-UI-View` when `pyEditType: view`. |
| `pyAddEditAction` / `pyEditAction` / `config.addEditAction` / `config.editAction` | Names the row-editor `Rule-Obj-FlowAction` when `pyEditType: action`. |
| `pyDisplayAs`, `pyEditModeConfig` / `config.displayAs`, `config.editMode` | Supplies embedded-list display and edit behavior, commonly `table` and `modal` or `tableRows`. |

## Selection keys and field names

Read keys from the view; never hard-code `pyID` or `pyGUID`. For ObjectReference test data, run the configured `referenceList` data page and use a valid value for the resolved selection key.

| Mode | Where to read | Use in `pyForm` |
|------|---------------|-----------------|
| Single reference | Last segment of `pyValue`, e.g. `.MemberRef.pyID` | One `pyTestReferenceField[].pyParameterName` |
| Multi reference | `pySelectionKey` without the leading dot, e.g. `.pyGUID` | Each row's only selection-key field |
| User/operator reference | `pyFieldReference`; stored operator key from the configured operator list, usually `pyUserIdentifier` | Use standard scalar field mapping; do not wrap as `Reference` |
| Embedded page reference | Fetch `pyRuleName` in `pyClassContext`, then read its `pyFieldReference` values | One `pyTestEmbeddedObject` field per resolved field |
| Embedded data list | Resolve the row-editor view using the Embedded data list mapping below | Each row's `pyTestEmbeddedObject` holds every field of the resolved editor view incl. nested references — not just the displayed columns |

## DX API mapping (`pyForm`)

### User/operator reference

Use standard scalar field mapping for `UserReference`; do **not** set
`pyParameterType`, `pyTestReferenceField`, or `pyTestMultiReferenceList`

To choose valid values, run the configured `referenceList` data page and use a
returned `pyUserIdentifier`; keep `pyUserName`/`pyLabel` only for UI search text.

### Single reference (case or data)

Use `Reference` for `ObjectReference` with `pyMode: "single"`. If the value is
parameterized, set `pyMapActionParameterFrom` to `Input`; otherwise use
`Constant`.

```json
{
  "pyParameterName": "<pyFieldReference from view>",
  "pyParameterType": "Reference",
  "pyTestReferenceField": [{
    "pyMapActionParameterFrom": "<Input or Constant>",
    "pyParameterName": "<selection key from pyValue>",
    "pyParameterValue": "<value or input parameter name>"
  }]
}
```

### Multi reference (case or data)

Use `Multi-Reference` for `ObjectReference` with `pyMode: "multi"`. Keep values
as constants in `pyForm`; each row contains the selection-key field only.

```json
{
  "pyParameterName": "<pyFieldReference from view>",
  "pyParameterType": "Multi-Reference",
  "pyTestMultiReferenceList": [
    {"pyTestReferenceField": [{
      "pyMapActionParameterFrom": "Constant",
      "pyParameterName": "<selection key from pySelectionKey>",
      "pyParameterValue": "<row 1 value>"
    }]},
    {"pyTestReferenceField": [{
      "pyMapActionParameterFrom": "Constant",
      "pyParameterName": "<selection key from pySelectionKey>",
      "pyParameterValue": "<row 2 value>"
    }]}
  ]
}
```

### Embedded page (single object)

Use `Embedded Data`. Fetch the underlying view named by `pyRuleName` in
`pyClassContext`, then add every resolved field as a `pyTestEmbeddedObject` item.
Each child carries its own `pyParameterType`, so an embedded object can hold scalars,
references, or further embedded structures.

```json
{
  "pyParameterName": "<embedded field from parent view>",
  "pyParameterType": "Embedded Data",
  "pyTestEmbeddedObject": [
    {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<field1>", "pyParameterType": "String", "pyParameterValue": "<value>"},
    {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<field2>", "pyParameterType": "String", "pyParameterValue": "<value>"}
  ]
}
```

### Embedded data list

Use `Embedded List`. Resolve the row-editor view first, then include EVERY field
of that view per row (nested `Reference`/`Multi-Reference`/embedded structures
included). Nested single `Reference` fields may still use `Input` or `Constant`;
nested `Multi-Reference`, `Embedded Data`, and `Embedded List` fields must use
`Constant`.

| `editType` source | Row-editor resolution |
|-------------------|-----------------------|
| `view` (`config.editType` / `pyEditType`) | Fetch the `Rule-UI-View` named in `addEditView` (`config.addEditView` / `pyAddEditView`) on `targetObjectClass`. |
| `action` (`config.editType` / `pyEditType`) | Fetch the `Rule-Obj-FlowAction` named in `addEditAction` / `editAction` (`pyAddEditAction` / `pyEditAction`) on `targetObjectClass` or inherited class, then fetch the `Rule-UI-View` named by its `pyViewReference`. If `pyViewReference` is blank and `pySectionReference` is populated, stop: this is legacy section wiring and not a Constellation view schema. |

`pyColumns`/`pyPrimaryFields` is only the table's displayed columns for existing
rows (usually a subset) — never the row schema.

```json
{
  "pyParameterName": "<pyFieldReference from view>",
  "pyParameterType": "Embedded List",
  "pyTestEmbeddedList": [
    {"pyTestEmbeddedObject": [
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column1>", "pyParameterType": "String", "pyParameterValue": "<row 1 value>"},
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column2>", "pyParameterType": "String", "pyParameterValue": "<row 1 value>"}
    ]},
    {"pyTestEmbeddedObject": [
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column1>", "pyParameterType": "String", "pyParameterValue": "<row 2 value>"},
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column2>", "pyParameterType": "String", "pyParameterValue": "<row 2 value>"}
    ]}
  ]
}
```

## UI automation (Playwright)

### User/operator reference

Use the resolved label from the view. `Drop-down list` normally maps to a select;
`Search box` behaves like a single-select reference picker and must use
`Handle_ReferenceListMethods` with `displayAs: 'autocomplete'`, not a simple
select locator.

```typescript
if (userRef) { await page.getByTestId('<label>:select:control').selectOption(userRef); }
if (userRef) { await commonUtils.Handle_ReferenceListMethods(page, 'autocomplete', '<Label>', 'singleselect', userRef); }
```

### Single reference (case or data)

`param` uses `LABEL:ID`; the label drives UI selection and the ID drives DX API
mapping.

```typescript
if (param) { await commonUtils.Handle_ReferenceListMethods(page, 'DISPLAY_AS', 'LABEL', 'singleselect', param); }
```

If `displayAs` is `advancedSearch`, use `Handle_SearchAndSelectSingle`; for all other display types, keep using the existing `Handle_ReferenceListMethods` pattern above.

```typescript
if (param) {
  await commonUtils.Handle_SearchAndSelectSingle(
    page,
    'LABEL',
    Label_searchCriterion,
    [{ label: 'Search Field Label', type: 'TextInput', value: 'Search value' }],
    param
  );
}
```

- For single-select advancedSearch, pass `LABEL:ID` when parameterized; the
  utility uses the label segment for UI selection while DX mapping still uses
  ID.

- `DISPLAY_AS`: from `pyReferenceComponentType` — `Combobox` → `autocomplete`, `Table` → `table`
- `LABEL`: resolved from the view label properties
- `Label_searchCriterion` : the `{Label}_searchCriterion` **input parameter** (a variable, not a literal) holding the Search-by category value. Pass an empty string (`''`) when the picker has only one search group; set it only when multiple groups exist

### Multi reference (case or data)
- Multi-reference values are never input parameters; hardcode them for DX and UI.
- DX `pyForm` uses selection-key values; Playwright uses visible labels.
- Playwright `Handle_ReferenceListMethods` must receive a `string[]` for multiselect. Never pass a single string or comma-separated values.

```typescript
const items = ['Extra legroom', 'Priority boarding'];
await commonUtils.Handle_ReferenceListMethods(page, 'table', 'LABEL', 'multiselect', items);
```

If `displayAs` is `advancedSearch`, use `Handle_SearchAndSelectMulti`; for all other display types, keep using the existing `Handle_ReferenceListMethods` pattern above.

### Embedded page / Embedded Data

Fetch the underlying view using `pyClassContext` and `pyRuleName`, then fill each
resolved field with the standard locators from `business-action-ui-automation`.

### Embedded data list

Use `Handle_MultiRecordMethods`. Build locators from the same resolved editor view
the DX mapping uses and include every editor field in `ViewId_LabelinputValues`.

```typescript
const ViewId_Labellocators = {
  "Field1 Label": "Field1 Label:input:control",
  "Field2 Label": "Field2 Label:currency-input:control"
};
const ViewId_LabelinputValues = [{"Field1 Label": "val1", "Field2 Label": "val2"}];
await commonUtils.Handle_MultiRecordMethods(page, 'TABLE_LABEL', 'DISPLAY_AS', 'EDIT_MODE', "//button[@aria-label='Add BUTTON_LABEL']", ViewId_Labellocators, ViewId_LabelinputValues);
```

- `DISPLAY_AS`: from `pyDisplayAs`, commonly `table`
- `EDIT_MODE`: from `pyEditModeConfig`, commonly `modal` or `tableRows`
- `BUTTON_LABEL`: from `Add Label` if custom else the label

## Input parameterization rules

| Type | In `pyInputParameters`? | `pyMapActionParameterFrom` | Value format |
|------|-------------------------|----------------------------|--------------|
| User/operator reference | **Yes** | Standard `pyForm` scalar with `pyMapRequestFieldFrom: "Input"` | Operator id (`pyUserIdentifier`), not `LABEL:ID` and not nested JSON |
| Single reference (case/data) | **Yes** | `Input` | `LABEL:ID` — label for UI selection, ID for DX API |
| Multi reference (case/data) | **No** | `Constant` | Values directly in `pyForm` |
| Embedded page (single object) | **No** for the embedded wrapper | Single nested `Reference` may be `Input` or `Constant`; nested `Multi-Reference`/embedded structures are `Constant` only | Underlying view values are represented directly in `pyForm`; only simple reference fields can be input-parameterized |
| Embedded data list | **No** for the embedded wrapper | Single nested `Reference` may be `Input` or `Constant`; nested `Multi-Reference`/embedded structures are `Constant` only | Row-editor values are represented directly in `pyForm`; only simple reference fields can be input-parameterized |

For single-reference input wiring, set `pyInputParameters[].pyParameterName` to
the resolved label, `pyInputParameters[].pyParameterValue` to `LABEL:ID`, and
`pyTestReferenceField[].pyParameterValue` to that input parameter name.

## Conditional reference and final checks

- If a reference has RadioButtons-driven `visibilityCondition`, include both fields in `pyForm`.
- Map RadioButtons with standard FormMapping; map the conditional reference with the single-reference structure above.
- Match wrappers to view type, resolve keys from metadata, and fetch underlying views before mapping embedded references.