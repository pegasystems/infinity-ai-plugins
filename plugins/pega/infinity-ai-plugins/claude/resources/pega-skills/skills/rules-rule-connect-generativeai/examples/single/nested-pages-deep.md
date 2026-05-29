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
  "pyImprovePrivacy": "true",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.4"
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
