---
name: Data Reference Table Select View
description: Full create payload for a DataReference template view with SimpleTableSelect — multi-select table picker backed by a data page, with presets, detailsDisplay, and selection wiring.
---

Use this as the create payload when a view provides a multi-select table picker
for a PageList-type property. Derived from a real multi-select Subject picker.

Key characteristics:
- `pyTemplateName`: `DataReference`
- `pxViewType`: `"datareference"`
- `displayAs`: `"simpleTable"` (contrast with AutoComplete in
  `data-reference-autocomplete-view.md`)
- `selectionMode`: `"multi"` / `mode`: `"multiselect"`

> **`SimpleTableSelect` uses `Pega-UI-Content`** — the generic base class
> (not `Pega-UI-Content-Field-Text` like AutoComplete). All config is in
> `pyJsonConfig`.

> **Flat `pyContent` layout** — the SimpleTableSelect and the Views Region sit at
> the top level of `pyContent` (no wrapping "Fields" Region).

> **`presets`** define table columns shown in the picker. Each preset has a
> `"Columns"` Region with field children.

> **`detailsDisplay`** shows field detail on row expand/hover.

> **`$pagelists` has two shapes here:**
> (1) Embedded pagelist: `{"$properties": [...], "pagelist": ".PropertyName", "$fields": [...]}` — for the selected items list.
> (2) Data page: `{"metaDataOnly": true, "pagelist": "D_DataPageName"}` — for the lookup source.

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "Edit_PickSubjects",
  "pyLabel": "Edit - Pick Subjects",
  "pyClassName": "MyCo-MyApp-Data-Subject",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DataReference",
  "pxViewType": "datareference",
  "pyJsonConfig": "{\"classKeys\":[{\"name\":\"pyGUID\"}],\"contextClass\":\"MyCo-MyApp-Data-Subject\",\"displayAs\":\"simpleTable\",\"isCreationOfNewRecordAllowedForReference\":true,\"mode\":\"multiselect\",\"name\":\"PickSubjects\",\"parentContextClass\":\"MyCo-MyApp-Work-Case\",\"referenceList\":\"D_SubjectList\",\"selectionMode\":\"multi\"}",
  "pyContent": [
    {
      "pxObjClass": "Pega-UI-Content",
      "pyComponentName": "SimpleTableSelect",
      "pyPromptClass": "MyCo-MyApp-Data-Subject",
      "pyDisplayLabel": "SimpleTableSelect",
      "pyJsonConfig": "{\"contextClass\":\"MyCo-MyApp-Data-Subject\",\"detailsDisplay\":[{\"config\":{\"label\":\"@L Address\",\"value\":\"@P .Address\"},\"type\":\"TextInput\"}],\"label\":\"@L Pick Subjects\",\"presets\":[{\"children\":[{\"children\":[{\"config\":{\"label\":\"@FL .Name\",\"labelOption\":\"default\",\"value\":\"@P .Name\"},\"type\":\"TextInput\"},{\"config\":{\"label\":\"@FL .Address\",\"labelOption\":\"default\",\"value\":\"@P .Address\"},\"type\":\"TextInput\"}],\"name\":\"Columns\",\"type\":\"Region\"}],\"config\":{},\"id\":\"P_\",\"label\":\"\",\"name\":\"presets\",\"template\":\"Table\"}],\"primaryField\":\".Address\",\"readonlyContextList\":\"@P .PickSubjects\",\"referenceList\":\"D_SubjectList\",\"referenceType\":\"Data\",\"rowHeader\":{\"config\":{\"label\":\"@FL .Name\",\"labelOption\":\"default\",\"value\":\"@P .Name\"},\"type\":\"TextInput\"},\"selectionKey\":\".pyGUID\",\"selectionList\":\".PickSubjects\",\"selectionMode\":\"multi\"}"
    },
    {
      "pxObjClass": "Pega-UI-Content-Region",
      "pyName": "Views",
      "pyPromptClass": "MyCo-MyApp-Data-Subject",
      "pyComponentName": "Region",
      "pyDisplayLabel": "Region",
      "pyContent": []
    }
  ],
  "pxViewMetadata": {
    "children": [
      {
        "type": "SimpleTableSelect",
        "config": {
          "contextClass": "MyCo-MyApp-Data-Subject",
          "detailsDisplay": [
            {
              "type": "TextInput",
              "config": {
                "label": "@L Address",
                "value": "@P .Address"
              }
            }
          ],
          "label": "@L Pick Subjects",
          "presets": [
            {
              "children": [
                {
                  "children": [
                    {
                      "type": "TextInput",
                      "config": {
                        "label": "@FL .Name",
                        "labelOption": "default",
                        "value": "@P .Name"
                      }
                    },
                    {
                      "type": "TextInput",
                      "config": {
                        "label": "@FL .Address",
                        "labelOption": "default",
                        "value": "@P .Address"
                      }
                    }
                  ],
                  "name": "Columns",
                  "type": "Region"
                }
              ],
              "config": {},
              "id": "P_",
              "label": "",
              "name": "presets",
              "template": "Table"
            }
          ],
          "primaryField": ".Address",
          "readonlyContextList": "@P .PickSubjects",
          "referenceList": "D_SubjectList",
          "referenceType": "Data",
          "rowHeader": {
            "type": "TextInput",
            "config": {
              "label": "@FL .Name",
              "labelOption": "default",
              "value": "@P .Name"
            }
          },
          "selectionKey": ".pyGUID",
          "selectionList": ".PickSubjects",
          "selectionMode": "multi"
        }
      },
      {
        "children": [],
        "name": "Views",
        "type": "Region"
      }
    ],
    "config": {
      "classKeys": [{"name": "pyGUID"}],
      "contextClass": "MyCo-MyApp-Data-Subject",
      "displayAs": "simpleTable",
      "isCreationOfNewRecordAllowedForReference": true,
      "localeReference": "@LR MYCO-MYAPP-DATA-SUBJECT!VIEW!EDIT_PICKSUBJECTS",
      "mode": "multiselect",
      "name": "PickSubjects",
      "parentContextClass": "MyCo-MyApp-Work-Case",
      "referenceList": "D_SubjectList",
      "ruleClass": "MyCo-MyApp-Data-Subject",
      "selectionMode": "multi",
      "template": "DataReference"
    },
    "name": "Edit_PickSubjects",
    "type": "View"
  },
  "pxContextMetadata": {
    "$properties": [],
    "$classesmetadata": [
      {"name": "MyCo-MyApp-Data-Subject", "fetchDefaultDataSources": true}
    ],
    "$pagelists": [
      {
        "$associated": [],
        "$properties": [".Address", ".Name", ".pyGUID"],
        "pagelist": ".PickSubjects",
        "$fields": [{"name": ".Address"}, {"name": ".Name"}]
      },
      {
        "metaDataOnly": true,
        "pagelist": "D_SubjectList"
      }
    ],
    "$fields": [],
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
