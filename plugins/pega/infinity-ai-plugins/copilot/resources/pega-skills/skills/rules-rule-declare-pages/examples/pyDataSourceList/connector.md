---
name: pyDataSourceList entry — Connector
description: Minimum-viable connector source entry. Required fields pyConnectorName, pyConnectorClassName, pyConnectorList; typically accompanied by request/response data transforms. The bound connector's py{METHOD}ResponseDataList[*].pyMapToKey must use 'DataSource.<property>' (e.g. 'DataSource.pyResponseData') for the response DT to see the body. pyResDataTransform must be a clipboard-format wrapper DT, not a JSON-format DT directly.
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
