---
name: rules-rule-edit-validate
description: Schema and authoring guide for Pega edit validate rules (Rule-Edit-Validate), including Java validation code, error messaging, and property-level validation patterns
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|------|-------------|
| `Boolean true validation` | Boolean true validation -- checks value is true, adds error message if false |
| `Not-blank validation` | Not-blank validation with error message |
| `Numeric range validation` | Numeric range validation with class scoping |

## Authoring notes

### Java code context

The `pyJavaCode` field receives these implicit variables:
- `theValue` (String) -- the property value being validated
- `theProperty` (ClipboardProperty) -- the property being validated; use `theProperty.addMessage("key")` to attach error messages
- `tools` (PublicAPI) -- standard Pega API for database access, page operations, etc.
- `pega` (PegaAPI) -- extended Pega API

The code must return `boolean` -- `true` if valid, `false` if invalid.

### pyValidateName

`pyValidateName` is the identifier used to reference this rule from property definitions. It typically matches `pyRuleName`. When attaching a validate rule to a property, the property's edit validate field references the `pyValidateName`.

### pyClassName scoping

Validate rules have an empty `pyClassName`, making them globally available regardless of applies-to class.

### Error messages

Call `theProperty.addMessage("messageKey")` before returning `false`. The message key can be:
- A literal string displayed as-is
- A field value reference (e.g., `"pyPleaseSelectARuleSet"`) that resolves via Pega's localization framework
