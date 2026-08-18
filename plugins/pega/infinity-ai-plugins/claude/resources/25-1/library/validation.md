---
description: "Pega standard library for field validation -- required checks, format enforcement, cross-field validation, constraint rules"
---
# Validation

Reusable Pega assets for validating data -- required field checks, format validation,
range constraints, and cross-field rules.

## Category Scope

- Required field validation
- Format validation (email, phone, postal code)
- Range and boundary checks (min, max, between)
- Cross-field validation (end date after start date, at least one item selected)
- Regular expression validation
- Custom validation messages
- Edit validate rules
- Client-side vs. server-side validation

## Bootstrap Hints

To populate this file during bootstrap:
- Search for standard constraint rules on `@baseclass` and `Work-` classes
- Look for edit validate rules and their patterns
- Search for validation-related activities
- Inspect standard property types for built-in validation (e.g., email properties
  have format validation)
- Look for constraint rules that use When rules for condition-based validation
- Search for `pyRequired`, `pyMaxLength`, `pyMinLength` property configurations

## Known Items

*(All items below are seeded from domain knowledge and marked unvalidated. Update
status after confirming on a live Pega instance.)*

### Mark a field as required

- **How:** Constraint rule (`Rule-Declare-Constraints`) with "Property is required" condition,
  or property-level `pyRequired` flag, or view field configuration in a section rule
- **Where:** Constraint rules (enforced at submit), Property rules (enforced throughout),
  View field configuration (enforced at submit for that view)
- **Example:** Create a Constraint rule on class `Work-MyApp-Order`, apply it to property
  `.pyFirstName`, set the condition type to "Property is required", and set the message
  to "First name is required." The constraint fires when the form is submitted and
  `.pyFirstName` is blank.
- **Notes:** Three approaches exist with different scopes: (1) **Constraint rule** — most
  flexible; can add conditions (fire only when another field has a value); fires at flow
  action submit. (2) **Property rule `pyRequired`** — declared on the property itself;
  inherited by all views and flow actions referencing that property; broadest scope.
  (3) **View field required flag** — set in the section or view designer; applies only
  in that specific view. Constraint rules are preferred for business-rule-driven
  requirements because they can be conditional, localized, and targeted at a class
  hierarchy. Required validation fires **server-side** by default; to trigger client-side
  validation, the view must have client-side validation enabled. Null and empty string
  are both treated as missing values.
- **Status:** *(unvalidated)*

### Validate email format

- **How:** Property type set to `EmailAddress` for built-in format validation; alternatively,
  an Edit Validate rule (`Rule-Edit-Validate`) with a regex pattern; or a Constraint
  rule using `@(Pega-RulesEngine:String).pxContainsViaRegex()`
- **Where:** Property rules (built-in type), Edit Validate rules (attached to a property),
  Constraint rules (class-level)
- **Example:** Set the property type of `.pyEmailAddress` to `EmailAddress` in the
  Property rule. Pega validates the format automatically on submit. Alternatively, create
  an Edit Validate rule `ValidateEmailFormat` with the regex pattern
  `^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$` to validate `.pyCustomerEmail`.
- **Notes:** The `EmailAddress` property type is the simplest approach — no additional
  rule authoring required. However, the built-in pattern may be more or less strict than
  your business requirements. Edit Validate rules give you full control over the regex
  and the error message, and they attach directly to a property (reusable across all
  views). For cross-field or conditional email validation, use a Constraint rule.
  Regex must be written in Java regex syntax; backslashes require double-escaping in
  Pega expressions (`\\.` for a literal dot). The `EmailAddress` property type fires
  client-side and server-side; Edit Validate rules fire server-side.
- **Status:** *(unvalidated)*

### Validate date range (end after start)

- **How:** Constraint rule on the end-date property comparing it to the start-date
  property using the expression `.pyEndDate >= .pyStartDate`
- **Where:** Constraint rules, When rules (as a condition)
- **Example:** Create a Constraint rule on class `Work-MyApp-Project` targeting property
  `.pyEndDate`. Set the condition to `.pyEndDate < .pyStartDate` (constraint fires when
  violated) and the message to "End date must be after start date." Alternatively, write
  the When rule `IsEndDateValid` with condition `.pyEndDate >= .pyStartDate` and reference
  it in the Constraint rule.
- **Notes:** Date comparison in Pega expressions uses the underlying BigDecimal
  representation — standard comparison operators (`<`, `>`, `>=`, `<=`) work correctly
  for date properties. **Null handling is critical:** if either date is blank/null, the
  comparison may return `false` or behave unexpectedly. Guard with a blank check: only
  fire the constraint when both dates are populated. Example guard condition on the
  constraint: fire only when `.pyStartDate != ""` AND `.pyEndDate != ""`. For
  datetime properties, use the same operators; precision differences (date vs. datetime)
  are handled automatically. Cross-field constraint rules should be placed on the class
  rather than on a single property for clarity.
- **Status:** *(unvalidated)*

### Validate minimum list size

- **How:** Constraint rule checking PageList count using `@countOf(.pyPageListProperty) > 0`
  or `@countOf(.pyPageListProperty) >= minimumCount`
- **Where:** Constraint rules
- **Example:** Create a Constraint rule on class `Work-MyApp-Order` with condition
  `@countOf(.pyLineItems) < 1` (constraint fires when violated) and message "At least one
  line item is required." To require at least two: `@countOf(.pyLineItems) < 2`.
- **Notes:** `@countOf()` is the standard Pega function for counting items in a PageList
  or PageGroup. It returns 0 for a null or empty list — no null guard needed. The
  constraint should target a scalar property on the same class (e.g., `.pyLabel`) rather
  than the PageList property itself, since constraint rules target scalar properties.
  Alternatively, associate the constraint with the class and rely on class-level
  validation. For more complex rules (e.g., at least one item where a sub-property meets
  a condition), use a When rule or Declare Expression to compute a count property, then
  constrain that computed property.
- **Status:** *(unvalidated)*

### Custom validation message

- **How:** The `pyMessage` field on a Constraint rule accepts either a `Rule-Message`
  rule key (for localization) or literal inline text (for simple cases). For dynamic
  values embedded in the message, use a `Rule-Message` rule with `FormatMessage()`.
- **Where:** Constraint rules, Edit Validate rules
- **Example:** Simple inline text: set `pyMessage` to `"Value must be between 1 and 100."` —
  Pega displays this text directly. For localization: set `pyMessage` to
  `"myapp-OrderAmountOutOfRange"` (a `Rule-Message` key) and store locale-specific text
  in that Rule-Message rule; or call `@(Pega-RULES:String).FormatMessage("myapp-OrderAmountOutOfRange")`
  from the message field.
- **Notes:** **Two approaches:** (1) **Inline text** — simple, no additional rule needed,
  not localizable. (2) **`Rule-Message` key** — supports localization; Pega resolves the
  right locale based on the operator's language. The `pyMessage` field SmartPrompt
  points to `Rule-Message` rules by default, but plain text is also accepted. **Dynamic
  values:** embedding property values directly in constraint messages (e.g., inline
  substitution like `"Value must be between {.pyMin} and {.pyMax}"`) is unconfirmed
  from platform source and requires validation on a live instance. Use `Rule-Message`
  rules with `FormatMessage()` for reliable localized messages with dynamic content.
  Messages appear in the field-level error region. If multiple constraints fire on the
  same property, all messages are shown. Keep messages concise — one sentence.
- **Status:** *(unvalidated)*

### Validate phone number format

- **How:** Edit Validate rule (`Rule-Edit-Validate`) with a regex pattern matching
  the expected phone format; or Constraint rule using
  `@(Pega-RulesEngine:String).pxContainsViaRegex()`
- **Where:** Edit Validate rules (attached to a property), Constraint rules (class-level)
- **Example:** Create an Edit Validate rule `ValidateUSPhone` with the regex pattern
  `^\d{3}-\d{3}-\d{4}$` to match US format `555-867-5309`. Attach it to the `.pyPhone`
  property by referencing `ValidateUSPhone` in the property's Edit Validate field. For
  an international format, use a more permissive pattern such as
  `^\+?[1-9]\d{1,14}$` (E.164 standard).
- **Notes:** Phone formats vary by region — choose the appropriate regex for your target
  market or use a permissive pattern that accepts multiple formats. Edit Validate rules
  are the standard Pega mechanism for format checking; they fire when the property's
  value is set (in a flow action or activity), not just at submit. If you need
  conditional phone validation (e.g., only when a country field equals "US"), use a
  Constraint rule instead. Regex backslashes must be double-escaped in Pega expressions
  (`\\d` not `\d`). The `pxContainsViaRegex` function with `useFind=false` (Matcher.matches)
  is recommended for full-string format validation.
- **Status:** *(unvalidated)*

### Validate postal/zip code format

- **How:** Edit Validate rule with a regex pattern appropriate for the target country;
  or Constraint rule with `@(Pega-RulesEngine:String).pxContainsViaRegex()`
- **Where:** Edit Validate rules, Constraint rules
- **Example:** For US ZIP codes: Edit Validate rule `ValidateUSZip` with regex
  `^\d{5}(-\d{4})?$` — matches both `90210` and `90210-1234`. For UK postcodes:
  `^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$`. Attach to the `.pyAddressPostalCode` property.
- **Notes:** Postal code formats differ significantly by country — a single regex cannot
  cover all formats. If your application serves multiple countries, consider making
  validation conditional: apply a country-specific pattern based on the value of a
  `.pyAddressCountry` or similar field, using a Constraint rule with a When condition.
  Alternatively, use a simple "non-blank" constraint and defer format validation to
  an integration layer. For US ZIP codes, also consider whether to allow the ZIP+4
  format (`12345-6789`). Regex in Pega expressions requires double-escaped backslashes
  (`\\d` not `\d`). Use `pxContainsViaRegex` with `useFind=false` for full-string match.
- **Status:** *(unvalidated)*

### Validate numeric range (min value, max value)

- **How:** Constraint rule with expression conditions on the numeric property: fire
  when `.pyAmount < minValue` or `.pyAmount > maxValue`
- **Where:** Constraint rules, When rules
- **Example:** Create a Constraint rule on class `Work-MyApp-Purchase` targeting
  `.pyPurchaseAmount`. Set condition to `.pyPurchaseAmount < 1 || .pyPurchaseAmount > 10000`
  with message "Purchase amount must be between $1.00 and $10,000.00." Or use two
  separate Constraint rules for clearer messages: one for too-low and one for too-high.
- **Notes:** Standard comparison operators (`<`, `>`, `<=`, `>=`) work correctly for
  numeric properties (Integer, Decimal). **Null handling:** if `.pyPurchaseAmount` is
  blank, the comparison may treat it as 0 — add a guard condition to only fire when
  the field is populated, or rely on a separate "required" constraint to catch the blank
  case. For properties with dynamic bounds (min/max stored in other properties), compare
  against those properties directly: `.pyAmount < .pyMinAmount`. Decimal precision: use
  `@round(.pyAmount, 2) == .pyAmount` if you also need to validate decimal places.
  Two separate constraints (min and max) are preferred over one compound condition
  because they produce clearer, targeted error messages.
- **Status:** *(unvalidated)*

### Validate string length (min length, max length)

- **How:** Constraint rule using `@(Pega-RULES:String).length(.pyProperty) < minLen`
  or `> maxLen`; or property-level `pyMaxLength` configuration
- **Where:** Constraint rules (for both min and max), Property rules (for max length only
  via `pyMaxLength`)
- **Example:** To enforce a minimum of 8 characters on `.pyPassword`: Constraint rule
  with condition `@(Pega-RULES:String).length(.pyPassword) < 8` and message "Password
  must be at least 8 characters." For a max of 50 characters: set `pyMaxLength = 50`
  on the Property rule (this also enforces it in the UI input field), OR add a Constraint
  with `@(Pega-RULES:String).length(.pyDescription) > 50`.
- **Notes:** **Max length via Property rule** (`pyMaxLength`): the simplest approach for
  maximum length — enforces both server-side and typically trims or blocks input in
  the UI. **Min length via Constraint rule**: there is no `pyMinLength` equivalent —
  always use a Constraint rule. `@(Pega-RULES:String).length()` returns 0 for null
  or empty string — add a guard condition if you only want the length constraint to fire
  when the field is non-empty (e.g., use a separate "required" constraint for blank
  checking, and only apply the length constraint when `.pyPassword != ""`). UTF-16 note:
  `length()` counts Java UTF-16 code units; supplementary characters (emoji, some CJK)
  count as 2. This rarely affects business data but worth noting for user-facing
  text fields.
- **Status:** *(unvalidated)*

### Create an edit validate rule

- **How:** Create a `Rule-Edit-Validate` rule; define a regex pattern or Java
  expression that returns `true` for valid input; attach it to a Property rule via the
  "Edit validate" field
- **Where:** Edit Validate rules (standalone rule type); referenced from Property rules
- **Example:** Create Edit Validate rule `ValidatePositiveInteger` in class `@baseclass`,
  set the expression to `@(Pega-RULES:String).isInteger(.pyValue) && @(Pega-RULES:String).toInt(.pyValue) > 0`.
  Then on the `pyQuantity` Property rule, set the "Edit validate" field to
  `ValidatePositiveInteger`. The rule fires whenever `pyQuantity` is set to a value
  that fails the expression.
- **Notes:** Edit Validate rules are reusable validators that attach directly to a
  property — they fire everywhere that property is used, regardless of the flow action
  or view. The rule expression can be a regex pattern (Pega tests the value against it)
  or a full expression returning Boolean. **Scope:** place in `@baseclass` for cross-class
  reuse, or in a specific class for domain-specific validation. **Timing:** fires when
  the property value is submitted (server-side), not on keypress. **Difference from
  Constraint rules:** Edit Validate rules are property-scoped and always apply; Constraint
  rules are class-scoped and can be conditional. Use Edit Validate for format checks
  (always apply to this property type); use Constraint rules for business logic (apply
  only when certain conditions hold). Edit Validate rules show their error message
  next to the field, same as Constraint messages.
- **Status:** *(unvalidated)*

### Use a When rule as a constraint condition

- **How:** Reference a `Rule-Obj-When` rule in the Constraint rule's "Fire when" condition
  field — the constraint only fires when the When rule evaluates to `true`
- **Where:** Constraint rules (the When rule is referenced in the constraint's condition)
- **Example:** Create When rule `IsOrderConfirmed` with condition `.pyStatus == "Confirmed"`.
  Create a Constraint rule on `.pyShipDate` with message "Ship date is required for
  confirmed orders." Set the constraint's "Fire when" condition to `IsOrderConfirmed`.
  The constraint only fires when the order is in Confirmed status, making ship date
  effectively required only then.
- **Notes:** When rules used in Constraint conditions must be in the same class or a
  parent class (inheritance applies). The When rule is evaluated server-side when the
  constraint is checked — it has access to the full clipboard at that point.
  **Reusability advantage:** a shared When rule (e.g., `IsOrderEditable`) can be
  referenced by multiple Constraint rules, keeping validation logic consistent with
  business rules. **Performance:** When rules are cached — referencing them in
  constraints does not create significant overhead. If the constraint condition is simple
  (e.g., `.pyStatus == "Confirmed"`), you can also write it directly in the constraint's
  condition field without a separate When rule. Use a When rule when the condition is
  reused across multiple constraints or when it encapsulates non-trivial logic.
- **Status:** *(unvalidated)*

### Conditional required field

- **How:** Constraint rule with "Property is required" condition combined with a
  "Fire when" condition (When rule or inline expression) that defines when the field
  becomes required
- **Where:** Constraint rules
- **Example:** Make `.pyPhoneNumber` required only when `.pyContactMethod == "Phone"`.
  Create a Constraint rule on `.pyPhoneNumber`, set condition type to "Property is
  required", set "Fire when" to the inline condition `.pyContactMethod == "Phone"`,
  and set message "Phone number is required when contact method is Phone."
- **Notes:** This is the standard Pega pattern for conditional required fields —
  do NOT attempt to achieve this by conditionally showing/hiding fields in the view,
  as hidden fields do not suppress constraint evaluation. The constraint fires at
  flow action submit, checking both the "Fire when" condition and the required
  state. **Multiple conditions:** chain multiple conditions in the "Fire when" field
  using `&&` and `||` operators, or delegate to a When rule for complex logic.
  **Client-side behavior:** the conditional required indicator (asterisk) on the UI
  field updates dynamically only if client-side validation is enabled; otherwise it
  is server-side only. **Null vs. empty:** both null and `""` (empty string) satisfy
  the "required" check as missing — no special handling needed.
- **Status:** *(unvalidated)*

### Constraint rule inheritance (class hierarchy)

- **How:** Constraint rules are inherited through the Pega class hierarchy — a constraint
  on a parent class (e.g., `Work-`) automatically applies to all subclasses unless
  overridden
- **Where:** Constraint rules (rule resolution follows the class hierarchy)
- **Example:** A Constraint rule on `.pyLabel` in class `Work-` with message "Label is
  required" applies to all work types (`Work-MyApp-Order`, `Work-MyApp-Customer`, etc.)
  without needing to duplicate the rule. To override for a specific subclass, create
  a Constraint rule with the same name in that subclass — the subclass version wins
  due to rule resolution.
- **Notes:** Constraint rule resolution follows the standard Pega rule resolution order:
  class, ruleset version, availability. **Override pattern:** to suppress a parent
  constraint for a specific subclass, create a rule of the same name in the subclass
  with "Availability: Withdrawn" — this prevents the parent constraint from firing
  without deleting the parent rule. **Additive constraints:** Pega does NOT merge
  constraints — it resolves to one (the most specific one found). If you need both
  a generic and a specific constraint, give them different rule names. **Ruleset
  stacking:** constraints in higher-priority rulesets override lower-priority ones;
  useful for app-specific overrides of platform-level validation. Place shared validation
  on `@baseclass` or `Work-` for broad applicability; place application-specific
  constraints in the application class.
- **Status:** *(unvalidated)*

### Validate a field using a custom regular expression

- **How:** Edit Validate rule with a regex pattern, or Constraint rule using
  `@(Pega-RulesEngine:String).pxContainsViaRegex(.pyProperty, "pattern", false)`
- **Where:** Edit Validate rules (preferred for property-level format validation),
  Constraint rules (for conditional or class-level regex checks), When rules
- **Example:** To validate that `.pyProductCode` matches exactly 3 uppercase letters
  followed by 4 digits: create Edit Validate rule `ValidateProductCode` with regex
  pattern `^[A-Z]{3}\\d{4}$`. Alternatively, Constraint rule: condition
  `!@(Pega-RulesEngine:String).pxContainsViaRegex(.pyProductCode, "^[A-Z]{3}\\d{4}$", false)`
  with message "Product code must be 3 uppercase letters followed by 4 digits (e.g., ABC1234)."
- **Notes:** **Edit Validate vs. Constraint for regex:** Edit Validate rules have a
  dedicated regex field (cleaner for pure format validation); Constraint rules require
  writing the regex in an expression call (more verbose but supports conditions).
  **Double-escaping:** in Pega expressions and Edit Validate regex fields, backslashes
  must be double-escaped: `\\d` (not `\d`), `\\.` (not `.`), `\\s` (not `\s`).
  **`useFind` parameter:** `pxContainsViaRegex(value, pattern, false)` uses
  `Matcher.matches()` — the entire string must match. `pxContainsViaRegex(value, pattern, true)`
  uses `Matcher.find()` — matches anywhere in the string. For format validation,
  always use `false` (full-string match). **Anchors:** even with `useFind=true`, use
  `^` and `$` anchors to prevent partial matching. Regex compilation errors are caught
  gracefully — returns `false` without throwing an exception.
- **Status:** *(unvalidated)*

### Client-side vs. server-side validation behavior

- **How:** Pega validation fires at two points: (1) **client-side** — in the browser,
  before the form is submitted, using JavaScript generated from constraint/required
  rules; (2) **server-side** — on the Pega server, when the flow action is processed
- **Where:** Both apply to Constraint rules, Edit Validate rules, and required field
  configuration; server-side only applies to validation in Activities and Data Transforms
- **Example:** A Constraint rule with "Property is required" fires both client-side
  (immediate feedback, no round trip) and server-side (authoritative check). An
  Activity that validates business logic runs server-side only. Client-side validation
  is generated automatically for simple constraint patterns when the section/view has
  client-side validation enabled in its properties.
- **Notes:** **Client-side validation is not a security control** — it is a UX feature.
  All validation that matters for data integrity must also be enforced server-side.
  **Not all constraints fire client-side:** only simple constraint types (required,
  Edit Validate, some comparison constraints) generate client-side JavaScript. Complex
  constraints with When rule conditions, cross-field comparisons, or `@function()` calls
  may be server-side only. **Enabling client-side validation:** in the section designer,
  check the "Perform on client" checkbox (or equivalent in your Pega version) to
  activate client-side validation for a section. **Timing:** client-side validation
  fires on field blur (leaving the field) and on form submit; server-side validation
  fires on form submit only (flow action processing). **When rules in constraints:**
  When rules referenced in constraint "Fire when" conditions are generally evaluated
  server-side only.
- **Status:** *(unvalidated)*

### Validation timing (when do constraints fire)

- **How:** Constraint rules fire during flow action processing on the Pega server.
  By default, they fire when the user submits the flow action (clicks Save/Submit).
  Client-side constraints also fire on field blur if client-side validation is enabled.
- **Where:** Constraint rules (class-level), Edit Validate rules (property-level),
  View field required configuration
- **Example:** In a case management flow, when the user fills in a form and clicks
  "Submit", Pega: (1) evaluates all Constraint rules applicable to the case's class
  in the current context; (2) evaluates Edit Validate rules for each submitted property;
  (3) if any fail, returns validation errors to the UI — the flow action does not advance.
  Only when all validations pass does Pega proceed with the flow action's data transforms
  and routing.
- **Notes:** **Constraints fire on submit, not on change** (server-side). This means
  a user can enter an invalid value and tab away without an error — the error only
  appears on submit, unless client-side validation is enabled and the constraint supports
  it. **Constraint context:** constraints fire against the clipboard state at submit
  time — they see any data transforms run before validation but not post-validation
  transforms. **Data Transform validation:** if you call validation inside a Data
  Transform, it runs when the Data Transform executes (not at submit). **Activities:**
  validation in Activities (using "Validate" methods) fires when the activity runs.
  **Cascading:** if a required field is blank, its constraint fires; subsequent
  constraints that reference that field may or may not fire depending on the order
  and short-circuit evaluation. **Order of constraint evaluation:** Pega evaluates
  all applicable constraints for a class — the order is not guaranteed; design
  constraints to be independent.
- **Status:** *(unvalidated)*

### Error message display and localization

- **How:** Constraint rule messages appear in the field-level error region of the view;
  the `pyMessage` field accepts inline literal text or a `Rule-Message` key; for
  localization, reference a `Rule-Message` rule via `@(Pega-RULES:String).FormatMessage()`
- **Where:** Constraint rules, Edit Validate rules, and validation message fields
- **Example:** Inline text: set `pyMessage` to `"Ship date is required."` For a
  localized message: (1) create a `Rule-Message` rule named `myapp-ShipDateRequired`
  in the appropriate ruleset; (2) in the Constraint rule message field, enter
  `@(Pega-RULES:String).FormatMessage("myapp-ShipDateRequired")`. The operator's locale
  determines which language is used.
- **Notes:** **`Rule-Message` rules** are the Pega-native localization mechanism —
  create one per locale as needed (Pega resolves the right one based on operator locale).
  **Inline text** is also valid for non-localized applications. **Dynamic property
  substitution** (embedding a property value in the message string at runtime) is
  unconfirmed from platform source — requires validation on a live instance.
  **Multiple errors:** if multiple constraints fire on the same property, all their
  messages are shown stacked in the error region. **Harness vs. section:** error display
  depends on the harness configuration; standard Pega harnesses show errors inline next
  to the field. **Error summary section:** some UX patterns also display a summary of
  all errors at the top of the form (using the `pyMessages` property or similar).
  **HTML in messages:** basic HTML (`<b>`, `<i>`) is generally rendered, but avoid
  complex markup; keep messages plain-text where possible for localization clarity.
- **Status:** *(unvalidated)*

---

## Notes

- **Constraint rule vs. Edit Validate rule:** Use Edit Validate (`Rule-Edit-Validate`)
  for property-level format checks that always apply (phone format, postal code format,
  email pattern). Use Constraint rules (`Rule-Declare-Constraints`) for business-logic
  validation that may be conditional, cross-field, or class-specific (required when
  status is X, end date after start date, at least one item).

- **Constraint evaluation order:** Pega evaluates all applicable constraints for a
  class during flow action submission — the evaluation order is not guaranteed.
  Design constraints to be independent of each other. If one constraint's message
  would be confusing without another constraint having fired (e.g., a length check
  on a field that might be empty), use a single constraint with a combined condition,
  or ensure a "required" constraint handles the blank case separately.

- **Client-side vs. server-side differences:** Client-side validation (in-browser)
  fires for simple constraint patterns when enabled on the section. It is a UX feature
  only — never rely on it for security or data integrity. Server-side validation
  (on submit, during flow action processing) is always authoritative. Complex constraints
  (with When rules, function calls, or cross-field logic) are typically server-side only.

- **Validation in Data Transforms vs. Flow Actions:** Constraint rules and Edit Validate
  rules fire automatically during flow action submit processing. Inside a Data Transform,
  validation does not fire automatically — you must explicitly call a Validate rule or
  activity method to trigger validation logic. In Activities, use the "Validate" step
  method to trigger constraint evaluation programmatically.

- **Error message best practices:** (1) Be specific about what is wrong and what the
  valid input is. (2) Avoid technical jargon — write for the end user. (3) Use
  `Rule-Message` rules for dynamic, localized messages; reference them via
  `@(Pega-RULES:String).FormatMessage("messageKey")`. (4) Use `Rule-Message` rules for
  multi-language support. (5) Keep messages short — one sentence per constraint.
  (6) Name Edit Validate rules with a `Validate` prefix (e.g., `ValidateEmailFormat`)
  for discoverability.

- **Null handling in constraint conditions:** Blank (null or empty string) properties
  behave differently in different comparison types. For numeric comparisons, a blank
  property may evaluate as 0. For string comparisons, a blank property evaluates as
  `""`. For date comparisons, a blank date property may cause unexpected behavior.
  Always use separate "required" constraints to handle blank fields, and guard
  format/range constraints to fire only when the field is non-empty, to avoid spurious
  error messages on optional fields.

- **Rule-Declare-Constraints class hierarchy and inheritance:** Constraint rules resolve
  through the class hierarchy. A constraint on `Work-` applies to all work types.
  To suppress an inherited constraint for a subclass, create a rule of the same name
  with "Availability: Withdrawn" in that subclass. To add constraints only for a
  specific class, place them in that class's ruleset. Do not duplicate constraints
  across the hierarchy — use inheritance and targeted overrides.

- **Regex double-escaping in Pega:** In Pega expressions and Edit Validate regex
  fields, backslashes must be doubled: `\\d` for a digit class, `\\.` for a literal
  dot, `\\s` for whitespace. The Pega expression parser consumes one level of escaping
  before the Java regex engine sees the pattern.
