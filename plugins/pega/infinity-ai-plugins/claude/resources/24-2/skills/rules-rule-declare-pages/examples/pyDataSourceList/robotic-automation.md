---
name: pyDataSourceList entry — RoboticAutomation
description: Minimum-viable Robotic Automation data page source entry. Triggers a server-side robotic automation to load data. Required field pyRACaseType. Optional pyRAReqDTName, pyRARespDTName, pyRATimeout. Server auto-sets pyLoadActivity to pxCallRoboticAutomation.
---

```json
{
  "pyDeclarePagesDataSource": "RoboticAutomation",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-RobotResult",
  "pyStructure": "page",
  "pyRACaseType": "MyRobotCaseType",
  "pyRAReqDTName": "",
  "pyRARespDTName": "MapRobotResponse",
  "pyRATimeout": "30",
  "pyIsRequired": "true"
}
```
