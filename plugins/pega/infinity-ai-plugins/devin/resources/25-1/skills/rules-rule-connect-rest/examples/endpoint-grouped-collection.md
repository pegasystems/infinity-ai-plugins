---
name: rest-endpoint-grouped-collection
description: "Load when building a REST connector for a Data Page's LIST/CREATE operations on a collection endpoint (no {id} in the path). GET-list + POST-create connector, SETTING-based URL and auth profile. See rest-endpoint-grouped-vs-single-connector for why this is grouped separately from the instance connector."
---

```json
{
  "pyServiceName": "Employee_LIST",
  "pyLabel": "Employee_LIST",
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
      }
    ]
  },
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
