---
name: "Append RichText Field"
description: "Three-surface update-rule payload that appends a RichText (WYSIWYG) field. RichText uses Pega-UI-Content-Field-Text-Paragraph — same class as TextArea. The difference is pyComponentName: RichText (not TextArea). pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pyComponentName": "RichText",
            "pyDisplayLabel": "Text (paragraph)",
            "pyFieldReference": "Notes",
            "pyLabel": ".Notes",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".Notes",
            "pyValueWithoutAnnotation": ".Notes"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"RichText\",\"config\":{\"value\":\"@P .Notes\",\"label\":\"@FL .Notes\",\"labelOption\":\"default\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".ExistingProp\",\".Notes\"],\"$fields\":[{\"name\":\".ExistingProp\"},{\"name\":\".Notes\"}]}"
  }
}
```
