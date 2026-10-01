---
name: Multi-Page Setup (CUSTOMPAGES)
description: Two setup pages -- an input data page and an error container. Shows how to pre-load multiple clipboard pages for a single test. Set pyTypeOfSetupPageSelection to "CUSTOMPAGES" at the test case level.
---

```json
[
  {
    "pySetupPageName": "InputPage",
    "pyPageDetails": {
      "pxObjClass": "MyOrg-MyApp-Data-MyClass",
      "pyCategory": "Premium",
      "pyAmount": "1500"
    }
  },
  {
    "pySetupPageName": "ErrorPage",
    "pyPageDetails": {
      "pxObjClass": "Code-Automation-Errors"
    }
  }
]
```
