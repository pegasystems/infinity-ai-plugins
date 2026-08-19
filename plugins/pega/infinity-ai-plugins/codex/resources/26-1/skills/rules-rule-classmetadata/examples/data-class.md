---
name: Data Class Metadata
description: Data-object metadata with pyListDataPage / pyLookUpDataPage / pySavableDataPage bindings, embedded Rule-Declare-Pages snapshots, and pyDataTypeLocalActions.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Data-MyDataObject",
  "pyListDataPage": "D_MyDataObjectList",
  "pyLookUpDataPage": "D_MyDataObject",
  "pySavableDataPage": "D_MyDataObject",
  "pyListDataPageInfo": {
    "pxObjClass": "Rule-Declare-Pages",
    "pyPageName": "D_MyDataObjectList"
  },
  "pyLookUpDataPageInfo": {
    "pxObjClass": "Rule-Declare-Pages",
    "pyIsAlternateKeyStorage": "true",
    "pyPageName": "D_MyDataObject",
    "pyDOParamList": [
      {
        "pxObjClass": "Embed-NameValuePair",
        "pyName": "pyGUID",
        "pyDescription": "Globally unique ID",
        "pyEditable": "false",
        "pyIsActivityParameter": "true",
        "pyParameterInOut": "IN",
        "pyParameterRequired": "-1",
        "pyParameterType": "STRING",
        "pyValue": "pyGUID"
      }
    ]
  },
  "pySavableDataPageInfo": {
    "pxObjClass": "Rule-Declare-Pages",
    "pyIsAlternateKeyStorage": "true",
    "pyPageName": "D_MyDataObject",
    "pyDOParamList": [
      {
        "pxObjClass": "Embed-NameValuePair",
        "pyName": "pyGUID",
        "pyDescription": "Globally unique ID",
        "pyEditable": "false",
        "pyIsActivityParameter": "true",
        "pyParameterInOut": "IN",
        "pyParameterRequired": "-1",
        "pyParameterType": "STRING",
        "pyValue": "pyGUID"
      }
    ]
  },
  "pyDataTypeLocalActions": [
    {
      "pxObjClass": "Embed-Pega-DataTypeAction-UpdateDetails",
      "pyActionName": "pyEdit",
      "pyActionLabel": "Edit",
      "pyActionType": "UpdateDetails",
      "pyClassName": "MyOrg-MyApp-Data-MyDataObject",
      "pyImage": "pi pi-clipboard-content-icon actionDragDropIcon pi-cd-assignment"
    }
  ],
  "pyPrimaryFields": [
    { "pxObjClass": "Pega-Fields", "pyPropertyName": "MyDataObjectName" },
    { "pxObjClass": "Pega-Fields", "pyPropertyName": "MyDataObjectIdentifier" }
  ]
}
```
