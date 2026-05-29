---
name: "allEntriesSatisfyCondition"
description: "allEntriesSatisfyCondition: ALL non-empty values in [entries] [relation] [value]"
---

**Important — `collectionEntry` must reference a collection, and the reference
must use collection syntax with parentheses.**
The function signature is `entrySatisfiesCondition(ClipboardPropertyCollection,
String, double, String)`. A bare property reference (e.g. `.Scores`) is typed
as `ClipboardProperty` and will fail with "No suitable instance found … seeking
entrySatisfiesCondition(ClipboardProperty, …)". Use one of these forms:
- Value list / value group: `.Scores()` (add empty parens to coerce to collection)
- Scalar across a page list: `.Items().Score`
PageList properties referenced bare (e.g. `.Items`) will not resolve.
Pass `value` as a literal that resolves to `double` (e.g. `70` is fine, but
quoted strings must be unwrapped). See `rules-rule-obj-validate/SKILL.md` Gap
on `entrySatisfiesCondition`.

```json
{
  "purpose": "allEntriesSatisfyCondition",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "allEntriesSatisfyCondition",
    "pyCity": "allEntriesSatisfyCondition",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).entrySatisfiesCondition({collectionEntry}, \"{comparator}\", {value}, {multiplicity})",
    "pyEcho": "ALL non-empty values in [entries] [relation] [value]",
    "pyLabel": "All Entries Satisfy a Condition",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "collectionEntry",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "entries",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": ".pyRAFPropCollectionSP",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".Scores",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyRAFPropCollectionSP": ".Scores"
          }
        }
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": ".pySymbolComparators",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ">=",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "70"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "multiplicity",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "ALL",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "\"ALL\"",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "\"ALL\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "collectionEntry",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "entries",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamIntelliValidateAs": ".pyRAFPropCollectionSP",
        "pyParametersParamDropdownValues": "Property"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": ".pySymbolComparators",
        "pyParametersParamDropdownValues": "Property",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamDropdownValues": "Property"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "4",
        "pyParametersParamName": "multiplicity",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "ALL",
        "pyIsOptional": "false",
        "pyReference": "4",
        "pyParametersParamIntelliValidateAs": "\"ALL\"",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "collectionEntry": ".Scores()",
    "comparator": ">=",
    "value": "70",
    "multiplicity": "\"ALL\""
  }
}
```
