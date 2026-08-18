---
name: genai-custom-with-parameters
description: GenAI connector with input parameters — accepts named STRING parameters passed by the caller (Activity or Flow).
---

```json
{
  "pyLabel": "GenerateDescriptionForTool",
  "pyServiceName": "GenerateDescriptionForTool",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Generates a description and examples given a tool name and context passed as parameters.",
  "pyExpectedResponseEntity": "Custom",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "true",
  "pySystemPromptName": "pyToolSystemPrompt",
  "pyPromptName": "pyGenerateToolDescription",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerateToolDescription",
    "pySystemPrompt": "pyToolSystemPrompt"
  },
  "pyGenAIConfig": {
    "pxObjClass": "Embed-GenAI-Config",
    "pyEnableLocalization": "false",
    "pyEnablePII": "false",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": [
        {
          "pxObjClass": "Embed-GenAI-Model-Parameters",
          "pyName": "temperature",
          "pyType": "float",
          "pyValue": "0.2"
        }
      ]
    }
  },
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "Name",
      "pyParametersParamType": "STRING"
    },
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "AdditionalContext",
      "pyParametersParamType": "STRING"
    }
  ],
  "pyResponseFields": [
    {
      "pyFieldName": ".pyResponseData"
    }
  ]
}
```
