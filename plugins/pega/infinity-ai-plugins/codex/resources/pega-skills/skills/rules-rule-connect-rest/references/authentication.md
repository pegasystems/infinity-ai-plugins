---
name: rest-authentication
description: REST Connector authentication configuration -- pyAuthProfileSelectionType, direct vs SETTING auth profiles, TLS truststore, builder limitations.
---

# Authentication

## `pyAuthProfileSelectionType` depends on auth source

Set `pyAuthProfileSelectionType` based on the auth configuration:

- **`"AUTH_PROFILE"`** -- when authentication is off (`pyUseAuthentication: "false"`)
  or when using a direct profile reference via `pyAuthenticationProfile`
- **`"SETTING"`** -- when using a DSS-based auth profile via
  `pyAuthenticationProfileForSetting`

## Configuring authentication

When authentication is required, set `pyUseAuthentication: "true"`. Two auth
profile sources are available:

- **Direct profile** (`pyAuthProfileSelectionType: "AUTH_PROFILE"`): Set
  `pyAuthenticationProfile` to the property reference (e.g., `".pyAuthProfile"`).
- **SETTING profile** (`pyAuthProfileSelectionType: "SETTING"`): Set
  `pyAuthenticationProfileForSetting` to the DSS reference (e.g.,
  `"MyOrg-MyApp!pyAuthProfileReference"`). The referenced setting must
  pre-exist -- see `references/url-configuration.md` ("SETTING references must
  pre-exist in the target ruleset").

For TLS certificate validation, set `pyTruststoreName` to the truststore name.

**Builder limitation**: `create-rule` silently resets `pyUseAuthentication`
to `"false"` and drops `pyAuthenticationProfile` when using direct profile
references (`AUTH_PROFILE`). **SETTING-based auth profiles are retained** by the
builder. To set direct-profile authentication on a new connector, create it
first without auth, then use `update-rule` to set `pyUseAuthentication`,
`pyAuthProfileSelectionType`, and `pyAuthenticationProfile` in a second call.
