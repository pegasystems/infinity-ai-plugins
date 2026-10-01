---
name: rules-rule-admin-system-settings
description: Authoring guide for Pega Application Settings (Rule-Admin-System-Settings) used by integrations for environment-specific base URLs, authentication profile names, and similar configuration values. Use when creating a new Application Setting, updating an existing one, or wiring REST connectors to SETTING-based URL/auth references.
---

Application Settings store application-level configuration values that vary by
environment, such as REST connector base URLs and authentication profile names.
REST connectors reference them with:

- `pyEmbeddedURL.pyBaseURLSelectionType: "SETTING"`
- `pyEmbeddedURL.pyBaseURLSetting: "{SettingName}"`
- `pyAuthProfileSelectionType: "SETTING"`
- `pyAuthenticationProfileForSetting: "{SettingName}"`

For connector-side wiring examples, see
`rules-rule-connect-rest/examples/pyEmbeddedURL/setting-base-url` and
`rules-rule-connect-rest/examples/auth-setting-profile`.

## Authoring support

Application Settings support both `create-rule` and `update-rule`. On create,
omit `pySettingMetaData.pyCategoryName` unless reusing the exact name of a
category that already exists — inventing a new category name fails with
`500 Internal Server Error: "Selected category is invalid."` For complete
integration workflows, load `methodology-integration` and follow its
authoring order.

Create the setting directly with `create-rule` when a standalone setting is needed;
use the integration-specific rule skills when building a larger integration.

Do not confuse Application Settings with Dynamic System Settings:

| Name | Rule type | Purpose | Agent support |
|---|---|---|---|
| Application Setting | `Rule-Admin-System-Settings` | App-level config such as endpoint URLs and auth profile names | Create and update |
| Dynamic System Setting | `Data-Admin-System-Settings` | Platform/system behavior controls | Do not author |

## Fields

| Field | Purpose |
|---|---|
| `pyOwner` | Categorization: which integration these settings belong to — typically `{Application}-{IntegrationSystem}`, e.g. `Onboarding-DeviceManagement`. Distinct from `pyRuleSet` (the actual ruleset, e.g. `Onboarding`) — do not conflate the two. Required. |
| `pyPurpose` | Setting purpose within the owner context, e.g. `BaseURL`, `AuthProfile`. Never blank. Required. |
| `pyLabel` | Display label, author-supplied — independent of `pyPurpose` (a technical `pyPurpose` like `pyBuddyAuthenticationProfile` may pair with a human-readable `pyLabel` like `Buddy Authentication Profile`). Required. |
| `pyProductionLevel[]` | Five environment-tier entries. Each entry stores that tier's value in `pySetting`. `pyDescription` values: `1 - Sandbox`, `2 - Development`, `3 - Quality assurance`, `4 - Staging`, `5 - Production`. |
| `pySettingMetaData.pyValueType` | Value type — `String`, `Boolean`, `Enum`, or `Class` (matches the platform's Value Type UI dropdown exactly). The shape of `pySetting` differs per type; see the `pySettingMetaData` examples below for the two types confirmed against live rules. `Boolean` and `Enum` are confirmed-valid enum values but have no confirmed example yet — do not guess their `pySetting` shape. |
| `pySettingMetaData.pyValueClass` | Required alongside `pyValueType: "Class"` — names the target class (e.g. `Data-Admin-Security-AuthenticationProfile` for auth profile settings). For these, `pySetting` holds the authentication profile's name, or may be intentionally blank for API-key auth carried in a connector header. |

## Examples

| Skill | Label | Description |
|---|---|---|
| `rules-rule-admin-system-settings/examples/stub` | admin-system-settings-stub | Minimal, full valid Rule-Admin-System-Settings create payload |
| `rules-rule-admin-system-settings/examples/pySettingMetaData/string` | admin-system-settings-value-type-string | `pySettingMetaData` shape for a String-typed setting (e.g. a base URL); `pySetting` holds the raw string directly |
| `rules-rule-admin-system-settings/examples/pySettingMetaData/class` | admin-system-settings-value-type-class | `pySettingMetaData` shape for a Class-typed setting (e.g. an auth profile reference), including the required `pyValueClass` companion field |

The referenced Application Setting must already exist before a connector can save
successfully in `SETTING` mode.
