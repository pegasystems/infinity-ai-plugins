---
name: Parameter Assertion
description: Property assertion targeting activity/data transform parameters using the Param.* prefix pattern.
---

```json
{
  "pyAssertionType": "Property",
  "pyStepPageName": "RunRecordPrimaryPage",
  "pyStepPageClass": "@baseclass",
  "pyStepPageMethodName": "PageExpression_1",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "\"ExpectedParamValue\"",
      "pyPropertyAbsolutePath": "Param.MyParameterName",
      "pyPropertyMode": "String",
      "pyPropertyName": "Param.MyParameterName"
    }
  ]
}
```
