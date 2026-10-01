---
name: With Process SLA
description: Process configured with a process-level SLA. pySLAType='Always' attaches the SLA rule named in pyStepSLA.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "ManagerReview",
  "pyLabel": "Manager Review",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "always",
  "pyLaunchOnReentry": "true",
  "pySLAType": "Always",
  "pyStepSLA": "ReviewDeadline"
}
```
