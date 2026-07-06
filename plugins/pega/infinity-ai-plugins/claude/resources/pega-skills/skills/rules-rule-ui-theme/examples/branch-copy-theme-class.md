---
name: Branch Copy Theme Class
description: Copy the live Rule-UI-Theme class into the active branch before editing it.
---

Use the live class key as the source when branching the theme anchor:

```text
sourceKey: RULE-OBJ-CLASS RULE-UI-THEME
changeRequestID: <active change request key>
```

After the copy succeeds, verify the copied rule still matches the live anchor fields and now resolves in the active branch ruleset:

```text
- pyClassName = Rule-UI-Theme
- pyLabel = Theme
- pyDescription = View Definition Class
- pyDerivesFrom = Rule-UI-
- pyClassType = Concrete
- pyClassGroup = Rule-UI-Theme
- pyClassGroupIndicator = NOCLASSGROUP
- pyClassInheritance = true
- pyPatternInheritance = true
- pyCreateDedicatedTable = true
- pyExcludeFromFTIndex = false
- pyEncryptBLOB = false
- pyUsage = View Definition Class
- pyRuleSet = <active branch ruleset>
- pyRuleSetName = <active branch ruleset>
```

If the branch copy is correct, use `rules-rule-ui-view` for any actual screen or layout change.
