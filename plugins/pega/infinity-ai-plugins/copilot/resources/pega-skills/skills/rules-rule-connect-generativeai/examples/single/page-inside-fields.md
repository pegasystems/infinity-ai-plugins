---
name: genai-single-page-inside-fields
description: Single-response connector with an embedded Page — child scalars addressed via .pyPage.pyChild dot notation. Modeled after pzGenerateApplicationManualTest.
---

```json
{
  "pyLabel": "GenerateTestScenario",
  "pyServiceName": "GenerateTestScenario",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Generates a single Cucumber-style test scenario; result is written to a single .pyCucumberScenario page with four scalar children.",
  "pyExpectedResponseEntity": "Single",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt"
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
          "pyValue": "0.4"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyCucumberScenario.pyTestCaseLevel"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyCucumberScenarioName"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyCucumberScenarioContent"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyPath"
    }
  ]
}
```
