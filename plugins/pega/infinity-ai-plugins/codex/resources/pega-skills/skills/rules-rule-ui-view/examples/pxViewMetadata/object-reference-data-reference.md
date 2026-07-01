---
name: "ObjectReference Data Reference Metadata (Infinity 26+)"
description: "pxViewMetadata child entry for the Infinity 26+ ObjectReference Data Reference component. Uses a direct data page and target object class. Not available in Infinity 24 or Infinity 25. Can also appear as a column child inside SimpleTable multirecordlist views — add additionalDetails to control link behavior."
---

> **Infinity 26+ only:** `ObjectReference` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/pxViewMetadata/data-reference` for older Infinity versions.

```json
{
  "type": "ObjectReference",
  "config": {
    "allowCreatingRecords": false,
    "componentType": "Combobox",
    "contextPage": "@P .LeaveCategory",
    "displayField": "@P .LeaveCategory.ApprovalRequired",
    "hideFieldLabels": false,
    "label": "@FL .LeaveCategory",
    "labelOption": "default",
    "mode": "single",
    "referenceList": "D_LeaveCategoryList",
    "targetObjectClass": "MyCo-MyApp-Data-LeaveCategory",
    "targetObjectType": "data",
    "value": "@P .LeaveCategory.pyGUID"
  }
}
```
