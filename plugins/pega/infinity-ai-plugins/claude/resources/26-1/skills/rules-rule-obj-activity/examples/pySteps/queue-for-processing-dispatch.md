---
name: Queue-For-Processing Dispatch
description: Dispatch a work item to a named Queue Processor rule for immediate background processing
---

```json
{
  "pyStepsActivityName": "Queue-For-Processing",
  "pyStepsDescription": "Dispatch to dedicated Queue Processor",
  "pyStepsCallParams": {
    "QueueName": "MyQueueProcessorName",
    "QueueClass": "<applies-to-class-of-QP>",
    "QueueType": "DEDICATED",
    "ActivityName": "ProcessQueueMessage",
    "WorkPage": ""
  }
}
```
