---
description: "Pega expression language reference -- grammar, operators, property references, function calls, quoting rules, and context-specific behavior"
---
# Expression Syntax

Pega expression language reference — grammar, operators, property references, function
calls, quoting rules, and context-specific behavior for Activities, Data Transforms,
When rules, Declare Expressions, and other expression-aware fields.

## Category Scope

- Expression grammar: operands, operators, function calls, literals
- Property reference syntax (primary page, named pages, page lists, page groups, embedded pages, parameters, data pages)
- Function call syntax: `@` aliases vs `@Library.function()` vs fully-qualified `@(RuleSet:Library).function()`
- String, numeric, boolean, and date/time literal formats
- Arithmetic, comparison, logical, and string operators
- Quoting rules by context (Data Transform SET, Activity Property-Set, Log-Message, WhereClause, etc.)
- Null and empty handling in expressions
- Type coercion rules
- Conditional expressions
- Expression contexts and where expressions are evaluated

## Bootstrap Hints

To populate this file during bootstrap:
- Examine `pyPropertiesValue` fields in Data Transforms (Rule-Obj-Model) for expression patterns
- Examine `PropertiesValue` in Activity (Rule-Obj-Activity) Property-Set steps
- Examine `Message` in Activity Log-Message steps
- Examine `WhereClause` in Activity Obj-Browse steps
- Examine `pyExpression` in flow decision shapes (Rule-Obj-Flow)
- Look for expression evaluation patterns in When rules and Declare Expressions
- Look at Function Alias rules (`Rule-Alias-Function`) for `@` shortcut patterns
- Inspect expression builder UI metadata (`pyExpressionGadget`) for supported syntax

---

## Expression Fundamentals

A Pega expression is a text string that the expression engine evaluates at runtime to
produce a value. Expressions appear in many rule types — Data Transform `SET` values,
Activity `Property-Set` values, `Log-Message` message text, `Obj-Browse` where clauses,
flow decision conditions, When rules, Declare Expression formulas, and more.

### What Makes Something an Expression

The expression engine processes:
- **Property references** — `.PropertyName`, `Page.Property`, `param.ParamName`
- **Function calls** — `@functionName()`, `@Library.function()`, `@(RuleSet:Library).function()`
- **Operators** — arithmetic, comparison, logical, string concatenation
- **Literals** — quoted strings, numbers, booleans, date/time values

Bare text without any of these markers may be treated as a literal string or as a
property reference depending on the context. This is the source of most quoting
confusion — see **Quoting Rules by Context** below.

---

## Property Reference Syntax

Property references resolve at runtime to the value stored on a clipboard page.

### Reference Patterns

| Pattern | Meaning | Example |
|---------|---------|---------|
| `.PropertyName` | Property on the current (step) page | `.pyLabel` |
| `PageName.PropertyName` | Property on a named page | `NewCasePage.pyID` |
| `Primary.PropertyName` | Property on the primary page (explicit) | `Primary.pyStatusWork` |
| `.PageList(index)` | Page list element by 1-based integer index | `.Addresses(1)` |
| `.PageList(index).Property` | Property on a page list element | `.Addresses(1).City` |
| `.PageGroup("key")` | Page group element by string key | `.Regions("US-East")` |
| `.PageGroup("key").Property` | Property on a page group element | `.Regions("US-East").Manager` |
| `.EmbeddedPage.Property` | Property on an embedded (single) page | `.ClientInfo.ContactEmail` |
| `.EmbeddedPage.Nested.Prop` | Deep traversal through embedded pages | `.ClientInfo.Address.City` |
| `param.ParamName` | Parameter page reference (Activity / DT params) | `param.InputMode` |
| `D_DataPageName.Property` | Data page property (triggers data page load) | `D_OperatorID.pyUserName` |
| `D_DataPageName[Key].Prop` | Parameterized data page element | `D_ClientList["ACME"].Region` |
| `pxRequestor.Property` | Requestor page (current session) | `pxRequestor.pyUserName` |

### Important Notes

- The leading `.` means "relative to the current page context" — in a Data Transform
  `SET` step, this is the primary page; inside an `UPDATE_PAGE` block, it's the page
  being updated; inside `APPEND_AND_MAP_TO`, it's the row being appended.
- `PageName.Property` (no leading dot) accesses a named page declared in the rule's
  Pages & Classes tab. The named page must be in scope.
- `param.ParamName` accesses the parameter page. In Activities this is the parameter
  page passed by the caller; in Data Transforms this is the DT's declared parameters.
- Data page references (`D_Name.Property`) trigger the data page load if not already
  loaded. Use with care in performance-sensitive paths.
- **PageList/PageGroup subscripts resolve to pages, not scalars.** `.MyList(1)` is a
  **page** (the first element of the PageList), not a scalar value. To access a scalar
  on that page, use `.MyList(1).PropertyName`. You cannot assign a scalar value (string,
  integer, boolean, function result like `@substring(...)`) to a page reference like
  `.MyList(1)` — that is a type mismatch. Similarly, `.MyGroup("key")` is a page, not
  a scalar. This applies to all PageList and PageGroup properties including system
  properties like `pxResults`. To store a scalar value, use a `String`-mode, `Integer`-
  mode, or other scalar property — never a PageList element without a trailing property
  name.

---

## Function Call Syntax

Pega expressions support function calls in three syntax forms, from shortest to most
explicit.

### 1. `@` Alias — `@functionName(args)`

Some functions have a Function Alias (`Rule-Alias-Function`) registered on
`@baseclass`, enabling a short `@name()` syntax.

```
@CurrentDateTime()
@addToDate(.DueDate, "30", "0", "0", "0")
@trim(.CustomerName)
@round(.TotalAmount, 2)
```

**Critical:** The parentheses `()` are required. Without them, the text is treated as
a literal string:
- `@CurrentDateTime()` → evaluates to the current date/time value
- `@CurrentDateTime` → literal text `"@CurrentDateTime"` (no evaluation)

Not all aliases work. Some exist as `Rule-Alias-Function` rules but fail to resolve
at runtime (documented per-library in the domain skill files). When an alias doesn't
work, use one of the longer forms.

### 2. Library-Qualified — `@Library.function(args)`

Calls a function using the library name (the library name registered in
`Rule-Utility-Library`).

```
@DateTime.CurrentDateTime()
@String.trim(.Name)
@String.toUpperCase(.Code)
@Utilities.pxValueIsInPageList(...)
```

This is the **recommended form for authoring**. It is unambiguous, shorter than
fully-qualified, and always resolves correctly.

### 3. Fully-Qualified — `@(RuleSet:Library).function(args)`

Calls a function with the explicit ruleset and library name. Required when multiple
rulesets define the same library name, or when library-qualified syntax is ambiguous.

```
@(Pega-RULES:DateTime).CurrentDateTime()
@(Pega-RULES:String).equalsIgnoreCase(.Status, "Active")
@(Pega-RULES:Utilities).pxValueIsInPageList(.MyList, "TargetValue", ".KeyProp")
@(Pega-RulesEngine:ExpressionEvaluators).round(.Amount, 2)
```

### Which Form to Use

| Situation | Recommended Form |
|-----------|-----------------|
| Alias is known to work (documented in library skill) | `@alias()` is fine |
| General authoring | `@Library.function()` (library-qualified) |
| Alias doesn't resolve or is ambiguous | `@Library.function()` or fully-qualified |
| Debugging resolution issues | Fully-qualified `@(RuleSet:Library).function()` |

### Function Arguments

- Arguments are comma-separated
- String literal arguments use double quotes: `@addToDate(.Date, "30", "0", "0", "0")`
- Property references are unquoted: `@String.trim(.CustomerName)`
- Numeric literals are bare: `@round(.Amount, 2)`
- Functions can be nested: `@min(100, @max(0, .Score + .Adjustment))`

---

## Literals

### String Literals

String literals in expressions use double quotes:

```
"Active"
"Hello World"
""
```

When writing these inside JSON field values (which are themselves double-quoted
strings), the inner quotes must be escaped:

```json
"pyPropertiesValue": "\"Active\""
"pyPropertiesValue": "\"Hello World\""
"pyPropertiesValue": "\"\""
```

### Numeric Literals

Integers and decimals are bare (no quotes):

```
42
3.14
-10
0.5
```

In JSON fields, numeric literals do NOT need inner quotes:

```json
"pyPropertiesValue": "42"
"pyPropertiesValue": "3.14"
```

### Boolean Literals

Pega uses `true` and `false` (lowercase) in expression contexts:

```
true
false
```

In JSON: `"pyPropertiesValue": "true"`

**Note:** Pega's `TrueFalse` property type stores `"true"` / `"false"` as strings.
In expressions, unquoted `true` and `false` evaluate as boolean values.

### Date/Time Literals

Date/time values in expressions are typically produced by functions rather than written
as literals. The internal format is `yyyyMMdd'T'HHmmss.SSS GMT` but you should use
functions to construct them:

```
@CurrentDateTime()
@addToDate(@CurrentDateTime(), "-30", "0", "0", "0")
```

---

## Operators

### Arithmetic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition (numeric) or concatenation (string) | `.Price + .Tax` |
| `-` | Subtraction | `.Total - .Discount` |
| `*` | Multiplication | `.Quantity * .UnitPrice` |
| `/` | Division | `.Total / .Count` |

**Integer division:** If both operands are integers, the result is truncated to an
integer. To get decimal division, ensure at least one operand is decimal:
`.IntValue / 1.0` or use a Decimal-typed property.

**Operator precedence:** `*` and `/` bind tighter than `+` and `-`. Use parentheses
to make precedence explicit: `(.Price + .Tax) * .Quantity`

**String concatenation:** The `+` operator concatenates when at least one operand is
a string. **Warning:** If one operand is null, the result contains the literal text
`"null"` — e.g., `null + "World"` produces `"nullWorld"`. Guard against this with
null checks or use `@String.trim()` patterns.

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal to | `.Status == "Active"` |
| `!=` | Not equal to | `.Status != ""` |
| `>` | Greater than | `.Score > 80` |
| `<` | Less than | `.Count < 10` |
| `>=` | Greater than or equal | `.Age >= 18` |
| `<=` | Less than or equal | `.Priority <= 3` |

**String comparison with `==`:** Compares by value (not identity). For
case-insensitive comparison, use `@String.equalsIgnoreCase()`.

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `.Age >= 18 && .Status == "Active"` |
| `\|\|` | Logical OR | `.Priority == 1 \|\| .IsUrgent == true` |
| `!` | Logical NOT | `!.IsCompleted` |

**Note:** Pega also supports the text forms `AND`, `OR`, `NOT` in some contexts
(particularly When rule definitions). In general expressions, `&&`, `||`, `!` are
the standard operators.

---

## Quoting Rules by Context

This is the most confusing aspect of Pega expressions. Different fields interpret
values differently. The key question is always: **Does this field run through the
expression engine, or is it treated as a literal?**

### Data Transform `SET` — `pyPropertiesValue`

The `pyPropertiesValue` field in a Data Transform `SET` step is **always evaluated as
an expression**. Everything in this field goes through the expression engine.

| Intent | Value in `pyPropertiesValue` | JSON encoding |
|--------|------------------------------|---------------|
| Set to literal string `"Active"` | `"Active"` (expression returning string) | `"\"Active\""` |
| Set to empty string | `""` (expression returning empty string) | `"\"\""` |
| Copy from property | `.SourceProperty` | `".SourceProperty"` |
| Set to number | `42` | `"42"` |
| Set to function result | `@CurrentDateTime()` | `"@CurrentDateTime()"` |
| Set to concatenation | `.FirstName + " " + .LastName` | `".FirstName + \" \" + .LastName"` |
| Set to parameter value | `param.InputValue` | `"param.InputValue"` |
| Set to boolean | `true` | `"true"` |

**Key rule:** Because the expression engine always runs, string literals MUST be
quoted within the expression. `.pyLabel` means "the value of property pyLabel";
`"Active"` means "the literal string Active". Without quotes, `Active` would be
interpreted as a property reference and likely resolve to empty/null.

### Activity `Property-Set` — `PropertiesValue`

The `PropertiesValue` field in an Activity `Property-Set` step (`pyParamArray` entry)
has context-dependent behavior:

| Intent | Value in `PropertiesValue` | JSON encoding |
|--------|---------------------------|---------------|
| Set to literal string (bare) | `Approved` (bare text — ambiguous, could be a page reference) | `"Approved"` |
| Set to literal string (quoted) | `"SAMM Level 2 Review"` (recommended) | `"\"SAMM Level 2 Review\""` |
| Copy from property | `.SourceProperty` | `".SourceProperty"` |
| Set from parameter | `param.ParamName` | `"param.ParamName"` |
| Set to arithmetic expression | `.Price * .Quantity` | `".Price * .Quantity"` |
| String concatenation | `"Assessment: " + .Name` | `"\"Assessment: \" + .Name"` |
| Set to function result | `@CurrentDateTime()` | `"@CurrentDateTime()"` |
| Nested functions | `@String.toUpperCase(@String.trim(.Name))` | `"@String.toUpperCase(@String.trim(.Name))"` |

**Key difference from Data Transform:** In Activity `Property-Set`, bare text that
doesn't start with `.`, `@`, `"`, `(`, or a digit is treated as a literal string.
However, bare text is ambiguous — `Approved` could be interpreted as a page
reference. **Quoted strings also work** — `"SAMM Level 2 Review"` evaluates to
`SAMM Level 2 Review`, identical to bare text. Use quoted strings for literal
values to reduce ambiguity and maintain consistency with other expression contexts.

**No `=` prefix needed:** The Property-Set engine automatically recognizes
expressions — property references (`.Property`), function calls (`@function()`),
arithmetic (`75.0 * 1.2`), string concatenation (`"text" + .Prop`), and
parenthesized expressions (`(.Score * 2) - 100`). Do NOT use a `=` prefix.
Only bare text without expression markers is treated as a literal string.

### Activity `Log-Message` — `Message`

The `Message` parameter in a `Log-Message` step is **evaluated as an expression**.

| Intent | Value in `Message` | JSON encoding |
|--------|-------------------|---------------|
| Static text | `"Starting process"` (quoted literal) | `"\"Starting process\""` |
| Property value | `.pyID` (expression) | `".pyID"` |
| Concatenation | `"Case " + .pyID + " started"` | `"\"Case \" + .pyID + \" started\""` |

Like Data Transform `SET`, the expression engine runs on this field, so string
literals must be quoted.

**LoggingLevel:** Use `"InfoForced"` — `"Info"` does NOT write to the log file
unless the system logging level is explicitly set to Info. `"InfoForced"` always
writes regardless of logging configuration.

**SendToTracer:** When `"true"`, the operator must also enable **"Log Messages"**
under **"Event Types to Trace"** in Tracer settings for the message to appear.

### Activity `Obj-Browse` — `WhereClause`

The `WhereClause` in `Obj-Browse` uses expression syntax for filter conditions:

```
.pyStatusWork = "Open"
.pxCreateDateTime >= @addToDate(@CurrentDateTime(), "-30", "0", "0", "0")
.ClientRegion = "US-East" AND .IsActive = true
```

**Note:** `WhereClause` uses single `=` for equality (SQL-style), not `==`.

### Flow Decision — `pyExpression`

Flow decision shape expressions evaluate to a boolean and use standard expression
syntax:

```
@String.equalsIgnoreCase("FAIL", .pxOperationStatus)
.Score >= 80
.IsApproved == true
```

### When Rules

When rules contain conditions that evaluate expressions. Simple When rules use a
structured format (property, comparator, value). Advanced When rules can contain
full expression syntax.

### Declare Expressions

Declare Expression formulas are full expressions:

```
@min(100, @max(0, .pxUrgencyWorkClass + .pyUrgencyWorkAdjust + .pxUrgencyWorkSLA))
.Price * .Quantity * (1 - .DiscountRate)
```

---

## Null and Empty Handling

### Null Property References

- An unset property evaluates to null
- Null in arithmetic produces null (not zero): `null + 5` → null
- Null in string concatenation produces the literal text `"null"`:
  `null + "text"` → `"nulltext"`
- Null compared with `==` to a value returns false: `null == "Active"` → false
- Null compared with `!=` to a value returns true: `null != "Active"` → true
- Two nulls compared: `null == null` → true

### Empty String vs Null

- An empty string (`""`) is NOT the same as null
- `.Property == ""` checks for empty string, not null
- `.Property != ""` is true for both null and non-empty values
- To check if a property has any value (not null AND not empty), use:
  `.Property != ""`

### Guarding Against Null

Use null-safe patterns:
- Default values in Data Transforms: set properties to `""` or `0` in an
  initialization step before using them in expressions
- Use `@String.trim()` which handles null gracefully (returns empty string)

---

## Type Coercion

The expression engine performs implicit type coercion in some cases:

| Operation | Coercion Behavior |
|-----------|-------------------|
| String + Number | Number is converted to string, result is concatenation |
| Number + Number | Arithmetic addition |
| String + String | String concatenation |
| Integer / Integer | Integer division (truncated) |
| Integer / Decimal | Decimal division (result is decimal) |
| Boolean in string context | `true` → `"true"`, `false` → `"false"` |
| String in boolean context | `"true"` → true, everything else → false |
| Number in boolean context | Non-zero → true, zero → false |

### Number-to-String Conversion

To explicitly convert a number to a string: `"" + .NumericProperty`

### String-to-Number Conversion

Pega attempts automatic conversion when a string is used in arithmetic. If the string
is not a valid number, the expression fails. Use explicit parsing functions from the
numeric library for safety.

---

## Common Expression Patterns

### Concatenation with Null Safety

```
@String.trim(.FirstName) + " " + @String.trim(.LastName)
```

### Conditional Default (using Declare Expressions)

```
if (.OverrideValue != "") then .OverrideValue else .DefaultValue
```

### Date Comparison

```
.DueDate < @CurrentDateTime()
.CreatedDate >= @(Pega-RULES:DateTime).addCalendar(@CurrentDateTime(), "0", "-6", "0", "0", "0", "0", "0")
```

### Collection Membership Check

```
@Utilities.pxValueIsInPageList(.StatusList, "Active", ".StatusCode")
```

### Nested Function Calls

```
@min(100, @max(0, .BaseScore + .Adjustment))
@round(.Price * .Quantity * (1 - .DiscountRate / 100), 2)
```

---

## Summary: Context Quick-Reference

| Context | Expression Engine? | String Literal Format | Property Ref Format |
|---------|-------------------|----------------------|---------------------|
| DT `SET` (`pyPropertiesValue`) | Always | `"quoted"` | `.Property` |
| Activity `Property-Set` (`PropertiesValue`) | Always (auto-detected) | Bare text (no quotes) | `.Property` |
| Activity `Log-Message` (`Message`) | Always | `"quoted"` | `.Property` |
| Activity `Obj-Browse` (`WhereClause`) | Always | `"quoted"` | `.Property` |
| Flow Decision (`pyExpression`) | Always | `"quoted"` | `.Property` |
| When Rule condition | Always | `"quoted"` | `.Property` |
| Declare Expression formula | Always | `"quoted"` | `.Property` |
| GenAI prompt / Correspondence | Substitution only | N/A | `{.Property}` |

---

## Notes

Lessons learned from expression authoring. This section is preserved across bootstrap
regeneration.

- **`@alias` without `()` is literal text**, not a function call. `@CurrentDateTime`
  is the string "@CurrentDateTime"; `@CurrentDateTime()` evaluates to the current
  date/time.
- **Best practice is library-qualified syntax**: `@DateTime.CurrentDateTime()` rather
  than the alias `@CurrentDateTime()`. The alias works but the library-qualified form
  is unambiguous and self-documenting.
- **Data Transform `SET` and Activity `Property-Set` have different quoting defaults.**
  DT SET always evaluates expressions (so literals need quotes); Activity Property-Set
  treats bare text as literal. Both auto-detect expressions — the `=` prefix is NOT
  needed in Property-Set. Property references (`.Prop`), function calls (`@func()`),
  arithmetic (`75 * 2`), string concatenation (`"text" + .Prop`), and parenthesized
  expressions are all recognized automatically.
- **Quoted strings work in Activity Property-Set too.** `"SAMM Level 2 Review"`
  evaluates identically to bare `SAMM Level 2 Review`. Use quoted strings for
  multi-word literal values to reduce ambiguity — this also makes Property-Set
  syntax consistent with Data Transform SET and other expression contexts.
- **`.PageList(index)` is a page, not a scalar.** A subscripted PageList reference
  like `.pxResults(1)` resolves to a clipboard **page** — you cannot assign a scalar
  value to it. To set a scalar on a PageList element, use the full path:
  `.pxResults(1).pyLabel`. To store a scalar result (e.g., from `@substring()`,
  `@trim()`, string concatenation), always target a scalar property (String, Integer,
  Decimal, etc.) — never a bare PageList subscript. The same applies to PageGroup
  subscripts like `.MyGroup("key")`.
- **`@PageExistsWithClass(pageName,className)` checks if a named page exists with
  the given class.** Syntax: `@PageExistsWithClass(pageName,className)` — no spaces
  around the comma, no quotes around either argument. Returns `true` if the page
  exists and is of the specified class. Class names containing hyphens (e.g.,
  `MyOrg-MyApp-Work-MyCase`) work fine — the function does not parse hyphens as
  operators. The page name is bare (no dot prefix, no quotes).
- **The engine normalizes spaces around comparison operators.** When a WHEN condition
  is saved, the engine strips spaces around `==`, `!=`, `>=`, `<=`, `>`, `<`. For
  example, `.Status == "Open"` is stored as `.Status=="Open"`. Author conditions
  either way — the engine will normalize — but expect the saved form to have no
  spaces around operators.
- **The engine may add explicit parentheses to arithmetic expressions.** For example,
  `.Price * .Quantity + .Tax` may be stored as `(.Price * .Quantity) + .Tax`. This
  does not change evaluation (it follows standard precedence), but the saved form may
  differ from what was authored. Do not treat parenthesized vs. non-parenthesized
  forms as mismatches when comparing expressions.
