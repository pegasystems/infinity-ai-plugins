---
name: view-template-patterns
description: "View template patterns — key characteristics and structural differences for Landing Page, ListView (Worklist), DataReference (AutoComplete / TableSelect), SimpleTable, Edit Action, Step Form, and Details views"
---
# View Template Patterns

Each Constellation view template has unique structural requirements. This reference
documents the key characteristics and differences between templates — consult when
creating views with `create-rule`.

## ListView (Worklist / Case Type List)

- `pyTemplateName`: `ListView`
- `pxViewType`: `"casetypelist"`
- **No `pyContent`** — entirely config-driven via `pxViewMetadata` and `pyJsonConfig`
- `referenceList` points to a **data page** (e.g., `D_pyMyWorkList`) — NOT `@P .Prop`
- `caseTypeReference` declares the case class being listed
- Columns are defined inside `config.presets[].children[].children[]` — NOT as top-level
  `pxViewMetadata.children`
- `personalization: true` + `personalizationId` (UUID) enables user column customization
- `$pagelists` declares the data page with `metaDataOnly: true` and `$properties` array
- `$classesmetadata` declares the case class with `fetchDefaultDataSources: true`
- `pxDependencies.components` contains `["ListView"]`
- `pySchemaVersion: "3"` is required

**Key differences from DefaultForm:**

1. **No `pyContent`** — ListView has no authored content regions or field children.
2. **Columns live in `presets`** — inside `config.presets[0].children[0].children[]`,
   not in top-level `children[]`.
3. **Data page binding** — `referenceList: "D_dataPageName"` (not `@P .PropertyName`).
4. **Read-only** — no edit modes, no `$actions`, no `editModeConfig`.
5. **Personalization** — `personalizationId` in config + `$personalizations` in context.
6. **Field properties in `$pagelists.$properties`** — not in top-level `$properties`.

**Common mistakes (anti-patterns):**

- Using template `listpage` or `DefaultForm` instead of `ListView`
- Creating a flat Region with field children (DefaultForm pattern)
- Omitting `pxViewType: "casetypelist"` — view won't render as a list
- Omitting `pyJsonConfig` — required for ListView views
- Putting field references in `$properties`/`$fields` instead of `$pagelists.$properties`
- Omitting `referenceList` — nothing to display without a data source

**Column field types:** Use `TextInput` for text/ID fields, `Decimal` for numeric
values (urgency, priority), `DateTime` for dates, `Dropdown` for picklist values.
Set `displayAsLink: true` on ID/label columns for case navigation.

**`fillAvailableSpace`:** Set `true` on one column (usually Label) to fill remaining
width. All others should be `false`.

**Field mapping — columns to `$pagelists.$properties`:**

| `pxViewMetadata` column ref | `$pagelists[0].$properties` entry |
|-----------------------------|-----------------------------------|
| `@P .pyID` | `.pyID` |
| `@P .pyLabel` | `.pyLabel` |
| `@P .Priority` | `.Priority` |
| `@P .TaskDueDate` | `.TaskDueDate` |
| `@P .pyStatusWork` | `.pyStatusWork` |

Every column's property reference must appear in the `$properties` array of the
corresponding `$pagelists` entry. Missing entries cause the column to render blank.

**`pyJsonConfig` vs `pxViewMetadata` differences:**

Both contain the same preset/column structure, but differ in these fields:

| Field | `pyJsonConfig` | `pxViewMetadata.config` |
|-------|----------------|-------------------------|
| `template` | *(absent)* | `"ListView"` |
| `ruleClass` | *(absent)* | `"MyCo-MyApp-Work-Task"` |
| `label` | *(absent)* | `"@L Task Worklist"` |
| `localeReference` | *(absent)* | `"@LR MYCO-MYAPP-WORK-TASK!PAGE!TASKWORKLIST"` |
| `title` | `"@L Task Worklist"` | `"@L Task Worklist"` |

See `examples/list-view.md` for the full create payload.

## Landing Page (`WideNarrowPage`)

Templates: `WideNarrowPage`, `BannerPage`, `OneColumnPage`, `TabbedPage`

- `pxViewType`: `"landingpage"`
- `pyJsonConfig` is required — contains `icon`, `title`, and `type`
- Uses widgets, not fields:
  - `Pega-UI-Content-Widget-Todo` — task list
  - `Pega-UI-Content-Widget-Pulse` — activity feed
  - `Pega-UI-Content-Widget-AppAnnouncement` — announcements banner
  - `Pega-UI-Content-Reference` — embedded view reference (NOT
    `Pega-UI-Content-Field-Data-Reference` used in case forms)
- `pyCoaches` array on the authored rule wires AI agents — each entry has
  `pxObjClass: "Pega-UI-Content-GenAI-Agent"` with `pyCoach` name and
  `pyComponentName: "AIAgentObject"`

**Key differences from case step views:**

1. **Two named regions** (`A` = wide, `B` = narrow) instead of one `Fields` region.
2. **Widgets** (Todo, Pulse, AppAnnouncement) use their own `Pega-UI-Content-Widget-*` classes.
3. **`Pega-UI-Content-Reference`** embeds views (not `Pega-UI-Content-Field-Data-Reference`).
4. **`@DATASOURCE`** annotation for widget data sources, **`@AIAGENT`** for AI coaches.
5. **`pyCoaches`** array on the authored rule wires AI agents.
6. **`$pagelists`** uses the `$properties` shape to declare which fields from the data page results are used.
7. **Locale reference** uses `!PAGE!` prefix (not `!VIEW!`).

## DataReference — AutoComplete

- `pyTemplateName`: `DataReference`
- `pxViewType`: `"datareference"`
- `displayAs`: `"autocomplete"` in View Root Config
- View-level `pyJsonConfig` declares the DataReference configuration (classKeys,
  contextClass, mode, referenceList, selectionMode, displayAs, parameters)
- **Flat `pyContent` layout** — the AutoComplete field and the Views Region sit at
  the same level in the top-level `pyContent` array (not nested inside a Region
  like DefaultForm views)
- AutoComplete field uses `pyPromptClass: "@baseclass"` (not the case class)
- `pxContextMetadata.$classesmetadata` lists the referenced data class with
  `fetchDefaultDataSources: true`
- `pxContextMetadata.$pagelists` uses `metaDataOnly: true` for the data page
- `parameters` — object of key-value pairs passed to the data page. Values use
  `@P .Prop` for property bindings, literal strings for fixed values, or empty
  string for optional/no-default. Mirrored in both root config AND child config.
- `classKeys` can contain multiple entries for compound-key data classes
  (e.g., `[{"name":"PartyID"},{"name":"CaseKey"}]`)

### AutoComplete `columns` Config

The `pyJsonConfig` on the AutoComplete field entry (and the matching
`config.columns` in `pxViewMetadata`) defines which properties appear in the
search/display. Each column object has:

| Property | Type | Description |
|----------|------|-------------|
| `value` | String | Property path (e.g., `".pyGUID"`, `".CustomerName"`) |
| `key` | String | `"true"` if this column is the key (stored on selection) |
| `setProperty` | String | `"Associated property"` for key columns |
| `display` | String | `"true"` if this column is shown in the search results |
| `primary` | String | `"true"` if this is the primary display column |
| `useForSearch` | Boolean | `true` if this column is searchable by the user |

### AutoComplete `columnsFormatter` Config

`columnsFormatter` — optional array of field components (`{type, config}`) displayed
after a selection is made (e.g., RadioButtons for type selection, TextInput for
status). Each entry uses the standard field component structure. Associated
`hideFieldLabels: true` controls label visibility.

### AutoComplete `previewKey`

`previewKey` — `@P .PageProp.pzInsKey` — enables hover preview cards showing record
details. Add the corresponding dotted path to `pxContextMetadata.$properties`.

### Flat Layout vs Region-Wrapped Layout

DefaultForm views nest fields inside a `Pega-UI-Content-Region` wrapper.
DataReference views place the AutoComplete field directly in the top-level
`pyContent` array alongside a `Views` Region (which holds embedded sub-views,
if any). Do not wrap the AutoComplete in a Fields Region for DataReference
template views.

## DataReference — SimpleTableSelect

- `pyTemplateName`: `DataReference`
- `pxViewType`: `"datareference"`
- `displayAs`: `"table"`
- `selectionMode`: `"multi"` / `mode`: `"multiselect"`
- `SimpleTableSelect` uses `Pega-UI-Content` — the generic base class
  (not `Pega-UI-Content-Field-Text` like AutoComplete). All config is in `pyJsonConfig`.
- **Flat `pyContent` layout** — same as AutoComplete (no wrapping "Fields" Region).
- `presets` define table columns shown in the picker. Each preset has a
  `"Columns"` Region with field children.
- `detailsDisplay` shows field detail on row expand/hover.
  Entries support `previewKey` + `displayAsLink: true` for navigable links with
  hover preview. Alternative: `additionalDetails: {type: "DISPLAY_LINK", params: {}}`
- `$pagelists` has two shapes:
  (1) Embedded pagelist: `{"$properties": [...], "pagelist": ".PropertyName", "$fields": [...]}` — for the selected items list.
  (2) Data page: `{"metaDataOnly": true, "pagelist": "D_DataPageName"}` — for the lookup source.
- `parameters` — object of key-value pairs passed to the data page (same convention
  as AutoComplete). Present in root config; may also appear in child config.
- `classKeys` can contain multiple entries for compound-key data classes.
- `showPromotedFilters: true` + `promotedFilters` — optional array of filter controls
  shown above the table. Each entry is a standard field component (`Dropdown`,
  `TextInput`, `Email`, `Phone`, etc.). Simple form uses `{type, config}`;
  advanced form adds `id`, `fieldLabel`, `fieldName`, `fieldType`,
  `conditionBuilderType` for condition-builder integration.
- For readonly display, set `renderMode: "ReadOnly"` in the child config
  combined with `mode: "readonly"` in the root config.

**Key differences from AutoComplete DataReference views:**

1. **`displayAs: "table"`** in View Root Config (AutoComplete uses `"autocomplete"`).
2. **`Pega-UI-Content` pxObjClass** — generic base class (AutoComplete uses `Pega-UI-Content-Field-Text`).
3. **`selectionMode: "multi"` / `mode: "multiselect"`** — multi-select (AutoComplete uses `"single"` / `"singleselect"`).
4. **`presets`** with `"Table"` template — column definitions for the picker table.
5. **`detailsDisplay`** — fields shown on row expand.
6. **`rowHeader`** — field used as the row header.
7. **`selectionKey`/`selectionList`/`readonlyContextList`** — selection wiring (AutoComplete uses `columns`/`datasource`/`contextPage`).
8. **`parentContextClass`** — parent case class (AutoComplete doesn't need this).
9. **`$pagelists` includes an embedded pagelist shape** — `{"$properties": [...], "pagelist": ".PropertyName"}` for selected items.

### DataReference `displayAs` Value Reference

| `displayAs` Value | Child Component | Mode |
|-------------------|-----------------|------|
| `"autocomplete"` | `AutoComplete` | Search box picker |
| `"table"` | `SimpleTableSelect` | Table picker |
| `"readonly"` | `SemanticLink` | Clickable navigation link |

## ObjectReference Data Reference (Infinity 26+ only)

`ObjectReference` is a parent-form Data Reference component observed in Infinity 26.
It is **not available in Infinity 24 or Infinity 25**. Use the DataReference template
view pattern above for older Infinity versions. Verify server version first using
`methodology-explain-application` (Server Version Discovery).

- `pxObjClass`: `Pega-UI-Content-Field-Data-Reference`
- `pyComponentName`: `ObjectReference`
- `pxViewMetadata.type`: `ObjectReference`
- Direct data page binding through `pyDataSource` / `config.referenceList`
- Direct data class binding through `pyTargetObjectClass` / `config.targetObjectClass`
- Single-select Combobox variant uses `pyMode: "single"` and
  `pyReferenceComponentType: "Combobox"`
- `pxContextMetadata.$classesmetadata` contains the target data class
- `pxContextMetadata.$pagelists` contains the data page with `metaDataOnly: true`
- It does not require a DataReference template sub-view or `$views` entry for the
  ObjectReference itself.

## SimpleTable

- `pyTemplateName`: `SimpleTable`
- `pxViewType`: `"multirecordlist"`
- **No `pyContent`** — the entire structure is in `pxViewMetadata` and `pyJsonConfig`
- Columns are defined inside `config.children` (not as top-level `pxViewMetadata.children`)
- `referenceList` uses `@P .PropertyName` — a case PageList property (not a data page)
- `editMode: "modal"` / `editModeConfig` controls how rows are added/edited.
  `editType: "action"` with `defaultAction: "pyEdit"` opens the row in a modal form.
  Alternative: `editMode: "tableRows"` enables inline row editing without modal.
- `$pagelists` with `$actions` — editable lists include an `$actions` array listing
  available actions (e.g., `{"name": "pyEdit"}`).
- `dataRetrievalType: "MANUAL"` — data comes from the case property, not a data page query.

**Key differences from form-based views:**

1. **No `pyContent`** — SimpleTable views are entirely config-driven.
2. **Columns inside `config.children`** — not as top-level `pxViewMetadata.children`.
3. **`referenceList: "@P .PropertyName"`** — binds to a case PageList property.
4. **`editModeConfig`** — controls modal add/edit behavior.
5. **`$pagelists` includes `$actions`** — declares available row-level actions.
6. **`parentClass`** — the owning case class (columns reference the data class properties).

## EmbeddedDataMulti (Infinity 26+ only)

`EmbeddedDataMulti` renders a PageList as an embedded editable table inside a
`DefaultForm`. It is **not available in Infinity 24 or Infinity 25**. For older
versions, use the embedded sub-view `reference` pattern or a standalone `SimpleTable`.
Verify server version first using `methodology-explain-application` (Server
Version Discovery).

- `pxObjClass`: `Pega-UI-Content-Field-Data-Embedded`
- `pyComponentName`: `EmbeddedDataMulti`
- `pxViewMetadata.type`: `EmbeddedDataMulti`
- `pyType`: `PageList`
- Row editing uses `pyAddEditAction: "pyEdit"`, `pyEditType: "action"`, and
  `pyEditModeConfig: "modal"`
- Columns may reference `pyPrimaryFields` using `Pega-UI-Content-Reference`
- `pxContextMetadata.$pagelists` includes `$actions`, `$views`, `pagelist`, and
  `includePrimaryFields: true`
- `pxDependencies.components` includes `EmbeddedDataMulti`, `SimpleTable`, `Region`,
  and `DefaultForm`

## View Type Comparison (DefaultForm variants)

| Attribute | Step form | Edit action (`pyEdit`) | Details review (`pyReview`) |
|-----------|-----------|------------------------|-----------------------------|
| `pxViewType` | *(not set)* | *(not set)* | `"details"` |
| `pyTemplateName` | `DefaultForm` | `DefaultForm` | `Details` |
| Typical rule name | custom | `pyEdit` | `pyReview` |
| Invoked by | Flow assignment step | Edit case action | Case details page |

### Step Form

- `pyTemplateName`: `DefaultForm`
- No `pxViewType` — step-bound forms do not set this field
- All three surfaces (`pyContent`, `pxViewMetadata`, `pxContextMetadata`) included

### Edit Action (`pyEdit`)

- `pyTemplateName`: `DefaultForm`
- No `pxViewType` — action views do not set this field
- May include mixed field types (TextArea, Data Reference, Checkbox, etc.)
- `$views` in `pxContextMetadata` must list every embedded view by name and class

### Details View (`pyReview`)

- `pyTemplateName`: `Details`
- `pxViewType`: `"details"` — required for full-page case details views
