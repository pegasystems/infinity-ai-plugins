---
name: list-of-values-condition-params
description: Required `pyCallParams` + `pyFunctionData` shape for the `listOfValues` parameter on list-of-values aliases (`pxIsInListOfValues`, `pxIsInListOfValuesWCB`, `pxIsNotInListOfValuesWCB`, `pxIsInListOfValuesInPageList`, `pxIsNotInListOfValuesInPageList`). The literal value is `"'CA','NY','TX'"` — the outer double-quotes are part of the string. `pyUIParameters[listOfValues].pyParametersParamValue` is `""` because the UI display is sourced from `pyCommaDelimitedString`. Drop this fragment inside an `Embed-WhenConditions` row (see `embed-whencondition-clause.md`).
---

```json
{
  "pyCallParams": {
    "value": ".State",
    "listOfValues": "\"'CA','NY','TX'\""
  },
  "pyFunctionData": {
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamValue": "\"'CA','NY','TX'\"",
        "pyCommaDelimitedString": "\"'CA','NY','TX'\"",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString",
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
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamValue": "",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString"
      }
    ]
  }
}
```
