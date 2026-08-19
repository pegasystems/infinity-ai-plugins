---
name: Run as Specific Operator
description: QP activity executes under a named service operator — for downstream systems that require a specific caller identity.
---

```json
{
  "pyLabel": "Authorised Action Processor",
  "pyPurpose": "AuthorisedActionProcessor",
  "pyBaseClass": "<class-of-pyActivityName>",
  "pyActivityName": "RunAuthorisedAction",
  "pyProcessingMode": "Immediate",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyIsAutoTuneEnabled": "true",
  "pyIsEnabled": "true"
}
```

