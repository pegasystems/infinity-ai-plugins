---
name: Conditional Skip Expression
description: Stage gated by an inline expression rather than a when-rule. Uses pySkipOrAllowType='expression' with pyExpressionToSkipOrAllow.
---

```json
{
  "pyStageID": "PRIM2",
  "pyStageName": "Manager Escalation",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Pending-Approval",
  "pyIsTerminalStage": "false",
  "pySkipOrAllowType": "expression",
  "pyExpressionToSkipOrAllow": ".Amount > 10000",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "ManagerEscalation",
      "pyLabel": "Escalate to Manager",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
