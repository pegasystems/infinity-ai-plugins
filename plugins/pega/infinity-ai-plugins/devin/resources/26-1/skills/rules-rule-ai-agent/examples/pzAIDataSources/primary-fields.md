---
name: pzAIDataSources entry - Primary fields
description: Embed-DataPage entry in pzAIDataSources that maps required InstanceKey to .pzInsKey and applies a post-load data transform.
---
```json
{
  "pyDPName": "D_pxGetPrimaryFieldsValue",
  "pyPageClass": "@baseclass",
  "pyCategory": "Primary fields",
  "pyApplyDataTransform": "pyMapPrimaryFieldsForAssignmentAgent",
  "pzRuleParametersShowSkills": "false",
  "pyDPParams": {
    "InstanceKey": ".pzInsKey"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamName": "InstanceKey",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1",
      "pyParametersParamInOut": "IN"
    }
  ]
}
```
