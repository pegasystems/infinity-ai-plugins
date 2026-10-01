---
name: Property-Set from Data Page Step Page
description: Use a parameterized data page as the step page and copy results to the case using Primary.* references. Context rule — unqualified .Property reads from the data page; Primary.Property reads/writes the case page.
---

```json
{
  "pyStepsActivityName": "Property-Set",
  "pyStepsObjectName": "D_ValidatedAddress[PostalCode:Primary.PostalCode]",
  "pyStepsDescription": "Copy validated address fields from data page to case",
  "pyParamArray": [
    {
      "PropertiesName": "Primary.ShippingAddress.City",
      "PropertiesValue": ".City"
    },
    {
      "PropertiesName": "Primary.ShippingAddress.State",
      "PropertiesValue": ".State"
    },
    {
      "PropertiesName": "Primary.ShippingAddress.NormalizedPostalCode",
      "PropertiesValue": ".PostalCode"
    }
  ]
}
```
