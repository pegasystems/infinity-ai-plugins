---
description: "Standard library index -- table of contents, lookup table mapping tasks to the right library file, and validation status of each reference"
---
# Pega Standard Library Index

## Overview

This directory contains task-oriented references for reusable Pega assets -- functions,
standard activities, data pages, properties, and patterns that already exist in Pega
and should be used when authoring rules rather than reinventing them.

While other prompt files describe rule types and their structure, the library answers:
**"I need to do X -- what does Pega already provide?"**

## Table of Contents

| File | Description | Entries | Status |
|------|-------------|---------|--------|
| `string-manipulation.md` | Text operations: concatenation, case conversion, trim, substring, search, replace, regex, encoding | 47 | validated |
| `collection-operations.md` | PageList/PageGroup: filter, sort, count, aggregate, iterate | 24 | validated |
| `status-and-lifecycle.md` | Case status, resolution, SLAs, urgency, lifecycle transitions | 20 | validated |
| `date-and-time.md` | Dates, times, durations, deadlines, formatting, comparison | 50 | validated |
| `numeric-and-math.md` | Rounding, min/max, aggregation, abs, sqrt, exp, number formatting, numeric guards | 30 | validated |
| `data-access.md` | Current operator, access groups, application settings, system data pages | 5 | unvalidated |
| `navigation-and-routing.md` | Work routing, assignment transfer, escalation, work queues | 12 | validated |
| `validation.md` | Required fields, format checks, range constraints, cross-field rules | 17 | unvalidated |
| `logging-and-debugging.md` | Log-Message, tracer, exception capture, debug utilities | 5 | unvalidated |

## Lookup Table

| I need to... | Look in |
|-------------|---------|
| Get the current date/time, calculate a deadline, format a date, compare dates | `date-and-time.md` |
| Concatenate strings, trim, extract substrings, convert case, match patterns | `string-manipulation.md` |
| Round numbers, calculate min/max, sum a list, format currency | `numeric-and-math.md` |
| Look up the current operator, access group, application settings, system info | `data-access.md` |
| Filter a PageList, sort a list, count matching items, aggregate values | `collection-operations.md` |
| Route work to a queue or operator, transfer an assignment, escalate | `navigation-and-routing.md` |
| Change case status, resolve/reopen a case, manage SLAs, set urgency | `status-and-lifecycle.md` |
| Validate a field, check required fields, enforce formats, cross-field checks | `validation.md` |
| Log a message, trace execution, capture an error, debug a rule | `logging-and-debugging.md` |

## Entry Template

Every item in a library file follows this structure:

```
### {Task description}

- **How:** {The Pega function, property, activity, data page, or pattern to use}
- **Where:** {Which rule types support this -- expressions, activities, data transforms, etc.}
- **Example:** {How it appears in rule configuration or an expression}
- **Status:** *(unvalidated)* or *(validated)*
```

## Bootstrap Enrichment

These files are seeded with Pega domain knowledge and enriched during the schema
bootstrap process (see `schemas/_bootstrap.md`). The bootstrap populates library files
by:

1. **Discovering standard rules:** Search for out-of-the-box (OOTB) rules using naming
   conventions -- rules with `px`, `py`, or `pz` prefixes, data pages starting with
   `D_px` or `D_py`, activities on `@baseclass` or `Work-`, etc.
2. **Inspecting discovered rules:** Use `get-rule detail="full"` to understand what
   each standard rule does.
3. **Categorizing by task:** Place each discovered asset in the appropriate library
   file based on what task it helps accomplish.
4. **Documenting usage:** Record how the asset is used in rule authoring -- what rule
   types can leverage it and in what context.

### Bootstrap hints by file

| File | What to search for |
|------|-------------------|
| `date-and-time.md` | Functions with "Date" or "Time" in name; activities like `pxGetCurrentDateTime`; properties like `pxCreateDateTime` |
| `string-manipulation.md` | String-related library functions; `@baseclass` activities for string operations |
| `numeric-and-math.md` | Math-related library functions; rounding/aggregation utilities |
| `data-access.md` | Data pages starting with `D_px` and `D_py`; system data pages for operators, access groups, applications |
| `collection-operations.md` | `@baseclass` activities for page operations; PageList/PageGroup utility methods |
| `navigation-and-routing.md` | Standard flow actions for routing; activities like `pxGetNextWork`, `pxTransferAssignment`; work queue rules |
| `status-and-lifecycle.md` | Activities for status changes (`pxResolve`, `pxReopen`); standard status property values; SLA-related rules |
| `validation.md` | Standard constraint rules; validation-related activities; edit validate rules |
| `logging-and-debugging.md` | `Log-Message` activity method; tracer-related rules; `pxLogException` and similar |

## Maintaining the Library

- When an authoring attempt fails because an OOTB asset was not used (e.g., built a
  custom date function when `@CurrentDateTime` exists), add the asset to the
  appropriate file and note the lesson in that file's Notes section.
- When a new OOTB asset is discovered during any authoring session (not just bootstrap),
  add it immediately.
- Mark entries as *(validated)* after confirming they work on a live instance.
