---
name: mobile-text-notification
description: "Load when you need PhoneText for a short mobile alert; contains a concise SMS-style message example."
---

```json
{
  "pyStreamName": "OrderShipped PhoneText",
  "pyLabel": "Order Shipped SMS",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyCorrType": "PhoneText",
  "pySourceOnlyMode": "true",
  "pySourceStream": "Your order <<.pyID>> has shipped! Track at: <<.pyTrackingURL>>. Expected delivery: <<.pyEstimatedDelivery>>."
}
```
