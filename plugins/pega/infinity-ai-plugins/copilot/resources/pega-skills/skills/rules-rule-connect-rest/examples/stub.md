---
name: Stub REST Connector
description: REST Connector minimal GET with a static URL -- smallest valid create payload. Data-page-sourced; pyMapToKey uses DataSource.* per the response-landing-page contract.
---

```json
{
  "pyServiceName": "MyConnectorName",
  "pyLabel": "My Connector Name",
  "pyClassName": "MyOrg-MyApp-Data-MyDataType",
  "pyEmbeddedURL": {
    "pyBaseURL": "https://api.example.com",
    "pyEndpointURL": "https://api.example.com",
    "pyBaseURLSelectionType": "URL",
    "pyResourcePathParameters": [
      {
        "pyParameterName": "v1",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "v1",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "items",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "items",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      }
    ],
    "pyQueryStringParameters": []
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
      "pyMapToKey": "DataSource.pyResponseData",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyExecutionMode": "sync",
  "pyResponseTimeout": "10000",
  "pySSLProtocolVersion": "TLSv1.2",
  "pyResourceNameResolution": "JNDIName",
  "pyRESTProxyConfig": {
    "pyProxyAuthTypeSelection": "NO_AUTH"
  },
  "pyAuthProfileSelectionType": "AUTH_PROFILE",
  "pyHandlerFlow": "ConnectionProblem",
  "pyStatusValProperty": ".pyStatusValue",
  "pyStatusMsgProperty": ".pyStatusMessage"
}
```
