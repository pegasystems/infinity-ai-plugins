---
name: Page-Merge-Into
description: Merge properties from one or more source pages into the step page. `Keep` controls how existing properties on the destination are handled.
---

```json
{
  "pyStepsActivityName": "Page-Merge-Into",
  "pyStepsDescription": "Merge source pages into the destination page",
  "pyStepsCallParams": {
    "Keep": "1"
  },
  "pyParamArray": [
    {
      "MergeFromList": "SourcePage1"
    },
    {
      "MergeFromList": "SourcePage2"
    }
  ]
}
```
