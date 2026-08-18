---
name: "pyContent entry - Group"
description: "pyContent entry for a Group container (Pega-UI-Content-Group). Wraps fields with an optional heading, collapsibility, and instructions. Nests inside a ContentRegion's pyContent array."
---

```json
{
  "pxObjClass": "Pega-UI-Content-Group",
  "pyComponentName": "Group",
  "pyLabel": "New Group",
  "pyHeadingOption": "text",
  "pyShowHeading": true,
  "pyCollapsible": false,
  "pyExpanded": true,
  "pyVisibilityOption": "always",
  "pyInstructionsOption": "none",
  "pyInstructions": "none",
  "pyPromptClass": "MyCo-MyApp-Work-Case",
  "pyContent": [
    {
      "pxObjClass": "Pega-UI-Content-Field-Text",
      "pyComponentName": "TextInput",
      "pyFieldReference": "CaseName",
      "pyLabel": ".CaseName",
      "pyLabelOption": "field",
      "pyPromptClass": "MyCo-MyApp-Work-Case",
      "pyValue": ".CaseName",
      "pyValueWithoutAnnotation": ".CaseName"
    }
  ]
}
```
