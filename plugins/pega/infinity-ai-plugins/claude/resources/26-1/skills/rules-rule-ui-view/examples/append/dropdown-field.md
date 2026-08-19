---
name: "Append Dropdown Field"
description: "Three-surface update-rule payload that appends an associated Dropdown field. Shows $associated wiring in pxContextMetadata. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending. See pyContent/ and pxViewMetadata/ for other field types."
---

```json
{
  "updates": {
    "pyContent": [
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "Fields",
        "pyPromptClass": "MyCo-MyApp-Work-Case",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {},
          {
            "pxObjClass": "Pega-UI-Content-Field-Picklist",
            "pyComponentName": "Dropdown",
            "pyDatasource": ".",
            "pyDeferDatasource": "true",
            "pyDisplayLabel": "Picklist",
            "pyFieldReference": "Priority",
            "pyIsAssociated": "true",
            "pyJsonConfig": "{\"datasource\":\"@ASSOCIATED .Priority\"}",
            "pyLabel": ".Priority",
            "pyLabelOption": "field",
            "pyListType": "associated",
            "pyPlaceholder": "Select...",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".Priority",
            "pyValueWithoutAnnotation": ".Priority"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Dropdown\",\"config\":{\"datasource\":\"@ASSOCIATED .Priority\",\"deferDatasource\":true,\"label\":\"@FL .Priority\",\"labelOption\":\"default\",\"listType\":\"associated\",\"placeholder\":\"@L Select...\",\"value\":\"@P .Priority\"}}]}]}",
    "pxContextMetadata": "{\"$associated\":[{\"name\":\".Priority\",\"deferDatasource\":true}],\"$properties\":[\".Priority\"],\"$fields\":[{\"name\":\".Priority\"}]}"
  }
}
```
