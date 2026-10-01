---
name: Pre-Processing Activity
description: Flow action that uses a pre-processing activity (pyPreProcessingActivity) to load external data or perform complex initialization before the form renders.
---

```json
{
  "pyActionName": "ReviewCreditCheck",
  "pyLabel": "Review Credit Check",
  "pyDescription": "Calls external credit bureau API to load credit score before review.",
  "pyClassName": "MyOrg-MyApp-Work-LoanApplication",
  "pyUsedAs": "LOCALACTION",
  "pyViewReference": "ReviewCreditCheck",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyPreProcessingActivity": "FetchCreditScore",
  "pyAuditActivity": "Audit",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "NOHEADER"
}
```
