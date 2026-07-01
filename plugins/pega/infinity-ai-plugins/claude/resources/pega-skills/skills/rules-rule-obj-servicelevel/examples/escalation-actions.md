---
name: Escalation Actions with CallActivity and When Rule
description: SLA with CallActivity escalation actions on Goal and Deadline, gated by a When rule, calling pxPostMessage with parameters.
---

```json
{
  "pyLabel": "Escalation Actions Demo",
  "pyServiceLevelName": "EscalationActionsDemo",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyCalculateTimesFrom": "ASSIGNSTART",
  "pyMaxLateEvents": "1",
  "pyGoalDefaultDays": "2",
  "pyGoalDefaultHours": "0",
  "pyGoalDefaultMinutes": "0",
  "pyGoalDefaultSeconds": "0",
  "pyDeadlineDefaultDays": "5",
  "pyDeadlineDefaultHours": "0",
  "pyDeadlineDefaultMinutes": "0",
  "pyDeadlineDefaultSeconds": "0",
  "pyLateDefaultDays": "1",
  "pyLateDefaultHours": "0",
  "pyLateDefaultMinutes": "0",
  "pyLateDefaultSeconds": "0",
  "pyEscalations": {
    "Goal": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0",
      "pyEscalationActions": [
        {
          "pyActionSelect": "CallActivity",
          "pyStepActionSelect": "CallActivity",
          "pyActivityToRun": "pxPostMessage",
          "pyRuleNameProperty": ".pyActivityToRun",
          "pyActionWhen": "MyWhenRule",
          "pyRunActivityParams": {
            "Message": "Goal SLA breached - please prioritize",
            "Verb": "Post"
          }
        }
      ]
    },
    "Deadline": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0",
      "pyEscalationActions": [
        {
          "pyActionSelect": "CallActivity",
          "pyStepActionSelect": "CallActivity",
          "pyActivityToRun": "pxPostMessage",
          "pyRuleNameProperty": ".pyActivityToRun",
          "pyActionWhen": "MyWhenRule",
          "pyRunActivityParams": {
            "Message": "Deadline SLA breached - immediate action required",
            "Verb": "Post"
          }
        }
      ]
    },
    "Late": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0"
    }
  }
}
```
