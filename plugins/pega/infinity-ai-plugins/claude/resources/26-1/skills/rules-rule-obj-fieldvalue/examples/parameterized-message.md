---
name: Parameterized Message
description: Field value with placeholder parameters -- pyLocalizedValue uses {1}, {2} placeholders substituted at runtime via pyFieldValueParams. Shows pyValue as parameter key and pyDefault as property reference.
---

```json
{
  "pyClassName": "@baseclass",
  "pyFieldName": "pyCaption",
  "pyFieldValue": "pyEnableMCPServiceFor",
  "pyLabel": "pyEnableMCPServiceFor",
  "pyLocalizedValue": "Enable MCP Service for {1}",
  "pyDescription": "Caption with parameterized application name",
  "pyFieldValueParams": [
    {
      "pyDefault": "Application.pyLabel",
      "pyValue": "1"
    }
  ]
}
```
