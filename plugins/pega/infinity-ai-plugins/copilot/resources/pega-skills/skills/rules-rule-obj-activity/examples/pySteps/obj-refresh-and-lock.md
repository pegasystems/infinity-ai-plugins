---
name: Obj-Refresh-And-Lock
description: Re-read the persisted instance for the step page and acquire a pessimistic lock. Use before in-place updates that must serialize against concurrent writes.
---

```json
{
  "pyStepsActivityName": "Obj-Refresh-And-Lock",
  "pyStepsDescription": "Reload the case and acquire a lock before updating",
  "pyStepsCallParams": {
    "ReleaseOnCommit": "true",
    "LockInfoPage": "LockInfo"
  }
}
```
