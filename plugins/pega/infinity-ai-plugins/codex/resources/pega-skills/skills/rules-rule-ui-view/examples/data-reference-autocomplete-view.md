---
name: Data Reference Autocomplete View
description: Full create payload for a DataReference template view with AutoComplete lookup — single-select data page search with key/display columns, contextPage wiring, and $classesmetadata dependency tracking.
---

Use this as the create payload when a view provides a data-page-backed AutoComplete
lookup for selecting a related data record (e.g., selecting a Customer from a data
type list). Derived from a real step assignment form on a case type.

Key characteristics:
- `pyTemplateName`: `DataReference`
- `pxViewType`: `"datareference"` — required for DataReference template views
- View-level `pyJsonConfig` declares the DataReference configuration (classKeys,
  contextClass, mode, referenceList, selectionMode)
- **Flat `pyContent` layout** — the AutoComplete field and the Views Region sit at
  the same level in the top-level `pyContent` array (not nested inside a Region
  like DefaultForm views)
- AutoComplete field uses `pyPromptClass: "@baseclass"` (not the case class)
- `pxContextMetadata.$classesmetadata` lists the referenced data class with
  `fetchDefaultDataSources: true`
- `pxContextMetadata.$pagelists` uses `metaDataOnly: true` for the data page

> **Template-level vs field-level Data Reference:** This example creates a
> DataReference **template** view (`pyTemplateName: "DataReference"`) — the
> standalone lookup/selection UI. A parent view embeds this via a Data Reference
> **field** (`Pega-UI-Content-Field-Data-Reference`). See
> `append-data-reference-field.md` for the field-level pattern that points to a
> template view like this one.

> **AutoComplete `columns` config:** The `pyJsonConfig` on the AutoComplete field
> entry (and the matching `config.columns` in `pxViewMetadata`) defines which
> properties appear in the search/display. Each column object has:
>
> | Property | Type | Description |
> |----------|------|-------------|
> | `value` | String | Property path (e.g., `".pyGUID"`, `".CustomerName"`) |
> | `key` | String | `"true"` if this column is the key (stored on selection) |
> | `setProperty` | String | `"Associated property"` for key columns |
> | `display` | String | `"true"` if this column is shown in the search results |
> | `primary` | String | `"true"` if this is the primary display column |
> | `useForSearch` | Boolean | `true` if this column is searchable by the user |

> **Flat layout vs Region-wrapped layout:** DefaultForm views nest fields inside a
> `Pega-UI-Content-Region` wrapper. DataReference views place the AutoComplete
> field directly in the top-level `pyContent` array alongside a `Views` Region
> (which holds embedded sub-views, if any). Do not wrap the AutoComplete in a
> Fields Region for DataReference template views.

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "CollectData_Customer",
  "pyLabel": "CollectData_Customer",
  "pyClassName": "MyCo-MyApp-Work-ServiceRequest",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DataReference",
  "pxViewType": "datareference",
  "pyJsonConfig": "{\"classKeys\":[{\"name\":\"pyGUID\"}],\"contextClass\":\"MyCo-MyApp-Data-Customer\",\"mode\":\"singleselect\",\"name\":\"Customer\",\"referenceList\":\"D_CustomerList\",\"selectionMode\":\"single\"}",
  "pyContent": [
    {
      "pxObjClass": "Pega-UI-Content-Field-Text",
      "pyComponentName": "AutoComplete",
      "pyDisplayLabel": "Text (single line)",
      "pyFieldReference": "pyGUID",
      "pyValue": ".Customer.pyGUID",
      "pyValueWithoutAnnotation": ".Customer.pyGUID",
      "pyLabelOption": "text",
      "pyPlaceholder": "Select...",
      "pyPromptClass": "@baseclass",
      "pyJsonConfig": "{\"columns\":[{\"key\":\"true\",\"setProperty\":\"Associated property\",\"value\":\".pyGUID\"},{\"display\":\"true\",\"primary\":\"true\",\"useForSearch\":true,\"value\":\".CustomerName\"}],\"contextPage\":\"@P .Customer\",\"datasource\":\"D_CustomerList\",\"deferDatasource\":true,\"listType\":\"datapage\",\"primaryField\":\"@P .Customer.CustomerName\"}",
      "pyFieldWarningMessage": "@L"
    },
    {
      "pxObjClass": "Pega-UI-Content-Region",
      "pyName": "Views",
      "pyPromptClass": "MyCo-MyApp-Work-ServiceRequest",
      "pyComponentName": "Region",
      "pyDisplayLabel": "Region",
      "pyContent": []
    }
  ],
  "pxViewMetadata": {
    "children": [
      {
        "config": {
          "columns": [
            {
              "key": "true",
              "setProperty": "Associated property",
              "value": ".pyGUID"
            },
            {
              "display": "true",
              "primary": "true",
              "useForSearch": true,
              "value": ".CustomerName"
            }
          ],
          "contextPage": "@P .Customer",
          "datasource": "D_CustomerList",
          "deferDatasource": true,
          "label": "@L ",
          "labelOption": "custom",
          "listType": "datapage",
          "messageConfig": {
            "content": "@L "
          },
          "placeholder": "@L Select...",
          "primaryField": "@P .Customer.CustomerName",
          "value": "@P .Customer.pyGUID"
        },
        "type": "AutoComplete"
      },
      {
        "children": [],
        "name": "Views",
        "type": "Region"
      }
    ],
    "config": {
      "classKeys": [
        {"name": "pyGUID"}
      ],
      "contextClass": "MyCo-MyApp-Data-Customer",
      "localeReference": "@LR MYCO-MYAPP-WORK-SERVICEREQUEST!VIEW!COLLECTDATA_CUSTOMER",
      "mode": "singleselect",
      "name": "Customer",
      "referenceList": "D_CustomerList",
      "ruleClass": "MyCo-MyApp-Work-ServiceRequest",
      "selectionMode": "single",
      "template": "DataReference"
    },
    "name": "CollectData_Customer",
    "type": "View"
  },
  "pxContextMetadata": {
    "$properties": [
      ".Customer.pyGUID",
      ".Customer",
      ".Customer.CustomerName"
    ],
    "$fields": [
      {"name": ".Customer"},
      {"name": ".Customer.CustomerName"},
      {"name": ".Customer.pyGUID"}
    ],
    "$classesmetadata": [
      {
        "name": "MyCo-MyApp-Data-Customer",
        "fetchDefaultDataSources": true
      }
    ],
    "$pagelists": [
      {
        "metaDataOnly": true,
        "pagelist": "D_CustomerList"
      }
    ],
    "$views": [],
    "$associated": [],
    "$insights": [],
    "$genAICoaches": [],
    "$AIAgents": [],
    "$attachments": [],
    "$widgets": [],
    "$addresses": [],
    "$users": [],
    "$whens": [],
    "$paragraphs": []
  }
}
```
