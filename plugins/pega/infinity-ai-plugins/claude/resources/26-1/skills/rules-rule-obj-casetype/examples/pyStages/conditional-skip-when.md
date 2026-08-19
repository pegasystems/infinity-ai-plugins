---
name: Conditional Skip When For Stage
description: Stage that is conditionally skipped based on a when-rule. Uses pySkipOrAllowType='when' with pySkipStageWhen referencing the rule.
---

```json
{
  "pyStageID": "PRIM2",
  "pyStageName": "Customer Data Sync - Export",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pySkipOrAllowType": "when",
  "pySkipStageWhen": "pySkipCustomerDataSyncExport",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "ExportCustomerData",
      "pyLabel": "Export",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
