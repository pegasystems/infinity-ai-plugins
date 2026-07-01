---
name: "pyContent entry - EmbeddedData PageList"
description: "pyContent entry for a PageList embedded data field (Pega-UI-Content-Field-Data-Embedded) delegated to a SimpleTable sub-view. Uses `authorContext` (not `context`) — this is the standard PageList pattern across Infinity 24/25/26. The sub-view must be a SimpleTable with `pxViewType: multirecordlist`. For Page (inline form), see embedded-data."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Data-Embedded",
  "pyComponentName": "reference",
  "pyFieldReference": "AddressList",
  "pyLabel": ".AddressList",
  "pyLabelOption": "field",
  "pyPromptClass": "MyCo-MyApp-Data-PartyData",
  "pyRuleName": "AddressData_AddressList_1",
  "pyRuleType": "view",
  "pyType": "PageList",
  "pyClassContext": "MyCo-MyApp-Data-Address",
  "pyJsonConfig": "{\"authorContext\":\".AddressList\"}"
}
```
