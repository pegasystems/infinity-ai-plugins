---
name: "pxViewMetadata entry - RadioButtons"
description: "pxViewMetadata children entry for a RadioButtons field. Same datasource wiring as Dropdown but renders as radio button group. Requires $associated entry in pxContextMetadata."
---

```json
{
  "type": "RadioButtons",
  "config": {
    "datasource": "@ASSOCIATED .Priority",
    "deferDatasource": true,
    "label": "@FL .Priority",
    "labelOption": "default",
    "listType": "associated",
    "value": "@P .Priority"
  }
}
```
