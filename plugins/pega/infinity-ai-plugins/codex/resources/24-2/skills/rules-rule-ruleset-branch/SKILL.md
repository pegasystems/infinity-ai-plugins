---
name: rules-rule-ruleset-branch
description: Schema and reference guide for Pega branch rules (Rule-RuleSet-Branch)
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

### Rule-level

These are **reference examples** showing what branch records look like when inspected
via `get-rule`. They are not create payloads — agents never create `Rule-RuleSet-Branch`
records.

| Skill | Label | Description |
|---|---|---|
| `rules-rule-ruleset-branch/examples/stub` | Stub Branch | Minimal branch record — bare-minimum required fields |
| `rules-rule-ruleset-branch/examples/labeled-branch` | Labeled Branch | Branch record with a human-readable display label |

## Authoring Notes

### `pyBranchID` is the class key

`pyBranchID` is the sole identity key (from `pyKeyDefList`). `pyRuleName`
is set by the platform on save (lowercase branch name) and can be omitted.

- **Infrastructure rule type.**
- Branch records are created or attached explicitly through the branch data-page APIs
  workflow, Dev Studio wizard, Branch Management API).
