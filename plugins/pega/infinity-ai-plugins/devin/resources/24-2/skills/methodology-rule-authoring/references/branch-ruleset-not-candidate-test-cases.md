---
name: authoring-branch-ruleset-not-candidate
description: Resolve "Branch ruleset not candidate" errors when creating Rule-Test-Unit-Case rules by finding and using the application's dedicated test ruleset.
---

# Troubleshooting: "Branch ruleset not candidate" for Test Cases

If creating a `Rule-Test-Unit-Case` in the branch ruleset fails with "Branch ruleset
not candidate", the branch ruleset may not be configured to hold test rules. To resolve
this:

1. **Open the application rule** — `get-application` returns the application's
   `pzInsKey` (e.g., `RULE-APPLICATION MYAPP 01.01.01`). Call `get-rule` with
   `detail='full'` on that key. The response includes `pyRuleSetList` — an array of
   all rulesets and versions in the application stack (e.g.,
   `"MyApp:01-01","MyAppTest:01-01",...`).
2. **Look for a testing ruleset** — scan `pyRuleSetList` for rulesets whose name
   suggests a test purpose (e.g., names containing "Test").
3. **Verify the test ruleset** — the `pzInsKey` of a `Rule-RuleSet-Name` is
   `RULE-RULESET-NAME <UPPERCASED_NAME>` (e.g., `RULE-RULESET-NAME MYAPPTEST`).
   Call `get-rule` on that key and check if the property `pyIsTestRuleSet` is `"true"`.
   A test ruleset is specifically configured to hold test artifacts like
   `Rule-Test-Unit-Case` rules.
4. **Create the test case in the test ruleset** — once identified, pass the test ruleset
   name via the `ruleSet` parameter on `create-rule`:
   ```
   create-rule(ruleType="Rule-Test-Unit-Case", ruleSet="MyAppTest", content=..., changeRequestID=...)
   ```
5. **If no test ruleset is found** — if none of the rulesets in `pyRuleSetList` have
   `pyIsTestRuleSet` set to `"true"`, ask the user which ruleset to use for test cases.

This ensures test cases are saved to a ruleset that accepts them, even when the branch
ruleset does not.
