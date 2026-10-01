---
name: pyRuleUnderTest for Data Page
description: "pyRuleUnderTest block for testing a data page (Rule-Declare-Pages). Special InsName format: bare uppercase name with no class prefix. Requires pyIsSinglePageImplementation."
---

```json
{
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyIsSinglePageImplementation": "true",
      "pyRuleUnderTestInsName": "D_PZPARAGRAPHCATEGORIES",
      "pyRuleUnderTestName": "D_pzParagraphCategories",
      "pyRuleUnderTestObjClass": "@baseclass",
      "pyRuleUnderTestType": "Rule-Declare-Pages"
    },
    "pyParameters": [
      {
        "pyParametersParamName": "FilterParam",
        "pyParametersParamValue": "\"SomeValue\""
      }
    ]
  }
}
```
