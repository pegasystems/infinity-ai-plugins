---
name: business-action-advanced-search
description: Load when a Business Action form has a search-and-select (an advanced search picker) reference field to look up record(s). Contains DX API mapping rules and Playwright automation patterns for selecting one or more records.
---

## Mapping invariants

| Field | DX API mapping | Playwright selection value |
|---|---|---|
| Single `ObjectReference` | `pyParameterType: "Reference"` with one `pyTestReferenceField` keyed by the selection key from `pyValue` | `LABEL:ID` parameter value |
| Multi `ObjectReference` | `pyParameterType: "Multi-Reference"` with one `pyTestReferenceField` per selected row keyed by `pySelectionKey` | `[]` of display values; never one string or comma-separated values |
| `UserReference` with advancedSearch display | Standard scalar field mapping; no `pyParameterType`, `pyTestReferenceField`, or `pyTestMultiReferenceList` | Operator display value for UI; operator id for DX/API input |

advancedSearch affects Playwright only; use the DX mapping in the table above.

## CommonUtils signatures

```typescript
Handle_SearchAndSelectSingle(page, label, searchCriterion, searchFields, searchPick)
Handle_SearchAndSelectMulti(page, label, searchCriterion, searchFields, searchPicks)
```

| Argument | Value |
|---|---|
| `label` | Resolved field label from view metadata |
| `searchCriterion` | Search-by category value from the SearchBy dropdown. Empty string when the picker has only one search group; set only when multiple groups exist |
| `searchFields` | Array of `{ label, type, value }` objects — one per search criteria field, in order |
| `searchPick` (single) | Single-selection input parameter value (`LABEL:ID`) |
| `searchPicks` (multi) | Array of display values to select |

Each `searchFields` entry describes one search criteria control:

| Key | Value |
|---|---|
| `label` | Search field label as shown in the search form |
| `type` | The search field's `pyComponentName` from the Field-type-to-locator table in `business-action-ui-automation` (e.g. `TextInput`, `Dropdown`, `Currency`, `pxDateTime`, `pxAutoComplete`) |
| `value` | Value to enter in that search field |

## Single-select Playwright pattern

```typescript
if (param) {
  await commonUtils.Handle_SearchAndSelectSingle(page, 'LABEL', Label_searchCriterion,
    [{ label: 'Search Field Label', type: 'TextInput', value: 'Search value' }], param);
}
```

## Multi-select Playwright pattern

```typescript
const values = ['Name1', 'Name2'];
await commonUtils.Handle_SearchAndSelectMulti(page, 'LABEL', Label_searchCriterion,
  [{ label: 'Search Field Label', type: 'TextInput', value: 'Search value' }], values);
```

## Mandatory picker view extraction

> **Required for every `advancedSearch` field before writing any Playwright or params.**

1. **Fetch the picker view** — `get-rule(detail="full")` on the field's picker view. Never assume the group structure.
2. **Extract ALL "Search by" groups** — each group's exact criterion string + every filter field (label, `pyComponentName`, property ref).

3. **Add `searchCriterion` as a `pyInputParameter`** — always named `{Label}_searchCriterion` (e.g., `Approver_searchCriterion`), defaulting to the most representative group. This input parameter is passed into the Playwright method as the `searchCriterion` argument, letting test cases drive different search paths without editing the BA.

4. **One `if`/`else if` Playwright block per group** — branch on `{Label}_searchCriterion`; each block has its own `searchFields[]`; last group is the `else` fallback (empty-string criterion). See `business-action-single-reference-field-advanced-search` and `business-action-multi-reference-field-advanced-search` for the code pattern.

**DX mapping is unaffected** — `pyForm` still carries only the selected record's key
(`LABEL:ID`). The criterion and filter fields are UI-only; they do not appear in `pyForm`.

---

## Multiple "Search by" categories

A SearchBy picker may expose a **"Search by" dropdown** with several categories,
where each category shows a **different set of search fields**. Pass the chosen category
as `searchCriterion`, and provide the search fields of that category in the `searchFields` array.
Do not hardcode one category — treat the category as a value (the `{Label}_searchCriterion`
input parameter) that selects which search fields apply.

When the picker has only **one** search group there is no "Search by" dropdown,
so `searchCriterion` is an empty string (`''`). Provide the group's search fields in
`searchFields` as usual. Only populate `searchCriterion` when the picker exposes multiple
groups to choose from.

**Each `searchFields` entry maps a search field to its control by `type`.**
Each search field can be a different control type; set `type` to the search
field's `pyComponentName` from the Field-type-to-locator table in
`business-action-ui-automation` (e.g. `TextInput`, `Dropdown`, `Currency`,
`pxDateTime`, `pxAutoComplete`).

```typescript
await commonUtils.Handle_SearchAndSelectSingle(
  page,
  'LABEL',
  Label_searchCriterion,
  [
    { label: 'Search Field Label 1', type: 'Dropdown', value: 'Search Value 1' },
    { label: 'Search Field Label 2', type: 'Currency', value: 'Search Value 2' },
    { label: 'Search Field Label 3', type: 'pxDateTime', value: 'Search Value 3' }
  ],
  searchPick
);
```

- `LABEL` — the reference field label.
- `Label_searchCriterion` — the `{Label}_searchCriterion` input parameter holding the selected "Search by" category value.
- Each `searchFields` entry uses the search field `label`, its control `type`, and the
  `value` to enter.
- `type` is the search field's `pyComponentName` from the Field-type-to-locator
  table in `business-action-ui-automation` (e.g. `TextInput`, `Dropdown`,
  `Currency`, `pxDateTime`, `pxAutoComplete`).
- `searchPick` / `searchPicks` — the record to select (`LABEL:ID` for single-select; a `[]` of
  display values for multi-select).

DX mapping is unaffected — the category and search fields are UI-only mechanics;
`pyForm` still carries only the selected record's key (`LABEL:ID`).

## Final checks

- **ALWAYS fetch the picker view; every group needs its own `if`/`else if` block.**
- **`searchCriterion` MUST be a `pyInputParameter` named `{Label}_searchCriterion`.**
- Single-select input parameters (`LABEL:ID`) must be passed to Playwright unchanged.
- Multi-select values stay constants in `pyForm`; do not add them to `pyInputParameters`.
- Each `searchFields` entry must include the search field `label`, its `type`, and its `value`.
- Use the advancedSearch handlers instead of `Handle_ReferenceListMethods` for this display mode.
- When the picker has multiple "Search by" categories, pass the chosen category as `searchCriterion` and include only that category's search fields in `searchFields`. Set each search field's `type` to its `pyComponentName` from the Field-type-to-locator table.
- When the picker has only a single search group, pass an empty string (`''`) as `searchCriterion` and provide that group's search fields in `searchFields`.
