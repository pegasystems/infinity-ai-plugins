---
name: "Append Text Field"
description: "Three-surface update-rule payload that appends a TextInput field. Shows the update pattern with {} no-op placeholders. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending. See pyContent/ and pxViewMetadata/ for other field types."
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
          {},
          {
            "pxObjClass": "Pega-UI-Content-Field-Text",
            "pyComponentName": "TextInput",
            "pyFieldReference": "AdditionalNotes",
            "pyLabel": ".AdditionalNotes",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".AdditionalNotes",
            "pyValueWithoutAnnotation": ".AdditionalNotes"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .AdditionalNotes\",\"label\":\"@FL .AdditionalNotes\",\"labelOption\":\"default\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".Status\",\".AdditionalNotes\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".Status\"},{\"name\":\".AdditionalNotes\"}]}"
  }
}
```
