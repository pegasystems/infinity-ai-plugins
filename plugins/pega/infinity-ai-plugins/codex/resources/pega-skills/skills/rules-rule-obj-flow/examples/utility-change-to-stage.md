---
name: flow-utility-change-to-stage
description: 'Start → Utility (change-to-stage) → End. Use when creating a flow that transitions to a different case stage.'
---

```json
{
  "pyFlowType": "ChangeStage_Flow",
  "pyLabel": "Change Stage Flow",
  "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
  "pyWorkClass": "MyOrg-MyApp-Work-ChangeRequest",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Complex",
  "pyStartActivity": "Start1",
  "pyEndingActivities": ["End1"],
  "pyTaskStatusXml": "<pagedata><TaskStatus>PRIM1</TaskStatus></pagedata>",
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
        "pyMOName": "Change to PRIM1",
        "pyImplementation": "pxChangeToSpecifiedStage",
        "pyActivityType": "AUTOMATION",
        "pyActivityTypeSelector": "AUTOMATION",
        "pyAutomationAppliesTo": "Work-",
        "pyRuleCallParamsClass": "Work-",
        "pyRuleParamsStreamName": "pzChangeToSpecifiedStage",
        "pyUseCaseName": "Changetoaspecificstage",
        "pyUseCaseApplication": "MyApp",
        "pyUseCaseWorkType": "ChangeRequest",
        "pzIsAPI": "true",
        "pyCallParams": {
          "CleanUpProcesses": "",
          "Context":          "@Utilities.pxGetStepPageReference()",
          "NewStage":         "",
          "NewStageLabel":    "",
          "pyAutomationErrors": "",
          "TargetStage":      "PRIM1"
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "MyOrg-MyApp-Work-ChangeRequest",
          "pyChangeStagesOption": "goto",
          "pyGotoStage": "PRIM1",
          "pyGotoStageOther": "PRIM1"
        },
        "pzRuleParameters": [
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "Context",
            "pyParametersParamType": "Page",
            "pyParametersParamInOut": "IN",
            "pyParametersParamDesc": "The case page to change to a specified stage"
          },
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "TargetStage",
            "pyParametersParamType": "String",
            "pyParametersParamInOut": "IN",
            "pyParametersParamDesc": "The destination stage ID"
          },
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "CleanUpProcesses",
            "pyParametersParamType": "Boolean",
            "pyParametersParamInOut": "IN",
            "pyParametersParamDesc": "Clean up in-progress processes before changing stage"
          },
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "NewStage",
            "pyParametersParamType": "String",
            "pyParametersParamInOut": "OUT",
            "pyParametersParamDesc": "The resulting stage ID"
          },
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "NewStageLabel",
            "pyParametersParamType": "String",
            "pyParametersParamInOut": "OUT",
            "pyParametersParamDesc": "The resulting stage label"
          },
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "pyAutomationErrors",
            "pyParametersParamType": "Page",
            "pyParametersParamInOut": "OUT",
            "pyParametersParamDesc": "Automation errors reported by the stage change"
          }
        ],
        "pyCoordX": "1.6", "pyCoordY": "0.096",
        "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End1",
        "pyFromMODefName": "End",
        "pyMOName": "PRIM1",
        "pyStatus": "PRIM1",
        "pyUseCaseWorkType": "ChangeRequest",
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
