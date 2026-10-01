---
description: "Pega standard library for numeric operations -- rounding, min/max, sum, currency formatting"
---
# Numeric and Math

Reusable Pega assets for numeric calculations, rounding, aggregation, and number
formatting.

## Category Scope

- Basic arithmetic in expressions (`+`, `-`, `*`, `/`)
- Comparison operators in expressions (`>`, `<`, `>=`, `<=`, `==`, `!=`)
- Rounding (to nearest integer, ceiling, floor)
- Min, max, absolute value
- Two-value aggregation (sum, average, median, mode, standard deviation)
- Square, square root, exponential, logarithm, power
- Division with precision control
- Random number generation
- Numeric guards and defaults (bounding a value to a range)
- Number formatting for display and currency
- Number parsing and conversion (text to integer, text to decimal, numeric to text)

## Bootstrap Hints

To populate this file during bootstrap:
- Search for `Rule-Utility-Function` rules in the `ExpressionEvaluators` library
  (`Pega-RULES` ruleset) -- this is the primary math function library
- Search for `Rule-Utility-Function` rules in the `Math` library (`Pega-RULES` ruleset)
- Search for `Rule-Utility-Function` rules in the `StrategyUtils` library
  (`Pega-DecisionEngine` ruleset) for power functions
- Search for `Rule-Utility-Function` rules in the `Random` library
  (`Pega-DecisionEngine` ruleset) for random number generation
- Search for `Rule-Alias-Function` rules on `@BASECLASS` with numeric names (`round`)
- Search for `Rule-Utility-Function` rules in the `Formatter` library for
  `pxFormatNumber` functions
- Inspect expression builder for available numeric functions
- Look for currency or formatting-related rules

---

## Function Alias Reference

One math function has a `@baseclass` Function Alias (`Rule-Alias-Function`) shortcut:

| Alias | Pattern | Underlying Function |
|---|---|---|
| `@round()` | "{1} rounded to the nearest integer value" | `ExpressionEvaluators round` |

**This document always uses fully qualified syntax** (e.g.,
`@(Pega-RULES:ExpressionEvaluators).round()`) rather than the alias shorthand. Fully
qualified syntax is unambiguous and works consistently across all expression contexts.

---

## Known Items

### Basic arithmetic in expressions

- **How:** `+`, `-`, `*`, `/` operators in expressions
- **Where:** Expressions, Data Transforms, Declare Expressions, When rules
- **Example:** Set `.pyTotal` to `.pyQuantity * .pyUnitPrice`; Set `.pyDiscount` to
  `.pySubtotal - .pyTotal`; Set `.pyTaxRate` to `.pyTaxAmount / .pySubtotal`
- **Notes:** Standard arithmetic operators. Division by zero produces an error -- guard
  with a condition or use a function like `@(Pega-RULES:ExpressionEvaluators).abs()`.
  Integer division truncates (e.g., `7 / 2` = `3`). For decimal division, ensure at
  least one operand is a decimal type. Operator precedence follows standard math rules
  (`*` and `/` before `+` and `-`); use parentheses to control order.
- **Status:** *(validated)*

### Comparison operators in expressions

- **How:** `>`, `<`, `>=`, `<=`, `==`, `!=` operators in expressions
- **Where:** Expressions, When rules, Data Transforms, Declare Expressions
- **Example:** `10 > 5` returns `true`; `.pyScore >= 80` returns `true` if score is 80
  or higher; `.pyCount != 0` returns `true` if count is not zero
- **Notes:** Standard comparison operators work directly on numeric values in Pega
  expressions. These are **preferred over** the `@(Pega-RULES:Math)` comparison library
  functions (`greaterThan`, `lessThan`, `greaterThanEqualTo`, `lessThanEqualTo`,
  `notEqual`, `equals`), which exist but are redundant.
- **Status:** *(validated)*

---

## Rounding and Precision

### Round a number to the nearest integer

- **How:** `@(Pega-RULES:ExpressionEvaluators).round(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).round(.pyRawScore)` -- `3.7` becomes `4`, `3.2` becomes `3`
- **Returns:** `BigDecimal` -- the rounded integer value as a BigDecimal
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value to round
- **Notes:** Uses `MathContext` rounding (typically HALF_UP: 0.5 rounds up). Has a
  `@baseclass` alias with pattern "{1} rounded to the nearest integer value". **Not
  null-safe** -- passing null will throw an error. Java source:
  `return dblParam.round(new MathContext(dblParam.precision() - dblParam.scale()));`.
- **Status:** *(validated)*

### Round a number to N decimal places

There is **no** two-argument `round(value, decimalPlaces)` overload in
`ExpressionEvaluators`. Calling
`@(Pega-RULES:ExpressionEvaluators).round(123.456, 2)` produces a "No suitable
instance found" error. To round to N decimal places, use one of these alternatives:

- **Multiply-round-divide pattern:**
  `@(Pega-RULES:ExpressionEvaluators).round(.pyValue * 100) / 100` (for 2 decimal places)
- **Math.divide with scale:**
  `@(Pega-RULES:Math).divide(.pyValue, 1, 2)` -- divides by 1, keeping 2 decimal
  places (see the `divide()` function below)
- **Java step:** Use `BigDecimal.setScale(n, RoundingMode.HALF_UP)` for exact control
- **Status:** *(disproved -- function does not exist)*

### Ceiling (round up to nearest integer)

- **How:** `@(Pega-RULES:ExpressionEvaluators).ceil(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).ceil(3.2)` returns `4.0`;
  `@(Pega-RULES:ExpressionEvaluators).ceil(-3.7)` returns `-3.0`
- **Returns:** `double` -- the smallest integer value greater than or equal to the input
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value to ceil
- **Notes:** Wraps Java's `Math.ceil()`. **Not null-safe.** No `@baseclass` alias
  exists -- use the fully-qualified syntax. Java source:
  `return Math.ceil(dblParam.doubleValue());`.
- **Status:** *(validated)*

### Floor (round down to nearest integer)

- **How:** `@(Pega-RULES:ExpressionEvaluators).floor(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).floor(3.7)` returns `3.0`;
  `@(Pega-RULES:ExpressionEvaluators).floor(-3.2)` returns `-4.0`
- **Returns:** `double` -- the largest integer value less than or equal to the input
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value to floor
- **Notes:** Wraps Java's `Math.floor()`. **Not null-safe.** No `@baseclass` alias
  exists -- use the fully-qualified syntax. Java source:
  `return Math.floor(dblParam.doubleValue());`.
- **Status:** *(validated)*

---

## Min, Max, and Absolute Value

### Get absolute value

- **How:** `@(Pega-RULES:ExpressionEvaluators).abs(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).abs(-42.5)` returns `42.5`
- **Returns:** `double` -- the absolute (non-negative) value
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value
- **Notes:** Wraps Java's `Math.abs()`. **Not null-safe.** No `@baseclass` alias
  exists. Java source: `return Math.abs(dblParam.doubleValue());`.
- **Status:** *(validated)*

### Get minimum of two values (BigDecimal)

- **How:** `@(Pega-RULES:ExpressionEvaluators).min(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).min(.pyRequestedDiscount, .pyMaxDiscount)`
- **Returns:** `BigDecimal` -- the smaller of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** Returns `BigDecimal.valueOf(0.0)` if either argument is null. Uses
  `BigDecimal.min()` internally. No `@baseclass` alias exists -- use the fully-qualified
  syntax. A `double` overload also exists: `min(double, double)` returning `double`.
- **Status:** *(validated)*

### Get maximum of two values (BigDecimal)

- **How:** `@(Pega-RULES:ExpressionEvaluators).max(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).max(.pyCalculatedScore, 0)`
- **Returns:** `BigDecimal` -- the larger of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** Returns `BigDecimal.valueOf(0.0)` if either argument is null. Uses
  `BigDecimal.max()` internally. No `@baseclass` alias exists. A `double` overload
  also exists: `max(double, double)` returning `double`.
- **Status:** *(validated)*

---

## Two-Value Aggregation Functions

### Sum two values

- **How:** `@(Pega-RULES:ExpressionEvaluators).sum(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).sum(.pySubtotal, .pyTax)`
- **Returns:** `double` -- the sum of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** Converts to `double` via `doubleValue()`. For simple addition of two
  values, the `+` operator is simpler. No `@baseclass` alias exists.
- **Status:** *(validated)*

### Average two values

- **How:** `@(Pega-RULES:ExpressionEvaluators).average(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).average(.pyScore1, .pyScore2)`
- **Returns:** `double` -- the arithmetic mean of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** No `@baseclass` alias exists.
- **Status:** *(validated)*

### Median of two values

- **How:** `@(Pega-RULES:ExpressionEvaluators).median(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).median(.pyScore1, .pyScore2)`
- **Returns:** `BigDecimal` -- the median (average) of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** No `@baseclass` alias exists.
- **Status:** *(validated)*

### Mode of two values

- **How:** `@(Pega-RULES:ExpressionEvaluators).mode(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).mode(.pyScore1, .pyScore2)`
- **Returns:** `BigDecimal` -- the mode of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** No `@baseclass` alias exists.
- **Status:** *(validated)*

### Standard deviation of two values

- **How:** `@(Pega-RULES:ExpressionEvaluators).stdev(val1, val2)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).stdev(.pyScore1, .pyScore2)`
- **Returns:** `BigDecimal` -- the standard deviation of the two values
- **Parameters:**
  - `val1` (BigDecimal) -- first value
  - `val2` (BigDecimal) -- second value
- **Notes:** Uses **sample standard deviation** formula (divides by `n-1`). No
  `@baseclass` alias exists.
- **Status:** *(validated)*

---

## Mathematical Functions

### Square a number

- **How:** `@(Pega-RULES:ExpressionEvaluators).sqr(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).sqr(5)` returns `25.0`
- **Returns:** `double` -- the square of the input
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value to square
- **Notes:** Computes `value * value`. **Not null-safe.** No `@baseclass` alias exists.
  Java source: `double d = dblParam.doubleValue(); return d * d;`. Also available in the
  `Math` library as `@(Pega-RULES:Math).Square(inputStr)` (takes a String parameter).
- **Status:** *(validated)*

### Square root

- **How:** `@(Pega-RULES:ExpressionEvaluators).sqrt(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).sqrt(25)` returns `5.0`
- **Returns:** `double` -- the square root
- **Parameters:**
  - `dblParam` (BigDecimal) -- the value (must be non-negative)
- **Notes:** Wraps Java's `Math.sqrt()`. Returns `NaN` for negative inputs. **Not
  null-safe.** No `@baseclass` alias exists. Also available in the `Math` library as
  `@(Pega-RULES:Math).Sqrt()`. Java source:
  `return Math.sqrt(dblParam.doubleValue());`.
- **Status:** *(validated)*

### Exponential (e^x)

- **How:** `@(Pega-RULES:ExpressionEvaluators).exp(dblParam)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:ExpressionEvaluators).exp(1)` returns `2.718281828...`
  (Euler's number)
- **Returns:** `double` -- e raised to the power of the input
- **Parameters:**
  - `dblParam` (BigDecimal) -- the exponent
- **Notes:** Wraps Java's `Math.exp()`. **Not null-safe.** No `@baseclass` alias exists.
  Also available in the `Math` library as `@(Pega-RULES:Math).Exp()`. Java source:
  `return Math.exp(dblParam.doubleValue());`.
- **Status:** *(validated)*

### Natural logarithm

- **How:** `@(Pega-RULES:Math).Log(inputStr)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:Math).Log("10")` returns `2.302585092994046`;
  `@(Pega-RULES:Math).Log("1")` returns `0.0`
- **Returns:** `double` -- the natural logarithm (base e) of the input
- **Parameters:**
  - `inputStr` (String) -- the value as a string
- **Notes:** Wraps Java's `Math.log()`. Returns `NaN` for negative inputs. Returns
  `0.0` for non-numeric strings (e.g., `"abc"`). **Takes a String parameter**, not a
  numeric type -- wrap numeric values in quotes. No `@baseclass` alias exists.
  Library: `Math`, `Pega-RULES`.
- **Status:** *(validated)*

### Power (x^y)

- **How:** `@(Pega-DecisionEngine:StrategyUtils).pow(base, exponent)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-DecisionEngine:StrategyUtils).pow(2, 10)` returns `1024.0`;
  `@(Pega-DecisionEngine:StrategyUtils).pow(9, 0.5)` returns `3.0` (square root)
- **Returns:** `double` -- base raised to the power of exponent
- **Parameters:**
  - `base` (double) -- the base value
  - `exponent` (double) -- the power to raise to
- **Notes:** Wraps Java's `Math.pow()`. Supports fractional exponents (e.g., `0.5` for
  square root) and negative exponents (e.g., `-1` for reciprocal). **Not in the
  `Pega-RULES` ruleset** -- requires `Pega-DecisionEngine:StrategyUtils`. No `@baseclass`
  alias exists. No `pow` function exists in `Pega-RULES:Math`.
- **Status:** *(validated)*

### Divide with precision control

- **How:** `@(Pega-RULES:Math).divide(numerator, denominator)` or
  `@(Pega-RULES:Math).divide(numerator, denominator, scale)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:Math).divide(10, 3)` returns `3.33`;
  `@(Pega-RULES:Math).divide(10, 3, 4)` returns `3.3333`
- **Returns:** `double` -- the quotient rounded to the specified scale
- **Parameters:**
  - `numerator` (double) -- the dividend
  - `denominator` (double) -- the divisor (throws error if zero)
  - `scale` (int, optional) -- number of decimal places (defaults to **2**)
- **Notes:** **Defaults to 2 decimal places** when scale is omitted -- does not return
  full precision. Throws an error on division by zero. Library: `Math`, `Pega-RULES`.
  For full-precision division, use the `/` operator instead.
- **Status:** *(validated)*

---

## Numeric Guards and Defaults

### Bound a value between 0 and 100

- **How:** `@(Pega-RULES:Math).BoundInteger(inputNum, lowVal, highVal)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:Math).BoundInteger(150, 0, 100)` returns `100`;
  `@(Pega-RULES:Math).BoundInteger(-5, 0, 100)` returns `0`
- **Returns:** `int` -- the input clamped to the range [lowVal, highVal]
- **Parameters:**
  - `inputNum` (int) -- the value to clamp
  - `lowVal` (int) -- the minimum allowed value
  - `highVal` (int) -- the maximum allowed value
- **Notes:** Simple integer clamping function. All parameters are `int` (not BigDecimal).
  A `@WORK-` class alias `BoundBetween0And100` exists that calls this with `lowVal=0`
  and `highVal=100`. Availability: Final. Library: `Math`, `Pega-RULES`.
- **Status:** *(validated)*

---

## Random Number Generation

These functions are from the `Random` library in the `Pega-DecisionEngine` ruleset.

### Generate a random number between 0 and 1

- **How:** `@(Pega-DecisionEngine:Random).random()`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-DecisionEngine:Random).random()` returns e.g. `0.8202993152605751`
- **Returns:** `double` -- a random value in the range [0.0, 1.0)
- **Notes:** Each call returns a different value. Library: `Random`, `Pega-DecisionEngine`.
- **Status:** *(validated)*

### Generate a random number in a range

- **How:** `@(Pega-DecisionEngine:Random).random(min, max)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-DecisionEngine:Random).random(1, 100)` returns e.g. `42.64`
- **Returns:** `double` -- a random value in the range [min, max)
- **Parameters:**
  - `min` (double) -- the lower bound (inclusive)
  - `max` (double) -- the upper bound (exclusive)
- **Notes:** Library: `Random`, `Pega-DecisionEngine`.
- **Status:** *(validated)*

### Generate a normally distributed random number

- **How:** `@(Pega-DecisionEngine:Random).normal()` or
  `@(Pega-DecisionEngine:Random).normal(mean, sd)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-DecisionEngine:Random).normal()` returns e.g. `-1.31` (standard
  normal); `@(Pega-DecisionEngine:Random).normal(50, 10)` returns e.g. `49.35`
- **Returns:** `double` -- a random value from a normal (Gaussian) distribution
- **Parameters (two-argument version):**
  - `mean` (double) -- the mean of the distribution
  - `sd` (double) -- the standard deviation
- **Notes:** The zero-argument version uses mean=0, sd=1 (standard normal distribution).
  Library: `Random`, `Pega-DecisionEngine`.
- **Status:** *(validated)*

---

## Number Formatting

### Format a number for display

- **How:** `@(Pega-UIEngine:Formatter).pxFormatNumber(...)` utility function
- **Where:** Expressions, Data Transforms, UI display
- **Example:** Format a number with grouping separators, decimal places, currency symbols,
  and locale-specific formatting
- **Parameters:** Multiple overloads exist with 9, 10, 12, or 13 parameters controlling:
  - Value to format, locale, decimal places, grouping separator, decimal separator,
    negative format, prefix, suffix, currency symbol, currency type, currency position,
    and display options
- **Notes:** Availability: Final. Library: `Formatter`, `Pega-UIEngine`. The most
  complete overload (13 parameters) supports `currencyParamsMap` with keys:
  `currencyType`, `displayCurrencyAs`, `currencyPosition`, `symbolPosition`. Handles
  locale-specific formatting (e.g., Arabic Saudi Arabia locale, Japanese Yen zero-decimal
  formatting). This is a complex function primarily used internally by Pega's UI
  rendering engine. For simple number-to-string conversion, prefer concatenation with
  an empty string (`"" + .pyValue`) or `@(Pega-RULES:String).toDecimal()` /
  `@(Pega-RULES:String).toInt()` for the reverse direction.
- **Status:** *(validated)*

---

## Number Parsing and Conversion

### Convert a string to an integer

- **How:** `@(Pega-RULES:String).toInt(input)` utility function
- **Where:** Expressions, Data Transforms, Decision Trees, Map Values
- **Example:** `@(Pega-RULES:String).toInt("42")` returns `42`;
  `@(Pega-RULES:String).toInt("abc")` returns `0`
- **Notes:** Returns `0` if the string is improperly formatted (does not throw an error).
  Uses locale-aware parsing internally. This is documented in detail in
  `string-manipulation.md` -- see that file for full documentation.
- **Status:** *(validated)*

### Convert a string to a decimal

- **How:** `@(Pega-RULES:String).toDecimal(input)` utility function
- **Where:** Expressions, Data Transforms, Decision Trees, Map Values
- **Example:** `@(Pega-RULES:String).toDecimal("123.45")` returns `123.45` as a BigDecimal
- **Notes:** Returns `BigDecimal.ZERO` if improperly formatted. Uses `en_US` locale
  (always period as decimal separator). This is documented in detail in
  `string-manipulation.md` -- see that file for full documentation.
- **Status:** *(validated)*

### Convert a number to a string

- **How:** Concatenate with an empty string: `"" + .pyNumericValue`
- **Where:** Expressions, Data Transforms
- **Example:** Set `.pyIDString` to `"" + .pyIDNumber` -- converts integer `42` to
  string `"42"`
- **Notes:** The `+` operator with a string operand forces coercion. Decimal values may
  produce unexpected precision (e.g., `1.1` may become `"1.1000000000000001"`) -- use
  `@(Pega-RULES:ExpressionEvaluators).round()` before conversion if formatting matters. This is documented in detail in
  `string-manipulation.md` -- see that file for full documentation.
- **Status:** *(validated)*

### Check if a string is a valid integer

- **How:** `@(Pega-RULES:String).isInteger(strInput)` utility function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RULES:String).isInteger("42")` returns `true`
- **Notes:** Useful for input validation before calling `toInt()`. This is documented in
  detail in `string-manipulation.md` -- see that file for full documentation.
- **Status:** *(validated)*

### Check if a string is a valid double

- **How:** `@(Pega-RULES:String).isDouble(strInput)` utility function
- **Where:** Expressions, When rules, Validate rules
- **Example:** `@(Pega-RULES:String).isDouble("3.14")` returns `true`
- **Notes:** Useful for input validation before calling `toDecimal()`. This is documented
  in detail in `string-manipulation.md` -- see that file for full documentation.
- **Status:** *(validated)*

---

## Notes

### Null handling

- **Single-value functions** (`abs`, `ceil`, `floor`, `round`, `sqrt`, `sqr`, `exp`)
  are **not null-safe** -- they will throw a `NullPointerException` if passed null.
  Guard with a null/empty check or default value before calling.
- **Two-argument `min` and `max`** return `BigDecimal.valueOf(0.0)` if either argument
  is null.

### Double precision loss

Most `ExpressionEvaluators` math functions convert `BigDecimal` to `double` internally
via `doubleValue()`. This means:
- Values with more than ~15 significant digits may lose precision
- Very large or very small values may overflow or underflow

For financial calculations requiring exact decimal precision, consider using Java steps
with `BigDecimal` arithmetic directly.

### No modulo function

Pega does not provide a `@mod()` function in its standard expression libraries. For
modulo operations, use a Java step with the `%` operator.

### Rounding strategy differences

- `@(Pega-RULES:ExpressionEvaluators).round(value)` (single argument): Uses `MathContext` rounding (HALF_UP -- 0.5 rounds
  up). Returns `BigDecimal`. This is the **only** `round()` overload available.
- **No two-argument `round(value, places)` exists** -- use `@(Pega-RULES:Math).divide()`
  or the multiply-round-divide pattern for decimal-place precision.
- `@(Pega-RULES:ExpressionEvaluators).ceil(value)`: Always rounds up (toward positive
  infinity)
- `@(Pega-RULES:ExpressionEvaluators).floor(value)`: Always rounds down (toward negative
  infinity)

### Common patterns

- **Clamp a score to 0-100:** `@(Pega-RULES:Math).BoundInteger(.pyScore, 0, 100)`
- **Round to 2 decimal places:** `@(Pega-RULES:Math).divide(.pyTotal, 1, 2)` or
  `@(Pega-RULES:ExpressionEvaluators).round(.pyTotal * 100) / 100`
- **Ensure non-negative:** `@(Pega-RULES:ExpressionEvaluators).abs(.pyBalance)`
- **Square root for distance:** `@(Pega-RULES:ExpressionEvaluators).sqrt(.pySumOfSquares)`
- **Natural log:** `@(Pega-RULES:Math).Log("10")` returns `2.302585...`
- **Power:** `@(Pega-DecisionEngine:StrategyUtils).pow(2, 10)` returns `1024.0`
- **Random between 1-100:** `@(Pega-DecisionEngine:Random).random(1, 100)`
