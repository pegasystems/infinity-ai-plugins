---
name: view-metadata-structures
title: "View Metadata Structures"
description: "Schema reference for pxViewMetadata (Constellation component tree) and pxContextMetadata (dependency summary) in Rule-UI-View rules."
---

# View Metadata Structures

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

### Special Value Annotations

| Annotation | Used by | Example | Notes |
|-----------|---------|---------|-------|
| `@P .Prop` | Most fields | `"value": "@P .Status"` | Standard property binding |
| `@FL .Prop` | Most fields | `"label": "@FL .Status"` | Field label from property |
| `@L Text` | All fields | `"placeholder": "@L Select..."` | Literal localized text |
| `@ATTACHMENT .Prop` | Attachment | `"value": "@ATTACHMENT .EvidenceFile"` | Must use instead of `@P` for attachment properties |
| `@USER .Prop` | UserReference | `"value": "@USER .RequestedBy"` | Triggers operator resolution logic |
| `@DATASOURCE D_Page.pxResults` | Widgets | `"datasource": "@DATASOURCE D_Todo.pxResults"` | Page-level widget data binding |
| `@AIAGENT Name` | AI coaches | `"coaches": ["@AIAGENT MyAgent"]` | AI agent reference in landing pages |
| `@ASSOCIATED .Prop` | Dropdown | `"datasource": "@ASSOCIATED .Priority"` | FieldValue prompt list binding |
| `@LR CLASS!VIEW!NAME` | All views | `"localeReference": "@LR MYCO!VIEW!MYVIEW"` | Locale reference — class uppercased, dots become hyphens |
| `@W WhenName` | Visibility/config | `"visibility": "@W IsActive"` | When rule reference for conditional logic. Alternative to plain When name. |
| `@E expression` | Visibility/config | `"visibility": "@E .Flag == true"` | Inline expression. No `$whens` entry needed. |
| `@CLASS ClassName` | SimpleTable sub-view | `"context": "@CLASS MyCo-Data-Address"` | Row class context in SimpleTable sub-views |
| `selectionMode` | String | Record selection mode: `"single"`, `"multi"` |
| `displayAs` | String | Display format: `"table"`, `"gallery"`, `"timeline"` |
| `renderMode` | String | Render mode: `"ReadOnly"`, `"Editable"` |

### View Root Config (additional properties)

| Property | Type | Description |
|----------|------|-------------|
| `template` | String | Constellation template name |
| `ruleClass` | String | Class context for data binding |
| `localeReference` | String | Locale reference key (`@LR CLASS!VIEW!NAME`). Optional — branch views and scratch views often omit it. May be server-generated. |
| `type` | String | View type for page-level views |
| `title` | String | Page/dashboard title |
| `icon` | String | Icon identifier |
| `header` | String | Header property reference (e.g., `@P .pyLabel`) |
| `subheader` | String | Subheader property reference (e.g., `@P .pyID`) |
| `instructions` | String | Server-generated instruction reference. Derived from `pyInstructions`, `pyInstructionsOption`, and `pyInstructionsType` rather than set directly in `pxViewMetadata.config`. |
| `NumCols` | String | Column count for multi-column layouts (`"1"`, `"2"`). Maps to `pyColumnCount`. Default `"2"` for DefaultForm views. |
| `inheritParentLayout` | Boolean | `false` to use own layout, `true` to inherit from parent. Maps to `pyInheritParentLayout`. |
| `label` | String | View heading (`@L Heading text`). Maps to `pyDefaultHeading`. Omit when view has no custom heading. |
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
| `$fields` | Array | Field definitions. May be absent on views authored before Infinity '26 tooling updates. Including it on create/update is safe — server accepts and preserves it. |
| `$views` | Array of objects | Embedded view references. Each entry: `{"name": "ViewName", "ruleClass": "ClassName"}`. On Infinity 26+ entries also include `"context": ".pagePath"`; on 24.x only `name` and `ruleClass` are observed. |
| `$insights` | Array of strings | Insight/report references (dashboards) |
| `$pagelists` | Array of objects | Page list / data page references. Shape varies: `{"metaDataOnly": true, "pagelist": "D_PageName"}` or `{"$properties": [...], "pagelist": "D_PageName.pxResults"}`. |
| `$whens` | Array of strings or objects | When-condition rules for visibility/read-only logic. Simple string for scalar fields (e.g., `"HasPassport"`). Object `{"name": "WhenName", "$views": [...]}` for conditionally-visible embedded data — sub-views tracked inside `$whens`, NOT in top-level `$views`. |
| `$readOnlyWhens` | Array | When conditions controlling read-only state |
| `$disabledWhens` | Array | When conditions controlling disabled state |
| `$widgets` | Array of strings | Widget references |
| `$attachments` | Array of objects | Attachment references. Each entry: `{"name": ".PropertyName", "multiple": false}`. |
| `$users` | Array of strings | User/operator references |
| `$associated` | Array of objects | Properties using associated FieldValue prompt lists. Each entry: `{"name": ".PropertyName", "deferDatasource": true}`. Required when a Dropdown uses `listType: "associated"`. |
| `$paragraphs` | Array of objects | Paragraph rule references. Each entry: `{"name": "ParagraphRuleName"}`. |
| `$classesmetadata` | Array of objects | Class metadata references. Each entry: `{"name": "ClassName", "fetchDefaultDataSources": true}`. |
| `$fieldvalues` | Array of strings | Field value references |
| `$dataTypes` | Array of strings | Data type references |
| `$personalizations` | Array of strings | Personalisation settings |
| `$genAICoaches` | Array of strings | GenAI coach references |
| `$AIAgents` | Array of strings | AI agent references |
| `$dynamicForms` | Array of strings | Dynamic form references |
| `$promptlists` | Array of strings | Prompt list references |

For instruction paragraphs, set `pyInstructions`, `pyInstructionsOption: "overridden"`,
and `pyInstructionsType: "paragraph"` on the rule. The server then generates
`pxViewMetadata.config.instructions` automatically as an `@PARAGRAPH ...` reference.
If those rule-level fields are missing, directly supplying `instructions` in
`pxViewMetadata.config` is not preserved.
