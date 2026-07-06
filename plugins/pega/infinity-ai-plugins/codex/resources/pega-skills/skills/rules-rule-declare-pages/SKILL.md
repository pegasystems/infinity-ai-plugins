---
name: rules-rule-declare-pages
description: Schema and authoring guide for Pega data page rules (Rule-Declare-Pages), including connector, data transform, and activity source patterns
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Examples

| Skill | Description |
|-------|-------------|
| `Read-Only Connector-Backed Data Page` | Read-only (non-savable) connector-backed data page — correct `pyPageType: "normal"` shape |
| `Multi-Source Data Page (When-Routed with Always Fallback)` | Multi-source data page with When-routed conditional sources and an `Always` fallback |
| `List Data Page with Key-Based Retrieval` | List data page with key-based retrieval (`pyEnableRetrievePageByKey` + `pyKeysForPageList`) |
| `Savable Data Page (simplesave)` | Savable data page with a single `simplesave` save option — `pyPageType: "savable"` drives the save plan |
| `Savable Data Page with Multi-Option Save Plan` | Savable data page chaining `dbDelete` / `simplepatch` / `simplesave` via `pySaveOptionWhen`; demonstrates alternate-key storage |
| `Data Page with Post-Load Activity` | Data page that runs an enrichment activity after source load via `pyPostActivity` + `pyPostActivityParams` |
| `Simulated Data Page — Mock / Fake / Test Data Replacement` | Simulated (mock / fake / test-data) data page — DataTransform replacing a Connector, with original preserved in `pyDisabledSource` |
| `pyParameters entry — STRING` | String-typed data page parameter. The most common type; used for IDs, names, codes, free-text selectors. |
| `pyParameters entry — INTEGER` | Integer-typed data page parameter. Used for counts, limits, page sizes, numeric IDs stored as whole numbers. |
| `pyParameters entry — DECIMAL` | Decimal-typed data page parameter (fixed-precision). Used for monetary amounts, percentages, and other exact numeric values. |
| `pyParameters entry — DOUBLE` | Double-precision floating-point data page parameter. Used for scientific or statistical values where decimal precision is not critical. |
| `pyParameters entry — TRUEORFALSE` | Boolean-typed data page parameter. Values are the literal strings "true" / "false". |
| `pyParameters entry — DATE` | Date-typed data page parameter (no time component). Used for calendar-day filters and date-range endpoints. |
| `pyParameters entry — DATETIME` | DateTime-typed data page parameter (date + time). Used for point-in-time snapshots and timestamp filters. |
| `pyParameters entry — TIMEOFDAY` | Time-of-day-typed data page parameter (no date component). Used for recurring-schedule windows and business-hours filters. |
| `pyParameters entry — PAGE` | Page-typed data page parameter (structured embedded page). Requires pyParametersParamIntelliBaseClass to identify the page class. |
| `pyDataSourceList entry — Connector` | Minimum-viable connector source entry. Required fields pyConnectorName, pyConnectorClassName, pyConnectorList; typically accompanied by request/response data transforms. The bound connector's py{METHOD}ResponseDataList[*].pyMapToKey must use 'DataSource.<property>' (e.g. 'DataSource.pyResponseData') for the response DT to see the body. pyResDataTransform must be a clipboard-format wrapper DT, not a JSON-format DT directly. |
| `pyDataSourceList entry — Connector with parameter mapping` | Connector source entry with pyConnectorParamList mapping data page parameters to connector query-string parameters. pyIsActivityParameter must be "false" for connector params (query string, path, headers); "true" only for pxCallConnector activity-level overrides. |
| `pyDataSourceList entry — DataTransform` | Minimum-viable data-transform source entry. Simplest source type; only pyDTName is required. |
| `pyDataSourceList entry — LoadActivity` | Minimum-viable load-activity source entry. Use when load logic cannot be expressed as a data transform. Required field pyLoadActivity. |
| `pyDataSourceList entry — ObjOpen` | Minimum-viable ObjOpen (Lookup) source entry. Retrieves a single record by key. Required fields pyLookupClassName and pyClassKeyValueList. Server auto-sets pyLoadActivity to pxCallObjOpen. |
| `pyDataSourceList entry — ReportDefinition` | Minimum-viable report-definition source entry. Required fields pyLoadReportDefinition and pyReportDefinitionClass. Server auto-sets pyLoadActivity to pxCallRetrieveReportData. |
| `pyDataSourceList entry — AggregateSources` | Minimum-viable aggregate-sources source entry. Combines results from multiple independent sub-sources into a single data page. Required field pyAggregatedDataSourceList (each nested entry is itself a DeclarePageSource of any type). Rare — used when one data page must merge multiple feeds. |
| `pyDataSourceList entry — GenAI` | Minimum-viable GenAI source entry. Loads data via a Generative AI connector (Rule-Connect-GenerativeAI). Required field pyConnectorName. Server auto-sets pyLoadActivity to pxCallGenAI. |
| `pyDataSourceList entry — KnowledgeBuddy` | Minimum-viable Knowledge Buddy source entry. Queries a Knowledge Buddy for AI-powered responses. Required field pyKBName. Optional pyKBQuery, pyKBQueryJSON, pyKBResponse. Server auto-sets pyLoadActivity to pxCallKnowledgeBuddy. |

## Authoring Notes

### `pyPageName` must start with `D_`

Pega convention requires data page names to start with `D_` (e.g., `D_CustomerList`, `D_AccountTypes`). New data pages should always use the `D_` prefix. Legacy rules may use the `Declare_` prefix.

### Source types — pick one per `pyDataSourceList` entry

| Source Type | `pyDeclarePagesDataSource` | Key Fields | When to Use |
|-------------|---------------------------|------------|-------------|
| **Connector** | `"Connector"` | `pyConnectorName`, `pyConnectorClassName`, `pyConnectorList`, `pyRESTMethod`, `pyReqDataTransform` (optional), `pyResDataTransform` (optional — not needed when using direct `pyConnectorParamList` mapping) | Loading data from an external system via REST/SOAP |
| **Data Transform** | `"DataTransform"` | `pyDTName` (required), `pyReqDataTransform` (optional) | Populating data from clipboard or hardcoded values |
| **Activity** | `"LoadActivity"` | `pyLoadActivity` (custom activity name) | Complex load logic not expressible as a data transform |
| **Report Definition** | `"ReportDefinition"` | `pyLoadReportDefinition`, `pyReportDefinitionClass` | Querying database via a report definition (e.g., case lists, aggregations) |
| **Aggregate Sources** | `"AggregateSources"` | `pyAggregatedDataSourceList`, `pyAggregatedDataSourcesLabel` | Aggregating results from multiple sub-sources into a single data page (rare, advanced pattern) |
| **Lookup (ObjOpen)** | `"ObjOpen"` | `pyLookupClassName`, `pyLookupName`, `pyClassKeyValueList` | Direct database object retrieval by key (e.g., operator info, org lookups) |
| **Gen AI** | `"GenAI"` | `pyConnectorName` (required — Rule-Connect-GenerativeAI rule name) | Loading data via a Generative AI connector. Server auto-sets `pyLoadActivity: "pxCallGenAI"`. |
| **Knowledge Buddy** | `"KnowledgeBuddy"` | `pyKBName` (required — KB rule name), `pyKBQuery` (optional — query text, e.g. `"Param.Query"`), `pyKBQueryJSON` (optional — structured JSON query), `pyKBResponse` (optional — dot-prefixed property for response, e.g. `".pyResponseData"`) | Querying a Knowledge Buddy for context-aware AI responses. Server auto-sets `pyLoadActivity: "pxCallKnowledgeBuddy"`. |

> **Note:** For list-structure data pages (`pyStructure: "list"`), a LoadActivity source's activity must be defined on `Code-Pega-List`, not the data page's element class. The activity must populate the primary page that the data page engine passes in as the step page.

> `pyConnectorList` (required for Connector sources) specifies the connector rule type: `"Rule-Connect-REST"`, `"Rule-Connect-SOAP"`, `"Rule-Connect-dotNet"`, `"Rule-Connect-Java"`, or `"Rule-Connect-SAP"`.

### GenAI and Knowledge Buddy sources

These source types use dedicated internal load activities that the server auto-sets
when `pyDeclarePagesDataSource` is configured:

| Source Type | Auto-set `pyLoadActivity` |
|-------------|--------------------------|
| GenAI | `pxCallGenAI` |
| KnowledgeBuddy | `pxCallKnowledgeBuddy` |

Agents should NOT set `pyLoadActivity` for these source types — the server
derives it from `pyDeclarePagesDataSource`.

`pyConnectorList` is irrelevant for GenAI and KnowledgeBuddy sources. The server
auto-fills it as `"Rule-Connect-REST"` but it has no runtime effect. Do not set
it explicitly.

Both GenAI and KnowledgeBuddy sources use `pyConnectorName` to reference a
`Rule-Connect-GenerativeAI` connector rule. No request/response data transforms
are needed — the connector or Knowledge Buddy handles mapping internally.

For **KnowledgeBuddy** sources, `pyKBQuery` typically wires from a data page
parameter using `"Param.<ParamName>"` syntax. `pyKBResponse` uses dot-prefixed
property notation (e.g., `".pyResponseData"`) to specify where the KB stores
its response on the data page's primary page.

### `Connector` source — `DataSource` named page contract

When `pyDeclarePagesDataSource: "Connector"`, the engine binds the
connector's working state to a named clipboard page called `DataSource`.
The bound connector's `py{METHOD}ResponseDataList[*].pyMapToKey` must use
`DataSource.<property>` (e.g. `DataSource.pyResponseData`) for the
response body to land where `pyResDataTransform` reads it. A bare
`.pyResponseData` deposits the body on the connector's calling page,
which the response DT cannot see — silent empty-response failure (200 OK,
no exception, target properties empty). See
`rest-request-response-mapping` for the
connector-side detail.

When using a JSON-format DT for response mapping, `pyResDataTransform`
must reference a **clipboard-format wrapper DT**, not the JSON DT
directly. The wrapper calls the JSON DT via APPLY_MODEL, passing
`DataSource.pyResponseData` as `jsonData` and `"DESERIALIZE"` as
`executionMode`. The data page framework does not populate JSON DT
parameters. See `JSON Response Bridge DT (Clipboard Wrapper)`.

### Page type drives `pyType` and `pyIsSavable`

`pyPageType` is the authoritative user-facing selector. Agents should set `pyPageType` only — `pyType`, `pyIsSavable`, and `pyUseNewGenPageForEditableDataPage` are derived:

| `pyPageType` | Derived `pyType` | Derived `pyIsSavable` | Derived `pyUseNewGenPageForEditableDataPage` | Meaning |
|--------------|------------------|-----------------------|----------------------------------------------|---------|
| `"normal"` | `"normal"` | `"false"` | `"false"` | Read-only data page (non-savable, non-editable) |
| `"savable"` | `"loadonly"` | `"true"` | `"true"` | Supports save-back; populate `pyDataPageSaveOptionList` |

> **DEPRECATED:** `pyPageType: "loadonly"` — do not use. Despite the name
> suggesting read-only, it causes the data page to appear editable in the UI.
> Use `"normal"` for read-only data pages.

On read-back (`UpgradeOnOpen`), Pega reverses the relationship — `pyPageType` is recomputed from `pyType`/`pyIsSavable`. Authoring always writes `pyPageType`.

### Error handling on source failure

`pyRunDataTransformOnError` on a source entry controls whether the source's error data transform runs when the source load fails:

| Value | Behavior |
|-------|----------|
| `"true"` | Run the error data transform if the load fails |
| `"false"` or omitted | No error DT execution (default) |

### Queryable data pages (zero sources)

When `pyIsQueryable` is `"true"`, the data page is backed by Pega's Data Object storage and does not need a `pyDataSourceList` entry — omit the array entirely. This is a Pega 26.1+ pattern for Data Object-backed data pages.

### Scope selection

| Scope | `pyScope` | Lifetime | Shared? | Use Case | Required fields |
|-------|-----------|----------|---------|----------|-----------------|
| Thread | `"thread"` | Current flow execution | No | Case-specific data, one-time lookups | — |
| Requestor | `"requestor"` | User session | Per user | User-specific lookups, dropdown data | — |
| Node | `"node"` | Server node | All users | Reference data, code tables, system config | `pyAccessGroup` |

Server-side effects: node scope clears `pyWhen`; thread scope clears `pyAccessGroup`. Node-scoped data pages cannot be savable.

**Conditional loading with When rules** — set `pyUseWhen: "true"` and `pyWhen` to the When rule name. Only applicable for thread and requestor scopes.

### Multi-source data pages

A data page can have multiple entries in `pyDataSourceList` with conditional source selection via `pySourceWhen`:

1. Each source specifies a When rule name in `pySourceWhen`
2. Pega evaluates sources in array order — first `true` match is used
3. Use `pySourceWhen: "Always"` as the fallback (should be the last entry)
4. All When rules in `pySourceWhen` are app-specific — `"Always"` is the only reserved keyword (unconditional match)

When a When rule requires parameters, map them via `pyWhenParamList` on the source entry. Set `pyPassCurrentParamPageForWhen: "true"` to pass the data page's parameter page to the When rule.

### Parameter mapping

Data page parameters are declared at the top level in `pyParameters` (each entry is an `Embed-MethodParams` object with `pyParametersParamName`, `pyParametersParamType`, `pyParametersParamInOut`, `pyParametersParamReq`). They become part of the cache key — different values produce different cached instances.

Each source type has a dedicated array for mapping DP parameters into the source's call signature. All three use the same `Embed-NameValuePair` shape:

| Source kind | Source-entry field | Companion flag |
|-------------|--------------------|----------------|
| Connector | `pyConnectorParamList` | `pyPassCurrentParamPageForActivity: "true"` |
| LoadActivity (and any source using activity params) | `pyActivityParams` | `pyPassCurrentParamPageForActivity: "true"` |
| DataTransform | `pyDTParamList` | `pyPassCurrentParamPageForReqDT: "true"` |

For **ReportDefinition** and **LoadActivity** sources, `pyPassCurrentParamPageForActivity`
is required by schema — set to `"true"` to pass the data page's parameter page to
the source. If parameter names between the DP and the source don't match,
additionally configure `pyActivityParams` to remap them explicitly.
`pyActivityParams` is available on all source types (not just LoadActivity).

`Embed-NameValuePair` entry fields: `pyName` (matches a `pyParameters` entry), `pyValue`, `pyIsActivityParameter` (`"false"` for connector parameters — query string, path, headers — placed on the connector's parameter page where `pyMapFrom: "PARAM"` reads them; `"true"` ONLY for `pxCallConnector` activity-level parameters such as timeout overrides — using `"true"` for connector parameters causes values to be silently dropped), `pyParameterRequired` (`"-1"` required, `"0"` optional), `pyParameterType` (`STRING`/`INTEGER`/`BOOLEAN`/`Text` — `Text` accepted on older rules), `pyParameterInOut`.

**`pyValue` patterns:**

- `""` — pass-through from the DP parameter page (used with `pyPassCurrent…: "true"`)
- `"param.<ParamName>"` — explicit wiring from DP parameter to source parameter
- `".<PropertyName>"` — dot-notation property reference (e.g., `".pyGUID"`)

`pyActivityParams` is available on **all** source types, not just LoadActivity (confirmed on ReportDefinition and DataTransform). The server auto-populates `pyLoadActivityParameters` from `pyActivityParams`. Entries may include internal activity parameters (e.g., `workPage`, `generateHierarchy`) that are not exposed as top-level `pyParameters`.

When using request/response data transforms instead of direct mapping, leave `pyConnectorParamList` as the empty stub and set `pyPassCurrentParamPageForReqDT` / `pyPassCurrentParamPageForRespDT`.

### `pyDisabledSource` — simulation only

`pyDisabledSource` is only present on simulated data pages. It preserves the original pre-simulation source so the UI can restore it via "un-simulate." When creating a non-simulated data page, omit it. When updating a simulated data page, preserve it verbatim. See `Simulated Data Page — Mock / Fake / Test Data Replacement`.

### Source rules must exist before the data page is created

Pega validates referenced source rules (Data Transforms, Report Definitions, Activities, Connectors) at save time. If the referenced rule does not exist or cannot be resolved from the data page's class hierarchy, the save fails with an error like:

```
.pyDataSourceList(1).pyDTName: LoadMyEntity does not exist or is not a valid entry
for this ruleset and its prerequisites
```

**Create source rules first.** When a data page references a Data Transform, Report Definition, Activity, or Connector, that rule must already exist and be resolvable before attempting to create the data page. This applies equally to rules in the base ruleset and rules in a branch ruleset.

**Class hierarchy matters for resolution.** The data page's `pyClassName` must be equal to or inherit from the source entry's `pyClassName`. Pega resolves the referenced rule by walking up the class hierarchy from the source's `pyClassName`. If the data page's `pyClassName` is unrelated (e.g., `Code-Pega-List`), the rule cannot be resolved even if it exists.

For example, if a Data Transform `LoadMyEntity` is defined on `MyOrg-MyApp-Data-MyEntity`:
- **Works:** data page `pyClassName: "MyOrg-MyApp-Data-MyEntity"` with source `pyClassName: "MyOrg-MyApp-Data-MyEntity"` — the DT resolves because the classes match.
- **Works:** data page `pyClassName: "MyOrg-MyApp-Data-MyEntity"` with source `pyClassName: "MyOrg-MyApp-Data"` — the DT resolves if `MyOrg-MyApp-Data` inherits up to the class where the DT is defined.
- **Fails:** data page `pyClassName: "Code-Pega-List"` with source `pyClassName: "MyOrg-MyApp-Data-MyEntity"` — `Code-Pega-List` does not inherit from `MyOrg-MyApp-Data-MyEntity`, so the DT cannot be resolved.

**Authoring order for multi-rule changes:** When creating both source rules and data pages in the same ChangeRequest branch, create the source rules (Data Transforms, Activities, etc.) first, then create the data pages that reference them.

### Simulated data pages

A simulated data page is a runtime variant where the real source (Connector, ReportDefinition, etc.) is replaced by a stand-in source (typically a DataTransform with canned data). Selected via ruleset layering; transparent to callers. **Not** the same as unit-test mock pages (`Rule-Test-Unit-Case.pySetupPages`).

Detect simulation by checking rule-level `pyIsSimulated: "true"` (the authoritative flag). `pyDisplayMode: "clone"` is ambiguous — any save-as produces it. Agents should not hand-construct simulated DPs; use App Studio's "Simulate data page" or the Blueprint generator (`pzCreateMissingSimulatedDataPages`). On update, preserve `pyDisabledSource`, `pyDataSourceHolder`, `pyDescription`, and `pyDSSystemName` verbatim.
