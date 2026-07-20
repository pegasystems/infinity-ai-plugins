---
name: rules-rule-obj-model
description: Schema and authoring guide for Pega Data Transform rules (Rule-Obj-Model), including action types, expression patterns, and examples
---

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Data Transform` | Absolute minimum Clipboard create payload — only pyModelName, pyLabel, pyClassName |
| `APPEND_AND_MAP_TO` | APPEND_AND_MAP_TO with EXISTING_PAGE_LIST, DataSource parameter, and pyPagesAndClasses |
| `WHEN / OTHERWISE_WHEN / OTHERWISE` | WHEN/OTHERWISE_WHEN/OTHERWISE multi-branch conditional logic (if/else-if/else pattern) |
| `APPLY_MODEL with Parameters` | APPLY_MODEL step calling another Data Transform with explicit parameter passing |
| `JSON Format Data Transform — Manual Mapping` | JSON format Data Transform with manual UPDATE_PAGE + SET field mappings |
| `JSON Format Data Transform — Automap` | JSON format Data Transform with automap enabled — all fields mapped automatically |
| `JSON Format Data Transform — Nested-Object Descent` | JSON format Data Transform descending multiple levels via chained UPDATE_PAGE with `pyUpdateContextOptions: "JSON"` (use instead of dotted paths) |
| `JSON Response Bridge DT (Clipboard Wrapper)` | Clipboard-format wrapper DT that bridges a data page response to a JSON DT via APPLY_MODEL — required because JSON DTs cannot be invoked directly by the data page framework |
| `Primitive Array Extraction — Single Field` | Clipboard-format DT extracting one primitive JSON array value with guarded `pxReplaceAllViaRegex` — minimal pattern |
| `Primitive Array Extraction — Multiple Fields` | Clipboard-format DT extracting multiple primitive JSON array values — repeated `contains()` + regex pattern per field |

### Step-level

| Skill | `pyActionName` | Description |
|-------|---------------|-------------|
| `Data Transform pyProperties UPDATE_PAGE with BLANK` | `UPDATE_PAGE` | Update page with BLANK initialization and SET children |
| `Data Transform pyProperties UPDATE_PAGE with WITH_VALUES_FROM` | `UPDATE_PAGE` | Copy all properties from a source page (WITH_VALUES_FROM) |
| `Data Transform pyProperties APPEND New Page` | `APPEND_AND_MAP_TO` | Append single new page with SET children |
| `Data Transform pyProperties WHEN` | `WHEN` | Conditional block; empty pyProperties tests condition without actions |
| `Data Transform pyProperties WHEN with when-rule reference` | `WHEN` | WHEN step referencing a when-rule by name instead of an inline expression |
| `Data Transform pyProperties OTHERWISE_WHEN` | `OTHERWISE_WHEN` | Else-if branch in a WHEN/OTHERWISE group |
| `Data Transform pyProperties EXIT_MODEL` | `EXIT_MODEL` | Terminate the data transform immediately |
| `Data Transform pyProperties FOR_EACH_PAGE_IN / EXIT_FOR_EACH` | `FOR_EACH_PAGE_IN` / `EXIT_FOR_EACH` | Iterate over a list; early-exit pattern |
| `Data Transform pyProperties REMOVE` | `REMOVE` | Remove a named page from the clipboard |
| `Data Transform pyProperties COMMENT` | `COMMENT` | Developer documentation step (no-op at runtime) |
| `Data Transform pyProperties SORT` | `SORT` | Sort a page list by one or more properties |
| `Data Transform pyProperties APPEND_TO — New Page` | `APPEND_TO` | Append a new empty page to a page list |
| `Data Transform pyProperties APPEND_TO — Existing Page / Page List` | `APPEND_TO` | Append a copy of an existing page or all pages from another list |
| `Data Transform pyProperties APPEND_TO — Current Source Page` | `APPEND_TO` | Append the current iteration page (inside FOR_EACH_PAGE_IN) |
| `Data Transform pyProperties JSON Mapping — UPDATE_PAGE with nested SET` | `UPDATE_PAGE` (MappingStep) | JSON mapping — UPDATE_PAGE with nested SET children for field-level control |
| `Data Transform pyProperties JSON nested-object descent — UPDATE_PAGE chain with pyUpdateContextOptions` | `UPDATE_PAGE` (MappingStep) | JSON nested-descent — chained UPDATE_PAGE with `pyUpdateContextOptions: "JSON"` for multi-level traversal |

## Notes

### Prerequisite — target properties must exist

Before creating or updating a Data Transform with SET steps that target
properties on the applies-to class, confirm each target property exists.
If creating both properties and DTs in the same session, create all
properties first.

This is mandatory for response Data Transforms in integrations, where the
DT maps external API fields to properties that may not yet exist on the
data class. Skipping this check results in "property does not exist" errors
on `create-rule` or `update-rule` and forces unnecessary retry cycles.

If unsure whether a property exists, verify with `get-rule` on the property
before proceeding with the DT.

### Conditional groups (WHEN / OTHERWISE_WHEN / OTHERWISE)

- A conditional group always starts with `WHEN` and ends with `OTHERWISE`.
- Zero or more `OTHERWISE_WHEN` steps go between them — evaluated in order, first match wins.
- The steps must be consecutive siblings at the same level.
- Each branch should set **all** output properties relevant to the group. The engine does
  not merge results across branches — only the matching branch's child steps execute, so
  any property not set in that branch retains its previous value. Missing assignments are
  a common source of stale-data bugs.

### WHEN with when-rule reference

- When `pyPropertiesName` contains a when-rule name (no dot prefix, no operators, no `@`
  function calls), the engine resolves the when-rule on the step's applies-to class.
- The when-rule name goes in `pyPropertiesName`, **not** `pyRelationNameWhen`.
- `pyRelationNameWhen` is a separate concept: a step-level condition guard that can be
  applied to **any** action type (SET, UPDATE_PAGE, etc.) to conditionally skip that step.
  A WHEN action with a when-rule reference in `pyPropertiesName` is a branch, not a guard.

### APPEND_TO — pyPropertiesValue per mode

- `NEW_PAGE`: `pyPropertiesValue` is empty. Child steps are optional — the page is
  appended empty.
- `EXISTING_PAGE`: `pyPropertiesValue` is a page reference (e.g. `.MyList(<LAST>)`,
  `.MyList(1)`). Data is copied — the source is not modified.
- `EXISTING_PAGE_LIST`: `pyPropertiesValue` is a page list reference (e.g. `.OtherList`).
  Data is copied — the source is not modified.
- `CURRENT_SOURCE_PAGE`: `pyPropertiesValue` is empty — the source is implicitly the
  current iteration page. Only meaningful inside a `FOR_EACH_PAGE_IN` step. Combine with
  a WHEN condition to selectively append pages (filter pattern).

### APPEND_TO vs APPEND_AND_MAP_TO

- Use `APPEND_AND_MAP_TO` when child SET steps are always required (mapping pattern).
- Use `APPEND_TO` when appending empty pages, copying existing pages, or appending the
  current iteration page inside a loop.

### EXIT_FOR_EACH

- `EXIT_FOR_EACH` exits only the immediately enclosing `FOR_EACH_PAGE_IN` loop. Steps
  after the loop continue to execute.
- Use `EXIT_MODEL` instead to exit the entire data transform.
- Typically combined with a `WHEN` condition to break out of the loop when a specific
  criterion is met.

### UPDATE_PAGE — WITH_VALUES_FROM

- The source page should be declared in `pyPagesAndClasses` with its class.
- **Constellation UI warning:** `WITH_VALUES_FROM` may not reliably update
  embedded display pages during assignment field-change refresh. If the view
  renders specific child fields of an embedded page (e.g., `.WeatherForecast.StatusMessage`),
  prefer explicit SET rows for each rendered field. Page-level copy can
  appear to succeed (no error) while the UI does not reflect the change.

### SORT — known warning

- Offline validation may show "Unsupported action configured - SORT" — this is a known
  warning; the rule saves and executes correctly.

### JSON Data Transforms

See `model-json-data-transforms` for full coverage of:
- Mapping rules (`pyPropertiesValue` is a single key, not a path)
- Context descent (`pyUpdateContextOptions`: JSON / CLIPBOARD / default)
- Top-level JSON arrays (single-result vs multi-result)
- Primitive JSON arrays and the guarded regex workaround
- `@replaceAll` vs `pxReplaceAllViaRegex` (plain-text vs regex)
- Request-vs-response ownership rule
- Regex extraction safety guardrails
- WrongModeException troubleshooting
- `pyDateFormat` requirement
- Wrapper DT bridge pattern and anti-pattern

### Parameterized data page references in expressions

Data Transform SET expressions can reference parameterized data pages using
bracket syntax: `D_PageName[Param: .Field].ResultProperty`. The data page
is loaded (or returned from cache) inline during expression evaluation.

```
SET .NormalizedCity to D_ValidatedAddress[PostalCode: .ShippingAddress.PostalCode].City
```

Rules:
- Parameters inside brackets use property references resolved against the
  current context page (same as any other DT expression).
- A second reference to the same data page with the same parameter values
  returns the cached result — no duplicate connector call.
- Nested chaining is valid:
  `D_ShippingRate[PostalCode: D_ValidatedAddress[Input: .PostalCode].NormalizedPostalCode].Cost`
- The referenced data page must already exist as a rule. The DT does not
  create it — it only triggers its load.

### DataSource page initialization for flow-invoked DTs

When a Data Transform is invoked from a **flow utility shape** (not from a
data page's `pyResDataTransform`), the `DataSource` named page is NOT
automatically on the clipboard. If the DT references connector-backed data
pages inline (e.g., `D_X[Param: .Field].Property`), those data pages may
internally reference `DataSource.pyResponseData` in their response DTs.

**Fix:** Declare `DataSource` in the DT's `pyPagesAndClasses` and add an
`UPDATE_PAGE DataSource` step with blank initialization before the first
data page reference:

```
Pages & Classes: DataSource — <connector response class>
Step 1: UPDATE_PAGE DataSource (blank init)
Step 2: SET .Result to D_X[Param: .Field].Property
```

Without this, the DT fails at runtime with missing-page or null-reference
errors when the inline data page's response DT tries to write to
`DataSource.pyResponseData`.

### Unnamed parameters in platform DTs

- Some OOTB Pega data transforms declare parameters with `pyParametersParamName: ""`
  (empty string). These are positional parameters used internally by the platform. When
  calling such a Data Transform via APPLY_MODEL, pass values by position in the `pyParameters`
  array — the empty name is intentional, not an error. Do not invent a name for these
  parameters.

### Step action change via positional merge — leftover fields

Changing a step's `pyActionName` via `update-rule` in default patch mode
leaves action-specific fields from the previous action intact. For example,
changing `APPEND_TO` → `REMOVE` leaves stale `pyRelationNameAppend`,
`pyRelationNameUpdatepage`, and `pyExpressionGadget` on the step.

**Impact:** Runtime executes the new action correctly (stale fields are
ignored), but readback is noisy and confusing for future maintainers.

**Recommended:** When changing a step's action type, either:
- Create a replacement Data Transform with clean steps, or
- Send the complete `pyProperties` array with all steps fully specified and
  `listUpdateMode="replace"` (no partial positional patch for action-type changes).
