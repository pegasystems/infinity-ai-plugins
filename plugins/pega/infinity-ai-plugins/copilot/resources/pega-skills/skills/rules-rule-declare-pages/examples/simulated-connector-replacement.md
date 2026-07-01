---
name: Simulated Data Page — Mock / Fake / Test Data Replacement
description: Simulated (a.k.a. mock, fake, stub, test-data) data page that replaces a real connector source with a DataTransform providing canned data. The original Connector source is preserved verbatim in pyDisabledSource so the simulation can be reversed. Ruleset layering activates the simulation per environment — transparent to callers. Not to be confused with unit-test mocks (Rule-Test-Unit-Case.pySetupPages). See `references/simulation.md` for the full pattern, constraints, and pitfalls.
---

```json
{
  "pyPageName": "D_AllPlayerGameSessions",
  "pyLabel": "All Player Game Sessions",
  "pyDescription": "All game sessions for all players — simulated (mock data)",
  "pyClassName": "Code-Pega-List",
  "pyStructure": "list",
  "pyScope": "thread",
  "pyIsSimulated": "true",
  "pyDisplayMode": "clone",
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "DataTransform",
      "pyDTName": "SimulateAllGameSessions",
      "pyReqDataTransform": "SimulateAllGameSessions",
      "pyClassName": "MyOrg-GameNight-Work-GameSession",
      "pyStructure": "list",
      "pySourceWhen": "Always",
      "pyIsSimulated": "true",
      "pyDataSourceHolder": "SimulateAllGameSessions",
      "pyDSSystemName": "Pega",
      "pyDescription": "Data Transform • MyOrg-GameNight-Work-GameSession • SimulateAllGameSessions",
      "pyDisabledSource": {
        "pxObjClass": "Embed-DeclarePageSource",
        "pyDeclarePagesDataSource": "Connector",
        "pyConnectorList": "Rule-Connect-REST",
        "pyConnectorName": "GetAllGameSessions",
        "pyConnectorClassName": "MyOrg-GameNight-Work-GameSession",
        "pyRESTMethod": "GET",
        "pyClassName": "MyOrg-GameNight-Work-GameSession",
        "pyStructure": "list",
        "pySourceWhen": "Always",
        "pyReqDataTransform": "GetAllGameSessionsReqDT",
        "pyResDataTransform": "GetAllGameSessionsResDT",
        "pyPassCurrentParamPageForReqDT": "true",
        "pyPassCurrentParamPageForRespDT": "true",
        "pyPassCurrentParamPageForActivity": "true"
      }
    }
  ]
}
```
