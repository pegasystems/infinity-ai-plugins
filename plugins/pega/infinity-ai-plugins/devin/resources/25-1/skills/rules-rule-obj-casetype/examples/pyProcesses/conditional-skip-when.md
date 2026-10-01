---
name: Conditional Skip When For Process
description: Process that is SKIPPED when a when-rule evaluates true (inverse of pyStartWhen). Uses pyWhenToSkip.
---

```json
{
  "pxFlowID": "FLOW1",
  "pyFlowName": "ManualReview",
  "pyLabel": "Manual Review",
  "pyStartType": "SEQUENTIAL",
  "pySkipOrAllowType": "when",
  "pyWhenToSkip": "AutoApproved",
  "pyLaunchOnReentry": "false"
}
```
