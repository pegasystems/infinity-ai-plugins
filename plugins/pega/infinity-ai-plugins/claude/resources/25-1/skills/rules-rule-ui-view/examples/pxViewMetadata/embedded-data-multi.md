---
name: "EmbeddedDataMulti Metadata (Infinity 26+)"
description: "pxViewMetadata child entry for the Infinity 26+ EmbeddedDataMulti component. Renders a PageList as an embedded editable table inside a DefaultForm. Not available in Infinity 24 or Infinity 25."
---

> **Infinity 26+ only:** `EmbeddedDataMulti` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/pxViewMetadata/embedded-data` for older embedded-data patterns.

```json
{
  "type": "EmbeddedDataMulti",
  "config": {
    "addEditAction": "pyEdit",
    "columns": [
      {
        "type": "reference",
        "config": {
          "inheritedProps": [
            {"prop": "label", "value": "@L Primary fields"},
            {"prop": "showLabel", "value": true}
          ],
          "name": "pyPrimaryFields",
          "value": "pyPrimaryFields"
        }
      }
    ],
    "displayAs": "table",
    "editMode": "modal",
    "editType": "action",
    "label": "@FL .Timesheets",
    "labelOption": "default",
    "pagelistValue": "@P .Timesheets",
    "targetClassLabel": "@L Timesheet",
    "targetClassLabelOption": "default",
    "targetObjectClass": "MyCo-MyApp-Data-Timesheet"
  }
}
```
