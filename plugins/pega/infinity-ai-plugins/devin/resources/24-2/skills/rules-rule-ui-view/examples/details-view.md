---
name: Details View
description: Full create payload for a details / review view (pyReview) — pxViewType "details" template pattern for displaying case fields.
---

Use this as the create payload for `pyReview`-style views that show the complete
case summary. Derived from a real `pyReview` view on a `LeaveRequest` case type.

Key characteristics:
- `pxViewType`: `"details"` — required for full-page case details views
- `pyTemplateName`: `DefaultForm`
- For adding individual field types (Data Reference, Checkbox, etc.) see the
  atomic `append-*` examples

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "pyReview",
  "pyLabel": "Details",
  "pyClassName": "MyCo-MyApp-Work-LeaveRequest",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DefaultForm",
  "pxViewType": "details",
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
          "pyFieldReference": "Comments",
          "pyLabel": ".Comments",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
          "pyValue": ".Comments",
          "pyValueWithoutAnnotation": ".Comments"
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
              "label": "@FL .Comments",
              "labelOption": "default",
              "value": "@P .Comments"
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
          }
        ],
        "name": "Fields",
        "type": "Region"
      }
    ],
    "config": {
      "localeReference": "@LR MYCO-MYAPP-WORK-LEAVEREQUEST!VIEW!PYREVIEW",
      "ruleClass": "MyCo-MyApp-Work-LeaveRequest",
      "template": "DefaultForm"
    },
    "name": "pyReview",
    "type": "View"
  },
  "pxContextMetadata": {
    "$properties": [
      ".Comments",
      ".StartDate",
      ".EndDate",
      ".ReasonForLeave"
    ],
    "$fields": [
      {"name": ".Comments"},
      {"name": ".StartDate"},
      {"name": ".EndDate"},
      {"name": ".ReasonForLeave"}
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
