---
name: flow-utility-plain-activity
description: 'Start → Utility (plain activity) → End. Use when wiring a plain activity (not a smart-shape) into a flow.'
---

```json
{
  "pyFlowType": "CreateBranch_Flow",
  "pyLabel": "Create Branch Flow",
  "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
  "pyWorkClass": "MyOrg-MyApp-Work-ChangeRequest",
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
        "pyMOName": "CreateBranchForChangeRequest",
        "pyCategory": "FlowStandard",
        "pyBaseClass": "MyOrg-MyApp-Work-ChangeRequest",
        "pyUseCaseWorkType": "ChangeRequest",
        "pyUseCaseName": "CreateBranchForChangeRequest",
        "pyUseCaseApplication": "",
        "pyImplementation": "pzCreateBranchForGenAI",
        "pyActivityType": "ACTIVITY",
        "pyActivityTypeSelector": "ACTIVITY",
        "pyAutomationAppliesTo": "",
        "pzIsAPI": "false",
        "pyOnlyGoingBack": "false",
        "pyShouldReload": "No",
        "pyTypeMismatch": "false",
        "pyTemplateInputBox": "",
        "pzRuleParametersShowSkills": "false",
        "pyWorkStatus": "",
        "pxWarningsToDisplay": [""],
        "pyPageAliases": [],
        "pyContextRefs": [],
        "pyRouterProp": { "pxObjClass": "Data-MO-Activity-Router" },
        "pyCallParams": {},
        "pzRuleParameters": [
          {
            "pxObjClass": "Embed-MethodParams",
            "pyParametersParamInOut": "IN",
            "pyParametersParamIntelliBaseClass": "PageClass",
            "pyParametersParamSize": "0",
            "pyParametersParamType": "STRING"
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
