---
name: Data Transform pyProperties SORT
description: Sort a page list by one or more properties. Sort criteria are defined in pySortActionPropList, not in child steps.
---

```json
{
  "pyActionName": "SORT",
  "pyPropertiesName": ".MyPageList",
  "pySortActionPropList": [
    {
      "pxObjClass": "Embed-ModelSortParams",
      "pyRelationNameSort": "DESCENDING",
      "pySortActionProp": ".Priority"
    },
    {
      "pxObjClass": "Embed-ModelSortParams",
      "pyRelationNameSort": "ASCENDING",
      "pySortActionProp": ".Name"
    }
  ]
}
```
