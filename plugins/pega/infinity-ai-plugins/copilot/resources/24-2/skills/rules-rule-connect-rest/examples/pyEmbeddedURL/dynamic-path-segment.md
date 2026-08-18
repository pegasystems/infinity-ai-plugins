---
name: Dynamic {param} URL path segment
description: REST Connector pyEmbeddedURL with a runtime placeholder path segment -- {param} via CONSTANT, valued by a matching pyParameters entry at the rule root.
---

```json
{
  "pyBaseURLSelectionType": "URL",
  "pyBaseURL": "https://api.example.com",
  "pyEndpointURL": "https://api.example.com",
  "pyResourcePathParameters": [
    {
      "pyParameterName": "v1",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "v1",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    },
    {
      "pyParameterName": "users",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "users",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    },
    {
      "pyParameterName": "{userId}",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "{userId}",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    }
  ],
  "pyQueryStringParameters": []
}
```
