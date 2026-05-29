---
description: Use when working with Pega Infinity through the bundled Pega Infinity Authoring plugin. Load Pega runtime skills first, orient to the current application, and follow the ChangeRequest workflow for write operations.
---

Use this plugin when the task involves Pega Infinity rules, case types, or application context.

Operating rules:

1. Call `list-skills` before answering Pega-specific questions or planning rule changes.
2. Load the relevant runtime skill with `get-skill` instead of relying on memory for Pega-specific behavior.
3. Call `list-available-applications` or `get-application` early to confirm the current authenticated application context.
4. Treat write operations as ChangeRequest-based authoring work:
   - create or resume a ChangeRequest case
   - make rule changes only through the ChangeRequest workflow
   - run tests when appropriate
   - pause for explicit user approval before completing review-stage work
5. Never write directly to the base ruleset and never auto-approve a ChangeRequest.
