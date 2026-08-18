---
name: embed-whencondition-clause
description: Single Embed-WhenConditions row shape for use inside `pyValidWhen.pyCondition[]` (or `pyRequiredWhen.pyCondition[]`). The `pyCallParams` / `pyFunctionData` blocks are placeholders — copy the concrete shape from the matching alias file in `library-function-builder/examples/` and substitute business values into all three positions (`pyCallParams[name]`, `pyParameters[i].pyParametersParamValue`, `pyUIParameters[j].pyParametersParamValue`).
---

```json
{
  "pxObjClass": "Embed-WhenConditions",
  "pyConditionLabel": "A",
  "pyConditionFieldName": "true",
  "pyConditionOperation": "=",
  "pyConditionValue1": "<rendered pySignature from library example>",
  "pyConditionValue1Purpose": "<alias from library, e.g. PropertyHasValue>",
  "pyConditionValue1String": "<rendered pyEcho from library example>",
  "pyConditionValue1StringLabel": "<verbatim pyLabel from library example>",
  "pyCondValueCategory": "AND",
  "pyUsage": "java",
  "pyCallParams": {},
  "pyFunctionData": {
    "pyParameters": [],
    "pyUIParameters": []
  }
}
```
