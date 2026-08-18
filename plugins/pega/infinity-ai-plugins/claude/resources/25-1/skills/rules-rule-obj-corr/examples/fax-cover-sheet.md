---
name: generate-fax-cover-sheet
description: "Load when you need Fax for a cover sheet; contains sender and recipient details in the body."
---

```json
{
  "pyStreamName": "ClaimFaxNotice Fax",
  "pyLabel": "Claim Fax Notice",
  "pyClassName": "MyOrg-MyApp-Work-Claim",
  "pyCorrType": "Fax",
  "pySourceOnlyMode": "true",
  "pySourceStream": "<h1>Fax Cover Sheet</h1><p>To: <<.pyRecipientName>> | Fax: <<.pyFaxNumber>></p><p>Claim: <<.pyID>> | Pages: <<.pyPageCount>></p>"
}
```
