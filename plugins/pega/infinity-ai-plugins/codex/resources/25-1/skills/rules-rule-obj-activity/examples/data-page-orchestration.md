---
name: Data Page Orchestration Activity
description: Full activity implementing sequential clipboard page operations with error checking between each step. Customer validation example (create pages, validate, set results) with fallback on failure. Omit pyActivityType for standard orchestration activities.
---

```json
{
  "pyActivityName": "ValidateCustomerInfo",
  "pyLabel": "Validate Customer Info",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Validates customer information by creating scratch pages, running checks, and setting results. Falls back to error status on any failure.",
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "CustomerData",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Customer"
    },
    {
      "pyPagesAndClassesPage": "ValidationResult",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-ValidationResult"
    }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Set default validation status and initialize flags",
      "pyParamArray": [
        {
          "PropertiesName": ".ValidationStatus",
          "PropertiesValue": "\"Pending\""
        },
        {
          "PropertiesName": ".ValidationMessage",
          "PropertiesValue": "\"Not yet validated\""
        }
      ]
    },
    {
      "pyStepsActivityName": "Page-New",
      "pyStepsObjectName": "CustomerData",
      "pyStepsDescription": "Create scratch page for customer data",
      "pyStepsCallParams": {
        "NewClass": "MyOrg-MyApp-Data-Customer",
        "Model": "",
        "PageList": ""
      }
    },
    {
      "pyStepsActivityName": "Page-New",
      "pyStepsObjectName": "ValidationResult",
      "pyStepsDescription": "Create scratch page for validation results",
      "pyStepsCallParams": {
        "NewClass": "MyOrg-MyApp-Data-ValidationResult",
        "Model": "",
        "PageList": ""
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Copy customer fields to scratch page for validation",
      "pyStepsObjectName": "CustomerData",
      "pyParamArray": [
        {
          "PropertiesName": ".FirstName",
          "PropertiesValue": "pyWorkPage.CustomerFirstName"
        },
        {
          "PropertiesName": ".LastName",
          "PropertiesValue": "pyWorkPage.CustomerLastName"
        },
        {
          "PropertiesName": ".Email",
          "PropertiesValue": "pyWorkPage.CustomerEmail"
        }
      ]
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Check required fields and set validation result",
      "pyStepsObjectName": "ValidationResult",
      "pyStepsPreCondition": "true",
      "pyStepsPreCondParams": [
        {
          "pyStepsPreCondParamsWhen": "CustomerData.FirstName==\"\"",
          "pyStepsPreCondParamsWhenTrue": "1",
          "pyStepsPreCondParamsWhenTruePrms": "ERR",
          "pyStepsPreCondParamsWhenFalse": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        }
      ],
      "pyParamArray": [
        {
          "PropertiesName": ".IsValid",
          "PropertiesValue": "true"
        },
        {
          "PropertiesName": ".Message",
          "PropertiesValue": "\"All required fields present\""
        }
      ]
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Copy validation results back to case",
      "pyParamArray": [
        {
          "PropertiesName": ".ValidationStatus",
          "PropertiesValue": "\"Valid\""
        },
        {
          "PropertiesName": ".ValidationMessage",
          "PropertiesValue": "ValidationResult.Message"
        }
      ]
    },
    {
      "pyStepsActivityName": "Page-Remove",
      "pyStepsDescription": "Clean up scratch pages on success",
      "pyParamArray": [
        {
          "Page": "CustomerData"
        },
        {
          "Page": "ValidationResult"
        }
      ]
    },
    {
      "pyStepsActivityName": "Exit-Activity",
      "pyStepsDescription": "Success — exit before error block"
    },
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsBlockName": "ERR",
      "pyStepsDescription": "Log validation failure (ERR block — only reached via pyOnException or precondition jump)",
      "pyStepsCallParams": {
        "Message": "\"Customer validation failed for case: \" + .pyID",
        "LoggingLevel": "Warn",
        "SendToTracer": "true",
        "GenerateStackTrace": "false"
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Set error status on case",
      "pyParamArray": [
        {
          "PropertiesName": ".ValidationStatus",
          "PropertiesValue": "\"Invalid\""
        },
        {
          "PropertiesName": ".ValidationMessage",
          "PropertiesValue": "\"Required customer fields missing\""
        }
      ]
    },
    {
      "pyStepsActivityName": "Page-Remove",
      "pyStepsDescription": "Clean up scratch pages",
      "pyParamArray": [
        {
          "Page": "CustomerData"
        },
        {
          "Page": "ValidationResult"
        }
      ]
    }
  ]
}
```
