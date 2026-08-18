---
name: Queue Processor With Manual Alert Thresholds
description: Use this pattern only when pyIsAlertThresholdManuallyEnabled is true. Both pyLongRunningThreshold and pyLongRunningInterruptThreshold are mandatory.
---

```json
{
  "pyLabel": "Manual Threshold Processor",
  "pyPurpose": "ManualThresholdProcessor",
  "pyBaseClass": "<class-of-pyActivityName>",
  "pyActivityName": "ProcessQueueMessage",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyIsAlertThresholdManuallyEnabled": "true",
  "pyLongRunningThreshold": "2000",
  "pyLongRunningInterruptThreshold": "900000"
}
```