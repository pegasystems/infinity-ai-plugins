---
name: "pxViewMetadata entry - EmbeddedData PageList"
description: "pxViewMetadata children entry for a PageList embedded data field delegated to a SimpleTable sub-view. Uses `authorContext` — NOT `context`. No `$views.context` entry needed. For Page (inline form), see embedded-data. Note: the server silently strips `displayAs`, `showLabel`, and `hideLabel` on save — do not include them."
---

```json
{
  "type": "reference",
  "config": {
    "authorContext": ".AddressList",
    "inheritedProps": [
      {"prop": "label", "value": "@FL .AddressList"}
    ],
    "name": "AddressData_AddressList_1",
    "ruleClass": "MyCo-MyApp-Data-PartyData",
    "type": "view"
  }
}
```
