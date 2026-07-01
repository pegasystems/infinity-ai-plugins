---
name: Documentation Buddy-backed Tool
description: Buddy-backed tool that routes documentation questions to the internal platform buddy.
---

```json
{
  "pyClassName": "Work-PredictionStudio-Predictions",
  "pyLabel": "Get Documentation Details",
  "pyPurpose": "pzGetDocumentationDetails",
  "pyRuleName": "pzGetDocumentationDetails",
  "pyIntentDescription": "Purpose: Retrieves authoritative answers and official guidance from the Pega Documentation Buddy, including explanations of concepts, chart interpretations, root-cause analysis, and recommended best practices.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "What causes a Zero responses for Adaptive Model notification, and how can I fix it?"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "Work-PredictionStudio-Predictions",
    "pyBuddyType": "Internal",
    "pyCategory": "Buddy",
    "pyClassName": "Work-PredictionStudio-Predictions",
    "pyRuleName": "platform_buddy"
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "User Instructions for buddy",
      "pyParametersParamName": "question",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    }
  ]
}
```
