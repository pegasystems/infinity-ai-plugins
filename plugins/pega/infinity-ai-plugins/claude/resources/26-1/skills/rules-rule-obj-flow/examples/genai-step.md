---
name: flow-genai-step
description: 'Start → Utility (GenerativeAI) → End. Use when wiring a generative AI connector into a flow.'
---

```json
{
  "pyFlowType": "AIAnalysis_Flow",
  "pyLabel": "AI Analysis Flow",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyWorkClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Linear",
  "pyStartActivity": "Start1",
  "pyEndingActivities": ["End1"],
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start1",
      "pyToTasks": {
        "GenerativeAI1": {
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "GenerativeAI1"
        }
      }
    },
    {
      "pyFromTaskName": "GenerativeAI1",
      "pyToTasks": {
        "End1": {
          "pyID": "Transition2",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "End1"
        }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start1": {
        "pxObjClass": "Data-MO-Event-Start",
        "pyMOId": "Start1",
        "pyFromMODefName": "Start",
        "pyCoordX": "0.08", "pyCoordY": "0.096",
        "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "GenerativeAI1": {
        "pxObjClass": "Data-MO-Activity-Utility-GenerativeAI",
        "pyMOId": "GenerativeAI1",
        "pyFromMODefName": "GenerativeAI",
        "pyMOName": "Prepare Client Presentation",
        "pyActivityType": "ACTIVITY",
        "pyImplementation": "pxConnectToGenerativeAI",
        "pyServiceName": "PrepareClientPresentation",
        "pyRuleParamsStreamName": "pzGenAISmartShapeUI",
        "pzIsAPI": "true",
        "pyCallParams": {
          "pyServiceName": "PrepareClientPresentation"
        },
        "pyGenAIPage": {
          "pxObjClass": "Rule-Connect-GenerativeAI",
          "pyServiceName": "PrepareClientPresentation",
          "pyLabel": "Prepare Client Presentation",
          "pyReferExisting": "New"
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "Rule-Connect-GenerativeAI",
          "pyServiceName": "PrepareClientPresentation"
        },
        "pyCoordX": "1.6", "pyCoordY": "0.096",
        "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End1",
        "pyFromMODefName": "End",
        "pyCoordX": "3.6", "pyCoordY": "0.096",
        "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": {
        "pyMOId": "Transition1",
        "pyFrom": "Start1",
        "pyFromClass": "Data-MO-Event-Start",
        "pyTo": "GenerativeAI1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      },
      "Transition2": {
        "pyMOId": "Transition2",
        "pyFrom": "GenerativeAI1",
        "pyFromClass": "Data-MO-Activity-Utility-GenerativeAI",
        "pyTo": "End1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      }
    }
  }
}
```
