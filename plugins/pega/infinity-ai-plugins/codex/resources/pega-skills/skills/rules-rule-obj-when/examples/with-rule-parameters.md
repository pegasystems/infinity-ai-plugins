---
name: With Rule-Level Parameters
description: When rule that declares typed input parameters (Context B) and references them inside a condition as `Param.<Name>`. Demonstrates the rule-level `pyParameters` shape — distinct from the function-call parameter slots embedded in `pyFunctionData`.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleName": "IsMatchingCustomer",
  "pyBlockName": "IsMatchingCustomer",
  "pyLabel": "Is Matching Customer",
  "pyDescription": "True when the customer name matches the caller-supplied Param.Name AND a minimum age (Param.MinAge) is non-empty. Demonstrates rule-level Parameters tab declarations.",
  "pyRuleAvailable": "Yes",
  "pyLogic": "A AND B",
  "pyParameters": [
    {
      "pyParametersParamName": "Name",
      "pyParametersParamType": "Text",
      "pyParametersParamDesc": "Customer name to match against .CustomerFirstName"
    },
    {
      "pyParametersParamName": "MinAge",
      "pyParametersParamType": "Integer",
      "pyParametersParamDesc": "Minimum age threshold"
    }
  ],
  "pyCondition": [
    {
      "pyConditionLabel": "A",
      "pyConditionFieldName": ".CustomerFirstName",
      "pyConditionOperation": "=",
      "pyConditionValue1": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues(.CustomerFirstName, \"=\", Param.Name)",
      "pyConditionValue1Purpose": "CompareTwoValues",
      "pyConditionValue1String": ".CustomerFirstName = Param.Name ",
      "pyConditionValue1StringLabel": "[first value][relation][second value]",
      "pyCallParams": {
        "lValue": ".CustomerFirstName",
        "comparator": "=",
        "rValue": "Param.Name"
      },
      "pyFunctionData": {
        "pyName": "CompareTwoValues",
        "pyCity": "CompareTwoValues",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, \"{comparator}\", {rValue})",
        "pyEcho": "[first value] [relation] [second value]",
        "pyLabel": "[first value][relation][second value]",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {"pyParametersParamName": "lValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "first value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": ".CustomerFirstName", "pyIsOptional": "false"},
          {"pyParametersParamName": "comparator", "pyParametersParamType": "Values", "pyParametersParamDesc": "relation", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators", "pyParametersParamValue": "=", "pyIsOptional": "false"},
          {"pyParametersParamName": "rValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "second value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "Param.Name", "pyIsOptional": "false"}
        ],
        "pyUIParameters": [
          {"pyNodeCaption": "1", "pyParametersParamName": "lValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "first value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "1"},
          {"pyNodeCaption": "2", "pyParametersParamName": "comparator", "pyParametersParamType": "Values", "pyParametersParamDesc": "relation", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "2"},
          {"pyNodeCaption": "3", "pyParametersParamName": "rValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "second value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "3"}
        ]
      }
    },
    {
      "pyConditionLabel": "B",
      "pyCondValueCategory": "AND",
      "pyConditionFieldName": "true",
      "pyConditionOperation": "=",
      "pyConditionValue1": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues(Param.MinAge, \"!=\", \"\")",
      "pyConditionValue1Purpose": "CompareTwoValues",
      "pyConditionValue1String": "Param.MinAge != \"\" ",
      "pyConditionValue1StringLabel": "[first value][relation][second value]",
      "pyCallParams": {
        "lValue": "Param.MinAge",
        "comparator": "!=",
        "rValue": "\"\""
      },
      "pyFunctionData": {
        "pyName": "CompareTwoValues",
        "pyCity": "CompareTwoValues",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, \"{comparator}\", {rValue})",
        "pyEcho": "[first value] [relation] [second value]",
        "pyLabel": "[first value][relation][second value]",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {"pyParametersParamName": "lValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "first value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "Param.MinAge", "pyIsOptional": "false"},
          {"pyParametersParamName": "comparator", "pyParametersParamType": "Values", "pyParametersParamDesc": "relation", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators", "pyParametersParamValue": "!=", "pyIsOptional": "false"},
          {"pyParametersParamName": "rValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "second value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "\"\"", "pyIsOptional": "false"}
        ],
        "pyUIParameters": [
          {"pyNodeCaption": "1", "pyParametersParamName": "lValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "first value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "1"},
          {"pyNodeCaption": "2", "pyParametersParamName": "comparator", "pyParametersParamType": "Values", "pyParametersParamDesc": "relation", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "2"},
          {"pyNodeCaption": "3", "pyParametersParamName": "rValue", "pyParametersParamType": "Freeform", "pyParametersParamDesc": "second value", "pyParametersParamDropdownValues": "Property", "pyParametersParamIntelliValidateAs": "30", "pyParametersParamValue": "", "pyIsOptional": "false", "pyReference": "3"}
        ]
      }
    }
  ]
}
```

