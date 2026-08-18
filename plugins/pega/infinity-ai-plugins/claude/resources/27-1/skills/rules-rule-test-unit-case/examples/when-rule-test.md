---
name: When Rule Decision Test
description: PegaUnit test for a When rule using Decision assertion with pyAllowMultipleInputCombinations. Decision assertion pyExpectedValue values are bare strings without inner quotes, including text-mode boolean-like results. No setup pages needed -- input rows provide the test data.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "TC_IsHighRiskMinimal",
  "pyLabel": "Test IsHighRiskMinimal When rule",
  "pyDescription": "Run and verify IsHighRiskMinimal when",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-WORK-MYCASE!ISHIGHRISKMINIMAL",
      "pyRuleUnderTestName": "IsHighRiskMinimal",
      "pyRuleUnderTestObjClass": "MyOrg-MyApp-Work-MyCase",
      "pyRuleUnderTestType": "Rule-Obj-When"
    }
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "Decision",
      "pyAllowMultipleInputCombinations": "true",
      "pyPropertyType": "Decision Result",
      "pyExpectedResults": [
        {
          "pyPageName": "rowLevelPage",
          "pyExpectedResults": [
            {
              "pyDisplayLabel": ".RiskLevel",
              "pyExpectedValue": "High",
              "pyPropertyAbsolutePath": ".RiskLevel",
              "pyPropertyMode": "text",
              "pyPropertyName": ".RiskLevel",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Result",
              "pyExpectedValue": "true",
              "pyPropertyAbsolutePath": "Result",
              "pyPropertyMode": "text",
              "pyPropertyName": "Result",
              "pyPropertyType": "result"
            }
          ]
        },
        {
          "pyPageName": "rowLevelPage",
          "pyExpectedResults": [
            {
              "pyDisplayLabel": ".RiskLevel",
              "pyExpectedValue": "Medium",
              "pyPropertyAbsolutePath": ".RiskLevel",
              "pyPropertyMode": "text",
              "pyPropertyName": ".RiskLevel",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Result",
              "pyExpectedValue": "false",
              "pyPropertyAbsolutePath": "Result",
              "pyPropertyMode": "text",
              "pyPropertyName": "Result",
              "pyPropertyType": "result"
            }
          ]
        }
      ]
    }
  ]
}
```
