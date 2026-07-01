---
name: "Append UserReference Field"
description: "Three-surface update-rule payload that appends a UserReference (operator lookup) field. Uses @USER annotation (not @P) in pxViewMetadata. Requires $users entry and $pagelists entry for D_pyC11nOperatorsList with metaDataOnly:true in pxContextMetadata. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Text-UserReference",
            "pyComponentName": "UserReference",
            "pyDisplayLabel": "User Reference",
            "pyFieldReference": "AssignedOperator",
            "pyLabel": ".AssignedOperator",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".AssignedOperator",
            "pyValueWithoutAnnotation": ".AssignedOperator",
            "pyPlaceholder": "Select...",
            "pyJsonConfig": "{\"displayAs\":\"Search box\",\"referenceList\":\"D_pyC11nOperatorsList\",\"required\":\"\"}",
            "pyFieldWarningMessage": "@L"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"UserReference\",\"config\":{\"displayAs\":\"Search box\",\"label\":\"@FL .AssignedOperator\",\"labelOption\":\"default\",\"messageConfig\":{\"content\":\"@L \"},\"placeholder\":\"@L Select...\",\"referenceList\":\"D_pyC11nOperatorsList\",\"required\":\"\",\"value\":\"@USER .AssignedOperator\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".AssignedOperator\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".AssignedOperator\"}],\"$users\":[\".AssignedOperator\"],\"$pagelists\":[{\"metaDataOnly\":true,\"pagelist\":\"D_pyC11nOperatorsList\"}]}"
  }
}
```
