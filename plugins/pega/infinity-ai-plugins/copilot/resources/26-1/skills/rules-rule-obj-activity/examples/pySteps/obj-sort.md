---
name: Obj-Sort
description: Sort a pagelist by one or more properties
---

```json
{
  "pyStepsActivityName": "Obj-Sort",
  "pyStepsObjectName": "SearchResults",
  "pyStepsDescription": "Sort results by last name ascending, then date descending",
  "pyStepsCallParams": {
    "PageListProperty": ".pxResults",
    "Class": "MyOrg-MyApp-Data-Customer"
  },
  "pyParamArray": [
    {
      "SortProperty": ".pyLastName",
      "Descending": ""
    },
    {
      "SortProperty": ".pxCreateDateTime",
      "Descending": "true"
    }
  ]
}
```
