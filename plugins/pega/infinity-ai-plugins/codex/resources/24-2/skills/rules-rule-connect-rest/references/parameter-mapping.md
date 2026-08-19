---
name: rest-parameter-mapping
description: REST Connector parameter naming and mapping -- dynamic path segments, resource path substitution (pyResourceParameters), connector parameter naming, query string parameters.
---

# Parameter Naming and Mapping

## Pass a runtime value into the URL path

For dynamic URL path segments, use `pyMapFrom: "CONSTANT"` with
`pyMapFromKey: "{paramName}"`. Pega substitutes the value from the matching
`pyParameters` entry at runtime. Do NOT use `pyMapFrom: "Clipboard"` with a
property reference.

For clipboard-based path segments (e.g., mapping from a property), use
`pyMapFrom: "CLIPBOARD"` (all caps) with `pyMapFromKey` set to the property
reference. Set `pyEncoding: "NONE"` when the value should not be URL-encoded.

## Substitute clipboard or constant values into URL placeholders

URL resource path substitution parameters (e.g., mapping `{ID}` to a clipboard
property at runtime) go in the **top-level `pyResourceParameters` array**, NOT
in `pyParameters`. Each entry uses `Embed-InterfaceParameter` with:

- `pyParameterName`: the placeholder name (e.g., `"ID"`)
- `pyDesc`: description (e.g., `"Feature ID"`)
- `pyMapFrom`: `"Clipboard"` or `"Constant"`
- `pyMapFromKey`: the source property (e.g., `.pyRequest.pyFeatureID`)

This is distinct from:

- **`pyParameters`** (`Embed-MethodParams`) -- connector-level input/output
  parameters declared for the data page interface
- **`pyEmbeddedURL.pyResourcePathParameters`** (`Embed-URL-Parameter-ResourcePath`)
  -- defines the URL path segments themselves (static literal segments and
  `{param}` placeholders)

When no resource substitution parameters are needed, keep `pyResourceParameters`
as a stub: `[{"pxObjClass": "Embed-InterfaceParameter"}]`.

## Define connector parameters (`pyParameters`)

The `pyParameters` array uses `Embed-MethodParams`, whose fields have a
**different naming convention** from `Embed-InterfaceParameter`. Do NOT confuse
them:

| Embed-MethodParams field | NOT this | Purpose |
|--------------------------|----------|---------|
| `pyParametersParamName` | ~~pyParameterName~~ | Parameter name |
| `pyParametersParamType` | ~~pyDataType~~ | Data type — **only `STRING`, `INTEGER`, `BOOLEAN`** |
| `pyParametersParamInOut` | ~~pyInOut~~ | Direction (`IN`, `OUT`, `INOUT`) |
| `pyParametersParamReq` | ~~pyRequired~~ | Required flag (`"-1"` = required, `"0"` = optional) |
| `pyParametersParamDesc` | ~~pyDesc~~ | Description |

The `pyParameterName` field belongs to `Embed-InterfaceParameter` (headers,
data lists, resource parameters). Using it on `Embed-MethodParams` will cause
the builder to store a duplicate field alongside the correct
`pyParametersParamName`.

## Add a query string parameter

Query string parameters use `Embed-URL-Parameter-QueryString` (not
`Embed-URL-Parameter-ResourcePath`). When a query parameter's value comes from a
connector parameter, use `pyMapFrom: "PARAM"`. When it comes from a clipboard
property, use `pyMapFrom: "CLIPBOARD"`. Set `pyFirstItem: "true"` on the first
query string entry only. `pyDefaultValue` provides a fallback when no value is
supplied. `pyEmptyBehavior: "SKIP"` omits the parameter entirely when empty.
Do NOT embed query parameters into the base URL.

### PARAM vs CONSTANT decision rule

Use `pyMapFrom: "PARAM"` **only** for values supplied by the caller at
runtime (business inputs that vary per invocation). For fixed API protocol
options that never change (response format, result limit, feature flags),
use `pyMapFrom: "CONSTANT"` with the literal value in `pyMapFromKey`.

| Parameter nature | `pyMapFrom` | Example |
|---|---|---|
| Business input (varies per call) | `PARAM` | `q` = user search text |
| Fixed protocol option | `CONSTANT` | `format` = `jsonv2`, `limit` = `1` |
| Clipboard property | `CLIPBOARD` | `.pyResultLimit` from calling page |

Endpoint options that control response shape, format, units, timezone,
include-fields, API version, or fixed limits should be CONSTANT unless the
business user explicitly needs to vary them at runtime.

**Do not over-parameterize.** Making fixed values into PARAM connector
parameters creates a fragile contract — every caller (data page, activity)
must supply values that are actually constants. If a required PARAM has no
value at runtime, the connector fails:
```
ConnectorException: The required parameter <name> is empty.
```

**Do not rely on `pyDefaultValue` for required PARAM-mapped query
parameters** during data-page-sourced connector execution. If the value must
always be sent and does not vary by caller, model it as CONSTANT.

## Connector parameter types

REST connector parameters only accept three `pyParametersParamType` values:

| Value | Use for |
|-------|---------|
| `STRING` | Text, dates, decimal numbers, any value passed as a URL query/path segment |
| `INTEGER` | Whole numbers |
| `BOOLEAN` | True/false flags |

`DECIMAL`, `DATE`, `DATETIME`, and other types accepted by data page
parameters are **not valid** for connector parameters. Pass coordinates,
dates, and decimal values as `STRING` — the URL serialization is the same.
