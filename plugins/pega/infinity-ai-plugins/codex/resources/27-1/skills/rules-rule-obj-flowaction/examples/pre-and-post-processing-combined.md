---
name: Combined Pre and Post Processing
description: Flow action using both pre-processing (activity to load data) and post-processing (data transform to set values, validation activity to check business rules, local action activity to execute). Demonstrates the full lifecycle hook chain.
---

```json
{
  "pyActionName": "ApproveTransfer",
  "pyLabel": "Approve Transfer",
  "pyDescription": "Loads account balances before display, then validates and records the transfer decision.",
  "pyClassName": "MyOrg-MyApp-Work-FundTransfer",
  "pyUsedAs": "LOCALANDCONNECTOR",
  "pyViewReference": "ApproveTransfer",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyPreProcessingActivity": "LoadAccountBalances",
  "pyPreProcessingTransformRule": "SetDefaultApprovalValues",
  "pyActionTransformRule": "RecordApprovalDecision",
  "pyValidateActivity": "ValidateSufficientFunds",
  "pyLocalActionActivity": "ExecuteFundTransfer",
  "pyAuditActivity": "Audit",
  "pyUpdateStatus": "true",
  "pyProposedStatus": "Pending-Execution",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "STANDARD"
}
```
