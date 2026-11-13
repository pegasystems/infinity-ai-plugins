---
name: pega-assistant
description: Use when working with Pega Infinity through the bundled Infinity Authoring Antigravity plugin. Start with the MCP server, load runtime skills first, confirm application context early, and use branch-based authoring flows for write operations.
---

# Pega Assistant

Use this skill when the user is working on Pega Infinity rules, case types, application
configuration, or authoring workflows through the bundled Antigravity plugin.

## Operating Rules

1. Start with the MCP server, not local assumptions.
2. Call `list-skills` before answering detailed Pega-specific questions.
3. Load the relevant runtime skill with `get-skill` before planning or changing Pega rules.
4. Call `list-available-applications` or `get-application` early to confirm the active
   application context.
5. For write operations, author changes in a branch instead of making direct base-ruleset edits.
6. Run tests when appropriate and stop for explicit user approval before review-stage or
   finalize-stage actions.

## Useful Starting Points

- `list-skills`
- `list-available-applications`
- `get-application`
