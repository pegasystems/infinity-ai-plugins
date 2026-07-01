---
name: rest-url-configuration
description: REST Connector URL configuration -- direct URLs (pyBaseURL/pyEndpointURL), SETTING-based URLs (pyBaseURLSetting), and how to achieve runtime URL flexibility from the caller side.
---

# URL Configuration

## `pyBaseURL` and `pyEndpointURL` for direct URLs

When `pyBaseURLSelectionType` is `"URL"`, the `pyEmbeddedURL` object requires
`pyBaseURL` set to the base URL value. `pyEndpointURL` should typically match
`pyBaseURL` but is optional -- some connectors omit it. When present, set both
to the same value.

## SETTING-based URLs use `pyBaseURLSetting`

When `pyBaseURLSelectionType` is `"SETTING"`, the URL comes from Application Settings (Rule-Admin-System-Settings). In this case, omit `pyBaseURL` and `pyEndpointURL`, and instead set
`pyBaseURLSetting` to the Application Settings reference (e.g.,
`"Pega-NLP!pyPegaAzureOpenAIGatewayServiceBaseURL"`). You can set `pyNote` on the
`pyEmbeddedURL` object to document the actual URL for reference.

## SETTING references must pre-exist in the target ruleset

When `pyBaseURLSelectionType: "SETTING"` (or any field referencing a
`Rule-Admin-System-Settings` instance, including `pyAuthenticationProfileForSetting`),
the referenced setting must already exist in the target ruleset or its
prerequisites. `create-rule` validates references at create time and rejects
the payload with *"does not exist or is not a valid entry for this ruleset and
its prerequisites"* if the setting is not found.

When authoring a connector that uses SETTING-based references, either:

- Pre-create the referenced settings before submitting the connector, or
- Substitute setting names that already exist in the target environment.

This applies to URL settings (`pyBaseURLSetting`), auth profile settings
(`pyAuthenticationProfileForSetting`), and any other Application Settings keyed reference field.

## Runtime URL flexibility comes from the caller, not from omitting `pyBaseURL`

Every connector requires either `pyBaseURL` (when `pyBaseURLSelectionType` is
`"URL"`) or `pyBaseURLSetting` (when `pyBaseURLSelectionType` is `"SETTING"`).
A connector saved with neither is broken at runtime even if the rule saves
successfully.

Runtime URL flexibility -- e.g., calling the same external API across multiple
hosts or paths -- is achieved on the **caller** side, not by leaving the
connector's URL empty. Two common patterns:

- The data page (or activity) that sources the connector overrides URL
  components by passing values via `pyResourceParameters` (path substitution)
  or `pyParameters` (query / connector parameters).
- Use `pyBaseURLSelectionType: "SETTING"` with a `pyBaseURLSetting` reference
  whose value differs per environment via Application Settings.

Do **not** attempt to configure runtime URLs by omitting `pyBaseURL` and
`pyBaseURLSetting`. `create-rule` rejects this shape.
