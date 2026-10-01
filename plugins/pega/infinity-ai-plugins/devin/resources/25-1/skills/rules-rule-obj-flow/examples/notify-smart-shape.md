---
name: flow-notify-smart-shape
description: 'Start → Utility (notification) → End. Use when wiring a notification smart-shape into a flow.'
---

```json
{
  "pyFlowType": "Notify_Flow",
  "pyLabel": "Notify Flow",
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
        "pyMOName": "SendConfirmation",
        "pyImplementation": "pzNotifyWrapper",
        "pyActivityType": "ACTIVITY",
        "pyActivityTypeSelector": "ACTIVITY",
        "pyRuleParamsStreamName": "pzNotifySmartShapeUI",
        "pyNotificationName": "ConfirmMaintenance_0",
        "pyRuleCallParamsClass": "",
        "pzIsAPI": "true",
        "pzRuleParametersShowSkills": "false",
        "pyCallParams": {
          "NotificationName": "ConfirmMaintenance_0"
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "MyOrg-MyApp-Work-MyCase",
          "pyName": "ConfirmMaintenance_0",
          "pyReferExisting": "New"
        },
        "pzRuleParameters": [
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamName": "NotificationName",
            "pyParametersParamDesc": "",
            "pyParametersParamInOut": "IN",
            "pyParametersParamType": "STRING",
            "pyParametersParamReq": "0",
            "pyParametersParamDefaultValue": "",
            "pyParametersParamIntelliRule": "",
            "pyParametersParamIntelliBaseClass": "PageClass",
            "pyParametersParamIntelliValidateAs": ""
          }
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
