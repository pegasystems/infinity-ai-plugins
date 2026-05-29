---
name: flow-shape-utility-notification
description: 'Use when adding a Utility (notification) shape that sends a notification via pzNotifyWrapper.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Utility",
  "pxSubscript": "Utility2",
  "pyActivityType": "ACTIVITY",
  "pyActivityTypeSelector": "ACTIVITY",
  "pyBaseClass": "MyOrg-MyApp-Work-MyCase",
  "pyCategory": "FlowStandard",
  "pyFromMODefName": "Utility",
  "pyImplementation": "pzNotifyWrapper",
  "pyMOId": "Utility2",
  "pyMOName": "Notify Reviewers",
  "pyNotificationName": "NotifyReviewers_0",
  "pyRuleParamsStreamName": "pzNotifySmartShapeUI",
  "pzIsAPI": "true",
  "pzRuleParametersShowSkills": "false",
  "pyCallParams": {
    "NotificationName": "NotifyReviewers_0"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamDesc": "Notification Name",
      "pyParametersParamInOut": "IN",
      "pyParametersParamIntelliBaseClass": "PageClass",
      "pyParametersParamIntelliRule": "Rule-Notification",
      "pyParametersParamName": "NotificationName",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    }
  ],
  "pzRuleParamsHolder": {
    "pxObjClass": "MyOrg-MyApp-Work-MyCase",
    "pyName": "NotifyReviewers_0",
    "pyReferExisting": "Existing"
  },
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyPageAliases": {},
  "pyRouterProp": {},
  "pyTicketShapes": [{ "pxObjClass": "Data-MO-Event-Exception" }]
}
```
