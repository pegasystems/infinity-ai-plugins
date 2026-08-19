---
name: raw-html-email
description: "Load when you need Email authored directly in HTML; contains a source-mode markup example."
---

```json
{
  "pyStreamName": "MarketingEmail Email",
  "pyLabel": "Marketing Email",
  "pyClassName": "MyOrg-MyApp-Work-Campaign",
  "pyCorrType": "Email",
  "pyEmailViewMode": "source",
  "pySourceOnlyMode": "true",
  "pySourceStream": "<html><body><h1>Special Offer</h1><p>Dear <<.pyFirstName>>, use code <b><<.pyPromoCode>></b> for <<.pyOfferName>>.</p><p>Offer ends on <<.pyOfferExpiry>>.</p></body></html>"
}
```
