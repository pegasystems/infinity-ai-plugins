---
name: Activity Status Test
description: ActivityStatus assertion -- verifies the rule under test completed with a GOOD status. The most common single-assertion pattern for activities. Combine with Property, Page, or List assertions as needed (see pyExpectedResults examples).
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "TC_ActivityStatusCheck",
  "pyLabel": "Activity Status Check",
  "pyDescription": "Verify that MyActivityName completes with GOOD status",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-WORK-MYCASE!MYACTIVITYNAME",
      "pyRuleUnderTestName": "MyActivityName",
      "pyRuleUnderTestObjClass": "MyOrg-MyApp-Work-MyCase",
      "pyRuleUnderTestType": "Rule-Obj-Activity"
    }
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "ActivityStatus",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "GOOD",
      "pyStepPageClass": "MyOrg-MyApp-Work-MyCase",
      "pyStepPageName": "RunRecordPrimaryPage",
      "pyCardApplyToClass": "MyOrg-MyApp-Work-MyCase",
      "pyIsValidateStatusMsg": "false"
    }
  ]
}
```
