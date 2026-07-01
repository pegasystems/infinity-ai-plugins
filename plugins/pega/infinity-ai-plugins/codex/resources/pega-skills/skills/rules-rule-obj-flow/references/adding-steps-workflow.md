---
name: adding-steps-workflow
description: "Load when adding a new shape to an existing flow. Covers shape naming, backing-rule creation order, pyFromTasks registration, connector wiring, and verification."
---
# Adding Steps to an Existing Flow

How to add a new step (shape) to an existing `Rule-Obj-Flow`.

## Step 1: Inspect the Flow

**Tool:** `get-rule` with `key="{FlowKey}"`, `detail="full"`

Capture:
- `pyFromTasks` -- current shape inventory
- `pyLocalActions` -- existing FlowAction wiring
- `pyEndingActivities` -- terminal shapes

## Step 2: Choose a Shape Name

Increment the highest existing number for the prefix.
See the "Shape Name Prefixes" table in `SKILL.md` for the full list of prefixes by step type.

## Step 3: Create the Backing Rule

- **Assignment** -> FlowAction + View (see `references/flowaction-wiring-patterns`)
- **Decision** -> Decision Table/Tree/When (see `references/shapes-decision`)
- **Utility (Data Transform)** -> see `shapes-utility`
- **Utility (Notification)** -> see `rules-rule-notification`
- **GenAI** -> see `references/shapes-genai`

## Step 4: Register the Shape in `pyFromTasks`

**Tool:** `update-rule` with `key="{FlowKey}"`

Add the new shape name using either a sparse positional patch with `{}`
placeholders for untouched rows, or the complete desired list with
`listUpdateMode="replace"`.
See `examples/stub.md` for the `pyFromTasks` JSON structure.

## Step 5: Wire FlowAction (Assignment Steps Only)

Add the FlowAction to `pyLocalActions` using the same patch-or-replace strategy.

## Step 6: Add Shape and Connectors to `pyModelProcess`

**Tool:** `update-rule` with `key="{FlowKey}"`

Add the shape to `pyModelProcess.pyShapes` and connectors to
`pyModelProcess.pyConnectors`. See `references/canvas-structure`
for sparse deep-merge behavior and exact-path overrides for nested list fields like
connector waypoints.

## Step 7: Verify

See "Verification Checklists" in `SKILL.md` — "After adding a step".
