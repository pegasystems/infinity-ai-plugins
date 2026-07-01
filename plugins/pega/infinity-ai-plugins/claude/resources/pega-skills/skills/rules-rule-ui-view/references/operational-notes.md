---
name: view-operational-notes
description: "Operational notes and verification checklist for Rule-UI-View updates, including metadata string handling and common rendering gotchas"
---
# Operational Notes

## pxViewMetadata & pxContextMetadata

Both are JSON-stringified objects — **must be sent as JSON strings** (`JSON.stringify`),
not objects. Must be updated explicitly alongside `pyContent` (not auto-regenerated).

See `rules-rule-ui-view/references/view-metadata-structures` for the full schema reference:
component node properties, common config properties, special value annotations
(`@P`, `@FL`, `@L`, `@ATTACHMENT`, `@USER`, `@ASSOCIATED`, `@LR`, etc.),
view root config, and all `pxContextMetadata` sections (`$properties`, `$views`,
`$associated`, `$attachments`, `$users`, `$pagelists`, `$whens`, etc.).

## Required Field & When Visibility Patterns

See `rules-rule-ui-view/references/view-field-patterns` for the full patterns:

- **Required fields:** Two-surface wiring (`pyRequiredOption` + `config.required`),
  Data Reference `inheritedProps`, anti-patterns.
- **When visibility:** Three-surface wiring (`pyVisibilityOption` + `config.visibility`
  + `$whens`), combining conditions, anti-patterns.

## Gotchas

- **Branch awareness:** When working in a branch, the view you need to modify typically lives in the base ruleset — not the branch. If the view is not already in the current branch ruleset, use `copy-rule` to create a branch copy before modifying it.
- **pyContent is the source of truth for field layout.** The Agentic Authoring API does NOT auto-regenerate `pxViewMetadata`/`pxContextMetadata` — update all three surfaces together.
- **pxViewMetadata and pxContextMetadata must be JSON strings** — use `JSON.stringify`. Objects are rejected by the Pega API.
- **pxRuleReferences is NOT auto-updated** after editing `pyContent`. May be stale. Not a blocker.
- **pyRuleAvailable must be `"Yes"` for label resolution.** Properties without it produce blank labels (`@FL` cannot resolve).
- **Blank labels can also indicate missing `pyCaption` FieldValue rules.** Create the
  `Rule-Obj-FieldValue` for `pyCaption`, or use a literal label in `pxViewMetadata`
  when the label should be local to one form.
- **Operation order for removing fields:** Remove from all views first, then block the property. Blocking while a view references it causes blank labels.
- **Blocked views:** `list-rules` does NOT show blocked rules; `search-rules` DOES; `get-rule` by key shows them.
- **Send the entire `pyContent` outer array** (region wrapper + inner array), not just the new field.
- **`pyRuleFormStatus`** should be `"Good"` after a successful update.
- **`Pega-UI-Content-Field-Checkbox` and `Pega-UI-Content-Field-Boolean` are both invalid** — either causes HTTP 500. Use `Pega-UI-Content-Field-Text` with `pyComponentName: "Checkbox"`.
- **RichText vs TextArea:** Both use `Pega-UI-Content-Field-Text-Paragraph`. The difference is `pyComponentName`: `"RichText"` vs `"TextArea"`.
- **DateTime class name:** Always use `Pega-UI-Content-Field-Date-Time` (hyphenated). The non-hyphenated form `Pega-UI-Content-Field-DateTime` is not accepted by the server.
- **Phone field datasource:** Requires `D_pyCountryCallingCodeList` in both `pyJsonConfig` and `pxViewMetadata.config.datasource`, plus a `$pagelists` entry.
- **Attachment `pyType`:** Attachment properties use `pyType: "Page"` in `pyContent`.
- **Field input type is a property-level concern.** `pyDisplayLabel` on a view field entry is cosmetic and server-generated — do not set it on CREATE/UPDATE. Change `pyStreamName` on the `Rule-Obj-Property` to change the control.
- **`pyRequiredValue` type normalization:** Send as boolean (`false`/`true`) on CREATE/UPDATE. The server normalizes to string (`"false"`/`"true"`) on GET. Both representations are accepted.
- **`pyInheritParentLayout` boolean coercion:** Send as boolean `false` on CREATE. The server stores it as string `"false"` on GET. Unlike `pyRequiredValue`, the schema validator **rejects** the string form on subsequent `update-rule` calls. Always include `"pyInheritParentLayout": false` (boolean) explicitly in every update payload to avoid validation failure.
- **Embedded data properties in `$properties`/`$fields`:** Embedded data fields (Page/PageList sub-views) go in `$views` only — do NOT add them to `$properties` or `$fields`. The server strips embedded data property paths from both arrays on save. Only scalar fields belong in `$properties`/`$fields`.
- **`displayAs`/`showLabel`/`hideLabel` on embedded data:** The server silently strips `displayAs`, `showLabel` (in `inheritedProps`), and `hideLabel` from embedded data `pxViewMetadata` config on save. Do not include them — they cause roundtrip mismatches. Only `label` survives in `inheritedProps` for embedded data references.
- **DataReference `pyContent` GET vs CREATE difference:** Designer-created rules unpack `pyJsonConfig` into four top-level fields (`pyClassContext`, `pyReferenceType`, `pyRuleName`, `pyRuleType`) and strip `pyJsonConfig` to just `{"authorContext":"..."}`. MCP-created rules preserve `pyJsonConfig` as-sent and omit those four fields. Both are functionally equivalent — `pxViewMetadata` drives rendering. Always use the full `pyJsonConfig` form for CREATE/UPDATE.
- **Embedded data `ruleClass` normalization:** When creating an embedded data field, you may send the parent class as `ruleClass` in `pxViewMetadata.config` and `$views`. The server normalizes `ruleClass` to the embedded property's page class (the data class). This is expected — do not treat the mismatch between sent and returned `ruleClass` as an error.
- **`authorContext` vs `context` in `pyJsonConfig`:** DataReference and parent-view `reference` wiring use `authorContext` (e.g., `"authorContext":".Customer"`). EmbeddedData Page (inline form) uses `context` (e.g., `"context":".Address"`). EmbeddedData PageList (SimpleTable delegation) uses `authorContext` (e.g., `"authorContext":".AddressList"`). Do not use `context` for PageList — it has no production evidence and produces incorrect metadata. This key has not been verified on 24.x — earlier versions may differ.
- **`pyPromptClass` is the owner class, not the target class.** On Infinity 26, `pyPromptClass` carries the class that defines the **parent page property** containing `pyFieldReference`. For direct properties on the work class, this equals the view's class. For nested paths (`.A.B.C` where `pyFieldReference` is `C`), it is the class that defines `B` — not the work class and not the embedded/leaf class. For TextInput and other field types on deep paths, `pyPromptClass` is the class where the leaf property is defined. Determining the correct class may require a server lookup (`list-rules` or `get-rule` on the parent property). The embedded page's own class goes in `pyClassContext` and `pxViewMetadata.config.ruleClass`. This has not been verified on 24.x — treat as 26+ behavior until confirmed.

## Verification Checklist

- `pyRuleFormStatus` is `Good`.
- `pxSaveDateTime` advanced after update.
- New property appears in `pxContextMetadata.$properties`.
- For Dropdowns, `pxContextMetadata.$associated` contains the property.
- For newly requested fields, each backing `Rule-Obj-Property` exists before the
  view create/update call.
