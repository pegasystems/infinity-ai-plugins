---
name: business-action-reference-field-mapping
description: Load when a Business Action form has case, data, user reference or embedded data fields. Contains DX API pyForm mapping, Playwright automation, and input parameterization rules.
---

## Identify reference fields in the view

Read the component from `pyContent` or `pxViewMetadata`; do not infer the type from labels.

| View component | Type | `pyParameterType` | Key view properties |
|------------------------|------|-------------------|---------------------|
| `ObjectReference` with `pyMode` / `config.mode: "single"` | Single reference (case/data) | `Reference` | `pyFieldReference`, `pyValue`, `pyReferenceComponentType`, labels |
| `ObjectReference` with `pyMode` / `config.mode: "multi"` | Multi reference (case/data) | `Multi-Reference` | `pyFieldReference`, `pySelectionKey`, `pyReferenceComponentType`, labels |
| `UserReference` | User/operator reference | Standard field mapping | `pyFieldReference`, `pyValue`, `pyDisplayAs`, `pyReferenceList`, labels |
| `reference` with `pyRuleType: "view"` | Embedded page reference; fields come from the referenced view | `Reference` | `pyContextField`, `pyClassContext`, `pyRuleName` |
| `EmbeddedDataMulti` | Embedded data list; table for one PageList property | `Multi-Reference` | `pyColumns`, `pyDisplayAs`, `pyEditModeConfig`, `pyLabel`/`pyLabelOption` |

## Key view property purposes

| Property | Purpose |
|----------|---------|
| `pyFieldReference` | Names the parent field in `pyForm`; do not use it as the display label. |
| `pyMode` / `config.mode` | Identifies single versus multi ObjectReference behavior. |
| `pyValue` / `config.value` | Identifies the reference binding; use the last segment as the single-reference selection key. |
| `pySelectionKey` / `config.selectionKey` | Names the property stored for each multi-reference row; strip the leading dot before using it in `pyParameterName`. |
| `pyReferenceComponentType` / `config.componentType` | Tells UI automation which widget to use: `Combobox` maps to `autocomplete`, `Table` maps to `table`. |
| `pyDisplayAs` / `config.displayAs` | For `UserReference`, distinguishes `Drop-down list` from `Search box`; this affects UI automation only. |
| `pyReferenceList` / `config.referenceList` | Data page backing the picker; `UserReference` commonly uses `D_pyC11nOperatorsList`. |
| `pyLabel` / `pyLabelOption` / `config.label` | Supplies labels: `text`/`@L` is literal; `field`, `default`, or `@FL` means fetch the property label. |
| `pyContextField` / `config.context` | Identifies the embedded page context or binding; do not treat it as the only field to map. |
| `pyClassContext` / `config.ruleClass` / `pyTargetObjectClass` | Gives the data class used to fetch and interpret referenced views or list entries. |
| `pyRuleName` / `config.name` | Names the underlying view, such as `pyEdit`, that must be fetched to discover all embedded page fields. |
| `pyColumns` / `config.columns` | Lists inline table columns, or references a primary-fields view, for embedded data list row fields and labels. |
| `pyPagelistValue` / `config.pagelistValue` | Identifies the PageList property used as the embedded-list wrapper field. |
| `pyDisplayAs`, `pyEditModeConfig` / `config.displayAs`, `config.editMode` | Supplies embedded-list display and edit behavior, commonly `table` and `modal` or `tableRows`. |

## Selection keys and field names

Read keys from the view; never hard-code `pyID` or `pyGUID`. For ObjectReference test data, run the configured `referenceList` data page and use a valid value for the resolved selection key.

| Mode | Where to read | Use in `pyForm` |
|------|---------------|-----------------|
| Single reference | Last segment of `pyValue`, e.g. `.MemberRef.pyID` | One `pyTestReferenceField[].pyParameterName` |
| Multi reference | `pySelectionKey` without the leading dot, e.g. `.pyGUID` | Each row's only selection-key field |
| User/operator reference | `pyFieldReference`; stored operator key from the configured operator list, usually `pyUserIdentifier` | Use standard scalar field mapping; do not wrap as `Reference` |
| Embedded page reference | Fetch `pyRuleName` in `pyClassContext`, then read its `pyFieldReference` values | Include every field or column from the underlying view |
| Embedded data list | `pyFieldReference` values in `pyColumns`, or in referenced `pyPrimaryFields` | Include every column field in each row |

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

### Embedded page reference

Use the same `Reference` wrapper as a single reference, but do not map it as one
property. Fetch the underlying view named by `pyRuleName` in `pyClassContext`,
then populate `pyTestReferenceField` with every resolved field or column.
Resolution steps:
- Fetch `pyRuleName` using `pyClassContext`, then collect controls and columns from the fetched view.
- Add each resolved `pyFieldReference` as a separate `pyTestReferenceField` item.
- Preserve the parent embedded reference as wrapper `pyParameterName`; do not map `pyContextField` alone unless it is a fetched field.
- Repeat for nested referenced primary fields if the underlying view points elsewhere.

```json
{
  "pyParameterName": "<embedded reference field from parent view>",
  "pyParameterType": "Reference",
  "pyTestReferenceField": [
    {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<field1 from underlying view>", "pyParameterValue": "<value>"},
    {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<field2 from underlying view>", "pyParameterValue": "<value>"}
  ]
}
```

### Embedded data list

Use the same `Multi-Reference` wrapper as a multi reference, but each row holds
all resolved column fields from `pyColumns`. If `pyColumns` points to
`pyPrimaryFields`, fetch that view to get field names and labels.

```json
{
  "pyParameterName": "<pyFieldReference from view>",
  "pyParameterType": "Multi-Reference",
  "pyTestMultiReferenceList": [
    {"pyTestReferenceField": [
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column1>", "pyParameterValue": "<row 1 value>"},
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column2>", "pyParameterValue": "<row 1 value>"}
    ]},
    {"pyTestReferenceField": [
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column1>", "pyParameterValue": "<row 2 value>"},
      {"pyMapActionParameterFrom": "Constant", "pyParameterName": "<column2>", "pyParameterValue": "<row 2 value>"}
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

- `DISPLAY_AS`: from `pyReferenceComponentType` — `Combobox` → `autocomplete`, `Table` → `table`
- `LABEL`: resolved from the view label properties

### Multi reference (case or data)
- Multi-reference values are never input parameters; hardcode them for DX and UI.
- DX `pyForm` uses selection-key values; Playwright uses visible labels.
- Playwright `Handle_ReferenceListMethods` must receive a `string[]` for multiselect. Never pass a single string or comma-separated
  values.

```typescript
const items = ['Extra legroom', 'Priority boarding'];
await commonUtils.Handle_ReferenceListMethods(page, 'table', 'LABEL', 'multiselect', items);
```

### Embedded page reference

Fetch the underlying view using `pyClassContext` and `pyRuleName`, then fill each
resolved field with the standard locators from `business-action-ui-automation`.

### Embedded data list

Use `Handle_MultiRecordMethods`. Build locators from resolved column labels;
fetch `pyPrimaryFields` first when `pyColumns` references it.

```typescript
const ViewId_Labellocators = {
  "Field1 Label": "//input[@data-testid='Field1 Label:input:control']",
  "Field2 Label": "//input[@data-testid='Field2 Label:currency-input:control']"
};
const ViewId_LabelinputValues = [{"Field1 Label": "val1", "Field2 Label": "val2"}];
await commonUtils.Handle_MultiRecordMethods(page, 'TABLE_LABEL', 'DISPLAY_AS', 'EDIT_MODE', "//button[@aria-label='Add row to %s']", ViewId_Labellocators, ViewId_LabelinputValues);
```

- `DISPLAY_AS`: from `pyDisplayAs`, commonly `table`
- `EDIT_MODE`: from `pyEditModeConfig`, commonly `modal` or `tableRows`

## Input parameterization rules

| Type | In `pyInputParameters`? | `pyMapActionParameterFrom` | Value format |
|------|-------------------------|----------------------------|--------------|
| User/operator reference | **Yes** | Standard `pyForm` scalar with `pyMapRequestFieldFrom: "Input"` | Operator id (`pyUserIdentifier`), not `LABEL:ID` and not nested JSON |
| Single reference (case/data) | **Yes** | `Input` | `LABEL:ID` — label for UI selection, ID for DX API |
| Multi reference (case/data) | **No** | `Constant` | Values directly in `pyForm` |
| Embedded page reference | **No** | `Constant` | All underlying view values directly in `pyForm` |
| Embedded data list | **No** | `Constant` | Values directly in `pyForm` |

For single-reference input wiring, set `pyInputParameters[].pyParameterName` to
the resolved label, `pyInputParameters[].pyParameterValue` to `LABEL:ID`, and
`pyTestReferenceField[].pyParameterValue` to that input parameter name.

## Conditional reference and final checks

- If a reference has RadioButtons-driven `visibilityCondition`, include both fields in `pyForm`.
- Map RadioButtons with standard FormMapping; map the conditional reference with the single-reference structure above.
- Match wrappers to view type, resolve keys from metadata, and fetch underlying views before mapping embedded references.
