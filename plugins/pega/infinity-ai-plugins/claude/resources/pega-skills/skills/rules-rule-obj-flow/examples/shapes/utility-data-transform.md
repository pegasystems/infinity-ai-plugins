---
name: flow-shape-utility-data-transform
description: 'Use when adding a Utility (data transform) shape that runs a data transform via pzRunDataTransform.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Utility",
  "pxSubscript": "Utility1",
  "pyActivityType": "ACTIVITY",
  "pyActivityTypeSelector": "ACTIVITY",
  "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyFromMODefName": "Utility",
  "pyImplementation": "pzRunDataTransform",
  "pyMOId": "Utility1",
  "pyMOName": "Initialize Engagement Data",
  "pyRuleParamsStreamName": "pzRunDataTransform",
  "pzIsAPI": "true",
  "pyCallParams": {
    "DataTransformName": "InitializeEngagementData"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamDesc": "Name of the Data Transform",
      "pyParametersParamInOut": "IN",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "DataTransformName",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    }
  ],
  "pzRuleParamsHolder": {
    "pxObjClass": "MyOrg-MyApp-Work-MyCase",
    "pyRunDataTransform": "InitializeEngagementData"
  },
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyPageAliases": {},
  "pyRouterProp": {},
  "pyTicketShapes": [{ "pxObjClass": "Data-MO-Event-Exception" }]
}
```
