---
name: Multi Channel
description: A pyChannels array containing multiple channel entries inside a single stage. Each channel can host its own set of channel-scoped processes (matched via pyChannelName on Embed-StageProcess).
---

```json
{
  "pyChannels": [
    {
      "pyLabel": "Default",
      "pyShowChannel": "true",
      "pzChannelName": "Default"
    },
    {
      "pyLabel": "Web",
      "pyShowChannel": "true",
      "pzChannelName": "Web"
    },
    {
      "pyLabel": "Email",
      "pyShowChannel": "true",
      "pzChannelName": "Email"
    },
    {
      "pyLabel": "Mobile",
      "pyShowChannel": "true",
      "pzChannelName": "Mobile"
    }
  ]
}
```
