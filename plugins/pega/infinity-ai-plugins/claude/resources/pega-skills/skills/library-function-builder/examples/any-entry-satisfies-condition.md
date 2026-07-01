---
name: "anyEntrySatisfiesCondition"
description: "anyEntrySatisfiesCondition: ANY non-empty value in [entry] [relation] [value]"
---

**Important — `collectionEntry` must reference a collection, and the reference
must use collection syntax with parentheses.**
The function signature is `entrySatisfiesCondition(ClipboardPropertyCollection,
String, double, String)`. A bare property reference (e.g. `.Ratings`) is typed
as `ClipboardProperty` and will fail with "No suitable instance found … seeking
entrySatisfiesCondition(ClipboardProperty, …)". Use one of these forms:
- Value list / value group: `.Ratings()` (add empty parens to coerce to collection)
- Scalar across a page list: `.Items().Rating`
PageList properties referenced bare (e.g. `.Items`) will not resolve. Pass
`value` as a literal that resolves to `double`. See
`rules-rule-obj-validate/SKILL.md` Gap on `entrySatisfiesCondition`.

```json
{
  "purpose": "anyEntrySatisfiesCondition",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "anyEntrySatisfiesCondition",
    "pyCity": "anyEntrySatisfiesCondition",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).entrySatisfiesCondition({collectionEntry}, \"{comparator}\", {value}, {multiplicity})",
    "pyEcho": "ANY non-empty value in [entry] [relation] [value]",
    "pyLabel": "Has Entry That Satisfies Condition",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "collectionEntry",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "entry",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": ".pyRAFPropCollectionSP",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".Ratings",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyRAFPropCollectionSP": ".Ratings"
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
        "pyParametersParamValue": "=",
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
        "pyParametersParamValue": "\"Excellent\""
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "multiplicity",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "ANY",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "\"ANY\"",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "\"ANY\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "collectionEntry",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "entry",
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
        "pyParametersParamDesc": "ANY",
        "pyIsOptional": "false",
        "pyReference": "4",
        "pyParametersParamIntelliValidateAs": "\"ANY\"",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "collectionEntry": ".Ratings()",
    "comparator": "=",
    "value": "\"Excellent\"",
    "multiplicity": "\"ANY\""
  }
}
```
