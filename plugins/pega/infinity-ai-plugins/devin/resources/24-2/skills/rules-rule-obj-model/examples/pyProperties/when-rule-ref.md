---
name: Data Transform pyProperties WHEN with when-rule reference
description: WHEN step that references a when-rule by name instead of an inline condition expression.
---

```json
{
  "pyActionName": "WHEN",
  "pyPropertiesName": "IsEligibleForAutoApproval",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyAutoApproved",
      "pyPropertiesValue": "true"
    }
  ]
}
```
