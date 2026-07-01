---
name: basic-templated-email
description: "Load when you need Email based on a named template; contains template name and stream settings."
---

```json
{
  "pyStreamName": "WelcomeEmail Email",
  "pyLabel": "Welcome Email",
  "pyClassName": "MyOrg-MyApp-Work-Onboarding",
  "pyCorrType": "Email",
  "pyEmailViewMode": "templated",
  "pyEmailTemplateName": "StandardWelcomeTemplate",
  "pyEmailTemplateStream": "<template><region name=\"Body\"/></template>",
  "pyEmailRegions": {
    "Body": {
      "pyRegionName": "Body",
      "pyRegionContent": "<p>Welcome, <<.pyFirstName>> <<.pyLastName>>.</p><p>Your account is ready.</p>"
    }
  }
}
```
