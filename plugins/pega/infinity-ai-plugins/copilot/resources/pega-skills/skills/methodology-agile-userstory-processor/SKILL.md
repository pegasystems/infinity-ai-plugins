---
name: methodology-agile-userstory-processor
description: Use this skill when the user asks to work on agile work items, process backlog user stories, pick the next user story, or act on a specific Pega Agile Workbench UserStory (`Pega-Agile-Work-UserStory`, e.g., `US-7`) by retrieving open items, selecting the highest-priority one, reading full details, and performing the described action.
---

## When to Use

- The user asks to "work on agile work items" or similar phrasing.
- The user asks to "work on the next user story", "process the backlog", or similar.
- The user asks about their "next priority", "next priority task", "next development task", "what should I work on next", "what's next for me", "assign me a task", or any phrasing that asks for the highest-priority pending work item.
- The user wants the agent to read a UserStory and perform the action it describes.
- The user references a specific `pzInsKey` such as `PEGA-AGILE-WORK US-7`.
- The user wants a summary of open or in-progress agile work items.
- The requested work item type is currently within supported scope: `Pega-Agile-Work-UserStory`.

---

## Overview

Pega Agile Workbench stores development work items as case instances in the `Pega-Agile-Work` class hierarchy:

| Work Type | Class | ID Prefix | Description |
|-----------|-------|-----------|-------------|
| User Story | `Pega-Agile-Work-UserStory` | `US-` | Feature request, configuration task, or development work item |

**Current support scope:** process only `Pega-Agile-Work-UserStory`. If other `Pega-Agile-Work-*` subclasses appear, report them as unsupported and continue only with UserStory items.

These are **case instances**, not rule instances. Fetching them requires `run-data-page` (to list items) and `get-case-details` (to read a full instance), not the rules API (`get-rule`, `list-rules`).

Key fields used during processing:

| Field | Meaning |
|-------|---------|
| `pxResults` | Result array from `D_pxWorkBenchUserStories`; each entry is one UserStory record |
| `pxResultCount` / `pyRowCount` | Count metadata for the current response window |
| `pyMaxRecords` / `pyStartIndex` | Pagination window metadata from the data page response |
| `pyPriority` | Numeric priority — **lower value = higher priority** (e.g., `1` is more urgent than `3`) |
| `pyStatusWork` | Case status: `New`, `Open`, `Open-Review`, `Resolved-Completed` |
| `pxCurrentStageLabel` | Current stage in the Agile Workbench lifecycle (e.g., `To do`, `Review`) |
| `pyLabel` | Human-readable title of the work item |
| `pyDescription` | Full description — the main instruction source for UserStories |
| `pyUserStoryAcceptanceCriteria` | Acceptance criteria list (UserStory only) |
| `pxInsName` | Short case ID (e.g., `US-1`) useful for display and cross-checking `pyID` |
| `pyComplexity` | Estimated complexity: `High`, `Medium`, `Low` (UserStory only) |
| `pxUrgencyWork` | Calculated urgency score (informational); use `pyPriority` as the primary selection signal |
| `pzInsKey` | Physical instance key — format: `PEGA-AGILE-WORK {ID}` (e.g., `PEGA-AGILE-WORK US-1`) |

---

## Workflow

Follow these steps in order. Do not skip steps or combine them speculatively.

### Step 1 — Fetch open work items

Call `run-data-page` once with the `D_pxWorkBenchUserStories` data page. Use `dataPageType="list"` (mandatory) and do not pass page parameters. The response includes top-level metadata and a `pxResults` array containing UserStory records.

```
run-data-page(dataPage="D_pxWorkBenchUserStories", dataPageType="list")
```

**Filter the returned list in memory (iterate over `pxResults`):**
- Keep only items where `pxObjClass` is `Pega-Agile-Work-UserStory`.
- Exclude items where `pyStatusWork` is `Resolved-Completed`.
- Prefer items in `New` or `Open` status over `Open-Review` (already in review).
- If `pxCurrentStageLabel` is available, prefer items in `To do` stage.
- If unsupported `Pega-Agile-Work-*` subclasses are present, list them to the user as unsupported for now and exclude them from selection.

> If no active items remain after filtering, report that the backlog is empty and stop.

---

### Step 2 — Select the highest-priority item

From the filtered `pxResults` entries, select the **single** work item to act on:

1. **Sort by `pyPriority` ascending** — the item with the lowest numeric value has the highest priority.
2. **Break ties by `pxCreateDateTime` ascending** — the oldest item at the same priority level is worked first (FIFO).
3. **If the user specified a particular work item** (e.g., "work on US-7"), use that `pzInsKey` directly — skip the sort.

Record the selected item's `pzInsKey`. This is the key used in Step 3.

> Announce the selected item to the user before proceeding: state the ID (`pyID`), title (`pyLabel`), priority (`pyPriority`), and status (`pyStatusWork`).

---

### Step 3 — Retrieve full work object details

Call `get-case-details` with the `pzInsKey` from Step 2:

```
get-case-details(pzInsKey="PEGA-AGILE-WORK US-7")
```

This returns the complete case instance, including `pyDescription`, `pyUserStoryAcceptanceCriteria` (for UserStory), and all authored fields.

> Do not attempt to reconstruct the details from the `run-data-page` list payload — the list response is a summary and may omit fields. Always fetch the full instance with `get-case-details`.

---

### Step 4 — Extract the description and acceptance criteria

From the full instance payload:

1. Read `pyDescription` — this is the primary instruction. It typically follows an "As a ... I need ... so that ..." format for User Stories.
2. For **UserStory** items, also read `pyUserStoryAcceptanceCriteria` — each entry has a `pyCriteria` field. These define the done criteria and constrain the scope of your action.
   - Treat each criterion as an `Embed-UserStory-AcceptanceCriteria` entry; use `pySelected` only as contextual status, and always validate completion against `pyCriteria` text.
3. Summarize what the work item is asking for before taking action. Confirm your interpretation with the user if the description is ambiguous.

---

### Step 5 — Perform the described action

Execute the action indicated by the `pyDescription` using the appropriate skills:

| Description type | Skill / Recipe to use |
|------------------|-----------------------|
| Create or update a Pega rule | `methodology-rule-authoring` → specific `rules-*` skill |
| Design or review a data model | `methodology-case-data-modeling` |
| Set up an integration or connector | `methodology-integration` |
| Configure application security | `methodology-application-security` |
| Explore a case type to find what needs work | `methodology-explore-case-type` |
| Multiple actions described in sequence | Work through each in the order listed in the description |

Load the relevant skill with `get-skill` before authoring rules and follow its create/update workflow.

> Acceptance criteria (Step 4) constrain the scope of your work. Only implement what the criteria require — do not add unrequested features or refactor unrelated rules.

If the selected UserStory requires manual platform setup that cannot be executed through available MCP tools (for example, Email Account configuration in App Studio/Dev Studio):

1. Clearly state the execution limitation.
2. Provide concise manual configuration guidance for the selected item.
3. List currently open/in-progress UserStories from the Step 1 results (include `pyID`, `pyLabel`, `pyPriority`, `pyStatusWork`, and `pxCurrentStageLabel` when available).
4. Ask the user whether to continue with manual guidance for the current item or switch to one of the listed items.

---

### Step 6 — Verify completion

After performing the action:

1. Confirm the change is correct by calling `get-rule` (for rules) or `get-case-details` (for case-linked data) to verify the result.
2. Map the completed work back to the acceptance criteria: state which criteria are satisfied.
3. Report the outcome to the user with:
   - The work item ID and title
   - A brief summary of what was done
   - All concrete changes made for this UserStory (files, rules, configurations, and validations)
   - Which acceptance criteria are satisfied
   - Any criteria that could not be satisfied (with reason)
4. After reporting, explicitly ask whether to proceed to the next highest-priority UserStory.

---

## Priority Selection Reference

| Scenario | Selection rule |
|----------|----------------|
| Mixed priorities in list | Pick the item with the lowest `pyPriority` number |
| Multiple items at same priority | Pick the one with the earliest `pxCreateDateTime` |
| User specifies an item directly | Use the specified `pzInsKey` — skip selection logic |
| Unsupported work item classes also present | Exclude unsupported classes and prioritize only `Pega-Agile-Work-UserStory` |
| All items are `Resolved-Completed` | Report backlog is complete — no action needed |

---

## Anti-Patterns

- **Do not use `list-rules` or `get-rule` to find work items.** Work items are case instances, not rules. The rule API does not index `Pega-Agile-Work-*` instances.
- **Do not act on descriptions without confirming interpretation.** If `pyDescription` is vague, summarize your interpretation and ask the user to confirm before making changes.
- **Do not process multiple work items in one turn without user direction.** Select one item, act on it, report completion, and ask whether to proceed to the next.
- **Do not skip `get-case-details`.** The `D_pxWorkBenchUserStories` list response is a summary — critical fields like `pyDescription` and `pyUserStoryAcceptanceCriteria` require the full instance.
- **Do not guess the priority.** Always use the `pyPriority` field value — do not infer priority from the title or description text.

---

## Notes

- **`pzInsKey` format for work objects** follows the pattern `PEGA-AGILE-WORK {ID}` (e.g., `PEGA-AGILE-WORK US-1`), not the `RULE-*` prefix used for rule instances.
- **Work items are read-only via the cases API.** These instances are created and managed through the Pega Agile Workbench UI. The agent does not create or update UserStory instances — it reads them and acts on their instructions.
- **`pyComplexity`** on UserStory (`High`, `Medium`, `Low`) is informational — use it to calibrate the breadth of investigation before making changes. A `High` complexity story warrants more careful `get-rule` exploration before authoring.
- **Supported class scope.** This skill currently supports only `Pega-Agile-Work-UserStory`.

---

## References

| Skill | When to load |
|-------|--------------|
| `methodology-rule-authoring` | When the work item description requires creating or updating Pega rules |
| `methodology-case-data-modeling` | When the work item involves data model design or Case Type changes |
| `methodology-integration` | When the work item involves connector, REST, or Data Page configuration |
| `methodology-explore-case-type` | When the work item asks to audit or verify a case type's configuration |
| `methodology-change-request-workflow` | Required for all rule authoring — provides the `changeRequestID` |
