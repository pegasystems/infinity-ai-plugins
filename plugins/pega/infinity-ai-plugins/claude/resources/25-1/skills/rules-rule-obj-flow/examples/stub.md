---
name: flow-stub
description: 'Start → End. Smallest valid FlowStandard create payload.'
---

```json
{
  "pyFlowType": "MyFlow",
  "pyLabel": "My Flow",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyWorkClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Simple",
  "pyStartActivity": "Start1",
  "pyDraftModeON": "false",
  "pyWorkPartiesRule": "Default",
  "pyConfirmChoice": "Harness",
  "pyConfirmHarness": "Confirm",
  "pyStartingHarness": "New",
  "pySkipNewHarness": "true",
  "pyNextAssignment": "true",
  "pyNextAssignmentAdhoc": "true",
  "pyOverlayView": "None",
  "pyEndingActivities": ["End1"],
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start1",
      "pyToTasks": {
        "End1": {


          "pxSubscript": "End1",
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyTaskStatus": "",
          "pyLikelihood": "100"
        }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start1": {
        "pxObjClass": "Data-MO-Event-Start",
        "pxSubscript": "Start1",
        "pyMOId": "Start1",
        "pyFromMODefName": "Start",
        "pyCoordX": "0.08", "pyCoordY": "0.096",
        "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pxSubscript": "End1",
        "pyMOId": "End1",
        "pyFromMODefName": "End",
        "pyCoordX": "2.08", "pyCoordY": "0.096",
        "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": {
        "pxSubscript": "Transition1",
        "pyMOId": "Transition1",
        "pyFrom": "Start1",
        "pyTo": "End1",
        "pyConditionType": "Always",
        "pyConnectorType": "Transition",
        "pyFromClass": "Data-MO-Event-Start",
        "pyFromMODefName": "Transition",
        "pyMOName": "[Always]",
        "pyLikelihood": "100",
        "pyIsFork": "false"
      }
    }
  }
}
```
