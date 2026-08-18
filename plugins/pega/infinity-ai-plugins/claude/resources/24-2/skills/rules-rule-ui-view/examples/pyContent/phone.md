---
name: "pyContent entry - Phone"
description: "pyContent entry for a phone number field (Pega-UI-Content-Field-Text-Phone with pyComponentName Phone). Requires country calling code datasource in pyJsonConfig."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Text-Phone",
  "pyComponentName": "Phone",
  "pyFieldReference": "PhoneNumber",
  "pyLabel": ".PhoneNumber",
  "pyLabelOption": "field",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyValue": ".PhoneNumber",
  "pyValueWithoutAnnotation": ".PhoneNumber",
  "pyJsonConfig": "{\"datasource\":{\"fields\":{\"value\":\"@P .pyCallingCode\"},\"source\":\"@DATASOURCE D_pyCountryCallingCodeList.pxResults\"}}",
  "pyFieldWarningMessage": "@L"
}
```
