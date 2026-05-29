---
name: rules-rule-obj-activity
description: Schema and authoring guide for Pega activity rules (Rule-Obj-Activity), including step methods, parameters, pages, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Authoring Notes

### `pyActivityName` is the class key

`pyActivityName` (with `pyClassName`) is the identity key (from
`pyKeyDefList`) and the value the agent must supply. There is no separate
`pyRuleName` field in the activity schema — `pyActivityName` serves as both
the key and the rule name.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Activity` | Minimal activity with a single placeholder step — smallest valid create payload. **Must include at least one step** (omitting `pySteps` causes auto-fill of an invalid empty step). |
| `Set Approval Status` | Log-Message + Property-Set + Obj-Save |
| `Get Recent Reports` | Page-New + Obj-Browse + Show-Page with pyPagesAndClasses |
| `Calculate Compound Interest` | Single Java step with pyParameters (IN/OUT) and ParameterPage I/O |
| `Data Page Orchestration Activity` | Sequential clipboard page operations with error checking, ERR block, Page-New/Page-Remove pairing, and fallback |
| `Chained Data Page Integration` | Multi-API chaining with parameterized data pages (`D_Name[Param: value]`), early exit, and `pyOnException` fallback |
| `Enqueue and Dispatch` | Job Scheduler dispatch activity — Obj-Browse + EMBEDDED loop + Obj-Save + Queue-For-Processing |

### Step-level skills

Step examples are organized by category. Each skill contains frontmatter + one JSON example.

#### Obj-* and Link methods
`Obj-Browse`, `Obj-Delete`, `Obj-Delete-By-Handle`, `Obj-Filter`, `Obj-Open`, `Obj-Open-By-Handle`, `Obj-Refresh-And-Lock`, `Obj-Save`, `Obj-Save-Cancel`, `Obj-Sort`, `Obj-Validate`, `Link-Objects`

#### Page-* methods
`Page-Change-Class`, `Page-Clear-Messages`, `Page-Copy`, `Page-Copy from Data Page`, `Page-Merge-Into`, `Page-New`, `Page-Remove`, `Page-Rename`, `Page-Set-Messages`, `Page-Unlock`, `Page-Validate`

#### Property-* methods
`Property-Map-DecisionTable`, `Property-Map-DecisionTree`, `Property-Map-Value`, `Property-Remove`, `Property-Set`, `Property-Set from Data Page Step Page`, `Property-Set-Messages`, `Property-Set-Special`, `Property-Set-XML`, `Property-Validate`

#### Activity flow, Call, Branch, Exit
`Activity-Clear-Status`, `Activity-End`, `Activity-Set-Status`, `Branch (Activity name)`, `Call (Activity name)`, `Call-Async-Activity`, `Call-Function`, `Exit-Activity`, `Exit-Activity with precondition`, `Start-Validate / End-Validate`

#### Connect-* methods
`Connect-REST`, `Connect-SOAP`, `Connect-Wait`

#### Data transforms, parsing, RDB, mapping
`Apply-DataTransform`, `Apply-Parse-XML`, `Load-DataPage`, `Map-Structured`, `RDB-List`, `RDB-Open`, `RDB-Save`, `Save-DataPage Step`

#### Queue-For-* methods
`Queue-For-Agent`, `Queue-For-Processing Immediate`, `Queue-For-Processing Delayed`, `Queue-For-Processing Run as Operator`

#### Show-* methods
`Show-Harness`, `Show-HTML`, `Show-Page`, `Show-Property`

#### Transaction control
`Commit`, `Rollback`

#### History methods
`History-Add`, `History-List`

#### Java, logging, wait, privilege, string buffer
`Java`, `Log-Message`, `Privilege-Check`, `StringBuffer-Append`, `Wait`

## References

| Skill | When to load |
|-------|--------------|
| `Activity Preconditions` | Pre-step "When" condition rows (`pyStepsPreCondition` + `pyStepsPreCondParams`) — canonical 7-value action-code enum, multi-row chaining (AND-gate, switch-case, loop-guard), feature-toggle gating, `pyOnException` block targeting, verification checklist |
| `Activity Transitions` | Post-step "Jump" condition rows (`pyStepsTransition` + `pyStepsTransParams`) — canonical action-code enum, block-name jump targeting, status fan-out / method-dispatcher / early-exit patterns, casing notes (`StepStatusFail` / `stepstatusgood`), block-naming conventions |
| `Method Catalog` | Complete catalog of all 108 activity step methods — organized by category with labels and parameter notes |
| `Step Looping` | Loop authoring reference — 5 loop types, `pyStepsRepeatDef` fields, `param.pyForEachCount`, `<CURRENT>`, common patterns |

## Notes

### `pySystemParameters` is auto-injected — do not author

Every activity carries a `pySystemParameters` array that Pega populates
automatically. The standard set (tagged `pyUsage: "FLOW"`) is:

| Name | Type | Purpose |
|---|---|---|
| `flowName` | String | subscript to the pxFlow page |
| `flowType` | String | `pyFlowType` of the running flow |
| `ReferencePageName` | String | work object page name |
| `ReferenceClass` | String | class of the work object |
| `ReferenceInsKey` | String | `pzInsKey` of the work object |
| `pyDraftMode` | TrueFalse | whether the flow is in draft mode |

Reference these names directly in expressions (`param.flowName`,
`param.ReferenceClass`, etc.) without declaring them in `pyParameters`.
Do NOT add or modify entries in `pySystemParameters` when authoring —
Pega owns this list.

### Verify `pyPagesAndClasses` after creation

After creating or updating an activity, verify that every page referenced in
`pySteps` is declared in `pyPagesAndClasses` and that the persisted count
matches the payload.

If verification shows `NotDefinedP&C` warnings or missing page declarations:

1. Stop — do not wire the activity into a flow or case.
2. Update the activity to add missing page declarations.
3. Verify again before continuing.

Partial persistence usually indicates a malformed `pyPagesAndClasses` entry,
a class-name resolution issue, or a payload shape mismatch.

**Special class values:** `pyPagesAndClassesClass` accepts two
pseudo-classes beyond concrete Pega classes:
- `$ANY` — wildcard; accept any class for this page. Use when the
  page's class is not known at design time or is intentionally
  polymorphic (e.g. a `RulePage` that holds different rule types
  depending on the calling flow).
- `$None` — explicitly marks the page as having no class constraint.

`Embed-*` classes (e.g. `Embed-PagesAndClasses`) are also valid for
embedded scratch pages. Page names may use compound paths
(`pxThread.pxSecuritySnapshot`) or `local.<varName>` for dynamic
runtime resolution.

### Activity type (`pyActivityType`)

The canonical prompt list for `pyActivityType` (Pega-RULES 08-01-01) has
13 values. Pick the value that matches the activity's role; default to
`ACTIVITY` for general step-list authoring.

| Value | When to use |
|-------|-------------|
| `ACTIVITY` | **Default.** Standard step-list activity. Use for general orchestration, data-page bodies, helpers, validation glue. |
| `ASSEMBLER` | Assembler activity (advanced; rarely authored). |
| `ASSIGN` | Activity that creates an assignment instance. |
| `ASYNCHRONOUS` | Queued / async execution wrapper. |
| `AUTOMATION` | Not currently supported for authoring. Do **not** use this type. |
| `LOADDECLARATIVEPAGE` | Body of a data page load (e.g. `@baseclass.pxCallConnector`, `Data-Portal.pxDefaultAdminContent`). |
| `NOTIFY` | Correspondence / notification activity (e.g. `NotifyAssignee`). |
| `ONCHANGE` | Declarative on-change handler. |
| `ROUTE` | Assignment router activity (e.g. `ToWorkbasket`, `ToDecisionTable`, `ToInitialAssignee`). Note: `ROUTE` (not `ROUTER`). |
| `RULECONNECT` | Activity that invokes a Connect-* rule (e.g. `pyApplyForLoan`). |
| `TRIGGER` | Declare-Trigger handler. |
| `UTILITY` | Flow utility activity callable from a flow (e.g. `Work-.UpdateStatus`, `ReassignToWorkBasket`). |
| `VALIDATE` | Obj-Validate validation activity (e.g. `Data-Party-Person.Validate`). |

`LOCATE` is a legacy value removed by `BUG-379512` and accepted only for
round-trip preservation; never author it.

`pyOldActivityType` mirrors a prior classification of the same rule and is
preserved by the server; agents should not set it explicitly.

### Activity step updates — positional merge risk

When updating an activity via the API, `pySteps` arrays are merged
**positionally** — the Nth element in the update payload overwrites the Nth
element in the existing rule. This means:

- **Inserting a step in the middle** silently shifts and overwrites all
  subsequent steps.
- **Sending fewer steps** than exist leaves trailing steps unchanged (no
  deletion).
- **Sending an empty array** does not clear steps.

**Recommended approach:** Read the full `pySteps` array with
`get-rule(detail="full")`, modify the array in memory (add, remove, or edit
steps), then send the complete array back. Always verify all steps after
update by reading back and checking each step's `pyStepsActivityName`,
`pyStepsObjectName`, and `pyStepsCallParams`.

If a sparse positional update is unavoidable, only modify existing steps in
place or append at the end — never insert in the middle.

### Conditional steps — precondition rows required

Setting `pyStepsPreCondition: "true"` alone does **not** make a step
conditional. The step also needs populated `pyStepsPreCondParams` rows with
the actual expression and branch behavior. Without the rows, readback looks
correct but the step executes unconditionally at runtime.

Always verify both fields after creation:
- `pyStepsPreCondition` is `"true"`
- `pyStepsPreCondParams` contains at least one row with a non-empty
  `pyStepsPreCondParamsWhen` expression

See `Exit-Activity with precondition` for the step JSON and
`Activity Preconditions` for the full field reference table.

### Avoid repeating the same precondition on consecutive steps

When a group of steps shares the same gate condition (e.g. a Page-New followed
by Obj-Browse and a conditional Property-Set), apply the precondition **only to
the first step** in the group. Subsequent steps in the group can rely on the
earlier gate — if the first step was skipped, operations on the page it would
have created will no-op or the page reference will be empty. Only add a
precondition to a later step if it checks a **different** condition (e.g.
`pxResultCount==0` after the browse).

**Anti-pattern — redundant preconditions:**
```
Step 4: Page-New LeadPage        precondition: Param.DoLeads=="true"
Step 5: Obj-Browse LeadPage      precondition: Param.DoLeads=="true"   ← redundant
Step 6: Property-Set (error)     precondition: Param.DoLeads=="true" && LeadPage.pxResultCount==0  ← partially redundant
```

**Correct pattern — gate once with jump past dependent steps:**
```
Step 4: Page-New LeadPage        precondition: Param.DoLeads=="true" | WhenFalse: jump to Step 7
Step 5: Obj-Browse LeadPage      (no precondition — only reached if step 4 ran)
Step 6: Property-Set (error)     precondition: LeadPage.pxResultCount==0
Step 7: (next independent step)
```

A skipped precondition does **not** skip subsequent steps — execution
always continues to the next step unless explicitly routed elsewhere.
Use action-code `"1"` (jump to later step) on WhenFalse to skip the
entire gated block.

### Prefer Exit-Activity over complex jumps

For simple conditional branches (missing input, error states, fallback),
use conditional `Exit-Activity` steps instead of jump/transition routing.
Exit-Activity is explicit, verifiable, and avoids the risk of unintended
fall-through.

**Fallback-overwrite warning:** If a fallback/error step appears after a
success path, add an explicit `Exit-Activity` before it. Without the exit,
the activity falls through into the fallback and overwrites successful
output with error state.

Recommended orchestration pattern (block names in capitals, e.g. `ERR`,
identify the fallback block referenced by `pyOnException`):

```
1.  Property-Set:    default/missing-input display state
2.  Exit-Activity:   precondition Param.RequiredInput1 == ""
3.  Exit-Activity:   precondition Param.RequiredInput2 == ""
4.  Page-New:        support pages (DataSource, etc.)
5.  Page-Copy:       upstream data page          (pyOnException: "ERR")
6.  Property-Set:    copy upstream results + compute derived params
7.  Property-Set:    failure state (precondition: upstream result missing)
8.  Exit-Activity:   same failure precondition
9.  Page-Copy:       downstream data page         (pyOnException: "ERR")
10. Property-Set:    output/display fields
11. Exit-Activity:   success (unconditional — prevents fall-through into ERR block)
12. Property-Set:    SERVICE_UNAVAILABLE fallback (pyStepsBlockName: "ERR" — only reached via pyOnException)
```

`pyOnException` holds a **block name** (matching some step's
`pyStepsBlockName`), not a step number. See
`Activity Preconditions` for details.

#### `pyOnException` requires `pyStepsTransition: "true"`

`pyOnException` is configured in the transition/jump popup of a step. For the
exception routing to take effect, the step **must** have
`pyStepsTransition: "true"` set. Without it, the `pyOnException` value is
ignored at runtime and the exception is not routed to the target block.

**Always set both fields together:**
```json
{
  "pyStepsTransition": "true",
  "pyOnException": "ERR"
}
```

### List macros in property references

Inside loop steps (`pyStepsRepeatDef.pyStepsRepeatDefHasRepeat` = `PROPERTYLIST` / `PROPERTYGROUP`), use
these macros in the target property path to control where values are written:

| Macro | Meaning |
|---|---|
| `<APPEND>` | Append a new row to the end of the pagelist |
| `<LAST>` | Reference the last row of the pagelist |
| `<INSERT>` | Insert a new row at the beginning of the pagelist |
| `<CURRENT>` | Reference the current iteration row (read/update) |

Example: `MyList(<APPEND>).Name` inside a Property-Set step adds a new
entry to `MyList` on each iteration.

Outside of loops, `<APPEND>` and `<LAST>` can still be used in
Property-Set steps to grow a pagelist without an explicit loop wrapper.

### Activity readback verification — conditional steps

After creating or updating an activity with conditions, load
`Activity Preconditions` and follow its verification checklist.

### Prefer `Save-DataPage` over internal activities

To persist a savable data page, use the `Save-DataPage` activity method
with `DataPage`, `pyGUID`, and `WriteNow: "true"`. This works for both
local database persistence and external write-back via save connectors.
Do not call internal `pzSaveDataPage` or other `pz*` activities directly —
they are private/internal and may change between platform versions. See
`Save-DataPage Step`.

For **creating new records** when the lookup key may not match an existing
record, use the create-safe pattern: Page-Copy → Page-Clear-Messages →
Property-Set → Call Save (not Obj-Save). This handles both create and
update — if the lookup found a record, Property-Set overwrites it; if not,
Page-Clear-Messages ensures a clean page for the new record.

### Post-refactor cleanup checklist

After modifying an activity via deep-merge updates (especially when
changing step types or removing steps), verify:

- [ ] No unused entries in `pyPagesAndClasses` (pages no longer referenced)
- [ ] No stale `pxNamedPageReferences` entries
- [ ] `pyDescription` reflects current behavior (not a prior iteration)
- [ ] No placeholder `pyMemo` or warning justification text
- [ ] No stale `pyParamArray` rows left from positional merge edits
- [ ] No leftover step fields from prior action types (see DT skill:
      "Step action change via positional merge — leftover fields")

### Best practices

#### Activity names should be short — 3 to 5 words max

Keep `pyActivityName` concise: **3–4 words is ideal, 5 words maximum.**
Use PascalCase with no spaces (e.g. `ValidateOrderData`,
`GetClientDetails`, `CheckEligibility`). Long names are harder to
reference in Call/Branch steps and clutter tracer output.

**Good:** `ValidateAddress`, `GetClaimStatus`, `InitializeFields`
**Bad:** `ValidateAndProcessIncomingOrderRequestData`

#### Page-New must pair with Page-Remove and pyPagesAndClasses

Every temporary page created with `Page-New` must:

1. **Be declared in `pyPagesAndClasses`** at the activity level with its
   class name. Missing declarations produce `NotDefinedP&C` warnings.
2. **Have a matching `Page-Remove` step** at the end of the activity to
   clean up the clipboard. Missing cleanup produces the
   `pzCleanUpCreatedPages` guardrail warning (Data Integrity, severity 2)
   and can cause memory leaks.
3. If the activity has an error block (e.g. `pyStepsBlockName: "ERR"`),
   add a `Page-Remove` step at the end of the error block too — ensure
   cleanup happens on both success and failure paths.

**Anti-pattern — do NOT do this:**
```
Step 1: Page-New TempPage
Step 2: (use TempPage)
Step 3: Obj-Save
(no Page-Remove — clipboard leak!)
```

**Correct pattern:**
```
Step 1: Page-New TempPage
Step 2: (use TempPage)
Step 3: Obj-Save
Step 4: Page-Remove TempPage
```

#### Use single Property-Set for multiple fields

When setting multiple properties, use a **single Property-Set step** with
multiple `pyParamArray` entries. Do NOT create separate Property-Set steps
for each field.

**Anti-pattern — do NOT do this:**
```
Step 1: Property-Set .Status = "Open"
Step 2: Property-Set .Priority = "High"
Step 3: Property-Set .AssignedTo = "WorkBasket"
```

**Correct pattern — one step, multiple entries:**
```
Step 1: Property-Set
  pyParamArray[0]: .Status = "Open"
  pyParamArray[1]: .Priority = "High"
  pyParamArray[2]: .AssignedTo = "WorkBasket"
```

#### Property-Set value expression types

`PropertiesValue()` in `pyParamArray` accepts these expression forms:

| Form | Example | Meaning |
|------|---------|---------|
| `"\"Literal\""` | `"\"Approved\""` | String literal (must be double-quoted inside the expression) |
| `.PropertyName` | `.pyStatusWork` | Property reference on the step page |
| `Param.X` | `Param.InputValue` | Parameter page reference |
| `@Function()` | `@CurrentDateTime()` | Built-in function call |
| `local.varName` | `local.myBuffer` | Local variable reference |
| `.Page.Property` | `.MyPage.pyLabel` | Property on a named page |

Unquoted values are treated as property references — always double-quote
string literals.

#### pyParametersParamReq values are NOT boolean

`pyParametersParamReq` in `pyParameters` accepts these values:
- `"-1"` — parameter is **required**
- `"0"` — parameter is **not required** (optional)
- `""` (blank) — same as `"0"` (optional)

Do NOT use `"true"` or `"false"` — these are not valid values.

#### pyParametersParamType valid enum values

`pyParametersParamType` in `pyParameters` must be one of:
`STRING`, `INTEGER`, `TrueFalse`, `BOOLEAN`, `Date`, `DateTime`,
`Decimal`, `Double`, `JAVAOBJECT`, `PAGE`, `TimeOfDay`.

Note the mixed casing — `TrueFalse`, `Date`, `DateTime`, `TimeOfDay`
are title-case while `STRING`, `INTEGER`, `BOOLEAN`, `DOUBLE`,
`JAVAOBJECT`, `PAGE` are uppercase. `StringBuffer` is also valid for
`pyLocalParameters` (local variables) but not for `pyParameters`.

#### Activity-Set-Status Severity values and Message parameter

The `Severity` parameter of `Activity-Set-Status` only accepts:
`Good`, `Info`, `Warn`, `Fail`. Using `Error` or other values causes
a creation failure. `Status` accepts `Good` or `Fail`.

The `Message` parameter (not `StatusMessage`) sets the status message
text and is mandatory — omitting it produces no visible status output.

#### ERR block must be defined before it is referenced

When using `pyOnException: "ERR"` or precondition jumps to `"ERR"`, the
target step with `pyStepsBlockName: "ERR"` must exist in the activity. The
ERR block must be placed **after** an `Exit-Activity` step so the success
path never falls through into it.

**Pattern:**
```
Step N:   (risky step)          pyOnException: "ERR"
Step N+1: Property-Set          (success results)
Step N+2: Exit-Activity         (prevents fall-through into ERR block)
Step N+3: Log-Message           pyStepsBlockName: "ERR" (first step of error block)
Step N+4: Property-Set          (error status)
Step N+5: Page-Remove           (cleanup on error path too)
```

#### Obj-Browse uses pyParamArray as a column/filter grid — NOT key-value pairs

Unlike most methods, `Obj-Browse` uses `pyParamArray` as a **row-based filter
grid**. Each entry represents a column to select, filter, and/or sort with
fields: `Field`, `Select`, `Condition`, `Value`, `Sort`, `Label`. This is
completely different from the key-value `PropertyName`/`PropertyValue` pattern
used by `Obj-Open`.

**Supported `Condition` values:** *(blank)* (value only), `Contains`,
`StartsWith`, `=` (Is Equal), `IsNotEqual`, `IsGreaterThan`,
`IsGreaterThanOrEqual`, `IsLessThan`, `IsLessThanOrEqual`,
`NotStartsWith`, `EndsWith`, `NotEndsWith`, `NotContain`, `IsNull`,
`IsNotNull`, `IsTrue`, `IsFalse`.

Conditions `IsNull`, `IsNotNull`, `IsTrue`, `IsFalse` do not require a
`Value`. Use `Label` (e.g. `"A"`, `"B"`) with `Logic` (e.g. `"A AND B"`)
in `pyStepsCallParams` for compound filter expressions.

The server auto-populates `pyStepsParamUI` sub-arrays on both the first
`pyParamArray` entry (6 items describing the grid column schema) and
`pyStepsCallParams` (7 items describing main params like PageName, ObjClass).
Do NOT author `pyStepsParamUI` manually — it is generated on save.

See `Obj-Browse` for the full condition table
and correct structure.

#### Obj-Browse requires PageName and RowKey

`Obj-Browse` requires both `PageName` (the clipboard page to populate
with results) and `RowKey` — a property reference that uniquely
identifies each result row (e.g. `.pyID`, `.pzInsKey`). Omitting either
causes runtime errors. Columns to select, filter, and sort can be
specified either via the row-based `pyParamArray` grid (see
`obj-browse.md`) or via the optional `SelectList`, `OrderByList`, and
`MaxRecords` parameters in `pyStepsCallParams`.
Use `ReadOnly: "true"` for read-only queries (no locking).

#### Obj-Filter requires ListPage and ResultClass

`Obj-Filter` requires `ListPage` (the source page list to filter) and
`ResultClass` (the class of the result page) as mandatory parameters.
Omitting either causes a creation or runtime failure.

#### Obj-Sort requires Class and PageListProperty

`Obj-Sort` requires `Class` (the class of pages in the list) and
`PageListProperty` (the page list property to sort) as mandatory
parameters. Omitting either causes a creation or runtime failure.

#### Activity must have at least one step

An activity must have at least one step with a valid
`pyStepsActivityName`. Omitting `pySteps` causes the builder to auto-fill
an empty step with a blank method name, which fails enum validation.

#### Server validates rule references at creation time

Many step methods reference other rules (privileges, decision tables, data
pages, Rule-Messages, queue processors, etc.). The server validates these
references **at activity creation time** — not just at runtime. If the
referenced rule does not exist in the application's ruleset stack, creation
fails with a validation error.

Affected methods include:
- `Privilege-Check` — `PrivilegeName` must exist as a privilege rule
- `Property-Map-DecisionTable` — `DecisionTableName` must exist
- `Property-Map-DecisionTree` — `DecisionTreeName` must exist
- `Property-Map-Value` — `MapName` must exist
- `Property-Set-Messages` / `Page-Set-Messages` — `Message` must be an existing Rule-Message
- `Queue-For-Processing` — `Type` must reference an existing queue processor
- `Obj-Validate` — `Validate` must reference an existing Rule-Obj-Validate
- `Apply-DataTransform` — `DataTransform` must exist
- `Load-DataPage` — `DataPage` must exist and be thread/requestor/node scoped

**Best practice:** Always verify that referenced rules exist before
including them in activity step parameters. When creating test/example
activities, use well-known OOTB rule names rather than fictional ones.

#### StringBuffer-Append requires a local variable declaration

`StringBuffer-Append` (and `StringBuffer-Insert`) reference buffer names
that must be declared as local variables with type `StringBuffer` in
`pyLocalParameters`. Without this declaration, the generated Java code
fails to compile.

```json
"pyLocalParameters": [
  { "pyParametersParamName": "myBuffer", "pyParametersParamType": "StringBuffer", "pyParametersParamDesc": "Output buffer" }
]
```

#### Page-Change-Class Keep parameter is NOT boolean

The `Keep` parameter for `Page-Change-Class` accepts numeric string values:
- `""` (blank) — default behavior (new-style, keep properties)
- `"0"` — old behavior (discard properties not in new class)
- `"1"` — new behavior (keep all properties)
- `"2"` — data transform (apply Model to reclassed page)

Do NOT use `"true"` or `"false"` — these cause Java compilation errors.

#### Load-DataPage scope restriction

`Load-DataPage` only works for **thread-level**, **requestor-level**, and
**node-level** data pages. It cannot load operator-scoped data pages like
`D_pxCurrentOperator`. Attempting to load an unsupported scope produces:
"Only thread, requestor and node level data pages can be loaded."

#### Log-Message LoggingLevel valid values

The `LoggingLevel` parameter of `Log-Message` accepts only:
`Debug`, `Info`, `Warn`, `Error`, `InfoForced`.

`InfoForced` always writes to the log regardless of the logging level
configuration. Do NOT use `WarnForced` or other variants — they are
not valid values.

#### Show-HTML HTMLStream expects a Rule-Obj-HTML name

The `HTMLStream` parameter of `Show-HTML` expects the **name of a
`Rule-Obj-HTML` rule instance** (e.g. `"ShowMessage"`), not raw HTML
content. The referenced HTML rule must exist in the ruleset stack at
creation time.

#### Call and Branch use composite pyStepsActivityName

The `Call`, `Branch`, `Queue`, and `Collect` keywords embed the target
activity name directly in `pyStepsActivityName` as a composite value:
- `"Call MyActivityName"` — calls activity in same class
- `"Call Work-.pzApplyPageInstructions"` — cross-class call (dot-qualified)
- `"Branch MyActivityName"` — branch to activity in same class
- `"Branch Work-.pzApplyPageInstructions"` — cross-class branch

The schema accepts both the fixed enum methods (e.g. `"Property-Set"`)
and the composite pattern `^(Call|Branch|Queue|Collect) .+$`.

**Server validation for Call/Branch:**
- The target activity must exist in the ruleset stack at creation time.
- For cross-class calls, the server also validates that all required
  parameters of the target activity are satisfied via `pyStepsCallParams`.
- Use `pyPassCurrentParameterPage: "true"` to forward the caller's
  parameter page instead of explicit `pyStepsCallParams`.

#### Loop type selection — EMBEDDED vs PROPERTYLIST vs PAGE

Choose the correct `pyStepsRepeatDefHasRepeat` value based on what you are
iterating over:

| Loop Type | Use When | Example |
|-----------|----------|---------|
| `EMBEDDED` | Iterating over a **page list** (embedded pages, e.g. `pxResults` from Obj-Browse, any PageList property) | Loop over `BrowseList.pxResults` |
| `PROPERTYLIST` | Iterating over a **value list** (list of scalars — strings, integers, decimals) | Loop over a list of email addresses |
| `PAGE` | Iterating over top-level named pages on the clipboard | Loop over multiple top-level pages |
| `REPEAT` | Fixed count iteration (N times) | Execute a step exactly 5 times |
| `PROPERTYGROUP` | Iterating over a property group's keys | Loop over dynamic key-value pairs |

**Common mistake:** Using `PROPERTYLIST` for a page list like `pxResults`.
`PROPERTYLIST` is for scalar value lists only. Use `EMBEDDED` for page lists.

#### EMBEDDED loop step page must reference the page list path

When using an `EMBEDDED` loop, `pyStepsObjectName` must reference the
**page list property path** (e.g., `BrowseList.pxResults`), not a standalone
page name like `CurrentOpp`. The loop iterates over embedded pages within
that list — the step page tells Pega which list to walk.

**Correct:**
```
pyStepsObjectName: "BrowseList.pxResults"
pyStepsRepeatDef.pyStepsRepeatDefHasRepeat: "EMBEDDED"
pyStepsRepeatDef.pyForEachValidClasses: [{ "pyForEachClass": "MyOrg-MyApp-Work-Order" }]
```

**Wrong — causes "Step page should reference a list or group property":**
```
pyStepsObjectName: "CurrentOpp"
pyStepsRepeatDef.pyStepsRepeatDefHasRepeat: "EMBEDDED"
```

#### `pyForEachProperty` requires a dot prefix

The `pyForEachProperty` field must be dot-prefixed to indicate a property
reference. Without the dot, the server rejects it as a literal string.

- **Correct:** `.pxResults`
- **Wrong:** `pxResults` — error: "pxResults is a literal String but
  Property Name should reference a ClipboardProperty"

#### `pyPagesAndClasses` must include page list paths used as step pages

When the step page is a compound path like `BrowseList.pxResults`, that
path must be declared in `pyPagesAndClasses` with the class of the
embedded pages. Without this declaration, property references on the step
page resolve against `@baseclass` and fail validation.

```json
"pyPagesAndClasses": [
  { "pyPagesAndClassesPage": "BrowseList", "pyPagesAndClassesClass": "Code-Pega-List" },
  { "pyPagesAndClassesPage": "BrowseList.pxResults", "pyPagesAndClassesClass": "MyOrg-MyApp-Work-MyCase" }
]
```

#### Obj-Save WriteNow vs Commit — transaction pattern in loops

`Obj-Save` with `WriteNow: "true"` bypasses the deferred-save queue and
writes to the database immediately, but does **not** commit the
transaction. A subsequent `Commit` step is still required to make the
write permanent (commit the transaction boundary). When `WriteNow` is
empty/unchecked, the save is deferred until a `Commit` step executes.

**Best practice in loops:** Use `WriteNow: ""` (unchecked) inside the loop
and a single `Commit` step **after** the loop. This provides:
- Transactional integrity — all saves succeed or all roll back
- Better performance — one commit instead of N writes

**Anti-pattern:**
```
Step 3: Obj-Save (WriteNow: "true", in loop)  ← writes per iteration (no transactional grouping)
Step 4: Commit                                 ← still needed to commit
```

**Correct pattern:**
```
Step 3: Obj-Save (WriteNow: "", in loop)       ← defers each save
Step 4: Commit (after loop)                    ← commits all at once
```

#### Obj-Save and Commit step page in EMBEDDED loops

There are two common patterns for saving inside an EMBEDDED loop:

**Pattern A — Save per iteration (inside the loop):**
Place `Obj-Save` inside the EMBEDDED loop with the same step page as the
loop (`BrowseList.pxResults`). During each iteration, the step page
resolves to the current embedded element, so each page is saved
individually. Follow with a single `Commit` after the loop.

| Method | Step Page | Loop |
|--------|-----------|------|
| Property-Set | `BrowseList.pxResults` | EMBEDDED (modifies each page) |
| Obj-Save | `BrowseList.pxResults` | EMBEDDED (saves each page per iteration) |
| Commit | `BrowseList` | None (single commit after loop) |

**Pattern B — Batch save after the loop (recommended for transactional integrity):**
Defer all saves until after the loop completes by placing `Obj-Save` and
`Commit` outside the loop on the parent page. This saves all modified
embedded pages in one operation.

| Method | Step Page | Loop |
|--------|-----------|------|
| Property-Set | `BrowseList.pxResults` | EMBEDDED (modifies each page) |
| Obj-Save | `BrowseList` | None (single save after loop) |
| Commit | `BrowseList` | None (single commit after loop) |

Choose Pattern B when all-or-nothing transactional semantics are needed.
Choose Pattern A when individual records must be persisted independently
(e.g., partial progress on large batches).

### Methods not supported by the activity generator

The following methods cannot be created via the API:

| Method | Reason |
|--------|--------|
| `Assign-EstablishContext` | Server returns "Unsupported or unknown operation" |
| `ExecuteAport` | Server returns "Unsupported or unknown operation" |
| `Save-DataPage` | Java compilation error even with no parameters |
| `Call-Automation` | Requires `pyActivityType: "AUTOMATION"` which is not supported for authoring |

### Prefer Param.X references over class properties

When authoring reusable or portable activities, reference activity
**parameters** (`Param.X`) instead of class properties in step fields
(Property-Set values, precondition When expressions, Log-Message messages).

- `Param.X` references are **not validated** against the class schema at
  creation time — the server only validates that the syntax is valid.
- Class property references (e.g. `.pyStatusWork`) **are validated** at
  creation time — the property must exist on the step page's class.
- Declare-expression properties (e.g. `.pxUrgencyWork`) **cannot** be set
  via Property-Set — the server rejects the assignment at creation time.

This pattern is especially useful for test/example activities that should
work across different application classes.

### Call-Function invokes library functions — use `library-function-builder` for signatures

The `Call-Function` step method calls Pega library functions using the
`@(RuleSet:Library).functionName(args)` signature pattern. The function
expression goes in `pyParamArray[N].PropertiesValue` and the optional
result property in `pyParamArray[N].PropertiesName` (blank if void).

**Multiple functions can be batched in one step** by adding multiple
`pyParamArray` entries. Each entry is one function call with its own
`PropertiesValue` and `PropertiesName`.

**All `pyParamArray` entries** use `pyTempPlaceHolder: "TempPlaceHolder"`
and `pyStepsCallParams: { "pxObjClass": "" }`. Do NOT use `pyStepsParamUI`
— it is irrelevant for Call-Function rendering.

**CRITICAL: `pyStepsCallParamsList` with `pyFunctionData` is required for
UI rendering.** The Pega designer uses `pyStepsCallParamsList` (one entry
per function in `pyParamArray`) with nested `pyFunctionData` to render the
function grid. The server does **NOT** auto-generate this when creating
rules via API. Without it, the function grid appears blank in the designer
(though the activity persists and executes correctly).

**Constructing `pyFunctionData`:** Load the corresponding function alias
from the `library-function-builder` skill (e.g., `StringEquals`,
`MathGreaterThan`, `isInThePastDate`) and map its fields to `pyFunctionData`:
- `pyPurpose` → `pyCity` and `pyName`
- `pySignature` → `pySignature`
- `pyPatternText` → `pyEcho`
- `pyPattern` (with `[]` instead of `{}`) → `pyLabel`
- `pyOutputType` → `pyReturnType`
- `pyLibraryRuleSet` → `pyRuleSet`
- `pyParameters[]` → `pyParameters[]` (with actual argument values in `pyParametersParamValue`)
- Derive `pyUIParameters[]` from the pattern (input fields for placeholders, Label entries for text between)

See `Call-Function` for the full
`pyFunctionData` structure, mapping table, and batching examples.

**All available function signatures are defined in the
`library-function-builder` skill.** Load that skill to find the correct
`pySignature` for any function alias. The function families include:
date/time (`DateTime`), string (`String`), math (`ExpressionEvaluators`),
collection operations (`Utilities`), and more.

**Common Libraries Quick Reference:**

| Library | RuleSet | Common Functions |
|---------|---------|-----------------|
| `String` | `Pega-RULES` | `equals`, `contains`, `pxIsInListOfValues`, `pxIsNotInListOfValues`, `toLowerCase`, `toUpperCase`, `length` |
| `DateTime` | `Pega-RULES` | `CurrentDateTime`, `compareDatesByDays`, `isDateInThePast`, `isWithinDaysOfNow`, `pxDateTimeisPastOrFuture` |
| `Math` | `Pega-RULES` | `greaterThan`, `greaterThanEqualTo`, `lessThan`, `lessThanEqualTo` |
| `Utilities` | `Pega-RULES` | `PropertyHasValue` |
| `ExpressionEvaluators` | `Pega-RULES` | `compareTwoValues`, `evaluateWhen`, `compareTwoStrings` |
| `Property` | `Pega-RULES` | `setPropertyValue`, `getPropertyValue` |
| `Page` | `Pega-RULES` | `pxPageListLength`, `pxValueIsInPageList`, `pxValueIsNotInPageList` |
| `WorkUtilities` | `Pega-ProcessEngine` | `pxAssignedToMyStaff` |
| `DateTimeUtils` | `Pega-RulesEngine` | `pxCompareDateTimeToSymbolicDate`, `pxDateTimeisPastOrFuture` |
| `BusinessCalendar` | `Pega-RULES` | calendar-based date calculations |

**Signature pattern:** `@(RuleSet:Library).functionName(arg1, arg2, ...)`
- Property refs: `.PropertyName` (dot prefix, no quotes)
- String literals: `\"text\"` (escaped double quotes in JSON)
- Numbers: `42`, `3.14` (bare)
- Booleans: `true`, `false` (bare)
- Parameters: `Param.X` (no dot prefix, no quotes)
- No return capture: set `PropertiesName` to `""`

**Multiple functions in one step:** Add multiple `pyParamArray` entries. Each entry is one function call. `pyStepsCallParamsList` must have one entry per function, in the same order as `pyParamArray`.

**Common pitfalls:**
- `lessThanEqualTo` / `greaterThanEqualTo` — NOT `lessThanOrEqualTo` / `greaterThanOrEqualTo`
- `isDateInThePast` (DateTime library) — NOT `pxIsInThePastDateTime` (that's a When rule alias, not callable)
- `@(Pega-RULES:Property).setPropertyValue` expects a property **reference** arg, not a string literal

### Obj-Open pyParamArray keys must match the class key definition

When using `Obj-Open` with `pyParamArray` key-value pairs, the
`PropertyName` values must match the **class key definition** of the
target class. For Work classes, use `.pyID` (not `.pzInsKey`). The server
validates key names against the class key definition at creation time.

### Java steps — use only when built-in methods cannot solve the problem

Pega provides **108 built-in step methods** that cover the vast majority
of activity use cases. Java steps should only be used when no combination
of built-in methods can achieve the desired result.

**Prefer Property-Set with preconditions** for conditional logic instead
of Java if/else blocks. The AND-gate precondition pattern (multiple rows
with `WhenTrue="2"` / `WhenFalse="3"`) handles most branching needs.

Java steps:
- Require compilation at save time (slower, more error-prone)
- Are harder to maintain and debug than declarative steps
- Cannot be traced/inspected the same way as built-in methods
- May introduce security and upgrade risks
