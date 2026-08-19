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
| Endpoint-grouped vs. single CRUD connector | `rest-endpoint-grouped-vs-single-connector` | Why to group manual/no-OAS connectors by endpoint shape (collection vs. instance) instead of one connector handling both |

### `Accept` header

Always include `Accept: application/json` in request headers for JSON APIs.

### Response landing page

Use `.<property>` (dot-prefixed, no page name) for `pyMapToKey` — typically
`".pyResponseData"` for GET or `".pyResponseBodyPOST"` for POST. Combined with
`"pyMapTo": "Clipboard"`, this maps the HTTP response body onto the connector's
step page. The data-page sourcing engine then passes that step page AS the
`DataSource` page parameter to the response DT. Do NOT prefix with `DataSource.`
— that named page does not exist during connector execution (it only exists in
the DT context). Using `DataSource.<property>` causes a silent empty-response
failure: 200 OK, no exception, empty values.
See `rest-request-response-mapping` for the full mapping reference.

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

### Resolve URL and auth names before creating the connector

**Never create a connector with a hardcoded placeholder URL when the intent is to
use an Application Setting (`pyBaseURLSelectionType: "SETTING"`).** Hardcoded URLs
require the user to manually fix the connector in Infinity Studio, and any subsequent
`update-rule` call risks overwriting those manual changes.

Before calling `create-rule`:
- Ask the user for the Application Setting name (`RulesetName!settingName`) or
  confirm it exists via `search-rules` on `Rule-Admin-System-Settings`.
- Ask for (or confirm) the auth profile name when `pyAuthProfileSelectionType:
  "AUTH_PROFILE"` is intended.
- If neither exists yet, create the Application Setting first, then create the
  connector referencing it.

Only fall back to `pyBaseURLSelectionType: "URL"` with a direct `pyBaseURL` when
the user has explicitly confirmed a hardcoded URL is acceptable (e.g., single-lab
demo environments where the URL will not change).

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
  saves and renders correctly in Infinity Studio.

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

### `pyIntegrationSystemId` (NOT `pyIntegrationSystem`)

Set `pyIntegrationSystemId` — a plain string — to the ID of an **existing** `Data-IntegrationSystem` record (e.g. `"EmployeeService"`). This is a foreign-key reference, not a free-text label. It should match `pyDSSystemName` on associated Data Page sources.

**Never author `pyIntegrationSystem` directly** — it is a read-only, system-managed denormalized snapshot auto-populated from `pyIntegrationSystemId` at save time. Setting it manually produces a corrupted embedded page with no save-time error.

`Data-IntegrationSystem` records cannot be created via the authoring API — manual prerequisite. See `methodology-integration` → "Integration System Role" for the full explanation, field-level correctness rules, and best practices.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub REST Connector` | Minimal GET connector -- smallest valid create payload with a static URL |
| `GET Connector with Dynamic Path and Query Parameters` | GET connector with dynamic `{param}` path segment and query string parameter |
| `POST Connector with SETTING URL` | POST connector with SETTING-based URL, request body from clipboard, Authorization header |
| `Authenticated Connector with SETTING Auth Profile` | Authenticated connector with SETTING auth profile, CLIPBOARD path param, GET+POST methods |
| `rest-endpoint-grouped-collection` | Collection connector (LIST + CREATE) for the endpoint-grouped manual CRUD pattern |
| `rest-endpoint-grouped-instance` | Instance connector (LOOKUP + UPDATE + DELETE) for the endpoint-grouped manual CRUD pattern |
| `CRUD Connector with Direct URL (Activity-Invoked)` | GET/POST/PUT/PATCH CRUD connector with direct base URL and conditional-update response header mapping |

### `pyEmbeddedURL` partial shapes

When composing or modifying URL configuration, use these standalone EmbedURL
snippets -- copy the JSON body into the `pyEmbeddedURL` value of a full
connector payload.

| Skill | Description |
|-------|-------------|
| `Direct base URL (minimum pyEmbeddedURL shape)` | Minimum direct URL -- `pyBaseURL` only, no path or query parameters |
| `SETTING base URL via Application Setting` | Application-setting-based URL -- `pyBaseURLSetting` reference with `pyNote` |
| `Static literal URL path segments` | Multiple CONSTANT segments forming a literal path |
| `Dynamic {param} URL path segment` | Runtime placeholder `{param}` segment paired with `pyParameters` |
| `URL path segment from a clipboard property` | Path segment sourced from a clipboard property with `pyEncoding: "NONE"` |
| `Query string parameters from PARAM and CLIPBOARD` | Multiple query parameters from PARAM and CLIPBOARD with `pyFirstItem`, `pyEmptyBehavior`, `pyDefaultValue` |
| `Query string with PARAM and CONSTANT values` | Mixed PARAM + CONSTANT query parameters — runtime business input vs fixed protocol options |

## Integration pipeline — mandatory execution order

A REST connector is one part of a multi-rule integration pipeline. When creating
an integration end-to-end, you **MUST** create rules in the following order.
Do NOT skip ahead — each step depends on the previous ones existing.

1. **Properties on the data class** (flat scalar fields for the response)
2. **Embedded class + properties** for JSON arrays (if the response contains arrays)
3. **Page List property** pointing to the embedded class (if step 2 applies)
4. **REST Connector** (maps response body to a clipboard property)
5. **JSON Data Transform** (deserializes JSON into the properties from steps 1-3)
6. **Regular Data Transform** (clipboard-format wrapper that calls the JSON DT)
7. **Data Page** (wires connector + response DT + parameters)

### Dependency constraint

Before creating or updating a Data Transform (steps 5-6) that references
properties via SET steps, **every target property must already exist** on the
applies-to class. If creating both properties and DTs in the same session,
create all properties first. If unsure whether a property exists, verify with
`get-rule` before proceeding.

**Failure mode when violated:** The `create-rule` or `update-rule` call for
the Data Transform fails with a "property does not exist" error, forcing
unnecessary retry cycles and confusing the user.

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
- [ ] Response landing page (`pyMapToKey`) — must be `.<property>` (e.g., `".pyResponseData"`), NOT `DataSource.<property>`
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
- **Authorization**: Prefer auth profiles or SETTING-based auth profile references. Only add a static/custom Authorization-style header when the external API explicitly requires header-based API key or bearer-token auth and no platform auth profile applies. Never commit real credentials.

### Timeout and empty results

When a connector timeout occurs inside a flow utility that loads a data page,
the flow may continue with an empty staging list. The visible symptom is
"search succeeded but results are empty" — no exception in the UI.

**Fix:** Increase `pyResponseTimeout` for slow external APIs (e.g., `"30000"`
for 30s). Log or surface connector errors rather than silently continuing
with empty data.
