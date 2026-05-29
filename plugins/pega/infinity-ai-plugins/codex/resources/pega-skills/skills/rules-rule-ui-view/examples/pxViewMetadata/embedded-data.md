---
name: "pxViewMetadata entry - EmbeddedData"
description: "pxViewMetadata children entry for a Page embedded data field (type 'reference') rendered as an inline form. Uses `context` — NOT `authorContext`. For PageList (SimpleTable delegation), see embedded-data-pagelist. Note: the server silently strips `displayAs` and `showLabel` on save — do not include them."
---

```json
{
  "type": "reference",
  "config": {
    "context": ".Address",
    "inheritedProps": [
      {"prop": "label", "value": "@L Shipping Address"}
    ],
    "name": "AddressData_Address_1",
    "ruleClass": "MyCo-MyApp-Work-Case",
    "type": "view"
  }
}
```
