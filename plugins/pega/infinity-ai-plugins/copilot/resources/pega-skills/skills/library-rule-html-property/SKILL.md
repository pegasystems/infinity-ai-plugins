---
name: library-rule-html-property
description: Reference list of out-of-the-box Pega controls (Rule-HTML-Property) commonly used in pyStreamName on property rules
---

This reference lists out-of-the-box controls commonly used in `pyStreamName` on property rules.
Clients can create custom controls and override these values, so this list is a reference, not a validation allowlist.

The `String type` column reflects the dominant observed type where clear from the XML and prior schema notes; mixed or unclear mappings are called out explicitly.

| String type | Control name | Description |
|-------------|-------------|-------------|
| `Date` | `Date-Calendar` | TBD |
| `Date`, `DateTime` | `DateTime-Calendar` | TBD |
| `Date`, `DateTime` | `pxDateTime` | Date/time picker for `Date` and `DateTime` properties. |
| `DateTime` | `DateTime-Long` | TBD |
| `DateTime` | `DateTime-Medium` | TBD |
| `DateTime` | `DateTime-Short` | TBD |
| `Decimal` | `formatSummaryDecimal` | Decimal Formatter |
| `Decimal` | `pxNumber` | Decimal number input. |
| `Integer` | `pxInteger` | Integer input for whole number fields. |
| `Text` | `AssignmentStatus` | Pick Assignment Status |
| `Text` | `Default` | Default HTML formatting for a scalar property, used in stream processing when no specialized formatting is named in the corresponding Rule-Obj-Property instance. |
| `Text` | `FixedSizeForInput` | This control is deprecated. It uses legacy HTML directives. |
| `Text` | `GetLocalizedValue` | Return the localized value for display |
| `Text` | `PromptSelect` | PromptSelect |
| `Text` | `pxDropdown` | Dropdown selector for fields with a fixed set of values such as prompt lists. |
| `Text` | `pxTextArea` | Multi-line text area for long-form text such as descriptions, notes, and comments. |
| `Text` | `pxTextInput` | Single-line text input for short text fields such as names, titles, and codes. |
| `Text`, `Password` | `pxObfuscated` | TBD |
| `TrueFalse` | `BPCheckBoxDisplay` | small checkbox |
| `TrueFalse` | `CheckBox` | checkbox |
| `TrueFalse` | `CheckBoxSelect` | small checkbox |
| `TrueFalse` | `CheckBoxSelectBP` | TBD |
| `TrueFalse` | `CheckBoxSelectWritable` | small checkbox, always writable |
| `TrueFalse` | `CheckBoxSmall` | small checkbox |
| `TrueFalse` | `pxCheckBox` | Checkbox for boolean properties. |
| `TrueFalse` | `pxRadioButtons` | TBD |
