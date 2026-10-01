---
name: Sequential Basic
description: Process that starts only after preceding processes in the stage have completed. Used to enforce order within a multi-process stage.
---

```json
{
  "pxFlowID": "FLOW1",
  "pyFlowName": "QualityCheck",
  "pyLabel": "Quality Check",
  "pyStartType": "SEQUENTIAL",
  "pySkipOrAllowType": "always",
  "pyLaunchOnReentry": "false",
  "pyShowBackButton": "false"
}
```
