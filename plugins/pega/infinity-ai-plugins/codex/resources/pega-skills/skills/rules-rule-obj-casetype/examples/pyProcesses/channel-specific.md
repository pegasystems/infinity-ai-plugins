---
name: Channel Specific
description: Process bound to a specific channel via pyChannelName. Only runs when the case arrives through that channel.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "EmailIntake",
  "pyLabel": "Email Intake",
  "pyChannelName": "Email",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "always",
  "pyLaunchOnReentry": "false"
}
```
