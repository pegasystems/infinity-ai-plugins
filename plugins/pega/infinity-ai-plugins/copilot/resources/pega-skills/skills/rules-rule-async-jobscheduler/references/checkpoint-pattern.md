---
name: jobscheduler-checkpoint-pattern
title: Checkpoint Pattern (Resumable JS Activity)
description: How to design a Job Scheduler activity that can resume after a node restart, using NEW/IN-PROGRESS/PROCESSED status transitions.
---

**When to use:** Any JS activity that processes more than a few hundred records. Without
checkpointing, a node shutdown restarts the entire job from the beginning.

## Design

```
Activity steps:
  Step 1: Obj-Browse — load work items where pyStatusWork = "NEW"
  Step 2: Loop over results:
    a. Property-Set pyStatusWork = "IN-PROGRESS"
    b. Obj-Save    — commits status before work begins
    c. [business logic — a sub-activity is recommended]
    d. Property-Set pyStatusWork = "PROCESSED"
    e. Obj-Save
    f. Catch and log any exception — never let one record abort the entire loop
  Step 3: Log-Message — log completion count
```

**On restart:** the Obj-Browse in step 1 returns only `NEW` items — already-processed
records are skipped automatically.
