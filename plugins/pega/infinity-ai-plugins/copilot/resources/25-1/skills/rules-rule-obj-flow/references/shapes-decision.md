---
name: shapes-decision
description: "Load when authoring a Decision shape in a flow (any variant — when-rule, property compare, table/tree-backed) — covers required fields, connector wiring, and type-specific gotchas."
---

## Decision Shapes

`pxObjClass: Data-MO-Gateway-Decision` — route based on a condition.

| Field | Description |
|-------|-------------|
| `pyDecisionClass` | `"Data-MO-Gateway-DataXOR"` (most common — when-rule and property-comparison Decisions) or `"EXPRESSION"` (inline property reference). `"Rule-Declare-DecisionTable"` / `"Rule-Declare-DecisionTree"` appear on table/tree-backed Decisions. |
| `pyCompareOperator` | Comparison operator for simple property-compare conditions (e.g., `"="`). **Absent** when the Decision is a when-rule test — the when-rule-ness lives only on the outgoing connector. |
| `pyStoreProperty` | Property to store the decision result. **Absent/empty** on when-rule-test Decisions. |
| `pyImplementation` | `""` (empty) on DataXOR Decisions — including when-rule-test variants. Do **not** write the when-rule name here. |
| `pyRowHeader` / `pyColumnHeader` | Decision table row/column headers (only populated when backed by a table) |
| `pyExpressionGadget` | Embedded `PegaGadget-ExpressionBuilder` with `pyExpression` (simple compare Decisions only) |

> **Decisions tested by a when-rule — class stays DataXOR.** When a Decision
> branches on a when-rule (e.g. `pzApproved`), the **shape** is still
> `pyDecisionClass: "Data-MO-Gateway-DataXOR"` with empty
> `pyImplementation`/`pyCompareOperator`/`pyStoreProperty`. The when-rule name
> appears **only on the outgoing WHEN connector**, as
> `pyConditionType: "When"` + `pyExpression: "<whenRuleName>"`. There is no
> separate `pyDecisionClass: "Rule-Obj-When"` variant — that value is **not
> server-observed**. See `examples/decision-step.md`.

Branches from a Decision shape with **multiple outgoing connectors** carry
`pyIsFork: "true"` on each outgoing connector. For two-branch Decisions the
WHEN connector carries `pyLikelihood: "100"` and the ELSE connector carries
`pyLikelihood: "0.0"` (decimal string) by default; author-configured values vary (e.g. `"50"`/`"50.0"` for balanced splits). The ELSE connector's `pyExpression` is
`""` (empty), not `"Else"`; the `pyConditionType: "Else"` marker alone
identifies the default branch. See `references/routing-decision.md` →
"Decision Shape Branch Ordering".

> **Degenerate Decisions do not carry `pyIsFork`.** When a Decision has only one
> outgoing connector (typically `Else`), the server does **not** write
> `pyIsFork` — the connector looks like any other linear transition. Only emit
> `pyIsFork: "true"` on connectors whose source shape actually branches. When in
> doubt, omit the field.

> **Degenerate Decisions.** In legacy or imported flows a Decision shape may have
> only **one** outgoing connector (typically `Else`), flowing straight to the next
> shape in a linear sequence. This happens when the original branches were removed
> but the Decision shape itself was kept. When updating or recreating such a flow,
> preserve the exact out-edge count and condition label — do not expand the shape
> into a textbook multi-branch XOR pattern.

### Server-written Decision empty placeholders

Every server-authored Decision shape also carries these empty placeholder fields
alongside its primary fields. Include them when recreating for parity:

| Field | Value |
|---|---|
| `pyImplementation` | `""` |
| `pyColumnHeader` | `""` |
| `pyRowHeader` | `""` |
| `pyStoreProperty` | `""` |
| `pyActivityTypeSelector` | `""` |
| `pyAutomationAppliesTo` | `""` |
| `pyFAProcessOnJump` | `"false"` |
| `pyFromMODefName` | `"Decision"` |
| `pyCallParams` | `{}` |
| `pyContextRefs` | `[]` |

> **Degenerate Decisions carry a minimal `pyRouterProp` stub.** On a single-Else
> Decision, `pyRouterProp` is `{ "pxObjClass": "Data-MO-Activity-Router" }` with
> **no** `pyImplementation`, **no** `pyCallParams`, **no** `pySkills` row
> (unlike Assignment shapes, where the router is fully populated). Preserve the
> minimal stub on recreation.

### Decision-type selector — 7 backing-rule variants

`pyDecisionClass` selects how the Decision evaluates its branch. Modern
flows almost always use `Data-MO-Gateway-DataXOR` (the simple XOR
gateway covering both property-compare and when-rule cases — see the
note above). The other variants appear when a Decision is backed by a
specific rule type:

| `pyDecisionClass` | UI label | Best for | `pyImplementation` |
|---|---|---|---|
| `Data-MO-Gateway-DataXOR` | Fork / Boolean Expression | Property-value XOR or when-rule branch | `""` (empty — when-rule name lives on the outgoing connector's `pyExpression`) |
| `Rule-Declare-DecisionTable` | Decision Table | Multiple conditions → one result row | Decision Table rule name |
| `Rule-Declare-DecisionTree` | Decision Tree | Hierarchical nested conditions | Decision Tree rule name |
| `Rule-Obj-MapValue` | Map Value | Single-property lookup → output value | Map Value rule name |
| `Rule-Decision-PredictiveModel` | Predictive Model | Route on ML propensity score | Predictive Model rule name |
| `Rule-Decision-Scorecard` | Scorecard | Route on weighted risk / score | Scorecard rule name |
| `EXPRESSION` | Boolean Expression | Single true/false on a bare property reference | bare property ref with leading dot (e.g. `.pyWorkStatus`) |

> `Rule-Decision-Interaction` may appear in platform defaults but is
> **not valid** for application Decision shapes. Do not author it.

### Scenario guide — picking a decision type

| Scenario | Recommended `pyDecisionClass` |
|---|---|
| Simple yes/no on one condition | `Data-MO-Gateway-DataXOR` (property compare) or `EXPRESSION` |
| When-rule branch | `Data-MO-Gateway-DataXOR` (when-rule on connector — see note above) |
| Single property-value lookup | `Rule-Obj-MapValue` |
| Multiple property conditions with table of outcomes | `Rule-Declare-DecisionTable` |
| Hierarchical nested conditions | `Rule-Declare-DecisionTree` |
| Parallel unconditional split | `Data-MO-Gateway-DataXOR` (property fork) |
| ML propensity score | `Rule-Decision-PredictiveModel` |
| Weighted scorecard | `Rule-Decision-Scorecard` |

### Connector pattern — all decision types

Every connector leaving a Decision shape uses one of:

- `pyConditionType: "Status"` — named outcome branches
- `pyConditionType: "Else"` — default fallthrough
- `pyConditionType: "When"` — when-rule branch (DataXOR variants only)

The `pyExpression` field carries the branch value that triggers each connector:

| `pyDecisionClass` | Named branch `pyExpression` | Default branch |
|---|---|---|
| `Data-MO-Gateway-DataXOR` | property value string, or when-rule name | `""` (Else) |
| `Rule-Declare-DecisionTable` | result string from the table (case-sensitive) | `""` (Else) |
| `Rule-Declare-DecisionTree` | leaf value from the tree | `""` (Else) |
| `Rule-Obj-MapValue` | output value from the map | `""` (Else) |
| `Rule-Decision-PredictiveModel` | propensity band or outcome name | `""` (Else) |
| `Rule-Decision-Scorecard` | score band label | `""` (Else) |
| `EXPRESSION` | `"true"` or `"false"` | `""` (Else) |

### Type-specific gotchas

#### `EXPRESSION`

- `pyImplementation` must be a **bare property reference** with a leading
  dot (e.g. `.HasAllRequiredData`). No function calls
  (`pxIsBlank(.pyRouteTo)` is rejected). No operator expressions
  (`.pyLabel == ""` is rejected).
- Connectors use `"true"` / `"false"` as `pyExpression` values.
- `pyExpressionGadget` should not be authored — absent from observed
  production payloads.
- For operator-based branching, use `Data-MO-Gateway-DataXOR` instead.

#### Decision Table

- Result strings on connectors must **exactly match** `pyResults` values
  in the table (case-sensitive). A mismatch silently routes to Else.
- `pyStoreProperty` is optional — when set, the result is written to
  that clipboard property before routing.
- When `pyDoHarvesting: "true"`, Pega registers declare triggers on
  input columns; avoid cascade loops.
- Create the Decision Table using `create-rule` with
  `ruleType="Rule-Declare-DecisionTable"` — see sibling skill
  `rules-rule-declare-decision-table`.

#### Decision Tree

- `pyTaskInfo.pyDecisionMap` must match `pyImplementation` exactly.
- `pyTaskInfo.pyDecisionMapType` must be `"DECISIONTREE"`.
- Decision Trees do **not** register declare triggers — they only
  re-evaluate when the Decision shape fires.

#### Fork (DataXOR)

- `pyImplementation` is a property path whose runtime value matches
  connector `pyExpression` strings.
- Fork shapes are **exclusive** gateways (XOR), not parallel. For
  parallel execution use `SplitJoin` (see `references/shapes-parallel.md`).

#### Map Value

- `pyStoreProperty` should be set to capture the mapped output.
- Map Value rules are authored in Dev Studio under Decisions.

#### Predictive Model / Scorecard

- These rules are managed in Prediction Studio.
- Connector outcome names must match the model's defined outcome labels
  exactly.
