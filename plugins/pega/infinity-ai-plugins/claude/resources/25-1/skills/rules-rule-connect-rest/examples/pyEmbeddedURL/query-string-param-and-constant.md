---
name: Query string with PARAM and CONSTANT values
description: REST Connector pyEmbeddedURL with mixed query parameters — runtime business input as PARAM, fixed protocol options as CONSTANT. Prevents "required parameter is empty" failures from over-parameterized connectors.
---

```json
{
  "pyBaseURLSelectionType": "URL",
  "pyBaseURL": "https://nominatim.openstreetmap.org",
  "pyEndpointURL": "https://nominatim.openstreetmap.org/search",
  "pyResourcePathParameters": [
    {
      "pyParameterName": "search",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "search",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL"
    }
  ],
  "pyQueryStringParameters": [
    {
      "pyParameterName": "q",
      "pyMapFrom": "PARAM",
      "pyMapFromKey": "LocationText",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL",
      "pyFirstItem": "true"
    },
    {
      "pyParameterName": "format",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "jsonv2",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "NONE",
      "pyFirstItem": "false"
    },
    {
      "pyParameterName": "limit",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "1",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "NONE",
      "pyFirstItem": "false"
    },
    {
      "pyParameterName": "addressdetails",
      "pyMapFrom": "CONSTANT",
      "pyMapFromKey": "1",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "NONE",
      "pyFirstItem": "false"
    }
  ]
}
```
