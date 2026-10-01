---
name: Post-Processing Data Transform
description: Flow action that uses a post-processing data transform (pyActionTransformRule) to compute or set values after the user submits the form but before the case advances.
---

```json
{
  "pyActionName": "SubmitExpenseReport",
  "pyLabel": "Submit Expense Report",
  "pyDescription": "Calculates totals and sets approval routing after user submits expenses.",
  "pyClassName": "MyOrg-MyApp-Work-ExpenseReport",
  "pyUsedAs": "LOCALACTION",
  "pyViewReference": "SubmitExpenseReport",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyActionTransformRule": "CalculateExpenseTotals",
  "pyAuditActivity": "Audit",
  "pyUpdateStatus": "true",
  "pyProposedStatus": "Pending-Approval",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "NOHEADER"
}
```
