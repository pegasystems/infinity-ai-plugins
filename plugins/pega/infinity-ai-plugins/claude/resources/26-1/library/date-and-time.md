---
description: "Pega standard library for date/time operations -- current time, formatting, comparison, deadline calculation"
---
# Date and Time

Reusable Pega assets for working with dates, times, durations, and deadlines.

## Category Scope

- Getting the current date and time
- Date arithmetic (adding days, hours, minutes, seconds, months, years, weeks)
- Comparing dates (before, after, equal, same day)
- Computing date differences (days, hours, seconds, etc.)
- Formatting dates for display
- Parsing date strings into Pega internal format
- Extracting date or time components (day, month, year, hour, minute, second, weekday)
- Numeric date conversion (string to BigDecimal and back)
- Timezone conversion (GMT to local, local to GMT)
- Elapsed time formatting
- Boolean checks (past, future, within range)
- Symbolic date comparison (today, last week, next month, etc.)
- Business day arithmetic (respecting calendars and holidays)
- Unique timestamp generation

## Bootstrap Hints

To populate this file during bootstrap:
- Search for functions and activities with "Date" or "Time" in the name
- List `Rule-Utility-Function` rules on class `DateTime` (library `Pega-RULES`)
- List `Rule-Utility-Function` rules on class `DateTimeUtils` (library `Pega-RULES`)
- Look for `Rule-Alias-Function` shortcuts (`@addToDate()`, `@CurrentDateTime()`, etc.)
- Inspect system properties like `pxCreateDateTime`, `pxUpdateDateTime`,
  `pxSaveDateTime` to understand Pega's datetime format

---

## Pega DateTime Format

Pega stores all dates internally in a proprietary ISO-like format in GMT:

```
yyyyMMdd'T'HHmmss.SSS 'GMT'
```

**Example:** `20260227T143500.000 GMT` represents February 27, 2026 at 2:35 PM GMT.

Date-only values use `yyyyMMdd` format (e.g., `20260227`).

All DateTime library functions expect and return this format unless otherwise noted.

---

## Function Alias Reference

Some `DateTime` library functions have `@baseclass` Function Alias (`Rule-Alias-Function`)
shortcuts. These allow a shorter `@name()` syntax in expressions instead of the
fully-qualified `@(Pega-RULES:DateTime).functionName()` form.

**Available aliases:**

| Alias | Underlying Function |
|---|---|
| `@CurrentDate()` | `DateTime CurrentDate` |
| `@CurrentDateTime()` | `DateTime CurrentDateTime` |
| `@addToDate()` | `DateTime addToDate` |
| `@pxDateTimeisPastOrFuture()` | `DateTime pxDateTimeisPastOrFuture` |
| `@pxCompareDateTimeToSymbolicDate()` | `DateTimeUtils pxCompareDateTimeToSymbolicDate` |

All other `DateTime` and `DateTimeUtils` library functions require the fully-qualified
syntax: `@(Pega-RULES:DateTime).functionName()` or
`@(Pega-RULES:DateTimeUtils).functionName()`.

---

## Known Items

### Get the current date and time

- **How:** `@(Pega-RULES:DateTime).CurrentDateTime()` or `@CurrentDateTime()`
- **Where:** Expressions, Data Transforms, Declare Expressions, When rules
- **Example:** Set `.pyStatusDate` to `@CurrentDateTime()`
- **Returns:** `String` -- current datetime in Pega format (e.g., `"20260227T143500.419 GMT"`)
- **Notes:** No parameters. Returns value in GMT timezone. Identical behavior to
  `getCurrentTimeStamp()`. Alias `@CurrentDateTime()` works in expressions.
- **Status:** *(validated)*

### Get the current date formatted

- **How:** `@(Pega-RULES:DateTime).CurrentDate(strDateFormat, strTimeZone)` or
  `@CurrentDate(strDateFormat, strTimeZone)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@CurrentDate("MMM dd yyyy hh:mm:ss a", "PST")` returns
  `"Feb 27 2026 06:35:00 AM"`
- **Returns:** `String` -- current date formatted per the given Java DateFormat pattern
  and timezone
- **Parameters:**
  - `strDateFormat` (String) -- Java date format pattern (e.g., `"MM/dd/yyyy"`,
    `"MMMM dd, yyyy"`)
  - `strTimeZone` (String) -- timezone ID (e.g., `"PST"`, `"America/New_York"`, `"GMT"`)
- **Notes:** Both parameters are required. Uses Java `SimpleDateFormat` internally.
  Returns `""` on invalid format. Alias `@CurrentDate()` works in expressions.
- **Status:** *(validated)*

### Get the current date stamp (yyyyMMdd)

- **How:** `@(Pega-RULES:DateTime).getCurrentDateStamp()`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).getCurrentDateStamp()` returns `"20260227"`
- **Returns:** `String` -- current date in `yyyyMMdd` format
- **Notes:** No parameters. Date-only (no time component). Useful for generating date
  keys or date-only comparisons.
- **Status:** *(validated)*

### Get the current timestamp (Pega format)

- **How:** `@(Pega-RULES:DateTime).getCurrentTimeStamp()`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).getCurrentTimeStamp()` returns
  `"20260227T143500.651 GMT"`
- **Returns:** `String` -- current datetime in Pega ISO format (GMT)
- **Notes:** No parameters. Functionally identical to `CurrentDateTime()`. Both produce
  the same output.
- **Status:** *(validated)*

### Get a unique current timestamp

- **How:** `@(Pega-RULES:DateTime).getCurrentTimeStampUnique()`
- **Where:** Expressions, Data Transforms, Activities
- **Example:** `@(Pega-RULES:DateTime).getCurrentTimeStampUnique()` returns a Pega
  datetime string guaranteed to be unique across concurrent threads
- **Returns:** `String` -- unique datetime in Pega format
- **Notes:** Uses a synchronized counter internally. If two calls occur within the same
  millisecond, the second call returns a timestamp incremented by 1ms. Useful for
  generating unique keys based on timestamps. See also
  `pxGetCurrentTimeStampThreadUnique()` for per-thread uniqueness.
- **Status:** *(validated)*

### Get the current time of day

- **How:** `@(Pega-RULES:DateTime).getCurrentTimeOfDayStamp()`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).getCurrentTimeOfDayStamp()` returns a full Pega
  datetime string representing the current time
- **Returns:** `String` -- full Pega datetime string (for backward compatibility)
- **Notes:** Despite the name, this returns a full datetime string, not just the time
  portion. Internally calls `formatTimeStamp`. For time-only output, use
  `getCurrentTimeOfDayOnlyStamp()` instead.
- **Status:** *(validated)*

### Get the current time of day only (HHmmss)

- **How:** `@(Pega-RULES:DateTime).getCurrentTimeOfDayOnlyStamp()`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).getCurrentTimeOfDayOnlyStamp()` returns `"143522"`
  (for 2:35:22 PM)
- **Returns:** `String` -- current time in `HHmmss` format (24-hour clock)
- **Notes:** No parameters. Time-only, no date component. Useful for time-based routing
  or scheduling checks.
- **Status:** *(validated)*

### Add days, hours, minutes, or seconds to a date

- **How:** `@(Pega-RULES:DateTime).addToDate(theDate, days, hours, minutes, seconds)` or
  `@addToDate(theDate, days, hours, minutes, seconds)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@addToDate(.pyCreateDateTime, "5", "0", "0", "0")` adds 5 days;
  `@addToDate(.pyCreateDateTime, "0", "2", "30", "0")` adds 2 hours 30 minutes
- **Returns:** `String` -- resulting datetime in Pega format
- **Parameters:**
  - `theDate` (String) -- source datetime in Pega format
  - `days` (String) -- number of days to add (can be negative to subtract)
  - `hours` (String) -- number of hours to add
  - `minutes` (String) -- number of minutes to add
  - `seconds` (String) -- number of seconds to add
- **Notes:** All parameters are **String** type (not int). Pass `"0"` for fields you
  don't want to change. Negative values subtract from the date. Alias `@addToDate()`
  works in expressions. **Note:** `@addToDateTime()` is often cited as an alias but
  does **not** exist in Pega -- only `@addToDate()` is valid.
- **Status:** *(validated)*

### Add years, months, weeks, days, hours, minutes, or seconds to a date

- **How:** `@(Pega-RULES:DateTime).addCalendar(theDate, years, months, weeks, days, hours, minutes, seconds)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:DateTime).addCalendar(.pyCreateDateTime, "1", "0", "0", "0", "0", "0", "0")`
  adds 1 year; `@(Pega-RULES:DateTime).addCalendar(.pyCreateDateTime, "0", "3", "0", "0", "0", "0", "0")`
  adds 3 months
- **Returns:** `String` -- resulting datetime in Pega format
- **Parameters:**
  - `theDate` (String) -- source datetime in Pega format
  - `years` (String) -- number of years to add
  - `months` (String) -- number of months to add
  - `weeks` (String) -- number of weeks to add
  - `days` (String) -- number of days to add
  - `hours` (String) -- number of hours to add
  - `minutes` (String) -- number of minutes to add
  - `seconds` (String) -- number of seconds to add
- **Notes:** All parameters are **String** type (not int). This is the only DateTime
  function that can add **years, months, or weeks** -- `addToDate()` is limited to
  days/hours/minutes/seconds. Has DSS `datetime/addcalendar/version=2` for operator
  timezone handling. Pass `"0"` for fields you don't want to change. Negative values
  subtract.
- **Status:** *(validated)*

### Compare two dates (is date1 after date2?)

- **How:** `@(Pega-RULES:DateTime).CompareDates(strDate1, strDate2)`
- **Where:** Expressions, When rules, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).CompareDates(.pyDueDate, @getCurrentTimeStamp())`
  returns `true` if the due date is in the future
- **Returns:** `boolean` -- `true` if strDate1 is **after** strDate2
- **Parameters:**
  - `strDate1` (String) -- first datetime
  - `strDate2` (String) -- second datetime
- **Notes:** Compares both date and time components. Uses `parseDateTimeString`
  internally. Requires the fully-qualified syntax
  `@(Pega-RULES:DateTime).CompareDates()`. **Note:** `@CompareTwoDateTimes()` and
  `@pxCompareDateTimes()` are often cited as aliases but do **not** exist in Pega.
- **Status:** *(validated)*

### Compare two dates (date part only, ignoring time)

- **How:** `@(Pega-RULES:DateTime).CompareDates(strDate1, strDate2, daysOnly)`
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:DateTime).CompareDates(.pyDueDate, @getCurrentTimeStamp(), true)`
  compares only the date portions
- **Returns:** `boolean` -- `true` if strDate1 date is **after** strDate2 date
- **Parameters:**
  - `strDate1` (String) -- first datetime
  - `strDate2` (String) -- second datetime
  - `daysOnly` (boolean) -- `true` to ignore the time component
- **Notes:** When `daysOnly` is `true`, only the date part (yyyyMMdd) is compared.
  Useful when you need to check "is this date on a later day" regardless of the time.
- **Status:** *(validated)*

### Check if two dates are equal

- **How:** `@(Pega-RULES:DateTime).CompareDateTimeStamp(strDate1, strDate2)`
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:DateTime).CompareDateTimeStamp(.pyStartDate, .pyEndDate)`
  returns `true` if both dates are identical
- **Returns:** `boolean` -- `true` if the two datetimes are **equal**
- **Parameters:**
  - `strDate1` (String, DateTime) -- first datetime
  - `strDate2` (String, DateTime) -- second datetime
- **Notes:** Unlike `CompareDates` (which checks "after"), this checks **equality**.
  Uses `parseDateTimeStamp` internally then compares with `Date.compareTo() == 0`.
- **Status:** *(validated)*

### Check if date1 exceeds date2 by more than N days

- **How:** `@(Pega-RULES:DateTime).compareDatesByDays(firstDate, secondDate, numberOfDays)`
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:DateTime).compareDatesByDays(.pyDueDate, @getCurrentTimeStamp(), 30)`
  returns `true` if due date is more than 30 days from now
- **Returns:** `boolean` -- `true` if firstDate exceeds secondDate by more than
  `numberOfDays`
- **Parameters:**
  - `firstDate` (String) -- first datetime
  - `secondDate` (String) -- second datetime
  - `numberOfDays` (int) -- threshold number of days
- **Notes:** The `numberOfDays` parameter is **int** (not String, unlike most DateTime
  functions). Uses `differenceBetweenDays` internally.
- **Status:** *(validated)*

### Check if two dates fall on the same day

- **How:** `@(Pega-RULES:DateTime).pxIsSameDay(strDate1, strDate2)`
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:DateTime).pxIsSameDay(.pyStartDate, .pyEndDate)` returns
  `true` if both dates are on the same calendar day
- **Returns:** `boolean` -- `true` if the date portions (yyyyMMdd) are equal
- **Parameters:**
  - `strDate1` (String) -- first datetime
  - `strDate2` (String) -- second datetime
- **Notes:** Simple substring comparison of the first 8 characters. Does not parse the
  dates -- just compares the `yyyyMMdd` prefix. Lightweight but assumes both inputs are
  in Pega format.
- **Status:** *(validated)*

### Calculate difference between two dates

- **How:** `@(Pega-RULES:DateTime).DateTimeDifference(strBeginTime, strEndTime, strPrecision)`
- **Where:** Expressions, Data Transforms, Declare Expressions
- **Example:** `@(Pega-RULES:DateTime).DateTimeDifference(.pyStartDate, .pyEndDate, "D")`
  returns number of days between start and end
- **Returns:** `double` -- the difference in the requested precision unit
- **Parameters:**
  - `strBeginTime` (String) -- start datetime
  - `strEndTime` (String) -- end datetime (if empty, uses current time)
  - `strPrecision` (String) -- precision unit, one of:
    - `"C"` -- centuries
    - `"Y"` -- years
    - `"M"` -- months
    - `"D"` -- days
    - `"h"` -- hours
    - `"m"` -- minutes
    - `"s"` -- seconds
    - `"S"` -- milliseconds
- **Notes:** Returns a `double`, not an int or String. If `strEndTime` is blank, the
  current time is used automatically. Useful for SLA calculations, aging reports, and
  duration tracking. Precision codes are case-sensitive (`"D"` for days, `"d"` is invalid).
- **Status:** *(validated)*

### Calculate duration between two dates (ISO format)

- **How:** `@(Pega-RULES:DateTime).DateTimeDuration(strBeginTime, strEndTime, strPrecision)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).DateTimeDuration(.pyStartDate, .pyEndDate, "D")`
  returns an ISO-style duration range string
- **Returns:** `String` -- date/time range string showing the truncated boundaries,
  e.g. `"2026-02-15--2026-03-01"` (days precision) or
  `"2026-03-01T12--2026-03-01T14"` (hours precision)
- **Parameters:**
  - `strBeginTime` (String) -- start datetime
  - `strEndTime` (String) -- end datetime
  - `strPrecision` (String) -- precision unit (same codes as `DateTimeDifference`:
    `"C"`, `"Y"`, `"M"`, `"D"`, `"h"`, `"m"`, `"s"`, `"S"`)
- **Notes:** Unlike `DateTimeDifference` (which returns a `double`), this returns a
  formatted **String** showing the range in ISO-like format. Useful when you need a
  human-readable or machine-parseable duration representation rather than a numeric
  difference.
- **Status:** *(validated)*

### Format a datetime for display

- **How:** `@(Pega-RULES:DateTime).FormatDateTime(strDateTime, strPattern, strTimeZone, strLocale)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).FormatDateTime(.pyCreateDateTime, "MMMM dd, yyyy", "America/New_York", "en_US")`
  returns `"February 27, 2026"`
- **Returns:** `String` -- formatted date string
- **Parameters:**
  - `strDateTime` (String) -- datetime in Pega format
  - `strPattern` (String) -- Java `SimpleDateFormat` pattern (e.g., `"MM/dd/yyyy"`,
    `"yyyy-MM-dd HH:mm:ss"`, `"MMMM dd, yyyy"`)
  - `strTimeZone` (String) -- timezone ID (e.g., `"America/New_York"`, `"GMT"`, `"PST"`)
  - `strLocale` (String) -- locale code (e.g., `"en_US"`, `"fr_FR"`)
- **Notes:** All four parameters required. For common patterns:
  - `"MM/dd/yyyy"` -- US date format
  - `"dd/MM/yyyy"` -- European date format
  - `"yyyy-MM-dd"` -- ISO 8601 date
  - `"MMMM dd, yyyy"` -- long date (e.g., "February 27, 2026")
  - `"h:mm a"` -- time with AM/PM
- **Status:** *(validated)*

### Reformat a date-only string

- **How:** `@(Pega-RULES:DateTime).pxFormatDateOnly(strDate, strCurrentPattern, strFormatPattern)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).pxFormatDateOnly("20260227", "yyyyMMdd", "MM/dd/yyyy")`
  returns `"02/27/2026"`
- **Returns:** `String` -- reformatted date string
- **Parameters:**
  - `strDate` (String) -- input date string
  - `strCurrentPattern` (String) -- format pattern of the input
  - `strFormatPattern` (String) -- desired output format pattern
- **Notes:** Works with date-only strings (no time component). Useful when converting
  between date formats (e.g., `yyyyMMdd` to `MM/dd/yyyy`). Uses `formatDateOnly`
  internally.
- **Status:** *(validated)*

### Format elapsed seconds as HH:MM:SS

- **How:** `@(Pega-RULES:DateTime).FormatElapsedTime(elapsedTime)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).FormatElapsedTime(3661)` returns `"01:01:01"`
  (1 hour, 1 minute, 1 second)
- **Returns:** `String` -- formatted time as `HH:MM:SS`
- **Parameters:**
  - `elapsedTime` (int) -- elapsed time in seconds
- **Notes:** Handles negative values (prepends `-`). Parameter is **int** type.
  `FormatElapsedTime(2)` returns `"00:00:02"`. Useful for displaying SLA durations
  or processing times.
- **Status:** *(validated)*

### Format elapsed time from a property

- **How:** `@(Pega-RULES:DateTime).FormatElapsedTimeFromProperty(elapsedTime)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).FormatElapsedTimeFromProperty(.pyElapsedSeconds)`
- **Returns:** `String` -- formatted time as `HH:MM:SS`
- **Parameters:**
  - `elapsedTime` (ClipboardProperty, Decimal) -- elapsed time in seconds as a property
    reference
- **Notes:** Convenience wrapper around `FormatElapsedTime`. Takes a `ClipboardProperty`
  (property reference), converts to double then int, and delegates. Use this when
  passing a property directly rather than a literal value.
- **Status:** *(validated)*

### Set a specific time on a date

- **How:** `@(Pega-RULES:DateTime).pxGetSpecifiedTimeOnDate(strDateTime, hours, minutes, seconds, strTimeZone)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).pxGetSpecifiedTimeOnDate(@getCurrentTimeStamp(), 23, 59, 0, "")`
  sets the time to 11:59 PM on today's date
- **Returns:** `String` -- datetime in Pega format with the specified time
- **Parameters:**
  - `strDateTime` (String) -- base datetime
  - `hours` (int) -- hour of day (0-23)
  - `minutes` (int) -- minute (0-59)
  - `seconds` (int) -- second (0-59)
  - `strTimeZone` (String) -- timezone ID (empty string uses the requestor's timezone)
- **Notes:** Hours, minutes, seconds are **int** type (not String). When `strTimeZone`
  is an empty string `""`, the server's **requestor timezone** (not GMT) is used. For
  example, on a server with IST timezone, setting 23:59:59 with `""` produces
  `18:29:59 GMT` (IST is UTC+5:30). To set a time in a specific timezone, pass the
  timezone ID explicitly (e.g., `"America/New_York"`, `"GMT"`). Useful for setting
  deadlines to end-of-day, start-of-day, or specific cutoff times.
- **Status:** *(validated)*

### Parse a datetime string to Pega internal format

- **How:** `@(Pega-RULES:DateTime).pxparseDateTime(strDateTime)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).pxparseDateTime("Feb 27 2026 2:35 PM")` returns
  `"20260227T143500.000 GMT"`
- **Returns:** `String` -- datetime in Pega internal ISO format
- **Parameters:**
  - `strDateTime` (String) -- date/time string in any recognized format
- **Notes:** Parses the input using `parseDateTimeString` and reformats to Pega internal
  format via `formatIDT`. Supports many date patterns (ISO, full, long, medium, short).
  Useful for normalizing external date inputs to Pega format.
- **Status:** *(validated)*

### Parse a datetime string to milliseconds since epoch

- **How:** `@(Pega-RULES:DateTime).parseDateString(strDateTime)`
- **Where:** Expressions, Activities (Java steps)
- **Example:** `@(Pega-RULES:DateTime).parseDateString("20260227T143500.000 GMT")` returns
  the epoch milliseconds as a `long`
- **Returns:** `long` -- milliseconds since Unix epoch (January 1, 1970)
- **Parameters:**
  - `strDateTime` (String) -- date string in Pega or standard format
- **Notes:** Tries multiple date patterns (full, long, medium, short, ISO). Returns
  `-1` if parsing fails. Low-level; prefer `pxparseDateTime()` for most use cases.
- **Status:** *(validated)*

### Parse a datetime string to a Java Date object

- **How:** `@(Pega-RULES:DateTime).parseDateTimeStamp(strDateTime)` or
  `@(Pega-RULES:DateTime).GetDate(strDateTime)`
- **Where:** Activities (Java steps)
- **Example:** `@(Pega-RULES:DateTime).parseDateTimeStamp("20260227T143500.000 GMT")`
- **Returns:** `Date` -- Java `Date` object
- **Parameters:**
  - `strDateTime` (String) -- datetime in Pega format
- **Notes:** Both `parseDateTimeStamp` and `GetDate` convert Pega datetime strings to
  Java `Date` objects. `GetDate` uses `getDate` internally while `parseDateTimeStamp`
  uses `parseDateTimeStamp`. Primarily useful in Java activity steps, not in standard
  expressions.
- **Status:** *(validated)*

### Extract date portion from a datetime (yyyyMMdd)

- **How:** `@(Pega-RULES:DateTime).getTimeStampAsDateStamp(strDateTime)`
- **Where:** Expressions, Data Transforms
- **Example:** `@(Pega-RULES:DateTime).getTimeStampAsDateStamp("20260227T143500.000 GMT")`
  returns `"20260227"`
- **Returns:** `String` -- date portion in `yyyyMMdd` format
- **Parameters:**
  - `strDateTime` (String) -- datetime in Pega format
- **Notes:** Strips the time component, returning just the date. Useful for grouping
  records by date or for date-only comparisons.
- **Status:** *(validated)*

### Check if a date is in the past

- **How:** `@(Pega-RULES:DateTime).pxDateTimeisPastOrFuture(compareDateTime, checkIsPast)`
  or `@pxDateTimeisPastOrFuture(compareDateTime, checkIsPast)`
- **Where:** Expressions, When rules
- **Example:** `@pxDateTimeisPastOrFuture(.pyDueDate, true)` returns `true` if the due
  date is in the past
- **Returns:** `boolean` -- `true` if the condition is met
- **Parameters:**
  - `compareDateTime` (String) -- datetime to check
  - `checkIsPast` (boolean) -- `true` to check if the date is in the past, `false` to
    check if it is in the future
- **Notes:** Dual-purpose function controlled by the boolean flag. Alias
  `@pxDateTimeisPastOrFuture()` works in expressions. For a simpler "is past" check,
  you can also use `CompareDates(@getCurrentTimeStamp(), .pyDueDate)`.
- **Status:** *(validated)*

### Check if a date is within N days of now

- **How:** `@(Pega-RULES:DateTime).isWithinDaysOfNow(theDate, days)`
- **Where:** Expressions, When rules
- **Example:** `@(Pega-RULES:DateTime).isWithinDaysOfNow(.pyDueDate, "7")` returns `true`
  if the due date is within the next 7 days
- **Returns:** `boolean` -- `true` if `theDate + days` is still in the future
- **Parameters:**
  - `theDate` (String) -- datetime to check
  - `days` (String) -- number of days window
- **Notes:** Both parameters are **String** type. Internally checks if
  `theDate + days > now`. Useful for "approaching deadline" alerts and SLA warnings.
- **Status:** *(validated)*

### Check if a date is the default/empty date

- **How:** `@(Pega-RULES:DateTime).isDateInThePast(clipboardProperty)`
- **Where:** Activities (Java steps only)
- **Example:** Used in Java steps with a `ClipboardProperty` reference
- **Returns:** `boolean` -- `true` if the date (as days since epoch) is before today
- **Parameters:**
  - `clipboardProperty` (ClipboardProperty) -- a date property reference
- **Notes:** Takes a **ClipboardProperty** parameter (not a String), which limits usage
  to Java activity steps. For expression-based past checks, use
  `pxDateTimeisPastOrFuture()` instead.
- **Status:** *(validated)*

### Compare a date to a symbolic date (today, last week, next month, etc.)

- **How:** `@(Pega-RULES:DateTimeUtils).pxCompareDateTimeToSymbolicDate(strDate, comparator, symbolicDate)`
  or `@pxCompareDateTimeToSymbolicDate(strDate, comparator, symbolicDate)`
- **Where:** Expressions, When rules, Validation Grid, Condition Builder
- **Example:** `@pxCompareDateTimeToSymbolicDate(.pyDueDate, ">=", "Today")` returns
  `true` if the due date is today or later
- **Returns:** `boolean` -- result of the comparison
- **Parameters:**
  - `strDate` (String) -- datetime to compare
  - `comparator` (String) -- one of: `"="`, `"!="`, `">"`, `">="`, `"<"`, `"<="`
  - `symbolicDate` (String) -- symbolic date name (see list below)
- **Supported symbolic dates:**
  - **Days:** `yesterday`, `today`, `tomorrow`
  - **Weeks:** `previousweek`, `currentweek`, `nextweek`
  - **Months:** `previousmonth`, `currentmonth`, `nextmonth`,
    `currentandnextmonth`, `currentandpreviousmonth`
  - **Quarters:** `previousquarter`, `currentquarter`, `nextquarter`,
    `currentandnextquarter`, `currentandpreviousquarter`
  - **Years:** `previousyear`, `currentyear`, `nextyear`,
    `currentandnextyear`, `currentandpreviousyear`,
    `currentandprevious2years`, `previous2years`, `2yearsago`
  - **Rolling windows:** `last7days`, `last30days`, `last60days`, `last90days`,
    `last120days`, `next7days`, `next30days`, `next60days`, `next90days`, `next120days`
  - **Dynamic:** `lastNdays`, `nextNdays` (where N is any integer)
- **Notes:** Resolves the symbolic date to start/end boundaries using the requestor's
  timezone and locale, then compares. The `py`-prefixed version
  (`pyCompareDateTimeToSymbolicDate`) is deprecated -- always use the `px` version.
  Library is `DateTimeUtils` (not `DateTime`). Alias
  `@pxCompareDateTimeToSymbolicDate()` works in expressions.
- **Status:** *(validated)*

---

## Business Day Functions

These functions perform date arithmetic that respects business calendars (skipping
weekends and holidays). The `TimeDifference` function uses the server's default calendar,
while `TimeDifferenceBusinessDays` and `TimeDifferenceFirstBusinessDay` accept an explicit
`java.util.Calendar` object (Java activity steps only).

### Add an interval using business day logic

- **How:** `@(Pega-RULES:DateTime).TimeDifference(strStart, nDays, nHours, nMinutes, nSeconds)`
- **Where:** Expressions, Data Transforms, Activities
- **Example:** `@(Pega-RULES:DateTime).TimeDifference(@getCurrentTimeStamp(), 5, 0, 0, 0)`
  adds 5 business days to now
- **Returns:** `String` -- formatted datetime string (e.g.,
  `"Thu 2009/01/29 23:47:46 GMT+00:00"`)
- **Parameters:**
  - `strStart` (String) -- start datetime in Pega format
  - `nDays` (int) -- number of business days to add
  - `nHours` (int) -- number of hours to add
  - `nMinutes` (int) -- number of minutes to add
  - `nSeconds` (int) -- number of seconds to add
- **Notes:** All numeric parameters are **int** (not String). Uses the server's default
  business calendar. Returns a formatted date string (not Pega internal format). Marked
  as a base rule (`pyBaseRule: true`). **Note:** If the start date falls on a weekend,
  even passing `0` business days will advance to the next business day (e.g., Sunday
  to Monday). For SLA-aware date arithmetic, consider using SLA rules instead.
- **Status:** *(validated)*

### Add an interval with explicit calendar (Java steps)

- **How:** `@(Pega-RULES:DateTime).TimeDifferenceBusinessDays(aCalendar, strStart, nDays, nHours, nMinutes, nSeconds)`
- **Where:** Activities (Java steps only)
- **Example:** Used in Java activity steps with a `java.util.Calendar` object
- **Returns:** `String` -- formatted datetime string
- **Parameters:**
  - `aCalendar` (Calendar) -- `java.util.Calendar` instance for business day rules
  - `strStart` (String) -- start datetime
  - `nDays` (int) -- business days to add
  - `nHours` (int) -- hours to add
  - `nMinutes` (int) -- minutes to add
  - `nSeconds` (int) -- seconds to add
- **Notes:** Takes a `java.util.Calendar` as the first parameter, limiting usage to
  Java activity steps. Use `TimeDifference()` for expression-based business day
  arithmetic with the server's default calendar.
- **Status:** *(validated)*

### Get the first business day after a date (Java steps)

- **How:** `@(Pega-RULES:DateTime).TimeDifferenceFirstBusinessDay(aCalendar, strStart)`
- **Where:** Activities (Java steps only)
- **Example:** Used in Java activity steps with a `java.util.Calendar` object
- **Returns:** `String` -- formatted datetime string of the first business day
- **Parameters:**
  - `aCalendar` (Calendar) -- `java.util.Calendar` instance for business day rules
  - `strStart` (String) -- start datetime
- **Notes:** Returns the next business day after the given date, respecting the provided
  calendar. Takes a `java.util.Calendar` as the first parameter, limiting usage to Java
  activity steps.
- **Status:** *(validated)*

---

## Date Component Extraction (Numeric)

These functions extract individual components (day, month, year, hour, etc.) from Pega's
internal **numeric** date representation. Pega represents dates internally as a `double`
(days since epoch 1970-01-01). To use these with string datetime values, first convert
using `dateValue()` (for date components) or `timevalue()` (for `hour()` only).

**Important:** While `hour(timevalue(...))` works correctly, `minute(timevalue(...))`
and `second(timevalue(...))` do **not** reliably extract the original time components.
For minute and second extraction, use `FormatDateTime()` with `"mm"` or `"ss"` patterns.

**Usage pattern:**
```
// Date components: convert string to numeric with dateValue(), then extract
@(Pega-RULES:DateTime).day(@(Pega-RULES:DateTime).dateValue(.pyCreateDateTime))

// Hour extraction: convert string to numeric with timevalue(), then extract
@(Pega-RULES:DateTime).hour(@(Pega-RULES:DateTime).timevalue(.pyCreateDateTime))

// Minute/second: use FormatDateTime instead (timevalue chaining is unreliable)
@(Pega-RULES:DateTime).FormatDateTime(.pyCreateDateTime, "mm", "GMT", "en_US")
```

### Extract day of month

- **How:** `@(Pega-RULES:DateTime).day(pegaRulesDate)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).day(@(Pega-RULES:DateTime).dateValue("20260301T120000.000 GMT"))`
  returns `1`
- **Returns:** `int` -- day of month (1-31)
- **Parameters:**
  - `pegaRulesDate` (double) -- Pega internal numeric date (days since epoch)
- **Notes:** Takes a `double` parameter. Use `dateValue()` to convert a string datetime
  to the required numeric format. Also has a BigDecimal overload for clipboard properties.
- **Status:** *(validated)*

### Extract month of year

- **How:** `@(Pega-RULES:DateTime).month(pegaRulesDate)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).month(@(Pega-RULES:DateTime).dateValue("20260301T120000.000 GMT"))`
  returns `2` (March = 2, **not** 3)
- **Returns:** `int` -- month of year (**0-11, zero-indexed**: January=0, December=11)
- **Parameters:**
  - `pegaRulesDate` (double) -- Pega internal numeric date (days since epoch)
- **Notes:** **GOTCHA: Returns 0-indexed months** (Java `Calendar` convention). January
  is `0`, February is `1`, March is `2`, etc. Add 1 to get the human-readable month
  number. Marked `Final`.
- **Status:** *(validated)*

### Extract year

- **How:** `@(Pega-RULES:DateTime).year(pegaRulesDate)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).year(@(Pega-RULES:DateTime).dateValue("20260301T120000.000 GMT"))`
  returns `2026`
- **Returns:** `int` -- four-digit year
- **Parameters:**
  - `pegaRulesDate` (double) -- Pega internal numeric date (days since epoch)
- **Notes:** Takes a `double` parameter. Marked `Final`. Use `dateValue()` to convert
  from string datetime.
- **Status:** *(validated)*

### Extract day of week

- **How:** `@(Pega-RULES:DateTime).weekday(pegaRulesDate)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).weekday(@(Pega-RULES:DateTime).dateValue("20260301T120000.000 GMT"))`
  returns the day of week number
- **Returns:** `int` -- day of week (SUNDAY=1, MONDAY=2, ..., SATURDAY=7)
- **Parameters:**
  - `pegaRulesDate` (double) -- Pega internal numeric date (days since epoch)
- **Notes:** Follows Java `Calendar` day-of-week constants (SUNDAY=1, SATURDAY=7).
  Converts input to GMT before evaluating. Marked `Final`. Use `dateValue()` to
  convert from string datetime.
- **Status:** *(validated)*

### Extract hour of day

- **How:** `@(Pega-RULES:DateTime).hour(timeOfDay)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).hour(@(Pega-RULES:DateTime).timevalue("20260301T143500.000 GMT"))`
  returns `14`
- **Returns:** `int` -- hour of day (0-23, 24-hour clock)
- **Parameters:**
  - `timeOfDay` (double) -- Pega internal time-of-day representation (fraction of day
    where 1.0 = 24 hours)
- **Notes:** Takes a `double` time-of-day value. Use `timevalue()` to convert a string
  datetime to the required numeric format.
- **Status:** *(validated)*

### Extract minute of hour

- **How:** `@(Pega-RULES:DateTime).minute(timeOfDay)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).minute(@(Pega-RULES:DateTime).timevalue("20260301T120000.000 GMT"))`
  returns `0` (noon has 0 minutes past the hour)
- **Returns:** `int` -- minute (0-59)
- **Parameters:**
  - `timeOfDay` (double) -- Pega internal time-of-day representation
- **Notes:** Takes a `double` time-of-day value. Use `timevalue()` to convert from
  string datetime. **GOTCHA:** `minute(timevalue(...))` extracts the minute from the
  numeric day-fraction, which only produces correct results when the minute component
  aligns with the fractional representation. For example,
  `minute(timevalue("20260301T143500.000 GMT"))` returns `21` (not `35`), because
  `timevalue()` converts 14:35 to `0.6076...` and `minute()` derives its value from
  that fraction. Use `hour()` for reliable hour extraction; for minutes and seconds,
  prefer `FormatDateTime()` with `"mm"` or `"ss"` patterns instead.
- **Status:** *(validated)*

### Extract second of minute

- **How:** `@(Pega-RULES:DateTime).second(timeOfDay)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).second(@(Pega-RULES:DateTime).timevalue("20260301T120000.000 GMT"))`
  returns `0` (noon has 0 seconds)
- **Returns:** `int` -- second (0-59)
- **Parameters:**
  - `timeOfDay` (double) -- Pega internal time-of-day representation
- **Notes:** Takes a `double` time-of-day value. Use `timevalue()` to convert from
  string datetime. **GOTCHA:** Like `minute()`, `second(timevalue(...))` derives the
  second from the numeric day-fraction, which does **not** reliably extract the original
  second component. For example, `second(timevalue("20260301T143522.000 GMT"))` returns
  `7` (not `22`). For reliable second extraction, use `FormatDateTime()` with the
  `"ss"` pattern instead.
- **Status:** *(validated)*

---

## Numeric Date Conversion

These functions convert between Pega's string datetime format and its internal numeric
representation (`BigDecimal`/`double` days since epoch). They serve as bridges to the
component extraction functions and timezone conversion functions above.

### Convert datetime string to numeric days since epoch

- **How:** `@(Pega-RULES:DateTime).dateValue(dateString)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).dateValue("20260301T120000.000 GMT")` returns a
  `BigDecimal` like `20513` (days since epoch)
- **Returns:** `BigDecimal` -- days since January 1, 1970
- **Parameters:**
  - `dateString` (String) -- datetime in Pega format
- **Notes:** This is the primary bridge function for using component extraction functions
  (`day()`, `month()`, `year()`, `weekday()`) which require numeric input. The returned
  `BigDecimal` can be passed directly to those functions (they accept both `double` and
  `BigDecimal`).
- **Status:** *(validated)*

### Convert datetime string to time-of-day fraction

- **How:** `@(Pega-RULES:DateTime).timevalue(pegaRulesDateTime)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).timevalue("20260301T120000.000 GMT")` returns
  `0.5` (noon = half of 24 hours)
- **Returns:** `BigDecimal` -- fraction of day where 1.0 = 24 hours
- **Parameters:**
  - `pegaRulesDateTime` (String) -- datetime in Pega format
- **Notes:** This is the bridge function for using the `hour()` extraction function,
  which requires numeric time-of-day input. Returns `BigDecimal.ZERO` for blank/null
  input. Example: `0.7276875` represents approximately 5:28 PM. **Warning:**
  `minute(timevalue(...))` and `second(timevalue(...))` do **not** reliably extract
  the original minute/second components -- see the `minute()` and `second()` entries
  for details. For minute and second extraction, use `FormatDateTime()` with `"mm"`
  or `"ss"` patterns instead.
- **Status:** *(validated)*

---

## Timezone Conversion (Numeric)

These functions convert Pega's internal numeric date representation between GMT and
local timezones. They operate on `double` or `BigDecimal` values (days since epoch),
not on string datetimes.

### Convert local timezone to GMT

- **How:** `@(Pega-RULES:DateTime).toGMT(pegaRulesDate, zone)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).toGMT(@(Pega-RULES:DateTime).dateValue(.pyLocalDate), "EST")`
- **Returns:** `double` -- GMT equivalent of the local date
- **Parameters:**
  - `pegaRulesDate` (double) -- local date as days since epoch
  - `zone` (String) -- timezone ID (e.g., `"EST"`, `"America/New_York"`)
- **Notes:** Also has a BigDecimal overload. Useful when working with numeric date
  representations that need timezone normalization.
- **Status:** *(validated)*

### Convert GMT to local timezone

- **How:** `@(Pega-RULES:DateTime).toLOCAL(pegaRulesDate, zone)`
- **Where:** Expressions, Activities
- **Example:** `@(Pega-RULES:DateTime).toLOCAL(@(Pega-RULES:DateTime).dateValue(.pyGMTDate), "PST")`
- **Returns:** `double` -- local timezone equivalent of the GMT date
- **Parameters:**
  - `pegaRulesDate` (double) -- GMT date as days since epoch
  - `zone` (String) -- timezone ID (e.g., `"PST"`, `"America/Los_Angeles"`)
- **Notes:** Also has a BigDecimal overload. Converts a GMT numeric date to the specified
  local timezone.
- **Status:** *(validated)*

---

## Internal / Low-Level Functions

The following functions are primarily for internal Pega use. They are documented here
for completeness but are not recommended for application-level code.

### Get a thread-unique timestamp

- **How:** `@(Pega-RULES:DateTime).pxGetCurrentTimeStampThreadUnique()`
- **Where:** Internal system use
- **Returns:** `String` -- unique datetime per thread (monotonically increasing)
- **Notes:** Uses per-thread state (`pxThread.pzLastRecordedTime`). If the current time
  equals the last recorded time, increments by 1ms. Marked `Final`. Prefer
  `getCurrentTimeStampUnique()` for application code.
- **Status:** *(validated)*

### Get system nano time

- **How:** `@(Pega-RULES:DateTime).pxGetSystemNanoTime()`
- **Where:** Activities (performance measurement)
- **Returns:** `String` -- `System.nanoTime()` as a string
- **Notes:** Thin wrapper around Java's `System.nanoTime()`. Returns a nanosecond-
  precision timer value (not wall-clock time). Useful for measuring elapsed time in
  performance diagnostics. Marked `Final`.
- **Status:** *(validated)*

### Extract millisecond component from TimeOfDay

- **How:** `@(Pega-RULES:DateTime).millisecond(timeOfDay)`
- **Where:** Internal system use
- **Returns:** `int` -- millisecond component (0-999)
- **Parameters:**
  - `timeOfDay` (BigDecimal) -- Pega internal TimeOfDay representation (fraction of day)
- **Notes:** Pega stores TimeOfDay as a `BigDecimal` where 1.0 = 24 hours. This extracts
  the millisecond component from that representation. Very low-level; not used in
  application code.
- **Status:** *(validated)*

### Check if a date is the default datetime (epoch zero)

- **How:** `@(Pega-RULES:DateTime).pxIsDefaultDateTime(cpInputDate)`
- **Where:** Internal system use
- **Returns:** `boolean` -- `true` if the date equals January 1, 1970 (epoch zero)
- **Parameters:**
  - `cpInputDate` (BigDecimal) -- Pega internal date representation
- **Notes:** Takes a `BigDecimal` parameter (Pega internal format), not a String. Checks
  if the date equals `new Date(0L)`. Marked `Final`. For checking empty/null dates in
  expressions, use a blank check instead.
- **Status:** *(validated)*

### Resolve a symbolic date to a boundary date

- **How:** `@(Pega-RULES:DateTimeUtils).pyGetStartOrEndDate(pySymbolName, bGetStartPeriod, bGetDateFormat)`
- **Where:** Internal system use (helper for `pxCompareDateTimeToSymbolicDate`)
- **Returns:** `String` -- resolved date/datetime boundary
- **Parameters:**
  - `pySymbolName` (String) -- symbolic date name (e.g., `"today"`, `"previousweek"`)
  - `bGetStartPeriod` (boolean) -- `true` for start of period, `false` for end
  - `bGetDateFormat` (boolean) -- `true` for date-only format, `false` for datetime
- **Notes:** Internal helper that maps symbolic names to calendar arithmetic. Handles
  35+ symbolic names. Not intended for direct use -- call
  `pxCompareDateTimeToSymbolicDate()` instead, which uses this internally.
- **Status:** *(validated)*

### BigDecimal overloads for component extraction

The `day()`, `month()`, `year()`, `weekday()`, `hour()`, `minute()`, `second()`
functions documented in the Date Component Extraction section all have a second overload
that takes `BigDecimal` instead of `double`. These BigDecimal variants are used when
working with Pega clipboard property values directly (which are represented as
`BigDecimal` internally). They have identical behavior to their `double` counterparts.

The `toGMT()` and `toLOCAL()` timezone conversion functions similarly have BigDecimal
overloads.

- **Status:** *(validated)*

### Deprecated symbolic date comparison (py-prefixed)

- **How:** `@(Pega-RULES:DateTimeUtils).pyCompareDateTimeToSymbolicDate(strDate, comparator, symbolicDate)`
- **Where:** Deprecated -- do not use
- **Returns:** `boolean`
- **Notes:** Deprecated wrapper that delegates entirely to
  `pxCompareDateTimeToSymbolicDate`. Usage description says "Ignore using this function
  directly." Always use the `px`-prefixed version instead.
- **Status:** *(validated)*

---

## Notes

### Pega datetime format gotchas

- All Pega datetimes are stored in **GMT**. When displaying to users, always convert to
  the appropriate timezone using `FormatDateTime()` or `CurrentDate()` with a timezone
  parameter.
- The `T` separator and `.SSS GMT` suffix are part of the format. When constructing
  datetime strings manually, ensure this format is followed exactly.
- Date-only properties use `yyyyMMdd` format (8 characters). Use
  `getTimeStampAsDateStamp()` to extract date from a full datetime.

### Parameter type inconsistencies

- `addToDate`: days/hours/minutes/seconds are **String** (not int)
- `addCalendar`: years/months/weeks/days/hours/minutes/seconds are **String** (not int)
- `compareDatesByDays`: numberOfDays is **int** (not String)
- `pxGetSpecifiedTimeOnDate`: hours/minutes/seconds are **int** (not String)
- `TimeDifference`: nDays/nHours/nMinutes/nSeconds are **int** (not String)
- `isWithinDaysOfNow`: days is **String** (not int)
- `FormatElapsedTime`: elapsedTime is **int** (not String)
- `isDateInThePast` and `FormatElapsedTimeFromProperty`: take **ClipboardProperty**
  (not String) -- only usable in Java steps
- `month()`: returns **0-11** (zero-indexed) -- January is 0, not 1
- `weekday()`: returns **SUNDAY=1 through SATURDAY=7** (Java Calendar convention)
- `dateValue()` / `timevalue()`: return **BigDecimal** (not String or double)
- Component extraction functions (`day`, `month`, `year`, etc.): take **double** or
  **BigDecimal** (not String) -- use `dateValue()` / `timevalue()` to convert first
- `minute()` and `second()`: **do not reliably extract original time components** when
  chained with `timevalue()` -- use `FormatDateTime()` with `"mm"` / `"ss"` instead

### Common patterns

- **Set a deadline 5 business days out:** Use `TimeDifference(@getCurrentTimeStamp(), 5, 0, 0, 0)`
  or SLA rules (which also respect business calendars and holidays).
- **Add 3 months to a date:** `@(Pega-RULES:DateTime).addCalendar(.pyDate, "0", "3", "0", "0", "0", "0", "0")`
  (`addToDate` cannot add months or years).
- **Check if overdue:** `@pxDateTimeisPastOrFuture(.pyDueDate, true)` or
  `@(Pega-RULES:DateTime).CompareDates(@getCurrentTimeStamp(), .pyDueDate)`
- **Calculate age in days:** `@(Pega-RULES:DateTime).DateTimeDifference(.pyCreateDateTime, "", "D")`
  (empty end time = now)
- **Extract year from a date:** `@(Pega-RULES:DateTime).year(@(Pega-RULES:DateTime).dateValue(.pyCreateDateTime))`
- **Get month number (1-indexed):** `@(Pega-RULES:DateTime).month(@(Pega-RULES:DateTime).dateValue(.pyDate)) + 1`
  (remember `month()` is 0-indexed)
- **Display date in user's locale:** Use `FormatDateTime()` with the requestor's
  timezone and locale settings.
