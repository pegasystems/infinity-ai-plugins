---
name: Static literal URL path segments
description: REST Connector pyEmbeddedURL with static path segments -- multiple CONSTANT entries forming a literal /v1/items path.
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
      "pyParameterName": "items",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "items",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    }
  ],
  "pyQueryStringParameters": []
}
```
