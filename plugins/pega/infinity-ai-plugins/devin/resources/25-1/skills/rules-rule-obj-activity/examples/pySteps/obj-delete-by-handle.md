---
name: Obj-Delete-By-Handle
description: Delete a database instance by its handle (pzInsKey) without opening it first
---

```json
{
  "pyStepsActivityName": "Obj-Delete-By-Handle",
  "pyStepsDescription": "Delete instance",
  "pyStepsObjectName": "",
  "pyStepsCallParams": {
    "InstanceHandle": ".pzInsKey",
    "Lock": "false",
    "ReleaseOnCommit": "false",
    "LockInfoPage": "",
    "Immediate": "true"
  }
}
```
