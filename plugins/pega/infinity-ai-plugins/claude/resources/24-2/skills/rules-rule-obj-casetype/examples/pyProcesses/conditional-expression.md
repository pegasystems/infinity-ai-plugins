---
name: Conditional Expression
description: Process gated by an inline expression rather than a when-rule. Uses pySkipOrAllowType='expression'.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "ManagerEscalation",
  "pyLabel": "Escalate to Manager",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "expression",
  "pyExpressionToSkipOrAllow": ".Amount > 10000",
  "pyLaunchOnReentry": "false"
}
```
