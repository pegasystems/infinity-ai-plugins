---
name: flow-screenflow
description: 'Start → Assignment (ScreenFlow) → End. Minimal valid ScreenFlow create payload.'
---

```json
{
  "pyFlowType": "CreateForm_Default",
  "pyLabel": "Create Form Default",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyWorkClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "ScreenFlow",
  "pyStructureType": "Simple",
  "pyStartActivity": "Start62",
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

      "pyFromTaskName": "Start62",
      "pyToTasks": {
        "AssignmentSF1": {


          "pxSubscript": "AssignmentSF1",
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyTaskStatus": "",
          "pyLikelihood": "100"
        }
      }
    },
    {

      "pyFromTaskName": "AssignmentSF1",
      "pyToTasks": {
        "End1": {


          "pxSubscript": "End1",
          "pyID": "Transition2",
          "pyTaskStatusOrWhen": "STATUS",
          "pyTaskStatus": "Create",
          "pyTaskWhen": "Create",
          "pyLikelihood": "100"
        }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start62": {
        "pxObjClass": "Data-MO-Event-Start-StartScreenFlow",
        "pxSubscript": "Start62",
        "pyMOId": "Start62",
        "pyFromMODefName": "Start",
        "pyCategory": "ScreenFlow",
        "pyFlowType": "ScreenFlowStandard",
        "pyScreenFlowHarness": "PerformScreenFlow",
        "pyStartingHarness": "New",
        "pySaveLater": "false",
        "pyAllowErrors": "false",
        "pyRouter": "ToCurrentOperator",
        "pyRouteTo": "Current operator",
        "pyCoordX": "0.16", "pyCoordY": "0.104",
        "pyWidth": "0.32", "pyHeight": "0.32"
      },
      "AssignmentSF1": {
        "pxObjClass": "Data-MO-Activity-Assignment-WorkAction",
        "pxSubscript": "AssignmentSF1",
        "pyMOId": "AssignmentSF1",
        "pyFromMODefName": "AssignmentSF",
        "pyMOName": "Create",
        "pyCategory": "ScreenFlow",
        "pyFlowAction": "Create",
        "pyHarnessPurpose": "PerformScreenFlow",
        "pyImplementation": "WorkList",
        "pyDisplayRouteTo": "USER",
        "pyOnlyGoingBack": "true",
        "pyShouldReload": "No",
        "pyDisplayLink": "true",
        "pyDisableLinkWhen": "isNotInFlowPath",
        "pyCallParams": {
          "ConfirmationNote": "",
          "DoNotPerform": "",
          "HarnessPurpose": "PerformScreenFlow",
          "Instructions": "",
          "StatusAssign": "",
          "StatusWork": ""
        },
        "pyLocalActionsPL": [{ "pyActionName": "" }],
        "pyModifierRefs": {},
        "pyNotifyProp": {
          "pxObjClass": "Data-MO-Activity-Notify",
          "pyImplementation": "",
          "pyCallParams": {}
        },
        "pyRouterProp": {
          "pxObjClass": "Data-MO-Activity-Router",
          "pyImplementation": "",
          "pyCallParams": {}
        },
        "pyCoordX": "2.4", "pyCoordY": "0.072",
        "pyWidth": "0.96", "pyHeight": "0.544"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pxSubscript": "End1",
        "pyMOId": "End1",
        "pyFromMODefName": "End",
        "pyCategory": "ScreenFlowStandard",
        "pyFlowType": "ScreenFlowStandard",
        "pyCoordX": "5.0", "pyCoordY": "0.104",
        "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": {
        "pxSubscript": "Transition1",
        "pyMOId": "Transition1",
        "pyFrom": "Start62",
        "pyTo": "AssignmentSF1",
        "pyConditionType": "Always",
        "pyConnectorType": "Transition",
        "pyFromClass": "Data-MO-Event-Start-StartScreenFlow",
        "pyFromMODefName": "Transition",
        "pyMOName": "[Always]",
        "pyLikelihood": "100",
        "pyIsFork": "false"
      },
      "Transition2": {
        "pxSubscript": "Transition2",
        "pyMOId": "Transition2",
        "pyFrom": "AssignmentSF1",
        "pyTo": "End1",
        "pyConditionType": "Action",
        "pyConnectorType": "Transition",
        "pyFromClass": "Data-MO-Activity-Assignment-WorkAction",
        "pyFromMODefName": "Transition",
        "pyMOName": "",
        "pyExpression": "Create",
        "pyCategory": "ScreenFlow",
        "pyLikelihood": "100",
        "pyIsFork": "false"
      }
    }
  }
}
```
