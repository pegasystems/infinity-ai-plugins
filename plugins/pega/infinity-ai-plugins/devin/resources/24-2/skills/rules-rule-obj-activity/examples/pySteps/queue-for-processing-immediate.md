---
name: Queue-For-Processing Immediate
description: Enqueue a message for immediate processing with WriteNow and Snapshot options
---

```json
{
  "pyStepsActivityName": "Queue-For-Processing",
  "pyStepsDescription": "Enqueue status update message",
  "pyStepsCallParams": {
    "Type": "StatusPushProcessor",
    "WriteNow": "true",
    "Snapshot": "true"
  }
}
```
