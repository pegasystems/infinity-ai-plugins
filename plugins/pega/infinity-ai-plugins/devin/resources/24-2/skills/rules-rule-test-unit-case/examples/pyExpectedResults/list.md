---
name: List Assertion
description: List assertion -- checks property values on items within a page list (e.g., report definition results).
---

```json
{
  "pyAssertionType": "List",
  "pyStepPageName": "NavigationList",
  "pyStepPageClass": "Code-Pega-List",
  "pyStepPageMethodName": "PageExpression_1_1",
  "pyStepPageNameActual": "pyReportContentPage",
  "pyCardApplyToClass": "Code-Pega-List",
  "pyListContext": ".pxResults",
  "pyNumberOfAppearances": "InAnyInstance",
  "pyPropertyApplyToClass": "Rule-Navigation",
  "pyDisableDelete": "false",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "\"VerifyNavRule\"",
      "pyPropertyName": "pyLabel",
      "pyPropertyRealName": "pyLabel",
      "pyPropertyAbsolutePath": ".pyLabel",
      "pyPropertyMode": "Text",
      "pyPropertyApplyToClass": "Rule-Navigation",
      "pyClassName": "Rule-Navigation",
      "pyPageName": "NavigationList",
      "pzListObjectClass": "Rule-Navigation"
    }
  ]
}
```
