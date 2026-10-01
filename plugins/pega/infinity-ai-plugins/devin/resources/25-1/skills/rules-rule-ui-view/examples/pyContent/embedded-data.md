---
name: "pyContent entry - EmbeddedData"
description: "pyContent entry for a Page embedded data field (Pega-UI-Content-Field-Data-Embedded) rendered as an inline form. Uses `context` in pyJsonConfig — this is the standard Page pattern. For PageList (SimpleTable delegation), see embedded-data-pagelist. For nested page paths (e.g., .PartyDock.PartyData), pyPromptClass must be the intermediate class that defines the parent page property — not the view's top-level class."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Data-Embedded",
  "pyComponentName": "reference",
  "pyFieldReference": "Address",
  "pyLabel": "Shipping Address",
  "pyLabelOption": "text",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyRuleName": "AddressData_Address_1",
  "pyRuleType": "view",
  "pyType": "Page",
  "pyClassContext": "MyCo-MyApp-Data-Address",
  "pyJsonConfig": "{\"context\":\".Address\"}"
}
```
