---
name: business-action-child-case
description: Load when creating a Business Action for a child case that is auto-created by the app. Shows CaptureChildCase + PerformAssignment steps. The BA lives on the child case class, receives the parent CaseID and ChildCasePrefix as inputs, and outputs ChildCaseIDAutoMapped.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-BaggageClaim",
  "pyPurpose": "BaggageClaimChildCase",
  "pyLabel": "Create Baggage Claim Child Case",
  "pyKeywordDescription": "Baggage Claim Child Case creation",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Child Case Prefix",
      "pyParameterValue": "B"
    },
    {
      "pyParameterName": "Number of bags",
      "pyParameterValue": "2"
    },
    {
      "pyParameterName": "Baggage weight",
      "pyParameterValue": "15.5"
    },
    {
      "pyParameterName": "Baggage size",
      "pyParameterValue": "small"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyOutputParameters": [
    {
      "pyParameterName": "ChildCaseIDAutoMapped",
      "pyMapOutputFrom": "Response"
    }
  ],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-CaptureChildCase",
      "pyStepType": "Embed-APIAutomation-Execution-CaptureChildCase",
      "pyStepDescription": "Capture Baggage Claim child case ID",
      "pyOutputParameters": [
        {
          "pyParameterName": "ChildCaseIDAutoMapped",
          "pyParameterValue": ""
        }
      ],
      "pyActionParameters": [
        {
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID",
          "pyMapActionParameterFrom": "Input"
        },
        {
          "pyParameterName": "ChildCasePrefix",
          "pyParameterValue": "Child Case Prefix",
          "pyMapActionParameterFrom": "Input"
        }
      ]
    },
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "BaggageDetails",
      "pyExecutionContext": "MyOrg-MyApp-Work-BaggageClaim",
      "pyStepDescription": "User submits Baggage Details form",
      "pyForm": [
        {
          "pyParameterName": "NumberOfBags",
          "pyParameterValue": "Number of bags",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "BaggageWeight",
          "pyParameterValue": "Baggage weight",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "BaggageSize",
          "pyParameterValue": "Baggage size",
          "pyMapRequestFieldFrom": "Input"
        }
      ],
      "pyActionParameters": [
        {
          "pyParameterName": "CaseID",
          "pyParameterValue": "ChildCaseID",
          "pyMapActionParameterFrom": "Constant"
        },
        {
          "pyParameterName": "Assignment",
          "pyParameterValue": "BaggageDetails",
          "pyMapActionParameterFrom": "Constant"
        },
        {
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails",
          "pyMapActionParameterFrom": "Input"
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Baggage_Claim_Child_Case(page, browser, context, Child_Case_Prefix, Number_of_bags, Baggage_weight,Baggage_size);",
  "pyPlaywrightScript": "Baggage_Claim_Child_Case = async (page, browser, context, Child_Case_Prefix, Number_of_bags, Baggage_weight,Baggage_size): Promise<void> => {\nawait caseUtils.clickGo(page, \"Baggage Details\");\nif (Number_of_bags) {\n  await page.getByTestId('Number of bags:number-input:control').fill(Number_of_bags);\n}\nif (Baggage_weight) {\n  await page.getByTestId('Baggage weight:number-input:control').fill(Baggage_weight);\n}\nif (Baggage_size) {\n  await page.getByTestId('Baggage size:input:control').fill(Baggage_size);\n}\nawait caseUtils.clickSubmit(page);\nawait userPortal.search(page, (config.outputParameters as Record<string, string>).FlightBookingCaseID);\nawait page.keyboard.press('Enter');\nawait page.waitForTimeout(2000);\nif(await page.locator(`//span[@data-testid=':case:id' and contains(text(),'${Child_Case_Prefix}')]`).count() > 0) {\n  ((config.outputParameters ??= {}) as Record<string, string>).BaggageClaimCaseID = await page.locator(\n    `//span[@data-testid=':case:id' and contains(text(),'${Child_Case_Prefix}')]`).textContent();\n} else {\n  console.log(\"Not a child case ID to capture\");\n}\n}"
}
```