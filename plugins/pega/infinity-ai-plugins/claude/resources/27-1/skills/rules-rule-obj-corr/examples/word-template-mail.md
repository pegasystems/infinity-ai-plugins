---
name: mail-with-word-template
description: "Load when you need Mail generated from a Word template; contains a Rule-Template-Word reference."
---

```json
{
  "pyStreamName": "OfferLetter Mail",
  "pyLabel": "Offer Letter",
  "pyClassName": "MyOrg-MyApp-Work-Offer",
  "pyCorrType": "Mail",
  "pySourceOnlyMode": "true",
  "pyNextAction": "Attach",
  "pyWordTemplate": "StandardOfferLetterTemplate",
  "pySourceStream": "<p>Offer details for <<.pyCandidateName>> are generated from the selected Word template.</p><p>Position: <<.pyJobTitle>></p>"
}
```
