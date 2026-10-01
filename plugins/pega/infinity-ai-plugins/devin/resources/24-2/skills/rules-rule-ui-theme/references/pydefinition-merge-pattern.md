---
name: theme-pydefinition-merge-pattern
description: Fetch-then-merge pattern for updating pyDefinition on a Rule-UI-Theme instance without dropping existing tokens. Load before calling update-rule on any theme instance.
---

`pyDefinition` is a single JSON-encoded string, not a list of fields — the platform will not deep-merge it for you. Merge it yourself before calling `update-rule`.

1. `list-rules(ruleType="Rule-UI-Theme", ruleName="MyAppTheme")` to find the instance key.
2. `get-rule(key=<instance key>, detail="full")` and parse the current `pyDefinition` string as JSON.
3. Detect the shape before editing: if a leaf is the raw value directly, it's the flat literal shape; if it's `{"$type": "literal"|"inherited", "$value": ...}`, it's the token shape (see `theme-pydefinition-token-shape-sample`). Edit in that same shape — do not convert one to the other.
4. Apply only the requested token change to the parsed object (e.g. update `base.palette.interactive`, or `components.button.color`), keeping every other existing token untouched. In the token shape, changing an `"inherited"` token's alias target means editing its `$value` path string; overriding it with a fixed value means changing `$type` to `"literal"` and `$value` to the concrete value — only do this if the user asked to break the alias.
5. Re-serialize the merged object to a JSON string and send it back as the full `pyDefinition` value in `update-rule` — a partial or truncated string will drop the rest of the theme.
6. Verify with `get-rule(detail="full")` that the resulting `pyDefinition` still parses as valid JSON and contains both the changed token and every token that existed before the update.

Never send an empty or placeholder `pyDefinition` "to be safe" — that blanks the live theme.
