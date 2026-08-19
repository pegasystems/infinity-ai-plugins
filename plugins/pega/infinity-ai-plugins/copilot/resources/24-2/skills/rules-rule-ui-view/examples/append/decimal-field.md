---
name: "Append Decimal Field"
description: "Three-surface update-rule payload that appends a Decimal field. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Decimal",
            "pyComponentName": "Decimal",
            "pyDisplayLabel": "Decimal",
            "pyFieldReference": "TotalHours",
            "pyLabel": ".TotalHours",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".TotalHours",
            "pyValueWithoutAnnotation": ".TotalHours"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Decimal\",\"config\":{\"value\":\"@P .TotalHours\",\"label\":\"@FL .TotalHours\",\"labelOption\":\"default\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".ExistingProp\",\".TotalHours\"],\"$fields\":[{\"name\":\".ExistingProp\"},{\"name\":\".TotalHours\"}]}"
  }
}
```
