---
description: "Pega standard library for logging, tracing, exception capture, and debugging"
---
# Logging and Debugging

Reusable Pega assets for logging messages, tracing execution, and capturing errors.

## Category Scope

- Logging diagnostic messages
- Tracing rule execution
- Capturing and logging exceptions
- Performance tracing
- Clipboard inspection
- Alert and notification logging
- Debug mode configuration

## Bootstrap Hints

To populate this file during bootstrap:
- Search for activities with "Log" in the name (e.g., `pxLogException`,
  `pxLogMessage`)
- Look for the `Log-Message` activity method
- Search for tracer-related rules and configuration
- Inspect standard error handling activities for logging patterns
- Look for `pxAlertLogMessage` and similar alerting activities
- Search for clipboard tools and debugging utilities

## Known Items

*(All items below are seeded from domain knowledge and marked unvalidated. Update
status after confirming on a live Pega instance.)*

### Log a message

- **How:** `Log-Message` method in an Activity step, or `@log` function
- **Where:** Activities
- **Example:** Activity step with method `Log-Message`, parameter
  `"Processing case: " + .pyID` at log level INFO
- **Status:** *(unvalidated)*

### Log an exception

- **How:** `pxLogException` activity or `Log-Exception` method
- **Where:** Activities (catch blocks)
- **Example:** In an activity's catch block, call `pxLogException` to record the
  error with stack trace
- **Status:** *(unvalidated)*

### Trace rule execution

- **How:** Tracer tool in Dev Studio -- enables step-by-step execution tracing of
  rules
- **Where:** Dev Studio (not a rule, but a debugging tool)
- **Example:** Enable tracer, reproduce the issue, inspect which rules executed in
  what order
- **Status:** *(unvalidated)*

### Add a breakpoint in an activity

- **How:** Breakpoint step type in an Activity, or tracer breakpoint configuration
- **Where:** Activities, Tracer
- **Example:** Add a step with method `Breakpoint` to pause execution when tracer
  is active
- **Status:** *(unvalidated)*

### Inspect clipboard contents

- **How:** Clipboard tool in Dev Studio -- shows all pages and properties currently
  on the clipboard
- **Where:** Dev Studio (not a rule, but a debugging tool)
- **Example:** Open clipboard tool, navigate to the work page, inspect property values
- **Status:** *(unvalidated)*

## Notes

- **`oLog` in Java steps:** Implicit SLF4J-style logger in `pyStepsJavaSource`
  (`oLog.info(...)`, `.debug`, `.warn`, `.error`). Writes to Pega app log, not Tracer.
  For Tracer, use `Log-Message` with `SendToTracer = "true"`.

```java
oLog.info("MyActivity: Processing complete for case " + myStepPage.getString("pyID"));
```
