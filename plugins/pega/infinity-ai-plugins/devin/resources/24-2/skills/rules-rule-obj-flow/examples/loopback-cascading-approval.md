---
name: flow-loopback-cascading-approval
description: 'Start → Utility → Decision → SubProcess (approval) → Utility → Decision (loopback) → End. Use when creating a cascading approval flow with a non-DAG loopback and STATUS connectors.'
---

```json
{
  "pyFlowType": "pxCascadingApproval",
  "pyLabel": "Cascading Approval",
  "pyClassName": "Work-",
  "pyWorkClass": "Work-",
  "pyCategory": "FlowStandard",
  "pyStructureType": "Complex",
  "pyStartActivity": "Start51",
  "pyRuleParamsStreamName": "pzCascadingApproval",
  "pyEndingActivities": ["End1", "End2", "END52"],
  "pyCustomFields": { "pyGalleryType": "CaseManagementGallery" },
  "pxNamedPageReferences": [],
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start51",
      "pyToTasks": { "Utility1": { "pyID": "Transition1", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "Utility1" } }
    },
    {
      "pyFromTaskName": "Utility1",
      "pyToTasks": { "Decision2": { "pyID": "TRANSITION53", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "Decision2" } }
    },
    {
      "pyFromTaskName": "Decision2",
      "pyToTasks": {
        "SubProcess1": { "pyID": "Transition7", "pyTaskStatusOrWhen": "WHEN", "pyTaskStatus": "pzHasNextApprover", "pyTaskWhen": "pzHasNextApprover", "pyLikelihood": "100", "pxSubscript": "SubProcess1" },
        "End2":        { "pyID": "Transition6", "pyTaskStatusOrWhen": "ELSE", "pyTaskStatus": "", "pyTaskWhen": "", "pyLikelihood": "0.0", "pxSubscript": "End2" }
      }
    },
    {
      "pyFromTaskName": "SubProcess1",
      "pyToTasks": {
        "Utility2": { "pyID": "TRANSITION54", "pyTaskStatusOrWhen": "STATUS", "pyTaskStatus": "Approve", "pyTaskWhen": "Approve", "pyLikelihood": "100", "pxSubscript": "Utility2" },
        "End1":     { "pyID": "Transition4",  "pyTaskStatusOrWhen": "STATUS", "pyTaskStatus": "Reject",  "pyTaskWhen": "Reject",  "pyLikelihood": "100", "pxSubscript": "End1" }
      }
    },
    {
      "pyFromTaskName": "Utility2",
      "pyToTasks": { "Decision1": { "pyID": "Transition5", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "Decision1" } }
    },
    {
      "pyFromTaskName": "Decision1",
      "pyToTasks": {
        "SubProcess1": { "pyID": "Transition2", "pyTaskStatusOrWhen": "WHEN", "pyTaskStatus": "pzHasNextApprover", "pyTaskWhen": "pzHasNextApprover", "pyLikelihood": "100", "pxSubscript": "SubProcess1" },
        "END52":       { "pyID": "Transition3", "pyTaskStatusOrWhen": "ELSE", "pyTaskStatus": "", "pyTaskWhen": "", "pyLikelihood": "0.0", "pxSubscript": "END52" }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start51": {
        "pxObjClass": "Data-MO-Event-Start",
        "pyMOId": "Start51", "pyFromMODefName": "Start",
        "pyFlowType": "FlowStandard",
        "pyCoordX": "0.24", "pyCoordY": "0.08", "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "Utility1": {
        "pxObjClass": "Data-MO-Activity-Utility",
        "pyMOId": "Utility1", "pyFromMODefName": "Utility",
        "pyMOName": "Initialize Approvers", "pyImplementation": "pzInitApproversList",
        "pyPropertyAssigns": [
          { "pxObjClass": "Embed-ModelParams", "pyActionName": "SET", "pyPropertiesName": ".ApprovalMode", "pyPropertiesValue": "\"Cascading\"", "pyExpanded": "true" }
        ],
        "pyCoordX": "0", "pyCoordY": "0.96", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "Decision2": {
        "pxObjClass": "Data-MO-Gateway-Decision",
        "pyMOId": "Decision2", "pyFromMODefName": "Decision",
        "pyMOName": "Any Approvers?", "pyDecisionClass": "Data-MO-Gateway-DataXOR",
        "pyImplementation": "",
        "pyCoordX": "1.6", "pyCoordY": "0.96", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "SubProcess1": {
        "pxObjClass": "Data-MO-Activity-SubProcess",
        "pyMOId": "SubProcess1", "pyFromMODefName": "SubProcess",
        "pyMOName": "Get Approval", "pyShapeType": "Data-MO-Activity-SubProcess",
        "pyBaseClass": "Work-", "pyImplementation": "pyCascadingGetApproval",
        "pyPreviousRule": "pyCascadingGetApproval",
        "pySubProcessCategory": "", "pyDefineFlowOn": "Current", "pySpinOff": "false",
        "pzRuleParamsHolder": {
          "pxObjClass": "Work-",
          "pyApprovalType": "AuthorityMatrix", "pyReportingType": "ReportsToManager",
          "pyApprover": "", "pyApprovalList": "",
          "pyDecisionTable": "", "pyPageClass": "", "pyTemplateInputBox": "",
          "pyWhenList": [
            { "pxObjClass": "Embed-WhenConditions", "pyLevelsOfApproval": "", "pyTemplateInputBox": "", "pyWhen": "" }
          ]
        },
        "pzRuleParameters": [
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "" }
        ],
        "pyCoordX": "3.68", "pyCoordY": "0.96", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "Utility2": {
        "pxObjClass": "Data-MO-Activity-Utility",
        "pyMOId": "Utility2", "pyFromMODefName": "Utility",
        "pyMOName": "Update Approvers", "pyImplementation": "pzUpdateApproversList",
        "pyPreviousRule": "pzUpdateApproversList",
        "pzRuleParameters": [
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "" }
        ],
        "pyCoordX": "5.28", "pyCoordY": "0.96", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "Decision1": {
        "pxObjClass": "Data-MO-Gateway-Decision",
        "pyMOId": "Decision1", "pyFromMODefName": "Decision",
        "pyMOName": "Further Approval Nedded",
        "pyDecisionClass": "Data-MO-Gateway-DataXOR", "pyImplementation": "",
        "pyCoordX": "6.96", "pyCoordY": "0.96", "pyWidth": "0.96", "pyHeight": "0.48"
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End1", "pyFromMODefName": "End",
        "pyStatus": "Rejected", "pyPreviousRule": "Rejected",
        "pyCoordX": "3.92", "pyCoordY": "2.16", "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "End2": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "End2", "pyFromMODefName": "End",
        "pyStatus": "No Approvers", "pyPreviousRule": "No Approvers",
        "pyCoordX": "1.84", "pyCoordY": "2.16", "pyWidth": "0.48", "pyHeight": "0.48"
      },
      "END52": {
        "pxObjClass": "Data-MO-Event-End",
        "pyMOId": "END52", "pyFromMODefName": "End",
        "pyStatus": "Approved", "pyPreviousRule": "Approved",
        "pyCoordX": "7.2", "pyCoordY": "2.16", "pyWidth": "0.48", "pyHeight": "0.48"
      }
    },
    "pyConnectors": {
      "Transition1": { "pyMOId": "Transition1", "pyFrom": "Start51", "pyFromClass": "Data-MO-Event-Start", "pyTo": "Utility1", "pyConditionType": "Always", "pyMOName": "[Always]", "pyMONameOrig": "[Always]", "pyLikelihood": "100" },
      "TRANSITION53": { "pyMOId": "TRANSITION53", "pyFrom": "Utility1", "pyFromClass": "Data-MO-Activity-Utility", "pyTo": "Decision2", "pyConditionType": "Always", "pyMOName": "[Always]", "pyLikelihood": "100" },
      "Transition7": { "pyMOId": "Transition7", "pyFrom": "Decision2", "pyFromClass": "Data-MO-Gateway-Decision", "pyTo": "SubProcess1", "pyConditionType": "When", "pyExpression": "pzHasNextApprover", "pyMOName": "Yes", "pyPreviousRule": "pzHasNextApprover", "pyIsFork": "true", "pyLikelihood": "100" },
      "Transition6": { "pyMOId": "Transition6", "pyFrom": "Decision2", "pyFromClass": "Data-MO-Gateway-Decision", "pyTo": "End2", "pyConditionType": "Else", "pyExpression": "", "pyMOName": "[Else]", "pyMONameOrig": "[Result]", "pyIsFork": "true", "pyLikelihood": "0.0" },
      "TRANSITION54": { "pyMOId": "TRANSITION54", "pyFrom": "SubProcess1", "pyFromClass": "Data-MO-Activity-SubProcess", "pyTo": "Utility2", "pyConditionType": "Status", "pyExpression": "Approve", "pyMOName": "Approve", "pyMONameOrig": "Approve", "pyPreviousRule": "pyCascadingApprove", "pyLabel": "Step Name", "pyLastExpression": "ActionStub", "pyFlowType": "FlowStandard", "pyShapeType": "Data-MO-Connector-Transition", "pyLikelihood": "100" },
      "Transition4": { "pyMOId": "Transition4", "pyFrom": "SubProcess1", "pyFromClass": "Data-MO-Activity-SubProcess", "pyTo": "End1", "pyConditionType": "Status", "pyExpression": "Reject", "pyMOName": "Reject", "pyPreviousRule": "pyCascadingReject", "pyLikelihood": "100" },
      "Transition5": { "pyMOId": "Transition5", "pyFrom": "Utility2", "pyFromClass": "Data-MO-Activity-Utility", "pyTo": "Decision1", "pyConditionType": "Always", "pyMOName": "[Always]", "pyLikelihood": "100" },
      "Transition2": { "pyMOId": "Transition2", "pyFrom": "Decision1", "pyFromClass": "Data-MO-Gateway-Decision", "pyTo": "SubProcess1", "pyConditionType": "When", "pyExpression": "pzHasNextApprover", "pyMOName": "Yes", "pyPreviousRule": "pzHasNextApprover", "pyIsFork": "true", "pyLikelihood": "100" },
      "Transition3": { "pyMOId": "Transition3", "pyFrom": "Decision1", "pyFromClass": "Data-MO-Gateway-Decision", "pyTo": "END52", "pyConditionType": "Else", "pyExpression": "", "pyMOName": "[Else]", "pyIsFork": "true", "pyLikelihood": "0.0" }
    }
  }
}
```
