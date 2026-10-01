---
name: flow-utility-data-transform
description: 'Start → Utility (data transform) → End. Use when wiring a data transform smart-shape into a flow.'
---

```json
{
  "pyFlowType": "Initialize_Flow",
  "pyLabel": "Initialize Flow",
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
        "Utility1": {
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "Utility1"
        }
      }
    },
    {
      "pyFromTaskName": "Utility1",
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
      "Utility1": {
        "pxObjClass": "Data-MO-Activity-Utility",
        "pyMOId": "Utility1",
        "pyFromMODefName": "Utility",
        "pyMOName": "InitializeCase",
        "pyCategory": "FlowStandard",
        "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
        "pyUseCaseWorkType": "MyCase",
        "pyImplementation": "pzRunDataTransform",
        "pyActivityType": "ACTIVITY",
        "pyActivityTypeSelector": "ACTIVITY",
        "pyAutomationAppliesTo": "",
        "pyUseCaseApplication": "",
        "pyUseCaseName": "",
        "pyPageAliases": [],
        "pzRuleParameters": [],
        "pyContextRefs": [],
        "pyRouterProp": { "pxObjClass": "Data-MO-Activity-Router" },
        "pyRuleParamsStreamName": "pzRunDataTransform",
        "pyCallParams": {
          "DataTransformName": "InitializeCase"
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "MyOrg-MyApp-Work-MyCase"
        },
        "pyTicketShapes": [
          { "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" }
        ],
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
        "pyTo": "Utility1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      },
      "Transition2": {
        "pyMOId": "Transition2",
        "pyFrom": "Utility1",
        "pyFromClass": "Data-MO-Activity-Utility",
        "pyTo": "End1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      }
    }
  }
}
```
