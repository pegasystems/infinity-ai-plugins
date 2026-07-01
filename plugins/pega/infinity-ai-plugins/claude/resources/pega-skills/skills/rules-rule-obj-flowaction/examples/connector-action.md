---
name: Connector Action (Assignment Shape)
description: Flow action wired to an assignment shape connector in a flow. Uses pyUsedAs LOCALANDCONNECTOR with STANDARD container type. This is the pattern needed when adding a new assignment step to a flow.
---

```json
{
  "pyActionName": "ConsolidateNotes",
  "pyLabel": "Consolidate Notes",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyUsedAs": "LOCALANDCONNECTOR",
  "pyViewReference": "ConsolidateNotes",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyAuditActivity": "Audit",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "STANDARD"
}
```
