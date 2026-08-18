---
name: Data Page Test (Connector-Backed List)
description: Tests a connector-backed (live external API) list data page with a ResultCount-only assertion. Nested List assertions checking specific list-item property values may be fragile against connector-backed sources -- see rules-rule-test-unit-case's "Connector-backed Data Page assertions" note.
---

```json
{
  "pyClassName": "@baseclass",
  "pyPurpose": "TC_D_OnboardingAnnouncementList",
  "pyLabel": "D_OnboardingAnnouncementList",
  "pyDescription": "Run and verify D_OnboardingAnnouncementList data page against the live external API",
  "pyAddedClassName": "Code-Pega-List",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyIsSinglePageImplementation": "true",
      "pyRuleUnderTestInsName": "D_ONBOARDINGANNOUNCEMENTLIST",
      "pyRuleUnderTestName": "D_OnboardingAnnouncementList",
      "pyRuleUnderTestObjClass": "@baseclass",
      "pyRuleUnderTestType": "Rule-Declare-Pages"
    }
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "ResultCount",
      "pyCardApplyToClass": "Code-Pega-List",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "10",
      "pyFilterClass": "@baseclass",
      "pyListContext": ".pxResults",
      "pyPropertyApplyToClass": "@baseclass",
      "pyStepPageClass": "Code-Pega-List"
    }
  ]
}
```
