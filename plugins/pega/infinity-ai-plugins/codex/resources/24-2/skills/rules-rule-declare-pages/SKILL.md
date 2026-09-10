---
name: rules-rule-declare-pages
description: Authoring guide for Pega data page rules (Rule-Declare-Pages), including connector, simulated, report definition, ObjOpen, data transform, and activity source patterns
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
| `declare-pages-stub-list` | Minimal connector-backed list Data Page — smallest valid create payload |
| `declare-pages-stub-single` | Minimal connector-backed single/page Data Page — smallest valid create payload |
| `declare-pages-read-only-connector` | Read-only connector-backed Data Page — correct `pyPageType: "normal"` shape |
| `declare-pages-multi-source-when-routed` | Conditional sources with `pySourceWhen` and `Always` fallback |
| `declare-pages-list-by-key` | List DP with key-based retrieval (`pyEnableRetrievePageByKey` + `pyKeysForPageList`) |
| `declare-pages-savable-simplesave` | Savable DP with one `simplesave` save option |
| `declare-pages-savable-multi-option` | Save-plan cascade (`dbDelete` / `simplepatch` / `simplesave`) and alternate-key storage |
| `declare-pages-post-load-activity` | Enrichment via `pyPostActivity` + `pyPostActivityParams` |
| `declare-pages-simulated-replacement` | Simulation source with original source preserved in `pyDisabledSource` |
| `declare-pages-param-string` | Data Page parameter entry — String type (all-caps `STRING`) |
| `declare-pages-param-integer` | Data Page parameter entry — Integer type (all-caps `INTEGER`) |
| `declare-pages-param-decimal` | Data Page parameter entry — Decimal type (Title Case `Decimal`) |
| `declare-pages-param-boolean` | Data Page parameter entry — Boolean type (all-caps `BOOLEAN`) |
| `declare-pages-source-connector` | Minimum connector source entry |
| `declare-pages-source-connector-with-params` | Connector params from DP parameters; `pyIsActivityParameter: "false"` |
| `declare-pages-source-data-transform` | Minimum DataTransform source |
| `declare-pages-source-load-activity` | Minimum LoadActivity source |
| `declare-pages-source-obj-open` | Lookup/ObjOpen source by key |
| `declare-pages-source-report-definition` | ReportDefinition source for list/query use cases |
| `declare-pages-source-aggregate` | Aggregates multiple sub-sources; see `data-page-advanced-source-types` |
| `declare-pages-source-genai` | Generative AI connector source; server auto-sets `pyLoadActivity` to `pxCallGenAI`; see `data-page-advanced-source-types` |
| `declare-pages-source-knowledge-buddy` | Knowledge Buddy query source; server auto-sets `pyLoadActivity` to `pxCallKnowledgeBuddy`; see `data-page-advanced-source-types` |
| `declare-pages-source-robotic-automation` | Server-side robotic automation source; see `data-page-advanced-source-types` |
| `declare-pages-source-robotic-desktop-automation` | Desktop robotic automation source; see `data-page-advanced-source-types` |

## Minimum rule shape

See `declare-pages-stub-list` and `declare-pages-stub-single` for the smallest
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
`data-page-advanced-source-types` and the separate example files.

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
`pyConnectorParamList` directly. See `data-page-parameter-mapping-details`.

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
dropdown, and **the correct casing is mixed per type** for
`Rule-Declare-Pages.pyParametersParamType` — it is NOT uniformly Title Case,
despite that being the more intuitive assumption:

| Use | `pyParametersParamType` |
|-----|-------------------------|
| Text/IDs/codes/dates-as-text | `STRING` |
| Whole numbers | `INTEGER` |
| Fixed precision numbers | `Decimal` |
| Boolean values | `BOOLEAN` |

**Do not use Title Case `Boolean` or `String` or `Integer`** — they silently persist and
even round-trip correctly through the authoring API (`get-rule` echoes back
exactly what was sent), but Dev Studio renders them as a Boolean checkbox
column with no error or warning at any point. This is a genuine platform
rendering bug, not a tooling artifact: the Rule-Declare-Pages parameter
type field accepts arbitrary strings at save time, and Dev Studio's dropdown
apparently falls back to its first list entry (Boolean) when the stored value
doesn't match its expected internal picklist values for String/Integer.

Pass date/time values as `STRING` when needed; Date/DateTime/TimeOfDay/Page/Double
are not standard top-level Data Page parameter types.

### Once a parameter is authored with a broken Title Case type, the rule may become permanently unpatchable via this API

If a Data Page's `pyParameters` array is manually corrected in Dev Studio (e.g.
`String` → `STRING`), be aware that `update-rule` re-validates the **entire
merged rule** on every call — not just the fields you're touching. If the
schema's enum does not include the corrected value, every subsequent
`update-rule` call against that rule fails with a `pyParametersParamType`
enum error, even for changes completely unrelated to `pyParameters`. Confirmed
live: a save-plan-only edit to `D_PaymentSavable` failed after its `pyGUID`
parameter had been manually fixed to `STRING` in Dev Studio, purely because
`STRING` wasn't yet in this schema's enum. Keeping the schema's enum aligned
with the platform's actual accepted values (this table) is therefore not just
a correctness issue — it can block all future API-driven maintenance of an
otherwise-healthy rule.

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
`data-page-source-resolution-and-multisource` for When parameters,
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

See example `declare-pages-savable-simplesave`

Notes:
- Agents should set `pyPageType` only. `pyType` ("loadonly") and `pyIsSavable` ("true") are derived from `pyPageType: "savable"`.
- Node-scoped data pages (`pyScope: "node"`) cannot be savable.

### Savable Data Page with Multi-Option Save Plan

See example `declare-pages-savable-multi-option`

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
| `data-page-advanced-source-types` | AggregateSources, GenAI, KnowledgeBuddy, RoboticAutomation, RDA |
| `data-page-parameter-mapping-details` | `Embed-NameValuePair`, `pyActivityParams`, dynamic path params, save-plan distinction |
| `data-page-source-resolution-and-multisource` | Multi-source When routing, source rule existence, class hierarchy resolution |
| `data-pages-simulation` | Simulated Data Pages, source replacement, and preserving `pyDisabledSource` |
