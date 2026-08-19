---
name: Alternate Withdrawn
description: Alternate stage for withdrawal/cancellation. Uses ALT1 ID, resolution transition, and cascades cancellation to child cases.
---

```json
{
  "pyStageID": "ALT1",
  "pyStageName": "Withdrawn",
  "pyStageTransition": "resolution",
  "pyStageWorkStatus": "Resolved-Withdrawn",
  "pyIsTerminalStage": "true",
  "pyCleanupProcess": "true",
  "pyResolveChildCases": "true",
  "pyChildCaseStatus": "Resolved-Cancelled"
}
```
