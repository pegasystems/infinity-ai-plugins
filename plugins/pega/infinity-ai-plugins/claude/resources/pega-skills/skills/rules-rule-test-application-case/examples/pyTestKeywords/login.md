---
name: testcase-keyword-login
description: Load when mapping a Login keyword. Shows URL and Persona parameters sourced from Global Test Data.
---

```json
{
  "pyPurpose": "Login",
  "pyClassName": "Work-",
  "pyKeywordType": "GIVEN",
  "pyKeywordDescription": "User is logged in as Applicant",
  "pyLabel": "Login/User Context",
  "pyInputParameters": [
    {
      "pyParameterValue": "URL",
      "pyMapTestInputFrom": "Global Test Data",
      "pyParameterName": "URL"
    },
    {
      "pyParameterValue": "Applicant",
      "pyMapTestInputFrom": "Global Test Data",
      "pyParameterName": "Persona"
    }
  ]
}
```
