---
name: model-json-data-transforms
description: Full authoring and troubleshooting reference for JSON-format Data Transforms (Rule-Obj-Model with pyDataModelFormat "JSON") — mapping actions, top-level element structure, the Clipboard bridge pattern, common patterns, and known gotchas. Load when building or debugging any JSON DT.
---

A JSON Data Transform is a `Rule-Obj-Model` with `pyDataModelFormat: "JSON"` — not a
separate rule type. It provides bidirectional mapping between JSON payloads and the
Pega clipboard, and is the core mechanism for integrating with REST APIs.

For the end-to-end integration workflow these DTs are typically wired into (connector
response/request pairing, the clipboard bridge, Data Page sourcing), see
`methodology-integration`.

## Conceptual model

### Two directions, one rule

A single JSON DT handles both:
- **DESERIALIZE** — JSON input → clipboard properties (response mapping)
- **SERIALIZE** — clipboard properties → JSON output (request payload construction)

The direction is controlled by the `executionMode` parameter at call time.

### Parameters (always required)

Every JSON DT declares exactly two parameters:

| Parameter | Type | Direction | Purpose |
|-----------|------|-----------|---------|
| `jsonData` | STRING | IN | Raw JSON string. Populated with incoming data for DESERIALIZE; left empty for SERIALIZE (populated as output at runtime) |
| `executionMode` | STRING | IN | `DESERIALIZE` or `SERIALIZE`. Set the default to match the DT's primary use: `DESERIALIZE` for response DTs, `SERIALIZE` for request DTs |

## The bridge pattern (why JSON DTs need a wrapper)

The data page framework does NOT populate `jsonData` or `executionMode` directly. You
must create a **clipboard-format wrapper DT** (the "bridge") that:
1. Receives the connector's step page as a `DataSource` PAGE parameter
2. Calls the JSON DT via `APPLY_MODEL`, passing `DataSource.pyResponseData` as
   `jsonData` and `"DESERIALIZE"` as `executionMode`

On the bridge's `APPLY_MODEL` step, set `pyPassCurrentParameterPage: "false"` so the
JSON DT receives only the explicitly-declared `jsonData`/`executionMode` parameters
rather than the bridge's own current parameter page.

Wire the **clipboard DT** (not the JSON DT) as `pyResDataTransform` on the data page
source. The connector must use `pyMapToKey: ".pyResponseData"` with
`pyMapTo: "Clipboard"` — see `rules-rule-connect-rest` → "Response landing page".

Add a `WHEN pxDataPageHasErrors` step (disabled by default, containing a disabled
`APPLY_MODEL pxErrorHandlingTemplate` step) as a scaffold for error handling — enable
and configure it when error mapping is needed for that specific bridge DT.

See `JSON Response Bridge DT (Clipboard Wrapper)` for the full proven shape of the
Clipboard half.

> **Wrapper DTs must not parse JSON manually.** No regex, no `@replaceAll`, no
> string-based path expressions in the bridge. Fix the JSON DT's mapping model
> instead. The only exception is the primitive-array workaround below, which belongs
> in a standalone Clipboard DT, not the bridge wrapper.

> **Omit `pyArrayElements` and `pyListProperty` entirely when `pyTopLevelElement:
> "Object"`.** They must be absent, not empty string. This cannot be fixed later —
> `update-rule` can never unset a populated scalar, so a rule saved with these fields
> present fails every future update (see `json-dt-array-elements-schema-error`). Don't
> start from an Array-format example and edit `pyTopLevelElement` afterward; start
> from an Object-format example instead.

## Top-level element structure

The `pyMappingModel.pyTopLevelElement` field declares the root JSON shape.

### Object (`pyTopLevelElement: "Object"`)

For JSON like `{"firstName": "John", "age": 34}`. Mapping steps operate directly on
the root object's keys. Set both `pyMappingModel.pyClassName` and
`pyMappingModel.pyPageClass` to the entity/business class (matching the outer rule's
own `pyClassName`) — this is the normal case, unlike Array top-level's special
handling below.

> **Array top-level cannot represent a single-object response.** DESERIALIZE and
> SERIALIZE share one mapping — there is no action that wraps a single JSON object as
> one array element, because there is no way to choose a single element back out of
> the array on SERIALIZE. If an endpoint always returns one object, its response DT
> must be `pyTopLevelElement: "Object"` — never use Array top-level to force a list
> result out of a single-object endpoint. This comes up when a CRUD URL spec reuses
> one endpoint for both `LIST` and `LOOKUP` (see `data-object-generator-oas-construction`).
> See `data-type-missing-endpoint-patterns` for producing a required list Data Page
> result from a single-object endpoint without an Array-format DT.

### Array (`pyTopLevelElement: "Array"`) — standard automap pattern

For JSON like `[{...}, {...}, {...}]`. Requires additional configuration:

| Field | Value | Purpose |
|-------|-------|---------|
| `pyArrayElements` | `"Objects"` / `"Scalars"` / `"Arrays"` | Element type in the root array |
| `pyListProperty` | e.g. `".pxResults"` | Page List property that receives the array elements |
| `pyPagesAndClasses` (on rule) | page name + class | Declares the results page list and its class |

Most list data page responses use: `pyTopLevelElement: "Array"`,
`pyArrayElements: "Objects"`, `pyListProperty: ".pxResults"`, `pyAutomapAll: "true"`.
Rule-level `pyPagesAndClasses` is still required even when every field is
automapped — it tells the automap engine which class to scan for property matches.

> **Automap does not support heterogeneous arrays.** Only works when JSON key names
> exactly match clipboard property names (case-sensitive). Use explicit mapping
> (below) for mixed-type arrays or once any field needs selective/renamed mapping.

See `json-dt-automap-array` for the full worked example.

### Array top-level with explicit (non-automap) property mappings

If an Array-format DT needs any explicit `pyProperties` entries — for example a JSON
key maps to a differently named clipboard property — use the confirmed
explicit-mapping pattern. Do **not** mix automap with one-off explicit overrides: if
even one property needs an explicit override, set `pyAutomapAll: "false"` and
explicitly map **every** property the row needs, not just the mismatched one.
`pyAutomapAll: "true"` plus a single explicit override entry saves without error via
`update-rule`, but **silently never populates the overridden property at runtime**.

Required rules:

1. Set `pyAutomapAll: "false"` and explicitly map every property the row needs.
2. Set outer rule `pyClassName` and `pyMappingModel.pyClassName` to
   `"Code-Pega-List"` for list response DTs — **not** the entity/business class.
3. Omit top-level `pyMappingModel.pyPageClass` entirely.
4. Add rule-level `pyPagesAndClasses` binding the list property (e.g. `.pxResults`)
   to the real entity/data class.
5. Keep each individual `pyMappingModel.pyProperties[].pyPageClass` set to the real
   entity class — this part does not change.

Getting (2)/(3) backwards — setting `pyMappingModel.pyClassName`/`pyPageClass` to the
entity class instead of `Code-Pega-List`, or omitting the entity class from
`pyPagesAndClasses` — causes the platform to store a literal, unresolved
`pyPageClass: "$CLASS"` inside `pyMappingModel`. This either fails `create-rule`
outright with `Save failed - Attempting to access a rule with a bad defined-on
class: $CLASS.`, or saves successfully while the mapping silently no-ops at runtime.

Pure automap-only Array DTs are more tolerant — `pyMappingModel.pyClassName` has been
observed to work set to either the entity class or `"Code-Pega-List"` — but that
tolerance does **not** extend to explicit mappings. `"Code-Pega-List"` is the
confirmed-safe choice for both cases, so use it even for automap-only DTs.

> **Two `pyPagesAndClasses` locations exist — use the rule-level one.** The
> `pyMappingModel` object has its own `pyPagesAndClasses` (inside the mapping model)
> which Pega largely ignores at runtime. The **rule-level** `pyPagesAndClasses`
> (sibling of `pyMappingModel`) is what actually declares page names and classes for
> property resolution. Always populate the rule-level one.

See `json-dt-array-nested-objects` for the full worked example (SET, UPDATE_PAGE "For
JSON only", and APPEND_AND_MAP_TO combined with explicit mapping).

### Array top-level — PAGEGROUPS (legacy edge case)

`APPEND_AND_MAP_TO` with `pyAppendAndMapToOptions: "PAGEGROUPS"` and a `PageGroup`
target property is an older pattern that predates the standard Array top-level
approach. It works for flat array elements but is fragile against **nested arrays or
objects within array elements** — public APIs often include nested structures that
cause `WrongModeException`.

Prefer `pyTopLevelElement: "Array"` with `pyArrayElements: "Objects"` for all list
responses. Only use PAGEGROUPS when a PageGroup target is specifically required
(rare). When it is required and the response contains complex nested elements:
validate the mapping against the actual API response (not just docs), consider a
Clipboard-format DT with explicit field extraction instead, or prefer `limit=1` +
single-result `UPDATE_PAGE` when only one result is needed.

### PageGroup → PageList conversion (if already using PAGEGROUPS)

Constellation embedded tables require PageList properties — PageGroups are not
renderable. If you used PAGEGROUPS and now need a PageList:
- **Best fix:** restructure the mapping to use `pyTopLevelElement: "Array"` with
  `pyListProperty: ".pxResults"` instead — this produces a PageList directly.
- **Fallback:** Clipboard-format DT with `FOR_EACH_PAGE_IN` + `APPEND_TO`.

## Mapping rules

`pyPropertiesValue` is a **single JSON key**, not a path expression. Dotted or
bracketed paths (`"result.addressMatches[0].x"`) are searched as a single literal
property name on the current JSON node, found missing, and **silently skipped at
runtime** — no exception, no log entry, just empty target properties. To reach
nested values, chain `UPDATE_PAGE` steps one level per step (see below) instead.

## Mapping actions reference

JSON DT steps live inside `pyMappingModel.pyProperties` (type: `Embed-MappingParams`).
Each step has a `pyActionName` that determines its behavior.

### UI-to-API field mapping

Dev Studio's JSON mapping editor shows each step as a row with UI columns. This table
translates each UI column to the API field an agent must set:

| UI Column | API Field | Notes |
|-----------|-----------|-------|
| Action | `pyActionName` | SET, UPDATE_PAGE, APPEND_AND_MAP_TO, AUTO_MAP, APPLY_DATA_TRANSFORM, COMMENT |
| Clipboard | `pyPropertiesName` | Target property (dot-prefixed, e.g. `.Email`). Empty for UPDATE_PAGE with "No context change" |
| Relation | Varies by action | See table below |
| JSON | `pyPropertiesValue` | Source JSON key name (single key, NOT a path) |
| Empty behavior | `pyEmptyBehavior` | `""` (Default value) / `"SKIP"` / `"SET_DEFAULT"` |

The "Relation" column's underlying API field and valid values change depending on the
selected Action:

| UI Relation value | Action | API Field | Value |
|-------------|--------|-----------|-------|
| `equal to` | SET | — | No special field |
| `For JSON only` | UPDATE_PAGE | `pyUpdateContextOptions` | `"JSON"` |
| `For clipboard only` | UPDATE_PAGE | `pyUpdateContextOptions` | `"CLIPBOARD"` |
| `For both sides` | UPDATE_PAGE | `pyUpdateContextOptions` | `""` (empty/default) |
| `An array of objects` | APPEND_AND_MAP_TO | `pyAppendAndMapToOptions` | `""` (empty = default) |
| `An array of scalars` | APPEND_AND_MAP_TO | `pyAppendAndMapToOptions` | `"SCALARS"` |
| `An array of arrays` | APPEND_AND_MAP_TO | `pyAppendAndMapToOptions` | `"ARRAYS"` |
| `A group of pages` | APPEND_AND_MAP_TO | `pyAppendAndMapToOptions` | `"PAGEGROUPS"` |

> Same JSON element mapped to multiple clipboard properties → **last property wins**
> (deserialization). Same clipboard property mapped to multiple JSON elements →
> **last JSON element wins** (serialization). These collision rules apply within the
> same hierarchy level (sibling steps).

### SET — Map one property to one JSON key

Maps a single clipboard property to a single JSON key. Names need not match — this
is the core action for name-mismatch scenarios.

**Fields:**
- `pyPropertiesName`: clipboard property (e.g. `.BasePay`)
- `pyPropertiesValue`: JSON key (e.g. `salary`)
- `pyPageClass`: class context for property resolution
- `pyPageRef`: page reference context (empty at top level; set to parent page list
  inside APPEND_AND_MAP_TO children)

### AUTO_MAP — Bulk-map matching names

Automatically maps a clipboard property (typically a page) to all JSON keys whose
names exactly match sub-properties.

**Fields:**
- `pyPropertiesName`: clipboard page property (e.g. `.Address`)
- `pyPropertiesValue`: JSON key containing the matching object (e.g. `address`)

**Limitations:** only works when names match exactly (case-sensitive); does not
support heterogeneous arrays; for large/complex JSON, prefer explicit SET for
predictability.

### UPDATE_PAGE — Navigate into nested JSON objects

Descends into a nested JSON object to map its children. The most common pattern for
real APIs is **"For JSON only"** — the JSON context descends into a nested object but
the clipboard stays flat.

**Fields:**
- `pyPropertiesName`: clipboard page to descend into, OR empty string `""` for "No
  context change" (clipboard stays put)
- `pyPropertiesValue`: JSON key to descend into (e.g. `contactInfo`)
- `pyUpdateContextOptions`: controls which side descends

**Context options (`pyUpdateContextOptions`):**

| Value | UI label | Effect | Use when |
|-------|----------|--------|----------|
| `"JSON"` | For JSON only | JSON descends; clipboard stays flat | **Most common.** API nests things (`contactInfo`, `employment`) that are flat properties on your clipboard |
| `"CLIPBOARD"` | For clipboard only | Clipboard descends; JSON stays | Rare — flat JSON maps to nested clipboard model |
| `""` (empty) | For both sides | Both descend together | JSON object maps onto an embedded clipboard page of the same shape |

> **`UPDATE_PAGE` does NOT iterate JSON arrays.** If the JSON key's value is an array
> rather than an object, `UPDATE_PAGE` only processes the **first element** — every
> other element is silently dropped, with no error. Use `APPEND_AND_MAP_TO` (below)
> for any JSON key whose value is an array that needs every element mapped.

> **Nested-object mapping trap:** dotted-path expressions in `pyPropertiesValue`
> (e.g. `"contactInfo.emailAddress"`) are silently skipped at runtime — no error, the
> mapping just doesn't happen. Descend one level per `UPDATE_PAGE` step using
> `pyUpdateContextOptions` instead of trying to reach a nested field in one step.

**Child step `pyPageClass`/`pyPageRef` (For JSON only):** with
`pyUpdateContextOptions: "JSON"`, the clipboard context stays flat — child SET steps
keep `pyPageClass` set to the **parent** entity class and `pyPageRef: ""`, same as
top-level steps. Only `APPEND_AND_MAP_TO` children switch to the child page class and
a non-empty `pyPageRef` (see below).

**"No context change" pattern** (the most common real-world usage):
```
UPDATE_PAGE:
  pyPropertiesName: ""              ← clipboard stays where it is
  pyPropertiesValue: "contactInfo"  ← JSON descends into the contactInfo object
  pyUpdateContextOptions: "JSON"
  children:
    SET .Email ↔ emailAddress
    SET .Phone ↔ phoneNumber
```

### APPEND_AND_MAP_TO — Map JSON arrays to Page Lists

Maps a JSON array to a clipboard Page List property. Each array element becomes a
page in the list — the action that actually iterates every element (unlike
`UPDATE_PAGE`, above).

**Fields:**
- `pyPropertiesName`: clipboard Page List property (e.g. `.Certifications`)
- `pyPropertiesValue`: JSON array key (e.g. `certifications`)
- `pyAppendAndMapToOptions`: element type in the source JSON array — `""`
  (empty/default) = an array of objects, iterates all elements and creates one
  clipboard page per element (the standard pattern for API responses); `"SCALARS"` =
  an array of scalar values; `"ARRAYS"` = an array of arrays; `"PAGEGROUPS"` = a group
  of pages (edge case — see above)
- `pyPageClass`: the **parent** class (not the child page class)
- Child steps: SET steps that map each element's fields, with `pyPageClass` set to
  the **child** class and `pyPageRef` set to the Page List property name (e.g.
  `.Certifications`) — this tells Pega the SET operates within the context of each
  appended page

**Note:** `pyAppendAndMapToOptions` applies to JSON-format DT mapping steps
(`MappingStep.pyAppendAndMapToOptions`). Clipboard-format DT `APPEND_AND_MAP_TO`
steps (`rules-rule-obj-model`'s `ModelStep`) have their own, separately-named field
for the same concept. Do not confuse the two.

### APPLY_DATA_TRANSFORM — Reuse/compose JSON DTs

Calls another JSON DT from within a JSON mapping. Useful for breaking complex
mappings into reusable pieces (e.g., a shared address mapping DT called from
multiple response DTs).

**Fields:**
- `pyPropertiesName`: name of the JSON DT to call

The more common composition pattern is the **Clipboard bridge DT** calling a JSON DT
via `APPLY_MODEL` (see "The bridge pattern" above). `APPLY_DATA_TRANSFORM` is for
JSON-to-JSON composition within a single mapping model.

### COMMENT — Documentation

No-op step for developer documentation. Can be placed anywhere in the mapping — no
runtime effect.

## Settings (pyMappingModel fields)

| Field | Values | Purpose |
|-------|--------|---------|
| `pyDateFormat` | `"Default"`, `"Pega"` | Date serialization format. **Required** — omitting causes `IllegalArgumentException` at runtime. `"Default"` = ISO 8601 (`1996-07-26T09:30:00.000Z`). `"Pega"` = Pega internal format (`19960726T093000.000 GMT`). Use `"Default"` for standard REST APIs. |
| `pyCreateMultiDimArrays` | `"true"` / `"false"` | Enable multidimensional array output (rare — only for PageList with one non-skipped property same-named as parent) |
| `pyAutomapAll` | `"true"` / `"false"` | Auto-map all fields by name match |
| `pySkippedProperties` | Comma-separated string | Fields to skip during automap (e.g. `"pyObjClass,pxObjClass"`) — NOT a JSON array |
| `pyAutomapEmptyBehavior` | | Default empty behavior for automap |

### Step IDs (`pyPropertyStepId`)

Each mapping step has a `pyPropertyStepId` that represents its position: `"1"`,
`"2"`, ..., `"7"`. Child steps use dot notation: `"7.1"`, `"7.2"`, `"7.3"`. These are
assigned automatically by the UI. When creating via API, include them for consistent
ordering — omitting them may result in non-deterministic step order.

## Common patterns

### Pattern 1: Flat list with automap (simplest)

API returns `[{"Id": 1, "Name": "Alice"}, ...]` where JSON keys match clipboard
property names exactly.

- `pyTopLevelElement: "Array"`, `pyArrayElements: "Objects"`, `pyListProperty: ".pxResults"`
- `pyAutomapAll: "true"`
- `pyMappingModel.pyProperties`: can be just a stub `COMMENT` step, or even empty —
  the automap engine resolves all field matches by scanning the applies-to class, it
  does not read this array when automap is on
- Rule-level `pyPagesAndClasses` is still required, even though every field is
  automapped

### Pattern 2: Flat list with manual SET (name mismatches)

API returns `[{"id": 1, "firstName": "Alice", "salary": 50000}, ...]` where some keys
don't match clipboard property names.

- `pyAutomapAll: "false"`
- Explicit SET steps for each field: `.Id` ↔ `id`, `.FirstName` ↔ `firstName`,
  `.BasePay` ↔ `salary`

### Pattern 3: Nested objects → flat clipboard (UPDATE_PAGE "For JSON only")

API nests data: `{"contactInfo": {"emailAddress": "...", "phoneNumber": "..."}}` but
clipboard has `.Email` and `.Phone` at the top level.

- UPDATE_PAGE with `pyPropertiesName: ""`, `pyPropertiesValue: "contactInfo"`,
  `pyUpdateContextOptions: "JSON"`
- Child SETs map: `.Email` ↔ `emailAddress`, `.Phone` ↔ `phoneNumber`

### Pattern 4: JSON array → Page List (APPEND_AND_MAP_TO)

API includes an array: `{"certifications": [{"name": "CSA", "issuedDate": "2022-11-10"}]}`
that maps to a Page List property.

- APPEND_AND_MAP_TO: `.Certifications` ↔ `certifications`
- Child SETs with `pyPageClass` = the page list entry class, `pyPageRef` = `.Certifications`

### Pattern 5: Request body construction (SERIALIZE)

Building a JSON payload from clipboard properties to send as a POST/PUT body.

- Same DT used in DESERIALIZE can also SERIALIZE (mapping is bidirectional)
- SET steps: clipboard property → JSON key (direction reverses automatically)
- Called with `executionMode: "SERIALIZE"`, `jsonData` left empty — output populates
  `jsonData`
- Wire as `pyReqDataTransform` on the data page save option or connector request

## Primitive JSON arrays (arrays of scalars) — workaround

Some APIs return arrays of primitives where you expect scalars:

```json
{ "daily": { "time": ["2026-05-20"], "temperature_2m_max": [22.1] } }
```

**You cannot map a primitive JSON array to a scalar property with SET.** The JSON
parser sees an array → `WrongModeException` (`"The property D_X.Field was of mode
String while ... getPageValue(int) was expecting Page List mode."`). Index notation
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

**Critical:** always guard with `contains()`. On non-match, `pxReplaceAllViaRegex()`
returns the full JSON body — overflows fields or fails type conversion. Target
properties must be `String`/`Text`.

Use `@(Pega-RulesEngine:String).pxReplaceAllViaRegex(source, regex, replacement)` for
this — **not** `@replaceAll(source, find, replace)`, which does plain-text matching
and almost never matches JSON, silently returning the input unchanged.

Additional regex-extraction safety rules:
- Never assign regex output to Date/Integer/Decimal — non-match returns the full
  response body, causing a type conversion failure.
- Check payload identity if the DT may receive different response shapes.

If a value is already known from the request or case context, set it from that
source — not from the response. Use response mapping only for values produced by
the external system; this avoids fragile regex extraction entirely.

If the API supports a scalar response format, use that instead — check API docs for
single-value options.

Identify primitive arrays during integration discovery (they look like scalars in
the brief but are arrays in the actual response).

See `Primitive Array Extraction — Single Field` and `Primitive Array Extraction —
Multiple Fields` for the full worked examples.
