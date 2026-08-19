---
name: StringBuffer-Append
description: Append values to a named string buffer
---

```json
{
  "pyStepsActivityName": "StringBuffer-Append",
  "pyStepsDescription": "Build XML schema element",
  "pyParamArray": [
    {
      "Buffer": "xsdContent",
      "Value": "\" <xs:element name=\\\"\" + .pyPropertyName + \"\\\">\""
    },
    {
      "Buffer": "xsdContent",
      "Value": "\" </xs:element>\""
    }
  ]
}
```
