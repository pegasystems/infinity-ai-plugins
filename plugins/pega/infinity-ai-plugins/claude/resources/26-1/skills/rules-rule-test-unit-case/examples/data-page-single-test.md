---
name: Data Page Test (Single Object)
description: Tests a single-object data page with a parameter -- simplest data page test structure. From production TC_D_pxDisplayNameForEmail.
---

```json
{
  "pyClassName": "Work-Channel-Triage",
  "pyPurpose": "TC_D_pxDisplayNameForEmail",
  "pyLabel": "D_pxDisplayNameForEmail",
  "pyDescription": "Run and verify D_pxDisplayNameForEmail data page with following parameters, <EmailAddress : >",
  "pyAddedClassName": "Work-Channel-Triage",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyTempText": "pyNewResults",
    "pyDetails": {
      "pyIsSinglePageImplementation": "true",
      "pyRuleUnderTestInsName": "D_PXDISPLAYNAMEFOREMAIL",
      "pyRuleUnderTestName": "D_pxDisplayNameForEmail",
      "pyRuleUnderTestObjClass": "Work-Channel-Triage",
      "pyRuleUnderTestType": "Rule-Declare-Pages"
    },
    "pyParameters": [
      {
        "pyParametersParamName": "EmailAddress",
        "pyParametersParamValue": "sample@pega.com"
      }
    ]
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyStepPageClass": "Work-Channel-Triage",
      "pyExpectedResults": [
        {
          "pyAssertionType": "Property",
          "pyClassName": "Work-Channel-Triage",
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"sample\"",
          "pyPageName": "D_pxDisplayNameForEmail",
          "pyPropertyAbsolutePath": ".pyFromName",
          "pyPropertyApplyToClass": "Work-Channel-Triage",
          "pyPropertyMode": "Text",
          "pyPropertyName": "pyFromName"
        }
      ]
    }
  ]
}
```
