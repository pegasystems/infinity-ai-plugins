---
name: rules-rule-connect-rest
description: Authoring guide for Pega REST connector rules (Rule-Connect-REST) -- URL configuration, HTTP method stubs, request/response mapping, parameters, and authentication
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Overview

REST Connectors (`Rule-Connect-REST`) call external REST APIs. They are sourced by
Data Pages via the `pxCallConnector` activity and should never be called directly
from UI or flow logic.

Each HTTP method (GET, POST, PUT, PATCH, DELETE) has its own set of request/response
mapping arrays. All five method array sets must be present on the persisted rule.
The schema autofills empty stubs for any method you omit, so populate only the
methods you actually use.

**Scope:** This skill targets REST connectors that use `pyEmbeddedURL` for URL
configuration. Earlier connectors stored URL configuration in a flat
`pyResourcePath` field at the rule root. To create a new connector matching an
earlier one's shape, use `copy-rule` (which preserves the original payload
structure) rather than authoring through this skill -- the authoring shape here
will not validate the older form.

## Authoring notes

### Topic references

| Topic | Skill | Covers |
|-------|-------|--------|
| URL configuration | `rest-url-configuration` | Direct URLs (`pyBaseURL`/`pyEndpointURL`) and SETTING-based URLs (`pyBaseURLSetting`) |
| Parameter naming and mapping | `rest-parameter-mapping` | Dynamic path segments, `pyResourceParameters`, `pyParametersParam*` vs `pyParameterName`, query string parameters |
| Request and response body mapping | `rest-request-response-mapping` | Response `pyMapToKey` targets, POST/PUT/PATCH bodies, URL-encoded POST, GET (no body) |
| Authentication | `rest-authentication` | `pyAuthProfileSelectionType`, direct vs SETTING profiles, TLS truststore, builder behaviors |

### `Accept` header

Always include `Accept: application/json` in request headers for JSON APIs.

### Response landing page

Use `DataSource.<property>` for `pyMapToKey` when the connector is sourced
from a data page (typical case). The data-page sourcing engine binds the
connector's working state to a named page called `DataSource`, and the
response DT (`pyResDataTransform`) reads from that page — `.<property>`
without the `DataSource.` prefix lands the body on the calling page where
the DT cannot see it (silent empty-response failure: 200 OK, no exception,
empty values). For activity-invoked connectors, use a calling-page
property. See `rest-request-response-mapping`.

### All five method array sets

All five method array sets must be present on the persisted rule. The schema
autofills empty stubs for any method you omit -- only populate methods you
actually use. Do NOT add headers, body mappings, or response mappings to a
method you don't intend to use.

### `pyDataType` on entries

Required on data list entries (typically `"string"`); optional on header
entries. The server accepts both `"string"` and `"String"`.

### `pyMapFrom` casing

Headers use `pyMapFrom: "Constant"` (capital C only). Resource path and query
string parameters use all-caps: `"CONSTANT"`, `"CLIPBOARD"`, or `"PARAM"`. Data
list entries also support `pyMapFrom: "JSON"` and `pyMapTo: "JSON"` for direct
JSON serialization/parsing.

### Builder limitations on `create-rule`

- `"JSON"` for `pyMapFrom`/`pyMapTo` may be substituted with `"Clipboard"`.
- `"PARAM"` on resource path parameters may be rejected.

Use `update-rule` post-creation to set these values if needed.

### Pega boolean convention

Pega booleans are strings (`"true"` / `"false"` / `""`), never JSON booleans.

### `pyResponseTimeout` (not `pyTimeout`)

The response timeout field is `pyResponseTimeout` (e.g., `"10000"` for 10
seconds). The builder does not recognize `pyTimeout` and falls back to the
default 10000ms.

### `pyDisplayMode` and `pyMethodStatus`

The builder does NOT auto-fill these -- agents must include them explicitly:

- `pyDisplayMode` -- `"basic"` for new connectors, `"clone"` for cloned rules,
  `"specialize"` for specialized rules. When recreating a connector, match the
  original value.
- `pyMethodStatus` -- `"Internal"` on most connectors. Set to `"Extension"` for
  extension-point connectors designed to be overridden by implementations.
  Leave absent/empty when not applicable.

### Embedded-URL marker flags

`pyHasEmbedUrl` and `pyEmbeddedURL.pyURLEntered` are autofilled to `"true"` on
submission. Do not set them manually.

- `pyHasEmbedUrl` marks the rule as using the Infinity 8.3+ embedded-URL shape;
  without it, the rule form renders a phantom "Upgrade URL configuration"
  affordance.
- `pyEmbeddedURL.pyURLEntered` is required at runtime by the URL resolver
  regardless of `pyBaseURLSelectionType` (`"URL"` or `"SETTING"`). Without it,
  data pages fail at execution with "no URL configured" even though the rule
  saves and renders correctly in App Studio.

Both flags appear on `get-rule` round-trips.

### `pyRuleAvailable` lifecycle

`create-rule` forces `pyRuleAvailable` to `"Yes"` regardless of the value in
the payload. Most OOTB connectors have `pyRuleAvailable: "Final"`. To set a
connector to `"Final"`, use `update-rule` after creation.

### `pyUseFastJSONProcessing` scope

Only meaningful on data list entries (`pyPOSTRequestDataList`,
`pyGETResponseDataList`, etc.) -- never on headers, request parameters,
response headers, or resource parameters. The schema autofills `"false"` on
data list entries when missing.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub REST Connector` | Minimal GET connector -- smallest valid create payload with a static URL |
| `GET Connector with Dynamic Path and Query Parameters` | GET connector with dynamic `{param}` path segment and query string parameter |
| `POST Connector with SETTING URL` | POST connector with SETTING-based URL, request body from clipboard, Authorization header |
| `Authenticated Connector with SETTING Auth Profile` | Authenticated connector with SETTING auth profile, CLIPBOARD path param, GET+POST methods |
| `CRUD Connector with Direct URL (Activity-Invoked)` | GET/POST/PUT/PATCH CRUD connector with direct base URL and conditional-update response header mapping |

### `pyEmbeddedURL` partial shapes

When composing or modifying URL configuration, use these standalone EmbedURL
snippets -- copy the JSON body into the `pyEmbeddedURL` value of a full
connector payload.

| Skill | Description |
|-------|-------------|
| `Direct base URL (minimum pyEmbeddedURL shape)` | Minimum direct URL -- `pyBaseURL` only, no path or query parameters |
| `SETTING base URL via Dynamic System Setting` | DSS-based URL -- `pyBaseURLSetting` reference with `pyNote` |
| `Static literal URL path segments` | Multiple CONSTANT segments forming a literal path |
| `Dynamic {param} URL path segment` | Runtime placeholder `{param}` segment paired with `pyParameters` |
| `URL path segment from a clipboard property` | Path segment sourced from a clipboard property with `pyEncoding: "NONE"` |
| `Query string parameters from PARAM and CLIPBOARD` | Multiple query parameters from PARAM and CLIPBOARD with `pyFirstItem`, `pyEmptyBehavior`, `pyDefaultValue` |
| `Query string with PARAM and CONSTANT values` | Mixed PARAM + CONSTANT query parameters — runtime business input vs fixed protocol options |

## Integration pipeline

A REST connector is one part of a multi-rule integration pipeline. The full
wiring sequence is:

1. Properties on the data class (flat fields)
2. Embedded class + properties for JSON arrays
3. Page List property pointing to embedded class
4. **REST Connector** (maps response to clipboard property)
5. JSON Data Transform (deserializes JSON to clipboard)
6. Regular Data Transform (calls JSON DT, copies flat values)
7. Data Page (wires connector + response DT + parameters)

## Connector update and replacement

### When to replace vs update

Use **replacement** (create a new connector) instead of `update-rule` when:

- The update API rejects the payload shape (e.g., `pyActionData: object
  found, string expected`).
- The connector uses a legacy flat `pyResourcePath` shape incompatible with
  `pyEmbeddedURL`.
- Structural changes to the URL configuration are needed and the original
  shape is unclear.

After creating a replacement connector, rewire the data page's
`pxCallConnector` reference to point to the new connector.

### Update checklist

When updating an existing connector, verify these fields beyond the obvious
URL/headers:

- [ ] `pyResponseTimeout` — default 10000ms may be insufficient for slow external APIs
- [ ] `pyRESTProxyConfig.pyProxyAuthTypeSelection` — required on updates; use `"NO_AUTH"` when no proxy auth is needed
- [ ] Response landing page (`pyMapToKey`) — must be `DataSource.<property>` for data-page-sourced connectors
- [ ] Request headers — no personal names, email addresses, operator IDs, or company-identifying information
- [ ] Endpoint/path double-prefix — validate that `pyBaseURL` + resource path segments don't duplicate segments (e.g., `/sparql/sparql`)

### Endpoint/path validation

Before wiring response mapping, validate the final URL shape:

1. Concatenate `pyBaseURL` + all `pyResourceParameters` segments.
2. Verify the result matches the API documentation URL exactly.
3. Common mistake: base URL includes a path segment that is also added as a
   resource parameter, producing a doubled path (returns HTML error pages
   instead of JSON).

### Privacy-safe request headers

Generated connectors must never include identifying information in HTTP
headers:

- **User-Agent**: Use a generic application identifier (e.g.,
  `MyApp/1.0`), never personal names or company emails.
- **From/X-Contact**: Omit entirely.
- **Authorization**: Only from auth profiles, never hardcoded credentials.

### Timeout and empty results

When a connector timeout occurs inside a flow utility that loads a data page,
the flow may continue with an empty staging list. The visible symptom is
"search succeeded but results are empty" — no exception in the UI.

**Fix:** Increase `pyResponseTimeout` for slow external APIs (e.g., `"30000"`
for 30s). Log or surface connector errors rather than silently continuing
with empty data.
