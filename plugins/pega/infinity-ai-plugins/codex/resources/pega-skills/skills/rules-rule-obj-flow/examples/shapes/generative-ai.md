---
name: flow-shape-generative-ai
description: 'Use when adding a Utility (generative AI) shape that invokes a Rule-Connect-GenerativeAI connector.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Utility-GenerativeAI",
  "pxSubscript": "GenerativeAI1",
  "pyActivityType": "ACTIVITY",
  "pyActivityTypeSelector": "ACTIVITY",
  "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyFromMODefName": "GenerativeAI",
  "pyImplementation": "pxConnectToGenerativeAI",
  "pyMOId": "GenerativeAI1",
  "pyMOName": "Analyze Engagement Setup",
  "pzIsAPI": "true",
  "pyCallParams": {},
  "pyContextRefs": [],
  "pyGenAIPage": {
    "pxObjClass": "Rule-Connect-GenerativeAI",
    "pyReferExisting": "Existing",
    "pyServiceName": "AnalyzeEngagementSetup"
  },
  "pyModifierRefs": {},
  "pyPageAliases": {},
  "pyRouterProp": {},
  "pyTicketShapes": [{ "pxObjClass": "Data-MO-Event-Exception" }],
  "pzRuleParamsHolder": {
    "pxObjClass": "Rule-Connect-GenerativeAI",
    "pyServiceName": "AnalyzeEngagementSetup"
  }
}
```
