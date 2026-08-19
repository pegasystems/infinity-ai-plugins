---
name: "pxViewMetadata entry - Dropdown"
description: "pxViewMetadata children entry for an associated Dropdown field. Uses @ASSOCIATED datasource binding."
---

```json
{
  "type": "Dropdown",
  "config": {
    "datasource": "@ASSOCIATED .Priority",
    "deferDatasource": true,
    "label": "@FL .Priority",
    "labelOption": "default",
    "listType": "associated",
    "placeholder": "@L Select...",
    "value": "@P .Priority"
  }
}
```
