---
name: Obj-Browse
description: Query database instances with row-based filter grid in pyParamArray.
---

```json
{
  "pyStepsActivityName": "Obj-Browse",
  "pyStepsDescription": "Browse appointments with filter and sort",
  "pyStepsCallParams": {
    "ObjClass": "MyOrg-MyApp-Work-MyCase",
    "PageName": "BrowsePage",
    "RowKey": ".pyID",
    "MaxRecords": "10",
    "GetRowKey": "true",
    "UseLightWeightList": "false",
    "Logic": ""
  },
  "pyParamArray": [
    {
      "Field": ".pyStatusWork",
      "Select": "true",
      "Condition": "Contains",
      "Value": "Param.StatusFilter",
      "Sort": "",
      "Label": ""
    },
    {
      "Field": ".pxCreateDateTime",
      "Select": "true",
      "Condition": "",
      "Value": "",
      "Sort": "A",
      "Label": ""
    },
    {
      "Field": ".pyLabel",
      "Select": "true",
      "Condition": "IsNotNull",
      "Value": "",
      "Sort": "",
      "Label": ""
    }
  ]
}
```
