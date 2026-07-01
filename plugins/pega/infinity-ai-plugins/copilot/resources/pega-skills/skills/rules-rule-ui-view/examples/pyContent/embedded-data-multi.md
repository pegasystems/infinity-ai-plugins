---
name: "EmbeddedDataMulti (Infinity 26+)"
description: "pyContent entry for the Infinity 26+ EmbeddedDataMulti component. Renders a PageList as an embedded editable table inside a DefaultForm. Not available in Infinity 24 or Infinity 25."
---

> **Infinity 26+ only:** `EmbeddedDataMulti` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/pyContent/embedded-data` for older embedded-data patterns.

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Data-Embedded",
  "pyComponentName": "EmbeddedDataMulti",
  "pyFieldReference": "Timesheets",
  "pyLabel": ".Timesheets",
  "pyLabelOption": "field",
  "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
  "pyTargetProperty": "Timesheets",
  "pyTargetObjectClass": "MyCo-MyApp-Data-Timesheet",
  "pyType": "PageList",
  "pyPagelistValue": ".Timesheets",
  "pyDisplayAs": "table",
  "pyModeOption": "editable",
  "pyAddEditAction": "pyEdit",
  "pyEditType": "action",
  "pyEditModeConfig": "modal",
  "pyTargetClassLabel": "Timesheet",
  "pyTargetClassLabelOption": "default",
  "pyColumns": [
    {
      "pxObjClass": "Pega-UI-Content-Reference",
      "pyComponentName": "reference",
      "pyRuleName": "pyPrimaryFields",
      "pyValue": "pyPrimaryFields",
      "pyValueWithoutAnnotation": "pyPrimaryFields",
      "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
      "pyLabel": "Primary fields",
      "pyHeadingOption": "text",
      "pyShowHeading": true
    }
  ]
}
```
