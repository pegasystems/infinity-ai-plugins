---
name: rules-rule-ui-view
description: Schema and authoring guide for Pega Constellation views (Rule-UI-View), including three-surface updates and field wiring patterns
---

**Prerequisites:**
- Load `methodology-rule-authoring` first (create/update workflows, deep merge, list patterns).
- Load `rules-rule-obj-property` when any target field's backing property does
	not already exist. That skill contains examples and authoring notes
	needed to create a `Rule-Obj-Property`.

## Critical Authoring Rules

1. Always fetch the current rule with `get-rule(detail="full")` before update.
2. Always update `pyContent`, `pxViewMetadata`, and `pxContextMetadata` together.
3. For list updates, use `{}` no-op placeholders to preserve existing elements.
4. For Dropdown fields, wire datasource in all three surfaces in a single update.
5. Property-first workflow is mandatory for all field additions:
	- If a field's backing property does not exist, create the property first.
	- After property creation succeeds, create or update the view.
	- If the property already exists, do not recreate it; append the field wiring only.

## Property-First Orchestration (All Rule Types)

This behavior is not view-specific. It applies to any view authoring request that
introduces new fields:

1. Resolve target field list and backing property names.
2. **Verify each property exists** — for every `pyFieldReference` in the planned
   `pyContent`, call:
   ```
   list-rules(ruleType="Rule-Obj-Property", className="<target-class>", ruleName="<PropertyName>")
   ```
   If the result set is empty the property does not exist.
3. Create every missing property using `rules-rule-obj-property` (schema +
   examples) before proceeding. Do not batch property creation with the view
   create — each property must succeed independently first.
4. Re-read the view rule and append field entries for all requested properties.

Never attempt to create a new view field that references a property that is not yet
present in the system. A view referencing non-existent properties will render with
empty labels at runtime and produce no authoring-time error.

## Blocking Contract

- Create every `Rule-Obj-Property` before creating the `Rule-UI-View` that references it.
- If property verification fails or returns an unexpected result, diagnose the cause
  (wrong class, inherited property, API format change) before retrying.
- Do not mark the task complete until verification steps pass.

## Create vs Update Decision

Before touching the view, determine the correct operation:

1. **Does the view exist?** — call
   `list-rules(ruleType="Rule-UI-View", className=<cls>, ruleName=<viewName>)`.
2. If **no results** → the view does not exist → use **Sequence A** (create).
3. If **results returned** → the view exists. `list-rules` may return both a branch
   copy and the base rule for the same view:
   - If any result has `pyRuleSet` matching the branch ruleset → use that branch
     result's instance key and use **Sequence B** (update) directly.
   - If no result is in the branch ruleset → call `get-rule(detail="full")` on the
     base result, `copy-rule` it into the branch, then use **Sequence B**
     (update) on the copied rule.

**Default assumption:** When a user asks to "add a field to a view" or "modify a
view," the view almost certainly already exists. Always run step 1 before deciding.

## Required Tool Sequence

### Sequence A — Create a new view

0. **Property pre-flight** — for every field in the planned view, run
   `list-rules(ruleType="Rule-Obj-Property", className=<cls>, ruleName=<prop>)`.
   Collect missing properties.
1. `create-rule` for each missing `Rule-Obj-Property`.
2. **Re-verify** — repeat step 0 for properties created in step 1; all must now
   return a result. Abort if any are still missing.
3. `create-rule` for `Rule-UI-View`.
4. Verify — `get-rule(detail="full")` confirms the view references every property.

### Sequence B — Update an existing view

0. **Property pre-flight** — same as Sequence A steps 0–2 for any new fields being
   added.
1. `get-rule(detail="full")` on the existing view to read current state.
2. If multiple existing results were found, select the branch-ruleset result before
   fetching. If no branch result exists, `copy-rule` the base rule into the branch,
   then re-read the copied rule with `get-rule(detail="full")`.
3. `update-rule` for `Rule-UI-View` — choose the list update strategy based on what
   you are sending:
   - **Appending fields (partial update):** omit `listUpdateMode` and use positional
     `{}` no-op placeholders for existing elements you want to preserve. Only the
     elements with actual fields are merged; placeholders pass through unchanged.
   - **Replacing the full field list (wholesale replacement):** pass
     `listUpdateMode="replace"` and send the complete desired `pyContent` array.
     This prevents stale metadata from old elements leaking through at the same
     index position. Use this when you are sending all fields — both retained and
     new — as a complete set.
   - **Mixed nested-list strategy (rare):** keep the global mode in patch and use
     `listUpdateModeOverrides` when one exact nested list path should replace while
     surrounding arrays stay patch. Dot notation is only valid in
     `listUpdateModeOverrides`, never in `updates`.
4. Verify — `get-rule(detail="full")` confirms the update persisted.

## Acceptance Criteria

- AC1: Property key exists and is in the target class/ruleset.
- AC2: View contains `pyFieldReference` to that property.
- AC3: `pxContextMetadata` includes that property.
- AC4: Report both created keys in final output.

## Completion Guard

If any AC fails, diagnose the root cause and fix before proceeding.
Common causes: property on a parent class (verify with `className` of the ancestor),
unexpected API response format, or a timing issue after recent creation.

## Negative Example

Creating a View with that references `.MyTextField` when `MyTextField` does not exist is invalid. Create new Property rules before Views that must reference it.

## Examples

| Skill | Type | Pattern | Description |
|------|------|---------|-------------|
| `Stub Rule-UI-View` | create | Minimal create | Smallest valid view with one region |
| `Append Text Field` | update | Text field add | Append TextInput, preserve arrays |
| `Append TextArea Field` | update | TextArea field add | Multi-line `Pega-UI-Content-Field-Text-Paragraph` |
| `Append RichText Field` | update | RichText field add | WYSIWYG rich text (same pxObjClass as TextArea) |
| `Append Email Field` | update | Email field add | Append Email field |
| `Append Phone Field` | update | Phone field add | Phone + calling code datasource + `$pagelists` |
| `Append DateTime Field` | update | DateTime field add | Date + time field wiring across all three surfaces |
| `Append Dropdown Field` | update | Dropdown add | Associated Dropdown + datasource wiring |
| `Append Decimal Field` | update | Decimal field add | Decimal number field |
| `Append Checkbox Field` | update | Checkbox add | Boolean/Checkbox + caption wiring |
| `Append UserReference Field` | update | UserReference add | Operator lookup + `@USER` + `$users` + `$pagelists` |
| `Append Data Reference Field` | update | Data Reference add | Embedded sub-view field + `$views` |
| `Append Embedded Data Field` | update | Embedded Data add | `Data-Embedded` reference + `authorContext` + `$views` |
| `Append Attachment Field` | update | Attachment field add | File upload + `@ATTACHMENT` + `$attachments` |
| `Step Form View` | create | Step form create | DefaultForm for a workflow step |
| `Edit Action View` | create | Edit action create | `pyEdit` with TextArea, Data Ref, Checkbox |
| `Details View` | create | Details view create | `pyReview` with `pxViewType: "details"` |
| `Data Reference Autocomplete View` | create | DataReference create | AutoComplete lookup + flat layout + `$classesmetadata` |
| `Data Reference Table Select View` | create | DataReference create | SimpleTableSelect multi-select + presets + `$pagelists` |
| `Simple Table View` | create | SimpleTable create | Editable multi-record list + modal edit + `$actions` |
| `Landing Page View` | create | Landing page create | `WideNarrowPage` + Todo/Pulse/Announcement widgets + AI agents |
| `DataReference Readonly View` | create | DataReference readonly | SemanticLink navigation link with hover preview |
| `FieldGroup Table View` | create | FieldGroup table | SimpleTable rendered as stacked card layout |
| `Data Reference Chain` | create | Data Reference chain | Full dependency chain for DataReference fields |
| `Embedded Data Chain` | create | Embedded Data chain | Full dependency chain for Embedded Data fields |


## References

| Skill | When to load |
|------|-------------|
| `view-anti-patterns` | Before any view create or update — common field duplication and layout mistakes |
| `view-pagelist-selection` | When implementing row selection from a case-owned embedded PageList — staging pattern, checkbox-per-row, submit shapes, anti-patterns |

## View-to-Surface Mapping

Standard view names control specific UI surfaces:

| View Name | UI Surface | Notes |
|-----------|-----------|-------|
| `pyPrimaryFields` | Case list columns, case summary header | Controls which fields appear in lists |
| `pyEdit` | Full edit form | All editable fields for the case |
| `pyReview` | Read-only case details | Non-editable summary |
| `pyCaseSummary` | Case summary widget | Compact case overview |
| `pyDetails` | Case page shell (CaseView template) | No scalar fields — override to customize Utilities widgets (Attachments, Followers, Tags). See `case-view-architecture` |
| `pySummary` | Summary view | Compact summary display |
| `pyWorkList` | Work list page | Uses `listpage` view type |
| *(step name)* | Assignment form for that workflow step | e.g., `ConfirmScope` controls the Confirm Scope step |

The create case form is the view for the **first step of the first stage** in the
case type's flow. There is no single property that encodes "this view is the create
form" — it is implicit in the case lifecycle.

### pyCaseSummary Region Placement

`pyCaseSummary` (template `CaseSummary`) has two regions with different UI purposes:

| API region name | Designer UI label | Purpose | When to use |
|-----------------|-------------------|---------|-------------|
| `"Primary fields"` | **Highlighted fields** | 2–3 high-visibility KPIs at the top of the summary card | Only for urgency, status, or fields the user explicitly wants highlighted |
| `"Secondary fields"` | **Summary** | Scrollable metadata list below | **Default for all new fields** |

> **When a user says "add fields to the Summary View", always place them in the
> `"Secondary fields"` region** unless they explicitly request "highlighted" or
> "primary" placement.

## pxViewMetadata Structure

`pxViewMetadata` is a JSON-stringified object representing the Constellation component
tree. It **must be sent as a JSON string** (use `JSON.stringify`), not as an object —
the Pega API rejects objects with "Something went wrong with converting the json to a
clipboard page". Must be updated explicitly alongside `pyContent` when using the
Agentic Authoring API (not auto-regenerated).

The structure is a recursive tree of `ComponentNode` objects:

```json
{
  "name": "ConfirmScope",
  "type": "View",
  "config": {
    "template": "DefaultForm",
    "ruleClass": "O896IP-SAMMAsse-Work-ConductEngagement",
    "localeReference": "@LR O896IP-SAMMASSE-WORK-CONDUCTENGAGEMENT!VIEW!CONFIRMSCOPE"
  },
  "children": [
    {
      "name": "Fields",
      "type": "Region",
      "children": [
        {
          "type": "TextInput",
          "config": {
            "label": "@FL .AssessmentName",
            "value": "@P .AssessmentName"
          }
        }
      ]
    }
  ]
}
```

### ComponentNode Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | String | DX component type (see Field Type Patterns in JSON schema `$defs`) |
| `name` | String | Logical name (required for Regions, optional otherwise) |
| `config` | Object | Component-specific configuration (see below) |
| `children` | Array | Nested child ComponentNodes |

### Common Config Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | String | Property reference for data binding (`@P .propertyName`) |
| `label` | String | Display label (`@L Label Text` for localized, `@FL .prop` for field label) |
| `readOnly` | Boolean | `true` if the field is read-only |
| `required` | Boolean | `true` if the field is required |
| `disabled` | Boolean | `true` if the field is disabled |
| `visibility` | Boolean/String | Visibility condition or boolean |
| `helperText` | String | Helper text shown below the field |
| `placeholder` | String | Placeholder text for input fields |
| `testId` | String | Test automation identifier |
| `datasource` | Object | Data source configuration for dropdowns/autocompletes |
| `referenceList` | String | Data page or property reference for list data |
| `contextClass` | String | Class context for embedded/referenced data |
| `mode` | String | Interaction mode: `"readonly"`, `"editable"` |
| `selectionMode` | String | Record selection mode: `"single"`, `"multi"` |
| `displayAs` | String | Display format: `"table"`, `"gallery"`, `"timeline"` |
| `renderMode` | String | Render mode: `"ReadOnly"`, `"Editable"` |

### View Root Config (additional properties)

| Property | Type | Description |
|----------|------|-------------|
| `template` | String | Constellation template name |
| `ruleClass` | String | Class context for data binding |
| `localeReference` | String | Locale reference key (`@LR CLASS!VIEW!NAME`) |
| `type` | String | View type for page-level views |
| `title` | String | Page/dashboard title |
| `icon` | String | Icon identifier |
| `header` | String | Header property reference (e.g., `@P .pyLabel`) |
| `subheader` | String | Subheader property reference (e.g., `@P .pyID`) |
| `instructions` | String | Instruction text or reference |
| `personalization` | Boolean | Enable user personalisation of columns/layout |
| `grouping` | Boolean | Enable grouping in list views |
| `globalSearch` | Boolean | Enable global search in list views |
| `presets` | Array | Preset configurations (table column layouts, saved views) |

## pxContextMetadata Structure

`pxContextMetadata` is a JSON-stringified object summarizing the view's dependencies.
Same wire-format rule as `pxViewMetadata` — **must be sent as a JSON string**.

| Section | Type | Description |
|---------|------|-------------|
| `$properties` | Array of strings | Property paths referenced (e.g., `".pyNote"`, `".pyLabel"`) |
| `$fields` | Array | Field definitions |
| `$views` | Array of strings | Embedded view references |
| `$insights` | Array of strings | Insight/report references (dashboards) |
| `$pagelists` | Array of strings | Page list references |
| `$whens` | Array of strings | When-condition rules for visibility/read-only logic |
| `$readOnlyWhens` | Array | When conditions controlling read-only state |
| `$disabledWhens` | Array | When conditions controlling disabled state |
| `$widgets` | Array of strings | Widget references |
| `$attachments` | Array of strings | Attachment references |
| `$users` | Array of strings | User/operator references |
| `$associated` | Array of objects | Properties using associated FieldValue prompt lists. Each entry: `{"name": ".PropertyName", "deferDatasource": true}`. Required when a Dropdown uses `listType: "associated"`. |
| `$paragraphs` | Array of strings | Paragraph rule references |
| `$classesmetadata` | Array of strings | Class metadata references |
| `$fieldvalues` | Array of strings | Field value references |
| `$dataTypes` | Array of strings | Data type references |
| `$personalizations` | Array of strings | Personalisation settings |
| `$genAICoaches` | Array of strings | GenAI coach references |
| `$AIAgents` | Array of strings | AI agent references |
| `$dynamicForms` | Array of strings | Dynamic form references |
| `$promptlists` | Array of strings | Prompt list references |

## Required Field Pattern

Making a field required must be set in **two places simultaneously** in a single
`update-rule` call. The correct values differ by component type.

### TextInput, TextArea, Date, DateTime, Decimal, Integer

**`pyContent` entry** — set `pyRequiredOption: "always"`:

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Text",
  "pyComponentName": "TextInput",
  "pyFieldReference": "FieldName",
  "pyRequiredOption": "always"
}
```

**`pxViewMetadata` config** — set `"required": true` (boolean):

```json
{"config": {"label": "@FL .FieldName", "value": "@P .FieldName", "required": true}, "type": "TextInput"}
```

### Dropdown / Data Reference

Same two-surface pattern. **`pyContent`** — add `pyRequiredOption: "always"`.
**`pxViewMetadata`** — set `"required": true`.

For Data Reference fields, `required` is passed via `inheritedProps`:

```json
{
  "config": {
    "authorContext": ".PropertyName",
    "inheritedProps": [{"prop": "label", "value": "@FL .PropertyName"}, {"prop": "required", "value": true}],
    "name": "SubViewName",
    "referenceType": "Data",
    "ruleClass": "ClassName",
    "type": "view"
  },
  "type": "reference"
}
```

### Required anti-patterns

- **`"required": ""`** (empty string) does NOT enforce required — Pega ignores it.
- **Setting only `pxViewMetadata`** without `pyRequiredOption` in `pyContent` does not persist.
- **Setting only `pyContent`** without `pxViewMetadata` — the asterisk will not appear.

### Alternative: pyJsonConfig as Required Source

Embedding `"required":true` inside `pyJsonConfig` causes the server to regenerate
`pxViewMetadata` with the required flag:

```json
{"pyJsonConfig": "{\"datasource\":\"@ASSOCIATED .PropertyName\",\"required\":true}", "pyRequiredOption": "always"}
```

**Caveat:** Observed behavior, not documented API contract.

## When Visibility Pattern

Making a field conditionally visible via a When rule requires updating **three surfaces
simultaneously** in a single `update-rule` call.

**Prerequisites:** The When rule (`Rule-Obj-When`) must already exist and be active
on the same class as the view.

**`pyContent`** — set `pyVisibilityOption` to the When rule name:

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Text",
  "pyComponentName": "TextInput",
  "pyFieldReference": "PassportNumber",
  "pyVisibilityOption": "HasPassport"
}
```

**`pxViewMetadata` config** — set `"visibility"` to the When rule name:

```json
{"type": "TextInput", "config": {"label": "@FL .PassportNumber", "value": "@P .PassportNumber", "visibility": "HasPassport"}}
```

**`pxContextMetadata.$whens`** — add the When rule name:

```json
{"$whens": ["HasPassport"]}
```

### Combining conditions

The same field can have independent visibility, read-only, and disabled When rules:

```json
{"pyVisibilityOption": "HasPassport", "pyReadOnlyOption": "IsSubmitted", "pyDisabledOption": "never"}
```

In `pxContextMetadata`, use the appropriate key: `$whens` (visibility), `$readOnlyWhens` (read-only), `$disabledWhens` (disabled).

### Visibility anti-patterns

- **Updating only `pyContent`** without `pxViewMetadata` and `pxContextMetadata` — field stays unconditionally visible.
- **`pyVisibilityOption: "always"`** disables the When condition — use the When rule name.
- **Omitting `$whens`** in `pxContextMetadata` leaves the dependency index stale.

## Operational Notes

- **pyContent is the source of truth for field layout.** The Agentic Authoring API does NOT auto-regenerate `pxViewMetadata`/`pxContextMetadata` — update all three surfaces together.
- **pxViewMetadata and pxContextMetadata must be JSON strings** — use `JSON.stringify`. Objects are rejected by the Pega API.
- **pxRuleReferences is NOT auto-updated** after editing `pyContent`. May be stale. Not a blocker.
- **pyRuleAvailable must be `"Yes"` for label resolution.** Properties without it produce blank labels (`@FL` cannot resolve).
- **Operation order for removing fields:** Remove from all views first, then block the property. Blocking while a view references it causes blank labels.
- **Blocked views:** `list-rules` does NOT show blocked rules; `search-rules` DOES; `get-rule` by key shows them.
- **Send the entire `pyContent` outer array** (region wrapper + inner array), not just the new field.
- **`listUpdateMode` and `listUpdateModeOverrides` control how arrays are applied.** Omit `listUpdateMode` (or use `"patch"`) when sending sparse lists with `{}` no-op placeholders. Use `listUpdateMode="replace"` when sending the complete desired field list. Use `listUpdateModeOverrides` only when a specific nested list path needs different behavior than the global default. Dot notation is supported only in override paths, not in update payload keys.
- **`pyRuleFormStatus`** should be `"Good"` after a successful update.
- **`Pega-UI-Content-Field-Checkbox` is invalid** — causes HTTP 500. Use `Pega-UI-Content-Field-Text` with `pyComponentName: "Checkbox"`.
- **Field input type is a property-level concern.** `pyDisplayLabel` on a view field entry is cosmetic. Change `pyStreamName` on the `Rule-Obj-Property` to change the control.

## Verification Checklist

- `pyRuleFormStatus` is `Good`.
- `pxSaveDateTime` advanced after update.
- New property appears in `pxContextMetadata.$properties`.
- For Dropdowns, `pxContextMetadata.$associated` contains the property.
- For newly requested fields, each backing `Rule-Obj-Property` exists before the
	view create/update call.
