---
name: Timed Delay Assignment Ready
description: SLA with a 30-minute timed delay before the assignment becomes ready, and a 1-day goal.
---

```json
{
  "pyLabel": "Delayed Review SLA",
  "pyServiceLevelName": "DelayedReviewSLA",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyCalculateTimesFrom": "ASSIGNSTART",
  "pyNextActionSetting": "Calculate",
  "pyNextActionDays": "0",
  "pyNextActionHours": "0",
  "pyNextActionMinutes": "30",
  "pyNextActionSeconds": "0",
  "pyGoalDefaultDays": "1",
  "pyGoalDefaultHours": "0",
  "pyGoalDefaultMinutes": "0",
  "pyGoalDefaultSeconds": "0",
  "pyDeadlineDefaultDays": "0",
  "pyDeadlineDefaultHours": "0",
  "pyDeadlineDefaultMinutes": "0",
  "pyDeadlineDefaultSeconds": "0",
  "pyLateDefaultDays": "0",
  "pyLateDefaultHours": "0",
  "pyLateDefaultMinutes": "0",
  "pyLateDefaultSeconds": "0"
}
```
