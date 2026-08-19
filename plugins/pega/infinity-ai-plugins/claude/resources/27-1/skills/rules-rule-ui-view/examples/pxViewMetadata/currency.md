---
name: "pxViewMetadata entry - Currency"
description: "pxViewMetadata children entry for a Currency field. Supports two ISO code modes: 'propertyRef' (code from a property) or 'constant' (system default)."
---

```json
{
  "type": "Currency",
  "config": {
    "value": "@P .TotalAmount",
    "label": "@FL .TotalAmount",
    "labelOption": "default",
    "currencyISOCode": "@P .Currency",
    "isoCodeSelection": "propertyRef",
    "allowDecimals": true,
    "alwaysShowISOCode": false
  }
}
```
