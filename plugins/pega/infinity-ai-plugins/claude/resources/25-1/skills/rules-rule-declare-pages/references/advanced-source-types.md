---
name: declare-pages-advanced-source-types
description: Advanced Rule-Declare-Pages source types — AggregateSources, GenAI, KnowledgeBuddy, RoboticAutomation, and RoboticDesktopAutomation.
---

These source types are supported but less common than Connector,
ReportDefinition, ObjOpen, DataTransform, and LoadActivity. Prefer the common
source types unless the use case clearly needs one of these patterns.

## AggregateSources

`pyDeclarePagesDataSource: "AggregateSources"` combines results from multiple
independent sub-sources into a single Data Page.

Key fields:

- `pyAggregatedDataSourceList` — nested source entries; each nested entry is an
  `Embed-DeclarePageSource` of any supported source type.
- `pyAggregatedDataSourcesLabel` — label/description for the aggregate.

Sub-source entries inside `pyAggregatedDataSourceList` do **not** have
`pySourceWhen`; only the parent aggregate source carries the When condition.

Use AggregateSources when one Data Page must merge multiple feeds. It can be
combined with conditional routing: one top-level `pyDataSourceList` entry can be
AggregateSources and another can be a normal source, each selected by
`pySourceWhen`.

## GenAI, KnowledgeBuddy, RoboticAutomation, and RDA

These source types use dedicated internal load activities that the server
auto-sets from `pyDeclarePagesDataSource`:

| Source type | `pyDeclarePagesDataSource` | Auto-set `pyLoadActivity` |
|-------------|----------------------------|---------------------------|
| GenAI | `"GenAI"` | `pxCallGenAI` |
| Knowledge Buddy | `"KnowledgeBuddy"` | `pxCallKnowledgeBuddy` |
| Robotic Automation | `"RoboticAutomation"` | `pxCallRoboticAutomation` |
| Robotic Desktop Automation | `"RoboticDesktopAutomation"` | `pxCallRoboticDesktopAutomation` |

Do **not** set `pyLoadActivity` manually for these source types; the server
derives it. `pyConnectorList` is irrelevant for them. The server may auto-fill
`"Rule-Connect-REST"`, but that value has no runtime effect and should not be
set explicitly.

### GenAI

Minimum key field:

- `pyConnectorName` — a `Rule-Connect-GenerativeAI` connector rule name.

No request/response data transforms are needed; the connector handles mapping.

### KnowledgeBuddy

Minimum key field:

- `pyKBName` — Knowledge Buddy rule name.

Common optional fields:

- `pyKBQuery` — often wired from a Data Page parameter, e.g. `"Param.Query"`.
- `pyKBQueryJSON` — structured query JSON.
- `pyKBResponse` — dot-prefixed response property, e.g. `".pyResponseData"`.
- `pyConnectorName` — associated Generative AI connector when needed.

### RoboticAutomation and RoboticDesktopAutomation

Robotic Automation key fields:

- `pyRACaseType`
- optional `pyRAReqDTName`, `pyRARespDTName`, `pyRATimeout`

Robotic Desktop Automation key fields:

- `pyRDAAutomationId`, often wired from a Data Page parameter such as
  `"Param.AutomationName"`
- `pyRARespDTName` — required
- optional `pyRAReqDTName`, `pyRATimeout`

RA/RDA request/response transform fields are RA-specific:
`pyRAReqDTName`, `pyRARespDTName`, `pyRAReqDTParams`, `pyRARespDTParams`.
Use `pyPassCurrentParamPageForRAReqDT: "true"` and
`pyPassCurrentParamPageForRARespDT: "true"` to pass the Data Page parameter page.

For both RA and RDA sources, set `pyClassName` on the source entry to match the
Data Page target class.
