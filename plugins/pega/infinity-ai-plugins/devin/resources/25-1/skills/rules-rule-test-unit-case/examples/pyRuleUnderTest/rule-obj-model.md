---
name: pyRuleUnderTest for Data Transform
description: pyRuleUnderTest block for testing a data transform (Rule-Obj-Model). Standard CLASS!RULENAME InsName format.
---

```json
{
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "@BASECLASS!MYDATATRANSFORMNAME",
      "pyRuleUnderTestName": "MyDataTransformName",
      "pyRuleUnderTestObjClass": "@baseclass",
      "pyRuleUnderTestType": "Rule-Obj-Model"
    },
    "pyParameters": [
      {
        "pyParametersParamName": "InputParam",
        "pyParametersParamType": "Text",
        "pyParametersParamValue": "\"SomeValue\""
      }
    ]
  }
}
```
