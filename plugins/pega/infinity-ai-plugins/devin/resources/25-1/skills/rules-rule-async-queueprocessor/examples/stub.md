---
name: Stub Queue Processor
description: Minimal valid Queue Processor create payload — required fields only.
---

```json
{
  "pyLabel": "My Queue Processor",
  "pyPurpose": "MyQueueProcessor",
  "pyBaseClass": "<class-of-pyActivityName>",
  "pyActivityName": "ProcessQueueMessage",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyIsAutoTuneEnabled": "true"
}
```
