---
name: rest-request-response-mapping
description: REST Connector request and response body mapping -- pyMapToKey targets, POST/PUT/PATCH request body, URL-encoded POST, GET (no request body).
---

# Request and Response Body Mapping

## Response body `pyMapToKey`

The `py{METHOD}ResponseDataList` maps the response body to a clipboard
property via `pyMapToKey`. Use `pyMapTo: "Clipboard"` and
`pyMapToKey: ".pyResponseData"` — this maps the raw response body onto
the connector's step page.

**How the DP framework passes the response to the DT.** After the
connector returns, the DP framework passes the connector's step page
(which now has `.pyResponseData` populated) as the `DataSource` PAGE
parameter to the response DT (`pyResDataTransform`). The response DT
reads `DataSource.pyResponseData` — this works because `DataSource` is
the PAGE parameter in the DT context.

**Do NOT use `DataSource.pyResponseData` in the connector's pyMapToKey.**
The `DataSource` named page does not exist during connector execution.
Using it produces: "Unable to resolve property
'DataSource.pyResponseData', named page not found" — a silent
empty-response failure (200 OK, no exception, all mapped properties
empty).

### Common pyMapToKey values

- `.pyResponseData` — standard JSON response landing (GET, any method)
- `.pyResponseBodyPOST` — POST-specific alternative
- `.pyResponseBodyPUT` — PUT-specific alternative
- `.pyResponseBodyPATCH` — PATCH-specific alternative
- `Param.<name>` — connector output parameter (works in all contexts)

## POST/PUT/PATCH request body mapping

For methods that send a JSON body, set the request data list entry to map from
the clipboard:

- `pyMapFrom: "Clipboard"`
- `pyMapFromKey: ".pyRequestBodyPOST"` (or `"Param.requestJSON"`, `"Param.jsonData"`)
- Always include a `Content-Type: application/json` request header

## JSON body mapping mode

JSON body mapping is achieved via `pyMapFrom: "JSON"` on data list entries
(e.g., `pyMapFromKey: ".pzRequest.pzBodyPOST"`), **not** via a separate
`pyPOSTDataMappingType` value. The `pyPOSTDataMappingType` field only
distinguishes URL-encoded (`"URL_ENCODED"`) from standard mapping (empty
string). When `pyPOSTDataMappingType` is empty/absent and a data list entry
uses `pyMapFrom: "JSON"`, the connector serializes the referenced page
directly as the JSON request body.

## URL-encoded POST (`pyPOSTDataMappingType`)

When the POST body is form-encoded (`application/x-www-form-urlencoded`), set
`pyPOSTDataMappingType: "URL_ENCODED"` on the connector. This changes the
`pyPOSTRequestDataList` structure:

- Each entry's `pyParameterName` is the **form field name** (e.g., `"grant_type"`,
  `"client_id"`), not `"Request Mapping"`
- Entries include `pyMapFrom` / `pyMapFromKey` for the field value source
- Entries include `pyDataType: "string"` on each form field entry
- Entries **omit** `pyUseFastJSONProcessing`
- Use `Content-Type: application/x-www-form-urlencoded` in request headers
- Response mapping is optional -- some URL_ENCODED connectors leave
  `pyPOSTResponseDataList` as a stub

## GET methods have no request body

GET methods do not have a request body. Omit `pyGETRequestDataList` from the
payload -- it is auto-filled as an empty string by the builder. Do NOT include
a request data mapping entry for GET.
