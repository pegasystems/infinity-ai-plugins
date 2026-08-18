---
name: Property Assertion (Integer)
description: Property assertion with Integer mode -- numeric values must NOT use inner quotes. Based on real TC_ValidateAllFieldsMappedProperly test case.
---

```json
{
  "pyAssertionType": "Property",
  "pyStepPageClass": "MyOrg-MyApp-Work-MyCase",
  "pyStepPageMethodName": "PageExpression_1",
  "pyStepPageName": "RunRecordPrimaryPage",
  "pyStepPageNameActual": "RunRecordPrimaryPage",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "700000",
      "pyPropertyName": "pyLongRunningInterruptThreshold",
      "pyPropertyRealName": "pyLongRunningInterruptThreshold",
      "pyPropertyAbsolutePath": ".pyLongRunningInterruptThreshold",
      "pyPropertyMode": "Integer",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Work-MyCase",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyPageName": "RunRecordPrimaryPage",
      "pzListObjectClass": "MyOrg-MyApp-Work-MyCase"
    },
    {
      "pyAssertionType": "Property",
      "pyComparator": "Not exists",
      "pyPropertyName": "pyThreshold",
      "pyPropertyRealName": "pyThreshold",
      "pyPropertyAbsolutePath": ".pyAlertConfig(1).pyThreshold",
      "pyPropertyMode": "Integer",
      "pyPropertyApplyToClass": "Embed-Rule-AlertConfig",
      "pyClassName": "Embed-Rule-AlertConfig",
      "pyPageName": "RunRecordPrimaryPage.pyAlertConfig(1)",
      "pzListObjectClass": "MyOrg-MyApp-Work-MyCase"
    }
  ]
}
```
