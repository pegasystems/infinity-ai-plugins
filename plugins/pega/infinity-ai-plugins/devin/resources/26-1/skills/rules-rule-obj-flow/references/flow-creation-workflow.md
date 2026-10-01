---
name: flow-creation-workflow
description: "Load when creating a brand-new flow from scratch. Covers choosing category and structure type, setting rule-level fields, wiring initial shapes, and post-creation verification."
---
# Flow Creation Workflow

How to create a new `Rule-Obj-Flow` rule and wire its initial shapes.

## Step 1: Create the Flow Record

**Tool:** `create-rule` with `ruleType="Rule-Obj-Flow"`

Key constraints:
- `pyStartActivity` is `"Start1"` for FlowStandard, `"Start62"` for ScreenFlow
- Set `pyDraftModeON: "false"` for new flows authored via API
- `pyCanCreateWorkObject` is required: `"true"` for start-case flows (flows that create a new work object, e.g. `pyStartCase`), `"false"` for all other flows (subprocess flows, assignment flows, screen flows). Defaults to `"false"` if omitted.

**For a sub-flow** (called by a SubProcess shape), also set:
- `pyCanStartInteractively: false`
- `pySkipNewHarness: true`

## Step 2: Create Backing Rules

Depending on the flow's steps:
- **Assignment steps** -> create FlowAction + View (see `references/flowaction-wiring-patterns`)
- **Decision steps** -> create Decision Table/Tree/When (see `references/shapes-decision`)
- **Utility steps** -> create Activity or Data Transform (see `shapes-utility`)
- **Notification steps** -> create four-rule bundle (see `rules-rule-notification`)
- **GenAI steps** -> create connector + FieldValue (see `references/shapes-genai`)

## Step 3: Wire FlowActions to the Flow

**Tool:** `update-rule` with `key="{FlowKey}"`

Add each FlowAction to `pyLocalActions`.

- Under default patch mode, keep existing rows with `{}` placeholders and append new
  rows at the end.
- If you are sending the complete desired action list, call `update-rule` with
  `listUpdateMode="replace"`.

## Step 4: Add Shapes to `pyModelProcess`

**Tool:** `update-rule` with `key="{FlowKey}"`

Add shapes and connectors to `pyModelProcess.pyShapes` and
`pyModelProcess.pyConnectors`. See `references/canvas-structure`
for patch-vs-replace behavior and exact-path overrides for nested lists such as
connector waypoints.

Update `pyFromTasks` with the same strategy: sparse positional patches with `{}`
placeholders for untouched rows, or the complete desired list with
`listUpdateMode="replace"` when removing or reordering rows.

### Common Shape Patterns

| Goal | Shape sequence |
|------|---------------|
| Single assignment then end | Start1 -> Assignment1 -> End1 |
| Assignment -> approval -> outcomes | Start1 -> Assignment1 -> Decision1 -> Assignment2 / End1 |
| Assignment -> automation -> assignment -> end | Start1 -> Assignment1 -> Utility1 -> Assignment2 -> End1 |
| Sub-process within a stage | Start1 -> SubProcess1 -> End1 |
| Notification before assignment | Start1 -> Utility1 (notification) -> Assignment1 -> End1 |

## Step 5: Verify

See "Verification Checklists" in `SKILL.md` — "After creating a new flow".

## Branch Authoring

When authoring inside a ChangeRequest branch, use the branch ruleset name
(`{base}_Branch_{branchID}`) and version `01-01-01`, NOT the base ruleset version.
See `methodology-change-request-workflow`.
