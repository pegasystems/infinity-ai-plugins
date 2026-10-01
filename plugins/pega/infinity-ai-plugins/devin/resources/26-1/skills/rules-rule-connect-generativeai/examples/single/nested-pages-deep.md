---
name: genai-single-nested-pages-deep
description: Single-response connector with multiple Page levels (page inside page inside fields), addressed via .pyOuter.pyInner.pyLeaf chained dots.
---

```json
{
  "pyLabel": "ExtractCustomerProfile",
  "pyServiceName": "ExtractCustomerProfile",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Extracts a single customer profile with nested contact and address pages. The contact page wraps phone and email; the address page (nested inside contact) wraps street/city/postal code.",
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
    "pyEnablePII": "true",
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
      "pyFieldName": ".pyCustomerName"
    },
    {
      "pyFieldName": ".pyContact.pyPhoneNumber"
    },
    {
      "pyFieldName": ".pyContact.pyEmailAddress"
    },
    {
      "pyFieldName": ".pyContact.pyAddress.pyStreet"
    },
    {
      "pyFieldName": ".pyContact.pyAddress.pyCity"
    },
    {
      "pyFieldName": ".pyContact.pyAddress.pyPostalCode"
    }
  ]
}
```
