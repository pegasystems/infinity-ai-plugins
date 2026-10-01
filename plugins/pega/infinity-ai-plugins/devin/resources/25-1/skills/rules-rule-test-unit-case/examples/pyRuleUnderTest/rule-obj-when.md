---
name: pyRuleUnderTest for When Rule
description: pyRuleUnderTest block for testing a When condition (Rule-Obj-When). Standard CLASS!RULENAME InsName format.
---

```json
{
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "@BASECLASS!MYWHENCONDITION",
      "pyRuleUnderTestName": "MyWhenCondition",
      "pyRuleUnderTestObjClass": "@baseclass",
      "pyRuleUnderTestType": "Rule-Obj-When"
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
