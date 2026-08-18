---
name: Immediate Event-Driven Queue Processor
description: Immediate mode QP with Auto-Tune and retry config.
---

```json
{
  "pyLabel": "Status Push Processor",
  "pyPurpose": "StatusPushProcessor",
  "pyBaseClass": "<class-of-pyActivityName>",
  "pyActivityName": "PushStatusToExternal",
  "pyProcessingMode": "Immediate",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyIsAutoTuneEnabled": "true",
  "pyMaxAttempts": "3",
  "pyInitialInterval": "2",
  "pyIntervalFactor": "2.0",
  "pyMaxReadyToProcessStateMessages": "2000",
  "pyIsEnabled": "true"
}
```

