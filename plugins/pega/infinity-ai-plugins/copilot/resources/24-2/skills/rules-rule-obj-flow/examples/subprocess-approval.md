---
name: flow-subprocess-approval
description: 'Start → SubProcess (approval) → End. Use when wiring a pxApproval subprocess into a flow.'
---

```json
{
  "pyFlowType": "Approve_Flow",
  "pyLabel": "Approve Flow",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyWorkClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "ScreenFlow",
  "pyStructureType": "Linear",
  "pyStartActivity": "Start62",
  "pyEndingActivities": ["End1"],
  "pyFromTasks": [
    { "pyFromTaskName": "Start62", "pyToTasks": { "SubProcess1": { "pyID": "Transition1", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "SubProcess1" } } },
    { "pyFromTaskName": "SubProcess1", "pyToTasks": { "End1": { "pyID": "Transition2", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "End1" } } }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start62": {
        "pxObjClass": "Data-MO-Event-Start-StartScreenFlow",
        "pyMOId": "Start62", "pyFromMODefName": "Start",
        "pyCategory": "ScreenFlow", "pyFlowType": "ScreenFlowStandard",
        "pyImplementation": "WorkBasket", "pyScreenFlowTemplate": "TabbedScreenFlow7",
        "pyStartingHarness": "New", "pyTicketShapes": []
      },
      "SubProcess1": {
        "pxObjClass": "Data-MO-Activity-SubProcess",
        "pyMOId": "SubProcess1", "pyFromMODefName": "SubProcess",
        "pyMOName": "Approve", "pyCategory": "ScreenFlow",
        "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
        "pyImplementation": "pxApproval", "pySubProcessCategory": "",
        "pyDefineFlowOn": "Current", "pySpinOff": "false",
        "pyOtherWorkClass": "", "pyPageClass": "", "pyPageRef": "", "pyWorkObjRef": "",
        "pyUseCaseApplication": "", "pyUseCaseName": "", "pyUseCaseWorkType": "",
        "pzRuleParametersShowSkills": "false", "pyTicketShapes": [],
        "pyCallParams": {
          "ApprovalAction": "Continue", "ApprovalMetaData": "", "ApprovalSLA": "",
          "ApprovalStatus": "", "ApprovalType": "", "ApproverListPage": "",
          "ApproverNameProperty": "", "ApproverType": "",
          "AttachmentCategoriesToSend": "", "AttachmentFieldsToSend": "",
          "CorrName": "", "DecisionTableName": "", "DecisionTree": "",
          "EmailApproval": "", "EmailSubjectFV": "", "LevelsOfApproval": "",
          "ManagerType": "", "OperatorID": "", "pyApprovalSectionName": "",
          "PushNotificationIsEnabled": "",
          "RejectionAction": "UpdateStatus", "RejectionMetaData": "Resolved-Rejected",
          "RejectionStatus": "Approval Rejection", "SendAllAttachments": "",
          "StepApprovalType": "Simple", "WhenRules": ""
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "MyOrg-MyApp-Work-MyCase",
          "pyApproverType": "WorkBasket", "pyApprovalSection": "",
          "pyWorkBasketToAssign": "MyOrg:Approvers",
          "pyOperatorToAssign": "",
          "pyPostApprovalActions": "Continue", "pyPostRejectionActions": "UpdateStatus",
          "pyRejectStatus": "Resolved-Rejected",
          "pySLA": "", "pySLAType": "Never",
          "pyStepApprovalType": "Simple", "pzMarkRoutingChanged": "true"
        },
        "pzRuleParameters": [
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "StepApprovalType", "pyParametersParamDesc": "Approval Type (Simple, Cascading)", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "-1", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApprovalAction", "pyParametersParamDesc": "Action to perform when approved", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "RejectionAction", "pyParametersParamDesc": "Action to perform when rejected", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApprovalMetaData", "pyParametersParamDesc": "Meta data of Action to perform when approved", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApprovalStatus", "pyParametersParamDesc": "Status to be set when approving", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "RejectionMetaData", "pyParametersParamDesc": "Meta data of Action to perform when rejected", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "RejectionStatus", "pyParametersParamDesc": "Status to be set when rejecting", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApproverType", "pyParametersParamDesc": "(Operator, ReportingManger, WorkGroupManager, CostCenterManager)", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "OperatorID", "pyParametersParamDesc": "Operator ID (When Approver Type is Operator)", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApprovalType", "pyParametersParamDesc": "Type of Approval required: Authority Matrix or Reporting Structure", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "DecisionTableName", "pyParametersParamDesc": "Decision Table Name to be evaluated if Authority Matrix selected", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApproverListPage", "pyParametersParamDesc": "Page List containing Decision Table results. This can be pre populated without using a desicion table too.", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApproverNameProperty", "pyParametersParamDesc": "Property holding the Approver Name in the Page List", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ManagerType", "pyParametersParamDesc": "Type of Manager hierarchy evaluated for approval", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "WhenRules", "pyParametersParamDesc": "When rule list to get the levels of iterations...", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "LevelsOfApproval", "pyParametersParamDesc": "Levels of Approval required", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "EmailApproval", "pyParametersParamDesc": "Email Approval", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "pyApprovalSectionName", "pyParametersParamDesc": "Approval Section Name", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "ApprovalSLA", "pyParametersParamDesc": "Approval SLA", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "CorrName", "pyParametersParamDesc": "CorrName", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "EmailSubjectFV", "pyParametersParamDesc": "EmailSubjectFV", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "SendAllAttachments", "pyParametersParamDesc": "Send Work Attachments with Email Correspondence", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "AttachmentCategoriesToSend", "pyParametersParamDesc": "Comma delimited list of attach categories to send", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "AttachmentFieldsToSend", "pyParametersParamDesc": "Comma delimited list of attach fields to send", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "PushNotificationIsEnabled", "pyParametersParamDesc": "Push Notification Is Enabled", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamName": "DecisionTree", "pyParametersParamDesc": "Business Logic Decision Tree", "pyParametersParamInOut": "", "pyParametersParamType": "STRING", "pyParametersParamReq": "0", "pyParametersParamSize": "", "pyParametersParamIntelliRule": "", "pyParametersParamIntelliBaseClass": "PageClass", "pyParametersParamIntelliValidateAs": "" }
        ]
      },
      "End1": {
        "pxObjClass": "Data-MO-Event-End", "pyMOId": "End1", "pyFromMODefName": "End",
        "pyCategory": "ScreenFlowStandard", "pyFlowType": "ScreenFlowStandard",
        "pyTicketShapes": [ { "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" } ]
      }
    },
    "pyConnectors": {
      "Transition1": { "pyMOId": "Transition1", "pyFrom": "Start62", "pyFromClass": "Data-MO-Event-Start-StartScreenFlow", "pyTo": "SubProcess1", "pyConditionType": "Always", "pyLikelihood": "100" },
      "Transition2": { "pyMOId": "Transition2", "pyFrom": "SubProcess1", "pyFromClass": "Data-MO-Activity-SubProcess", "pyTo": "End1", "pyConditionType": "Always", "pyLikelihood": "100" }
    }
  }
}
```
