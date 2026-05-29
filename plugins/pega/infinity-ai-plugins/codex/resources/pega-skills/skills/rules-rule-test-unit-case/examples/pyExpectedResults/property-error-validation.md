---
name: Property Assertion (Error Validation)
description: Property assertion using 'has error with message' comparator to verify a specific validation error message. Based on real TC_ValidateValueIsLessThanThreshold test case.
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
      "pyComparator": "has error with message",
      "pyExpectedValue": "\"Maximum number of messages value is too small. The minimum value is 1.\"",
      "pyPropertyName": "pyMaxReadyToProcessStateMessages",
      "pyPropertyRealName": "pyMaxReadyToProcessStateMessages",
      "pyPropertyAbsolutePath": ".pyMaxReadyToProcessStateMessages",
      "pyPropertyMode": "Integer",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Work-MyCase",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyPageName": "RunRecordPrimaryPage",
      "pzListObjectClass": "MyOrg-MyApp-Work-MyCase"
    }
  ]
}
```
