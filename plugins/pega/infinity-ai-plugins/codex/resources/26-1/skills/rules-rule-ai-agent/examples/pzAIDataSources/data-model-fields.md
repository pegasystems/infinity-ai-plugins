---
name: pzAIDataSources entry - Data model fields
description: Embed-DataPage entry in pzAIDataSources for D_pzDataModelFields with one required parameter and optional boolean flags.
---
```json
{
  "pyDPName": "D_pzDataModelFields",
  "pyPageClass": "Code-Pega-List",
  "pyCategory": "List of Data Model for the case type",
  "pzRuleParametersShowSkills": "false",
  "pyDPParams": {
    "ContextClass": ".pyClassName",
    "IncludeSystemFields": "false",
    "PrependCreateNewOption": "false"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamName": "ContextClass",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1",
      "pyParametersParamInOut": "IN"
    },
    {
      "pyParametersParamName": "SearchTerm",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "0",
      "pyParametersParamInOut": "IN"
    },
    {
      "pyParametersParamName": "IncludeSystemFields",
      "pyParametersParamType": "BOOLEAN",
      "pyParametersParamReq": "0",
      "pyParametersParamInOut": "IN"
    },
    {
      "pyParametersParamName": "PrependCreateNewOption",
      "pyParametersParamType": "BOOLEAN",
      "pyParametersParamReq": "0",
      "pyParametersParamInOut": "IN"
    }
  ]
}
```
