---
name: printable-mail-document
description: "Load when you need basic Mail for a printed letter or PDF; contains a simple HTML document example."
---

```json
{
  "pyStreamName": "ApprovalLetter Mail",
  "pyLabel": "Approval Letter",
  "pyClassName": "MyOrg-MyApp-Work-Request",
  "pyCorrType": "Mail",
  "pySourceOnlyMode": "true",
  "pyNextAction": "Attach",
  "pySourceStream": "<h1>Approval Letter</h1><p>Dear <<.pyFirstName>> <<.pyLastName>>,</p><p>Your request <<.pyID>> was approved.</p><p>Sincerely,<br/>The Approval Team</p>"
}
```
