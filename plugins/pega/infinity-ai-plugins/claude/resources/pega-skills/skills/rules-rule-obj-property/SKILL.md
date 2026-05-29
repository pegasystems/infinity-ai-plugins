---
name: rules-rule-obj-property
description: Schema and authoring guide for Pega property rules (Rule-Obj-Property), including scalar, page, page list, and dropdown prompt list patterns
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|------|-------------|
| `Stub Property` | Minimal property — smallest valid String/Text create payload |
| `String/Text Multi-line` | String/Text rendered as multi-line text area (pyStreamName override) |
| `String/Date` | String/Date — no pyMaxLength needed for non-Text types |
| `Page Property` | Single embedded page — requires pyPageClass, no pyStringType |
| `PageList Property` | Ordered list of embedded pages — same fields as Page, different mode value |
| `Dropdown with Prompt List` | Dropdown with inline static values — three fields required together |
| `URL Field` | String/Text property rendered with `pxURL` and validated with `pxIsValidURL` |
| `Time Only` | String/TimeOfDay property rendered with `pxDateTime` for time-only input |
| `Phone Field` | String/Text property rendered with `pxPhone` and validated with `ValidPhoneNumber` |
| `Percentage Field` | String/Decimal property rendered with `pxPercentage` for percentage-style input |
| `Email Field` | String/Text property rendered with `pxEmail` and validated with `ValidEmailAddress` |
| `Date Only` | String/Date property rendered with `pxDateTime` for date-only input |
| `Date And Time` | String/DateTime property rendered with `pxDateTime` for timestamp input |
| `Currency Field` | String/Decimal property rendered with `pxCurrency` for currency-style input |

## References

| Skill | Description |
|-------|-------------|
| `library-rule-html-property` | Reference list of out-of-the-box controls that may be used in `pyStreamName`, including observed string type mappings and control descriptions |

## Authoring notes

### `pyPropertyMode` API values differ from Dev Studio display labels

The `pyPropertyMode` values used in the API are NOT the labels shown in Dev Studio.
Using display labels causes validation errors or creates the wrong property type.

| Dev Studio label | API `pyPropertyMode` value |
|-----------------|---------------------------|
| Single Value    | `String`                  |
| Page            | `Page`                    |
| Page List       | `PageList` (one word)     |
| Page Group      | `PageGroup` (one word)    |
| Value List      | `StringList` (one word)   |
| Value Group     | `StringGroup` (one word)  |

Use `"String"`, not `"Value"` or `"Text"`. Use `"PageList"`, not `"Page List"`.

### `pzEntryCode` confirms the correct property type was created

After creating a property, check `pzEntryCode` in the `get-rule` response to verify
the server accepted the correct type:

| `pzEntryCode` | Property type |
|---------------|--------------|
| `sTN256`      | String/Text with max length 256 |
| `sTN0`        | String/Text with unlimited length |
| `S*N{Class}`  | Single Page referencing {Class} |
| `L*N{Class}`  | PageList referencing {Class} |

If `pzEntryCode` is missing or shows `sTN` (no number), `pyMaxLength` was missing.

### `pyStreamName` is a property-level setting

To change a field from single-line to multi-line text, update `pyStreamName` on the
`Rule-Obj-Property`, not on the view. Changing the view control does not affect the
underlying input behavior — only the property-level `pyStreamName` does.

### Dropdown requires three co-present fields

All three of the following must be set together for a functional dropdown:

1. `pyStreamName: "pxDropdown"` — renders the dropdown control
2. `pyTableOption: "PromptList"` — tells Pega to use inline values
3. `pyPromptTableList` — the array of allowed values

Any one missing causes silent failure: wrong control renders, no values appear,
or values are ignored.

### `Embed-PropertyPromtValues` has an intentional Pega typo

The embed class for prompt list entries is `Embed-PropertyPromtValues` — missing
the 'p' in "Prompt". This typo is preserved exactly in the schema and examples.
Using the correct spelling `Embed-PropertyPromptValues` creates an empty prompt list
without an error message. The correct field names for each entry are:
- `pyLocalizedValue` — the display label (not `pyTableDescription`)
- `pyStandardValue` — the stored value (not `pyTableValue`)

Using `pyTableValue` or `pyTableDescription` is silently ignored by Pega.

### Identity field is `pyPropertyName`, not `pyRuleName`

When creating a property with `create-rule`, use `pyPropertyName` as the
identity field. Using `pyRuleName` fails validation:
```
required property 'pyPropertyName' not found
```
`pyRuleName` is the generic identity field for most rule types, but the
property builder requires `pyPropertyName` specifically.

### Reserved and inherited property names

Pega resolves property names case-insensitively against the full inheritance
chain. A property named `Message` on a data class collides with the inherited
`@baseclass.message`:
```
A case mismatch has been found for this property: 'Message' doesn't match 'message'.
```
Avoid names that match any `@baseclass` or `Embed-` property when compared
case-insensitively. Common collisions: `Message`, `Name`, `Status`, `Type`,
`Label`, `Description`, `Key`, `Value`, `ID`. When in doubt, prefix with the
business domain (e.g., `ForecastMessage` instead of `Message`).

### Property type is immutable after creation

Once a property is created, its `pyPropertyMode` and `pyStringType` cannot be
changed — even in a branch ruleset. Attempting to change the type produces:
```
You cannot change the type of <PropertyName> field.
```
If the design changes require a different type, create a new property with the
correct type and a different name, then update all references. The original
property becomes a branch artifact that should be cleaned up.
