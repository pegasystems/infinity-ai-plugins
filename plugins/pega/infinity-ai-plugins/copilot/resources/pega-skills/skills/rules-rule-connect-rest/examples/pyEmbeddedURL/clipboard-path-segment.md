---
name: URL path segment from a clipboard property
description: REST Connector pyEmbeddedURL with a clipboard-sourced path segment -- pyMapFrom CLIPBOARD with pyEncoding NONE for raw property values.
---

```json
{
  "pyBaseURLSelectionType": "URL",
  "pyBaseURL": "https://api.example.com",
  "pyEndpointURL": "https://api.example.com",
  "pyResourcePathParameters": [
    {
      "pyParameterName": "api",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "api",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    },
    {
      "pyParameterName": "accountId",
      "pyMapFrom": "CLIPBOARD",
      "pyMapFromKey": ".pyAccountId",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "NONE"
    }
  ],
  "pyQueryStringParameters": []
}
```
