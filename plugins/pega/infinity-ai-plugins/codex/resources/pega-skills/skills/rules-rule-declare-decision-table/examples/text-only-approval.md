---
name: Text-Only Approval
description: 3 columns (all text), 3 rows, approval/gate workflow pattern.
---

### create-rule

```json
{
  "pyLabel": "Pass Quality Gate",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "PassQualityGate",
  "pyDescription": "Evaluates if the deliverable meets all quality gates and is ready for approval.",
  "pyDefaultResult": "Fail",
  "pyColumns": [
    {
      "pyProperty": ".ApprovalStatus",
      "pyPropertyLabel": "Approval Status",
      "pyColumnDataType": "text",
      "pyCondition": ["Approved", "Pending", "Approved"]
    },
    {
      "pyProperty": ".ReviewComments",
      "pyPropertyLabel": "Review Comments",
      "pyColumnDataType": "text",
      "pyCondition": ["Complete", "Complete", "Incomplete"]
    },
    {
      "pyProperty": ".ClientAcknowledgement",
      "pyPropertyLabel": "Client Acknowledgement",
      "pyColumnDataType": "text",
      "pyCondition": ["Yes", "Yes", "No"]
    }
  ],
  "pyResults": ["Pass", "Review", "Revise"]
}
```
