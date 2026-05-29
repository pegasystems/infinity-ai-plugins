---
name: methodology-dx-api-assignment-action
description: Load when building a DX API assignment action payload for runtime case updates. Covers when to use content, when to use pageInstructions, how to combine them, and how to structure supported page, page-list, and page-group instructions for perform-action.
---

Procedural guide for building the payload passed to `perform-action` when a user must
submit an assignment and update case data at runtime.

This skill covers both payload channels:

- `content` -- scalar fields and embedded page fields represented as a JSON object
- `pageInstructions` -- nested page, page-list, and page-group mutations represented as a JSON array

Use this skill for **runtime assignment submission payloads**. Do **not** use it for rule
authoring updates such as `update-rule` deep merges.

## What `perform-action` accepts

The MCP tool call is:

```text
perform-action(assignmentID, actionID, content?, pageInstructions?)
```

Where:

- `assignmentID` identifies the current assignment
- `actionID` identifies the assignment action to submit
- `content` is an optional JSON object of fields to set before the action runs
- `pageInstructions` is an optional JSON array of DX API page list mutations

You may send:

- `content` only
- `pageInstructions` only
- both together

## Decision guide

| Need | Use |
|---|---|
| Set or change a simple field such as `.pyDescription` or `.Amount` | `content` |
| Set or change fields inside an embedded page | `content` |
| Add a new row to a page list | `pageInstructions` with `APPEND` or `INSERT` |
| Add a new entry to a page group | `pageInstructions` with `ADD` and `groupIndex` |
| Change one existing row in a page list | `pageInstructions` with `UPDATE` or `REPLACE` |
| Change every row in a page list | `pageInstructions` with `UPDATE ALL` |
| Delete a row from a page list | `pageInstructions` with `DELETE` |
| Delete every row from a page list | `pageInstructions` with `DELETE ALL` |
| Reorder rows in a page list | `pageInstructions` with `MOVE` |
| Update scalar fields and page-list rows in one submit | both `content` and `pageInstructions` |

## Step 1 -- Inspect the assignment first

Before building the payload:

1. Call `get-assignment`.
2. Confirm the target `actionID` is available.
3. Read the current case data so you understand:
   - which scalar fields belong in `content`
   - which target property is a page, page list, or page group and therefore requires `pageInstructions`
4. Do not guess the action name or property shape when the assignment response can tell you.

## Step 2 -- Build `content`

`content` is a single JSON object.

Use it for:

- scalar properties
- top-level case fields
- embedded page fields represented as nested JSON objects

Example:

```json
{
  "pyDescription": "Customer updated shipping details",
  "RequestedAmount": 250,
  "ContactInfo": {
    "Email": "customer@example.com",
    "Phone": "6175550100"
  }
}
```

### `content` rules

- Must be valid JSON.
- Must parse to an object, not an array or primitive.
- Use nested JSON objects for embedded pages.
- Do not try to mutate page-list rows inside `content`; use `pageInstructions` for that.

## Step 3 -- Decide whether page/page-list changes need `pageInstructions`

When the target field is a Page, Page List, or Page Group, use `pageInstructions` instead
of trying to force the mutation through `content`.

Each page instruction entry is an object inside the `pageInstructions` array.

Available instructions:

- `UPDATE`
- `REPLACE`
- `DELETE`
- `APPEND`
- `INSERT`
- `MOVE`
- `UPDATE ALL`
- `DELETE ALL`
- `ADD`

The `target` field may be a simple property name such as `Items`, a dotted path such as
`.Items`, or a nested path such as `.ContactInformationEmbedded.Addresses` or
`.Items(2).SubItems`. Live server logic prepends the leading `.` if omitted.

Target-type note:

- `UPDATE ALL` and `DELETE ALL` are page-list instructions
- `ADD` is evidenced in platform tests for page groups
- not every instruction is valid for every target type

## Step 4 -- Choose the correct page instruction

### `UPDATE`

Use `UPDATE` to modify one or more properties on an existing row while preserving other
properties on that row.

Required fields:

- `instruction`
- `target`
- `listIndex`
- `content`

Example:

```json
[
  {
    "instruction": "UPDATE",
    "target": "Items",
    "listIndex": 2,
    "content": {
      "Name": "Updated item name"
    }
  }
]
```

### `REPLACE`

Use `REPLACE` to overwrite an existing row.

Required fields:

- `instruction`
- `target`
- `listIndex`
- `content`

Effect:

- the server clears the target row first
- the server reapplies `pyDefault`
- the supplied `content` is then merged into the cleared row
- fields omitted from `content` are overwritten away

Example:

```json
[
  {
    "instruction": "REPLACE",
    "target": "Items",
    "listIndex": 2,
    "content": {
      "Name": "Replacement row"
    }
  }
]
```

### `DELETE`

Use `DELETE` to remove an existing row or embedded page target.

Required fields:

- `instruction`
- `target`
- `listIndex`

Do not send `content` for `DELETE`.

Example:

```json
[
  {
    "instruction": "DELETE",
    "target": "Items",
    "listIndex": 1
  }
]
```

### `APPEND`

Use `APPEND` to add a row to the end of the page list.

Required fields:

- `instruction`
- `target`
- `content`

Do not send `listIndex` for `APPEND`.

Optional field:

- `targetClassID`

Use `targetClassID` when the new embedded page must be created in a more specific class.
Live server logic validates it as a compatible descendant of the target property's page
class. If `targetClassID` is omitted, Pega uses the class from the property definition.

Server note:

- appended rows may receive additional defaults after insert, including values populated by
  `pyDefault`

Example:

```json
[
  {
    "instruction": "APPEND",
    "target": "Items",
    "content": {
      "Name": "New row",
      "Quantity": 1
    }
  }
]
```

### `INSERT`

Use `INSERT` to add a new row before an existing row.

Required fields:

- `instruction`
- `target`
- `listIndex`
- `content`

Optional field:

- `targetClassID`

Use the same `targetClassID` rule as `APPEND`: it must be a compatible descendant of the
target property's page class.

Example:

```json
[
  {
    "instruction": "INSERT",
    "target": "Items",
    "listIndex": 2,
    "content": {
      "Name": "Inserted row",
      "Quantity": 1
    }
  }
]
```

### `MOVE`

Use `MOVE` to reorder rows in a page list.

Required fields:

- `instruction`
- `target`
- `listIndex`
- `listMoveToIndex`

Do not send `content` for `MOVE`.

Example:

```json
[
  {
    "instruction": "MOVE",
    "target": "Items",
    "listIndex": 2,
    "listMoveToIndex": 1
  }
]
```

### `ADD`

Use `ADD` to create a new page-group entry.

Required fields:

- `instruction`
- `target`
- `groupIndex`
- `content`

Do not use `listIndex` or `listMoveToIndex` with `ADD`.

Example:

```json
[
  {
    "instruction": "ADD",
    "target": ".ContactsByType",
    "groupIndex": "Primary",
    "content": {
      "Name": "Alex"
    }
  }
]
```

### `UPDATE ALL`

Use `UPDATE ALL` to merge the same `content` into every row of the target page list.

Required fields:

- `instruction`
- `target`
- `content`

Do not send `listIndex` for `UPDATE ALL`.

Example:

```json
[
  {
    "instruction": "UPDATE ALL",
    "target": "Items",
    "content": {
      "Status": "Reviewed"
    }
  }
]
```

### `DELETE ALL`

Use `DELETE ALL` to remove every row from the target page list.

Required fields:

- `instruction`
- `target`

Do not send `content` or `listIndex` for `DELETE ALL`.

Example:

```json
[
  {
    "instruction": "DELETE ALL",
    "target": "Items"
  }
]
```

## Index rules

The DX API examples use **1-based indexes**:

- `listIndex: 1` means the first row
- `listIndex: 2` means the second row

For `MOVE`:

- `listIndex` is the current position
- `listMoveToIndex` is the destination position

For nested targets:

- indexes inside the `target` path are also 1-based
- out-of-range path indexes fail on the server

For page groups:

- use `groupIndex` instead of `listIndex`
- `groupIndex` is the page-group subscript key, not a numeric row number

Do not assume zero-based indexing.

## Server-side processing

Live Pega server logic performs additional processing after the payload is accepted:

- `instruction` and `target` are always required
- multiple page instructions are applied sequentially in the order sent
- page-instruction `content` has ISO datetime values converted to Pega internal format
- `UPDATE` and `UPDATE ALL` merge content rather than replacing the whole target
- `REPLACE` clears the target and reapplies defaults before merging content
- assignment preprocessing may run before the final apply step

These behaviors explain why runtime results can differ from a naive JSON overwrite.

## MCP validation vs Pega validation

The MCP server validates only a subset of the DX API contract before sending the request.

### What MCP validates

- `pageInstructions` must be valid JSON
- each entry must be an object
- `instruction` is required
- `target` is required
- `content` must be an object for instructions that submit content
- `content` must be valid JSON when provided

### What Pega still enforces

The MCP layer does **not** fully validate all DX API semantics. Build the payload correctly
before sending it.

Examples of fields the agent must reason about correctly:

- `listIndex` for `UPDATE`, `REPLACE`, `DELETE`, `INSERT`, and `MOVE`
- `listMoveToIndex` for `MOVE`
- `groupIndex` for page-group `ADD`
- `targetClassID` for `APPEND` and `INSERT` when class override is needed
- the actual property names inside `content`
- whether the `target` path is valid on the case data model
- whether `UPDATE ALL` or `DELETE ALL` is a better fit than row-by-row mutations
- whether the target is a page, page list, or page group before choosing an instruction

## Combining `content` and `pageInstructions`

Use both when the user is changing normal fields and page-list rows in the same submit.

Example:

```text
perform-action(
  assignmentID="ASSIGN-WORKLIST ...",
  actionID="Submit",
  content="{\"pyDescription\":\"Updated order\"}",
  pageInstructions="[{\"instruction\":\"APPEND\",\"target\":\"Items\",\"content\":{\"Name\":\"Widget\",\"Quantity\":1}}]"
)
```

JSON shape of that combined payload:

```json
{
  "content": {
    "pyDescription": "Updated order"
  },
  "pageInstructions": [
    {
      "instruction": "APPEND",
      "target": "Items",
      "content": {
        "Name": "Widget",
        "Quantity": 1
      }
    }
  ]
}
```

## Common patterns

### Pattern A -- update only normal fields

Use `content` only.

```text
perform-action(
  assignmentID="ASSIGN-...",
  actionID="Submit",
  content="{\"pyDescription\":\"Revised\",\"Amount\":125}")
```

### Pattern B -- append one row to a page list

Use `pageInstructions` only.

```text
perform-action(
  assignmentID="ASSIGN-...",
  actionID="Submit",
  pageInstructions="[{\"instruction\":\"APPEND\",\"target\":\"Items\",\"content\":{\"Name\":\"A\"}}]")
```

### Pattern C -- edit an existing row and submit the assignment

```text
perform-action(
  assignmentID="ASSIGN-...",
  actionID="Submit",
  pageInstructions="[{\"instruction\":\"UPDATE\",\"target\":\"Items\",\"listIndex\":2,\"content\":{\"Name\":\"Corrected\"}}]")
```

### Pattern D -- update fields and delete one row in the same submit

```text
perform-action(
  assignmentID="ASSIGN-...",
  actionID="Submit",
  content="{\"pyDescription\":\"Removed duplicate item\"}",
  pageInstructions="[{\"instruction\":\"DELETE\",\"target\":\"Items\",\"listIndex\":3}]")
```

## Pitfalls

- Do not use `content` as an array.
- Do not use `pageInstructions` as an object; it must be an array.
- Do not omit `target`.
- Do not omit `content` for `UPDATE`, `REPLACE`, `APPEND`, `INSERT`, `ADD`, or `UPDATE ALL`.
- Do not send `content` for `DELETE`, `DELETE ALL`, or `MOVE`.
- Do not use `listIndex` with `APPEND`.
- Do not use `listIndex` with `ADD`.
- Do not use `listIndex` with `UPDATE ALL` or `DELETE ALL`.
- Do not forget `listMoveToIndex` for `MOVE`.
- Do not mix `listIndex`, `groupIndex`, and `listMoveToIndex` on instructions that do not support them.
- Do not assume the row number is zero-based.
- Do not describe `targetClassID` as an ancestor override; live server logic expects a
  compatible descendant class.
- Do not confuse runtime case data mutation with rule authoring deep-merge behavior.

## Agent checklist before calling `perform-action`

- [ ] I fetched the assignment and confirmed the action ID.
- [ ] I identified which changes belong in `content` and which belong in `pageInstructions`.
- [ ] `content` is a JSON object if present.
- [ ] `pageInstructions` is a JSON array if present.
- [ ] Every instruction has the required DX API fields.
- [ ] Every `listIndex` is 1-based.
- [ ] `MOVE` includes `listMoveToIndex`.
- [ ] `APPEND` does not include `listIndex`.
- [ ] `ADD` includes `groupIndex` instead of `listIndex`.
- [ ] `UPDATE ALL` and `DELETE ALL` do not include `listIndex`.
- [ ] If I used `targetClassID`, the class override is intentional and valid.

## What this skill does not cover

- Rule authoring payloads for `create-rule` or `update-rule`
- Deep-merge semantics for `update-rule`
- Flow/view authoring to add or remove fields from an assignment form

For those cases, load the relevant authoring skill instead:

- `methodology-assignment-authoring`
- `methodology-rule-authoring`
- the appropriate `rules-*` skill for the rule type being authored
