---
name: CRUD Connector with Direct URL (Activity-Invoked)
description: Activity-invoked CRUD connector with a direct base URL and response header mapping for conditional update support. pyMapToKey targets the calling page (.pyResponseData). For data-page-sourced connectors (the typical case), use DataSource.pyResponseData instead — see references/request-response-mapping.
---

> **Invocation context:** This example is authored for **activity-invoked**
> use — `pyMapToKey` lands on the calling page. For data-page-sourced
> connectors (the typical case), substitute `DataSource.pyResponseData`
> for every `.pyResponseData` value. See
> `references/request-response-mapping` for the full contract.

```json
{
  "pyServiceName": "APICrudConnector",
  "pyLabel": "API CRUD Connector",
  "pyClassName": "MyOrg-MyApp-Data-APIResource",
  "pyDescription": "CRUD connector for managing API resources.",
  "pyEmbeddedURL": {
    "pyBaseURLSelectionType": "URL",
    "pyBaseURL": "https://api.example.com",
    "pyEndpointURL": "https://api.example.com"
  },
  "pyReadsOrRoutesToExternalSystem": "true",
  "pyGETRequestHeaders": [
    {
      "pyParameterName": "Accept",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    },
    {
      "pyParameterName": "If-Match",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": "Param.pyIfMatch",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyGETResponseHeaders": [
    {
      "pyParameterName": "etag",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": "Param.pyIfMatch",
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
  "pyPOSTRequestHeaders": [
    {
      "pyParameterName": "Content-Type",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPOSTRequestDataList": [
    {
      "pyParameterName": "Request Mapping",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": ".pyRequestBodyPOST",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPOSTResponseDataList": [
    {
      "pyParameterName": "Response Message",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": ".pyResponseData",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPUTRequestHeaders": [
    {
      "pyParameterName": "Content-Type",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    },
    {
      "pyParameterName": "If-Match",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": "Param.pyIfMatch",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPUTRequestDataList": [
    {
      "pyParameterName": "Request Message",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": ".pyRequestBodyPUT",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPUTResponseHeaders": [
    {
      "pyParameterName": "etag",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": "Param.pyIfMatch",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPUTResponseDataList": [
    {
      "pyParameterName": "Response Message",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": ".pyResponseData",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPATCHRequestHeaders": [
    {
      "pyParameterName": "Content-Type",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPATCHRequestDataList": [
    {
      "pyParameterName": "Request Message",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": ".pyRequestBodyPATCH",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyPATCHResponseDataList": [
    {
      "pyParameterName": "Response Message",
      "pyDataType": "string",
      "pyMapTo": "Clipboard",
      "pyMapToKey": ".pyResponseData",
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
