---
name: Step Form View
description: Full create payload for a workflow-step assignment form — the form an end-user fills in when working a case step (e.g. a Collect information assignment).
---

Use this as the create payload when a view is bound to a flow assignment. Derived
from a real `CollectDocumentation` view on a `LeaveRequest` case type.

Key characteristics:
- `pyTemplateName`: `DefaultForm`
- No `pxViewType` — step-bound forms do not set this field
- All three surfaces (`pyContent`, `pxViewMetadata`, `pxContextMetadata`) included

> The `localeReference` in `pxViewMetadata.config` follows the pattern
> `@LR CLASSNAME!VIEW!RULENAME` — both segments uppercased, class dots become hyphens.
> Example: class `MyCo-MyApp-Work-LeaveRequest`, rule `CollectLeaveDetails` →
> `@LR MYCO-MYAPP-WORK-LEAVEREQUEST!VIEW!COLLECTLEAVEDETAILS`

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "CollectLeaveDetails",
  "pyLabel": "Collect Leave Details",
  "pyClassName": "MyCo-MyApp-Work-LeaveRequest",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DefaultForm",
  "pyContent": [
    {
      "pxObjClass": "Pega-UI-Content-Region",
      "pyName": "Fields",
      "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
      "pyComponentName": "Region",
      "pyDisplayLabel": "Region",
      "pyContent": [
        {
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "TextInput",
          "pyFieldReference": "LeaveType",
          "pyLabel": ".LeaveType",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".LeaveType",
          "pyValueWithoutAnnotation": ".LeaveType"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Date",
          "pyComponentName": "Date",
          "pyFieldReference": "StartDate",
          "pyLabel": ".StartDate",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".StartDate",
          "pyValueWithoutAnnotation": ".StartDate"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Date",
          "pyComponentName": "Date",
          "pyFieldReference": "EndDate",
          "pyLabel": ".EndDate",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".EndDate",
          "pyValueWithoutAnnotation": ".EndDate"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "TextInput",
          "pyFieldReference": "ReasonForLeave",
          "pyLabel": ".ReasonForLeave",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".ReasonForLeave",
          "pyValueWithoutAnnotation": ".ReasonForLeave"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "TextInput",
          "pyFieldReference": "Comments",
          "pyLabel": ".Comments",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".Comments",
          "pyValueWithoutAnnotation": ".Comments"
        }
      ]
    }
  ],
  "pxViewMetadata": {
    "children": [
      {
        "children": [
          {
            "config": {
              "label": "@FL .LeaveType",
              "labelOption": "default",
              "value": "@P .LeaveType"
            },
            "type": "TextInput"
          },
          {
            "config": {
              "label": "@FL .StartDate",
              "labelOption": "default",
              "value": "@P .StartDate"
            },
            "type": "Date"
          },
          {
            "config": {
              "label": "@FL .EndDate",
              "labelOption": "default",
              "value": "@P .EndDate"
            },
            "type": "Date"
          },
          {
            "config": {
              "label": "@FL .ReasonForLeave",
              "labelOption": "default",
              "value": "@P .ReasonForLeave"
            },
            "type": "TextInput"
          },
          {
            "config": {
              "label": "@FL .Comments",
              "labelOption": "default",
              "value": "@P .Comments"
            },
            "type": "TextInput"
          }
        ],
        "name": "Fields",
        "type": "Region"
      }
    ],
    "config": {
      "localeReference": "@LR MYCO-MYAPP-WORK-LEAVEREQUEST!VIEW!COLLECTLEAVEDETAILS",
      "ruleClass": "MyCo-MyApp-Work-LeaveRequest",
      "template": "DefaultForm"
    },
    "name": "CollectLeaveDetails",
    "type": "View"
  },
  "pxContextMetadata": {
    "$properties": [
      ".LeaveType",
      ".StartDate",
      ".EndDate",
      ".ReasonForLeave",
      ".Comments"
    ],
    "$fields": [
      {"name": ".LeaveType"},
      {"name": ".StartDate"},
      {"name": ".EndDate"},
      {"name": ".ReasonForLeave"},
      {"name": ".Comments"}
    ],
    "$views": [],
    "$associated": [],
    "$insights": [],
    "$genAICoaches": [],
    "$AIAgents": [],
    "$attachments": [],
    "$widgets": [],
    "$addresses": [],
    "$users": [],
    "$classesmetadata": [],
    "$pagelists": [],
    "$whens": [],
    "$paragraphs": []
  }
}
```
