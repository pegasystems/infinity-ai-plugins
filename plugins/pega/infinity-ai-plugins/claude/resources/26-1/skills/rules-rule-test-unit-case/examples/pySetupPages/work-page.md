---
name: Work Object on pyWorkPage (CLIPBOARDPAGES)
description: Pre-loads pyWorkPage with work case properties for testing rules that operate on the current case. Set pyTypeOfSetupPageSelection to "CLIPBOARDPAGES" at the test case level.
---

```json
[
  {
    "pySetupPageName": "pyWorkPage",
    "pyPageDetails": {
      "pxObjClass": "MyOrg-MyApp-Work-MyCase",
      "pyStatusWork": "Open",
      "pyLabel": "Test Case",
      "pyID": "W-1001",
      "pxCreateDateTime": "20240101T120000.000 GMT",
      "pxUrgencyWork": "10"
    }
  }
]
```
