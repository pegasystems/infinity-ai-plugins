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
Handle_SearchAndSelectSingle(page, label, { searchFor, searchBy }, searchFields, searchPick)
Handle_SearchAndSelectMulti(page, label, { searchFor, searchBy }, searchFields, searchPicks)
```

| Argument | Value |
|---|---|
| `label` | Resolved field label from view metadata |
| `{ searchFor, searchBy }` | Destructured object with optional `searchFor` and `searchBy` properties. Pass `{}` when picker has single category and single group |
| `searchFor` | (optional) Value to select in the "Search for" radio/dropdown — omit if not needed |
| `searchBy` | (optional) Value to select in the "Search by" dropdown — omit if not needed |
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
const searchFor = params["<Label>_searchFor"] || '';
if (params["LABEL"]) {
  await commonUtils.Handle_SearchAndSelectSingle(page, 'LABEL', { searchFor },
    [{ label: 'Search Field Label', type: 'TextInput', value: 'Search value' }], params["LABEL"]);
}
```

## Multi-select Playwright pattern

```typescript
const values = ['Name1', 'Name2'];
const searchFor = params["<Label>_searchFor"] || '';
await commonUtils.Handle_SearchAndSelectMulti(page, 'LABEL', { searchFor },
 [{ label: 'Search Field Label', type: 'TextInput', value: 'Search value' }], values);
```

## Mandatory picker view extraction

> **Required for every `advancedSearch` field before writing any Playwright or params.**

1. **Fetch the picker view** — `get-rule(detail="full")` on the field's picker view. Never assume the group structure.
2. **Extract ALL "Search for" categories** — from `DeferLoad` children if present.
3. **Extract ALL "Search by" groups** — each group's exact criterion string + every filter field (label, `pyComponentName`, property ref).

4. **Add input parameters** — `{Label}_searchFor` and `{Label}_searchBy` (e.g., `Customer_searchFor`, `Customer_searchBy`), defaulting to the most representative category/group. Pass empty string when only one option exists at that level.

5. **One `if`/`else if` Playwright block per category/group** — when multiple "Search for" categories exist, branch on `{Label}_searchFor` first (outer); within each category, branch on `{Label}_searchBy` (inner) if multiple groups exist. Each block has its own `searchFields[]`; the last branch is always the `else` fallback. See `business-action-single-reference-field-advanced-searchfor`, `business-action-single-reference-field-advanced-searchfor-and-searchby`, `business-action-single-reference-field-advanced-searchby`, `business-action-multi-reference-field-advanced-searchfor`, `business-action-multi-reference-field-advanced-searchfor-and-searchby`, and `business-action-multi-reference-field-advanced-searchby` for the code patterns.

**DX mapping is unaffected** — `pyForm` still carries only the selected record's key
(`LABEL:ID`). The searchFor, searchBy, and filter fields are UI-only; they do not appear in `pyForm`.

---

## Multiple search categories

When the picker has multiple "Search for" categories (e.g., "Service account information", "Customer information"), include `searchFor` in the `searchOptions` object. When only one category exists, omit the property.

When a category has multiple "Search by" groups, include `searchBy` in the `searchOptions` object. When only one group exists within a category, omit the property.

When the picker has a single category and single group, pass an empty object `{}`.

**Each `searchFields` entry maps a search field to its control by `type`.**
Each search field can be a different control type; set `type` to the search
field's `pyComponentName` from the Field-type-to-locator table in
`business-action-ui-automation` (e.g. `TextInput`, `Dropdown`, `Currency`,
`pxDateTime`, `pxAutoComplete`).

Use this shape only when both `searchFor` and `searchBy` exist for the picker. Omit whichever property does not apply (see omission rules below).

```typescript
await commonUtils.Handle_SearchAndSelectSingle(
  page,
  'LABEL',
  { searchFor: params["<Label>_searchFor"] || '', searchBy: params["<Label>_searchBy"] || '' },
  [
    { label: 'Search Field Label 1', type: 'Dropdown', value: 'Search Value 1' },
    { label: 'Search Field Label 2', type: 'Currency', value: 'Search Value 2' },
    { label: 'Search Field Label 3', type: 'pxDateTime', value: 'Search Value 3' }
  ],
  params["LABEL"]
);
```

- `LABEL` — the reference field label.
- `{ searchFor, searchBy }` — destructured object with optional properties from input parameters.
- Each `searchFields` entry uses the search field `label`, its control `type`, and the
  `value` to enter.
- `type` is the search field's `pyComponentName` from the Field-type-to-locator
  table in `business-action-ui-automation` (e.g. `TextInput`, `Dropdown`,
  `Currency`, `pxDateTime`, `pxAutoComplete`).
- `searchPick` / `searchPicks` — the record to select (`LABEL:ID` for single-select; a `[]` of
  display values for multi-select).

DX mapping is unaffected — the category and search fields are UI-only mechanics;
`pyForm` still carries the selected record's key.

## Branching Playwright patterns

When multiple categories or groups have **different search fields**, branch with
`if`/`else if`/`else`. The last branch is always the `else` fallback.

### searchFor only (single-select)

```typescript
const seatSearchFor = params['Seat_searchFor'] || '';
if (params['Seat']) {
  if (seatSearchFor === 'Business') {
    await commonUtils.Handle_SearchAndSelectSingle(page, 'Seat', { searchFor: seatSearchFor }, [{ label: 'Suite number', type: 'TextInput', value: 'B1' }], params['Seat']);
  } else {
    await commonUtils.Handle_SearchAndSelectSingle(page, 'Seat', { searchFor: seatSearchFor }, [{ label: 'Row number', type: 'TextInput', value: '12' }], params['Seat']);
  }
}
```

### searchFor only (multi-select)

```typescript
const mealsSearchFor = params['Meals_searchFor'] || '';
if (mealsSearchFor === 'Non-vegetarian') {
  const meals = ['Chicken curry', 'Fish and chips'];
  await commonUtils.Handle_SearchAndSelectMulti(page, 'Meals', { searchFor: mealsSearchFor }, [{ label: 'Meal name', type: 'TextInput', value: 'chicken' }], meals);
} else {
  const meals = ['Vegetarian pasta', 'Garden salad'];
  await commonUtils.Handle_SearchAndSelectMulti(page, 'Meals', { searchFor: mealsSearchFor }, [{ label: 'Meal name', type: 'TextInput', value: 'veg' }], meals);
}
```

### searchBy only (single-select)

```typescript
const approverSearchBy = params['Approver_searchBy'] || '';
if (params['Approver']) {
  if (approverSearchBy === 'Search by Name') {
    await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', { searchBy: approverSearchBy }, [{ label: 'First name', type: 'TextInput', value: 'Jane' }, { label: 'Last name', type: 'TextInput', value: 'Manager' }], params['Approver']);
  } else {
    await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', { searchBy: approverSearchBy }, [{ label: 'Approver number', type: 'TextInput', value: '301' }], params['Approver']);
  }
}
```

### searchFor + searchBy (single-select)

```typescript
const searchFor = params['LABEL_searchFor'] || '';
const searchBy = params['LABEL_searchBy'] || '';
if (params['LABEL']) {
  if (searchFor === 'Service account information') {
    await commonUtils.Handle_SearchAndSelectSingle(page, 'LABEL', { searchFor: searchFor }, [{ label: 'Service account ID', type: 'TextInput', value: 'SA-031' }], params['LABEL']);
  } else {
    if (searchBy === 'Phone number or Email or SSN/National ID') {
      await commonUtils.Handle_SearchAndSelectSingle(page, 'LABEL', { searchFor: searchFor, searchBy: searchBy }, [{ label: 'Phone number', type: 'TextInput', value: '' }, { label: 'Email', type: 'TextInput', value: '' }, { label: 'SSN/National ID', type: 'TextInput', value: '' }], params['LABEL']);
    } else {
      await commonUtils.Handle_SearchAndSelectSingle(page, 'LABEL', { searchFor: searchFor, searchBy: searchBy }, [{ label: 'Last name', type: 'TextInput', value: 'Biggs' }, { label: 'First name', type: 'TextInput', value: 'Rebecca' }], params['LABEL']);
    }
  }
}
```

### searchFor + searchBy (multi-select)

```typescript
const entertainmentSearchFor = params['Entertainment_searchFor'] || '';
const entertainmentSearchBy = params['Entertainment_searchBy'] || '';
if (entertainmentSearchFor === 'TV Shows') {
  const tvTitles = ['Sky Drama S1', 'Night Comedy S2'];
  await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor: entertainmentSearchFor, searchBy: entertainmentSearchBy }, [{ label: 'Show name', type: 'TextInput', value: 'Sky' }], tvTitles);
} else {
  if (entertainmentSearchBy === 'Search by Title') {
    const movieTitles = ['Sky Runner', 'Horizon Chase'];
    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor: entertainmentSearchFor, searchBy: entertainmentSearchBy }, [{ label: 'Title', type: 'TextInput', value: 'Sky' }], movieTitles);
  } else {
    const movieTitles = ['Sky Runner', 'Horizon Chase'];
    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor: entertainmentSearchFor, searchBy: entertainmentSearchBy }, [{ label: 'Genre', type: 'Dropdown', value: 'Action' }], movieTitles);
  }
}
```

---

## Final checks

- **ALWAYS fetch the picker view; every group needs its own `if`/`else if` block.**
- **`searchFor` MUST be a `pyInputParameter` named `{Label}_searchFor`** (when multiple categories exist).
- **`searchBy` MUST be a `pyInputParameter` named `{Label}_searchBy`** (when multiple groups exist).
- **Different categories → outer `if/else if` on `searchFor`; different groups → inner `if/else if` on `searchBy`.** A single call without branching is wrong when fields differ.
- **Category with no searchBy → pass `{ searchFor: searchFor }` only** — do not include `searchBy` in the options object for that branch.
- Single-select `searchPick` uses `LABEL:ID` format (e.g., `'John Smith:EMP-301'`).
- Multi-select `searchPicks` is an array of display names.
- Each `searchFields` entry must include the search field `label`, its `type`, and its `value`.
- Use the advancedSearch handlers instead of `Handle_ReferenceListMethods` for this display mode.
- When the picker has a single category and single group, pass an empty object `{}`.
