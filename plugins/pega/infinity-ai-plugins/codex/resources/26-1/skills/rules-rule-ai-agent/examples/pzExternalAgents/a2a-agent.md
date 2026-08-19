---
name: A2A External Agent
description: Rule-Connect-Agent entry in pzExternalAgents using the A2A protocol and auth profiles for card lookup and execution.
---
```json
{
  "pyServiceName": "ExternalAnalyticsAgent",
  "pyAgentProtocol": "A2A",
  "pyAgentCardURLSelectionType": "URL",
  "pyAgentCardAuthSelectionType": "AUTH_PROFILE",
  "pyAgentExecutionAuthSelectionType": "AUTH_PROFILE",
  "pyHandlerFlow": "ConnectionProblem",
  "pySSLProtocolVersion": "TLSv1.2"
}
```
