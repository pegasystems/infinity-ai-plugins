---
name: Dropdown with Prompt List
description: Dropdown property with inline static values — requires pyStreamName, pyTableOption, and pyPromptTableList together.
---

```json
{
  "pyPropertyName": "Priority",
  "pyLabel": "Priority",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPropertyMode": "String",
  "pyStringType": "Text",
  "pyStreamName": "pxDropdown",
  "pyTableOption": "PromptList",
  "pyPromptTableList": [
    { "pyLocalizedValue": "Low",    "pyStandardValue": "Low"    },
    { "pyLocalizedValue": "Medium", "pyStandardValue": "Medium" },
    { "pyLocalizedValue": "High",   "pyStandardValue": "High"   }
  ],
  "pyDescription": "Case priority level — rendered as dropdown with inline values."
}
```
