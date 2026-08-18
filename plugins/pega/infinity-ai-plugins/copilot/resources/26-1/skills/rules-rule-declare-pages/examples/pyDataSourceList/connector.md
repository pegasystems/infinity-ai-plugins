---
name: pyDataSourceList entry — Connector
description: Minimum-viable connector source entry. Required fields pyConnectorName, pyConnectorClassName, pyConnectorList; typically accompanied by request/response data transforms. The bound connector's py{METHOD}ResponseDataList[*].pyMapToKey must use '.pyResponseData' with pyMapTo='Clipboard' — this maps the response body onto the connector's step page. The DP framework then passes this step page as the DataSource PAGE parameter to the response DT. pyResDataTransform must be a clipboard-format wrapper DT, not a JSON-format DT directly.
---

```json
{
  "pyDeclarePagesDataSource": "Connector",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-Product",
  "pyStructure": "page",
  "pyConnectorName": "GetProduct",
  "pyConnectorClassName": "MyOrg-MyApp-Data-Product",
  "pyConnectorList": "Rule-Connect-REST",
  "pyRESTMethod": "GET",
  "pyReqDataTransform": "GetProductRequest",
  "pyResDataTransform": "GetProductResponse",
  "pyPassCurrentParamPageForReqDT": "true",
  "pyPassCurrentParamPageForRespDT": "true"
}
```
