---
name: "pxIsInListOfValues"
description: "pxIsInListOfValues: [value] is in [list of values]"
---

**Important — list-of-values aliases need self-quoting + auxiliary fields.**
Pega's alias-expansion engine rebuilds the compiled when expression from
`pyParameters` / `pyCallParams`, **not** from `pyConditionValue1`. Almost
every variant requires the `listOfValues` value to be wrapped in literal
double-quotes (`"\"'CA','NY','TX'\""`) AND to carry
`pyCommaDelimitedString`, `pySelectedValues`, and a nested `pxPages.HtmlPropPage`
sibling. Without these, alias expansion fails (`No candidates found …`) or
Pega strips the outer quotes (`mismatched input 'NY'`).

**Which variants need this template** (apply the full shape below):
- All `*WCB` variants — including `pxIsNotInListOfValuesWCB` (the WCB "Not"
  form fails on values containing `@` or other special characters without it).
- All non-WCB "In" variants — `pxIsInListOfValues`, `pxIsInListOfValuesInPageList`.
- All `*InPageList` counterparts.

Only plain `pxIsNotInListOfValues` (non-WCB, non-PageList) accepts a bare
`"CA,NY,TX"`. When in doubt, apply this template.

Substitute the user's items into all four occurrences of the quoted list and
the dquoted-only `pySelectedValues`.

```json
{
  "purpose": "pxIsInListOfValues",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsInListOfValues",
    "pyCity": "pxIsInListOfValues",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsInListOfValues({value}, {listOfValues})",
    "pyEcho": "[value] is in [list of values]",
    "pyLabel": "[value] is in [list of values]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "checks if the value is present in the list of values. For example 1) \"a\" is in \"a,b,c,d\" return true",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".State"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "list of values",
        "pyIsOptional": "false",
        "pyParametersParamValue": "\"'CA','NY','TX'\"",
        "pyCommaDelimitedString": "\"'CA','NY','TX'\"",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString",
        "pyEchoParametersParamValue": "pyCommaDelimitedString",
        "pySelectedValues": "\"CA\",\"NY\",\"TX\"",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-Validate",
            "pxSubscript": "HtmlPropPage",
            "pyCommaDelimitedString": "\"'CA','NY','TX'\""
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamValue": ""
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is in"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "list of values",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamValue": ""
      }
    ]
  },
  "pyCallParams": {
    "value": ".State",
    "listOfValues": "\"'CA','NY','TX'\""
  }
}
```

**Pre-rendered when-row fields:**

- `pyConditionValue1`: `@(Pega-RULES:String).pxIsInListOfValues(.State, "'CA','NY','TX'")`
- `pyConditionValue1String`: `.State is in "CA,NY,TX"`
- `pyConditionValue1StringLabel`: `[value] is in [list of values]` (verbatim)

**Confirmed working** in `RULE-OBJ-VALIDATE OG97R-UHEALTH_1-WORK-PATIENTREGISTRATION VALIDATEALLPAGELISTFUNCTIONSA`.
