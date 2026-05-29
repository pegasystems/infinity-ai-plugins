---
name: flow-shape-utility-data-transform-screenflow
description: 'Use when adding a Utility (data transform) shape to a ScreenFlow. Uses ScreenFlow-specific category stamps and verified pyCallParams/pzRuleParamsHolder fields that render correctly in Process Modeler.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Utility",
  "pxSubscript": "Utility1",
  "pyActivityType": "ACTIVITY",
  "pyActivityTypeSelector": "ACTIVITY",
  "pyCategory": "ScreenFlow",
  "pyFromMODefName": "Utility",
  "pyImplementation": "pzRunDataTransform",
  "pyMOId": "Utility1",
  "pyMOName": "Load Search Results",
  "pyRuleParamsStreamName": "pzRunDataTransform",
  "pzIsAPI": "true",
  "pyCallParams": {
    "DataTransformName": "LoadSearchResults"
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
    "pyRunDataTransform": "LoadSearchResults"
  },
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyPageAliases": {},
  "pyRouterProp": {},
  "pyTicketShapes": []
}
```
