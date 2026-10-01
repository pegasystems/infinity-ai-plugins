---
name: "ObjectReference Data Reference (Infinity 26+)"
description: "pyContent entry for the Infinity 26+ ObjectReference Data Reference component. Uses direct data page binding instead of a DataReference template view. Not available in Infinity 24 or Infinity 25."
---

> **Infinity 26+ only:** `ObjectReference` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/pyContent/data-reference` for older Infinity versions.

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Data-Reference",
  "pyComponentName": "ObjectReference",
  "pyFieldReference": "LeaveCategory",
  "pyLabel": ".LeaveCategory",
  "pyLabelOption": "field",
  "pyPromptClass": "MyCo-MyApp-Work-LeaveRequest",
  "pyTargetProperty": "LeaveCategory",
  "pyTargetObjectClass": "MyCo-MyApp-Data-LeaveCategory",
  "pyTargetObjectType": "data",
  "pyValue": ".LeaveCategory.pyGUID",
  "pyValueWithoutAnnotation": ".LeaveCategory.pyGUID",
  "pyContextPage": ".LeaveCategory",
  "pyDisplayField": ".LeaveCategory.ApprovalRequired",
  "pyDataSource": "D_LeaveCategoryList",
  "pyMode": "single",
  "pyReferenceComponentType": "Combobox",
  "pyAllowCreatingRecords": false,
  "pyHideFieldLabels": false
}
```
