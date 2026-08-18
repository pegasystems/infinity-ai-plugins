---
name: "Append DateTime Field"
description: "Three-surface update-rule payload that appends a DateTime field (date + time). Exported XML commonly shows Pega-UI-Content-Field-Date-Time — keep the fetched class name exactly as-is. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Date-Time",
            "pyComponentName": "DateTime",
            "pyFieldReference": "ScheduledAt",
            "pyLabel": ".ScheduledAt",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".ScheduledAt",
            "pyValueWithoutAnnotation": ".ScheduledAt"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"DateTime\",\"config\":{\"label\":\"@FL .ScheduledAt\",\"labelOption\":\"default\",\"value\":\"@P .ScheduledAt\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".ScheduledAt\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".ScheduledAt\"}]}"
  }
}
```
