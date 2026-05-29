---
name: business-action-view-field-extraction
description: Load when extracting interactive fields from a view rule for Business Action creation. Covers pxViewMetadata and pyContent parsing, interactive field detection, sub-view recursion, label resolution, and dropdown option resolution.
---

# View Field Extraction

Extracts interactive fields from a view rule's `get-rule detail="full"` response.
Produces a field list used by Steps 3–5 of the Business Action procedure.

For full `pxViewMetadata` structure and annotation reference, load `rules-rule-ui-view`
(see `View Metadata Structures` reference).

---

## Declare Expression target filtering

Before classifying any field as interactive, check whether the field's property is
computed by a Declare Expression. These properties are auto-calculated and MUST NOT
be treated as interactive — even when the view does not mark them as `readOnly`.

**Procedure:**

1. Run `list-rules(ruleType="Rule-Declare-Expressions", className="<ClassName>")`.
2. Collect every `pyTargetProperty` from the returned rules
3. When building the interactive field list, skip any field whose property reference
   matches a collected target property.

> **Why:** Views do not always flag declare-expression-computed properties as
> `readOnly`. If you skip this check, those fields appear interactive, get added
> to `pyForm` / `pyInputParameters` / `pyPlaywrightScript`, and automation fails
> because the UI renders them as read-only calculated values.

---

## Field source selection

The view rule has two representations of its fields. Use whichever is available:

| Source | When to use | Field location |
|--------|-------------|----------------|
| `pxViewMetadata` | **Always present** — primary source for Constellation views | `children[].children[]` (Region children — typically one Region for assignment forms) |
| `pyContent` | Present on many views as structured array — use as supplementary or when metadata is ambiguous | Array of field objects |

---

## Extracting from `pxViewMetadata`

Parse `pxViewMetadata` (JSON string) and walk `children[].children[]` — each top-level
child is a Region, and its children are the fields. Assignment forms typically have one
Region (`children[0]`); if multiple Regions exist, collect fields from all of them.
Key properties per field child:

- `type` — component type (`TextInput`, `Dropdown`, `Checkbox`, `DateTime`, `UserReference`, `Decimal`, `URL`, `RichText`, `AutoComplete`, `ObjectReference`, `reference`, etc.)
- `config.value` — property binding (e.g., `@P .PropertyName` or `@USER .Prop` or `@ATTACHMENT .Prop`). Strip the annotation prefix and dot to get the field reference.
- `config.label` — display label. Annotations: `@L Text` = literal, `@FL .Prop` = resolve from property rule.
- `config.testId` — optional configured DOM test-id base. If present, use this for Playwright locators instead of the resolved label.
- `config.readOnly` — `true` means skip this field entirely.
- `config.caption` — used by Checkbox instead of `config.label`.
- `config.datasource` — for Dropdown/RadioButtons: `@ASSOCIATED .Prop` means field has options to resolve from the property's `pyPromptTableList`.

---

## Extracting from `pyContent`

When present, each entry in `pyContent` provides:

- `pyFieldReference` — field reference (PascalCase property name — NOT a label)
- `pyComponentName` — component type
- `pyLabel` / `pyLabelOption` — label or label source
- `pyTestID` — optional configured DOM test-id base. If present, use this for Playwright locators instead of the resolved label.
- `pyIsAssociated` — `"true"` = has dropdown/radio options

---

## Reference-like field metadata

During extraction, identify reference-like components but do not build `pyForm`.
Capture raw metadata so `business-action-reference-field-mapping` can determine
the mapping, input parameterization, and Playwright behavior.

| Component | Capture | Notes |
|-----------|---------|-------|
| `ObjectReference` | field reference, label, mode, value/selection key, display type, data source | Skip display-only `SemanticLink` values like any read-only field. |
| `UserReference` | field reference, label, value, display type, data source | Treat as an interactive reference picker when not read-only. |
| `reference` | context field, rule class, rule name, template, label | Fetch recursively when it points to an underlying view or layout section. |
| `EmbeddedDataMulti` | page-list field, class, display/edit modes, columns or primary-fields view | Capture column metadata; fetch referenced primary-fields views when needed. |

For every reference-like field, preserve the exact metadata found in the view:
do not infer keys, labels, display style, or nested fields.

---

## Sub-view detection

- **In `pyContent`:** entries with `pyComponentName` of `"Region"` or `"reference"` — fetch recursively.
- **In `pxViewMetadata`:** `type: "reference"` — these are embedded sub-views
  (data page displays or layout sections), NOT interactive selection fields.
  If the sub-view's template is `DataReference` (`pyTemplateName: "DataReference"`
  or `config.template: "DataReference"` in the sub-view), recurse into it — it
  contains an AutoComplete or similar field for selecting data records.
  Otherwise it is a layout sub-view — recurse and merge its fields into the same form.
- **Embedded data single vs layout sub-view:** Both appear as `reference` components.
  Distinguish by checking `pyClassContext` / `config.ruleClass` — if it points to a
  data class (not the parent case class), it is an embedded data single page.

---

## Label resolution

| Scenario | Resolution |
|----------|-----------|
| `@L Some Text` (pxViewMetadata) | Literal: `"Some Text"` |
| `@FL .PropertyName` (pxViewMetadata) | Fetch property rule → use `label` from result |
| `pyLabelOption: "text"` (pyContent) | Use `pyLabel` directly |
| `pyLabelOption: "field"` or `"default"` (pyContent) | Fetch property rule → use `label` |
| Checkbox | Use `config.caption` / `pyCaptionText` |
| No label found | Fall back to property rule's `label` |

**NEVER use the field reference as a label.** It is a PascalCase property name
(e.g., `TotalAssetBalance`), not the display text (e.g., `Total asset balance`).

For additional label rules (exact preservation, character-for-character matching),
see `business-action-parameters` §Label resolution.

## DOM test-id resolution

Playwright locators use the field's DOM `data-testid` base, which is not always the
visible label.

| Source | Test-id base rule |
|--------|-------------------|
| `pxViewMetadata.children[].config.testId` exists | Use `config.testId` exactly |
| `pyContent[].pyTestID` exists | Use `pyTestID` exactly |
| No configured test ID | Use the resolved label exactly |

Do not replace configured test IDs with labels. Users can configure a custom test ID
on a view field, and Constellation uses that value when forming DOM test IDs. Example:
`EventName` may have label `@FL .EventName` but `config.testId: "NameOfTheEvent"`
and `pyTestID: "NameOfTheEvent"`; generate
`page.getByTestId('NameOfTheEvent:input:control')`, not a label-based locator.

---

## Dropdown / RadioButtons option resolution

For any field with options (Dropdown, RadioButtons — identified by `@ASSOCIATED`
datasource in metadata or `pyIsAssociated: "true"` in pyContent):

`get-rule key="<propertyInsKey>" detail="full"` → read `pyPromptTableList` exact
`pyStandardValue` strings. **Never guess option values.**

---

## Field extraction checkpoint

After completing all extraction (fields, labels, options, declare expression filtering,
reference metadata), produce a **consolidated field summary table** before proceeding
to parameter generation.
Include one row per interactive field:

| Column | Source |
|--------|--------|
| Field reference | Property name from view |
| Component type | `TextInput`, `Dropdown`, `Checkbox`, etc. |
| Label | Resolved label (exact text) |
| Test-id base | `config.testId` / `pyTestID` if configured; otherwise resolved label |
| Options | `pyStandardValue` list (Dropdown/RadioButtons only) |
| Default value | First option or meaningful test value |
| Format | `pyTextMask` / `pyFormatType` constraints if any |
| Reference metadata | Raw reference-like component metadata; mapping is handled by `business-action-reference-field-mapping` |

**If any column is unknown or was not resolved, re-fetch the source rule now** —
do not leave blanks to fill in later and do not guess as actual data is must for generated automation to work
