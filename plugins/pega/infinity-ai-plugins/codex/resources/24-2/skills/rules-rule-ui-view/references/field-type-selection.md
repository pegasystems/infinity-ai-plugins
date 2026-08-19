---
name: view-field-type-selection
description: "Rule-UI-View field type selection guide and example index for pyContent, pxViewMetadata, append payloads, and full view templates"
---
# Field Type Selection

Use this table to select the correct pyContent entry, pxViewMetadata node, and any
extra pxContextMetadata wiring based on the Pega property type. Skill names are exact
`get-skill` names.

| Property Type | pyComponentName | pxViewMetadata type | pyContent file | pxViewMetadata file | Extra pxContextMetadata |
|---------------|-----------------|---------------------|----------------|---------------------|------------------------|
| Text (Single) | `TextInput` | `TextInput` | `rules-rule-ui-view/examples/pyContent/text-input` | `rules-rule-ui-view/examples/pxViewMetadata/text-input` | — |
| Text (Paragraph) | `TextArea` | `TextArea` | `rules-rule-ui-view/examples/pyContent/text-area` | `rules-rule-ui-view/examples/pxViewMetadata/text-area` | — |
| Text (Rich) | `RichText` | `RichText` | `rules-rule-ui-view/examples/pyContent/richtext` | `rules-rule-ui-view/examples/pxViewMetadata/richtext` | — |
| Text (Email) | `Email` | `Email` | `rules-rule-ui-view/examples/pyContent/email` | `rules-rule-ui-view/examples/pxViewMetadata/email` | — |
| Text (Phone) | `Phone` | `Phone` | `rules-rule-ui-view/examples/pyContent/phone` | `rules-rule-ui-view/examples/pxViewMetadata/phone` | `$pagelists` (calling codes) |
| True/False | `Checkbox` | `Checkbox` | `rules-rule-ui-view/examples/pyContent/checkbox` | `rules-rule-ui-view/examples/pxViewMetadata/checkbox` | — |
| Date | `Date` | `Date` | `rules-rule-ui-view/examples/pyContent/date` | `rules-rule-ui-view/examples/pxViewMetadata/date` | — |
| Date Time | `DateTime` | `DateTime` | `rules-rule-ui-view/examples/pyContent/date-time` | `rules-rule-ui-view/examples/pxViewMetadata/date-time` | — |
| Decimal | `Decimal` | `Decimal` | `rules-rule-ui-view/examples/pyContent/decimal` | `rules-rule-ui-view/examples/pxViewMetadata/decimal` | — |
| Integer | `Integer` | `Integer` | `rules-rule-ui-view/examples/pyContent/integer` | `rules-rule-ui-view/examples/pxViewMetadata/integer` | — |
| Text (URL) | `URL` | `URL` | `rules-rule-ui-view/examples/pyContent/url` | `rules-rule-ui-view/examples/pxViewMetadata/url` | — |
| Text + FieldValues | `Dropdown` | `Dropdown` | `rules-rule-ui-view/examples/pyContent/dropdown` | `rules-rule-ui-view/examples/pxViewMetadata/dropdown` | `$associated` |
| Text + FieldValues (radio) | `RadioButtons` | `RadioButtons` | `rules-rule-ui-view/examples/pyContent/radio-buttons` | `rules-rule-ui-view/examples/pxViewMetadata/radio-buttons` | `$associated` |
| Decimal (currency) | `Currency` | `Currency` | `rules-rule-ui-view/examples/pyContent/currency` | `rules-rule-ui-view/examples/pxViewMetadata/currency` | — |
| Attachment | `Attachment` | `Attachment` | `rules-rule-ui-view/examples/pyContent/attachment` | `rules-rule-ui-view/examples/pxViewMetadata/attachment` | `$attachments` |
| Text (User ID) | `UserReference` | `UserReference` | `rules-rule-ui-view/examples/pyContent/user-reference` | `rules-rule-ui-view/examples/pxViewMetadata/user-reference` | `$users`, `$pagelists` |
| Page (Data Type) | `reference` | `reference` | `rules-rule-ui-view/examples/pyContent/data-reference` | `rules-rule-ui-view/examples/pxViewMetadata/data-reference` | `$views` |
| Page (Data Type, Infinity 26+ only) | `ObjectReference` | `ObjectReference` | `rules-rule-ui-view/examples/pyContent/object-reference-data-reference` | `rules-rule-ui-view/examples/pxViewMetadata/object-reference-data-reference` | `$classesmetadata`, `$pagelists` |
| Page / PageList (Embedded) | `reference` | `reference` | `rules-rule-ui-view/examples/pyContent/embedded-data` | `rules-rule-ui-view/examples/pxViewMetadata/embedded-data` | `$views` |
| PageList (Embedded, SimpleTable delegation) | `reference` | `reference` | `rules-rule-ui-view/examples/pyContent/embedded-data-pagelist` | `rules-rule-ui-view/examples/pxViewMetadata/embedded-data-pagelist` | `$views` |
| PageList (Embedded table, Infinity 26+ only) | `EmbeddedDataMulti` | `EmbeddedDataMulti` | `rules-rule-ui-view/examples/pyContent/embedded-data-multi` | `rules-rule-ui-view/examples/pxViewMetadata/embedded-data-multi` | `$classesmetadata`, `$pagelists` |

**How to use:** Given a property's Pega type (from the property rule or schema), find
the matching row. Load both the pyContent and pxViewMetadata files for that type,
adapt the field/property names, and wire any listed pxContextMetadata sections. For a
full end-to-end append payload, load the matching `rules-rule-ui-view/examples/append/*`
skill — those combine all three surfaces into one `update-rule` call.

## Examples

| File | Pattern | Description |
|------|---------|-------------|
| `rules-rule-ui-view/examples/stub` | Minimal create | Smallest valid view with one region |
| **Append (full payloads)** | | |
| `rules-rule-ui-view/examples/append/text-field` | Text field add | Full three-surface append with `{}` placeholders |
| `rules-rule-ui-view/examples/append/dropdown-field` | Dropdown add | Full three-surface append with `$associated` wiring |
| `rules-rule-ui-view/examples/append/data-reference-field` | Data Reference add | Full three-surface append with `$views` wiring |
| `rules-rule-ui-view/examples/append/object-reference-data-reference-field` | ObjectReference Data Reference add | Infinity 26+ direct data page binding |
| `rules-rule-ui-view/examples/append/embedded-data-field` | Embedded Data add | Full three-surface append with `$views` wiring (Page inline form) |
| `rules-rule-ui-view/examples/append/embedded-data-pagelist-field` | Embedded Data PageList add | Full three-surface append with `authorContext` (PageList SimpleTable delegation) |
| `rules-rule-ui-view/examples/append/embedded-data-multi-field` | EmbeddedDataMulti add | Infinity 26+ embedded PageList table |
| **End-to-end indexes** | | |
| `rules-rule-ui-view/examples/end-to-end/embedded-data-chain` | Embedded Data chain | Safe rule creation order and linked examples |
| `rules-rule-ui-view/examples/end-to-end/data-reference-chain` | Data Reference chain | Safe rule creation order and linked examples |
| **pyContent (field entries)** | | |
| `rules-rule-ui-view/examples/pyContent/text-input` | TextInput | Single-line text field |
| `rules-rule-ui-view/examples/pyContent/text-area` | TextArea | Multi-line `Pega-UI-Content-Field-Text-Paragraph` |
| `rules-rule-ui-view/examples/pyContent/richtext` | RichText | WYSIWYG rich text (same pxObjClass as TextArea) |
| `rules-rule-ui-view/examples/pyContent/email` | Email | Email field |
| `rules-rule-ui-view/examples/pyContent/phone` | Phone | Phone + calling code datasource |
| `rules-rule-ui-view/examples/pyContent/date` | Date | Date-only field (`Pega-UI-Content-Field-Date`) |
| `rules-rule-ui-view/examples/pyContent/date-time` | DateTime | Date + time field |
| `rules-rule-ui-view/examples/pyContent/dropdown` | Dropdown | Associated Dropdown + datasource |
| `rules-rule-ui-view/examples/pyContent/decimal` | Decimal | Decimal number field |
| `rules-rule-ui-view/examples/pyContent/integer` | Integer | Integer number field |
| `rules-rule-ui-view/examples/pyContent/url` | URL | URL input field |
| `rules-rule-ui-view/examples/pyContent/checkbox` | Checkbox | Boolean/Checkbox + caption wiring |
| `rules-rule-ui-view/examples/pyContent/user-reference` | UserReference | Operator lookup + `@USER` |
| `rules-rule-ui-view/examples/pyContent/data-reference` | DataReference | Embedded sub-view field |
| `rules-rule-ui-view/examples/pyContent/object-reference-data-reference` | ObjectReference | Infinity 26+ direct data page binding |
| `rules-rule-ui-view/examples/pyContent/embedded-data` | EmbeddedData | `Data-Embedded` reference + `context` (Page inline form) |
| `rules-rule-ui-view/examples/pyContent/embedded-data-pagelist` | EmbeddedData PageList | `Data-Embedded` reference + `authorContext` (PageList SimpleTable delegation) |
| `rules-rule-ui-view/examples/pyContent/embedded-data-multi` | EmbeddedDataMulti | Infinity 26+ embedded PageList table |
| `rules-rule-ui-view/examples/pyContent/attachment` | Attachment | File upload + `@ATTACHMENT` |
| `rules-rule-ui-view/examples/pyContent/region` | Region | Layout region wrapper |
| `rules-rule-ui-view/examples/pyContent/currency` | Currency | Currency decimal field with ISO code config |
| `rules-rule-ui-view/examples/pyContent/radio-buttons` | RadioButtons | Radio button group (same pxObjClass as Dropdown) |
| `rules-rule-ui-view/examples/pyContent/group` | Group | Field group container with heading/collapsibility |
| **pxViewMetadata (children entries)** | | |
| `rules-rule-ui-view/examples/pxViewMetadata/text-input` | TextInput | Metadata node for single-line text |
| `rules-rule-ui-view/examples/pxViewMetadata/text-area` | TextArea | Metadata node for multi-line text |
| `rules-rule-ui-view/examples/pxViewMetadata/richtext` | RichText | Metadata node for rich text |
| `rules-rule-ui-view/examples/pxViewMetadata/email` | Email | Metadata node for email |
| `rules-rule-ui-view/examples/pxViewMetadata/phone` | Phone | Metadata node with datasource |
| `rules-rule-ui-view/examples/pxViewMetadata/date` | Date | Metadata node for date-only |
| `rules-rule-ui-view/examples/pxViewMetadata/date-time` | DateTime | Metadata node for date-time |
| `rules-rule-ui-view/examples/pxViewMetadata/dropdown` | Dropdown | Metadata node with `@ASSOCIATED` |
| `rules-rule-ui-view/examples/pxViewMetadata/decimal` | Decimal | Metadata node for decimal |
| `rules-rule-ui-view/examples/pxViewMetadata/integer` | Integer | Metadata node for integer |
| `rules-rule-ui-view/examples/pxViewMetadata/url` | URL | Metadata node for URL |
| `rules-rule-ui-view/examples/pxViewMetadata/checkbox` | Checkbox | Metadata node with caption |
| `rules-rule-ui-view/examples/pxViewMetadata/user-reference` | UserReference | Metadata node with `@USER` |
| `rules-rule-ui-view/examples/pxViewMetadata/data-reference` | DataReference | Metadata node with `inheritedProps` |
| `rules-rule-ui-view/examples/pxViewMetadata/object-reference-data-reference` | ObjectReference | Infinity 26+ metadata node with direct data page binding |
| `rules-rule-ui-view/examples/pxViewMetadata/embedded-data` | EmbeddedData | Metadata node for embedded data (Page inline form) |
| `rules-rule-ui-view/examples/pxViewMetadata/embedded-data-pagelist` | EmbeddedData PageList | Metadata node for embedded data (PageList SimpleTable delegation) |
| `rules-rule-ui-view/examples/pxViewMetadata/embedded-data-multi` | EmbeddedDataMulti | Infinity 26+ metadata node for embedded PageList table |
| `rules-rule-ui-view/examples/pxViewMetadata/attachment` | Attachment | Metadata node with `@ATTACHMENT` |
| `rules-rule-ui-view/examples/pxViewMetadata/currency` | Currency | Metadata node for currency field |
| `rules-rule-ui-view/examples/pxViewMetadata/radio-buttons` | RadioButtons | Metadata node for radio button group |
| `rules-rule-ui-view/examples/pxViewMetadata/semantic-link` | SemanticLink | Metadata-only node for clickable data link |
| `rules-rule-ui-view/examples/pxViewMetadata/group` | Group | Metadata node for field group container |
| `rules-rule-ui-view/examples/step-form-view` | Step form create | DefaultForm for a workflow step |
| `rules-rule-ui-view/examples/edit-action-view` | Edit action create | `pyEdit` with TextArea, Data Ref, Checkbox |
| `rules-rule-ui-view/examples/details-view` | Details view create | `pyReview` with `pxViewType: "details"` |
| `rules-rule-ui-view/examples/data-reference-autocomplete-view` | DataReference create | AutoComplete lookup + flat layout + `$classesmetadata` |
| `rules-rule-ui-view/examples/data-reference-table-select-view` | DataReference create | SimpleTableSelect multi-select + presets + `$pagelists` |
| `rules-rule-ui-view/examples/data-reference-readonly-view` | DataReference create | Readonly SemanticLink + navigation + hover preview |
| `rules-rule-ui-view/examples/simple-table-view` | SimpleTable create | Editable multi-record list + modal edit + `$actions` |
| `rules-rule-ui-view/examples/field-group-table-view` | FieldGroup create | SimpleTable displayed as stacked field groups |
| `rules-rule-ui-view/examples/landing-page-view` | Landing page create | `WideNarrowPage` + Todo/Pulse/Announcement widgets + AI agents |
