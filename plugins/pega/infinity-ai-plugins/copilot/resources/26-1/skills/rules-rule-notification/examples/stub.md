---
name: Stub Notification
description: Use when creating a basic notification from scratch. Contains the minimum required fields — applies-to class, label, purpose (rule key), message reference, one in-app gadget delivery channel, and one recipient identified by their operator ID.
---

```json
{
  "pyClassName": "Work-",
  "pyLabel": "Case Assigned",
  "pyPurpose": "CaseAssigned",
  "pyMessage": "pyAddPulsePost",
  "pyChannelsList": {
    "Email": {
      "pyEnableChannel": "false"
    },
    "MobilePush": {
      "pyEnableChannel": "false"
    }
  },
  "pzRecipients": [
    {
      "pyRecipientProperties": [
        {
          "pyNotificationRecipientType": "Operator",
          "pyNotificationRecipientProperty": ".pyUserIdentifier"
        }
      ]
    }
  ]
}
```
