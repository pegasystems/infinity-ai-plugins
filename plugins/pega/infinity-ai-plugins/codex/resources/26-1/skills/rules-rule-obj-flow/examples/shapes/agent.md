---
name: flow-shape-agent
description: Use when adding an Agent smart shape to a flow. Invokes an existing Rule-AI-Agent.
---

```json
{
  "pxObjClass": "Data-MO-Activity-SubProcess-GenerativeAI",
  "pxSubscript": "GenerativeAISubProcess1",
  "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyFromMODefName": "GenerativeAISubProcess",
  "pyImplementation": "pzAsyncAgent",
  "pyMOId": "GenerativeAISubProcess1",
  "pyMOName": "Agent",
  "pyDefineFlowOn": "Current",
  "pySpinOff": "false",
  "pyStoreCompletedFlowPath": "false",
  "pyShouldReload": "No",
  "pyRuleParamsStreamName": "pzAIAgentSmartShapeUI",
  "pzIsAPI": "true",
  "pzRuleParametersShowSkills": "false",
  "pyCallParams": {
    "AIAgentInsName": "WORK-!PXCHATWITHYOURDOCUMENTS",
    "AIAgentName": "pxChatWithYourDocuments",
    "AIAgentPrompt": ".UserQuestion",
    "AIAgentResponse": ".AgentResponse",
    "ConvID": "",
    "NewConvID": "",
    "RunWithSynchronous": "false"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamDesc": "Agent name",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "AIAgentName",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Prompt to the Agent",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "AIAgentPrompt",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Response from Agent",
      "pyParametersParamInOut": "OUT",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "AIAgentResponse",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Agent insname",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "AIAgentInsName",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Existing Conversation ID",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "ConvID",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "New Conversation ID",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "NewConvID",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Run agent in synchronous",
      "pyParametersParamInOut": "",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamName": "RunWithSynchronous",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "BOOLEAN"
    }
  ],
  "pzRuleParamsHolder": {
    "pxObjClass": "Rule-AI-Agent",
    "pyAIAgentInsName": "WORK-!PXCHATWITHYOURDOCUMENTS",
    "pyAIAgentName": "pxChatWithYourDocuments",
    "pyAIAgentPrompt": ".UserQuestion",
    "pyAIAgentResponse": ".AgentResponse",
    "pyClassName": ""
  },
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyRouterProp": {
    "pxObjClass": "Data-MO-Activity-Router"
  },
  "pyTicketShapes": [
    {
      "pxObjClass": "Data-MO-Event-Exception"
    }
  ],
  "pyCoordX": "4.8",
  "pyCoordY": "0.8",
  "pyWidth": "0.96",
  "pyHeight": "0.48"
}
```
