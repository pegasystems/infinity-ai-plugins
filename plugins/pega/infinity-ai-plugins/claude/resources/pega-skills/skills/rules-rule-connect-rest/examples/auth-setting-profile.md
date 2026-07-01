---
name: Authenticated Connector with SETTING Auth Profile
description: REST Connector with SETTING-based URL and SETTING-based authentication profile, dynamic CLIPBOARD path parameter, and GET+POST methods with Authorization header. Data-page-sourced; pyMapToKey uses DataSource.* per the response-landing-page contract.
---

```json
{
  "pyServiceName": "AcquireResource",
  "pyLabel": "Acquire Resource",
  "pyClassName": "MyOrg-MyApp-Data-ExternalService",
  "pyDescription": "Acquires a resource from an authenticated external service.",
  "pyEmbeddedURL": {
    "pyBaseURLSelectionType": "SETTING",
    "pyBaseURLSetting": "MyOrg-MyApp!pyExternalServiceBaseURL",
    "pyNote": "https://api.external-service.example.com/",
    "pyResourcePathParameters": [
      {
        "pyParameterName": "api",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "api",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "v1",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "v1",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "accountId",
        "pyMapFrom": "CLIPBOARD",
        "pyMapFromKey": ".pyAccountId",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "NONE"
      },
      {
        "pyParameterName": "resources",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "resources",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      }
    ],
    "pyQueryStringParameters": []
  },
  "pyParameters": [
    {
      "pyParametersParamName": "resourceId",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "OUT",
      "pyParametersParamReq": "0",
      "pyParametersParamDesc": "ID of the acquired resource (output)"
    }
  ],
  "pyUseAuthentication": "true",
  "pyAuthProfileSelectionType": "SETTING",
  "pyAuthenticationProfileForSetting": "MyOrg-MyApp!pyExternalServiceAuthProfileReference",
  "pyGETRequestHeaders": [
    {
      "pyParameterName": "Accept",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    },
    {
      "pyParameterName": "Authorization",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": ".pyAuthToken",
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
  "pyPOSTRequestHeaders": [
    {
      "pyParameterName": "Content-Type",
      "pyDataType": "string",
      "pyMapFrom": "Constant",
      "pyMapFromKey": "application/json",
      "pyMappedPropertyReferenceAppliesTo": ""
    },
    {
      "pyParameterName": "Authorization",
      "pyDataType": "string",
      "pyMapFrom": "Clipboard",
      "pyMapFromKey": ".pyAuthToken",
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
      "pyMapToKey": "DataSource.pyResponseData",
      "pyMappedPropertyReferenceAppliesTo": ""
    }
  ],
  "pyExecutionMode": "sync",
  "pyResponseTimeout": "30000",
  "pySSLProtocolVersion": "TLSv1.2",
  "pyResourceNameResolution": "JNDIName",
  "pyRESTProxyConfig": {
    "pyProxyAuthTypeSelection": "NO_AUTH"
  },
  "pyHandlerFlow": "ConnectionProblem",
  "pyStatusValProperty": ".pyStatusValue",
  "pyStatusMsgProperty": ".pyStatusMessage"
}
```
