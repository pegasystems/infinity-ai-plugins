---
name: view-field-patterns
title: "View Field Patterns"
description: "Patterns for required fields and When-rule visibility in Rule-UI-View, including the two/three-surface wiring and anti-patterns."
---

# View Field Patterns

## Required Field Pattern

Making a field required must be set in **two places simultaneously** in a single
`update-rule` call. The correct values differ by component type.

### TextInput, TextArea, Date, DateTime, Decimal, Integer, URL

**`pyContent` entry** — set `pyRequiredOption: "always"`:

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Text",
  "pyComponentName": "TextInput",
  "pyFieldReference": "FieldName",
  "pyRequiredOption": "always"
}
```

**`pxViewMetadata` config** — set `"required": true` (boolean):

```json
{"config": {"label": "@FL .FieldName", "value": "@P .FieldName", "required": true}, "type": "TextInput"}
```

### Dropdown / Data Reference / Embedded Data (inherited required)

Same two-surface pattern. **`pyContent`** — add `pyRequiredOption: "always"`.
**`pxViewMetadata`** — set `"required": true`.

For Data Reference and Embedded Data fields, `required` is passed via `inheritedProps`:

```json
{
  "config": {
    "authorContext": ".PropertyName",
    "inheritedProps": [{"prop": "label", "value": "@FL .PropertyName"}, {"prop": "required", "value": true}],
    "name": "SubViewName",
    "referenceType": "Data",
    "ruleClass": "ClassName",
    "type": "view"
  },
  "type": "reference"
}
```

### Required anti-patterns

- **`"required": ""`** (empty string) does NOT enforce required — Pega ignores it.
- **Setting only `pxViewMetadata`** without `pyRequiredOption` in `pyContent` does not persist.
- **Setting only `pyContent`** without `pxViewMetadata` — the asterisk will not appear.

### Conditional required

For a field that is required only under a condition, use `requiredCondition` instead
of `required` in `pxViewMetadata`, and use the When rule or condition value in
`pyRequiredOption` instead of `"always"`:

```json
{"config":{"label":"@FL .FieldName","value":"@P .FieldName","requiredCondition":"@FIELD .OtherField == 'Yes'"},"type":"TextInput"}
```

If the condition depends on a named When rule, include that dependency in
`pxContextMetadata.$whens`.

`pyClientValidation: "true"` on the FlowAction ensures the view-level required check
fires before the server round-trip.

### Optional server-side enforcement

Create a `Rule-Obj-Validate` on the case class with an `IsBlank` condition on the
property, then set the FlowAction's `pyValidateActivity` field to the validate rule's
name. This enforces the requirement on submit regardless of client state and provides
inline error messages.

> **Naming gotcha:** Despite its name, `pyValidateActivity` points to a
> `Rule-Obj-Validate` rule, **not** a `Rule-Obj-Activity`. This is a legacy naming
> artifact — always wire it to a validate rule.

> **Anti-pattern:** Do not use Activities for required-field validation. Activity-based
> validation bypasses the validate lifecycle, renders errors at the top of the form
> rather than inline next to the field, and violates the declarative-over-procedural
> principle.

> **UI framework note:** For Constellation/Cosmos apps, required is set on the View
> control (`pxViewMetadata`). For traditional HTML apps, it is set on the Section
> control. Do not mix the two.

### Alternative: pyJsonConfig as Required Source

Embedding `"required":true` inside `pyJsonConfig` causes the server to regenerate
`pxViewMetadata` with the required flag:

```json
{"pyJsonConfig": "{\"datasource\":\"@ASSOCIATED .PropertyName\",\"required\":true}", "pyRequiredOption": "always"}
```

**Caveat:** Observed behavior, not documented API contract.

## When Visibility Pattern

Making a field conditionally visible via a When rule requires updating **three surfaces
simultaneously** in a single `update-rule` call.

**Prerequisites:** The When rule (`Rule-Obj-When`) must already exist and be active
on the same class as the view.

**`pyContent`** — set `pyVisibilityOption` to the When rule name:

```json
{
  "pxObjClass": "Pega-UI-Content-Field-Text",
  "pyComponentName": "TextInput",
  "pyFieldReference": "PassportNumber",
  "pyVisibilityOption": "HasPassport"
}
```

**`pxViewMetadata` config** — set `"visibility"` to the When rule name:

```json
{"type": "TextInput", "config": {"label": "@FL .PassportNumber", "value": "@P .PassportNumber", "visibility": "HasPassport"}}
```

**`pxContextMetadata.$whens`** — add the When rule name:

```json
{"$whens": ["HasPassport"]}
```

### Combining conditions

The same field can have independent visibility, read-only, and disabled When rules:

```json
{"pyVisibilityOption": "HasPassport", "pyReadOnlyOption": "IsSubmitted", "pyDisabledOption": "never"}
```

In `pxContextMetadata`, use the appropriate key: `$whens` (visibility), `$readOnlyWhens` (read-only), `$disabledWhens` (disabled).

### When visibility on Embedded Data references

When an embedded sub-view is conditionally visible, the `$views` entry goes inside
`$whens[n].$views`, not in the top-level `$views` array. Top-level `$views` may be
empty for views where all embedded refs are conditional.

**`pxContextMetadata` example:**

```json
{
  "$whens": [
    {
      "name": "ShowAddress",
      "$views": [
        {"name": "AddressData_Address_1", "context": ".Address", "ruleClass": "MyCo-MyApp-Work-Case"}
      ]
    }
  ],
  "$views": []
}
```

### Inline expression visibility

Use `@E expression` in `pxViewMetadata.config.visibility` for inline expression
conditions that do not require a named When rule.

**`pyContent`** — set `pyVisibilityOption: "expression"`:

```json
{"pyVisibilityOption": "expression"}
```

**`pxViewMetadata`** — use `@E` annotation:

```json
{"type": "TextInput", "config": {"label": "@FL .Flag", "value": "@P .Flag", "visibility": "@E .Status == 'Active'"}}
```

No `$whens` entry is needed — the expression is self-contained.

### Visibility anti-patterns

- **Updating only `pyContent`** without `pxViewMetadata` and `pxContextMetadata` — field stays unconditionally visible.
- **`pyVisibilityOption: "always"`** disables the When condition — use the When rule name.
- **Omitting `$whens`** in `pxContextMetadata` leaves the dependency index stale.
