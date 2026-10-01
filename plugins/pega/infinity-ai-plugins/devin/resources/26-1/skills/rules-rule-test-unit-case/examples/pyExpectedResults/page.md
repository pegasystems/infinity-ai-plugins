---
name: Page Assertion
description: Page assertion -- checks property values on a rule instance page loaded via setup pages.
---

```json
{
  "pyAssertionType": "Page",
  "pyStepPageName": "RH_1",
  "pyStepPageClass": "Rule-Obj-Activity",
  "pyStepPageMethodName": "PageExpression_1",
  "pyStepPageNameActual": "RH_1",
  "pyCardApplyToClass": "Rule-Obj-Activity",
  "pyDisableDelete": "false",
  "pyIsValidateStatusMsg": "false",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "true",
      "pyPropertyName": "pySecurityErrorType",
      "pyPropertyRealName": "pySecurityErrorType",
      "pyPropertyAbsolutePath": ".pySecurityErrorType",
      "pyPropertyMode": "Text",
      "pyPropertyApplyToClass": "Rule-Obj-Activity",
      "pyClassName": "Rule-Obj-Activity",
      "pyPageName": "RH_1",
      "pzListObjectClass": "Rule-Obj-Activity"
    }
  ]
}
```
