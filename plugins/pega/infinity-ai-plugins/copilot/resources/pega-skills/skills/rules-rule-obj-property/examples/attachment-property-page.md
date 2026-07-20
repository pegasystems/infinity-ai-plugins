---
name: Attachment Property (Page)
description: Single-file attachment Page property of Embed-Attach-File with auto-derived parameter mapping. Prerequisite — create a `File-Only Attachment Category` first (see rules-rule-obj-attachmentcategory skill).
---

```json
{
  "pyPropertyName": "TempAttach",
  "pyLabel": "Temp Attach",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPropertyMode": "Page",
  "pyPageClass": "Embed-Attach-File",
  "pyCategoryName": "TempAttach",
  "pyDataRetrievalType": "AUTOMATIC",
  "pyDataObject": "D_pzAttachmentFieldInfo",
  "pyDOParamList": [
    { "pyName": "AttachmentFieldName", "pyValue": "\"TempAttach\"" },
    { "pyName": "AttachmentKey", "pyValue": ".TempAttach.pxAttachmentKey" },
    { "pyName": "AttachmentCategory", "pyValue": "\"TempAttach\"" },
    { "pyName": "ClassName", "pyValue": ".pxObjClass" }
  ]
}
```
