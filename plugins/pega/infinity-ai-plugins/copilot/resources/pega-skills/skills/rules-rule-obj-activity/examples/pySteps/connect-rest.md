---
name: Connect-REST
description: Invoke a REST connector synchronously
---

```json
{
  "pyStepsActivityName": "Connect-REST",
  "pyStepsDescription": "Call address-validation REST service",
  "pyStepsObjectName": "AddressResult",
  "pyStepsCallParams": {
    "ServiceName": "MyOrg-MyApp-Int-AddressValidation",
    "EndPointURL": ".pyEndpointURL",
    "MethodName": "POST",
    "ExecutionMode": "Run"
  }
}
```
