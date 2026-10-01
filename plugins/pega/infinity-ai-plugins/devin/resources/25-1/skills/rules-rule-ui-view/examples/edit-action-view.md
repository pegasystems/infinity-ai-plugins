---
name: Edit Action View
description: Full create payload for a case edit action view (pyEdit) — the form shown when a user invokes the Edit action on a case. Includes TextArea, Data Reference (embedded page view), and Boolean/Checkbox field types.
---

Use this as the create payload for `pyEdit`-style action views. Derived from a real
`pyEdit` view on a `LeaveRequest` case type.

Key characteristics:
- `pyTemplateName`: `DefaultForm`
- No `pxViewType` — action views do not set this field (contrast with `pxViewType: "details"` in `pyReview`)
- Includes `TextArea`, `Data Reference`, and `Boolean/Checkbox` field types
- `$views` in `pxContextMetadata` must list every embedded view by name and class

> **Boolean field note:** Use `"Pega-UI-Content-Field-Text"` (not
> `"Pega-UI-Content-Field-Boolean"`) as `pxObjClass` when calling the Agentic
> Authoring API. The exported XML from Pega uses `Pega-UI-Content-Field-Boolean`,
> but sending that class to the API causes HTTP 500.

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "pyEdit",
  "pyLabel": "Edit",
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
          "pxObjClass": "Pega-UI-Content-Field-Date",
          "pyComponentName": "Date",
          "pyFieldReference": "ApprovalDate",
          "pyLabel": ".ApprovalDate",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".ApprovalDate",
          "pyValueWithoutAnnotation": ".ApprovalDate"
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
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Text-Paragraph",
          "pyComponentName": "TextArea",
          "pyFieldReference": "pyDescription",
          "pyLabel": ".pyDescription",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".pyDescription",
          "pyValueWithoutAnnotation": ".pyDescription"
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
          "pyFieldReference": "EscalationPathLevel",
          "pyLabel": ".EscalationPathLevel",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".EscalationPathLevel",
          "pyValueWithoutAnnotation": ".EscalationPathLevel"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "TextInput",
          "pyFieldReference": "pyLabel",
          "pyLabel": ".pyLabel",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".pyLabel",
          "pyValueWithoutAnnotation": ".pyLabel"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Data-Reference",
          "pyComponentName": "reference",
          "pyFieldReference": "LeaveCategory",
          "pyLabel": ".LeaveCategory",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyType": "Page",
          "pyTargetProperty": "LeaveCategory",
          "pyRequiredOption": "never",
          "pyRequiredValue": false,
          "pyJsonConfig": "{\"authorContext\":\".LeaveCategory\",\"name\":\"Edit_LeaveCategory\",\"referenceType\":\"Data\",\"ruleClass\":\"MyCo-MyApp-Work-LeaveRequest\",\"type\":\"view\"}"
        },
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
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "Checkbox",
          "pyFieldReference": "ManagerApprovalStatus",
          "pyValue": ".ManagerApprovalStatus",
          "pyValueWithoutAnnotation": ".ManagerApprovalStatus",
          "pyLabelOption": "text",
          "pyCaptionText": ".ManagerApprovalStatus",
          "pyCaptionOption": "field",
          "pyHideLabel": true,
          "pyTrueLabel": "Yes",
          "pyFalseLabel": "No",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest"
        },
        {
          "pxObjClass": "Pega-UI-Content-Field-Text-Paragraph",
          "pyComponentName": "TextArea",
          "pyFieldReference": "pyNote",
          "pyLabel": ".pyNote",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".pyNote",
          "pyValueWithoutAnnotation": ".pyNote"
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
          "pxObjClass": "Pega-UI-Content-Field-Date",
          "pyComponentName": "Date",
          "pyFieldReference": "StartDate",
          "pyLabel": ".StartDate",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".StartDate",
          "pyValueWithoutAnnotation": ".StartDate"
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
              "label": "@FL .ApprovalDate",
              "labelOption": "default",
              "value": "@P .ApprovalDate"
            },
            "type": "Date"
          },
          {
            "config": {
              "label": "@FL .Comments",
              "labelOption": "default",
              "value": "@P .Comments"
            },
            "type": "TextInput"
          },
          {
            "config": {
              "label": "@FL .pyDescription",
              "labelOption": "default",
              "value": "@P .pyDescription"
            },
            "type": "TextArea"
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
              "label": "@FL .EscalationPathLevel",
              "labelOption": "default",
              "value": "@P .EscalationPathLevel"
            },
            "type": "TextInput"
          },
          {
            "config": {
              "label": "@FL .pyLabel",
              "labelOption": "default",
              "value": "@P .pyLabel"
            },
            "type": "TextInput"
          },
          {
            "config": {
              "authorContext": ".LeaveCategory",
              "inheritedProps": [
                {"prop": "label", "value": "@FL .LeaveCategory"},
                {"prop": "required", "value": false}
              ],
              "name": "Edit_LeaveCategory",
              "referenceType": "Data",
              "ruleClass": "MyCo-MyApp-Work-LeaveRequest",
              "type": "view"
            },
            "type": "reference"
          },
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
              "caption": "@FL .ManagerApprovalStatus",
              "captionOption": "default",
              "falseLabel": "@L No",
              "hideLabel": true,
              "label": "@L ",
              "labelOption": "custom",
              "trueLabel": "@L Yes",
              "value": "@P .ManagerApprovalStatus"
            },
            "type": "Checkbox"
          },
          {
            "config": {
              "label": "@FL .pyNote",
              "labelOption": "default",
              "value": "@P .pyNote"
            },
            "type": "TextArea"
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
              "label": "@FL .StartDate",
              "labelOption": "default",
              "value": "@P .StartDate"
            },
            "type": "Date"
          }
        ],
        "name": "Fields",
        "type": "Region"
      }
    ],
    "config": {
      "localeReference": "@LR MYCO-MYAPP-WORK-LEAVEREQUEST!VIEW!PYEDIT",
      "ruleClass": "MyCo-MyApp-Work-LeaveRequest",
      "template": "DefaultForm"
    },
    "name": "pyEdit",
    "type": "View"
  },
  "pxContextMetadata": {
    "$properties": [
      ".ApprovalDate",
      ".Comments",
      ".pyDescription",
      ".EndDate",
      ".EscalationPathLevel",
      ".LeaveType",
      ".ManagerApprovalStatus",
      ".pyLabel",
      ".pyNote",
      ".ReasonForLeave",
      ".StartDate"
    ],
    "$fields": [
      {"name": ".ApprovalDate"},
      {"name": ".Comments"},
      {"name": ".pyDescription"},
      {"name": ".EndDate"},
      {"name": ".EscalationPathLevel"},
      {"name": ".LeaveType"},
      {"name": ".ManagerApprovalStatus"},
      {"name": ".pyLabel"},
      {"name": ".pyNote"},
      {"name": ".ReasonForLeave"},
      {"name": ".StartDate"}
    ],
    "$views": [
      {"name": "Edit_LeaveCategory", "ruleClass": "MyCo-MyApp-Work-LeaveRequest"}
    ],
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
