---
name: Obj-Filter
description: Filter a pagelist using When conditions
---

```json
{
  "pyStepsActivityName": "Obj-Filter",
  "pyStepsObjectName": "SearchResults",
  "pyStepsDescription": "Filter results to active customers only",
  "pyStepsCallParams": {
    "ListPage": ".pxResults",
    "ResultClass": "MyOrg-MyApp-Data-Customer"
  },
  "pyParamArray": [
    {
      "When": "IsActiveCustomer"
    }
  ]
}
```
