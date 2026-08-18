---
name: "pyContent entry - RadioButtons"
description: "pyContent entry for a RadioButtons field (Pega-UI-Content-Field-Picklist with pyComponentName RadioButtons). Same pxObjClass as Dropdown but renders as radio buttons. Requires $associated entry in pxContextMetadata."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Picklist",
  "pyComponentName": "RadioButtons",
  "pyDatasource": ".",
  "pyDeferDatasource": "true",
  "pyFieldReference": "Priority",
  "pyIsAssociated": "true",
  "pyJsonConfig": "{\"datasource\":\"@ASSOCIATED .Priority\"}",
  "pyLabel": ".Priority",
  "pyLabelOption": "field",
  "pyListType": "associated",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyValue": ".Priority",
  "pyValueWithoutAnnotation": ".Priority"
}
```
