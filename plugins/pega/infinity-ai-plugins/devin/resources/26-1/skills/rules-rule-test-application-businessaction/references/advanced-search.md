---
name: business-action-advanced-search
description: Load when a Business Action form has a search-and-select (an advanced search picker) reference field to look up record(s). Contains DX API mapping rules and Playwright automation patterns for selecting one or more records.
---

## Mapping invariants

| Field | DX API mapping | Playwright selection value |
|---|---|---|
| Single `ObjectReference` | `pyParameterType: "Reference"` with one `pyTestReferenceField` per required business identifier for the active search category | `DISPLAY:IDENTIFIER` parameter value |
| Multi `ObjectReference` | `pyParameterType: "Multi-Reference"` with the required business identifier field(s) for each selected row | `[]` of display values; never one string or comma-separated values |
| `UserReference` with advancedSearch display | Standard scalar field mapping; no `pyParameterType`, `pyTestReferenceField`, or `pyTestMultiReferenceList` | Operator display value for UI; operator id for DX/API input |

For advanced search, derive DX reference fields from the active category's required business identifier properties. Do not add a hidden technical identifier solely because it appears in `classKeys`, `value`, or `selectionKey` metadata.

## CommonUtils signatures

```typescript
Handle_SearchAndSelectSingle(page, label, { searchFor, searchBy }, searchFields, searchPick)
Handle_SearchAndSelectMulti(page, label, { searchFor, searchBy }, searchFields, searchPicks)
```

| Argument | Value |
|---|---|
| `label` | Exact visible heading above the Search by controls and Search results. Do not use the referenced picker view's `config.label`, `pyLabel`, or `pyDefaultHeading` unless it is that visible heading |
| `{ searchFor, searchBy }` | Destructured object with optional `searchFor` and `searchBy` properties. Pass `{}` when picker has single category and single group |
| `searchFor` | (optional) Value to select in the "Search for" radio/dropdown — omit if not needed |
| `searchBy` | (optional) Value to select in the "Search by" dropdown — omit if not needed |
| `searchFields` | Array of `{ label, type, value }` objects — one per search criteria field, in order |
| `searchPick` (single) | Single-selection input parameter value (`DISPLAY:IDENTIFIER`): `DISPLAY` is the selected row's visible value and `IDENTIFIER` is the active category's required business identifier value |
| `searchPicks` (multi) | Array of display values to select |

The handlers scope the interaction to the container below this heading. Select the heading a user sees immediately above the picker controls, not the title or label stored on the referenced picker view. This resolves the Playwright anchor only and does not change DX mapping.

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

## Classify the picker layout first

Before writing params or Playwright, evaluate these axes independently. A picker can
combine any of them:

1. **Visible heading** — Find the heading immediately above the Search by controls and Search results. Use its exact text as the handler `label`; do not use the referenced picker view's title or label merely because it has a similar name.
2. **In-picker categories** — Determine whether the picker contains `searchFor` categories, `searchBy` groups, both, or neither, then apply the branching rules below.

## Mandatory picker view extraction

> **Required for every `advancedSearch` field before writing any Playwright or params.**

1. **Fetch the picker view** — `get-rule(detail="full")` on the field's picker view. Never assume the group structure.
2. **Resolve the visible heading** — use the exact heading immediately above the Search by controls and Search results. Do not use the referenced picker view's `pyLabel`/`pyDefaultHeading` unless it matches that visible heading.
3. **Resolve the active category's business identifier** — inspect the selected search group's required fields and their property references. Use the required property that identifies the selected business record in `pyTestReferenceField`; do not substitute a technical identifier from `classKeys`, `value`, or `selectionKey`.
4. **Extract ALL "Search for" categories** — from `DeferLoad` children if present.
5. **Extract ALL "Search by" groups** — each group's exact criterion string + every filter field (label, `pyComponentName`, property ref, required state).
6. **Resolve the identifier value** — run the selected category/group's configured `referenceList` data page using its search field values and static view parameters. From the matching row, read the visible display value and the business identifier property from step 3. For a single select, set the UI input parameter to `DISPLAY:IDENTIFIER`.
7. **Map the active category in `pyForm`** — add each required business identifier as a `pyTestReferenceField` entry. Use the identifier property name from the search-group metadata and its value from the matching row or the search criterion. Do not add unrelated technical identifiers.
8. **Add input parameters** — `{Label}_searchFor` and `{Label}_searchBy` (e.g., `Customer_searchFor`, `Customer_searchBy`), defaulting to the most representative category/group. Pass empty string when only one option exists at that level.
9. **One `if`/`else if` Playwright block per category/group** — branch on `{Label}_searchFor` first, then `{Label}_searchBy` within each category. Give each block its own `searchFields[]`; use `else` for the final fallback.

`searchFor` and `searchBy` remain UI-only. Required business identifier fields from
the active category are included in `pyForm`.

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
- `searchPick` / `searchPicks` — the record to select (`DISPLAY:IDENTIFIER` for single-select; a `[]` of
  display values for multi-select).

The category controls are UI-only mechanics; `pyForm` carries the active category's required business identifier fields.

## Playwright examples

Load the example matching the picker layout and selection type:

| Layout | Single-select | Multi-select |
|---|---|---|
| `searchFor` only | `rules-rule-test-application-businessaction/examples/single-reference-field-advanced-searchfor` | `rules-rule-test-application-businessaction/examples/multi-reference-field-advanced-searchfor` |
| `searchBy` only | `rules-rule-test-application-businessaction/examples/single-reference-field-advanced-searchby` | `rules-rule-test-application-businessaction/examples/multi-reference-field-advanced-searchby` |
| `searchFor` and `searchBy` | `rules-rule-test-application-businessaction/examples/single-reference-field-advanced-searchfor-and-searchby` | `rules-rule-test-application-businessaction/examples/multi-reference-field-advanced-searchfor-and-searchby` |

---

## Final checks

- **ALWAYS fetch the picker view; every group needs its own `if`/`else if` block.**
- **The handler `label` MUST exactly match the visible heading above Search by and Search results.** Do not use an internal component label or the referenced picker view's `pyLabel`/`pyDefaultHeading` unless it matches that heading.
- **DX reference fields MUST use the active category's required business identifier properties.** Do not add a technical identifier solely from `classKeys`, `value`, or `selectionKey`.
- **The `searchPick` identifier MUST match the `pyTestReferenceField` identifier.** Build `DISPLAY:IDENTIFIER` with the same business identifier value used by DX.
- **`searchFor` MUST be a `pyInputParameter` named `{Label}_searchFor`** (when multiple categories exist).
- **`searchBy` MUST be a `pyInputParameter` named `{Label}_searchBy`** (when multiple groups exist).
- **Different categories → outer `if/else if` on `searchFor`; different groups → inner `if/else if` on `searchBy`.** A single call without branching is wrong when fields differ.
- **Category with no searchBy → pass `{ searchFor: searchFor }` only** — do not include `searchBy` in the options object for that branch.
- Single-select `searchPick` uses `DISPLAY:IDENTIFIER` format.
- Multi-select `searchPicks` is an array of display names.
- Each `searchFields` entry must include the search field `label`, its `type`, and its `value`.
- Use the advancedSearch handlers instead of `Handle_ReferenceListMethods` for this display mode.
- When the picker has a single category and single group, pass an empty object `{}`.
