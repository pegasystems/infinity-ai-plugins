---
name: Delayed Queue Processor
description: Delayed mode QP — message delivery deferred by a duration stored on the work object.
---

```json
{
  "pyLabel": "Follow-Up Notification Processor",
  "pyPurpose": "FollowUpNotificationProcessor",
  "pyBaseClass": "<class-of-pyActivityName>",
  "pyActivityName": "SendFollowUpNotification",
  "pyProcessingMode": "Delayed",
  "pyIsDelayedProperty": "true",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyMaxThreads": "2",
  "pyMaxAttempts": "3",
  "pyInitialInterval": "5",
  "pyIntervalFactor": "2.0",
  "pyIsEnabled": "true"
}
```

