---
name: pyParameters entry — Decimal
description: Decimal-typed data page parameter (fixed-precision). Used for monetary amounts, percentages, and other exact numeric values. pyParametersParamType must be Title Case "Decimal", not all-caps "DECIMAL" — all-caps is silently accepted by the API but renders as Boolean in Infinity Studio and blocks save with "Boolean parameters cannot be marked required" if the parameter is required.
---

```json
{
  "pyParametersParamName": "minAmount",
  "pyParametersParamType": "Decimal",
  "pyParametersParamInOut": "IN",
  "pyParametersParamReq": "0",
  "pyParametersParamDefaultValue": "0.00",
  "pyParametersParamDesc": "Minimum transaction amount"
}
```
