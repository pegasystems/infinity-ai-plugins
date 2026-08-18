---
name: "Append Email Field"
description: "Three-surface update-rule payload that appends an Email field with messageConfig validation wiring. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Text-Email",
            "pyComponentName": "Email",
            "pyDisplayLabel": "Email",
            "pyFieldReference": "EmailAddress",
            "pyLabel": ".EmailAddress",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".EmailAddress",
            "pyValueWithoutAnnotation": ".EmailAddress",
            "pyFieldWarningMessage": "@L"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Email\",\"config\":{\"value\":\"@P .EmailAddress\",\"label\":\"@FL .EmailAddress\",\"labelOption\":\"default\",\"messageConfig\":{\"content\":\"@L \"}}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".EmailAddress\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".EmailAddress\"}]}"
  }
}
```
