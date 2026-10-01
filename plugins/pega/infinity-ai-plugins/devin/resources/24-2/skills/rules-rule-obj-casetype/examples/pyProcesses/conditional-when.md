---
name: Conditional When
description: Process that runs only when a when-rule evaluates true. Uses pySkipOrAllowType='when' with pyStartWhen referencing the when-rule.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "CreateForm_Default",
  "pyLabel": "Create",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "when",
  "pyStartWhen": "CreatedViaUI",
  "pyLaunchOnReentry": "false",
  "pyShowBackButton": "false"
}
```
