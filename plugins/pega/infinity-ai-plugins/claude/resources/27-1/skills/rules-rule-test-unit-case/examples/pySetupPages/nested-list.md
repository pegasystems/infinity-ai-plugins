---
name: Nested PageList Data (CLIPBOARDPAGES)
description: Setup page with an embedded PageList -- pre-loads parent data with child records. Set pyTypeOfSetupPageSelection to "CLIPBOARDPAGES" at the test case level.
---

```json
[
  {
    "pySetupPageName": "RunRecordPrimaryPage",
    "pyPageDetails": {
      "pxObjClass": "MyOrg-MyApp-Data-Order",
      "pyLabel": "Test Order",
      "pyLineItems": [
        {
          "pxObjClass": "MyOrg-MyApp-Data-LineItem",
          "pyLabel": "Widget A",
          "pyQuantity": "2"
        },
        {
          "pxObjClass": "MyOrg-MyApp-Data-LineItem",
          "pyLabel": "Widget B",
          "pyQuantity": "5"
        }
      ]
    }
  }
]
```
