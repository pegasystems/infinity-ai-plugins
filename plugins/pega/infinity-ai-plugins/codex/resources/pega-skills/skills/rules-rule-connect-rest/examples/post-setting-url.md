---
name: POST Connector with SETTING URL
description: REST Connector POST using a Dynamic System Setting for the base URL, with request body mapping from clipboard and multiple request headers. Data-page-sourced; pyMapToKey uses DataSource.* per the response-landing-page contract.
---

```json
{
  "pyServiceName": "SendChatRequest",
  "pyLabel": "Send Chat Request",
  "pyClassName": "MyOrg-MyApp-Data-ChatProvider",
  "pyDescription": "Sends a chat completion request to a generative AI provider.",
  "pyEmbeddedURL": {
    "pyBaseURLSelectionType": "SETTING",
    "pyBaseURLSetting": "MyOrg-MyApp!pyChatServiceBaseURL",
    "pyNote": "https://chat-api.example.com/genai/",
    "pyResourcePathParameters": [
      {
        "pyParameterName": "chat",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "chat",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      },
      {
        "pyParameterName": "completions",
        "pyMapFrom": "CONSTANT",
        "pyMapFromKey": "completions",
        "pyEmptyBehavior": "REQUIRED",
        "pyEncoding": "URL"
      }
    ],
    "pyQueryStringParameters": []
  },
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
      "pyMapFromKey": ".pyToken",
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
      "pyMapToKey": "DataSource.pyResponseBodyPOST",
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
  "pyResponseTimeout": "180000",
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
