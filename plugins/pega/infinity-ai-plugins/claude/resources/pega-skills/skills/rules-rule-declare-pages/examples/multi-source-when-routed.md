---
name: Multi-Source Data Page (When-Routed with Always Fallback)
description: Data page with 3 conditional sources — two DataTransform sources gated by When rules and one Connector fallback using "Always". Demonstrates the When-routed multi-source pattern with parameter passing to When rules.
---

```json
{
  "pyPageName": "D_DeleteFile",
  "pyLabel": "Delete File",
  "pyDescription": "Deletes a file via the appropriate provider",
  "pyClassName": "MyOrg-MyApp-Data-File",
  "pyStructure": "page",
  "pyScope": "thread",
  "pyParameters": [
    {
      "pyParametersParamName": "fileID",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1",
      "pyParametersParamDesc": "The ID of the file to delete"
    },
    {
      "pyParametersParamName": "permanent",
      "pyParametersParamType": "TRUEORFALSE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0",
      "pyParametersParamDesc": "Whether to permanently delete"
    }
  ],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "DataTransform",
      "pyClassName": "MyOrg-MyApp-Data-File",
      "pyStructure": "page",
      "pyDTName": "VersioningNotSupported",
      "pySourceWhen": "IsVersionIDPresent",
      "pyPassCurrentParamPageForWhen": "true",
      "pyWhenParamList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "fileID",
          "pyValue": ""
        }
      ]
    },
    {
      "pyDeclarePagesDataSource": "Connector",
      "pyClassName": "MyOrg-MyApp-Data-File",
      "pyStructure": "page",
      "pyConnectorName": "DeleteFilePermanent",
      "pyConnectorClassName": "MyOrg-MyApp-Int-FileProvider",
      "pyConnectorList": "Rule-Connect-REST",
      "pyRESTMethod": "DELETE",
      "pyReqDataTransform": "DeleteFileRequest",
      "pyResDataTransform": "DeleteFileResponse",
      "pyPassCurrentParamPageForReqDT": "true",
      "pyPassCurrentParamPageForRespDT": "true",
      "pySourceWhen": "IsPermanentDelete",
      "pyPassCurrentParamPageForWhen": "true",
      "pyWhenParamList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "permanent",
          "pyValue": ""
        }
      ]
    },
    {
      "pyDeclarePagesDataSource": "DataTransform",
      "pyClassName": "MyOrg-MyApp-Data-File",
      "pyStructure": "page",
      "pyDTName": "DeleteFileRequestHandler",
      "pySourceWhen": "Always"
    }
  ]
}
```
