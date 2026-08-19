---
name: Java
description: Calculate the total amount from principal and rate
---

```json
{
  "pyStepsActivityName": "Java",
  "pyStepsDescription": "Calculate the total amount from principal and rate",
  "pyStepsJavaSource": "ParameterPage parametersPage = tools.getParameterPage();\ndouble principal = Double.parseDouble(parametersPage.getString(\"Principal\"));\ndouble rate = Double.parseDouble(parametersPage.getString(\"Rate\"));\n\ndouble total = principal * (1.0 + rate);\ntotal = Math.round(total * 100.0) / 100.0;\n\nparametersPage.putString(\"TotalAmount\", String.valueOf(total));"
}
```
