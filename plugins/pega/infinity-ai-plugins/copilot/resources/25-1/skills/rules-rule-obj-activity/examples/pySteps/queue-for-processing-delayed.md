---
name: Queue-For-Processing Delayed
description: Enqueue a message for background processing with a queue processor activity
---

```json
{
  "pyStepsActivityName": "Queue-For-Processing",
  "pyStepsDescription": "Enqueue follow-up notification for background processing",
  "pyStepsCallParams": {
    "QueueName": "FollowUpNotificationProcessor",
    "Activity": "ProcessFollowUpNotification",
    "Delay": ".pyFollowUpDelayMs",
    "WriteNow": "false"
  }
}
```
