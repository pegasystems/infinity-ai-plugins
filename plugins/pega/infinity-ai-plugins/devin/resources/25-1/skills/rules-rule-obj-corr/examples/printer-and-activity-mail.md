---
name: mail-with-printer-settings
description: "Load when you need Mail with printer settings; contains printer and print-method references."
---

```json
{
  "pyStreamName": "ContractPrintout Mail",
  "pyLabel": "Contract Printout",
  "pyClassName": "MyOrg-MyApp-Work-Contract",
  "pyCorrType": "Mail",
  "pySourceOnlyMode": "true",
  "pyNextAction": "Attach",
  "pyFormPrinter": "LegalDept_HP_LaserJet",
  "pyFormPrintMethod": "PrintContractActivity",
  "pySourceStream": "<h1>Contract Printout</h1><p>Prepared for printer-based delivery.</p><p>Contract #: <<.pyContractID>> | Client: <<.pyClientName>></p>"
}
```
