---
name: genai-single-nested-pagelist-deep
description: Single-response connector containing a top-level scalar plus a three-level-deep nested pagelist (.pyStages().pySteps().pyDynamicCaseFields()). Modeled after pzGetSuggestedAdhocCaseType.
---

```json
{
  "pyLabel": "SuggestAdhocCaseType",
  "pyServiceName": "SuggestAdhocCaseType",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Returns a single case-type proposal: a label plus a nested structure of stages -> steps -> dynamic case fields.",
  "pyExpectedResponseEntity": "Single",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyUseOpLocaleForResponse": "true",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt"
  },
  "pyGenAIConfig": {
    "pxObjClass": "Embed-GenAI-Config",
    "pyEnableLocalization": "true",
    "pyEnablePII": "false",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": [
        {
          "pxObjClass": "Embed-GenAI-Model-Parameters",
          "pyName": "temperature",
          "pyType": "float",
          "pyValue": "1.0"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyLabel"
    },
    {
      "pyFieldName": ".pyStages().pyStageName"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyStepName"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyStepType"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyDescription"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyDynamicCaseFields().pyLabel"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyDynamicCaseFields().pyDataType"
    },
    {
      "pyFieldName": ".pyStages().pySteps().pyDynamicCaseFields().pyDescription"
    }
  ]
}
```
