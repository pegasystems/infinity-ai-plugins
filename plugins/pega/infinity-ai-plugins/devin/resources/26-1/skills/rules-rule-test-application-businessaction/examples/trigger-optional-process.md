---
name: business-action-trigger-optional-process
description: Load when creating a Business Action to trigger an optional (ad-hoc) process. Shows OptionalProcess step type. Playwright clicks the process from the case actions menu. ProcessID = pyFlowName of the process from the case type rule. No view reading, no form fields.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-IncidentResponse",
  "pyPurpose": "TriggerEscalateToManagementProcess",
  "pyLabel": "Trigger Escalate to Management",
  "pyKeywordDescription": "User triggers Escalate to Management optional process",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyInputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterName": "CaseID"
    }
  ],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-OptionalProcess",
      "pyStepType": "Embed-APIAutomation-Execution-OptionalProcess",
      "pyExecutionContext": "MyOrg-MyApp-Work-IncidentResponse",
      "pyStepDescription": "User triggers Escalate to Management optional process",
      "pyActionParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "ProcessID",
          "pyParameterValue": "EscalateToManagement"
        }
      ],
      "pyForm": [],
      "pyOutputParameters": []
    }
  ],
  "pyPlaywrightScript": "await caseUtils.openCaseWideActions(page, \"Escalate to Management\");"
}
```
