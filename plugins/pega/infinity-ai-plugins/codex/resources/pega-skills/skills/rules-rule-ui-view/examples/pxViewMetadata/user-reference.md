---
name: "pxViewMetadata entry - UserReference"
description: "pxViewMetadata children entry for a user/operator reference field. Uses @USER annotation."
---

```json
{
  "type": "UserReference",
  "config": {
    "displayAs": "Search box",
    "label": "@FL .AssignedOperator",
    "labelOption": "default",
    "messageConfig": {
      "content": "@L "
    },
    "placeholder": "@L Select...",
    "referenceList": "D_pyC11nOperatorsList",
    "value": "@USER .AssignedOperator"
  }
}
```
