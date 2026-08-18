---
name: declare-pages-parameter-mapping-details
description: Load when mapping Data Page parameters into a source's call signature (connector, activity, or data transform). Covers Embed-NameValuePair fields, dynamic connector path parameters, and why save-plan entries don't use pyLoadActivityParameters.
---

Data Page parameters are declared at the top level in `pyParameters`. They become
part of the cache key: different values produce different cached instances.

## Source-entry parameter mapping fields

Each source type uses a dedicated array to map Data Page parameters into the
source call signature:

| Source kind | Source-entry field | Companion flag |
|-------------|--------------------|----------------|
| Connector | `pyConnectorParamList` | `pyPassCurrentParamPageForActivity: "true"` |
| LoadActivity / activity params | `pyActivityParams` | `pyPassCurrentParamPageForActivity: "true"` |
| DataTransform | `pyDTParamList` | `pyPassCurrentParamPageForReqDT: "true"` |

For ReportDefinition and LoadActivity sources, `pyPassCurrentParamPageForActivity`
is required by schema. Set it to `"true"` to pass the Data Page parameter page.
If parameter names differ between the Data Page and source, configure
`pyActivityParams` to remap them explicitly.

`pyActivityParams` is available on all source types, not just LoadActivity
(confirmed on ReportDefinition and DataTransform). The server auto-populates
`pyLoadActivityParameters` from `pyActivityParams`. Entries may include internal
activity parameters such as `workPage` or `generateHierarchy` that are not
exposed as top-level `pyParameters`.

## `Embed-NameValuePair` fields

Common fields:

| Field | Meaning |
|-------|---------|
| `pyName` | Source parameter name; often matches a top-level `pyParameters` entry |
| `pyValue` | Value expression / source, e.g. `Param.Id` |
| `pyIsActivityParameter` | `"false"` for connector query/path/header params; `"true"` only for activity-level overrides |
| `pyParameterRequired` | `"-1"` required, `"0"` optional |
| `pyParameterType` | Connector/source parameter type such as `STRING`, `INTEGER`, `BOOLEAN`, or legacy `Text` |
| `pyParameterInOut` | Parameter direction when applicable |

`pyValue` patterns:

- `""` — pass-through from the Data Page parameter page when the relevant
  `pyPassCurrent...` flag is true.
- `"Param.<ParamName>"` — explicit wiring from Data Page parameter.
- `".<PropertyName>"` — dot-notation property reference, e.g. `".pyGUID"`.

## Connector dynamic path parameters

For connector sources with dynamic path parameters such as `{id}`, set
`pyLoadActivityParameters` explicitly as well as `pyConnectorParamList` — e.g.
`pyDataSourceList[].pyLoadActivityParameters.id = "Param.Id"`. Direct API
writes do not auto-regenerate this shadow field the way Dev Studio save does,
so it must be set explicitly in the create/update payload.

This applies to Data Page **sources** only, which route through
`pxCallConnector`/`pxCallObjOpen` load activities.

## Save-plan entries do not use `pyLoadActivityParameters`

`Embed-DeclarePageSaveOption` entries in `pyDataPageSaveOptionList` have no
`pyLoadActivityParameters` field. Save options read `pyConnectorParamList`
directly at runtime through a different code path (Obj-Save with a save-plan
connector). Do not add source-only `pyLoadActivityParameters` to save plans.

## Data transforms instead of direct connector mapping

When using request/response data transforms instead of direct source mapping,
leave `pyConnectorParamList` as the empty stub and set the relevant pass-current
flags (`pyPassCurrentParamPageForReqDT` / `pyPassCurrentParamPageForRespDT`).
