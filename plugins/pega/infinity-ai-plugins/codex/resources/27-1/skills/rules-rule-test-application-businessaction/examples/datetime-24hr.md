---
name: business-action-datetime-24hr
description: Load when a Business Action form has a DateTime field configured with 24-hour clock format (no AM/PM). Contains sample DX API payload and UI playwright code showing the 24-hour datetime pattern.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "SchedulearrivalAssignment",
  "pyLabel": "Schedule arrival",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User schedules the flight arrival time",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Arrival Date and Time",
      "pyParameterValue": "2026-08-15 14:45:00"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyOutputParameters": [],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "Schedule arrival",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Schedule arrival assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "ScheduleArrival"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "ArrivalDateTime",
          "pyParameterValue": "Arrival Date and Time",
          "pyParameterType": "Date Time",
          "pyMapRequestFieldFrom": "Input"
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Schedule arrival\");\n\nif (params[\"Arrival Date and Time\"]) { await commonUtils.Handle_DateTime(page, 'Arrival Date and Time', params[\"Arrival Date and Time\"]); }\n\nawait caseUtils.clickSubmit(page);"
}
```
