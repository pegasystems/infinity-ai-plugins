---
name: "pxViewMetadata entry - Phone"
description: "pxViewMetadata children entry for a phone number field with country calling code datasource."
---

```json
{
  "type": "Phone",
  "config": {
    "datasource": {
      "fields": {
        "value": "@P .pyCallingCode"
      },
      "source": "@DATASOURCE D_pyCountryCallingCodeList.pxResults"
    },
    "value": "@P .PhoneNumber",
    "label": "@FL .PhoneNumber",
    "labelOption": "default",
    "messageConfig": {
      "content": "@L "
    }
  }
}
```
