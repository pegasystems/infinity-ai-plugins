---
name: email-with-mixed-include-directives
description: "Load when you need Email with mixed source-stream directives; contains includes, conditions, and page context changes."
---

```json
{
  "pyStreamName": "ComplexNotification Email",
  "pyLabel": "Complex Notification",
  "pyClassName": "MyOrg-MyApp-Work-ComplexCase",
  "pyCorrType": "Email",
  "pyEmailViewMode": "source",
  "pySourceOnlyMode": "true",
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "pyWorkPage",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Work-ComplexCase",
      "pyPagesAndClassesMode": ""
    },
    {
      "pyPagesAndClassesPage": "ManagerPage",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Manager",
      "pyPagesAndClassesMode": ""
    }
  ],
  "pyWhensList": [
    {
      "pyWhenName": "IsUrgent"
    }
  ],
  "pySourceStream": "<pega:include name=\"EmailHeader\" type=\"Rule-HTML-Section\"/><pega:when name=\"IsUrgent\"><p>Urgent case <<.pyCaseID>> requires immediate review.</p></pega:when><p>Status update for <<.pyCaseID>>.</p><pega:include name=\"CaseStatusInfo.Email\" type=\"Rule-Obj-Corr\"/><pega:withPage name=\"ManagerPage\"><p>Owner: <<.pyManagerName>> (<<.pyManagerEmail>>)</p></pega:withPage><pega:include name=\"EmailFooter.Email\" type=\"Rule-Corr-Fragment\"/><pega:include name=\"StandardDisclaimer\" type=\"standard\"/><pega:include name=\"EmailSignature\" type=\"Rule-HTML-Paragraph\"/>"
}
```
