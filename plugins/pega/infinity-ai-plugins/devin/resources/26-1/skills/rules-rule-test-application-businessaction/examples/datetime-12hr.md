---
name: business-action-datetime-12hr
description: Load when a Business Action form has a DateTime field configured with 12-hour clock format (AM/PM). Contains sample DX API payload and UI playwright code showing the 12-hour datetime pattern.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "ScheduledepartureAssignment",
  "pyLabel": "Schedule departure",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User schedules the flight departure time",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Departure Date and Time",
      "pyParameterValue": "2026-08-15 09:30:00 AM"
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
      "pyAssignmentName": "Schedule departure",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Schedule departure assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "ScheduleDeparture"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "DepartureDateTime",
          "pyParameterValue": "Departure Date and Time",
          "pyParameterType": "Date Time",
          "pyMapRequestFieldFrom": "Input"
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Schedule departure\");\n\nif (params[\"Departure Date and Time\"]) { await commonUtils.Handle_DateTime(page, 'Departure Date and Time', params[\"Departure Date and Time\"]); }\n\nawait caseUtils.clickSubmit(page);"
}
```
