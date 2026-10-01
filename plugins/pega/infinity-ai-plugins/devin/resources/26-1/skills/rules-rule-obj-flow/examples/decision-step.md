---
name: flow-decision-step
description: 'Start → Decision (DataXOR) → End, End. Use when creating a flow that branches on a property comparison with WHEN/ELSE connectors.'
---

```json
{
  "pyFlowType": "Validate_Flow",
  "pyLabel": "Validate Flow",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyWorkClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Complex",
  "pyStartActivity": "Start1",
  "pyEndingActivities": ["End1", "End2"],
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start1",
      "pyToTasks": {
        "Decision1": {
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "Decision1"
        }
      }
    },
    {
      "pyFromTaskName": "Decision1",
      "pyToTasks": {
        "End1": {
          "pyID": "Transition2",
          "pyTaskStatusOrWhen": "WHEN",
          "pyTaskStatus": "IsApproved",
          "pyTaskWhen": "IsApproved",
          "pyLikelihood": "100",
          "pxSubscript": "End1"
        },
        "End2": {
          "pyID": "Transition3",
          "pyTaskStatusOrWhen": "ELSE",
          "pyTaskStatus": "",
          "pyTaskWhen": "",
          "pyLikelihood": "0.0",
          "pxSubscript": "End2"
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
        "pyCoordX": "0", "pyCoordY": "0.96",
        "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "Decision1": {
        "pxObjClass": "Data-MO-Gateway-Decision",
        "pyMOId": "Decision1",
        "pyFromMODefName": "Decision",
        "pyMOName": "IsApproved",
        "pyDecisionClass": "Data-MO-Gateway-DataXOR",
        "pyImplementation": "",
        "pyCoordX": "1.44", "pyCoordY": "0.96",
        "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End1",
        "pyFromMODefName": "End",
        "pyCoordX": "3.6", "pyCoordY": "0.96",
        "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "End2": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End2",
        "pyFromMODefName": "End",
        "pyCoordX": "1.68", "pyCoordY": "2.16",
        "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": {
        "pyMOId": "Transition1",
        "pyFrom": "Start1",
        "pyFromClass": "Data-MO-Event-Start",
        "pyTo": "Decision1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      },
      "Transition2": {
        "pyMOId": "Transition2",
        "pyFrom": "Decision1",
        "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "End1",
        "pyConditionType": "When",
        "pyExpression": "IsApproved",
        "pyMOName": "Yes",
        "pyUseCaseWorkType": "MyCase",
        "pyIsFork": "true",
        "pyLikelihood": "100"
      },
      "Transition3": {
        "pyMOId": "Transition3",
        "pyFrom": "Decision1",
        "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "End2",
        "pyConditionType": "Else",
        "pyExpression": "",
        "pyMOName": "No",
        "pyUseCaseWorkType": "MyCase",
        "pyIsFork": "true",
        "pyLikelihood": "0.0"
      }
    }
  }
}
```
