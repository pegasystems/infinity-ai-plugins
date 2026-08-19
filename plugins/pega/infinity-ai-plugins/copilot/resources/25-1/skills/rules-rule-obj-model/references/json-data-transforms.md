---
name: model-json-data-transforms
description: JSON-format Data Transform behavior — mapping rules, context descent, arrays, primitive array workaround, regex safety, and troubleshooting
---

# JSON Data Transforms

## Mapping rules

`pyPropertiesValue` is a **single JSON key**, not a path expression. Dotted
or bracketed paths (`"result.addressMatches[0].x"`) are searched as a single
literal property name on the current JSON node, found missing, and **silently
skipped at runtime** — no exception, no log entry, just empty target
properties. To reach nested values, chain `UPDATE_PAGE` steps one level per
step.

## Context descent (`pyUpdateContextOptions`)

| Value | Effect | Use when |
|-------|--------|----------|
| `"JSON"` | JSON context descends; clipboard stays | Traversing nested response objects to reach scalar leaves |
| `"CLIPBOARD"` | Clipboard descends; JSON stays | Rare — mapping flat JSON to nested clipboard |
| `""` (default) | Both move together | Mapping nested JSON object onto embedded clipboard page |

`UPDATE_PAGE` over a JSON array does **not** iterate. It descends into the
first element only — other elements are silently dropped. Use
`APPEND_AND_MAP_TO` with `pyAppendAndMapToOptions: "PAGEGROUPS"` and a
`PageGroup` target to capture every element.

## Top-level JSON arrays

Some APIs return `[{...}, {...}]` at the root. JSON DTs cannot map a
top-level array to a named wrapper property — `pyPropertiesName: "Results"`
fails with `Properties Name not found`.

- **Single-result:** `UPDATE_PAGE` at root — implicitly descends into first
  element. Add `limit=1` to the API when supported.
- **Multi-result:** `APPEND_AND_MAP_TO` at root with `"PAGEGROUPS"` and a
  `PageGroup` target property (`PageList` fails validation).

Document the single-element assumption in `pyDescription` when relying on
implicit truncation.

## PageGroup mapping — nested array/object risks

`APPEND_AND_MAP_TO` with `PAGEGROUPS` works for flat array elements but is
fragile against **nested arrays or objects within array elements**. Public
APIs often include nested structures (e.g., arrays of aliases, nested
metadata objects) that cause `WrongModeException` when the mapper tries to
assign a nested array to a scalar property on the PageGroup page.

**Recommendation:** When the response contains complex nested elements:

- Prefer `limit=1` + single-result `UPDATE_PAGE` when only one result is
  needed. This avoids PageGroup entirely.
- If multiple results are required, validate the mapping against the
  **actual API response** (not just the documentation) before committing.
- Consider a clipboard-format DT with explicit field extraction instead of
  relying on JSON DT auto-mapping for complex structures.

## PageGroup-to-PageList conversion

There is **no supported declarative pattern** to convert a PageGroup into a
PageList for Constellation display. Constellation embedded tables require
PageList properties — PageGroups are not renderable.

If your mapping produces a PageGroup but the view needs a PageList:
- Restructure the mapping to target a PageList directly (using a
  clipboard-format DT with `FOR_EACH_PAGE_IN` + `APPEND_TO`).
- Or escalate for a validated Java activity implementation.

Do not attempt ad-hoc Java clipboard conversion without validation —
`ClipboardPage` type mismatches cause compilation failures that are hard to
diagnose at authoring time.

## Primitive JSON arrays (arrays of scalars)

Some APIs return arrays of primitives where you expect scalars:

```json
{ "daily": { "time": ["2026-05-20"], "temperature_2m_max": [22.1] } }
```

**You cannot map a primitive JSON array to a scalar property with SET.**
The JSON parser sees an array → `WrongModeException`. Index notation
(`time[0]`) is not supported in `pyPropertiesValue`.

**Workaround:** Clipboard-format DT with guarded regex extraction from
`DataSource.pyResponseData`:

```
SET .TemperatureMaxText to
  @if(
    @(Pega-RULES:String).contains(DataSource.pyResponseData, "\"temperature_2m_max\""),
    @(Pega-RulesEngine:String).pxReplaceAllViaRegex(
      DataSource.pyResponseData,
      ".*\"temperature_2m_max\":\\[([^\\]]*)\\].*",
      "$1"
    ),
    ""
  )
```

**Critical:** Always guard with `contains()`. On non-match,
`pxReplaceAllViaRegex()` returns the full JSON body — overflows fields or
fails type conversion.

Target properties must be `String/Text`. See
`examples/json-primitive-array-single-field.md` and
`examples/json-primitive-array-multi-field.md`.

**Alternative:** If the API supports a scalar response format, use that
instead. Check API docs for single-value options.

**Discovery rule:** Identify primitive arrays during integration discovery
(step 5 in `integrate-read-external-data`). They look like scalars in the
brief but are arrays in the actual response.

## Request-vs-response ownership

If a value is already known from the request or case context, set it from
that source — not from the response. Use response mapping only for values
produced by the external system. Avoids fragile regex extraction and
type-conversion failures.

## `@replaceAll` vs `pxReplaceAllViaRegex`

| Function | Behavior | Use for |
|----------|----------|---------|
| `@replaceAll(source, find, replace)` | **Plain-text** find-and-replace | Literal string substitution |
| `@(Pega-RulesEngine:String).pxReplaceAllViaRegex(source, regex, replacement)` | **Regex** with capture groups (`$1`) | Pattern extraction from JSON |

Using `@replaceAll` with regex metacharacters does plain-text matching —
almost never matches JSON. Returns input unchanged, causing silent overflow.

## Regex extraction safety

- **Never assign regex output to Date/Integer/Decimal** — non-match returns
  full response body → type conversion failure.
- **Prefer String/Text targets** — convert to typed fields in a separate
  step with validation.
- **Check payload identity** if the DT may receive different response shapes.

## Troubleshooting: WrongModeException

```
WrongModeException: The property D_X.Field was of mode String
while ... getPageValue(int) was expecting Page List mode.
```

**Cause:** JSON DT SET maps a JSON array to a scalar property.
**Fix:** Use clipboard DT with regex extraction, or target a page list
property and read the first element separately.

## `pyDateFormat` requirement

`pyDateFormat` is required on `pyMappingModel` for all JSON DTs. Valid
values: `"Pega"` (default, autofilled), `"Default"`. Omitting causes
`IllegalArgumentException` at runtime.

## Wrapper DT pattern (bridge to JSON DT)

JSON DTs declare `jsonData` and `executionMode` parameters. The data page
framework does NOT populate these. Create a **clipboard-format wrapper DT**
that calls the JSON DT via `APPLY_MODEL` (passing
`DataSource.pyResponseData` as `jsonData` and `"DESERIALIZE"` as
`executionMode`). Wire the wrapper as `pyResDataTransform` on the data page.
See `examples/json-response-bridge-dt.md`.

**Anti-pattern:** Wrapper DTs must not parse JSON manually — no regex, no
`@replaceAll`, no string-based path expressions. Fix the JSON DT's mapping
model instead. The only exception is the primitive-array workaround (which
belongs in a standalone clipboard DT, not the bridge wrapper).
