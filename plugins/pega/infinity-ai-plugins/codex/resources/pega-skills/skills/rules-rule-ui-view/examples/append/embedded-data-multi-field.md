---
name: "Append EmbeddedDataMulti Field (Infinity 26+)"
description: "Three-surface update-rule payload that appends an Infinity 26+ EmbeddedDataMulti PageList table inside a DefaultForm. Shows pyPrimaryFields column wiring, $pagelists actions/views, and pxDependencies. Not available in Infinity 24 or Infinity 25."
---

> **Infinity 26+ only:** `EmbeddedDataMulti` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/append/embedded-data-field` for older embedded-data patterns.

```json
{
  "updates": {
    "pyContent": [
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "Fields",
        "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {},
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
            "pyDisplayLabel": "Embedded Data",
            "pyColumns": [{"pxObjClass":"Pega-UI-Content-Reference","pyComponentName":"reference","pyRuleName":"pyPrimaryFields","pyValue":"pyPrimaryFields","pyValueWithoutAnnotation":"pyPrimaryFields","pyPromptClass":"MyCo-MyApp-Work-LeaveRequest","pyLabel":"Primary fields","pyHeadingOption":"text","pyShowHeading":true,"pyDisplayLabel":"reference"}]
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"EmbeddedDataMulti\",\"config\":{\"addEditAction\":\"pyEdit\",\"columns\":[{\"type\":\"reference\",\"config\":{\"inheritedProps\":[{\"prop\":\"label\",\"value\":\"@L Primary fields\"},{\"prop\":\"showLabel\",\"value\":true}],\"name\":\"pyPrimaryFields\",\"value\":\"pyPrimaryFields\"}}],\"displayAs\":\"table\",\"editMode\":\"modal\",\"editType\":\"action\",\"label\":\"@FL .Timesheets\",\"labelOption\":\"default\",\"pagelistValue\":\"@P .Timesheets\",\"targetClassLabel\":\"@L Timesheet\",\"targetClassLabelOption\":\"default\",\"targetObjectClass\":\"MyCo-MyApp-Data-Timesheet\"}}],\"name\":\"Fields\",\"type\":\"Region\"}]}",
    "pxContextMetadata": "{\"$properties\":[],\"$fields\":[],\"$classesmetadata\":[{\"name\":\"MyCo-MyApp-Data-Timesheet\",\"fetchDefaultDataSources\":true}],\"$pagelists\":[{\"$associated\":[],\"$properties\":[],\"$actions\":[{\"name\":\"pyEdit\"}],\"$views\":[{\"name\":\"pyPrimaryFields\"}],\"pagelist\":\".Timesheets\",\"$fields\":[],\"includePrimaryFields\":true}]}",
    "pxDependencies": "{\"components\":[\"EmbeddedDataMulti\",\"SimpleTable\",\"Region\",\"DefaultForm\"]}"
  }
}
```
