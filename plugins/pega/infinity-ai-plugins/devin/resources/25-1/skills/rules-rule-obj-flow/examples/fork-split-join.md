---
name: flow-fork-split-join
description: 'Start → Decision → SplitJoin (SubProcess) → Decision (multi-destination) → End. Use when creating a flow with parallel branches and a SplitJoin container.'
---

```json
{
  "pyFlowType": "ParallelApproval_Flow",
  "pyLabel": "Parallel Approval Flow",
  "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
  "pyWorkClass": "MyOrg-MyApp-Work-ChangeRequest",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Complex",
  "pyStartActivity": "Start1",
  "pyEndingActivities": ["End1"],
  "pyRuleParamsStreamName": "pzApprovalFlowWrapper",
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start1",
      "pyToTasks": {
        "Decision1": {
          "pyID": "Transition1", "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100", "pxSubscript": "Decision1"
        }
      }
    },
    {
      "pyFromTaskName": "Decision1",
      "pyToTasks": {
        "SplitSplitJoin1": {
          "pyID": "Transition2", "pyTaskStatusOrWhen": "WHEN",
          "pyTaskStatus": "@equals(param.StepApprovalType,\"Simple\")",
          "pyTaskWhen":   "@equals(param.StepApprovalType,\"Simple\")",
          "pyLikelihood": "100", "pxSubscript": "SplitSplitJoin1"
        },
        "End1": {
          "pyID": "Transition3", "pyTaskStatusOrWhen": "ELSE",
          "pyTaskStatus": "", "pyTaskWhen": "",
          "pyLikelihood": "0.0", "pxSubscript": "End1"
        }
      }
    },
    {
      "pyFromTaskName": "SplitSplitJoin1",
      "pyToTasks": {
        "SubProcess1": {
          "pyID": "Transition4", "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100", "pxSubscript": "SubProcess1"
        }
      }
    },
    {
      "pyFromTaskName": "SubProcess1",
      "pyToTasks": {
        "JoinSplitJoin1": {
          "pyID": "Transition5", "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100", "pxSubscript": "JoinSplitJoin1"
        }
      }
    },
    {
      "pyFromTaskName": "JoinSplitJoin1",
      "pyToTasks": {
        "Decision2": {
          "pyID": "Transition6", "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100", "pxSubscript": "Decision2"
        }
      }
    },
    {
      "pyFromTaskName": "Decision2",
      "pyToTasks": {
        "SubProcess3": {
          "pyID": "Transition7", "pyTaskStatusOrWhen": "WHEN",
          "pyTaskStatus": "@(Pega-RULES:String).equals(.pyApprovalResult, Approved)",
          "pyTaskWhen":   "@(Pega-RULES:String).equals(.pyApprovalResult, Approved)",
          "pyLikelihood": "50", "pxSubscript": "SubProcess3"
        },
        "SubProcess3_1": {
          "pyID": "Transition8", "pyTaskStatusOrWhen": "WHEN",
          "pyTaskStatus": "@(Pega-RULES:String).equals(.pyApprovalResult, Rejected)",
          "pyTaskWhen":   "@(Pega-RULES:String).equals(.pyApprovalResult, Rejected)",
          "pyLikelihood": "50", "pxSubscript": "SubProcess3_1"
        },
        "End1": {
          "pyID": "Transition9", "pyTaskStatusOrWhen": "ELSE",
          "pyTaskStatus": "", "pyTaskWhen": "",
          "pyLikelihood": "-100.0", "pxSubscript": "End1"
        }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start1": {
        "pxObjClass": "Data-MO-Event-Start", "pyMOId": "Start1",
        "pyFromMODefName": "Start", "pyMOName": "Start",
        "pyCoordX": "0.48", "pyCoordY": "2.40", "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "Decision1": {
        "pxObjClass": "Data-MO-Gateway-Decision", "pyMOId": "Decision1",
        "pyFromMODefName": "Decision", "pyMOName": "Check type",
        "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
        "pyBaseClass": "MyOrg-MyApp-Work-ChangeRequest",
        "pyCoordX": "1.44", "pyCoordY": "2.40", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "SplitJoin1": {
        "pxObjClass": "Data-MO-Container-SplitJoin", "pyMOId": "SplitJoin1",
        "pyFromMODefName": "SplitJoin", "pyMOName": "Simple approvers",
        "pyCategory": "FlowStandard",
        "pyJoinAllAny": "All", "pyExitSomeIterationType": "When",
        "pySplitSomeCount": "0",
        "pyShapeRefs":        { "SubProcess1": "Data-MO-Activity-SubProcess" },
        "pyShapeRefsOrdered": [ "SubProcess1" ],
        "pyConnectorRefs":    { "Transition4": "Data-MO-Connector-Transition",
                                "Transition5": "Data-MO-Connector-Transition" },
        "pyRouterProp": { "pxObjClass": "Data-MO-Activity-Router" },
        "pyCoordX": "2.88", "pyCoordY": "2.40", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "SubProcess1": {
        "pxObjClass": "Data-MO-Activity-SubProcess", "pyMOId": "SubProcess1",
        "pyFromMODefName": "SubProcess", "pyMOName": "Simple approval",
        "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
        "pyBaseClass": "MyOrg-MyApp-Work-ChangeRequest",
        "pyContainerRef": "SplitJoin1",
        "pyImplementation": "pxApproval",
        "pyRuleParamsStreamName": "pzSimpleApproval",
        "pyCoordX": "3.84", "pyCoordY": "2.40", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "Decision2": {
        "pxObjClass": "Data-MO-Gateway-Decision", "pyMOId": "Decision2",
        "pyFromMODefName": "Decision", "pyMOName": "Result",
        "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
        "pyBaseClass": "MyOrg-MyApp-Work-ChangeRequest",
        "pyCoordX": "5.28", "pyCoordY": "2.40", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "SubProcess3": {
        "pxObjClass": "Data-MO-Activity-SubProcess", "pyMOId": "SubProcess3",
        "pyFromMODefName": "SubProcess", "pyMOName": "Record outcome",
        "pyClassName": "MyOrg-MyApp-Work-ChangeRequest",
        "pyBaseClass": "MyOrg-MyApp-Work-ChangeRequest",
        "pyImplementation": "pzRecordApprovalOutcome",
        "pyCoordX": "6.72", "pyCoordY": "2.40", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End", "pyMOId": "End1",
        "pyFromMODefName": "End", "pyMOName": "End",
        "pyCoordX": "8.16", "pyCoordY": "2.40", "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": { "pyMOId": "Transition1", "pyFrom": "Start1", "pyFromClass": "Data-MO-Event-Start",
        "pyTo": "Decision1", "pyConditionType": "Always", "pyLikelihood": "100",
        "pyContainerRef": "" },
      "Transition2": { "pyMOId": "Transition2", "pyFrom": "Decision1", "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "SplitJoin1", "pyConditionType": "When",
        "pyExpression": "@equals(param.StepApprovalType,\"Simple\")",
        "pyMOName": "Simple", "pyIsFork": "true", "pyLikelihood": "100",
        "pyContainerRef": "" },
      "Transition3": { "pyMOId": "Transition3", "pyFrom": "Decision1", "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "End1", "pyConditionType": "Else", "pyExpression": "",
        "pyMOName": "No", "pyIsFork": "true", "pyLikelihood": "0.0",
        "pyContainerRef": "" },
      "Transition4": { "pyMOId": "Transition4", "pyFrom": "SplitJoin1", "pyFromClass": "Data-MO-Container-SplitJoin",
        "pyTo": "SubProcess1", "pyConditionType": "Always", "pyLikelihood": "100",
        "pyContainerRef": "" },
      "Transition5": { "pyMOId": "Transition5", "pyFrom": "SubProcess1", "pyFromClass": "Data-MO-Activity-SubProcess",
        "pyTo": "SplitJoin1", "pyConditionType": "Always", "pyLikelihood": "100",
        "pyContainerRef": "" },
      "Transition6": { "pyMOId": "Transition6", "pyFrom": "SplitJoin1", "pyFromClass": "Data-MO-Container-SplitJoin",
        "pyTo": "Decision2", "pyConditionType": "Always", "pyLikelihood": "100",
        "pyContainerRef": "" },
      "Transition7": { "pyMOId": "Transition7", "pyFrom": "Decision2", "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "SubProcess3", "pyConditionType": "When",
        "pyExpression": "@(Pega-RULES:String).equals(.pyApprovalResult, Approved)",
        "pyMOName": "Approved", "pyIsFork": "true", "pyLikelihood": "50",
        "pyContainerRef": "" },
      "Transition8": { "pyMOId": "Transition8", "pyFrom": "Decision2", "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "SubProcess3", "pyConditionType": "When",
        "pyExpression": "@(Pega-RULES:String).equals(.pyApprovalResult, Rejected)",
        "pyMOName": "Rejected", "pyIsFork": "true", "pyLikelihood": "50",
        "pyContainerRef": "" },
      "Transition9": { "pyMOId": "Transition9", "pyFrom": "Decision2", "pyFromClass": "Data-MO-Gateway-Decision",
        "pyTo": "End1", "pyConditionType": "Else", "pyExpression": "",
        "pyMOName": "No Approvers", "pyMONameOrig": "[Result]",
        "pyIsFork": "true", "pyLikelihood": "-100.0",
        "pyContainerRef": "" }
    }
  }
}
```
