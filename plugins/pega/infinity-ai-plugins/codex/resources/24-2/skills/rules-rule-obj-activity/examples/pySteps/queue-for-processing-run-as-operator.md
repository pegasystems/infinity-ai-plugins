---
name: Queue-For-Processing Run as Operator
description: Enqueue a message that executes under a specific operator context
---

```json
{
  "pyStepsActivityName": "Queue-For-Processing",
  "pyStepsDescription": "Enqueue action under service operator",
  "pyStepsCallParams": {
    "Type": "AuthorisedActionProcessor",
    "UseCurrentOperatorId": "false",
    "AccessGroup": "MyOrg-MyApp:Administrators"
  }
}
```
