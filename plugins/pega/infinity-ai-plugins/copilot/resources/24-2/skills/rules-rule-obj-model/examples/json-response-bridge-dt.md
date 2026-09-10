---
name: JSON Response Bridge DT (Clipboard Wrapper)
description: Clipboard-format wrapper Data Transform that bridges a data page response to a JSON-format DT via APPLY_MODEL. Wire this as pyResDataTransform on the data page — JSON DTs cannot be invoked directly by the data page framework because it does not populate their jsonData parameter.
---

```json
{
  "pyModelName": "Employee_Response_LIST",
  "pyLabel": "Employee Response LIST",
  "pyClassName": "Code-Pega-List",
  "pyDataModelFormat": "Clipboard",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "DataSource",
      "pyParametersParamType": "PAGE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0",
      "pyParametersParamDesc": "Connector step page containing .pyResponseData"
    }
  ],
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses",
      "pyPagesAndClassesPage": "DataSource",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Employee"
    }
  ],
  "pyProperties": [
    {
      "pxObjClass": "Embed-ModelParams",
      "pyActionName": "APPLY_MODEL",
      "pyPropertiesName": "Employee_Response_LISTJSON",
      "pyModelName": "Employee_Response_LISTJSON",
      "pyClassName": "Code-Pega-List",
      "pyPassCurrentParameterPage": "false",
      "pyPropertyStepId": "1",
      "pyParameters": [
        {
          "pxObjClass": "Embed-MethodParams",
          "pyParametersParamName": "jsonData",
          "pyParametersParamType": "STRING",
          "pyParametersParamValue": "DataSource.pyResponseData"
        },
        {
          "pxObjClass": "Embed-MethodParams",
          "pyParametersParamName": "executionMode",
          "pyParametersParamType": "STRING",
          "pyParametersParamValue": "\"DESERIALIZE\""
        }
      ]
    },
    {
      "pxObjClass": "Embed-ModelParams",
      "pyActionName": "WHEN",
      "pyDisabled": "true",
      "pyExpanded": "true",
      "pyPropertiesName": "pxDataPageHasErrors",
      "pyPropertyStepId": "2",
      "pyProperties": [
        {
          "pxObjClass": "Embed-ModelParams",
          "pyActionName": "APPLY_MODEL",
          "pyDisabled": "true",
          "pyPropertiesName": "pxErrorHandlingTemplate"
        }
      ]
    }
  ]
}
```
