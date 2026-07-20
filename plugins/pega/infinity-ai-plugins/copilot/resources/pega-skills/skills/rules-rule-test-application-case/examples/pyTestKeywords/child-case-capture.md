---
name: testcase-keyword-child-case-capture
description: Load when the app auto-creates a child case. Shows the child case keyword capturing its case ID as output parameter with downstream child case keywords wiring CaseID from that output.
---

```json
[
  {
    "pyPurpose": "PassengerdetailsAssignment",
    "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "User submits Passenger details",
    "pyLabel": "Passenger details",
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
    "pyPurpose": "BaggageClaimChildCase",
    "pyClassName": "MyOrg-MyApp-Work-BaggageClaim",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "Baggage Claim child case creation",
    "pyLabel": "Create Baggage Claim Child Case",
    "pyOutputParameters": [
      {
        "pyMapOutputFrom": "Response",
        "pyParameterName": "ChildCaseIDAutoMapped",
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
        "pyParameterValue": "B",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "Child Case Prefix"
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
