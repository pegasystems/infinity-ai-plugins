---
name: Case Status Details
description: Use when the notification message body, email subject, or push text contain dynamic values (such as case ID, stage, or status) that are filled in at runtime. Contains all three delivery channels each with their own independent parameter map, sending to case followers.
---

```json
{
  "pyClassName": "Work-",
  "pyLabel": "Case Status Details",
  "pyPurpose": "CaseStatusDetails",
  "pyMessage": "CaseStatusDetails",
  "pyDescription": "Case Status Details notification — recipients are case followers, contains basic case status information.",
  "pyChannelsList": {
    "Email": {
      "pyCorrespondence": "CaseStatusDetails",
      "pySubject": "CaseStatusDetails",
      "pzCorrSubjectParameters": {
        "CaseID": ".pyID",
        "Stage": ".pxCurrentStageLabel",
        "Status": ".pyStatusWork"
      },
      "pzOrderedEmailSubjectParams": ["CaseID", "Stage", "Status"]
    },
    "MobilePush": {
      "pyPushMessage": "CaseStatusDetails",
      "pzPushMessageParameters": {
        "CaseID": ".pyID",
        "Stage": ".pxCurrentStageLabel",
        "Status": ".pyStatusWork"
      },
      "pzOrderedPushMessageParams": ["CaseID", "Stage", "Status"]
    }
  },
  "pzRecipients": [
    {
      "pyRecipientContext": "DATAPAGE",
      "pyDPClass": "Data-Admin-Operator-ID",
      "pyRecipientDataPage": "D_pxGetCaseFollowers",
      "pyRecipientProperties": [
        {
          "pyNotificationRecipientType": "Operator",
          "pyNotificationRecipientProperty": ".pyUserIdentifier"
        }
      ],
      "pzRecipientDataPageParameters": {
        "WorkObjectID": ".pzInsKey"
      }
    }
  ],
  "pzMessageParameters": {
    "CaseID": ".pyID",
    "Stage": ".pxCurrentStageLabel",
    "Status": ".pyStatusWork"
  },
  "pzOrderedMessageParams": ["CaseID", "Stage", "Status"]
}
```
