---
description: "Pega standard library for string operations -- concatenation, trim, substring, case conversion, pattern matching"
---
# String Manipulation

Reusable Pega assets for working with text strings.

## Category Scope

- Concatenating strings
- Trimming whitespace
- Extracting substrings
- Splitting / extracting around delimiters
- Converting case (upper, lower)
- Finding and replacing text
- Pattern matching and regular expressions
- String length and comparison (equality, prefix, suffix)
- Type conversion (string to number, date, decimal)
- Type validation (checking if string is a valid integer or double)
- Encoding (URL, HTML/XSS, Base64)
- Null/empty/blank checking
- Character filtering (strip non-alphabetic, strip digits, special character detection)
- String truncation
- Localized message formatting
- Pluralization

## Bootstrap Hints

To populate this file during bootstrap:
- Search for string-related library functions and methods
- Look for `@baseclass` Function Aliases (`Rule-Alias-Function`) in the `String` library
- Inspect expression builder for available string functions
- Check `Rule-Utility-Function` rules in the `String` library (`Pega-RULES` and
  `Pega-RulesEngine` rulesets)
- Look for `Rule-Utility-Function` rules in the `Utilities` and `Default` libraries

---

## Function Alias Reference

Some `String` library functions have `@baseclass` Function Alias (`Rule-Alias-Function`)
shortcuts. These allow a shorter `@name()` syntax in expressions instead of the
fully-qualified `@(Pega-RULES:String).functionName()` form.

**Available aliases:**

| Alias | Pattern | Underlying Function |
|---|---|---|
| `@trim()` | "trim {1}" | `String trim` |
| `@substring()` (alias name: `subString`) | -- | `String substring` |
| `@inString()` | -- | `String inString` |
| `@replaceAll()` (alias name: `StringReplace`) | "in {1}, replace all occurrences of {2} with {3}" | `String replaceAll` |
| `@contains()` | "{1} contains {2}" | `String contains` |
| `@StringEqualsIgnoreCase()` | "{1} equals (ignore case) {2}" | `String equalsIgnoreCase` |
| `@StringNotEqualsIgnoreCase()` | "{1} does not equal (ignore case) {2}" | `String notEqualsIgnoreCase` |

**Important:** The `@StringEqualsIgnoreCase()` and `@StringNotEqualsIgnoreCase()` aliases
exist as `Rule-Alias-Function` rules but **do not resolve in Pega expressions**. Always
use the fully-qualified syntax `@(Pega-RULES:String).equalsIgnoreCase()` and
`@(Pega-RULES:String).notEqualsIgnoreCase()` instead. The other 5 aliases (`@trim`,
`@substring`, `@inString`, `@replaceAll`, `@contains`) work correctly.

All other `String` library functions require the fully-qualified syntax:
`@(Pega-RULES:String).functionName()` or `@(Pega-RulesEngine:String).functionName()`.

---

## Known Items

### Concatenate strings

- **How:** `+` operator in expressions
- **Where:** Expressions, Data Transforms, Declare Expressions, When rules
- **Example:** Set `.pyDisplayName` to `.pyFirstName + " " + .pyLastName`
- **Notes:** Both operands are coerced to strings. If either side is null, the `+`
  operator includes the literal text "null" -- guard with an empty check or default
  value first.
- **Status:** *(validated)*

### Convert to upper case

- **How:** `@(Pega-RULES:String).toUpperCase(value)` utility function
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** Set `.pyCode` to `@(Pega-RULES:String).toUpperCase(.pyInput)` --
  `"hello"` becomes `"HELLO"`
- **Notes:** No `@toUpper()` shorthand alias exists -- you must use the fully-qualified
  `@(Pega-RULES:String).toUpperCase()` syntax. Locale-sensitive. For Turkish-locale
  systems, `"i"` maps to `"İ"` not `"I"`. Returns `""` (empty string) if input is null.
  Java source: `if (InputString == null) return ""; return InputString.toUpperCase();`.
- **Status:** *(validated)*

### Convert to lower case

- **How:** `@(Pega-RULES:String).toLowerCase(value)` utility function
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** Set `.pyEmail` to `@(Pega-RULES:String).toLowerCase(.pyEmail)` --
  `"User@EXAMPLE.COM"` becomes `"user@example.com"`
- **Notes:** No `@toLower()` shorthand alias exists -- you must use the fully-qualified
  `@(Pega-RULES:String).toLowerCase()` syntax. Returns `""` (empty string) if input is
  null. Java source: `if (InputString == null) return ""; return InputString.toLowerCase();`.
  Useful for case-insensitive comparisons by lowering both sides before comparing.
- **Status:** *(validated)*

### Trim whitespace

- **How:** `@trim(value)` function (calls `@(Pega-RULES:String).trim()`)
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** Set `.pyName` to `@trim(.pyName)` -- `"  John  "` becomes `"John"`
- **Notes:** Removes leading and trailing whitespace (spaces, tabs, newlines). Does not
  affect whitespace between words. Returns `""` (empty string) if input is null. Java
  source: `if (str1 == null) return ""; return str1.trim();`. Has a `@baseclass`
  alias with pattern "trim {1}".
- **Status:** *(validated)*

### Strip digits from a string

- **How:** `@(Pega-RULES:String).TrimNumber(input)` utility function
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:String).TrimNumber("ABC-123 def!")` returns `"ABC- def!"`
- **Notes:** Despite its name, this function removes all **digit** characters from the
  string, keeping everything else (letters, punctuation, whitespace). Uses Java's
  `Character.isDigit()` internally. No `@baseclass` alias exists. Availability: Yes.
  Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Extract substring

- **How:** `@substring(value, beginIndex, endIndex)` function (alias: `subString`,
  calls `@(Pega-RULES:String).substring()`)
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@substring(.pyAccountNumber, 0, 4)` -- `"ACCT1234"` returns `"ACCT"`
- **Notes:** **Zero-based indices.** `beginIndex` is inclusive, `endIndex` is exclusive.
  A two-argument overload also exists: `@substring(value, beginIndex)` returns from
  `beginIndex` to end of string. Throws an error if indices are out of range -- guard
  with `@(Pega-RULES:String).length()` first. Has a `@baseclass` alias (`subString`).
- **Status:** *(validated)*

### Extract left N characters

- **How:** `@substring(value, 0, count)` in expressions
- **Where:** Expressions, Data Transforms
- **Example:** `@substring(.pyPostalCode, 0, 5)` -- extracts `"90210"` from
  `"90210-1234"`
- **Notes:** No `@left()` expression function or `@baseclass` alias exists. Use
  `@substring(value, 0, count)` as the equivalent. Guard with
  `@(Pega-RULES:String).length()` to avoid index-out-of-range errors when `count`
  exceeds string length.
- **Status:** *(validated)*

### Extract right N characters

- **How:** `@substring(value, @(Pega-RULES:String).length(value) - count,
  @(Pega-RULES:String).length(value))` in expressions
- **Where:** Expressions, Data Transforms
- **Example:** `@substring(.pyAccountNumber, @(Pega-RULES:String).length(.pyAccountNumber) - 4, @(Pega-RULES:String).length(.pyAccountNumber))`
  -- extracts last 4 digits
- **Notes:** No `@right()` expression function or `@baseclass` alias exists. Use
  `@substring` with computed start index. Guard against negative start index when
  the string is shorter than `count`.
- **Status:** *(validated)*

### Truncate a long string

- **How:** `@(Pega-RULES:String).truncateLongText(StringToUse, maxLength)` utility
  function
- **Where:** Expressions, Data Transforms, UI display
- **Example:** `@(Pega-RULES:String).truncateLongText(.pyDescription, 50)` -- if the
  description is longer than 50 characters, returns the first 47 characters followed by
  `"..."`; otherwise returns the full string
- **Notes:** When the input exceeds `maxLength` and `maxLength > 3`, returns
  `substring(0, maxLength - 3) + "..."`. Returns `""` for null input. The `maxLength`
  parameter is an `int`. Useful for truncating display values in grids, tooltips, or
  summary fields. No `@baseclass` alias exists. Availability: Yes. Library: `String`,
  `Pega-RULES`. Usage type: OutputFormatting.
- **Status:** *(validated)*

### Get string length

- **How:** `@(Pega-RULES:String).length(value)` utility function
- **Where:** Expressions, When rules, Declare Expressions
- **Example:** `@(Pega-RULES:String).length(.pyDescription) > 0` to check non-empty
- **Notes:** Returns 0 for null or empty string. Counts characters, not bytes --
  multi-byte Unicode characters count as 1 (but supplementary characters count as 2
  due to UTF-16). Java source: `if (str1 == null) return 0; return str1.length();`.
  No `@baseclass` alias exists -- use the fully-qualified syntax.
- **Status:** *(validated)*

### Find position of substring (inString)

- **How:** `@inString(mainString, substring)` function (calls
  `@(Pega-RULES:String).inString()`)
- **Where:** Expressions, When rules
- **Example:** `@inString(.pyEmail, "@")` -- returns the zero-based position of `"@"` in
  the email string, or `-1` if not found
- **Notes:** Has a `@baseclass` alias. Returns an **integer** (zero-based). Returns `-1`
  when not found. Case-sensitive. Use `@inString(.pyValue, "text") >= 0` as a contains
  check. Java source: `str1.indexOf(str2)`.
- **Status:** *(validated)*

### Find position of substring (indexOf)

- **How:** `@(Pega-RULES:String).indexOf(strStringToSearch, strStringToSearchFor)`
  utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).indexOf(.pyEmail, "@")` -- returns zero-based
  position, or `-1` if not found
- **Notes:** Functionally identical to `inString` (both use Java's `String.indexOf()`).
  The difference: `indexOf` is marked **Final** (API method, cannot be overridden) and
  has **no** `@baseclass` alias. Prefer `@inString()` for its shorter alias syntax
  unless you specifically need the Final-availability guarantee. Java source:
  `strStringToSearch.indexOf(strStringToSearchFor)`, returns `-1` for null.
- **Status:** *(validated)*

### Check if string contains a substring

- **How:** `@contains(value, searchString)` function (calls
  `@(Pega-RULES:String).contains()`)
- **Where:** Expressions, When rules
- **Example:** `@contains(.pyDescription, "urgent")` returns true if found
- **Notes:** Case-sensitive. Has a `@baseclass` alias with pattern "{1} contains {2}".
  Null-safe: returns false if either argument is null. Uses `indexOf` internally.
  For case-insensitive containment, normalize both sides with
  `@(Pega-RULES:String).toLowerCase()` first. For regex-based containment,
  use `@pxContainsViaRegex(input, regex, true)`.
- **Status:** *(validated)*

### Check if string contains a regex pattern

- **How:** `@(Pega-RulesEngine:String).pxContainsViaRegex(input, regexPattern, useFind)`
  utility function
- **Where:** Expressions, Data Transforms, When rules
- **Example:** `@(Pega-RulesEngine:String).pxContainsViaRegex(.pyLabel, "[a-zA-Z]{3}", true)` --
  checks if the label contains at least three consecutive letters
- **Notes:** When `useFind` is `true`, uses Java `Matcher.find()` (matches any PART of
  the input). When `false`, uses `Matcher.matches()` (matches the ENTIRE input). Catches
  regex compilation exceptions and returns false. No `@baseclass` alias exists.
  Availability: Final. Library: `String`, `Pega-RulesEngine`.
- **Status:** *(validated)*

### Check if string starts with a prefix

- **How:** `@(Pega-RULES:String).startsWith(value, prefix)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).startsWith(.pyAccountNumber, "ACCT")` -- returns true
  if account number begins with `"ACCT"`
- **Notes:** Case-sensitive. Uses Java's `String.startsWith()` directly. No `@baseclass`
  alias exists -- use the fully-qualified syntax. **Not null-safe** -- throws
  `NullPointerException` if `str1` is null. Guard with a null/empty check before calling.
  Java source: `return str1.startsWith(str2);` (no null guard).
- **Status:** *(validated)*

### Check if string starts with an alphabetic character

- **How:** `@(Pega-RulesEngine:String).pxStartsWithAlphaCharacter(inputText)` utility
  function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RulesEngine:String).pxStartsWithAlphaCharacter(.pyLabel)` --
  returns true if the first character is a letter (a-z or A-Z)
- **Notes:** Only checks ASCII letters (a-z, A-Z), not Unicode letters. Returns false
  for null input. No `@baseclass` alias exists. Availability: Final. Library: `String`,
  `Pega-RulesEngine`. Added in ruleset version 08-25.
- **Status:** *(validated)*

### Check if string ends with a suffix

- **How:** `@(Pega-RULES:String).endsWith(value, suffix)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).endsWith(.pyEmail, ".com")` -- returns true if email
  ends with `".com"`
- **Notes:** Case-sensitive. Uses Java's `String.endsWith()` directly. No `@baseclass`
  alias exists -- use the fully-qualified syntax. **Not null-safe** -- throws
  `NullPointerException` if `str1` is null. Guard with a null/empty check before calling.
  Java source: `return str1.endsWith(str2);` (no null guard).
- **Status:** *(validated)*

### Compare strings (equality -- expression operator)

- **How:** `==` operator in expressions
- **Where:** Expressions, When rules, Data Transforms (conditions)
- **Example:** `.pyStatus == "Open"` -- case-sensitive string comparison
- **Notes:** String comparison with `==` in Pega expressions is case-sensitive. For
  case-insensitive comparison, use `@(Pega-RULES:String).equalsIgnoreCase()` (see below)
  or normalize both sides with `@(Pega-RULES:String).toLowerCase()`. Null-safe:
  comparing null to a non-null string returns false without error.
- **Status:** *(validated -- expression-language operator, not a rule-based asset)*

### Compare strings (equality -- utility function)

- **How:** `@(Pega-RULES:String).equals(str1, str2)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).equals(.pyStatus, "Open")` -- returns true if equal
- **Notes:** Case-sensitive. Returns false if either argument is null (null-safe). Uses
  Java's `String.equals()`. No `@baseclass` alias exists. This is functionally
  equivalent to the `==` operator for strings but available as a utility function.
  Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Compare strings (equality -- case-insensitive)

- **How:** `@(Pega-RULES:String).equalsIgnoreCase(str1, str2)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).equalsIgnoreCase(.pyStatus, "open")` -- returns true
  if equal regardless of case
- **Notes:** A `@baseclass` alias `@StringEqualsIgnoreCase()` exists with pattern
  "{1} equals (ignore case) {2}", but **the alias does not resolve in Pega expressions**.
  Always use the fully-qualified `@(Pega-RULES:String).equalsIgnoreCase()` syntax.
  Returns false if either argument is null (null-safe). Uses Java's
  `String.equalsIgnoreCase()`. Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Compare strings (not equal -- expression operator)

- **How:** `!=` operator in expressions
- **Where:** Expressions, When rules, Data Transforms (conditions)
- **Example:** `.pyStatus != "Resolved"` -- true when status is anything other than
  `"Resolved"`
- **Notes:** Same case-sensitivity and null-safety behavior as `==`.
- **Status:** *(validated -- expression-language operator, not a rule-based asset)*

### Compare strings (not equal -- utility function)

- **How:** `@(Pega-RULES:String).notEquals(str1, str2)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).notEquals(.pyStatus, "Resolved")` -- returns true if
  not equal
- **Notes:** Case-sensitive. Returns true if either argument is null (treats null as
  not-equal to anything). Uses `!str1.equals(str2)`. No `@baseclass` alias exists.
  Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Compare strings (not equal -- case-insensitive)

- **How:** `@(Pega-RULES:String).notEqualsIgnoreCase(str1, str2)` utility function
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:String).notEqualsIgnoreCase(.pyStatus, "resolved")` -- returns
  true if not equal regardless of case
- **Notes:** A `@baseclass` alias `@StringNotEqualsIgnoreCase()` exists with pattern
  "{1} does not equal (ignore case) {2}", but **the alias does not resolve in Pega
  expressions**. Always use the fully-qualified
  `@(Pega-RULES:String).notEqualsIgnoreCase()` syntax. Returns true if either argument
  is null. Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Replace all occurrences of a substring

- **How:** `@replaceAll(value, target, replacement)` function (alias: `StringReplace`,
  calls `@(Pega-RULES:String).replaceAll()`)
- **Where:** Expressions, Data Transforms
- **Example:** `@replaceAll(.pyAddress, "\n", ", ")` -- replaces newlines with commas
- **Notes:** **Does plain-text replacement** (not regex). The underlying Java source uses
  `indexOf` to find matches, not Java's regex `String.replaceAll()`. Returns `""` for
  null inputs. Has a `@baseclass` alias (`StringReplace`) with pattern: "in {1}, replace
  all occurrences of {2} with {3}". For **regex-based replacement**, use
  `@pxReplaceAllViaRegex()` instead.
- **Status:** *(validated)*

### Replace all occurrences using a regular expression

- **How:** `@(Pega-RulesEngine:String).pxReplaceAllViaRegex(input, regexPattern, replacement)`
  utility function
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RulesEngine:String).pxReplaceAllViaRegex(.pyLabel, "[^a-zA-Z\\s]", "")` --
  removes all non-letter, non-whitespace characters
- **Notes:** Calls Java's `input.replaceAll(regularExpression, stringToInsert)` directly.
  Backslashes must be double-escaped in Pega expressions (`\\d`, `\\.`). Unlike
  `@replaceAll` which does plain-text matching, this interprets the target as regex.
  No `@baseclass` alias exists. Availability: Final. Library: `String`,
  `Pega-RulesEngine`.
- **Status:** *(validated)*

### Check if a string is blank or null

- **How:** `@(Pega-RULES:String).pxIsBlank(inputString)` utility function
- **Where:** Expressions, When rules, Declare Expressions
- **Example:** `@(Pega-RULES:String).pxIsBlank(.pyName)` -- returns true if null, empty,
  or contains only whitespace
- **Notes:** Java source: `if (inputString == null) return true; return
  inputString.trim().length() == 0;`. This is simpler than the manual pattern
  `@(Pega-RULES:String).length(@trim(value)) == 0`. No `@baseclass` alias exists.
  Availability: Final. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Check if string contains special characters

- **How:** `@(Pega-RulesEngine:String).pxContainsSpecialCharacters(input)` or
  `@(Pega-RulesEngine:String).pxContainsSpecialCharacters(input, allowedCharactersList)`
  utility function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RulesEngine:String).pxContainsSpecialCharacters(.pyLabel)` --
  returns true if the label contains special characters
- **Notes:** Unicode-aware; checks DB unicode support at runtime. The two-argument
  overload lets you specify characters that should be allowed (not treated as special).
  Complex internal logic that handles different character categories. No `@baseclass`
  alias exists. Availability: Final. Library: `String`, `Pega-RulesEngine`.
- **Status:** *(validated)*

### Match a string against a regular expression

- **How:** `@(Pega-RulesEngine:String).pxContainsViaRegex(value, regexPattern, false)`
  for full-string match
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RulesEngine:String).pxContainsViaRegex(.pyPhone, "^\\d{3}-\\d{3}-\\d{4}$", false)` --
  validates US phone format using `Matcher.matches()` (entire string must match)
- **Notes:** `pxContainsViaRegex` with `useFind=false` calls Java `Matcher.matches()`
  which requires the ENTIRE input to match the pattern. With `useFind=true` it calls
  `Matcher.find()` which matches any part. Uses Java regex syntax. Backslashes must be
  double-escaped in expressions. Catches exceptions gracefully and returns false on
  invalid regex.
- **Status:** *(validated)*

### Extract text after a character (first occurrence)

- **How:** `@(Pega-RULES:String).whatComesAfterFirst(input, token)` utility function
- **Where:** Expressions, Data Transforms, When rules
- **Example:** `@(Pega-RULES:String).whatComesAfterFirst("user@example.com", '@')` returns
  `"example.com"`
- **Notes:** The `token` parameter is a single `char`, not a String -- use single quotes
  (`'@'`) not double quotes (`"@"`) in expressions. Returns `""` (empty
  string) if the token is not found in the input. Useful for parsing delimited values
  like email domains or file extensions. No `@baseclass` alias exists. Availability:
  Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Extract text after a character (last occurrence)

- **How:** `@(Pega-RULES:String).whatComesAfterLast(input, token)` utility function
- **Where:** Expressions, Data Transforms, When rules
- **Example:** `@(Pega-RULES:String).whatComesAfterLast("path/to/file.txt", '/')` returns
  `"file.txt"`
- **Notes:** The `token` parameter is a single `char`, not a String -- use single quotes
  (`'/'`) not double quotes (`"/"`) in expressions. Returns `""` (empty
  string) if the token is not found. Useful for extracting file names from paths or the
  last segment of a delimited string. No `@baseclass` alias exists. Availability: Yes.
  Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Extract text before a character (first occurrence)

- **How:** `@(Pega-RULES:String).whatComesBeforeFirst(input, token)` utility function
- **Where:** Expressions, Data Transforms, When rules
- **Example:** `@(Pega-RULES:String).whatComesBeforeFirst("user@example.com", '@')` returns
  `"user"`
- **Notes:** The `token` parameter is a single `char`, not a String -- use single quotes
  (`'@'`) not double quotes (`"@"`) in expressions. Returns the **whole
  input string** if the token is not found (different from `whatComesAfterFirst` which
  returns `""`). No `@baseclass` alias exists. Availability: Yes. Library: `String`,
  `Pega-RULES`.
- **Status:** *(validated)*

### Extract text before a character (last occurrence)

- **How:** `@(Pega-RULES:String).whatComesBeforeLast(input, token)` utility function
- **Where:** Expressions, Data Transforms, When rules
- **Example:** `@(Pega-RULES:String).whatComesBeforeLast("path/to/file.txt", '/')` returns
  `"path/to"`
- **Notes:** The `token` parameter is a single `char`, not a String -- use single quotes
  (`'/'`) not double quotes (`"/"`) in expressions. Returns the **whole
  input string** if the token is not found (different from `whatComesAfterLast` which
  returns `""`). No `@baseclass` alias exists. Availability: Yes. Library: `String`,
  `Pega-RULES`.
- **Status:** *(validated)*

### Strip non-alphabetic characters

- **How:** `@(Pega-RULES:String).stripNonAlphabeticChars(input)` utility function
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:String).stripNonAlphabeticChars("ABC-123 def!")` returns
  `"ABCdef"`
- **Notes:** Removes all characters that are not letters (digits, punctuation, whitespace
  are stripped). Uses Java's `Character.isLetter()` internally, so Unicode letters
  (accented characters, CJK, etc.) are preserved. No `@baseclass` alias exists.
  Availability: Final. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Remove characters from the end of a string

- **How:** `@(Pega-RULES:String).stripCharsOffEnd(InputString, NumCharsToBeRemoved)`
  utility function
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:String).stripCharsOffEnd("Hello World", "5")` returns
  `"Hello "` -- removes the last 5 characters
- **Notes:** The `NumCharsToBeRemoved` parameter is a **String** (not an int) -- it is
  parsed to an integer internally. If parsing fails (non-numeric value), the original
  string is returned unchanged. Returns `""` for null input. No `@baseclass` alias
  exists. Availability: Yes. Library: `String`, `Pega-RULES`. Usage type:
  OutputFormatting.
- **Status:** *(validated)*

### Convert a string to an integer

- **How:** `@(Pega-RULES:String).toInt(input)` utility function
- **Where:** Expressions, Data Transforms, Decision Trees, Map Values
- **Example:** `@(Pega-RULES:String).toInt("42")` returns `42`;
  `@(Pega-RULES:String).toInt("abc")` returns `0`
- **Notes:** Returns `0` if the string is improperly formatted (does not throw an error).
  Uses locale-aware parsing internally (`PRNumberFormat.parseLocalizedAsInteger`). This
  is safer than property-type coercion for untrusted input since it never throws. No
  `@baseclass` alias exists. Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Convert a string to a date (BigDecimal)

- **How:** `@(Pega-RULES:String).toDate(input)` utility function
- **Where:** Expressions, Data Transforms, Decision Trees, Map Values
- **Example:** `@(Pega-RULES:String).toDate("20240101T000000.000 GMT")` returns `19723`
  (a BigDecimal representing the date as a day count)
- **Notes:** Converts a string to a BigDecimal representing a Pega date as a day count
  (not a Unix timestamp). For example, `"20240101T000000.000 GMT"` returns `19723`.
  Returns `BigDecimal.ZERO` on error (does not throw). No `@baseclass` alias exists.
  Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Convert a string to a decimal

- **How:** `@(Pega-RULES:String).toDecimal(input)` utility function
- **Where:** Expressions, Data Transforms, Decision Trees, Map Values
- **Example:** `@(Pega-RULES:String).toDecimal("123.45")` returns `123.45` as a BigDecimal
- **Notes:** Converts a string to a BigDecimal. Returns `BigDecimal.ZERO` if the number is
  improperly formatted (does not throw). Uses `en_US` locale for parsing (always uses
  period as decimal separator, regardless of operator locale). No `@baseclass` alias
  exists. Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Convert a number to a string

- **How:** Concatenate with an empty string: `"" + .pyNumericValue`
- **Where:** Expressions, Data Transforms
- **Example:** Set `.pyIDString` to `"" + .pyIDNumber` -- converts integer `42` to
  string `"42"`
- **Notes:** The `+` operator with a string operand forces coercion. Be aware that
  decimal values may produce unexpected precision (e.g., `1.1` may become
  `"1.1000000000000001"`) -- use `@round` before conversion if formatting matters.
- **Status:** *(validated)*

### Check if a string is a valid integer

- **How:** `@(Pega-RULES:String).isInteger(strInput)` utility function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RULES:String).isInteger("42")` returns `true`;
  `@(Pega-RULES:String).isInteger("3.14")` returns `false`;
  `@(Pega-RULES:String).isInteger("abc")` returns `false`
- **Notes:** Determines if the string can be converted to a valid integer. Delegates to
  the engine's `StringUtils.isInteger()` method. Useful for input validation before
  calling `@(Pega-RULES:String).toInt()`. No `@baseclass` alias exists. Availability:
  Yes. Library: `String`, `Pega-RULES`. Usage type: ConditionEvaluation.
- **Status:** *(validated)*

### Check if a string is a valid double

- **How:** `@(Pega-RULES:String).isDouble(strInput)` utility function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RULES:String).isDouble("3.14")` returns `true`;
  `@(Pega-RULES:String).isDouble("42")` returns `true`;
  `@(Pega-RULES:String).isDouble("abc")` returns `false`
- **Notes:** Determines if the string represents a valid double-precision number.
  Delegates to the engine's `StringUtils.isDouble()` method. Useful for input validation
  before calling `@(Pega-RULES:String).toDecimal()`. No `@baseclass` alias exists.
  Availability: Yes. Library: `String`, `Pega-RULES`. Usage type: ConditionEvaluation.
- **Status:** *(validated)*

### Base64-encode a string

- **How:** `@(Pega-RULES:String).pxBase64Encode(input)` utility function
- **Where:** Expressions, Data Transforms, Activities (Java steps)
- **Example:** `@(Pega-RULES:String).pxBase64Encode("Hello World")` returns
  `"SGVsbG8gV29ybGQ="`
- **Notes:** Uses Java's `Base64.getEncoder()` with UTF-8 charset. Returns `""` for null
  or empty input. Useful for encoding credentials or binary data for HTTP headers or
  integration payloads. No `@baseclass` alias exists. Availability: Final. Library:
  `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Format a localized message

- **How:** `@(Pega-RULES:String).FormatMessage(messageKey)` utility function
- **Where:** Expressions, Activities (Java steps)
- **Example:** `@(Pega-RULES:String).FormatMessage("pyTheLogicStringIsEmpty")` returns
  the localized text for that `Rule-Message` key
- **Notes:** Looks up a `Rule-Message` by key and returns its localized value for the
  current operator's locale. Uses `PublicAPI.formatMessage()` internally. No `@baseclass`
  alias exists. Availability: Yes. Library: `String`, `Pega-RULES`.
- **Status:** *(validated)*

### Get the plural form of a word

- **How:** `@(Pega-RulesEngine:String).pxGetPlural(word, count)` utility function
- **Where:** Expressions, Data Transforms, UI display
- **Example:** `@(Pega-RulesEngine:String).pxGetPlural("item", 1)` returns `"item"`;
  `@(Pega-RulesEngine:String).pxGetPlural("item", 3)` returns `"items"`
- **Notes:** Returns the plural form of the word when `count` is greater than 1; otherwise
  returns the word unchanged. The `count` parameter is an `int`. Delegates to the
  engine's `StringUtils.getPlural()` method. Useful for building natural-language messages
  like `count + " " + @(Pega-RulesEngine:String).pxGetPlural("record", count) + " found"`.
  No `@baseclass` alias exists. Availability: Final. Library: `String`,
  `Pega-RulesEngine`. Usage type: InputFormatting.
- **Status:** *(validated)*

### URL-encode a string

- **How:** `@(Default).pyFormatQueryStringPart(value)` utility function
  (`Rule-Utility-Function` in `Default` library, `Pega-IntegrationEngine` ruleset)
- **Where:** Activities (Java steps), Connect rules (URL building)
- **Example:** `@(Default).pyFormatQueryStringPart(.pySearchTerm)` -- `"hello world"`
  becomes `"hello+world"`
- **Notes:** First decodes (to avoid double-encoding) then encodes with UTF-8 using
  `java.net.URLEncoder.encode()`. Essential when building query parameters for
  Connect-REST rules. No `@baseclass` alias exists.
- **Status:** *(validated)*

### Escape a string as HTML

- **How:** `@(Pega-RULES:String).escapeAsHTML(stringAsHTML)` utility function
- **Where:** Expressions, Data Transforms, Activities (Java steps)
- **Example:** `@(Pega-RULES:String).escapeAsHTML("<b>Hello</b>")` returns
  `"&lt;b&gt;Hello&lt;/b&gt;"`
- **Notes:** Converts HTML-significant characters to their entity equivalents: `<` to
  `&lt;`, `>` to `&gt;`, `"` to `&quot;`, `'` to `&#39;`, `\` to `&#92;`, and `&` to
  `&amp;`. Similar to `@(Utilities).crossScriptingFilter()` but in the `String` library.
  Useful for preparing user input for safe HTML display. No `@baseclass` alias exists.
  Availability: Yes. Library: `String`, `Pega-RULES`. Usage type: OutputFormatting.
  **Testing note:** When testing via Run Rule or other UI tools, the escaped output
  (e.g., `&lt;b&gt;`) may be rendered back as HTML by the display layer, making it
  appear as if the function did not escape. Verify results via a tracer or log output
  instead.
- **Status:** *(validated)*

### HTML-encode a string (XSS prevention)

- **How:** `@(Utilities).crossScriptingFilter(value)` utility function
  (`Rule-Utility-Function` in `Utilities` library, `Pega-RULES` ruleset)
- **Where:** Activities (Java steps), custom HTML sections, correspondence templates
- **Example:** `@(Utilities).crossScriptingFilter("<script>alert('xss')</script>")` returns
  `"&lt;script&gt;alert('xss')&lt;/script&gt;"`
- **Notes:** Encodes characters like `<`, `>`, `&`, `"`, and `'` to their HTML entity
  equivalents. Critical for preventing cross-site scripting (XSS) when rendering user
  input in custom HTML sections or correspondence templates. Pega's standard UI controls
  handle encoding automatically, so this is only needed for custom rendering. No
  `@baseclass` alias exists. Availability: Final.
- **Status:** *(validated)*

### Join a list into a string

- **How:** `@(NLPUtility).pxJoin(propertyToJoin, separator, inputProperty)` utility
  function (`Rule-Utility-Function` in `NLPUtility` library, `Pega-NLP` ruleset)
- **Where:** Activities (Java steps), Data Transforms
- **Example:** `@(NLPUtility).pxJoin("pyLabel", ", ", .pyItems)` -- iterates the
  `.pyItems` list, extracts each page's `pyLabel` property, and joins them with `", "`
- **Notes:** Parameters: `propertyToJoin` (String -- the property name to extract from
  each page), `separator` (String), and `inputProperty` (ClipboardProperty -- the list
  to iterate). Originally from the NLP module but usable as a general-purpose join.
  Availability: Final. No `@baseclass` alias exists.
- **Status:** *(validated)*

---

## Notes

- **Null handling:** Most utility functions return null or a safe default when passed a
  null input rather than throwing an error. However, the `+` concatenation operator
  converts null to the literal string `"null"`. Always guard against null with a default
  value or empty check before concatenating.

- **Empty vs. blank:** An empty string (`""`) and a blank string (`"   "`) are different
  in Pega. `@(Pega-RULES:String).length("")` returns 0, but
  `@(Pega-RULES:String).length("   ")` returns 3. Use
  `@(Pega-RULES:String).pxIsBlank(value)` for the simplest blank check, or
  `@(Pega-RULES:String).length(@trim(value)) == 0` as an alternative.

- **Case sensitivity:** All string comparison and search functions (`==`, `@inString`,
  `@contains`, `@(Pega-RULES:String).startsWith()`,
  `@(Pega-RULES:String).endsWith()`) are case-sensitive by default. Use
  `@(Pega-RULES:String).equalsIgnoreCase()` for case-insensitive equality, or normalize
  with `@(Pega-RULES:String).toLowerCase()` / `@(Pega-RULES:String).toUpperCase()`
  before comparing.

- **Indexing:** Expression-layer functions (`@substring`, `@inString`, `indexOf`) use
  zero-based indexing (Java convention).

- **Multi-byte characters:** Pega uses Java's UTF-16 string representation.
  `@(Pega-RULES:String).length()` counts UTF-16 code units, so supplementary Unicode
  characters (emoji, some CJK characters) count as 2. This rarely matters for business
  data but can cause issues with length-limited fields storing international text.

- **Regex double-escaping:** In Pega expressions, backslashes in regex patterns must be
  double-escaped (`\\d`, `\\s`, `\\.`) because the expression parser consumes one level
  of escaping before the Java regex engine sees the pattern.

- **Performance with large strings:** String concatenation in a loop (e.g., building CSV
  output character by character in a For-Each) creates a new string object each iteration.
  For large datasets, prefer a Java step using `StringBuilder` or a custom
  Rule-Utility-Function.

- **`@replaceAll` vs. `@pxReplaceAllViaRegex`:** `@replaceAll` does **plain-text**
  replacement (uses `indexOf` internally, not regex). `@pxReplaceAllViaRegex` does
  **regex-based** replacement (calls Java's `String.replaceAll()`). If you need regex,
  use `@pxReplaceAllViaRegex`.

- **`whatComesAfter*` vs. `whatComesBefore*` asymmetry:** When the token is not found,
  `whatComesAfterFirst` and `whatComesAfterLast` return `""` (empty string), but
  `whatComesBeforeFirst` and `whatComesBeforeLast` return the **whole input string**.

- **`inString` vs. `indexOf`:** Both do the same thing (Java's `String.indexOf()`).
  `inString` has a `@baseclass` alias (`@inString()`); `indexOf` is marked Final and
  has no alias. Prefer `@inString()` for shorter syntax.

- **Function alias availability:** Only 5 String function aliases work reliably in Pega
  expressions: `@trim`, `@substring`, `@inString`, `@replaceAll`, and `@contains`.
  The `@StringEqualsIgnoreCase` and `@StringNotEqualsIgnoreCase` aliases exist as
  `Rule-Alias-Function` rules but **do not resolve in expressions** -- use
  `@(Pega-RULES:String).equalsIgnoreCase()` and
  `@(Pega-RULES:String).notEqualsIgnoreCase()` instead. All other String library
  functions require the fully-qualified `@(Pega-RULES:String).functionName()` or
  `@(Pega-RulesEngine:String).functionName()` syntax.

- **Char parameters in expressions:** The `whatComesAfterFirst`, `whatComesAfterLast`,
  `whatComesBeforeFirst`, and `whatComesBeforeLast` functions take a `char` parameter
  (not a `String`). In Pega expressions, use single quotes for char literals (`'@'`,
  `'/'`), not double quotes (`"@"`, `"/"`). Using double quotes causes an invalid
  expression error.
