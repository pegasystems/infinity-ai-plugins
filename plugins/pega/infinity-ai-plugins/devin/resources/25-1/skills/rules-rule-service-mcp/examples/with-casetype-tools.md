---
name: MCP Service with Case Type Tools
description: MCP service with case type tools configured to expose specific case types as MCP tools.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-Case",
  "pyLabel": "Case Management Service",
  "pyServiceName": "CaseMgmtService",
  "pyDescription": "MCP service exposing case type tools for external AI agents to create and manage cases.",
  "pyUsage": "Exposes selected case types as MCP tools for agent-driven case creation.",
  "pzCaseTypeTools": [
    {
      "pyPurpose": "pxCreateServiceRequest",
      "pyCategory": "Rule-Obj-CaseType"
    },
    {
      "pyPurpose": "pxCreateIncident",
      "pyCategory": "Rule-Obj-CaseType"
    }
  ],
  "pzMCPTools": [
    {
      "pyPurpose": "pxGetCaseTypes",
      "pyCategory": "Rule-Obj-Activity"
    },
    {
      "pyPurpose": "pxPerformAssignment",
      "pyCategory": "Rule-Obj-Activity"
    }
  ]
}
```
