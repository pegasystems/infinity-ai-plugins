---
name: flow-sparse-update
description: 'Use when adding a shape to an existing flow via deep-merge update. Shows a sparse payload adding an Assignment and connector.'
---

```json
{
  "pyModelProcess": {
    "pyShapes": {
      "Assignment3": {
        "pxObjClass": "Data-MO-Activity-Assignment",
        "pyMOId": "Assignment3",
        "..."
      }
    },
    "pyConnectors": {
      "Transition8": {
        "pyMOId": "Transition8",
        "pyFrom": "Assignment3",
        "..."
      }
    }
  },
  "pyFromTasks": ["... full array including the new shape ..."]
}
```
