---
name: Property Assertion (DateTime)
description: Property assertion with DateTime mode -- values use Pega DateTime format in inner quotes. Based on real TC_CreateRevisionHappyPath test case.
---

```json
{
  "pyAssertionType": "Property",
  "pyStepPageClass": "@baseclass",
  "pyStepPageMethodName": "PageExpression_1",
  "pyStepPageName": "RunRecordPrimaryPage",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "\"20200520T091028.850 GMT\"",
      "pyPropertyName": "pxCreateDateTime",
      "pyPropertyRealName": "pxCreateDateTime",
      "pyPropertyAbsolutePath": ".pxCreateDateTime",
      "pyPropertyMode": "DateTime",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Work-MyCase",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyPageName": "RunRecordPrimaryPage",
      "pzListObjectClass": "@baseclass"
    },
    {
      "pyAssertionType": "Property",
      "pyComparator": "Not exists",
      "pyPropertyName": "pyStartDateTime",
      "pyPropertyRealName": "pyStartDateTime",
      "pyPropertyAbsolutePath": ".pyStartDateTime",
      "pyPropertyMode": "DateTime",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Work-MyCase",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyPageName": "RunRecordPrimaryPage",
      "pzListObjectClass": "@baseclass"
    }
  ]
}
```
