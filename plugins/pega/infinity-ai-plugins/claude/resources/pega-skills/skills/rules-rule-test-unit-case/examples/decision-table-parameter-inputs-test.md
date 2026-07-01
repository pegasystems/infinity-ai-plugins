---
name: Decision Table Test with Parameter Inputs
description: Decision table test with parameter columns (param.X). Input rows must use the param token verbatim in pyDisplayLabel, pyPropertyName, and pyPropertyAbsolutePath.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "TC_DetermineRegionLabel",
  "pyLabel": "DetermineRegionLabel test",
  "pyDescription": "Run and verify DetermineRegionLabel decision table with following parameters, < : >",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-WORK-MYCASE!DETERMINEREGIONLABEL",
      "pyRuleUnderTestName": "DetermineRegionLabel",
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
          "pyPageName": "row_default",
          "pyExpectedResults": [
            {
              "pyDisplayLabel": "param.Locale",
              "pyPropertyAbsolutePath": "param.Locale",
              "pyPropertyMode": "text",
              "pyPropertyName": "param.Locale",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "param.Country",
              "pyPropertyAbsolutePath": "param.Country",
              "pyPropertyMode": "text",
              "pyPropertyName": "param.Country",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Result",
              "pyExpectedValue": "en-US (Default)",
              "pyPropertyAbsolutePath": "Result",
              "pyPropertyMode": "text",
              "pyPropertyName": "Result",
              "pyPropertyType": "result"
            }
          ]
        },
        {
          "pyPageName": "row_fr_FR",
          "pyExpectedResults": [
            {
              "pyDisplayLabel": "param.Locale",
              "pyExpectedValue": "fr",
              "pyPropertyAbsolutePath": "param.Locale",
              "pyPropertyMode": "text",
              "pyPropertyName": "param.Locale",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "param.Country",
              "pyExpectedValue": "FR",
              "pyPropertyAbsolutePath": "param.Country",
              "pyPropertyMode": "text",
              "pyPropertyName": "param.Country",
              "pyPropertyType": "input"
            },
            {
              "pyDisplayLabel": "Result",
              "pyExpectedValue": "fr-FR",
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
