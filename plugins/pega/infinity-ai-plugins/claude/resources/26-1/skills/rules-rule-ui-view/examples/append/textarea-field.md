---
name: "Append TextArea Field"
description: "Three-surface update-rule payload that appends a TextArea (paragraph) field. TextArea uses Pega-UI-Content-Field-Text-Paragraph (not Pega-UI-Content-Field-Text which is for single-line TextInput). pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Text-Paragraph",
            "pyComponentName": "TextArea",
            "pyDisplayLabel": "Text (paragraph)",
            "pyFieldReference": "Description",
            "pyLabel": ".Description",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".Description",
            "pyValueWithoutAnnotation": ".Description"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"TextArea\",\"config\":{\"value\":\"@P .Description\",\"label\":\"@FL .Description\",\"labelOption\":\"default\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".ExistingProp\",\".Description\"],\"$fields\":[{\"name\":\".ExistingProp\"},{\"name\":\".Description\"}]}"
  }
}
```
