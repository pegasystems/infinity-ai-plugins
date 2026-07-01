---
name: "compareTwoStrings"
description: "compareTwoStrings: [first String] [relation] [Second String]"
---

This example uses placeholder values `<<lValue>>`, `<<comparator>>`, `<<rValue>>`
to make the **three positions** where each business value must be written
visible at a glance:

1. `pyCallParams[paramName]`
2. `pyFunctionData.pyParameters[i].pyParametersParamValue`
3. `pyFunctionData.pyUIParameters[i].pyParametersParamValue`

Replace **every** `<<lValue>>` with the user's first-value expression
(e.g. `.AccountType`), every `<<comparator>>` with one of `pyAllowedValues`
(e.g. `EQUALS`), and every `<<rValue>>` with the user's second-value
expression (e.g. `"\"Premium\""` — string literal must be inside escaped
quotes). Also pre-render `pyConditionValue1` and `pyConditionValue1String`
on the surrounding `Embed-WhenConditions` (see
`rules-rule-obj-validate/examples/property-validations-with-conditions.md`
for the full embedding pattern).

```json
{
  "purpose": "compareTwoStrings",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "compareTwoStrings",
    "pyCity": "compareTwoStrings",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "[first String] [relation] [Second String]",
    "pyLabel": "[first String][relation][Second String]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "String compare using property alias",
    "pyParameters": [
      {
        "pxListSubscript": "1",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first String",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": "<<lValue>>"
      },
      {
        "pxListSubscript": "2",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
        "pyParametersParamValue": "<<comparator>>",
        "pyParametersParamDropdownValues": "Property",
        "pyAllowedValues": [
          "EQUALS",
          "DOES NOT EQUAL"
        ]
      },
      {
        "pxListSubscript": "3",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second String",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": "<<rValue>>"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first String",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": "",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
        "pyParametersParamValue": "",
        "pyReference": "2",
        "pyParametersParamDropdownValues": "Property",
        "pyAllowedValues": [
          "EQUALS",
          "DOES NOT EQUAL"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second String",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": "",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "lValue": "<<lValue>>",
    "comparator": "<<comparator>>",
    "rValue": "<<rValue>>"
  }
}
```

## Worked example

For `lValue=.AccountType`, `comparator=EQUALS`, `rValue="Premium"`:

- All `<<lValue>>` → `.AccountType`
- All `<<comparator>>` → `EQUALS`
- All `<<rValue>>` → `"\"Premium\""` (in JSON; the rendered Java argument is `"Premium"`)

On the surrounding `Embed-WhenConditions`:

- `pyConditionValue1`: `@(Pega-RULES:ExpressionEvaluators).compareTwoStrings(.AccountType, "EQUALS", "Premium")`
- `pyConditionValue1String`: `.AccountType EQUALS "Premium"`
- `pyConditionValue1StringLabel`: `[first String][relation][Second String]` (verbatim from `pyLabel`)
