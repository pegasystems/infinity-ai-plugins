---
name: "1FreeFormExpressionBoolean"
description: "1FreeFormExpressionBoolean: [expression evaluates to true]"
---

```json
{
  "purpose": "1FreeFormExpressionBoolean",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "1FreeFormExpressionBoolean",
    "pyCity": "1FreeFormExpressionBoolean",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pyReturnType": "boolean",
    "pySignature": "{expression}",
    "pyEcho": "[expression evaluates to true]",
    "pyLabel": "[expression evaluates to true]",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "expression",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "expression evaluates to true",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
        "pyParametersParamValue": "(@(Pega-RULES:String).equals(.pyGotoStageOther, \"[Other]\") || @(Pega-RULES:String).equals(.pyGotoStageOther, \"OTHER\"))",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyExpressionBuilder": "(@(Pega-RULES:String).equals(.pyGotoStageOther, \"[Other]\") || @(Pega-RULES:String).equals(.pyGotoStageOther, \"OTHER\"))"
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "expression",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "expression evaluates to true",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
        "pyReference": "1",
        "pyExpressionGadget": {
          "pxObjClass": "PegaGadget-ExpressionBuilder",
          "pyEditable": "true",
          "pyIsLaunchAsOverlay": "",
          "pyShowCustomPages": "true",
          "pyShowLocalVariables": "false",
          "pyShowParameters": "true"
        }
      }
    ],
    "pyRuleSet": "Pega-RULES"
  },
  "pyCallParams": {
    "expression": ".TotalAmount > 1000 && .IsVerified == true"
  }
}
```

## Pega Expression Syntax — Critical Pitfalls

The `expression` parameter is parsed by the Pega expression engine, **not** the Java
compiler. Java method-call (dot) syntax on property references is rejected:

| Wrong (Java sugar — fails to compile) | Right (Pega function-call syntax) |
|---|---|
| `.ClientName.matches(".*[0-9].*")` | `@(Pega-RulesEngine:String).pxContainsViaRegex(.ClientName, "[0-9]", true)` |
| `.AddressLine1.length() > 64` | `@(Pega-RULES:String).length(.AddressLine1) > 64` |
| `.Email.toLowerCase()` | `@(Pega-RULES:String).toLowerCase(.Email)` |
| `.Items.size()` | `@pxPageListLengthCompare(...)` or use a dedicated alias |

Typical compile errors when the wrong form is used:

- `Invalid expression or reference: error: invalid reference .X.matches(?)`
- `Operation ">" is not permitted on types: unknown and integer` (the chained
  `.length()` returned `unknown` instead of an int)

**Allowed inside the expression:**

- Property references in dot notation: `.MyProperty`, `.Page.Sub.Field`
- Operators: `+`, `-`, `*`, `/`, `==`, `!=`, `<`, `<=`, `>`, `>=`, `&&`, `||`, `!`
- String literal compare: `.Status == "Open"`, `.Field == ""`
- Parameter references: `param.MyParam`, `local.MyLocal`
- Pega library functions: `@functionName(...)` or
  `@(LibraryRuleset:LibraryName).functionName(...)`
- Short aliases: `@trim()`, `@substring()`, `@inString()`, `@replaceAll()`,
  `@contains()`

**For the full catalogue of valid Pega expression functions** — string ops,
regex, length, null checks, date/number conversion, etc. — see
**`library/string-manipulation`**, **`library/numeric-and-math`**, and
**`library/date-and-time`**. Always pick a documented function from there
instead of inventing Java-style method calls.

### Common patterns

```text
# Field is empty
.Field == ""

# Field length over a limit
@(Pega-RULES:String).length(.Field) > 64

# Field contains a digit / non-digit
@(Pega-RulesEngine:String).pxContainsViaRegex(.Field, "[0-9]", true)

# Field contains a letter
@(Pega-RulesEngine:String).pxContainsViaRegex(.Field, "[a-zA-Z]", true)

# Field matches an exact regex (entire input)
@(Pega-RulesEngine:String).pxContainsViaRegex(.Field, "^[A-Z]{3}-\\d{4}$", false)

# Compound: empty OR too long
.Field == "" || @(Pega-RULES:String).length(.Field) > 64
```

Note: backslashes in regex must be **double-escaped** (`\\d`, `\\s`, `\\.`)
because the expression parser consumes one level of escaping before the Java
regex engine sees the pattern.
