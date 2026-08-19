---
name: declare-pages-source-resolution-and-multisource
description: Load when choosing a Data Page's scope, wiring multiple conditional sources, or diagnosing a source-resolution save error. Covers scope selection, When-routed multi-source order, and class-hierarchy requirements between a Data Page and its source rules.
---

## Scope selection

| Scope | `pyScope` | Lifetime | Shared? | Use case | Required fields |
|-------|-----------|----------|---------|----------|-----------------|
| Thread | `"thread"` | Current flow execution | No | Case-specific data, one-time lookups | — |
| Requestor | `"requestor"` | User session | Per user | User-specific lookups, dropdown data | — |
| Node | `"node"` | Server node | All users | Reference data, code tables, system config | `pyAccessGroup` |

Server-side effects: node scope clears `pyWhen`; thread scope clears
`pyAccessGroup`. Node-scoped Data Pages cannot be savable.

Conditional loading with `pyUseWhen: "true"` and `pyWhen` is applicable only for
thread and requestor scopes.

## Multi-source routing

A Data Page can have multiple entries in `pyDataSourceList` with conditional
source selection via `pySourceWhen`:

1. Each source specifies a When rule name in `pySourceWhen`.
2. Pega evaluates sources in array order; the first true match is used.
3. Use `pySourceWhen: "Always"` as the final fallback.
4. All other When rules in `pySourceWhen` are app-specific; `"Always"` is the
   reserved unconditional match.

Conditional routing chooses exactly one source. AggregateSources execute nested
sub-sources in sequence within one source entry. A Data Page can combine these
patterns by having conditional top-level entries where one is AggregateSources.

When a When rule requires parameters, map them through `pyWhenParamList` on the
source entry. Set `pyPassCurrentParamPageForWhen: "true"` to pass the Data Page
parameter page to the When rule.

## Source rules must exist first

Pega validates referenced source rules at save time. Data Transforms, Report
Definitions, Activities, and Connectors must exist and be resolvable before the
Data Page that references them is created or updated.

Typical failure:

```text
.pyDataSourceList(1).pyDTName: LoadMyEntity does not exist or is not a valid entry
for this ruleset and its prerequisites
```

Create source rules first, then create/update the Data Page source entries.

## Class hierarchy matters for resolution

Class hierarchy matters for rule resolution.

The Data Page `pyClassName` must be equal to or inherit from the source entry's
`pyClassName`. Pega resolves referenced rules by walking up the class hierarchy
from the source class.

Example Data Transform `LoadMyEntity` defined on
`MyOrg-MyApp-Data-MyEntity`:

- Works: DP `pyClassName: "MyOrg-MyApp-Data-MyEntity"` and source
  `pyClassName: "MyOrg-MyApp-Data-MyEntity"`.
- Works: DP `pyClassName: "MyOrg-MyApp-Data-MyEntity"` and source
  `pyClassName: "MyOrg-MyApp-Data"` if the class hierarchy supports it.
- Fails: DP `pyClassName: "Code-Pega-List"` and source
  `pyClassName: "MyOrg-MyApp-Data-MyEntity"`; `Code-Pega-List` does not inherit
  from the data class.

For multi-rule changes in a ChangeRequest branch, create or copy source rules
first, then create Data Pages that reference them.
