---
name: Guarded Action with Lifecycle Hooks
description: Flow action with pre-processing activity, validation, data transform, privilege guard, when guard, and status update. Shows how to override auto-filled defaults like pyUpdateStatus.
---

```json
{
  "pyActionName": "RejectWithComments",
  "pyLabel": "Reject with Comments",
  "pyDescription": "Rejects the request and prompts for rejection reason.",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyUsedAs": "LOCALACTION",
  "pyViewReference": "RejectWithComments",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyPreProcessingActivity": "LoadRejectionReasons",
  "pyActionTransformRule": "SetRejectionStatus",
  "pyValidateActivity": "ValidateRejectionReason",
  "pyAuditActivity": "Audit",
  "pyUpdateStatus": "true",
  "pyProposedStatus": "Resolved-Rejected",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "NOHEADER",
  "pyActionInstructions": "Please provide a reason for rejection.",
  "pxLimitedAccess": "Prod",
  "pyActionWhensList": [
    {
      "pyWhenName": "IsManagerRole"
    }
  ],
  "pyActionPrivilegeList": [
    {
      "pyPrivilegeName": "AllFlowActions",
      "pyPrivilegeClass": "Work-"
    }
  ]
}
```
