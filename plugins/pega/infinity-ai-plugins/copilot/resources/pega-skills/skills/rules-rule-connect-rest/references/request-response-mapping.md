---
name: rest-request-response-mapping
description: REST Connector request and response body mapping -- pyMapToKey targets, POST/PUT/PATCH request body, URL-encoded POST, GET (no request body).
---

# Request and Response Body Mapping

## Response body `pyMapToKey` — invocation-context-dependent

The `py{METHOD}ResponseDataList` maps the response body to a clipboard
property via `pyMapToKey`. The correct value depends on how the connector
is invoked.

**Why context matters.** When a connector is sourced by a data page
(`pyDeclarePagesDataSource: "Connector"`), the sourcing engine binds the
connector's working state to a named clipboard page called `DataSource`,
and the data page's response DT (`pyResDataTransform`) reads from that
page. A bare `.pyResponseData` deposits the body on the connector's
calling page — which the response DT cannot see — producing a silent
empty-response failure (200 OK, no exception, all mapped properties
empty).

### Data-page-sourced (typical)

Use `DataSource.<property>`. Common targets:

- `DataSource.pyResponseData` — standard JSON response landing
- `DataSource.pyResponse.pyResponseJSON` — alternative
- `DataSource.pyJSONResponse` — older connectors
- `Param.<name>` — connector output parameter (works in both contexts)

For POST/PUT/PATCH, the response may alternatively map to
`DataSource.pyResponseBodyPOST`, `DataSource.pyResponseBodyPUT`, etc.

### Activity-invoked (rare for reads)

Use a calling-page property (e.g. `.pyResponseData`). The two contexts
are not interchangeable — copying a data-page-sourced shape into an
activity-invoked use produces the same silent failure mode in reverse.

When recreating an existing connector, match the original's `pyMapToKey`
exactly — but verify which invocation context that connector is used in,
since the comparator may itself be silently broken if it uses
`.pyResponseData` while sourced from a data page.

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
