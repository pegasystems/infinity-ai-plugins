---
name: rules-rule-ruleset-name
description: Schema and authoring guide for Pega ruleset name records (Rule-RuleSet-Name), including standard versus branch rulesets, identity fields, and branch-specific flags.
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Examples

| Skill | Description |
|-------|-------------|
| `rules-rule-ruleset-name/examples/standard` | Minimal standard ruleset record showing the required authored identity fields |
| `rules-rule-ruleset-name/examples/branch` | Minimal branch ruleset record showing the additional branch-only identity fields |

## Authoring Notes

### Identity fields

- `pyRuleSetName` is the authored ruleset identifier.
- `pyRuleSet` is auto-derived from `pyRuleSetName`.
- `pyRuleSetVersion` is always empty on `Rule-RuleSet-Name`.

### Standard versus branch rulesets

| Type | Key fields |
|------|------------|
| Standard ruleset | `pyRuleSetName`, `pyLabel`, `pyRuleSetType: "STANDARD"` |
| Branch ruleset | `pyRuleSetName`, `pyLabel`, `pyRuleSetType: "BRANCH"`, `pyBranchID`, `pyBranchOrigin` |

### Schema

Load `rules-rule-ruleset-name/schema/rule-ruleset-name` before creating or updating this rule type.
