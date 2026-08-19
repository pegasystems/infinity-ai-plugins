---
name: MCP Service with Multiple Categories
description: MCP service with multiple tools of different categories.
---

```json
{
  "pyClassName": "MyOrg-MyApp",
  "pyLabel": "Multi-Category Service",
  "pyServiceName": "MultiCategoryService",
  "pyDescription": "MCP service with tools spanning automation and data page categories.",
  "pyUsage": "Demonstrates tools with different category types.",
  "pzMCPTools": [
    {
      "pyPurpose": "pxGetCaseTypes",
      "pyCategory": "Rule-Obj-Activity"
    },
    {
      "pyPurpose": "pxListKnowledgeAgents",
      "pyCategory": "Rule-Declare-Pages"
    }
  ]
}
```
