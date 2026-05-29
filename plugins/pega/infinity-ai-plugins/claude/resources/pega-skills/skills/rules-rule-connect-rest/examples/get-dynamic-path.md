---
name: GET Connector with Dynamic Path and Query Parameters
description: REST Connector GET with a dynamic {param} path segment, a query string parameter, and Accept header. Data-page-sourced; pyMapToKey uses DataSource.* per the response-landing-page contract.
---

```json
{
  "pyServiceName": "AddressLookup",
  "pyLabel": "AddressLookup",
  "pyClassName": "MyOrg-MyApp-Data-CustomerProfile",
  "pyEmbeddedURL": {
    "pyBaseURL": "https://api.addresslookup.example.com",
    "pyEndpointURL": "https://api.addresslookup.example.com",
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
        "pyParameterName": "addresses",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "addresses",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "{postalCode}",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "{postalCode}",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      }
    ],
    "pyQueryStringParameters": [
      {
        "pyParameterName": "format",
        "pyMapFrom": "PARAM",
        "pyMapFromKey": "responseFormat",
        "pyEmptyBehavior": "OMIT",
        "pyEncoding": "URL",
        "pyFirstItem": "true"
      }
    ]
  },
  "pyParameters": [
    {
      "pyParametersParamName": "postalCode",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1"
    },
    {
      "pyParametersParamName": "responseFormat",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0"
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
