---
name: genai-list-pagelist-inside-pagelist
description: List-response connector where each list item itself contains a child pagelist, addressed via .pyChild().pyLeaf notation. Modeled after pzGetSuggestedStagesandSteps.
---

```json
{
  "pyLabel": "SuggestStagesAndSteps",
  "pyServiceName": "SuggestStagesAndSteps",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Suggests a list of case stages, where each stage carries an inner list of steps with name and type.",
  "pyExpectedResponseEntity": "List",
  "pyListName": ".pyStages",
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
      "pyFieldName": ".pyStageName"
    },
    {
      "pyFieldName": ".pySteps().pyStepName"
    },
    {
      "pyFieldName": ".pySteps().pyStepType"
    }
  ]
}
```
