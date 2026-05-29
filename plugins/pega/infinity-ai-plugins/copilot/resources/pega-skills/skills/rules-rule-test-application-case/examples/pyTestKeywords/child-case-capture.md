---
name: testcase-keyword-child-capture
description: Load when a parent assignment triggers child case creation. Shows parent keyword capturing child CaseID as output for downstream child keywords.
---

```json
[
  {
      "pyPurpose": "PassengerdetailsAssignment",
    "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "User submits Passenger details triggering Baggage Claim child case",
    "pyLabel": "Passenger details",
    "pyOutputParameters": [
      {
        "pyMapOutputFrom": "Response",
        "pyParameterName": "BaggageClaimCaseID",
        "pyParameterUniqueName": "BaggageClaimCaseID"
      }
    ],
    "pyInputParameters": [
      {
        "pyParameterValue": "FlightBookingCaseID",
        "pyMapTestInputFrom": "Keyword Output",
        "pyParameterName": "CaseID"
      },
      {
        "pyParameterValue": "False",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "ValidationFails"
      },
      {
        "pyParameterValue": "12A",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "Seat number"
      }
    ]
  },
  {
      "pyPurpose": "BaggagedetailsAssignment",
    "pyClassName": "MyOrg-MyApp-Work-BaggageClaim",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "User submits Baggage Claim details",
    "pyLabel": "Baggage details",
    "pyInputParameters": [
      {
        "pyParameterValue": "BaggageClaimCaseID",
        "pyMapTestInputFrom": "Keyword Output",
        "pyParameterName": "CaseID"
      },
      {
        "pyParameterValue": "False",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "ValidationFails"
      },
      {
        "pyParameterValue": "2",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "Number of bags"
      }
    ]
  }
]
```
