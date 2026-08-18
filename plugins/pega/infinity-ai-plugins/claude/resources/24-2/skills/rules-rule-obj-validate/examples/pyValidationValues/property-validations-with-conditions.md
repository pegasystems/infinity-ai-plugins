---
name: property-validations-with-conditions
description: ACTIVITY-mode validate rule with multiple property validations, each guarded by an embedded when condition built from the 1FreeFormExpressionBoolean function alias.
---

```json
{
  "pyActivityName": "MyValidateRule",
  "pyLabel": "My Validate Rule",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyActivityType": "ACTIVITY",
  "pyDescription": "Field-level validations for MyCase.",
  "pyValidationValues": [
    {
      "pxListSubscript": "1",
      "pyLabel": "Default Validation",
      "pyColumnExpanded": true,
      "pyValidations": [
        {
          "pxListSubscript": "1",
          "pyPropertyName": ".Field1",
          "pyPropertyMode": "String",
          "pyValidationType": "ValidateProperty",
          "pyRequired": "false",
          "pyContinue": "true",
          "pyConditions": "true",
          "pyMessageValue": "\"Field1 must not contain numeric characters.\"",
          "pyValidWhen": {
            "pyCondition": [
              {
                "pyConditionLabel": "A",
                "pyConditionFieldName": "true",
                "pyConditionOperation": "=",
                "pyConditionValue1": "false",
                "pyConditionValue1Purpose": "1FreeFormExpressionBoolean",
                "pyConditionValue1String": "@(Pega-RulesEngine:String).pxContainsViaRegex(.Field1, \"[0-9]\", true) ",
                "pyConditionValue1StringLabel": "[expression evaluates to true]",
                "pyCallParams": {
                  "expression": "@(Pega-RulesEngine:String).pxContainsViaRegex(.Field1, \"[0-9]\", true)"
                },
                "pyFunctionData": {
                  "pyBaseClass": "Rule-Obj-Validate",
                  "pyCity": "1FreeFormExpressionBoolean",
                  "pyClassName": "@baseclass",
                  "pyEcho": "[expression evaluates to true]",
                  "pyLabel": "[expression evaluates to true]",
                  "pyName": "1FreeFormExpressionBoolean",
                  "pyReturnType": "boolean",
                  "pyRuleSet": "Pega-RULES",
                  "pySignature": "{expression}",
                  "pyUsage": "java",
                  "pyParameters": [
                    {
                      "pyParametersParamDesc": "expression evaluates to true",
                      "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
                      "pyParametersParamName": "expression",
                      "pyParametersParamType": "HTMLProperty",
                      "pyParametersParamValue": "@(Pega-RulesEngine:String).pxContainsViaRegex(.Field1, \"[0-9]\", true)"
                    }
                  ],
                  "pyUIParameters": [
                    {
                      "pyNodeCaption": "1",
                      "pyParametersParamDesc": "expression evaluates to true",
                      "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
                      "pyParametersParamName": "expression",
                      "pyParametersParamType": "HTMLProperty",
                      "pyReference": "1"
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "pxListSubscript": "2",
          "pyPropertyName": ".Field2",
          "pyPropertyMode": "String",
          "pyValidationType": "ValidateProperty",
          "pyRequired": "false",
          "pyContinue": "true",
          "pyConditions": "true",
          "pyMessageValue": "\"Field2 must not be empty and must be at most 64 characters.\"",
          "pyValidWhen": {
            "pyCondition": [
              {
                "pyConditionLabel": "A",
                "pyConditionFieldName": "true",
                "pyConditionOperation": "=",
                "pyConditionValue1": "false",
                "pyConditionValue1Purpose": "1FreeFormExpressionBoolean",
                "pyConditionValue1String": ".Field2==\"\" || @(Pega-RULES:String).length(.Field2)>64 ",
                "pyConditionValue1StringLabel": "[expression evaluates to true]",
                "pyCallParams": {
                  "expression": ".Field2==\"\" || @(Pega-RULES:String).length(.Field2)>64"
                },
                "pyFunctionData": {
                  "pyBaseClass": "Rule-Obj-Validate",
                  "pyCity": "1FreeFormExpressionBoolean",
                  "pyClassName": "@baseclass",
                  "pyEcho": "[expression evaluates to true]",
                  "pyLabel": "[expression evaluates to true]",
                  "pyName": "1FreeFormExpressionBoolean",
                  "pyReturnType": "boolean",
                  "pyRuleSet": "Pega-RULES",
                  "pySignature": "{expression}",
                  "pyUsage": "java",
                  "pyParameters": [
                    {
                      "pyParametersParamDesc": "expression evaluates to true",
                      "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
                      "pyParametersParamName": "expression",
                      "pyParametersParamType": "HTMLProperty",
                      "pyParametersParamValue": ".Field2==\"\" || @(Pega-RULES:String).length(.Field2)>64"
                    }
                  ],
                  "pyUIParameters": [
                    {
                      "pyNodeCaption": "1",
                      "pyParametersParamDesc": "expression evaluates to true",
                      "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
                      "pyParametersParamName": "expression",
                      "pyParametersParamType": "HTMLProperty",
                      "pyReference": "1"
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```
