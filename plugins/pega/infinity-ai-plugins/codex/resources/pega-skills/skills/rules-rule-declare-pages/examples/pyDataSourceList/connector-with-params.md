---
name: pyDataSourceList entry — Connector with parameter mapping
description: Connector source entry with pyConnectorParamList mapping data page parameters to connector query-string parameters. pyIsActivityParameter must be "false" for connector params (query string, path, headers); "true" only for pxCallConnector activity-level overrides.
---

```json
{
  "pyDeclarePagesDataSource": "Connector",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyStructure": "page",
  "pyConnectorName": "GeocodeAddress",
  "pyConnectorClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyConnectorList": "Rule-Connect-REST",
  "pyRESTMethod": "GET",
  "pyResDataTransform": "MapGeocodeResponseBridge",
  "pyPassCurrentParamPageForRespDT": "true",
  "pyConnectorParamList": [
    {
      "pxObjClass": "Embed-NameValuePair",
      "pyName": "address",
      "pyValue": "",
      "pyIsActivityParameter": "false",
      "pyParameterRequired": "-1",
      "pyParameterType": "STRING"
    },
    {
      "pxObjClass": "Embed-NameValuePair",
      "pyName": "benchmark",
      "pyValue": "4",
      "pyIsActivityParameter": "false",
      "pyParameterRequired": "-1",
      "pyParameterType": "STRING"
    }
  ],
  "pyPassCurrentParamPageForActivity": "true"
}
```
