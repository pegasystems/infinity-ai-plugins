---
name: view-pagelist-selection
description: Patterns for selecting rows from a case-owned PageList in Constellation views — staging, checkbox-per-row, submit payload shapes, and anti-patterns
---

# Constellation PageList Selection Patterns

How to let users select rows from an embedded PageList in a Constellation
assignment view. Covers the recommended staging pattern, checkbox-per-row
selection, submit payload shapes, and common anti-patterns.

## The problem

Constellation selection components (`SimpleTableSelect`, DataReference with
`selectionMode`) expect a **DataView** (data page backed by a report or
connector). They do not work with case-owned PageLists — attempting to use
them produces `DataView not found` errors or null-pointer exceptions.

Similarly, binding a scalar selection control directly to a PageList property
causes `WrongModeException` at runtime because the property is mode PageList
while the control expects a String.

## Recommended architecture: staging pattern

```
Connector → Data Page → case-owned staging PageList → embedded table → submit DT → selected PageList
```

1. **Load results into a case-owned PageList** before rendering. Never bind
   a Constellation view directly to `D_X[Param: .Field].Results` — this
   fails with `datapageDefinition is null`.
2. **Add a boolean selection property** (e.g., `.IsSelected`, type
   `String/TrueFalse`) on the embedded data class.
3. **Render as an editable embedded table** (`EmbeddedDataMulti`) with the
   checkbox column editable and detail columns included.
4. **On submit**, run a Data Transform that loops the staging list and
   appends selected rows to a separate results PageList.

## Checkbox-per-row selection

### Property setup

On the embedded data class (e.g., `MyOrg-MyApp-Data-SearchResult`):

```
PropertyName: IsSelected
pyPropertyMode: String
pyStringType: TrueFalse
pyStreamName: pxCheckbox
```

### View wiring

The embedded table must include `.IsSelected` as an **editable** column:

```json
{
  "type": "EmbeddedDataMulti",
  "config": {
    "referenceList": ".SearchResults",
    "contextClass": "MyOrg-MyApp-Data-SearchResult",
    "mode": "editable",
    "displayAs": "table"
  },
  "children": [
    {"type": "Checkbox", "config": {"value": "@P .IsSelected", "label": "Select"}},
    {"type": "TextInput", "config": {"value": "@P .ItemName", "label": "@FL .ItemName", "readOnly": true}},
    {"type": "TextInput", "config": {"value": "@P .ItemID", "label": "@FL .ItemID", "readOnly": true}}
  ]
}
```

### Sparse submit data loss (critical)

When only the checkbox column is editable, **only checkbox values are
submitted**. Sibling row data (name, ID, description) is lost on submit
because Constellation sends only editable field values.

**Fix:** Include all fields that must survive submit as editable columns
(even if rendered read-only via `"readOnly": true` in metadata). This
ensures the full row is present in the submit payload.

### Submit payload shape

Constellation submits editable embedded PageLists as nested arrays:

```json
{
  "SearchResults": [
    {"IsSelected": "false", "ItemName": "Result A", "ItemID": "ID-001"},
    {"IsSelected": "true", "ItemName": "Result B", "ItemID": "ID-002"},
    {"IsSelected": "false", "ItemName": "Result C", "ItemID": "ID-003"}
  ]
}
```

**Indexed/dotted notation does NOT work:**

```json
{"SearchResults(2).IsSelected": "true"}
```

This produces `pyInputValueDidNotMatchType` errors. Always use the nested
array format.

### Processing Data Transform

After submit, use a DT to copy selected rows:

```
REMOVE .SelectedResults
FOR_EACH_PAGE_IN .SearchResults
  WHEN .IsSelected == "true"
    APPEND_TO .SelectedResults (CURRENT_SOURCE_PAGE)
```

For single-select, add `EXIT_FOR_EACH` after the first append.

## Anti-patterns

### Binding scalar selection to PageList

```
❌ Binding a Dropdown/AutoComplete value to .SelectedResults (PageList)
```

**Error:** `WrongModeException: property was of mode Page List while
getStringValue() was expecting String mode.`

**Fix:** Use a scalar `.SelectedItemID` for single-select controls, or use
checkbox-per-row for multi-select.

### DataView selection on case-owned PageList

```
❌ SimpleTableSelect referencing .SearchResults (case-owned PageList)
```

**Error:** `DataView not found`

**Cause:** `SimpleTableSelect` and DataReference selection metadata require
a true DataView (data page/report definition). Case-owned PageLists are not
DataViews.

**Fix:** Use an editable embedded table with checkbox-per-row.

### Direct data page nested list in view

```
❌ D_Search[Text: .Query].Results as view datasource
```

**Error:** `Cannot invoke "DeclarativePageDefinition.getClassName()" because
"datapageDefinition" is null`

**Cause:** Constellation cannot resolve nested lists from parameterized data
pages as selectable data sources in view metadata.

**Fix:** Load data page results into a case-owned PageList first (via
activity or flow utility), then bind the view to the case-owned list.

## Single-select variant

For single-select where only one row can be chosen:

- Option A: Checkbox-per-row + DT that appends only the first `IsSelected
  == "true"` row (with `EXIT_FOR_EACH`).
- Option B: Scalar `.SelectedItemID` property + read-only table showing
  results + user types/copies the ID. (Functional but poor UX — use only as
  fallback.)

## Post-submit visibility

Case-owned PageLists are only visible in `get-case` or assignment readback
if they are rendered in an active view or listed in summary/details metadata.
To verify selected results persisted:

- Add a read-only embedded table on the next assignment view.
- Or add to `pyReview`/`pyCaseSummary` for case-level visibility.
- Or use a debug view (branch-only) during development.

## Design checklist

- [ ] Results loaded into case-owned PageList before view renders
- [ ] Boolean selection property exists on embedded data class
- [ ] Embedded table includes all fields needed post-submit as editable columns
- [ ] Submit DT loops staging list and appends selected rows
- [ ] No scalar control bound to a PageList property
- [ ] No `SimpleTableSelect`/DataReference selection on case-owned lists
- [ ] No direct `D_X[...].Results` binding in view metadata
- [ ] Selected results visible on at least one downstream surface
