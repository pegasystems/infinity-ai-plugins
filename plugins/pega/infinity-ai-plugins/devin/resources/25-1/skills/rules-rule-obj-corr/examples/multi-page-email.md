---
name: email-with-multiple-page-contexts
description: "Load when you need Email that reads from multiple page contexts; contains source-stream page switches in the body."
---

```json
{
  "pyStreamName": "ComprehensiveNotification Email",
  "pyLabel": "Comprehensive Notification",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyCorrType": "Email",
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "pyWorkPage",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Order",
      "pyPagesAndClassesMode": ""
    },
    {
      "pyPagesAndClassesPage": "CustomerPage",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Customer",
      "pyPagesAndClassesMode": ""
    },
    {
      "pyPagesAndClassesPage": "ShippingPage",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Shipping",
      "pyPagesAndClassesMode": ""
    }
  ],
  "pySourceStream": "<p>Dear <pega:withPage name=\"CustomerPage\"><<.pyFirstName>> <<.pyLastName>></pega:withPage>, your order <<.pyOrderID>> is on the way.</p><p><pega:withPage name=\"ShippingPage\">Carrier: <<.pyCarrierName>> | Tracking: <<.pyTrackingNumber>></pega:withPage></p>"
}
```
