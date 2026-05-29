---
name: "Append Data Reference Field"
description: "Three-surface update-rule payload that appends a Data Reference field. Shows $views wiring and inheritedProps pattern. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending. See pyContent/ and pxViewMetadata/ for other field types."
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
            "pxObjClass": "Pega-UI-Content-Field-Data-Reference",
            "pyComponentName": "reference",
            "pyFieldReference": "Customer",
            "pyLabel": ".Customer",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyType": "Page",
            "pyTargetProperty": "Customer",
            "pyRequiredOption": "never",
            "pyRequiredValue": false,
            "pyJsonConfig": "{\"authorContext\":\".Customer\",\"name\":\"Edit_Customer\",\"referenceType\":\"Data\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"type\":\"view\"}"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"reference\",\"config\":{\"authorContext\":\".Customer\",\"inheritedProps\":[{\"prop\":\"label\",\"value\":\"@FL .Customer\"},{\"prop\":\"required\",\"value\":false}],\"name\":\"Edit_Customer\",\"referenceType\":\"Data\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"type\":\"view\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".Customer\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".Customer\"}],\"$views\":[{\"name\":\"Edit_Customer\",\"ruleClass\":\"MyCo-MyApp-Work-Case\"}]}"
  }
}
```
