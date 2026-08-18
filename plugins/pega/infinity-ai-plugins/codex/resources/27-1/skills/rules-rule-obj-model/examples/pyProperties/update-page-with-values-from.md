---
name: Data Transform pyProperties UPDATE_PAGE with WITH_VALUES_FROM
description: Copy all properties from a source page to the target page. The source page name goes in pyPropertiesValue (no dot prefix); child pyProperties must be empty.
---

```json
{
  "pyActionName": "UPDATE_PAGE",
  "pyPropertiesName": ".CustomerInfo",
  "pyRelationNameUpdatepage": "WITH_VALUES_FROM",
  "pyPropertiesValue": "SourceCustomerPage",
  "pyExpanded": "true",
  "pyProperties": []
}
```
