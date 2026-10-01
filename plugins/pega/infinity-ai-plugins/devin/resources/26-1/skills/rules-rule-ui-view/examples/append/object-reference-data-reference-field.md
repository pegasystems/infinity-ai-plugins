---
name: "Append ObjectReference Data Reference Field (Infinity 26+)"
description: "Three-surface update-rule payload that appends an Infinity 26+ ObjectReference Data Reference field. Shows direct data page binding, $classesmetadata, $pagelists, and pxDependencies. Not available in Infinity 24 or Infinity 25."
---

> **Infinity 26+ only:** `ObjectReference` is not available in Infinity 24 or Infinity 25.
> Verify server version first using `methodology-explain-application` (Server Version Discovery).
> Use `rules-rule-ui-view/examples/append/data-reference-field` for older Infinity versions.

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
            "pyHideFieldLabels": false,
            "pyDisplayLabel": "Data Reference"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"ObjectReference\",\"config\":{\"allowCreatingRecords\":false,\"componentType\":\"Combobox\",\"contextPage\":\"@P .LeaveCategory\",\"displayField\":\"@P .LeaveCategory.ApprovalRequired\",\"hideFieldLabels\":false,\"label\":\"@FL .LeaveCategory\",\"labelOption\":\"default\",\"mode\":\"single\",\"referenceList\":\"D_LeaveCategoryList\",\"targetObjectClass\":\"MyCo-MyApp-Data-LeaveCategory\",\"targetObjectType\":\"data\",\"value\":\"@P .LeaveCategory.pyGUID\"}}],\"name\":\"Fields\",\"type\":\"Region\"}]}",
    "pxContextMetadata": "{\"$properties\":[\".LeaveCategory\",\".LeaveCategory.ApprovalRequired\",\".LeaveCategory.pyGUID\"],\"$fields\":[{\"name\":\".LeaveCategory.pyGUID\"},{\"name\":\".LeaveCategory\"},{\"name\":\".LeaveCategory.ApprovalRequired\"}],\"$classesmetadata\":[{\"name\":\"MyCo-MyApp-Data-LeaveCategory\",\"fetchDefaultDataSources\":true}],\"$pagelists\":[{\"$associated\":[],\"metaDataOnly\":true,\"pagelist\":\"D_LeaveCategoryList\",\"$readOnlyWhens\":[]}],\"$views\":[]}",
    "pxDependencies": "{\"components\":[\"ObjectReference\",\"Region\",\"DefaultForm\"]}"
  }
}
```
