---
name: Attachment Property (PageList)
description: Multi-file attachment PageList property of Embed-Attach-File with auto-derived parameter mapping. Prerequisite — create a `File-Only Attachment Category` first (see rules-rule-obj-attachmentcategory skill).
---

```json
{
  "pyPropertyName": "Tempattachmentslist",
  "pyLabel": "Temp Attachments List",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPropertyMode": "PageList",
  "pyPageClass": "Embed-Attach-File",
  "pyCategoryName": "Tempattachmentslist",
  "pyDataRetrievalType": "AUTOMATIC",
  "pyDataObject": "D_pzAttachmentFieldInfo",
  "pyIsRetrieveEachPageSeparately": "true",
  "pyDOParamList": [
    { "pyName": "AttachmentFieldName", "pyValue": "\"Tempattachmentslist\"" },
    { "pyName": "AttachmentKey", "pyValue": ".Tempattachmentslist.pxAttachmentKey" },
    { "pyName": "AttachmentCategory", "pyValue": "\"Tempattachmentslist\"" },
    { "pyName": "ClassName", "pyValue": ".pxObjClass" }
  ]
}
```
