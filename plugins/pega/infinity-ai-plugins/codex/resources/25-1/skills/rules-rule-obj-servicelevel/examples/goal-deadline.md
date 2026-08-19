---
name: Goal and Deadline
description: SLA with 1-day goal, 2-day deadline, and escalation tiers.
---

```json
{
  "pyLabel": "Review SLA",
  "pyServiceLevelName": "ReviewSLA",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyCalculateTimesFrom": "ASSIGNSTART",
  "pyMaxLateEvents": "1",
  "pyGoalDefaultDays": "1",
  "pyGoalDefaultHours": "0",
  "pyGoalDefaultMinutes": "0",
  "pyGoalDefaultSeconds": "0",
  "pyDeadlineDefaultDays": "2",
  "pyDeadlineDefaultHours": "0",
  "pyDeadlineDefaultMinutes": "0",
  "pyDeadlineDefaultSeconds": "0",
  "pyLateDefaultDays": "1",
  "pyLateDefaultHours": "0",
  "pyLateDefaultMinutes": "0",
  "pyLateDefaultSeconds": "0",
  "pyEscalations": {
    "Goal": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0"
    },
    "Deadline": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0"
    },
    "Late": {
      "pyDays": "0", "pyHours": "0", "pyMinutes": "0", "pySeconds": "0"
    }
  }
}
```
