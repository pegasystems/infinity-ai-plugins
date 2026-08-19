---
name: Escalation Action — Call Activity (Run Activity)
description: Escalation action that posts a pulse message when the loan approval SLA is breached.
---

```json
{
  "pyActionSelect": "CallActivity",
  "pyStepActionSelect": "CallActivity",
  "pyActivityToRun": "pxPostMessage",
  "pyRuleNameProperty": ".pyActivityToRun",
  "pyRunActivityParams": {
    "Message": "Loan approval SLA breached - please review immediately",
    "Verb": "Post"
  }
}
```
