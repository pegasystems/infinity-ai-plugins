---
name: usecase-complete-api
description: "Load when authoring a complete API Use Case with an implementation rule, catalog metadata, and acceptance criteria."
---

```json
{
  "pxObjClass": "Rule-Application-UseCase",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyUseCaseName": "GetOrderStatus",
  "pyLabel": "Get Order Status",
  "pyDescription": "Returns the current status and last update time for an order.",
  "pyPurpose": "GetOrderStatus",
  "pyOwner": "OrderManagement",
  "pyProductName": "OrderPortal",
  "pyProductVersion": "01.00.00",
  "pyUseCaseType": "API",
  "pyImplementationClass": "MyOrg-MyApp-Work-Order",
  "pyImplementationRule": "GetOrderStatus",
  "pyUsedAs": "pxAPI",
  "pyCategory": "New",
  "pySubCategory": "Order Services",
  "pyMethodStatus": "API",
  "pyExposed": "true",
  "pyRuleAvailable": "Yes",
  "pySpecFormat": "UserStory",
  "pyAcceptanceCriteriaList": [
    {
      "pyCriteria": "A valid order identifier returns the current order status."
    },
    {
      "pyCriteria": "An unknown order identifier returns the documented not-found response."
    }
  ]
}
```
