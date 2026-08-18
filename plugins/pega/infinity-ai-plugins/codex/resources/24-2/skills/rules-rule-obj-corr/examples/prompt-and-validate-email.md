---
name: prompted-and-validated-email
description: "Load when you need Email that prompts for review before finalizing; contains prompt text and validation settings."
---

```json
{
  "pyStreamName": "EditableNotification Email",
  "pyLabel": "Editable Notification",
  "pyClassName": "MyOrg-MyApp-Work-Notification",
  "pyCorrType": "Email",
  "pyEmailViewMode": "basic",
  "pyNextAction": "Verify",
  "pyVerifyCorr": "true",
  "pyHTMLPrompt": "EditableNotificationPrompt",
  "pyPromptValidate": "EditableNotificationValidate",
  "pySourceStream": "<p>Message:</p><p><pega:reference name=\".pyMessageBody\" format=\"\"></pega:reference></p><p>Sender: <<.pySenderName>></p>"
}
```
