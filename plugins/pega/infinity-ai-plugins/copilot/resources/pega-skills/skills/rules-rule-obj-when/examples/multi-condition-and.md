---
name: Multi-Condition AND
description: When rule combining two different function aliases with AND logic — demonstrates rule wrapping, per-condition pyFunctionData substitution, and pyLogic/pyCondValueCategory wiring.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleName": "IsScheduledWithPatient",
  "pyBlockName": "IsScheduledWithPatient",
  "pyLabel": "Is Scheduled With Patient",
  "pyDescription": "True when status is Scheduled AND patient name is present",
  "pyRuleAvailable": "Yes",
  "pyLogic": "A AND B",
  "pyCondition": [
    {
      "pyConditionLabel": "A",
      "pyConditionFieldName": ".AppointmentStatus",
      "pyConditionOperation": "=",
      "pyConditionValue1": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings(.AppointmentStatus, \"EQUALS\", \"Scheduled\")",
      "pyConditionValue1Purpose": "compareTwoStrings",
      "pyConditionValue1String": ".AppointmentStatus EQUALS \"Scheduled\" ",
      "pyConditionValue1StringLabel": "[first String][relation][Second String]",
      "pyCallParams": {
        "lValue": ".AppointmentStatus",
        "comparator": "EQUALS",
        "rValue": "\"Scheduled\""
      },
      "pyFunctionData": {
        "pyName": "compareTwoStrings",
        "pyCity": "compareTwoStrings",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings({lValue}, \"{comparator}\", {rValue})",
        "pyEcho": "[first String] [relation] [Second String]",
        "pyLabel": "[first String][relation][Second String]",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {
            "pyParametersParamName": "lValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "first String",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "20",
            "pyParametersParamValue": ".AppointmentStatus",
            "pyIsOptional": "false"
          },
          {
            "pyParametersParamName": "comparator",
            "pyParametersParamType": "Values",
            "pyParametersParamDesc": "relation",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
            "pyParametersParamValue": "EQUALS",
            "pyIsOptional": "false"
          },
          {
            "pyParametersParamName": "rValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "Second String",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "20",
            "pyParametersParamValue": "\"Scheduled\"",
            "pyIsOptional": "false"
          }
        ],
        "pyUIParameters": [
          {
            "pyNodeCaption": "1",
            "pyParametersParamName": "lValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "first String",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "20",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "1"
          },
          {
            "pyNodeCaption": "2",
            "pyParametersParamName": "comparator",
            "pyParametersParamType": "Values",
            "pyParametersParamDesc": "relation",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "2"
          },
          {
            "pyNodeCaption": "3",
            "pyParametersParamName": "rValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "Second String",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "20",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "3"
          }
        ]
      }
    },
    {
      "pyConditionLabel": "B",
      "pyCondValueCategory": "AND",
      "pyConditionFieldName": ".PatientName",
      "pyConditionOperation": "=",
      "pyConditionValue1": "@(Pega-RULES:Utilities).PropertyHasValue(.PatientName)",
      "pyConditionValue1Purpose": "PropertyHasValue",
      "pyConditionValue1String": ".PatientName has a value ",
      "pyConditionValue1StringLabel": "[property reference]has a value",
      "pyCallParams": {
        "strReference": ".PatientName"
      },
      "pyFunctionData": {
        "pyName": "PropertyHasValue",
        "pyCity": "PropertyHasValue",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "@(Pega-RULES:Utilities).PropertyHasValue({strReference})",
        "pyEcho": "[property reference] has a value",
        "pyLabel": "[property reference]has a value",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {
            "pyParametersParamName": "strReference",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "property reference",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "25",
            "pyParametersParamValue": ".PatientName",
            "pyIsOptional": "false"
          }
        ],
        "pyUIParameters": [
          {
            "pyNodeCaption": "1",
            "pyParametersParamName": "strReference",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "property reference",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "25",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "1"
          },
          {
            "pyParametersParamType": "Label",
            "pyParametersParamValue": "has a value"
          }
        ]
      }
    }
  ]
}
```

## Notes

- Each `pyCondition[]` entry has its own complete `pyFunctionData` block. Both blocks must set `pyClassName` to the rule's Applies-To class.
- The second condition (`B`) carries `pyCondValueCategory: "AND"`; the first (`A`) omits it.
- `pyLogic` references the labels (`"A AND B"`), not the expressions themselves.
- Authored values live only in `pyParameters[].pyParametersParamValue`; `pyUIParameters[].pyParametersParamValue` is `""` on every input row.
- `pyConditionValue1StringLabel` matches `pyFunctionData.pyLabel` (un-rendered template) — verified against live `Rule-Obj-When` instances.
