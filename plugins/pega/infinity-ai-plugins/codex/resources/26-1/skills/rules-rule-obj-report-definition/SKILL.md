---
name: rules-rule-obj-report-definition
description: Schema and authoring guide for Pega Report Definition rules (Rule-Obj-Report-Definition), including list reports, summary/aggregate reports, filters, joins, sub-reports, parameters, ranking/window functions, paging, and chart configuration
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Report Definition` | Minimal report definition — smallest valid create payload |
| `List Report with Filters and Parameters` | List report with three columns, two filters using a parameter, and pagination |
| `Summary Report with GroupBy and Aggregates` | Summary/aggregate report with GROUP BY and COUNT |

### Component-level

| Skill | Description |
|-------|-------------|
| `List Field — Sorted column` | Output column with `pySortOrder=1`, `pySortType=ASC` |
| `List Field — Unsorted column` | Output column without sorting (omit `pySortOrder`) |
| `Filter — Equality with parameter reference` | Filter condition using `=` with parameter |
| `Filter — Not-equal with literal value` | Filter condition using `!=` with literal |
| `Filter — IS NOT NULL` | Filter condition for IS NOT NULL |
| `Filter — User-visible (AllAccess)` | User-visible filter with AllAccess |
| `Parameter — Text` | Named report parameter (Text type) |
| `Parameter — DateTime` | Named report parameter (DateTime type) |
| `Pagination Configuration` | Pagination configuration |
| `Group-By Column` | GROUP BY column for summary reports |
| `Aggregate Column — COUNT` | Aggregate function column (COUNT) |
| `Aggregate Column — SUM` | Aggregate function column (SUM) |
| `Aggregate Column — COUNTDISTINCT` | Aggregate function column (COUNTDISTINCT) |
| `Sub-Report (pySubReportInfo) — minimal row` | JOIN to another Report Definition — minimal row |
| `Sub-Report — complete LEFT OUTER worked example` | JOIN to another Report Definition — complete LEFT OUTER worked example |
| `Named Page Declaration` | Named page declaration for filter binding |
| `Direct Table Join (pyJoinInfo) — minimal row` | Direct table JOIN — minimal row |
| `Direct Table Join — matching pyPagesAndClasses entries` | Direct table JOIN — matching `pyPagesAndClasses` snippet |
| `Direct Table Join — complete LEFT OUTER worked example` | Direct table JOIN — complete LEFT OUTER worked example |
| `Declare-Index Join (pyIndexInfo) — minimal row` | Declare-Index JOIN to an `Index-*` class — minimal row |
| `Declare-Index Join — three INNER joins on one Work case` | Declare-Index JOIN — worked example with three joins |
| `Association Join (pyAssociations) — explicit row` | Association JOIN via `Rule-Obj-Association` — explicit row |
| `Association — explicit pyAssociations block (mirrored)` | Association JOIN — explicit mirrored block |
| `Association — explicit complete worked example` | Association JOIN — complete worked example for DX API |
| `Association — implicit list report worked example` | Association JOIN — implicit example (Dev Studio only) |
| `Max Records and Timeout Configuration` | Max records and timeout configuration mirrored in both `pyContent` and `pyUI` |
| `Report Rank — pyContent.pyReportRank` | Top-N / Bottom-N ranking (window function) — content layer |
| `Report Rank — pyUI.pyBody.pyReportRank (UI mirror)` | Top-N / Bottom-N ranking (window function) — UI mirror |
| `Pie Chart (pyUI.pyChart)` | Pie chart over a summary report |

## Functionality Reference

| Functionality | Description | Best Practices |
|---------------|-------------|----------------|
| List report | Displays individual rows with columns from `pyFields.pyListFields[]` | Set `pxIsSummary="false"`. Populate both `pyContent.pyFields.pyListFields[]` and `pyUI.pyBody.pyUIFields[]`. Do not set `pyIsOrdered` unless explicit ordering is needed. |
| Summary/aggregate report | Groups rows and applies aggregate functions (COUNT, SUM, AVG, MIN, MAX, COUNTDISTINCT) | Set `pxIsSummary="true"` in `pyContent`, `pyReportMetaData`, and `pyUI.pzIsSummary`. Leave `pyListFields` empty. GroupBy is optional for scalar aggregates. |
| Pagination | Controls page-based result retrieval | Mirror in both `pyContent.pyPaging` and `pyUI.pyUserInteractions.pyPagingParams`. Paging and `pyMaxRecords` are mutually exclusive — enabling paging ignores `pyMaxRecords`. |
| Max records | Limits the number of result rows returned | Disable paging in BOTH layers first. Mirror `pyMaxRecords` in both `pyContent` and `pyUI` — omitting `pyUI` mirror resets value to `"500"`. Do not auto-populate `pyQueryTimeoutValue` or export fields unless explicitly requested. |
| Filters | Restricts rows using conditions on properties | Each filter needs a unique `pyLogicLabel`. `pyFilterLogic` must reference all labels. Declare parameters in both top-level `pyParameters[]` and `pyContent.pyParameters[]`. |
| Direct table joins (`pyJoinInfo`) | SQL JOIN to another class via inline ON condition | Mirror `pyJoinInfo[]` identically in `pyContent.pySource` and `pyUI.pySource`. Declare a `pyPagesAndClasses` entry for each join prefix. Reference LEFT OUTER joins from at least one field/filter to prevent silent removal on save. |
| Sub-report joins (`pySubReportInfo`) | JOIN to another Report Definition | Do NOT add a `pyPagesAndClasses` entry for sub-report prefixes (auto-registered). Both `pyClassName` and `pySubClassName` are required. `pyUsageInfo` is mandatory. |
| Associations (`pyAssociations`) | JOIN via a `Rule-Obj-Association` rule | Always author explicitly via DX API — do not rely on auto-population. Mirror in both `pyContent.pySource` and `pyUI.pySource`. Add `pyPagesAndClasses` entry with purpose name as page alias. |
| Index joins (`pyIndexInfo`) | JOIN via a `Rule-Declare-Index` and aggregate property | Mirror identically in both `pyContent.pySource` and `pyUI.pySource`. Same persistence rules as direct joins. |
| Parameters | Named inputs referenced in filters as `Param.*` | Declare identically in both top-level `pyParameters[]` and `pyContent.pyParameters[]`. If only one level is populated, `Param.*` references are silently dropped. |
| Ranking (Top-N / Bottom-N) | Window function to limit to top or bottom N rows | Set `pyContent.pyReportRank` with `pyRankType`, `pyRows`, `pyRankField`. Mirror at `pyUI.pyBody.pyReportRank`. Set `pyContent.pyReportContainsRank="true"`. |
| Charts | Visual representation of report data | `pyUI.pyChart` must always be present (even if `pyEnableChart="false"`). All numeric chart fields are string-encoded. |
| Sorting | Orders result rows by column values | Only sort columns that genuinely need ordering. Unsorted columns should omit `pySortOrder` and `pySortType` entirely. Over-sorting triggers `pxTooManySorts` warnings. |
| Computed columns | Function expressions as field values | Set `pyIsFunction="true"` and provide `pySQLFunction` (Embed-UserFunction) with `pyName`, `pyReturnType`, and `pyParameters[]`. |
| pyUI dual-population | UI layer mirrors content for the rule-form save activity | Always populate both `pyContent` and `pyUI` layers. The save activity rebuilds `pyContent` from `pyUI` — omitting `pyUI` causes silent data loss. |

## Authoring notes

### pyUI is the source of truth on save (NOT pyContent)
The rule-form save activity rebuilds `pyContent.pyFields` and
`pyContent.pyFilters` from `pyUI.pyBody.pyUIFields` and
`pyUI.pyBody.pyUIFilters` on every save. If you populate only `pyContent`
and leave the `pyUI` structures empty, the save silently strips your columns
and filters, leaving only the default `.pzInsKey` Key column and a
`pxAllColumnsHidden` warning. **Always populate both layers** when creating
a list report (`pyContent.pyFields.pyListFields[]` AND
`pyUI.pyBody.pyUIFields[]`; same for filters).

### Required structural stubs (cause obscure save failures when missing)
- **`pyUI.pyChart.pyEnableChart`** — must be set (typically `"false"`).
  Missing it → `Goal seek requires missing input property RulePage.pyUI.pyChart.pyEnableChart`.
  Provide at least: `{"pxObjClass":"Embed-ReportGraph","pyEnableChart":"false","pyGraphType":"Column"}`.
- **`pyContent.pyReportRank`** with `pyRankType: ""` and an empty
  `pyRankField`, **and** the matching `pyUI.pyBody.pyReportRank` with
  `pyRankUIField`. Missing them →
  `The reference Primary.pyUI.pzIsSummary == true || .pyRankType == "" is not valid. Reason: FUAInstance-NullMyStepPage`.

### ValidationMap (read-only artifact)
`pyContent.ValidationMap` is a server-managed base64-serialized HashMap. Do
not set it during create — leave it absent.

### Parameters must be declared at both levels
When using `Param.*` references in filters, declare the parameter in BOTH:
1. Top-level `pyParameters[]` array
2. `pyContent.pyParameters[]` array

Both must contain identical entries. If only `pyContent.pyParameters` is
populated, the `Param.*` reference in `pyUI.pyBody.pyUIFilters` cannot
resolve and the filter is silently dropped on save.

### pyUI auto-fill
The schema includes an `x-pega-autoFill` default for `pyUI` that provides
the minimum stub (chart disabled, empty rank, empty fields/filters). If the
agent omits `pyUI` entirely, the validator injects this stub automatically.
However, for list reports you MUST still populate `pyUI.pyBody.pyUIFields[]`
and `pyUI.pyBody.pyUIFilters` explicitly (the auto-fill only provides empty
arrays). For summary reports, set `pyUI.pzIsSummary` to `"true"` — the
auto-fill defaults to `"false"`.

### Authoring layers and triple-mirroring
`pyContent` is what the engine executes at runtime, but the rule-form save
activity overwrites parts of `pyContent` from `pyUI` on every save. These
structures are mirrored at multiple locations and must be kept consistent:

| Structure | Location 1 | Location 2 | Notes |
|---|---|---|---|
| `pyParameters` | top-level | `pyContent.pyParameters` | identical |
| `pyPagesAndClasses` | top-level | `pyContent.pyPagesAndClasses` | identical |
| `pySource` | `pyContent.pySource` | `pyUI.pySource` | UI mirror is reduced for most fields, but `pyJoinInfo[]`, `pySubReportInfo[]`, and `pyRowKeyInfo` must be mirrored identically — DX API rejects payloads that put joins only in `pyUI.pySource` with HTTP 400, and `pyRowKeyInfo` is rebuilt from `pyUI.pySource` on save (so omitting it there causes empty `pyRowKeys` and runtime `StringIndexOutOfBoundsException`). Both `pyContent.pySource` and `pyUI.pySource` have schema auto-fill for `pyRowKeyInfo` so agents do not need to provide it explicitly. |
| `pyFilters` | `pyContent.pyFilters` | `pyUI.pyBody.pyUIFilters` | UI uses `pyUI*` prefix |
| `pyHavingFilters` | `pyContent.pyHavingFilters` | `pyUI.pyBody.pyUIHavingFilters` | UI uses `pyUI*` prefix |
| `pyPaging` | `pyContent.pyPaging` | `pyUI.pyUserInteractions.pyPagingParams` | identical shape |
| `pyMaxRecords` | `pyContent.pyMaxRecords` | `pyUI.pyMaxRecords` | identical; omitting pyUI mirror causes save to reset to `"500"` |
| `pyQueryTimeoutValue` | `pyContent.pyQueryTimeoutValue` | `pyUI.pyQueryTimeoutValue` | optional; identical when set |
| `pyMaxRecordsForExport` | `pyContent.pyMaxRecordsForExport` | `pyUI.pyMaxRecordsForExport` | optional; identical when set |
| `pyQueryTimeoutValueForExport` | `pyContent.pyQueryTimeoutValueForExport` | `pyUI.pyQueryTimeoutValueForExport` | optional; identical when set |
| `pySecurity` | `pyContent.pySecurity` | `pyUI.pySecurity` | identical |

### Filter logic
- Every filter in `pyFilter[]` needs a unique `pyLogicLabel`, and `pyFilterLogic` must reference all of them.
- Logic labels use two namespaces: alphabetic (`A`, `B`, `C`, ...) and the parallel numbered family (`F1`, `F2`, `F3`, ...). The two can coexist (e.g. `A AND F1`).
- Whitespace and parentheses in `pyFilterLogic` are preserved verbatim — Pega does not re-render the expression.
- Operators include `=`, `!=`, `StartsWith`, `NotStartsWith`, `Contains`, `NotContain`, `IsTrue`, `IsFalse`, `<`, `<=`, `>`, `>=`, `IS NULL`, `IS NOT NULL`. `IsTrue`/`IsFalse` need no `pyFilterValue`.
- Function-as-operand: set `pyIsRightOperandAFunction="true"` and populate `pyRightOperandFunction` (Embed-UserFunction). Symmetric for left.

### Paging vs pyMaxRecords — mutually exclusive
Enabling paging (`pyPagingEnabled="true"`) disables the `pyMaxRecords` limit.
When paging is enabled, set `pyMaxRecords` to `""` (empty/unlimited) — any
value there is ignored. To limit results to a fixed number of rows, set
`pyPagingEnabled="false"` and use `pyMaxRecords` (e.g. `"500"`).

**⚠️ Paging must be disabled in BOTH layers.** The paging configuration is
mirrored at `pyContent.pyPaging` and `pyUI.pyUserInteractions.pyPagingParams`
(see mirroring table above). If you only set `pyContent.pyPaging.pyPagingEnabled`
to `"false"` but omit `pyUI.pyUserInteractions.pyPagingParams`, the auto-fill
defaults the UI paging to enabled, and the save activity rebuilds
`pyContent.pyPaging` from the UI layer — silently re-enabling paging and
overriding your `pyMaxRecords` value. **Always set `pyPagingEnabled` to
`"false"` in both layers when using `pyMaxRecords` to limit results.**

### pyMaxRecords, timeout, and export fields — independent, each mirrored
These four fields are **independent** — set only the ones the user explicitly
requests. They are NOT a mandatory bundle. Each field that IS set must be
mirrored in both `pyContent` and `pyUI`:

| Field | `pyContent` location | `pyUI` location | Purpose | Set when |
|---|---|---|---|---|
| `pyMaxRecords` | `pyContent.pyMaxRecords` | `pyUI.pyMaxRecords` | Limits result rows at runtime | User asks to limit results |
| `pyQueryTimeoutValue` | `pyContent.pyQueryTimeoutValue` | `pyUI.pyQueryTimeoutValue` | Query timeout in seconds | User asks to set a timeout |
| `pyMaxRecordsForExport` | `pyContent.pyMaxRecordsForExport` | `pyUI.pyMaxRecordsForExport` | Limits rows for export operations | User asks to limit export rows |
| `pyQueryTimeoutValueForExport` | `pyContent.pyQueryTimeoutValueForExport` | `pyUI.pyQueryTimeoutValueForExport` | Query timeout for export | User asks to set export timeout |

**Mirroring rule:** For any field you set, the value must appear in BOTH
`pyContent` and `pyUI`. Setting only `pyContent.pyMaxRecords` without
`pyUI.pyMaxRecords` causes the save activity to reset the value to `"500"`.

**Do not auto-populate fields the user did not request.** For example, if the
user only asks to limit results to 10 rows, set `pyMaxRecords` in both layers
but leave `pyQueryTimeoutValue`, `pyMaxRecordsForExport`, and
`pyQueryTimeoutValueForExport` unset.

### Sorting — do not over-sort
Most reports need at most one or two sorted columns. Only add `pySortType`
when the column genuinely needs ordering — typically the primary key or a
date column. Unsorted columns should **omit `pySortOrder` and `pySortType`
entirely** — the save activity auto-fills `"99999"` server-side. Setting
`pySortType` on every column triggers the `pxTooManySorts` performance
warning and generates unnecessary ORDER BY clauses in the SQL.

- **Sorted column:** `"pySortOrder": "1", "pySortType": "ASC"` (or `"DESC"`)
- **Unsorted column:** omit both `pySortOrder` and `pySortType` entirely

### Summary vs list reports
- Summary: set `pyContent.pxIsSummary="true"`, populate `pyFields.pyGroupBy` and `pyFields.pyAggregate`, mirror `pxIsSummary` at `pyReportMetaData.pxIsSummary` and `pyUI.pzIsSummary`.
- List: leave `pxIsSummary="false"` and use `pyFields.pyListFields`.
- Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `COUNTDISTINCT`.
- `pyListFields` must be empty (or absent) in summary reports — the two modes are mutually exclusive.
- Do **not** set `pyIsOrdered` on summary reports (only list reports use it).
- GroupBy is optional — a pure scalar aggregate (e.g. total row count) needs no GroupBy.

#### `pyUI.pyBody.pyUIFields` for summary reports
Each GroupBy and Aggregate column needs a corresponding UIField entry:

- **GroupBy UIField:** set `pyFieldName`, `pyFieldLabel`, `pyDataType`,
  `pyGroupOrder` (1-based rank), `pySortOrder`, `pySortType`,
  `pyHide:"false"`, `pySelected:"false"`. Do NOT set `pyFunction`.
- **Aggregate UIField:** set `pyFieldName` (matching `pyAggregateField.pyFieldName`),
  `pyFieldLabel`, `pyDataType`, `pyFunction` (= aggregate function token, e.g.
  `"COUNT"`, `"SUM"`), `pyHide:"false"`, `pySelected:"true"`. Do NOT set
  `pyGroupOrder` or `pySortOrder`.

### Joins (direct table joins) vs sub-reports
- `pyContent.pySource.pyJoinInfo[]` (Embed-ReportJoins) — direct SQL JOIN to another class. Carries `pyJoinClassName`, `pyJoinType` (`INNER` | `LEFT OUTER` | `RIGHT OUTER`), `pyPrefix`, `pyTemporaryObject`, and `pyFilters` (the ON condition, with cross-table operands).
- `pyContent.pySource.pySubReportInfo[]` (Embed-SubReportInfo) — JOIN to another Report Definition. Carries `pyReportName`, `pyColumns[]`, correlation `pyFilters` (using `pyEchoFilterName` for parameter binding), and `pyUsageInfo` `{LHSFilter, RHSFilter, select}`.
- For every **direct join** alias (`pyJoinInfo.pyPrefix`), declare a `pyPagesAndClasses` entry whose `pyPagesAndClassesPage` matches the alias. **Do NOT do this for sub-report aliases** (`pySubReportInfo.pyPrefix`) — they auto-register, and a manual entry causes `Subreport prefix [X] is a duplicate` on save.

### DX-API write quirks for joins / index-joins (verified empirically)
- **`pyJoinInfo[]` / `pyIndexInfo[]` must be mirrored identically in `pyContent.pySource` AND `pyUI.pySource` on input.** Sending the join only in `pyUI.pySource` returns HTTP 400 "malformed syntax". Same applies to `pySubReportInfo[]`.
- **`LEFT OUTER` joins are stripped on save unless the join's `pyPrefix` is referenced by at least one `pyListFields`, `pyAggregate`, `pyGroupBy`, or `pyFilter` entry.** The save activity treats an unreferenced LEFT OUTER as "dead" and silently removes the row — no error returned. To make a LEFT OUTER join persist, project at least one column or add at least one filter that uses the join prefix. `INNER` and `RIGHT OUTER` follow a more permissive code path but reference any join you add as a matter of practice.
- **Server-managed audit fields must be omitted from input.** `pzStatus`, `pxCreateOperator`, `pxCreateDateTime`, `pxCreateSystemID`, `pxCreateOpName` appear on read-back but cause HTTP 400 if sent on input. Only `pxObjClass` is required and accepted at the join row level (and even that is auto-filled by the schema).

### DX-API write quirks for sub-reports (verified empirically)
- **Both `pyClassName` AND `pySubClassName` are required** (same value — the `pyAppliesToClass` of the referenced report). Sending only `pyClassName` returns `pySubClassName is required`.
- **`pyUsageInfo` is required** as a PropertyGroup with keys `select`, `LHSFilter`, `RHSFilter` (string `"true"`/`"false"`). Omitting it silently strips the row. For projecting columns from the sub-report (typical case), set `select: "true"`.
- **`pyEchoFieldName` and `pyEchoFilterName` hold display labels** (e.g. `"Case ID"`), NOT field references. This is the OPPOSITE convention from `Embed-ReportUIFields.pyEchoFieldName`, which holds the field reference.
- **Do NOT add a `pyPagesAndClasses` entry for the sub-report's `pyPrefix`** (auto-registered from the sub-report row itself).
- **`pyPromptType` should be `AllAccess`** for sub-report filter rows. (Direct-join filter rows use `NoAccess`.)
- **`pyFilterValue` must reference a DB-column-mapped parent property** (e.g. `.pyID`, `.pzInsKey`). BLOB-only properties are rejected with `<property> does not exist or has no column mapping`.
- **`pyFilterLogic` and each filter row's `pyLogicLabel` must match `pyPrefix`.**
- **Column `pyAlias` must be a valid SQL identifier** (use underscores, not spaces — e.g. `Case_ID`).

### Associations (`pyAssociations`)
Backed by a `Rule-Obj-Association` rule. The alias used in field/filter
references is the association's `pyPurpose`, not a separate `pyPrefix`.

**DX API authoring (always explicit):** When creating or updating via the
DX API, always author associations explicitly — do NOT rely on auto-population.
The save activity's implicit resolution from `<AssociationName>.<Property>`
references is a Dev Studio interactive behavior that does not reliably execute
through the DX API pathway.

Required locations when authoring an association:

1. **`pyContent.pySource.pyAssociations[]`** — one `Embed-ReportAssociation`
   entry per association with `pyClassName` (applies-to class), `pyPurpose`
   (association name), `pyAssociatedClass` (right-side class).
2. **`pyUI.pySource.pyAssociations[]`** — identical mirror of #1.
3. **Top-level `pyPagesAndClasses[]`** — add an entry with
   `pyPagesAndClassesPage` = purpose name, `pyPagesAndClassesClass` =
   associated class.
4. **`pyContent.pyPagesAndClasses[]`** — identical mirror of #3.

When projecting or filtering on fields from the associated class:

5. **Fields** (`pyListFields[]` / `pyUI.pyBody.pyUIFields[]`) — use
   `AssociationName.Property` syntax in `pyFieldName` (e.g.
   `"OpportunityServiceAccount.Relationship"`), and set `pyACIsAssoc:"true"`,
   `pyACAssocName` (= purpose name), `pyACAssocClass` (= associated class)
   on the UI field entry.
6. **Filters** (`pyContent.pyFilters.pyFilter[]` / `pyUI.pyBody.pyUIFilters.pyFilter[]`) —
   use `AssociationName.Property` in `pyFilterName`, and set `pyACIsAssoc:"true"`,
   `pyACAssocName`, `pyACAssocClass` on the filter entry.

Comparison vs other join mechanisms:

| Aspect | `pyAssociations` | `pyJoinInfo` | `pyIndexInfo` | `pySubReportInfo` |
|---|---|---|---|---|
| Backed by | `Rule-Obj-Association` | inline | `Rule-Declare-Index` + aggregate property | another Report Definition |
| Alias | `pyPurpose` | `pyPrefix` | `pyPrefix` | `pyPrefix` |
| ON condition | in association rule | inline `pyFilters` | implicit | inline `pyFilters` |
| Manual entry needed? | Yes (explicit in both pyContent.pySource and pyUI.pySource) | Yes | Yes | Yes |
| `pyPagesAndClasses` row | Yes (mirrored at top-level and pyContent) | Yes (mirrored) | Yes (mirrored) | No (auto; manual rejected) |

### Ranking (Top-N / Bottom-N)
Set `pyContent.pyReportRank` with `pyRankType` (`TopRanked` | `BottomRanked`),
`pyPartitionType` (`Grouping` | `All`), `pyRows`, and `pyRankField`. Mirror
at `pyUI.pyBody.pyReportRank` with the corresponding `pyRankUIField`. Set
`pyContent.pyReportContainsRank="true"`.

### Application-context filtering
- `pyAppContextInfo.pyApplicationContextMode` enum: `AppOnly` | `AppAll` | `AppAllMinusPega` | `AppList` | `AppCentric`.
- `AppList` mode populates `pyApplicationList` (typically a data-page list ref like `D_pzGetScopingApplicationList.pxApplication`).
- `AppOnly` populates `pyApplicationName`/`pyApplicationVersion` (often `Application.pyProductName` / `Application.pyProductVersion`, or `Param.AppName` / `Param.AppVersion`).
- `pyFilters.pyAutomaticFilteringOptions` (and `*List`/`*Summary` variants) enum: `AppCentric` | `None`.

### Charts
- `pyUI.pyChart` (Embed-ReportGraph) is **always present** even when `pyEnableChart="false"` — Pega populates the full default block.
- `pyGraphType`: `Pie` | `Column` | `Bar` | `Line` | `Bubble` | `Combo`.
- `pySubType`: `Normal` | `clustered` | `stacked` | `segment` | `DualYAxisClustered`.
- All numeric chart fields are **string-encoded** (`"400"`, not `400`).
- Combo / DualY charts populate `pySecDataAxis[]` with the secondary measure axis; per-axis renderer is set via `pyChartOutputType` on each axis entry (e.g. `"Line"`).
- Pie charts populate `pyPie` (label/name fields, explode radius, etc.).
- Cartesian charts populate `pyXY` (with `pyArea`/`pyBar`/`pyBubble`/`pyColumn`/`pyLine` sub-objects, plus `pyDataAxis[]` and `pyGroupAxis[]`).

### Computed (function) columns
- Set `pyFieldName` to a function expression, e.g. `@@pxDivide(@@pxMultiply(.A,.B),.C)`.
- Set `pyIsFunction="true"`.
- Populate `pySQLFunction` (Embed-UserFunction) with `pyName`, `pyReturnType`, and `pyParameters[]` (Embed-MethodParams; nested `pyFunction` allows composition).

### Field formatting
`pyUIFields[*].pyFieldFormat` (Embed-ReportHtmlProp) wires a column to a
Pega control rule via `pyPropertyName` (e.g. `pzRuleOpener`, `pxDateTime`,
`pzGetWarningSeverity`) plus `pyPropertyParameters` map.
