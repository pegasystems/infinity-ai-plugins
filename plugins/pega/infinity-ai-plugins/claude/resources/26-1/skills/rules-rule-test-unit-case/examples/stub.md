---
name: Stub Test Case
description: Minimal test case template -- smallest valid create payload. Fill in pyRuleUnderTest from pyRuleUnderTest/ examples, pyExpectedResults from pyExpectedResults/ examples, and pySetupPages from pySetupPages/ examples.
---

```json
{
  "pyClassName": "@baseclass",
  "pyPurpose": "TC_MyTestName",
  "pyLabel": "My Test Label",
  "pyDescription": "Verify that MyRuleName works as expected",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {}
  },
  "pySetupPages": [],
  "pyExpectedResults": [
    {
      "pyAssertionType": "",
      "pyExpectedResults": []
    }
  ]
}
```
