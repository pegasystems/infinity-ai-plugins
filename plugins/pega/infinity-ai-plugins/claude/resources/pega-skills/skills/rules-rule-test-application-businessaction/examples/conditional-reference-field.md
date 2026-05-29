---
name: business-action-reference-conditional
description: Load when a Business Action form shows a reference picker only after another field is selected. Contains a choice field and a conditional reference.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ExpenseReport",
  "pyPurpose": "ReassignexpenseAction",
  "pyLabel": "Reassign expense",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User performs Reassign expense action",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Reassignment reason",
      "pyParameterValue": "Transfer to another department"
    },
    {
      "pyParameterName": "Department",
      "pyParameterValue": "Finance:DEPT-5"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyOutputParameters": [],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAction",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAction",
      "pyStepDescription": "User submits Reassign expense Action",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Action Name",
          "pyParameterValue": "ReassignExpense"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyMapRequestFieldFrom": "Input",
          "pyParameterName": "ReassignmentReason",
          "pyParameterValue": "Reassignment reason"
        },
        {
          "pyParameterName": "DepartmentRef",
          "pyParameterType": "Reference",
          "pyTestReferenceField": [
            {
              "pyMapActionParameterFrom": "Input",
              "pyParameterName": "pyID",
              "pyParameterValue": "Department"
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Reassign_expense(page, browser, context, Reassignment_reason, Department);",
  "pyPlaywrightScript": "Reassign_expense = async (page, browser, context, Reassignment_reason, Department): Promise<void> => {\n  await caseUtils.openCaseWideActions(page, \"Reassign expense\");\n\n  if (Reassignment_reason) { await page.locator(\"//fieldset[@data-testid='Reassignment reason']//label[text()='\" + Reassignment_reason + \"']\").click(); }\n  if (Department &&  Reassignment_reason == \"Transfer to another department\") { await commonUtils.Handle_ReferenceListMethods(page, 'autocomplete', 'Department', 'singleselect', Department); }\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
