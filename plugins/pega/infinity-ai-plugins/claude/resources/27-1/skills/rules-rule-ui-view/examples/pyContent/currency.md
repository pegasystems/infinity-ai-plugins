---
name: "pyContent entry - Currency"
description: "pyContent entry for a Currency field (Pega-UI-Content-Field-Decimal-Currency). Includes nested pyNumberDisplay for ISO code configuration. Use isoCodeSelection 'propertyRef' to read from a property, or 'constant' for system default."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Decimal-Currency",
  "pyComponentName": "Currency",
  "pyAllowDecimals": "true",
  "pyAlwaysShowISO": "false",
  "pyFieldReference": "TotalAmount",
  "pyLabel": ".TotalAmount",
  "pyLabelOption": "field",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyValue": ".TotalAmount",
  "pyValueWithoutAnnotation": ".TotalAmount",
  "pyNumberDisplay": {
    "pxObjClass": "Pega-UI-Content-Field-NumberDisplay",
    "pyCurrencyISOCode": ".Currency",
    "pyCurrencyISOCodeType": "propertyRef"
  }
}
```
