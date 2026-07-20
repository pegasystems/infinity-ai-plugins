---
name: business-action-parameters
description: Load when generating input/output parameters for a Business Action. Covers field inclusion rules, format constraints, option resolution, and output parameter naming.
---

# Business Action Parameters

Rules for generating `pyForm`, `pyInputParameters`, and `pyOutputParameters`.
Load a matching example via `get-skill` first to see the structural pattern —
this reference covers only the rules and constraints that examples cannot teach.

---

## Field inclusion rules

| Field type | In pyInputParameters? | In pyForm? | Notes |
|-----------|----------------------|-----------|-------|
| TextInput, TextArea, Currency, Decimal | Yes | Yes | Standard interactive fields |
| Dropdown, RadioButtons | Yes | Yes | Must resolve options first (see below) |
| Checkbox | Yes (value: `"True"`/`"False"`) | Yes | Handled in pyPlaywrightScript only |
| ReadOnly / calculatedField | **No** | **No** | Skip entirely |
| Declare Expression target | **No** | **No** | Skip — property is auto-calculated (see `business-action-view-field-extraction` § Declare Expression target filtering) |
| `pyApprovalResult` (approval shapes) | **No** | Yes — as **Constant** only | See examples: `PerformApproval Business Action` |

---

## Resolve options (Dropdown / RadioButtons)

For fields with `pyIsAssociated: "true"`:

1. `get-rule key="<propertyInsKey>" detail="full"`
2. Read `pyPromptTableList` entries
3. Use ONLY exact `pyStandardValue` strings as defaults

**CRITICAL:** Never guess option values. Wrong casing or abbreviations cause
"value not found in dropdown" at runtime.

---

## Default test data

Every generated default must be non-empty; root `CaseID` is the only blank input.
Choose defaults in this order:

1. Scenario/handover values. For validation-negative scenarios, use values that trigger validation.
2. ObjectReference fields: run the configured `referenceList` data page and use its returned display label plus backend key/ID. Inspect data view metadata first only when parameters or returned fields are unclear. Resolved cases only help choose a representative row.
3. Resolved case data: query the case object's `defaultListDataView`; fall back to `list-cases` only when absent. Use normal paging and inspect up to five `Resolved-*` cases via `get-case-details` until field coverage is enough.
4. Exact `pyPromptTableList` value for Dropdown/RadioButtons.
5. Realistic sample data matching field type and format constraints.

---

## Format constraints

Check the property rule for `pyFormatType`, `pyTextMask`, `pyMaxLength`:

| Field type | Wrong value | Correct value |
|-----------|-------------|---------------|
| SSN | `111-22-3333` | `111223333` (raw digits) |
| Phone | `(555) 123-4567` | `5551234567` (raw digits) |
| Zip code | `12345-6789` | `123456789` (raw digits) |

**Rule:** Unless `pyTextMask` includes separators in the stored value, use raw digits.

**Date/DateTime format:** Always `YYYY-MM-DD` with dashes. Never slashes.

---

## Label resolution

Labels come from the view rule, NEVER from `pyFieldReference`, which is a PascalCase property identifier, not a display label.

**Exact label preservation:** Copy CHARACTER-FOR-CHARACTER.
- Preserve casing: `"Total asset balance"` NOT `"Total Asset Balance"`
- Preserve punctuation: `"What's your address?"` NOT `"Whats your address"`
- Preserve full text: `"When did you begin living at this address?"` NOT `"Living duration"`

---

## pyOutputParameters — naming rules

**Step-level and root-level must use the SAME descriptive name.**

NEVER use generic `CaseID` — always use `{CaseTypeName}CaseID` (e.g., `HomeLoanCaseID`).

| Scenario | Step-level | Root-level |
|----------|-----------|-----------|
| CreateCase BA | `{CaseTypeName}CaseID` with `pyParameterValue: "data$caseInfo$ID"` | Same name with `pyMapOutputFrom: "Response"` |
| Child case BA (CaptureChildCase + PerformAssignment steps) | `ChildCaseIDAutoMapped` (`pyParameterValue: ""`) | `ChildCaseIDAutoMapped` with `pyMapOutputFrom: "Response"` |
| Intermediate screenflow BA | None | None |
| Standalone PerformAssignment | None | None |

**Common mistakes:**
- Generic `CaseID` instead of descriptive name
- Mismatched names between step and root
- `pyParameterValue` at root level (should be `pyMapOutputFrom`)
- Missing `pyMapOutputFrom` at root level
- Two entries at either level (always exactly ONE)
