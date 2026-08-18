---
name: pyDataSourceList entry — RoboticDesktopAutomation
description: Minimum-viable Robotic Desktop Automation (RDA) data page source entry. Triggers a desktop robotic automation to load data. Required field pyRDAAutomationId. Shares RA fields (pyRAReqDTName, pyRARespDTName, pyRATimeout). Server auto-sets pyLoadActivity to pxCallRoboticDesktopAutomation.
---

```json
{
  "pyDeclarePagesDataSource": "RoboticDesktopAutomation",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-DesktopResult",
  "pyStructure": "page",
  "pyRDAAutomationId": "Param.AutomationName",
  "pyRAReqDTName": "SetDesktopRequest",
  "pyRARespDTName": "MapDesktopResponse",
  "pyRATimeout": "60",
  "pyPassCurrentParamPageForActivity": "true",
  "pyPassCurrentParamPageForRAReqDT": "true",
  "pyPassCurrentParamPageForRARespDT": "true",
  "pyIsRequired": "true"
}
```
