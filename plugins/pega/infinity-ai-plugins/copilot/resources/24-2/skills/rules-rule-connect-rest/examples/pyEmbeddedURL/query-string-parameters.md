---
name: Query string parameters from PARAM and CLIPBOARD
description: REST Connector pyEmbeddedURL with multiple query string parameters -- PARAM-sourced and CLIPBOARD-sourced values, pyFirstItem on the first entry, pyEmptyBehavior SKIP and pyDefaultValue.
---

```json
{
  "pyBaseURLSelectionType": "URL",
  "pyBaseURL": "https://api.example.com",
  "pyEndpointURL": "https://api.example.com",
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
      "pyMapFromKey": "queryText",
      "pyEmptyBehavior": "REQUIRED",
      "pyEncoding": "URL",
      "pyFirstItem": "true"
    },
    {
      "pyParameterName": "limit",
      "pyMapFrom": "CLIPBOARD",
      "pyMapFromKey": ".pyResultLimit",
      "pyEmptyBehavior": "SKIP",
      "pyEncoding": "URL",
      "pyDefaultValue": "20",
      "pyFirstItem": "false"
    }
  ]
}
```
