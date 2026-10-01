---
name: Decision Assertion Test
description: Decision table test with triple-nested assertion structure. Decision assertion text-mode pyExpectedValue values are bare strings without inner quotes. Same structure applies to decision trees and declare expressions -- swap the pyRuleUnderTest block.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "TC_SampleTest",
  "pyLabel": "SampleTest",
  "pyDescription": "Run and verify VerifyDataCompleteness decision table with following parameters, < : >",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-WORK-MYCASE!VERIFYDATACOMPLETENESS",
      "pyRuleUnderTestName": "VerifyDataCompleteness",
      "pyRuleUnderTestObjClass": "MyOrg-MyApp-Work-MyCase",
      "pyRuleUnderTestType": "Rule-Declare-DecisionTable"
    }
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "Decision",
      "pyPropertyType": "Decision Result",
      "pyExpectedResults": [
        {
          "pyPageName": "rowLevelPage",
          "pyExpectedResults": [
            {
              "pyDisplayLabel": "Assessment Completeness",
              "pyPropertyAbsolutePath": ".AssessmentCompleteness",
              "pyPropertyMode": "decimal",
              "pyPropertyName": ".AssessmentCompleteness",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Analysis Score",
              "pyPropertyAbsolutePath": ".AnalysisScore",
              "pyPropertyMode": "decimal",
              "pyPropertyName": ".AnalysisScore",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Client Feedback",
              "pyExpectedValue": "30",
              "pyPropertyAbsolutePath": ".ClientFeedback",
              "pyPropertyMode": "text",
              "pyPropertyName": ".ClientFeedback",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Result",
              "pyExpectedValue": "Incomplete",
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
