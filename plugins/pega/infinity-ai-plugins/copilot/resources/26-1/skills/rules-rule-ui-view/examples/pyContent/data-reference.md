---
name: "pyContent entry - DataReference"
description: "pyContent entry for a Data Reference field (Pega-UI-Content-Field-Data-Reference). Links to a sub-view via pyJsonConfig. Requires $views entry in pxContextMetadata."
---

```json
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
```
