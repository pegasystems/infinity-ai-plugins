---
name: pyRuleUnderTest for Report Definition
description: pyRuleUnderTest block for testing a report definition (Rule-Obj-Report-Definition). Standard CLASS!RULENAME InsName format.
---

```json
{
  "pyRuleUnderTest": {
    "pyTempText": "pyNewResults",
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-DATA-MYCLASS!MYREPORTDEFINITION",
      "pyRuleUnderTestName": "MyReportDefinition",
      "pyRuleUnderTestObjClass": "MyOrg-MyApp-Data-MyClass",
      "pyRuleUnderTestType": "Rule-Obj-Report-Definition"
    },
    "pyParameters": [
      {
        "pyParametersParamDesc": "Filter class",
        "pyParametersParamName": "FilterClass",
        "pyParametersParamType": "Text",
        "pyParametersParamValue": "\"Data-Portal\""
      }
    ]
  }
}
```
