---
name: "Append Phone Field"
description: "Three-surface update-rule payload that appends a Phone field with country calling code datasource wiring. Requires pyJsonConfig datasource in pyContent, datasource config in pxViewMetadata, and $pagelists entry for D_pyCountryCallingCodeList in pxContextMetadata. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Text-Phone",
            "pyComponentName": "Phone",
            "pyDisplayLabel": "Phone",
            "pyFieldReference": "PhoneNumber",
            "pyLabel": ".PhoneNumber",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".PhoneNumber",
            "pyValueWithoutAnnotation": ".PhoneNumber",
            "pyJsonConfig": "{\"datasource\":{\"fields\":{\"value\":\"@P .pyCallingCode\"},\"source\":\"@DATASOURCE D_pyCountryCallingCodeList.pxResults\"}}",
            "pyFieldWarningMessage": "@L"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Phone\",\"config\":{\"datasource\":{\"fields\":{\"value\":\"@P .pyCallingCode\"},\"source\":\"@DATASOURCE D_pyCountryCallingCodeList.pxResults\"},\"value\":\"@P .PhoneNumber\",\"label\":\"@FL .PhoneNumber\",\"labelOption\":\"default\",\"messageConfig\":{\"content\":\"@L \"}}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".PhoneNumber\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".PhoneNumber\"}],\"$pagelists\":[{\"$properties\":[\".pyCallingCode\"],\"pagelist\":\"D_pyCountryCallingCodeList.pxResults\"}]}"
  }
}
```
