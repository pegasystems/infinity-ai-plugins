---
name: page-error-message
description: Use when testing a rule that adds a page-level error message such as Page-Set-Messages in activities. Shows the nested Page and Property assertion pattern for has error with message on RunRecordPrimaryPage.
---

```json
{
  "pyAssertionType": "Page",
  "pyCardApplyToClass": "Rule-RuleSet-Branch",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "has error with message",
      "pyExpectedValue": "\"branchID is required.\"",
      "pyPropertyAbsolutePath": "RunRecordPrimaryPage"
    }
  ]
}
```
