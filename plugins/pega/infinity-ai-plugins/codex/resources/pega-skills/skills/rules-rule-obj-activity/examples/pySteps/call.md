---
name: Call (Activity name)
description: Invoke another activity from within this activity. Covers same-class calls, cross-class dot-qualified calls, and parameter passing.
---

```json
{
  "pyStepsActivityName": "Call pzMapAutomationErrorsToResponse",
  "pyStepsDescription": "Map automation errors to API response format",
  "pyStepsObjectName": "",
  "pyPassCurrentParameterPage": "false",
  "pyStepsCallParams": {
    "sourceErrPg": ".pyAutomationErrorsRef",
    "targetErrPg": "Param.pyAutomationErrors",
    "ErrorMappingDT": ""
  }
}
```

```json
{
  "pyStepsActivityName": "Call Work-.pzApplyPageInstructions",
  "pyStepsDescription": "Apply page instructions from the Work- base class",
  "pyStepsObjectName": "",
  "pyPassCurrentParameterPage": "true"
}
```
