---
name: "pxViewMetadata entry - Group"
description: "pxViewMetadata children entry for a Group container (type 'Group'). Wraps fields with heading, collapsibility, and optional instructions."
---

```json
{
  "type": "Group",
  "config": {
    "collapsible": false,
    "heading": "@L New Group",
    "instructions": "none",
    "showHeading": true,
    "type": "any",
    "visibility": true
  },
  "children": [
    {
      "type": "TextInput",
      "config": {
        "label": "@FL .CaseName",
        "labelOption": "default",
        "value": "@P .CaseName"
      }
    }
  ]
}
```
