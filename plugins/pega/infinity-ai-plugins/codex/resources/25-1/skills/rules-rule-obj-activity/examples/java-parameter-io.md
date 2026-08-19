---
name: Calculate Compound Interest
description: Calculates compound interest using A = P * (1 + R/N)^(N*T). All inputs and outputs are on the ParameterPage for Tracer visibility.
---

```json
{
  "pyActivityName": "CalculateCompoundInterest",
  "pyLabel": "Calculate Compound Interest",
  "pyClassName": "MyOrg-MyApp-Work",
  "pyDescription": "Calculates compound interest using A = P * (1 + R/N)^(N*T). All inputs and outputs are on the ParameterPage for Tracer visibility.",
  "pyParameters": [
    { "pyParametersParamName": "Principal", "pyParametersParamDesc": "Starting amount", "pyParametersParamType": "Decimal", "pyParametersParamInOut": "IN", "pyParametersParamReq": "-1" },
    { "pyParametersParamName": "Rate", "pyParametersParamDesc": "Annual interest rate (decimal)", "pyParametersParamType": "Decimal", "pyParametersParamInOut": "IN", "pyParametersParamReq": "-1" },
    { "pyParametersParamName": "CompoundsPerYear", "pyParametersParamDesc": "Number of times interest compounds per year", "pyParametersParamType": "INTEGER", "pyParametersParamInOut": "IN", "pyParametersParamReq": "-1" },
    { "pyParametersParamName": "TimeYears", "pyParametersParamDesc": "Duration in years", "pyParametersParamType": "INTEGER", "pyParametersParamInOut": "IN", "pyParametersParamReq": "-1" },
    { "pyParametersParamName": "TotalAmount", "pyParametersParamDesc": "Final amount after interest", "pyParametersParamType": "Decimal", "pyParametersParamInOut": "OUT" },
    { "pyParametersParamName": "CompoundInterest", "pyParametersParamDesc": "Interest earned", "pyParametersParamType": "Decimal", "pyParametersParamInOut": "OUT" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Java",
      "pyStepsDescription": "Compute compound interest: A = P * (1 + R/N)^(N*T)",
      "pyStepsJavaSource": "ParameterPage parametersPage = tools.getParameterPage();\ndouble p = Double.parseDouble(parametersPage.getString(\"Principal\"));\ndouble r = Double.parseDouble(parametersPage.getString(\"Rate\"));\nint n = Integer.parseInt(parametersPage.getString(\"CompoundsPerYear\"));\nint t = Integer.parseInt(parametersPage.getString(\"TimeYears\"));\n\ndouble amount = p * Math.pow(1.0 + r / n, n * t);\ndouble interest = amount - p;\n\namount = Math.round(amount * 100.0) / 100.0;\ninterest = Math.round(interest * 100.0) / 100.0;\n\nparametersPage.putString(\"TotalAmount\", String.valueOf(amount));\nparametersPage.putString(\"CompoundInterest\", String.valueOf(interest));"
    }
  ]
}
```
