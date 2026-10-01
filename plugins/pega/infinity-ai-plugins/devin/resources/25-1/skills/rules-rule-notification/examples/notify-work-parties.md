---
name: Notify Work Parties
description: Use when recipients are stored as an embedded list of pages on the work object, such as case participants or parties. Contains a notification that sends via in-app gadget and email to every entry in the standard work parties list, with both operator ID and raw email address recipient mappings, advanced context parameters, and a message parameter.
---

```json
{
  "pyClassName": "Work-",
  "pyLabel": "Notify Work Parties",
  "pyPurpose": "NotifyWorkParties",
  "pyMessage": "pyAddPulsePost",
  "pyDescription": "Sends a notification to every party page held under .pyWorkParty.",
  "pyChannelsList": {
    "Email": {
      "pyCorrespondence": "pyAddPulsePost",
      "pySubject": "pyAddPulsePostEmailSubject"
    },
    "MobilePush": {
      "pyEnableChannel": "false"
    }
  },
  "pzRecipients": [
    {
      "pyRecipientContext": "PAGELIST",
      "pyDPClass": "Data-Party",
      "pyRecipientContextPage": ".pyWorkParty",
      "pyRecipientProperties": [
        {
          "pyNotificationRecipientType": "Operator",
          "pyNotificationRecipientProperty": ".pyUserIdentifier"
        },
        {
          "pyNotificationRecipientType": "Email",
          "pyNotificationRecipientProperty": ".pyEmail"
        }
      ]
    }
  ],
  "pyAdvancedParameters": [
    {
      "pyName": "WorkID",
      "pyValue": ".pzInsKey"
    }
  ],
  "pzMessageParameters": {
    "CaseID": ".pyID"
  },
  "pzOrderedMessageParams": ["CaseID"]
}
```
