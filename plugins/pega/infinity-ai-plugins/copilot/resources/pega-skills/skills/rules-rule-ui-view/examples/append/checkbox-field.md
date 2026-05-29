---
name: "Append Checkbox Field"
description: "Three-surface update-rule payload that appends a Boolean/Checkbox field with caption wiring. IMPORTANT: Use Pega-UI-Content-Field-Text, NOT Pega-UI-Content-Field-Boolean — the Boolean class causes HTTP 500 on the Agentic Authoring API. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Text",
            "pyComponentName": "Checkbox",
            "pyFieldReference": "IsApproved",
            "pyValue": ".IsApproved",
            "pyValueWithoutAnnotation": ".IsApproved",
            "pyLabelOption": "text",
            "pyCaptionText": ".IsApproved",
            "pyCaptionOption": "field",
            "pyHideLabel": true,
            "pyTrueLabel": "Yes",
            "pyFalseLabel": "No",
            "pyPromptClass": "MyCo-MyApp-Work-Case"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Checkbox\",\"config\":{\"caption\":\"@FL .IsApproved\",\"captionOption\":\"default\",\"falseLabel\":\"@L No\",\"hideLabel\":true,\"label\":\"@L \",\"labelOption\":\"custom\",\"trueLabel\":\"@L Yes\",\"value\":\"@P .IsApproved\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".IsApproved\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".IsApproved\"}]}"
  }
}
```
