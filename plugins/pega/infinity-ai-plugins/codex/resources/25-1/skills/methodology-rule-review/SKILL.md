---
name: methodology-rule-review
description: "Load when the user asks to review, inspect, check, examine, analyze, assess, evaluate, audit, or look at existing rules (single-rule or branch-level). For branch review requests, first enumerate rules in the branch, present them to the user, then review selected rules one-by-one. Supports branch-vs-base comparison by fetching the branch rule and its non-branch base rule and returning a structured change report. Resolves rule pzInsKey values, fetches review warnings and guidelines via D_pxRuleReview using run-data-page, consolidates pxWarningsToDisplay, and optionally applies approved changes through the normal rule authoring workflow. Must be loaded before any rule review or inspection call."
---

# Recipe: Review a Rule and Apply Approved Improvements

Use this skill when the user wants to review an existing Pega rule, inspect warnings and recommendations,
get implementation-improvement suggestions, or use a guarded
"review first, then update if approved" workflow.

> **🚨 MANDATORY — ALWAYS FETCH LATEST DATA**
> Rule content may have changed since the last fetch, so always analyze against the latest live rule version from the server.
> Do not rely on cached, previously fetched, or user-supplied data.

> **Scope note:** This review workflow (including `pyRuleReviewGuidelines` parsing, conflict detection, and user precedence clarification) applies to reviews of **any rule type instance**.

## Goal

Given a target (single rule or branch):

1. If the user asked to review a **branch**, list branch rules first and present that list to the user
2. Confirm which branch rules should be reviewed (all or subset)
3. Resolve each selected rule's canonical `pzInsKey`
4. **When requested, compare each branch rule to its base (non-branch) version and produce a per-rule change report**
5. Call `run-data-page` with data page `D_pxRuleReview` (type `page`) and pass `ruleInsKey` as the parameter
6. Consolidate `pxWarningsToDisplay` from the data page response into a de-duplicated warnings list
7. Present the consolidated review response to the user
8. **Immediately after presenting findings, ask the user whether to apply the suggested changes — this question is part of the review output and must always be the last thing said**
9. **Pause for explicit user confirmation before making any rule changes**
10. Only after confirmation, continue through the normal rule authoring workflow


## Trigger Phrases

This skill **must be loaded** when the user's request matches any of the following patterns.
Do not proceed with any rule inspection without loading this skill first.

| Trigger pattern | Example |
|-----------------|---------|
| `/review` | "/review ClientOnboardProcessing" |
| `review [rule name]` | "review Initialize Context for Autopilot" |
| `review the rule` | "review the rule pzSetContextBasedonClass" |
| `inspect the rule` | "inspect the GetClientDetails activity" |
| `check the rule` | "check the ValidatePortfolio validate rule" |
| `look at the rule` | "look at the CalculateTax data transform" |
| `what does [rule] do` | "what does pyStartCase do?" |
| `analyze the rule` | "analyze the ClientOnboarding flow" |
| `assess the rule` | "assess ValidatePortfolio" |
| `evaluate the rule` | "evaluate the SLA for FinancialReview" |
| `examine the rule` | "examine the property AccountManager" |
| `audit the rule` | "audit the activity InitializeContextForAutopilot" |
| `review the branch` | "review the branch MYAPP_FEATURE_X" |
| `/review branch` | "/review branch MYAPP_FEATURE_X" |

**The `search-skills` call must be made before any rule inspection call.** If skill discovery is skipped,
the agent has violated this workflow.

## When to Use

| Situation | Use this recipe |
|-----------|------------------|
| Rule review request | User asks to review a rule and suggest improvements, such as `review the rule <rulename/rule pzInsKey>` |
| Safe change planning | User wants suggestions before authoring changes |
| Guardrail-style remediation | User wants to inspect recommended fixes first |
| Warning handling | User asks to handle rule warnings or review `pxWarningsToDisplay` |
| Human-in-the-loop updates | Suggestions must be approved before implementation |

## Mandatory Gate

**The confirmation step is mandatory and must never be skipped.**

After `run-data-page` with `D_pxRuleReview` returns:

- Present the consolidated suggestions and warnings from `pxWarningsToDisplay` to the user
- Ask whether to apply the suggested changes
- Wait for explicit confirmation such as "yes", "approved", or "apply these changes"
- If the user does not confirm, stop after presenting the review findings

Do **not** call `create-rule`, `update-rule`, `copy-rule`, `initiate-authoring-change`, or assignment
submission actions before the user explicitly confirms.

## Inputs Needed

You need one of these:

- For single-rule review: the rule's canonical `pzInsKey`
- For branch review: a branch identifier (`branchName` / branch ruleset name), then rule keys discovered from that branch

If the user already supplied the exact `pzInsKey`, use it.
If not, resolve it before running the review.
If `pzInsKey` is not available, ask the user for rule context before proceeding.

## Workflow

### Step 0 (branch requests only): Enumerate branch rules first

If the user asks to review a branch, do this **before** any per-rule review calls:

1. Confirm the branch identifier and capture the `branchID` value to send to the data page.
2. Call the Data Page `D_pxBranchForAI` see `methodology-rule-authoring` section "AI Authoring Data Pages"
3. Read branch rules from the response `pxResults` array.
4. Return a clear list of branch rules from `pxResults` (at minimum: `pyRuleName`, `pyClass`, and `pzInsKey`).
5. Ask the user whether to review **all** returned rules or a **subset**.
6. Continue with Step 1A for each selected rule.

### Step 1: Resolve the rule `pzInsKey`

**Preferred path:** use `list-rules` when you know the rule type, class, or rule name.
`list-rules` returns the exact instance key to use.

**Fallback:** use `search-rules` when the user gave only partial identifying information.

**If multiple rules match:** present the candidates and ask the user which rule to review.
Do not run the review on an ambiguous target.

**Optional verification:** call `get-rule(detail="summary")` on the chosen rule to confirm it
is the intended artifact before review. `get-rule` also resolves incoming keys through
`D_pxGetRuleInfo`, so if the supplied handle differs from the canonical rule key, use the
resolved rule key for the review.

**Outcome of Step 1:** one exact rule `pzInsKey`.

### Step 1A (comparison mode): Compare branch rule with base version

Use this step when the user asks for branch delta, base comparison, or "what changed in this branch rule".

1. Fetch the selected branch rule with `get-rule(detail="full")`.
2. Determine the branch name (`branchID`) from the branch review context.
3. Find base candidates with `list-rules` using the selected rule's `ruleType`/`ruleName`/`className`.
4. Exclude candidates whose `ruleSet` equals the branch ruleset (`branchID`).
5. Choose the most specific non-branch candidate in the current application stack (prefer the highest ruleset version that is not withdrawn).
6. Fetch the chosen base rule using `get-rule(detail="full")`.
7. Compare branch and base payloads and produce a concise change report.

Required change report format per rule:

| Field/Section | Base | Branch | Change Type |
|---------------|------|--------|-------------|
| `<path or logical section>` | `<old value>` | `<new value>` | Added / Removed / Modified |

Comparison output rules:
- Include only functional differences (logic, conditions, mappings, steps, fields, routing, validations).
- Exclude server-managed noise (timestamps, operators, pz/px identity metadata, lock/audit fields).
- If no functional differences are found, state: "No functional changes detected between branch and base versions."
- If no non-branch base candidate exists, report: "Base rule version not found for comparison" and continue with normal review for that branch rule.

### Step 2: Fetch rule warnings, review comments, and guidelines via D_pxRuleReview

**Tool:** `run-data-page`

**Parameters:**
- `dataPage`: `D_pxRuleReview`
- `dataPageType`: `page`
- `payload`: flat JSON object with `ruleInsKey` set to the resolved rule `pzInsKey` (`ruleInsKey` is the `pzInsKey` of the rule to be reviewed — mandatory)

**Example call:**

```json
run-data-page(
  "D_pxRuleReview",
  "page",
  "{\"ruleInsKey\": \"RULE-OBJ-PROPERTY MYORG-MYAPP-DATA-CUSTOMER ACCOUNTMANAGER #20260703T143025.124 GMT\"}"
)
```

The response contains `pxWarningsToDisplay` — an array of warning objects. Each warning includes:

| Field | Description |
|-------|-------------|
| `pxWarningName` | Short warning label |
| `pxWarningMessage` | Full warning description |
| `pxWarningType` | Category (e.g. `Maintainability`) |
| `pxWarningSeverity` | Numeric severity (1 = highest) |
| `pxIsWarningJustified` | `"true"` if already justified/acknowledged |
| `pyWarningJustifiedMessage` | Justification note (if provided) |
| `pxWarningDetails` | Rule or embed context for the warning |
| `pxWarningRuleSetType` | `STANDARD` or `PEGA` |

The response also contains `pyRuleReviewGuidelines` — a plain string value with the following fixed format:

```
Platform rule review guidelines: <<Platform guidelines text>>

Rule review guidelines customized for this application: <<Application-specific guidelines text>>
```

**MANDATORY: Parse and handle `pyRuleReviewGuidelines` as follows:**
- If `pyRuleReviewGuidelines` is absent, null, or empty, skip guideline processing entirely and proceed with warnings only — do **not** inform the user that guidelines were absent or empty
- If present and non-empty, extract the text after `Platform rule review guidelines:` as the Platform guidelines section
- Extract the text after `Rule review guidelines customized for this application:` as the Application-specific guidelines section
- Either or both sections may be empty or absent even when the field itself is present
- If both sections are empty, treat the field as having no actionable guidelines and skip guideline processing
- Detect conflicts: if the Platform section and the Application-specific section provide contradictory guidance on the same topic or rule, this is a conflict
- If conflicts are detected, immediately present them to the user and ask: *"These guidelines have conflicting recommendations. Which source should take precedence — Platform guidelines or Application-specific guidelines?"* Do not proceed until the user clarifies precedence
- Honor the user's precedence choice when presenting and applying guidelines

De-duplicate warnings by `pxWarningName` + `pxWarningDetails`. Present warnings in two groups:

- **Unjustified warnings** (`pxIsWarningJustified: "false"`) — primary actionable findings, shown first.
- **Already Justified Warnings** (`pxIsWarningJustified: "true"`) — shown in a clearly labeled separate section; see Step 3 for the required question to ask.

### Step 3: Present the review response and enforce confirmation

When `run-data-page` returns `pxWarningsToDisplay` successfully:

1. Summarize the findings in clear user-facing language, grouped by severity or type
2. If comparison mode is requested, present the **Branch vs Base Changes** section before warnings
3. Present **unjustified** warnings first as primary actionable findings — show full warning details (`pxWarningName`, `pxWarningMessage`, `pxWarningSeverity`, `pxWarningType`) for each entry
4. Present **already justified** warnings in a clearly labeled **"Already Justified Warnings"** section — show the same full details plus any `pyWarningJustifiedMessage` — and explicitly ask: *"These warnings have been previously justified. Would you like to address any of them?"*
5. Wait for the user's response on justified warnings before deciding whether to include them in the approved change scope
6. Apply `pyRuleReviewGuidelines` per the parsing rules in Step 2; present resolved guidelines in a **"Review Guidelines"** section
7. Keep the original recommendation details available if the user wants them verbatim
8. **As the final line of your response, ask the user whether to apply the suggested changes — do not end the response without this question when there are any findings, warnings, or suggestions**
9. Wait for explicit confirmation

**Required behavior:**

- If the user says **yes / approved / apply them** → continue to Step 4
- If the user says **no / not now / review only** → stop after returning the review
- If the user approves only a subset → apply only that approved subset
- If the review response is empty or has no actionable recommendations → report that and stop unless the user separately requests manual authoring
- If the review response includes warnings only → present the warnings (both unjustified and already-justified sections as appropriate) and still ask for confirmation before any update step
- If the user approves addressing one or more **already justified** warnings → include them in the approved change scope for Step 4; if the user declines → skip them
- If the review response includes guidelines only (no warnings) → present the guidelines with any detected conflicts and still ask for confirmation before any update step

### Step 4: After approval, switch to the standard authoring path

Once the user has explicitly confirmed the changes:

1. Load `methodology-change-request-workflow`
2. Follow its **Pre-flight: Determine the Authoring Path** section
3. If a matching deterministic authoring workflow exists and is within limitations, use it
4. Otherwise load `methodology-rule-authoring`
5. Treat the approved review suggestions as the full and exact change scope. Do **not** reinterpret approval as permission to redesign, refactor, or reimplement the rule.
6. Load the specific `rules-*` skill for the target rule type before writing
7. If the rule is not already in the branch ruleset for the Change Request, copy it first with `copy-rule`
8. Apply the approved changes with `update-rule` (or the matched workflow if applicable) using a **sparse** payload that includes only the fields needed to implement the approved suggestions
9. Verify the final rule state with `get-rule(detail="full")`
10. Return the authored changes to the Change Request review stage for human approval as required by `methodology-change-request-workflow`

## Call Discipline

| Rule | Agent behavior |
|------|----------------|
| Resolve first | Do not start the review until one exact rule `pzInsKey` is known and can be passed to `run-data-page` with `D_pxRuleReview` |
| One review target | Review one confirmed rule at a time |
| Review before write | Always complete the review call and confirmation gate before authoring |
| No implicit approval | Silence, partial discussion, or curiosity is not approval |
| Approved scope only | Implement only the suggestions the user explicitly approved |
| Standard write safety | All rule changes still go through ChangeRequest-safe authoring |
| Honor guidelines | When `pyRuleReviewGuidelines` is present and non-empty, extract and present it; if Platform and Application-specific sections conflict, surface the conflict to the user, wait for explicit precedence confirmation, and honor the user's choice — do not choose precedence unilaterally |

## Anti-Patterns

- **Do not skip skill discovery.** Always call `search-skills` before any rule review call. Proceeding without loading this skill is a workflow violation.
- **Do not skip confirmation.** The user must explicitly approve suggested changes.
- **Do not author directly after the data page call.** Review findings alone are not authorization to change the rule.
- **Do not review an ambiguous rule match.** If more than one rule fits, ask the user to choose.
- **Do not apply all suggestions automatically.** The user may approve only selected recommendations.
- **Do not bypass the ChangeRequest workflow after approval.** Approved changes still require the normal branch-safe authoring path.
- **Do not silently ignore justified warnings.** Warnings with `pxIsWarningJustified: "true"` must be presented in an **"Already Justified Warnings"** section and the user must be explicitly asked: *"These warnings have been previously justified. Would you like to address any of them?"* Passively surfacing them without asking is a workflow violation.
- **Do not reimplement the rule while addressing review suggestions.** Post-review authoring is limited to the exact approved suggestions. Use targeted `update-rule` changes only for the affected fields, steps, or list elements, and leave unrelated rule structure untouched.
- **Do not omit `pyRuleReviewGuidelines`.** When the review response includes guidelines, extract and present them. Skipping guidelines is a workflow violation.
- **Do not ignore or unilaterally resolve guideline conflicts.** If Platform and Application-specific guidelines conflict, surface the conflict to the user, pause, and wait for explicit precedence confirmation before proceeding. Honor the user's stated precedence when presenting and applying all guidelines.
- **Do not compare raw server metadata.** Branch-vs-base comparisons must ignore `pz/px` identity values, lock state, timestamps, and audit/operator fields.
- **Do not treat a branch copy as the base version.** Base comparison must use a non-branch ruleset candidate; if none exists, report that explicitly.

## Notes

### If the user already knows the exact rule key

You can start directly with that `pzInsKey`, but still treat the review response as
read-only until the user confirms implementation.

### If the user gave a non-canonical handle

If the supplied handle resolves to a different canonical rule key, use the resolved
`pzInsKey` for `run-data-page` with `D_pxRuleReview` and tell the user which rule key is being reviewed.

### If the review suggestions are unclear

Present the suggestions first, then ask the user which of them should be implemented.
Do not guess at intent from the review response alone.
