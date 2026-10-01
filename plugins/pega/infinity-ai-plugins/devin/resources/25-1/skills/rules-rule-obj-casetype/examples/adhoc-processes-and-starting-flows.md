---
name: Adhoc Processes and Starting Flows
description: Case type with starting flows (pyCasetypeStartingFlows, pyFlowsToStart), stage-level and case-wide optional processes, multi-channel stage configuration, and case parameters.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-IncidentResponse",
  "pyLabel": "Incident Response",
  "pyDescription": "Incident management case with multi-channel intake, ad-hoc escalation processes, and background monitoring flows.",
  "pyIcon": "pi pi-alert-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyInitialCaseUrgency": "30",
  "pyLockingMode": "Optimistic",
  "pyEnableSearch": "true",
  "pyIsConstellationCase": "true",
  "pyEnableGetNextWork": "true",
  "pyLifeCycleTabs": "Adhoc",
  "pyStageIDMax": "4",
  "pyAltStageIDMax": "1",
  "pyParameters": [
    {
      "pyParametersParamName": "Severity",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamName": "SourceSystem",
      "pyParametersParamType": "STRING"
    }
  ],
  "pyCasetypeStartingFlows": [
    {
      "pyClass": "MyOrg-MyApp-Work-IncidentResponse",
      "pyStartingFlowType": "pyStartCase",
      "pyAutomaticStart": "true",
      "pyManualStart": "false",
      "pyEnabled": "true"
    }
  ],
  "pyFlowsToStart": [
    {
      "pyFlowType": "BackgroundMonitor",
      "pyAutomaticStart": "true",
      "pyAutoStartWhenType": "always",
      "pyManualStart": "false",
      "pyEnabled": "true",
      "pySkipOrAllowType": "always"
    },
    {
      "pyFlowType": "NotifyStakeholders",
      "pyAutomaticStart": "false",
      "pyManualStart": "true",
      "pyProcessStartType": "user",
      "pyEnabled": "true",
      "pySkipOrAllowType": "always",
      "pyShowBackButton": "true"
    }
  ],
  "pyCaseOptionalProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "EscalateToManagement",
      "pyLabel": "Escalate to Management",
      "pyDescription": "Ad-hoc escalation to senior management — available from any stage.",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "false",
      "pyShowBackButton": "true"
    },
    {
      "pxFlowID": "FLOW1",
      "pyFlowName": "RequestExternalSupport",
      "pyLabel": "Request External Support",
      "pyDescription": "Engage third-party vendor support.",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "when",
      "pyStartWhen": "HasVendorContract",
      "pyLaunchOnReentry": "false"
    }
  ],
  "pyStages": [
    {
      "pyStageID": "PRIM0",
      "pyStageName": "Intake",
      "pyStageTransition": "automatic",
      "pyIsInitializationStage": "true",
      "pyIsTerminalStage": "false",
      "pyChannels": [
        {
          "pyLabel": "Default",
          "pyShowChannel": "true",
          "pzChannelName": "Default"
        },
        {
          "pyLabel": "Email",
          "pyShowChannel": "true",
          "pzChannelName": "Email"
        },
        {
          "pyLabel": "API",
          "pyShowChannel": "true",
          "pzChannelName": "API"
        }
      ],
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "CreateForm_Default",
          "pyLabel": "Intake Form",
          "pyChannelName": "Default",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false",
          "pyShowBackButton": "false"
        },
        {
          "pxFlowID": "FLOW1",
          "pyFlowName": "EmailIntake",
          "pyLabel": "Email Intake",
          "pyChannelName": "Email",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false"
        },
        {
          "pxFlowID": "FLOW2",
          "pyFlowName": "APIIntake",
          "pyLabel": "API Intake",
          "pyChannelName": "API",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false"
        }
      ]
    },
    {
      "pyStageID": "PRIM1",
      "pyStageName": "Triage",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-Triage",
      "pyIsTerminalStage": "false",
      "pySLAType": "Always",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "TriageIncident",
          "pyLabel": "Triage",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "false",
          "pySLAType": "Always",
          "pyStepSLA": "TriageResponseTime"
        }
      ],
      "pyOptionalProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "GatherDiagnostics",
          "pyLabel": "Gather Diagnostics",
          "pyDescription": "Collect system logs and diagnostic data from affected systems.",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false"
        }
      ]
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Resolution",
      "pyStageTransition": "manual",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "InvestigateAndFix",
          "pyLabel": "Investigate and Fix",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "true"
        },
        {
          "pxFlowID": "FLOW1",
          "pyFlowName": "VerifyResolution",
          "pyLabel": "Verify Resolution",
          "pyStartType": "SEQUENTIAL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false"
        }
      ],
      "pyOptionalProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "RootCauseAnalysis",
          "pyLabel": "Root Cause Analysis",
          "pyDescription": "Perform deep-dive root cause analysis.",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false"
        }
      ]
    },
    {
      "pyStageID": "PRIM3",
      "pyStageName": "Resolved",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Completed",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ],
  "pyAlternateStages": [
    {
      "pyStageID": "ALT1",
      "pyStageName": "Cancelled",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Cancelled",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ]
}
```
