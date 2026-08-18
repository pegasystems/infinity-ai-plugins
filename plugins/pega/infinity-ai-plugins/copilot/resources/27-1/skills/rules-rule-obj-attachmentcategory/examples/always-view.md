---
name: Always View Security
description: Use when everyone should be able to view attachments in this category with no conditions. Contains attachment-level security enabled with a when-rule entry that unconditionally grants view access.
---

```json
{
  "pyClassName": "Work-",
  "pyCategoryName": "ViewableDocuments",
  "pyLabel": "Viewable Documents",
  "pyEnableAttachmentLevelSecurity": "true",
  "pyActionWhensList": [
    {
      "pyWhenName": "Always",
      "pyAllowViewAll": "true"
    }
  ]
}
```
