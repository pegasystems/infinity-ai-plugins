---
name: "pyContent entry - Dropdown"
description: "pyContent entry for an associated Dropdown / Picklist field (Pega-UI-Content-Field-Picklist with pyComponentName Dropdown). Requires $associated entry in pxContextMetadata."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Picklist",
  "pyComponentName": "Dropdown",
  "pyDatasource": ".",
  "pyDeferDatasource": "true",
  "pyFieldReference": "Priority",
  "pyIsAssociated": "true",
  "pyJsonConfig": "{\"datasource\":\"@ASSOCIATED .Priority\"}",
  "pyLabel": ".Priority",
  "pyLabelOption": "field",
  "pyListType": "associated",
  "pyPlaceholder": "Select...",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyValue": ".Priority",
  "pyValueWithoutAnnotation": ".Priority"
}
```
