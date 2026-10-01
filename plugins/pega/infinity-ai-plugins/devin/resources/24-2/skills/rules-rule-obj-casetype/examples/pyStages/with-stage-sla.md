---
name: With Stage SLA
description: Stage configured with a stage-level SLA via pySLAType='Always'. The actual goal/deadline intervals live in the referenced SLA rule.
---

```json
{
  "pyStageID": "PRIM1",
  "pyStageName": "Triage",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pySLAType": "Always",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "Triage",
      "pyLabel": "Triage",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
