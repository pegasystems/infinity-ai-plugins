---
name: "pzCheckBatchStopRequest"
description: "pzCheckBatchStopRequest: pzIsStopBatchProcess using [batchRunIdentifier]"
---

```json
{
  "purpose": "pzCheckBatchStopRequest",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzCheckBatchStopRequest",
    "pyCity": "pzCheckBatchStopRequest",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-DecisionEngine:BatchDecision).pzIsStopBatchProcess({batchRunIdentifier})",
    "pyEcho": "pzIsStopBatchProcess using [batchRunIdentifier]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-DecisionEngine",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "batchRunIdentifier",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "batchRunIdentifier",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamDefaultValue": "Param.batchRunIdentifier",
        "pyParametersParamValue": "Param.batchRunIdentifier"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "pzIsStopBatchProcess using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "batchRunIdentifier",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "batchRunIdentifier",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamDefaultValue": "Param.batchRunIdentifier",
        "pyReference": "2"
      }
    ],
    "pyLabel": "pzIsStopBatchProcess using[batchRunIdentifier]"
  },
  "pyCallParams": {
    "batchRunIdentifier": "Param.batchRunIdentifier"
  }
}
```
