---
name: flow-assignment-step
description: 'Start → Assignment (worklist) → End. Use when creating a flow that routes work to an operator worklist with a flow action.'
---

```json
{
  "pyFlowType": "Review_Flow",
  "pyLabel": "Review Flow",
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
        "Assignment1": {
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "Assignment1"
        }
      }
    },
    {
      "pyFromTaskName": "Assignment1",
      "pyToTasks": {
        "End1": {
          "pyID": "Transition2",
          "pyTaskStatusOrWhen": "STATUS",
          "pyTaskStatus": "ReviewComplete",
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
      "Assignment1": {
        "pxObjClass": "Data-MO-Activity-Assignment",
        "pyMOId": "Assignment1",
        "pyFromMODefName": "Assignment",
        "pyMOName": "ReviewComplete",
        "pyCategory": "FlowStandard",
        "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
        "pyUseCaseWorkType": "MyCase",
        "pyUseCaseApplication": "MyApp",
        "pyUseCaseName": "ReviewComplete",
        "pyImplementation": "WorkList",
        "pyRouterProp": {
          "pxObjClass": "Data-MO-Activity-Router",
          "pyImplementation": "ToCurrentOperator",
           "pyIsCustomRouter": "false",
           "pyInLane": "false",
           "pyMOName": "",
          "pyCallParams": { "CheckAvailability": "" },
          "pzRuleParameters": [
            {
              "pxObjClass": "Embed-MethodParams",
              "pyParametersParamInOut": "IN",
              "pyParametersParamIntelliBaseClass": "PageClass",
              "pyParametersParamSize": "0",
              "pyParametersParamType": "STRING"
            }
          ]
        },
        "pyDisplayRouteTo": "USER",
        "pyRouteTo": "Current operator",
        "pyViewPolicy": "USE_CASE_POLICY",
        "pySLA": "",
        "pySLAType": "Never",
        "pyEffortCost": "",
        "pyHarnessPurpose": "",
        "pyActivityTypeSelector": "",
        "pyAutomationAppliesTo": "",
        "pyWorkStatus": "",
        "pyContextRefs": [],
        "pySkipAssignmentParams": [],
        "pyLocalActionsPL": [
          { "pxObjClass": "Embed-Pega-AssignAction", "pyActionName": "" }
        ],
        "pyNotifyProp": {
          "pxObjClass": "Data-MO-Activity-Notify",
          "pyImplementation": "",
          "pyMOName": "",
          "pyCallParams": {}
        },
        "pzRuleParameters": [
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "CheckAvailability",
            "pyParametersParamDesc": "Check the operator's availability",
            "pyParametersParamInOut": "IN",
            "pyParametersParamType": "BOOLEAN",
            "pyParametersParamReq": "0",
            "pyParametersParamSize": "0",
            "pyParametersParamDefaultValue": "",
            "pyParametersParamIntelliBaseClass": "PageClass",
            "pyParametersParamIntelliValidateAs": ""
          }
        ],
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
        "pyTo": "Assignment1",
        "pyConditionType": "Always",
        "pyLikelihood": "100"
      },
      "Transition2": {
        "pyMOId": "Transition2",
        "pyFrom": "Assignment1",
        "pyFromClass": "Data-MO-Activity-Assignment",
        "pyTo": "End1",
        "pyConditionType": "Action",
        "pyExpression": "ReviewComplete",
        "pyMOName": "Review complete",
        "pyMONameOrig": "ReviewComplete",
        "pyUseCaseApplication": "MyApp",
        "pyUseCaseName": "ReviewComplete",
        "pyUseCaseWorkType": "MyCase",
        "pyPropertiesOrModel": "Set Properties",
        "pyLikelihood": "100"
      }
    }
  }
}
```
