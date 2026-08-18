---
name: rules-rule-declare-pages
description: Schema and authoring guide for Pega data page rules (Rule-Declare-Pages), including connector, simulated, report definition, ObjOpen, data transform, and activity source patterns
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Purpose

Data Pages (`Rule-Declare-Pages`) are global constructors/caches. Data pages are class-less constructors: they are not defined “on” a class; instead,
`pyClassName` is the class of the page or list items the Data Page returns.

- `pyPageName` should start with `D_`.
- `pyStructure: "page"` returns one page of class `pyClassName`.
- `pyStructure: "list"` returns a `Code-Pega-List` container whose `.pxResults`
  entries are instances of `pyClassName`; do **not** set list DPs to
  `Code-Pega-List` as the rule's `pyClassName`.
- Any class can reference any Data Page by name and parameters.

## Examples

Examples stay in separate files; use this table to pick the payload pattern.

| Skill | Description |
|-------|-------------|
| `Stub Data Page (List)` | Minimal connector-backed list Data Page — smallest valid create payload |
| `Stub Data Page (Single)` | Minimal connector-backed single/page Data Page — smallest valid create payload |
| `Read-Only Connector-Backed Data Page` | Read-only connector-backed Data Page — correct `pyPageType: "normal"` shape |
| `Multi-Source Data Page (When-Routed with Always Fallback)` | Conditional sources with `pySourceWhen` and `Always` fallback |
| `List Data Page with Key-Based Retrieval` | List DP with key-based retrieval (`pyEnableRetrievePageByKey` + `pyKeysForPageList`) |
| `Savable Data Page (simplesave)` | Savable DP with one `simplesave` save option |
| `Savable Data Page with Multi-Option Save Plan` | Save-plan cascade (`dbDelete` / `simplepatch` / `simplesave`) and alternate-key storage |
| `Data Page with Post-Load Activity` | Enrichment via `pyPostActivity` + `pyPostActivityParams` |
| `Simulated Data Page — Mock / Fake / Test Data Replacement` | Simulation source with original source preserved in `pyDisabledSource` |
| `pyParameters entry — String/Integer/Decimal/Boolean` | Data Page parameter entries with correct Title Case types |
| `pyDataSourceList entry — Connector` | Minimum connector source entry |
| `pyDataSourceList entry — Connector with parameter mapping` | Connector params from DP parameters; `pyIsActivityParameter: "false"` |
| `pyDataSourceList entry — DataTransform` | Minimum DataTransform source |
| `pyDataSourceList entry — LoadActivity` | Minimum LoadActivity source |
| `pyDataSourceList entry — ObjOpen` | Lookup/ObjOpen source by key |
| `pyDataSourceList entry — ReportDefinition` | ReportDefinition source for list/query use cases |
| `pyDataSourceList entry — AggregateSources` | Aggregates multiple sub-sources; see `declare-pages-advanced-source-types` |
| `pyDataSourceList entry — GenAI` | Generative AI connector source; server auto-sets `pyLoadActivity` to `pxCallGenAI`; see `declare-pages-advanced-source-types` |
| `pyDataSourceList entry — KnowledgeBuddy` | Knowledge Buddy query source; server auto-sets `pyLoadActivity` to `pxCallKnowledgeBuddy`; see `declare-pages-advanced-source-types` |
| `pyDataSourceList entry — RoboticAutomation` | Server-side robotic automation source; see `declare-pages-advanced-source-types` |
| `pyDataSourceList entry — RoboticDesktopAutomation` | Desktop robotic automation source; see `declare-pages-advanced-source-types` |

## Minimum rule shape

See `Stub Data Page (List)` and `Stub Data Page (Single)` for the smallest
valid create payload for the two most common Data Page shapes.

`pyPageType` is the user-facing selector. Author it instead of derived fields:

| `pyPageType` | Derived `pyType` | Derived `pyIsSavable` | Meaning |
|--------------|------------------|-----------------------|---------|
| `"normal"` | `"normal"` | `"false"` | Read-only Data Page |
| `"savable"` | `"loadonly"` | `"true"` | Data Page with `pyDataPageSaveOptionList` |

Do **not** use `pyPageType: "loadonly"` for read-only pages; it appears editable
in the UI. On read-back, Pega recomputes `pyPageType` from `pyType` and
`pyIsSavable`, but authoring should set `pyPageType`.

## Common source types

Source types — pick one per `pyDataSourceList` entry. Set one
`pyDeclarePagesDataSource` value for each active source entry.

| Source type | Value | Key fields | Use when |
|-------------|-------|------------|----------|
| Connector | `"Connector"` | `pyConnectorName`, `pyConnectorClassName`, `pyConnectorList`, `pyRESTMethod`, optional `pyReqDataTransform`, `pyResDataTransform` | REST/SOAP/external API load |
| Report Definition | `"ReportDefinition"` | `pyLoadReportDefinition`, `pyReportDefinitionClass` | Local or external DB list/query source |
| Lookup / ObjOpen | `"ObjOpen"` | `pyLookupClassName`, `pyLookupName`, `pyClassKeyValueList` | Single-record DB lookup, commonly simulated/savable DPs |
| Data Transform | `"DataTransform"` | `pyDTName`, optional `pyReqDataTransform` | Clipboard/canned data; common API-level simulation source |
| Load Activity | `"LoadActivity"` | `pyLoadActivity` | Custom load logic not expressible as another source type |

For list-structure Data Pages with a LoadActivity source, the activity must be
defined on `Code-Pega-List` and populate the primary page passed by the DP engine.

Advanced source types — AggregateSources, GenAI, KnowledgeBuddy,
RoboticAutomation, RoboticDesktopAutomation — are supported but uncommon; see
`declare-pages-advanced-source-types` and the separate example files.

## Connector source contract

When `pyDeclarePagesDataSource: "Connector"`:

- The bound connector's response mapping must use `pyMapTo: "Clipboard"` and
  `pyMapToKey: ".pyResponseData"` — **not** `DataSource.pyResponseData`.
- `DataSource` is created later by the Data Page framework as the PAGE parameter
  to the response DT; it does not exist during connector execution.
- Wire `pyResDataTransform` to a **clipboard-format wrapper DT**, not directly to
  a JSON DT. The wrapper calls the JSON DT via APPLY_MODEL, passing
  `DataSource.pyResponseData` as `jsonData` and `"DESERIALIZE"` as
  `executionMode`.
- `pyConnectorList` identifies the connector rule type, e.g.
  `"Rule-Connect-REST"`.

### Connector parameters and dynamic path params

Use `pyConnectorParamList` to map Data Page parameters to connector query/path
parameters. For connector parameters that represent HTTP query/path/header
values, set `pyIsActivityParameter: "false"`; `"true"` is only for
`pxCallConnector` activity-level overrides.

For direct API-created connector sources with dynamic path params like `{id}`,
also set `pyLoadActivityParameters` to mirror the connector param mapping (for
example, `{"id":"Param.Id"}`). Direct API writes may not regenerate this shadow
field the way Dev Studio does. This applies to Data Page **sources** only.
Save-plan entries do **not** have `pyLoadActivityParameters`; they read
`pyConnectorParamList` directly. See `declare-pages-parameter-mapping-details`.

## Simulated data pages and disabled sources — common and critical

Simulation is a normal Data Page state where the active source is a development
stand-in while the inactive source is preserved for later swapping.

| Data Page purpose | Common simulated source | Common live source |
|-------------------|-------------------------|--------------------|
| List / collection | ReportDefinition (`DataTableEditorReport`) | Connector or DB ReportDefinition |
| Single / savable lookup | ObjOpen / Lookup | Connector or DB ObjOpen |
| API-level proof only | DataTransform with canned data | Connector |

Rules to preserve correctness:

- `pyDisabledSource` is a full `Embed-DeclarePageSource` that preserves whichever
  source is not currently active. Preserve it verbatim on updates.
- On a simulated Data Page, `pyDisabledSource` typically holds the production
  connector/source. On an activated Blueprint/OAS Data Page, it typically holds
  the simulated source.
- Author simulation state on the active source entry (`pyDataSourceList(n).pyIsSimulated`).
  The top-level `pyIsSimulated` is platform-derived/read-back state and should
  not be treated as the primary authored source of truth in update payloads.
- On read-back, rule-level `pyIsSimulated: "true"` is a useful detection signal;
  `pyDisplayMode: "clone"` is not, because any save-as can produce it.
- Do not confuse simulated data pages with unit-test mock pages
  (`Rule-Test-Unit-Case.pySetupPages`).
- DataTransform simulation can work via API, but the Records tab (driven by
  the class's `DataTableEditorReport` Report Definition) won't show any data
  from it. For Data Designer-complete Data Types, prefer the Blueprint-style
  ReportDefinition simulation for list DPs and ObjOpen for single/savable
  DPs. See `model-integration-data-pages` for the full Records-tab
  mechanism.

When creating a non-simulated Data Page from scratch, omit `pyDisabledSource`.
When updating a Data Page that already has simulation metadata, preserve
`pyDisabledSource`, `pyDataSourceHolder`, `pyDescription`, and `pyDSSystemName`
verbatim unless the task explicitly changes that source relationship.

## Data Page parameters

Top-level `pyParameters` entries become part of the Data Page cache key.

Only four parameter types are supported in Infinity Studio's Data Page parameter
dropdown. Use **Title Case** for `Rule-Declare-Pages.pyParametersParamType`:

| Use | `pyParametersParamType` |
|-----|--------------------------|
| Text/IDs/codes/dates-as-text | `String` |
| Whole numbers | `Integer` |
| Fixed precision numbers | `Decimal` |
| Boolean values | `Boolean` |

Do not use connector-style all caps (`STRING`, `INTEGER`, `DECIMAL`) for Data
Page parameters — all-caps `DECIMAL` renders as Boolean in Infinity Studio and
fails to save with "Boolean parameters cannot be marked required" if the
parameter is required.

Pass date/time values as `String` when needed; Date/DateTime/TimeOfDay/Page/Double
are not standard top-level Data Page parameter types.

## Parameter-to-property binding (`pyIsAlternateKeyStorage`)

For every Data Page parameter that corresponds to a real property on the Data
Page class, set:

```json
"pyIsAlternateKeyStorage": "true",
"pyAltKeyStorageField": "{PropertyName}"
```

Despite the legacy name, this is not only about alternate keys. It tells
Constellation/Infinity Studio how to populate Data Page parameters when opening
records from Data Explorer, list-to-detail navigation, or DX-driven views. A
Data Page can work via `run-data-page` but fail from UI navigation without this
binding.

Bind every property-backed parameter on list, lookup, and savable Data Pages.
Only omit it for parameters with no corresponding property, such as pagination or
format-control parameters.

## Multi-source and source resolution

Multiple entries in `pyDataSourceList` can route conditionally with
`pySourceWhen`; Pega evaluates in array order and uses the first true source.
Use `pySourceWhen: "Always"` as the final fallback. See
`declare-pages-source-resolution-and-multisource` for When parameters,
AggregateSources, class hierarchy resolution, and authoring order.

Source rules must exist before the data page is created. Referenced source
rules — connectors, DTs, report definitions, activities — must exist and be
resolvable before creating or updating the Data Page that references them.

## Save plans

Savable pages (`pyPageType: "savable"`) populate `pyDataPageSaveOptionList`.
Use separate save-plan examples/references for the exact payloads. Save-plan
entries do NOT use connector source dynamic-path `pyLoadActivityParameters` —
that field does not apply to save-plan entries.

### Savable Data Page

See example `Savable Data Page (simplesave)`

Notes:
- Agents should set `pyPageType` only. `pyType` ("loadonly") and `pyIsSavable` ("true") are derived from `pyPageType: "savable"`.
- Node-scoped data pages (`pyScope: "node"`) cannot be savable.

### Savable Data Page with Multi-Option Save Plan

See example `Savable Data Page with Multi-Option Save Plan`

Notes:
- Pega evaluates save options in array order; the first whose `pySaveOptionWhen` evaluates true executes.
- **Alternate key storage** — the `pyGUID` parameter is marked `pyIsAlternateKeyStorage: "true"` with `pyAltKeyStorageField: ".pyGUID"`, telling the save engine which field identifies the record for patch/delete. Roughly 60% of savable data pages use this pattern.
- Activity-type save options (not shown) add `pyActivityName` and `pyActivityParamList` with the usual `Embed-NameValuePair` shape; they support `pyParameterInOut: "OUT"`, `pyParameterType: "PAGE"`, and `pyParameterIntelliBaseClass` for page-typed parameters. `pyRATimeout` is NOT read for plain activity saves — it belongs to `robotic_automation`/`robotic_desktop_automation` save options.
- Save-time data transform parameters use `pyDTParamList` (same shape as on source entries).

## Other authoring notes

- `pyRunDataTransformOnError: "true"` on a source entry runs the source's error
  DT when load fails; omitted/`"false"` means no error DT execution.
- `pyIsQueryable: "true"` Data Pages are backed by Pega Data Object storage and
  do not need `pyDataSourceList` entries; omit the source array for that pattern.
- Scopes: `thread` and `requestor` support conditional loading; `node` is
  read-only only, uses TTL refresh only, requires `pyAccessGroup`, and cannot be
  savable.
- `pyKeysForPageList` entries must start with `.` and reference a valid property
  on the list entry class (the actual data class loaded into the list, not
  `Code-Pega-List`). For list Data Pages, top-level `pyClassName` is the
  element/data class — the runtime container is `Code-Pega-List`, but that is
  not the rule's `pyClassName`.
- The server forces `pyEnableRetrievePageByKey` to `"false"` when `pyStructure`
  is `"page"` or `pyPageType` is `"loadonly"`.
- `pyPostActivity` runs **after** the source load completes — use it for data
  enrichment, cross-page joins, or computed fields that depend on the loaded
  data. `pyPassCurrentParamPageForPostActivity: "true"` forwards the data
  page's parameter page to the activity. `pyPostActivityParams` uses the
  standard `Embed-NameValuePair` shape: `pyName`, `pyValue` (empty =
  pass-through from parameter page, `"literal"` = hardcoded, `"Param.X"` =
  explicit param reference).

## References

| Skill | Covers |
|-----------|--------|
| `declare-pages-advanced-source-types` | AggregateSources, GenAI, KnowledgeBuddy, RoboticAutomation, RDA |
| `declare-pages-parameter-mapping-details` | `Embed-NameValuePair`, `pyActivityParams`, dynamic path params, save-plan distinction |
| `declare-pages-source-resolution-and-multisource` | Multi-source When routing, source rule existence, class hierarchy resolution |
