---
name: Landing Page View
description: Example create for a WideNarrowPage landing page view with Todo, AppAnnouncement, Pulse widgets, and AI agent wiring.
---

Use this as a pattern when creating a home/landing page view. Page-level views
differ from case step forms in several ways:

> **Template:** Uses page-level templates like `WideNarrowPage`, `BannerPage`,
> `OneColumnPage`, `TabbedPage` — not `DefaultForm`.

> **`pxViewType`:** Set to `"landingpage"` (case step forms omit this field).

> **`pyJsonConfig`:** Required for page-level views. Contains `icon`, `title`,
> and `type` (e.g., `"landingpage"`).

> **Widget pxObjClass types:** Page-level views use widgets, not fields:
> - `Pega-UI-Content-Widget-Todo` — task list
> - `Pega-UI-Content-Widget-Pulse` — activity feed
> - `Pega-UI-Content-Widget-AppAnnouncement` — announcements banner
> - `Pega-UI-Content-Reference` — embedded view reference (NOT
>   `Pega-UI-Content-Field-Data-Reference` used in case forms)

> **`@DATASOURCE` annotation:** Widget datasources use `@DATASOURCE D_PageName.pxResults`
> in `pxViewMetadata` (not `@P`).

> **`@AIAGENT` annotation:** AI agents are referenced via `@AIAGENT AgentName`
> in the view config `coaches` array.

> **`pyCoaches`:** Authored array declaring AI agents attached to the view.
> Each entry has `pxObjClass: "Pega-UI-Content-GenAI-Agent"` with a `pyCoach`
> name and `pyComponentName: "AIAgentObject"`.

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "pyHome",
  "pyLabel": "Home",
  "pyDescription": "Application home landing page",
  "pyClassName": "MyCo-MyApp-UIPages",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "WideNarrowPage",
  "pxViewType": "landingpage",
  "pxPageViewIcon": "pi pi-home-solid",
  "pyJsonConfig": "{\"icon\":\"home-solid\",\"title\":\"@L Home\",\"type\":\"landingpage\"}",
    "pyContent": [
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "A",
        "pyPromptClass": "MyCo-MyApp-UIPages",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {
            "pxObjClass": "Pega-UI-Content-Widget-AppAnnouncement",
            "pyComponentName": "AppAnnouncement",
            "pyPromptClass": "MyCo-MyApp-UIPages",
            "pyHeading": "Announcements",
            "pyLabel": "Announcements widget",
            "pyDisplayLabel": "AppAnnouncement",
            "pyDatasource": {
              "pxObjClass": "Pega-UI-Content-Widget-AppAnnouncement-Datasource",
              "pySource": "D_pyAnnouncements.pxResults",
              "pyDatasourceFields": {
                "pxObjClass": "Pega-UI-Content-Field",
                "pyName": ".pyLabel"
              }
            }
          },
          {
            "pxObjClass": "Pega-UI-Content-Widget-Todo",
            "pyComponentName": "Todo",
            "pyPromptClass": "MyCo-MyApp-UIPages",
            "pyHeading": "Tasks",
            "pyLabel": "Todo",
            "pyDisplayLabel": "Todo",
            "pyIsMyWorklistChecked": true,
            "pyIsReporteesWorklistChecked": false,
            "pyIsWorkQueueslistChecked": false,
            "pyJsonConfig": "{\"myWorkList\":{\"datapage\":\"D_pyMyWorkList\",\"fields\":{\"businessID\":\"@P .pxRefObjectInsName\",\"classname\":\"@P .pxRefObjectClass\",\"id\":\"@P .pzInsKey\",\"name\":\"@P .pyLabel\",\"priority\":\"@P .pxUrgencyAssign\",\"status\":\"@P .pyAssignmentStatus\",\"value\":\"@P .pxRefObjectKey\"}},\"target\":\"primary\"}"
          },
          {
            "pxObjClass": "Pega-UI-Content-Reference",
            "pyComponentName": "reference",
            "pyPromptClass": "MyCo-MyApp-UIPages",
            "pyRuleName": "pyListOfFollowedItems",
            "pyClassContext": "Data-Portal",
            "pyRuleType": "view",
            "pyLabel": "List of followed items",
            "pyDisplayLabel": "reference",
            "pyJsonConfig": "{\"referenceClass\":\"Work-\"}"
          }
        ]
      },
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "B",
        "pyPromptClass": "MyCo-MyApp-UIPages",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {
            "pxObjClass": "Pega-UI-Content-Widget-Pulse",
            "pyComponentName": "Pulse",
            "pyPromptClass": "MyCo-MyApp-UIPages",
            "pyLabel": "Pulse",
            "pyDisplayLabel": "Pulse",
            "pyJsonConfig": "{\"messageIDs\":\"@P pulse.messageIDs\"}"
          }
        ]
      }
    ],
    "pyCoaches": [
      {
        "pxObjClass": "Pega-UI-Content-GenAI-Agent",
        "pyCoach": "pzInsightAgent",
        "pyComponentName": "AIAgentObject",
        "pyPromptClass": "MyCo-MyApp-UIPages",
        "pyLabel": "Insights Agent (beta)",
        "pyDisplayLabel": "Insights Agent (beta)"
      }
    ],
    "pxViewMetadata": {
      "children": [
        {
          "children": [
            {
              "type": "AppAnnouncement",
              "config": {
                "header": "@L Announcements",
                "label": "@L Announcements widget",
                "datasource": {
                  "source": "@DATASOURCE D_pyAnnouncements.pxResults",
                  "fields": {
                    "name": "@P .pyLabel"
                  }
                }
              }
            },
            {
              "type": "Todo",
              "config": {
                "headerText": "@L Tasks",
                "label": "@L Todo",
                "isMyWorklistChecked": true,
                "isReporteesWorklistChecked": false,
                "isWorkQueueslistChecked": false,
                "target": "primary",
                "myWorkList": {
                  "datapage": "D_pyMyWorkList",
                  "fields": {
                    "businessID": "@P .pxRefObjectInsName",
                    "classname": "@P .pxRefObjectClass",
                    "id": "@P .pzInsKey",
                    "name": "@P .pyLabel",
                    "priority": "@P .pxUrgencyAssign",
                    "status": "@P .pyAssignmentStatus",
                    "value": "@P .pxRefObjectKey"
                  }
                }
              }
            },
            {
              "type": "reference",
              "config": {
                "inheritedProps": [
                  {"prop": "label", "value": "@L List of followed items"}
                ],
                "name": "pyListOfFollowedItems",
                "referenceClass": "Work-",
                "ruleClass": "Data-Portal",
                "type": "view"
              }
            }
          ],
          "name": "A",
          "type": "Region"
        },
        {
          "children": [
            {
              "type": "Pulse",
              "config": {
                "label": "@L Pulse",
                "messageIDs": "@P pulse.messageIDs"
              }
            }
          ],
          "name": "B",
          "type": "Region"
        }
      ],
      "config": {
        "coaches": [
          {
            "type": "AIAgentObject",
            "config": {
              "coach": "@AIAGENT pzInsightAgent"
            }
          }
        ],
        "icon": "home-solid",
        "localeReference": "@LR MYCO-MYAPP-UIPAGES!PAGE!PYHOME",
        "ruleClass": "MyCo-MyApp-UIPages",
        "template": "WideNarrowPage",
        "title": "@L Home",
        "type": "landingpage"
      },
      "name": "pyHome",
      "type": "View"
    },
    "pxContextMetadata": {
      "$properties": [
        ".pxRefObjectClass",
        ".pxRefObjectInsName",
        ".pzInsKey",
        ".pxUrgencyAssign",
        ".pyLabel",
        ".pyAssignmentStatus",
        "pulse.messageIDs",
        ".pxRefObjectKey"
      ],
      "$AIAgents": ["pzInsightAgent"],
      "$views": [
        {
          "name": "pyListOfFollowedItems",
          "ruleClass": "Data-Portal"
        }
      ],
      "$pagelists": [
        {
          "$properties": [".pyLabel"],
          "pagelist": "D_pyAnnouncements.pxResults"
        }
      ],
      "$fields": [
        {"name": ".pxUrgencyAssign"},
        {"name": ".pyLabel"},
        {"name": ".pyAssignmentStatus"},
        {"name": "pulse.messageIDs"},
        {"name": ".pxRefObjectKey"},
        {"name": ".pxRefObjectClass"},
        {"name": ".pxRefObjectInsName"},
        {"name": ".pzInsKey"}
      ],
      "$associated": [],
      "$insights": [],
      "$genAICoaches": [],
      "$attachments": [],
      "$widgets": [],
      "$addresses": [],
      "$users": [],
      "$classesmetadata": [],
      "$whens": [],
      "$paragraphs": []
    }
}
```
