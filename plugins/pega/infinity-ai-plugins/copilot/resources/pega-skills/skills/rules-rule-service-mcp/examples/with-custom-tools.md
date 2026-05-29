---
name: MCP Service with Custom Tools
description: MCP service with custom tools configured for case management and knowledge agent integration.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work",
  "pyLabel": "Application Agent Service",
  "pyServiceName": "AppAgentService",
  "pyDescription": "MCP service exposing case management and knowledge agent tools to external AI agents.",
  "pyUsage": "Used by /mcp service endpoint for AI agent integration.",
  "pzMCPTools": [
    {
      "pyPurpose": "pxGetCaseTypes",
      "pyCategory": "Rule-Obj-Activity"
    },
    {
      "pyPurpose": "pxCreateCaseWithAssignmentDetails",
      "pyCategory": "Rule-Obj-Activity"
    },
    {
      "pyPurpose": "pxPerformAssignment",
      "pyCategory": "Rule-Obj-Activity"
    },
    {
      "pyPurpose": "pxListKnowledgeAgents",
      "pyCategory": "Data page"
    },
    {
      "pyPurpose": "pxInvokeKnowledgeAgent",
      "pyCategory": "Data page"
    }
  ]
}
```
