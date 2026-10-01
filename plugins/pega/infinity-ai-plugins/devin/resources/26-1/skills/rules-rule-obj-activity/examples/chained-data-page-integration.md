---
name: Chained Data Page Integration
description: Sequential multi-API activity chaining parameterized data pages with error handling, early exit, and fallback block.
---

```json
{
  "pyActivityName": "GetShippingQuote",
  "pyLabel": "Get Shipping Quote",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyDescription": "Chains two data pages (address validation then shipping rate) with error handling and fallback.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "AddressResult", "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Address" },
    { "pyPagesAndClassesPage": "ShippingResult", "pyPagesAndClassesClass": "MyOrg-MyApp-Data-ShippingRate" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Set default display state",
      "pyParamArray": [
        { "PropertiesName": ".ShippingStatus", "PropertiesValue": "\"Calculating\"" },
        { "PropertiesName": ".EstimatedRate", "PropertiesValue": "\"\"" }
      ]
    },
    {
      "pyStepsActivityName": "Exit-Activity",
      "pyStepsDescription": "Exit if postal code missing",
      "pyStepsPreCondition": "true",
      "pyStepsPreCondParams": [
        {
          "pyStepsPreCondParamsWhen": ".Address.PostalCode==\"\"",
          "pyStepsPreCondParamsWhenTrue": "5",
          "pyStepsPreCondParamsWhenFalse": "3",
          "pyStepsPreCondParamsWhenTruePrms": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        }
      ]
    },
    {
      "pyStepsActivityName": "Page-Copy",
      "pyStepsObjectName": "AddressResult",
      "pyStepsDescription": "Load validated address",
      "pyStepsTransition": "true",
      "pyOnException": "ERR",
      "pyStepsCallParams": {
        "CopyFrom": "D_ValidatedAddress[PostalCode: Primary.Address.PostalCode]",
        "CopyInto": "AddressResult",
        "Model": "",
        "PageList": ""
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Set failure state if address invalid",
      "pyStepsPreCondition": "true",
      "pyStepsPreCondParams": [
        {
          "pyStepsPreCondParamsWhen": "AddressResult.IsValid==\"false\"",
          "pyStepsPreCondParamsWhenTrue": "5",
          "pyStepsPreCondParamsWhenFalse": "3",
          "pyStepsPreCondParamsWhenTruePrms": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        }
      ],
      "pyParamArray": [
        { "PropertiesName": ".ShippingStatus", "PropertiesValue": "\"InvalidAddress\"" }
      ]
    },
    {
      "pyStepsActivityName": "Exit-Activity",
      "pyStepsDescription": "Exit on invalid address",
      "pyStepsPreCondition": "true",
      "pyStepsPreCondParams": [
        {
          "pyStepsPreCondParamsWhen": "AddressResult.IsValid==\"false\"",
          "pyStepsPreCondParamsWhenTrue": "5",
          "pyStepsPreCondParamsWhenFalse": "3",
          "pyStepsPreCondParamsWhenTruePrms": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        }
      ]
    },
    {
      "pyStepsActivityName": "Page-Copy",
      "pyStepsObjectName": "ShippingResult",
      "pyStepsDescription": "Load shipping rate using validated address",
      "pyStepsTransition": "true",
      "pyOnException": "ERR",
      "pyStepsCallParams": {
        "CopyFrom": "D_ShippingRate[PostalCode: AddressResult.PostalCode, Weight: Primary.Order.TotalWeight]",
        "CopyInto": "ShippingResult",
        "Model": "",
        "PageList": ""
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Copy results to case",
      "pyParamArray": [
        { "PropertiesName": ".EstimatedRate", "PropertiesValue": "ShippingResult.Rate" },
        { "PropertiesName": ".ShippingStatus", "PropertiesValue": "\"Quoted\"" }
      ]
    },
    {
      "pyStepsActivityName": "Exit-Activity",
      "pyStepsDescription": "Exit success — prevent fall-through to ERR block"
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsBlockName": "ERR",
      "pyStepsDescription": "Fallback — service unavailable",
      "pyParamArray": [
        { "PropertiesName": ".ShippingStatus", "PropertiesValue": "\"Unavailable\"" },
        { "PropertiesName": ".EstimatedRate", "PropertiesValue": "\"\"" }
      ]
    }
  ]
}
```

## Key patterns demonstrated

- **Default state first** — friendly values before any API call
- **Early exit on missing input** — precondition + Exit-Activity
- **Page-Copy with parameterized data page** — `D_Name[Param: value]` syntax
- **Chaining** — downstream data page references upstream result (`AddressResult.PostalCode`)
- **Paired failure state + exit** — same precondition guards both steps
- **Exit before fallback** — prevents success path falling into ERR block
- **`pyOnException` targeting a block name** — risky steps jump to `ERR` on exception
- **Context resolution** — `Primary.*` for case properties, page names for other clipboard pages
