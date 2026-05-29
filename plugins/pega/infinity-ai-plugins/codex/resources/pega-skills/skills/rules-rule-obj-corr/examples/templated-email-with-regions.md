---
name: templated-email-with-region-content
description: "Load when you need templated Email with named regions; contains region-specific content values."
---

```json
{
  "pyStreamName": "NewsletterEmail Email",
  "pyLabel": "Newsletter Email",
  "pyClassName": "MyOrg-MyApp-Work-Newsletter",
  "pyCorrType": "Email",
  "pyEmailViewMode": "templated",
  "pyEmailTemplateName": "NewsletterTemplate",
  "pyEmailTemplateStream": "<template><region name=\"Header\"/><region name=\"MainContent\"/><region name=\"Footer\"/></template>",
  "pyEmailRegions": {
    "Header": {
      "pyRegionName": "Header",
      "pyRegionContent": "<h1><<.pyNewsletterTitle>></h1><p>Issue <<.pyIssueNumber>></p>"
    },
    "MainContent": {
      "pyRegionName": "MainContent",
      "pyRegionContent": "<h3>Featured Article</h3><p><<.pyArticleSummary>></p>"
    },
    "Footer": {
      "pyRegionName": "Footer",
      "pyRegionContent": "<p>Manage preferences: <<.pyUnsubscribeURL>></p>"
    }
  }
}
```
