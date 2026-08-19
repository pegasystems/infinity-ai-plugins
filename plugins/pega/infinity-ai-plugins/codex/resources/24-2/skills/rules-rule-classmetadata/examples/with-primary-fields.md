---
name: With Primary Fields
description: Work-class metadata defining Primary fields in pyPrimaryFields. Used to indicate that these properties are the most important fields for the case type identified by pyClassName — they drive Case Designer authoring, default view generation, and AI-assisted field placement.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPrimaryFields": [
    { "pyPropertyName": "pyID" },
    { "pyPropertyName": "pyLabel" },
    { "pyPropertyName": "pxUrgencyWork" },
    { "pyPropertyName": "pyStatusWork" },
    { "pyPropertyName": "MyCustomField" }
  ]
}
```
