---
name: Queue-For-Agent
description: Enqueue work for an agent
---

```json
{
  "pyStepsActivityName": "Queue-For-Agent",
  "pyStepsDescription": "Queue for push notification delivery",
  "pyStepsCallParams": {
    "AgentRuleSet": "MyOrg-MyApp",
    "AgentName": "SendCorr",
    "MaxAttempts": "1",
    "MinimumAgeForProcessing": "0",
    "Deferred": "false"
  }
}
```
