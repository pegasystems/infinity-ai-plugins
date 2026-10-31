# Pega Infinity Architecture & Authoring Reference (`24.2` / `25.1` / `26.1`)

Always treat the versioned runtime skills returned by `list-skills` and `get-skill` as the authoritative source for MCP tool schemas. Use the architectural principles below to structure enterprise-grade Pega designs.

## 1. Enterprise Class Structure (ECS) & Situational Layer Cake

Place rules at the highest reusable layer that remains accurate, specializing downward only where behavior diverges:

| Layer | Typical Class Pattern | What Belongs Here |
| :--- | :--- | :--- |
| **Work (Case Layer)** | `<Org>-<App>-Work-<CaseType>` | Case lifecycle (`pyDefault`), case-specific Views, stage/flow orchestration, case-level SLAs and validations. |
| **Data (Domain Entities)** | `<Org>-Data-<Entity>` or `<Org>-<App>-Data-<Entity>` | Reusable business entities (Customer, Policy, ClaimLine, Address), field-group Views, entity validations. |
| **Integration (`Int-`)** | `<Org>-Int-<System>-<Resource>` | REST/Connector request & response classes, raw payload mapping Data Transforms (shielding `Data-` and `Work-` from external API drift). |

> **Anti-pattern to avoid**: Never bind UI Views or Case Types directly to `Int-` connector classes. Map `Int-` <-> `Data-` inside a `D_` Data Page response/request Data Transform.

## 2. Data Model & Data Pages (`D_`)

- **Scalar vs. Embedded vs. Data Reference**:
  - Use **Data Reference** / **Case Reference** fields pointing to `D_` Data Pages when referencing shared records rather than copying stale fields onto every work object.
  - Use **Embedded Data** (`Page` / `Page List` backed by a `Data-` class) when the lifecycle of the child data is owned strictly by the parent case (e.g., line items on an order).
- **Data Page Scoping**:
  - `Thread` / `Requestor`: Dynamic user- or case-specific lookups.
  - `Node`: Read-only reference tables shared across operators (requires an Access Group configured on the Data Page).

## 3. Constellation UI (`Rule-UI-View`)

Pega Infinity 24.2, 25.1, and 26.1 default to **Constellation** — a stateless, metadata-driven DX API architecture:

1. **Model-driven Views over custom layouts**: Define semantic form Views, partial Views, and list Views bound to properties on `Work-` and `Data-` classes. Constellation renders responsive React components automatically from View metadata.
2. **State & visibility logic**: Prefer declarative `When` rules, `Required`/`Disabled`/`Visibility` conditions, and server-side `Rule-Obj-Validate` + Data Transforms at step transitions rather than client-side imperative hacks.
3. **Always inspect existing Views first**: Load the Constellation / View runtime skill via `get-skill` and inspect an existing View in the target class before authoring a new View payload so exact region, preset, and field reference structures match the target Infinity release.

## 4. Case Lifecycle Design (`pyDefault`)

- **Stages**: Represent major business milestones or ownership transfers (e.g., *Intake* -> *Underwriting* -> *Fulfillment* -> *Resolution*), plus alternate stages (*Approval*, *Rejection*, *Cancellation*).
- **Processes & Steps**: Keep individual flows cohesive (5–7 steps per process). Prefer standard smart shapes (Collect Information, Approve/Reject, Automation/Run Data Transform, Send Notification, Create Case) over custom Activities.
- **Activities (`Rule-Obj-Activity`)**: Avoid creating custom Activities when a Data Transform, Case Automation, Data Page, or Flow shape accomplishes the goal; Pega guardrails penalize unnecessary Activity usage.
