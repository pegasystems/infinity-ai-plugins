---
name: Simple Table View
description: Full create payload for a SimpleTable editable multi-record list view — inline table backed by a PageList property with modal edit and column definitions.
---

Use this as the create payload when a view provides an editable table for a
PageList property (e.g., interview questions, line items). Derived from a real
editable Questions table.

Key characteristics:
- `pyTemplateName`: `SimpleTable`
- `pxViewType`: `"multirecordlist"`
- **No `pyContent`** — the entire structure is in `pxViewMetadata` and `pyJsonConfig`
- Columns are defined inside `config.children` (not as top-level `pxViewMetadata.children`)

> **`referenceList`** uses `@P .PropertyName` — a case PageList property
> (not a data page like `D_...`).

> **`editMode: "modal"` / `editModeConfig`** — controls how rows are
> added/edited. `editType: "action"` with `defaultAction: "pyEdit"` opens
> the row in a modal form.

> **`$pagelists` with `$actions`** — editable lists include an `$actions`
> array listing available actions (e.g., `{"name": "pyEdit"}`).

> **`dataRetrievalType: "MANUAL"`** — data comes from the case property,
> not from a data page query.

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "ConductInterview_Questions",
  "pyLabel": "Conduct interview - Questions",
  "pyClassName": "MyCo-MyApp-Work-Interview",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "SimpleTable",
  "pxViewType": "multirecordlist",
  "pyJsonConfig": "{\"type\":\"multirecordlist\",\"contextClass\":\"MyCo-MyApp-Data-Question\",\"referenceList\":\"@P .Questions\",\"targetClassLabel\":\"@L Question\",\"heading\":\"@L Questions\",\"name\":\"Questions\",\"renderMode\":\"Editable\",\"multiRecordDisplayAs\":\"table\",\"parentClass\":\"MyCo-MyApp-Work-Interview\",\"dataRetrievalType\":\"MANUAL\",\"propertyLabel\":\"@L Questions\",\"children\":[{\"name\":\"Columns\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .Question\",\"label\":\"@FL .Question\",\"labelOption\":\"default\"}},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .Answer\",\"label\":\"@FL .Answer\",\"labelOption\":\"default\"}}]}],\"editMode\":\"modal\",\"editModeConfig\":{\"defaultView\":\"Create\",\"editType\":\"action\",\"defaultAction\":\"pyEdit\",\"useSeparateActionForEdit\":false},\"tableFormat\":\"simple\"}",
  "pxViewMetadata": {
    "name": "ConductInterview_Questions",
    "type": "View",
    "config": {
      "type": "multirecordlist",
      "contextClass": "MyCo-MyApp-Data-Question",
      "referenceList": "@P .Questions",
      "targetClassLabel": "@L Question",
      "heading": "@L Questions",
      "name": "Questions",
      "ruleClass": "MyCo-MyApp-Work-Interview",
      "renderMode": "Editable",
      "multiRecordDisplayAs": "table",
      "template": "SimpleTable",
      "parentClass": "MyCo-MyApp-Work-Interview",
      "dataRetrievalType": "MANUAL",
      "propertyLabel": "@L Questions",
      "localeReference": "@LR MYCO-MYAPP-WORK-INTERVIEW!VIEW!CONDUCTINTERVIEW_QUESTIONS",
      "children": [
        {
          "name": "Columns",
          "type": "Region",
          "children": [
            {
              "type": "TextInput",
              "config": {
                "value": "@P .Question",
                "label": "@FL .Question",
                "labelOption": "default"
              }
            },
            {
              "type": "TextInput",
              "config": {
                "value": "@P .Answer",
                "label": "@FL .Answer",
                "labelOption": "default"
              }
            }
          ]
        }
      ],
      "editMode": "modal",
      "editModeConfig": {
        "defaultView": "Create",
        "editType": "action",
        "defaultAction": "pyEdit",
        "useSeparateActionForEdit": false
      },
      "tableFormat": "simple"
    }
  },
  "pxContextMetadata": {
    "$properties": [],
    "$classesmetadata": [
      {"name": "MyCo-MyApp-Data-Question", "fetchDefaultDataSources": true}
    ],
    "$pagelists": [
      {
        "$associated": [],
        "$properties": [".Answer", ".Question"],
        "$actions": [{"name": "pyEdit"}],
        "pagelist": ".Questions",
        "$fields": [{"name": ".Question"}, {"name": ".Answer"}]
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
