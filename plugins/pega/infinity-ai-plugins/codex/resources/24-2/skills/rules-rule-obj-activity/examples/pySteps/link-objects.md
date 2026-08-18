---
name: Link-Objects
description: Create a link between two objects with link properties
---

```json
{
  "pyStepsActivityName": "Link-Objects",
  "pyStepsObjectName": "SourceCase",
  "pyStepsDescription": "Attach correspondence to the case",
  "pyStepsCallParams": {
    "LinkToPage": "pyCorrPage",
    "LinkClass": "MyOrg-MyApp-Data-LinkTarget",
    "LinkModel": "pyDefault",
    "LinkMemo": "Local.LinkMemo"
  },
  "pyParamArray": [
    {
      "LinkPageProperty": ".pyCategory",
      "LinkPageValue": "pyCorrPage.pyCategory"
    },
    {
      "LinkPageProperty": ".pyLabel",
      "LinkPageValue": "pyCorrPage.pyLabel"
    }
  ]
}
```
