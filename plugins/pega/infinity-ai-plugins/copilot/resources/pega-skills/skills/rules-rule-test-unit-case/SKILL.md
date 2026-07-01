---
name: rules-rule-test-unit-case
description: Schema and authoring guide for PegaUnit test cases (Rule-Test-Unit-Case), including assertion types, assertion nesting, setup/cleanup, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first

**Purpose:** The purpose of this rule is to test other rules.

## Best practices
Attempt to, as much as possible, to cover as much of the code as possible with a single test.
If multiple tests are needed, as often is the case, include some indication in the rule name
how this is different from other tests. Examples: TC_RuleName_HappyPath or
TC_RuleName_MissingParameter

## Composability

Test cases are composed from three independent building blocks. Mix and match freely:

1. **Assertion patterns** (Assertion-level examples) — how to check a specific condition
   (Property, Decision, List, etc.). These work the same regardless of rule-under-test type.
2. **Rule-under-test blocks** (Rule-under-test examples) — how to target a specific
   rule type (Activity, Data Transform, Decision Table, etc.). These are independent of
   assertion choice.
3. **Setup pages** (Setup pages examples) — how to pre-load clipboard state before
   the test runs. These are RUT-type-agnostic.
4. **Test infrastructure** — setup/cleanup activities, pages-and-classes, and RUT
   parameters. These are RUT-type-agnostic.

To build a test case: pick the assertion(s) from Assertion-level, the RUT block from
Rule-under-test, and optionally add setup/cleanup. The Rule-level examples show
complete compositions for the most common patterns.

### RUT type to available assertion types

| `pyRuleUnderTestType` | Available assertion types |
|---|---|
| `Rule-Obj-Activity` | Property, Page, List, ResultCount, ExpectedRuntime, **ActivityStatus** |
| `Rule-Obj-Model` | Property, Page, List, ResultCount, ExpectedRuntime |
| `Rule-Obj-When` | **Decision** |
| `Rule-Declare-DecisionTable` | Property, Page, List, ResultCount, ExpectedRuntime, **Decision** |
| `Rule-Declare-DecisionTree` | Property, Page, List, ResultCount, ExpectedRuntime, **Decision** |
| `Rule-Declare-Expressions` | Property, Page, List, ResultCount, ExpectedRuntime, **Decision** |
| `Rule-Declare-Pages` | Property, Page, List, ResultCount, ExpectedRuntime |
| `Rule-Obj-Report-Definition` | Property, Page, List, ResultCount, ExpectedRuntime |

**Bold** = not available for all RUT types. Property, Page, List, ResultCount, and
ExpectedRuntime are available for all RUT types. Decision is available for DecisionTable,
DecisionTree, Expressions, and When rules. ActivityStatus is exclusive to activities.

## Examples

### Rule-level

| Skill | Description |
|------|-------------|
| `Stub Test Case` | Minimal test case template -- smallest valid create payload with an empty assertion |
| `Activity Status Test` | ActivityStatus assertion -- verifies the rule under test completed with a GOOD status. The most common single-assertion pattern for activities. |
| `Decision Assertion Test` | Decision table test with triple-nested Decision assertion. Same structure applies to decision trees and declare expressions -- swap the pyRuleUnderTest block. |
| `Decision Table Test with Parameter Inputs` | Decision table test where the columns reference parameters (`param.X`). Input rows must put the `param.<Name>` token in `pyDisplayLabel` as well as `pyPropertyName`/`pyPropertyAbsolutePath` -- friendly labels break the Manage Properties refresh action in Dev Studio. |
| `When Rule Decision Test` | When rule test with Decision assertion, pyAllowMultipleInputCombinations, and true/false result rows. No setup pages needed. |
| `Report Definition Test (Complex Test with Setup/Cleanup)` | Report definition with List assertion, setup/cleanup activities, setup pages, RUT parameters, and pages-and-classes. Setup/cleanup patterns are RUT-type-agnostic. |
| `Data Page Test (Single Object)` | Single-object data page with parameter, bare InsName format, `pyIsSinglePageImplementation` |
| `Data Page Test (List)` | List data page with ResultCount and List assertions on `.pxResults` |

### Assertion-level

| Skill | `pyAssertionType` | Description |
|------|--------------------|-------------|
| `ActivityStatus Assertion` | `ActivityStatus` | Single-level check that an activity completed with a specific status code |
| `Decision Assertion` | `Decision` | Triple-nested structure for testing decision tables with input/output rows |
| `ExpectedRuntime Assertion` | `ExpectedRuntime` | Verifies the rule under test completes within a time threshold |
| `List Assertion` | `List` | Checks property values on items within a page list (e.g., report results) |
| `Page Assertion` | `Page` | Checks property values on a rule instance page loaded via setup pages |
| `Parameter Assertion` | `Property` (Param) | Property assertion targeting activity/data transform parameters using `Param.*` prefix |
| `Property Assertion` | `Property` | Two-level structure for asserting clipboard page property values |
| `Property Assertion on a Custom Page` | `Property` | Property assertion targeting a named page (not RunRecordPrimaryPage) with `pyPagesAndClasses` declaration |
| `Property Assertion (TrueFalse)` | `Property` (TrueFalse) | Property assertion with `TrueFalse` mode and `Is True` comparator |
| `Property Assertion (Error Validation)` | `Property` (error) | Property assertion using `has error with message` comparator for validation errors |
| `Property Assertion (DateTime)` | `Property` (DateTime) | Property assertion with `DateTime` mode -- Pega DateTime format in inner quotes, plus `Not exists` existence check |
| `Property Assertion (Integer)` | `Property` (Integer) | Property assertion with `Integer` mode -- numeric values without inner quotes, plus `Not exists` on indexed page |
| `ResultCount Assertion` | `ResultCount` | Single-level check on the count of items in a page list |

### Setup pages

| Skill | Selection type | Description |
|------|---------------|-------------|
| `Flat Properties on RunRecordPrimaryPage (CLIPBOARDPAGES)` | `CLIPBOARDPAGES` | RunRecordPrimaryPage with pxObjClass and flat properties -- the most common pattern |
| `Custom Page Class-Only Stub (CUSTOMPAGES)` | `CUSTOMPAGES` | Custom-named page with only pxObjClass -- typed but empty page |
| `Work Object on pyWorkPage (CLIPBOARDPAGES)` | `CLIPBOARDPAGES` | pyWorkPage pre-loaded with work case properties |
| `Multi-Page Setup (CUSTOMPAGES)` | `CUSTOMPAGES` | Two setup pages -- input data page + error container |
| `Nested PageList Data (CLIPBOARDPAGES)` | `CLIPBOARDPAGES` | Page with embedded PageList -- parent data with child records |

### Rule-under-test

| Skill | `pyRuleUnderTestType` | InsName format |
|------|-----------------------|----------------|
| `pyRuleUnderTest for Activity` | `Rule-Obj-Activity` | `CLASS!RULENAME` |
| `pyRuleUnderTest for When Rule` | `Rule-Obj-When` | `CLASS!RULENAME` |
| `pyRuleUnderTest for Data Transform` | `Rule-Obj-Model` | `CLASS!RULENAME` |
| `pyRuleUnderTest for Decision Table` | `Rule-Declare-DecisionTable` | `CLASS!RULENAME` |
| `pyRuleUnderTest for Decision Tree` | `Rule-Declare-DecisionTree` | `CLASS!RULENAME` |
| `pyRuleUnderTest for Declare Expression` | `Rule-Declare-Expressions` | `CLASS!.PROPERTYNAME!` |
| `pyRuleUnderTest for Data Page` | `Rule-Declare-Pages` | `D_RULENAME` (bare, no class prefix) |
| `pyRuleUnderTest for Report Definition` | `Rule-Obj-Report-Definition` | `CLASS!RULENAME` |

## Authoring notes

### Test data cleanup

| Field | Default | Notes |
|-------|---------|-------|
| `pyCleanUpTestData` | — | **Must be set explicitly to `"true"` for Pega 8.4+** (Constellation/Cosmos apps). Not auto-filled. When `"true"`, test data created during the test run is automatically cleaned up after the test completes. Leave blank or `"false"` for pre-8.4 traditional apps. |

**Important:** Always set `pyCleanUpTestData: "true"` explicitly when creating
test cases for Constellation apps (Pega 8.4+). This field is not auto-filled
by the builder. Omitting it may result in test data persisting after test
execution. For pre-8.4 traditional apps, omit this field or set it to `"false"`.

### `pyPurpose` is the class key

`pyPurpose` (with `pyClassName`) is the identity key (from `pyKeyDefList`)
and the value the agent must supply. `pyRefToFocusKey` and `pyClassContext`
are auto-derived from `pyPurpose` and `pyClassName` respectively and can be
omitted.

- **`pyExpectedValue` quoting depends on assertion type and `pyPropertyMode`.** For
  **Property** assertions: Text, Date, and DateTime values must be wrapped in escaped
  inner quotes (`"\"my text\""`, `"\"20200520T091028.850 GMT\""` for DateTime). DateTime
  uses Pega's internal format `yyyyMMddTHHmmss.SSS GMT`, NOT ISO 8601. Numeric and
  TrueFalse values must NOT use inner quotes. For **Decision** assertions: all
  `pyExpectedValue` values are bare strings without inner quotes (e.g., `"High"`, `"true"`,
  `"100"`, `"Incomplete"`). See the schema description on `pyExpectedValue` for the full rule.
- **`pyExpectedResults` is reused at two levels — do not confuse them.** The top-level
  `pyExpectedResults` array holds assertion groups (ActivityStatus, Property, Decision,
  etc.). Inside a Property assertion group, the same field name `pyExpectedResults` holds
  the nested array of individual property checks. The field is always `pyExpectedResults`
  at both levels — there is no `pyExpectedResultsList` or other variant. See
  `Property Assertion` or `Property Assertion on a Custom Page` for the two-level Property pattern.
- **`pyPropertyMode` casing differs by assertion type.** Property assertions use Title Case
  (`Text`, `TrueFalse`, `Identifier`). Decision assertions use lowercase (`decimal`, `text`).
- **`pyComparator` casing is irregular.** Use exact values from the schema enum (e.g.,
  `IS Not Equals TO` has mixed caps). The schema includes `x-pega-hints` to correct
  common casing mistakes.
- **`Exists` comparator does not work inside List assertions.** When checking that a
  property is present and non-empty on list items (e.g., `.pxResults`), use
  `"pyComparator": "IS Not Equals TO"` with `"pyExpectedValue": "\"\""` instead of
  `"pyComparator": "Exists"`. The `Exists` comparator silently fails in the List
  assertion context — the test reports empty Actual and Expected values with no error.
  `Exists` works in Property assertions but not when nested inside a List assertion's
  `pyExpectedResults`.
- **Setup/cleanup activities** (`pySetup`/`pyCleanup`) run before/after the test.
   Parameters go in `pySetupParams` as comma-separated `key=value` pairs and in
   `pyParametersDetails` as structured entries. Use `"None"` for no parameters.
   See `Report Definition Test (Complex Test with Setup/Cleanup)` for a complete example.
- **RUT parameters** (`pyRuleUnderTest.pyParameters`) pass input to the rule under test.
  String values need escaped inner quotes in `pyParametersParamValue`.
- **Pages and classes** (`pyPagesAndClasses`) declare named clipboard pages and their
  classes. Required when the test uses custom page names (e.g., for Property, List, or Page
  assertions on non-default pages).
- **Decision tables with parameter columns.** When the decision table under
  test declares its columns as parameters (e.g. `param.Locale`) rather than
  case properties, the assertion engine and the Manage Properties refresh
  action in Dev Studio both match input rows by **column identifier**. The
  `param.<Name>` token must therefore appear verbatim in `pyDisplayLabel`,
  `pyPropertyName`, and `pyPropertyAbsolutePath`. Friendly labels
  (`pyDisplayLabel: "Locale"`) save successfully but cause the Manage
  Properties refresh to drop or duplicate the input rows because Pega cannot
  reconcile the labels back to the parameter columns. Use the lowercase
  `param.` prefix -- that is the form Dev Studio persists when authoring by
  hand and the form that round-trips cleanly. Mixed-case variants
  (`param.Locale`) have not been verified to round-trip. Each branch row must
  also carry a concrete `pyExpectedValue` on the input rows; omitting it
  sends an empty string and silently masks coverage of every non-default
  branch (only the default-fallback row should leave inputs empty). See
  `Decision Table Test with Parameter Inputs`. Property-backed decision tables
  (`Decision Assertion Test`) keep using friendly display labels -- the two
  patterns differ only in the input rows.
- **Decision assertion `pyPropertyMode` enum is narrow.** The schema only
  accepts `text`, `decimal`, `date` (lowercase) -- there is no `truefalse`,
  `integer`, or `datetime` mode for Decision assertions, even when the
  decision table column itself is one of those types. For boolean parameter
  columns (`truefalse`), use `pyPropertyMode: "text"` with `pyExpectedValue`
  of `"true"` / `"false"`. Numeric `pyExpectedValue` strings carry no inner
  quotes (same convention as the `Result` row). Mismatched modes can
  silently degrade to string comparison.
- **Multi-row Decision assertions.** A single Decision assertion can hold
  many test rows -- one per `pyExpectedResults` entry inside the
  `Decision Result` group. Give each row a unique `pyPageName` (e.g.
  `row_premium_zero`, `row_default`) and repeat the input/result triple
  inside each. The `Result` row keeps the literal label `"Result"` -- that
  is the fixed identifier the Decision assertion uses for the decision
  table's return value, regardless of whether the inputs are properties or
  parameters. `pyPagesAndClasses` is not required for parameter inputs (no
  clipboard page is referenced).
- **Property assertion page targeting.** `pyStepPageName` and `pyPageName` in a Property
  assertion must match the clipboard page where the rule-under-test writes the property —
  they are NOT always `RunRecordPrimaryPage`. Before writing assertions, read the rule
  under test (via `get-rule`) and trace which page each property is set on. For example,
  if an activity uses `Page-New` to create a page called `test` and then `Property-Set`
  sets `.pyLabel` on that page, the Property assertion must use
  `"pyStepPageName": "test"` and `"pyPageName": "test"`, and the page must be declared
  in `pyPagesAndClasses`. Use `RunRecordPrimaryPage` only when the rule operates on its
  primary page. See `Property Assertion on a Custom Page` for the complete pattern.

## Test failure triage

When a test fails after modifying a rule, determine the cause before fixing:

| Cause | Symptom | Fix |
|-------|---------|-----|
| **(a) Expected change** | Test's expected result is now intentionally different because of the rule modification | Update the test case's `pyExpectedValue` via `update-rule` |
| **(b) Unintended regression** | The rule change broke something it shouldn't have | Fix the rule, not the test |
| **(c) Row shadowing** (decision tables) | A higher-priority row matches inputs meant for a lower row | Reorder rows or narrow the higher row's conditions — see `rules-rule-declare-decision-table` |

Re-run tests after every fix. Do not batch multiple fixes before re-running — the
feedback loop's value comes from immediate verification.
