---
name: Post-Processing Activity
description: Flow action that uses a post-processing activity (pyLocalActionActivity) to execute logic after form submission — such as calling a service, setting derived values, or updating external systems. Based on the Collect Travel Details pattern.
---

```json
{
  "pyActionName": "SubmitClaimDetails",
  "pyLabel": "Submit Claim Details",
  "pyDescription": "Runs post-processing to set routing destination after user submits.",
  "pyClassName": "MyOrg-MyApp-Work-InsuranceClaim",
  "pyUsedAs": "LOCALANDCONNECTOR",
  "pyViewReference": "SubmitClaimDetails",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyLocalActionActivity": "SetClaimDestination",
  "pyAuditActivity": "Audit",
  "pyClientValidation": "false",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "STANDARD",
  "pyUpdateStatus": "false"
}
```
