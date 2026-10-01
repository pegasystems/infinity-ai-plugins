---
name: Work Privilege Security
description: Use when create access to attachments should be controlled by a role-based privilege. Contains attachment-level security enabled with a privilege entry that grants create access using a built-in Work- privilege.
---

```json
{
  "pyClassName": "Work-",
  "pyCategoryName": "PrivilegedDocuments",
  "pyLabel": "Privileged Documents",
  "pyEnableAttachmentLevelSecurity": "true",
  "pyActionPrivilegeList": [
    {
      "pyPrivilegeName": "ActionAddAttachments",
      "pyAllowCreate": "true"
    }
  ]
}
```
