---
name: Terminal Resolution
description: Final primary stage that resolves the case. Sets pyStageTransition='resolution', pyIsTerminalStage='true', a resolved status, and runs the cleanup process.
---

```json
{
  "pyStageID": "PRIM3",
  "pyStageName": "Completed",
  "pyStageTransition": "resolution",
  "pyStageWorkStatus": "Resolved-Completed",
  "pyIsTerminalStage": "true",
  "pyCleanupProcess": "true",
  "pyResolveChildCases": "true",
  "pyChildCaseStatus": "Resolved-Completed"
}
```
