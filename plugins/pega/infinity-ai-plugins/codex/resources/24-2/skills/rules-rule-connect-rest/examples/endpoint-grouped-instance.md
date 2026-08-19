---
name: rest-endpoint-grouped-instance
description: "Load when building a REST connector for a Data Page's LOOKUP/UPDATE/DELETE operations on a single-record endpoint (path includes {id}). GET-single + PATCH-update + DELETE connector, SETTING-based URL and auth profile. See rest-endpoint-grouped-vs-single-connector for why this is grouped separately from the collection connector."
---

```json
{
  "pyServiceName": "Employee_LOOKUP",
  "pyLabel": "Employee_LOOKUP",
  "pyClassName": "MyOrg-MyApp-Data-Employee",
  "pyIntegrationSystemId": "HRService",
  "pyHasEmbedUrl": "true",
  "pyEmbeddedURL": {
    "pyBaseURL": "https://api.hr-service.example.com/v1",
    "pyBaseURLSelectionType": "SETTING",
    "pyBaseURLSetting": "MyApp-HRService BaseURL",
    "pyResourcePathParameters": [
      {
        "pyParameterName": "employees",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "employees",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "{id}",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "{id}",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      }
    ]
  },
  "pyParameters": [
    {
      "pyParametersParamName": "id",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyGETRequestHeaders": [
    {
      "pyParameterName": "Accept",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyGETResponseDataList": [
    {
      "pyParameterName": "Response Message",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": ".pyResponseData",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyExecutionMode": "sync",
  "pyResponseTimeout": "30000",
  "pySSLProtocolVersion": "TLSv1.2",
  "pyAuthProfileSelectionType": "SETTING",
  "pyAuthenticationProfileForSetting": "MyApp-HRService AuthProfile",
  "pyHandlerFlow": "ConnectionProblem",
  "pyStatusValProperty": ".pyStatusValue",
  "pyStatusMsgProperty": ".pyStatusMessage"
}
```
