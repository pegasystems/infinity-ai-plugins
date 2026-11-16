# Pega Infinity Authoring Guidelines for Antigravity

When working with Pega Infinity in Antigravity:

## Operating Rules
1. **Tool-First Discovery**: Start with the MCP server tools (`list-skills`, `get-application`) rather than local assumptions.
2. **Context Verification**: Call `get-application` early to confirm the active application, version, and ruleset stack.
3. **Skill-Guided Authoring**: Before planning or creating Pega rules (properties, views, data models, activities, decision tables), call `get-skill` to load the exact Pega rule recipe and schema for the target version.
4. **ChangeRequest Workflows**: Always use branch-based ChangeRequest workflows for write operations. Never attempt direct edits on locked or base application rulesets.
5. **Human in the Loop**: Stop and obtain explicit user approval before submitting change requests for review, merging branches, or finalizing rule check-ins.
