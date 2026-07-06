---
name: methodology-case-data-modeling
description: Use this skill when the user asks to design or review a data model, choose between Case Type vs. Data Object, model a business process in App Studio or Dev Studio, add or change Case Types or Data Objects, or structure fields, relationships, primary fields, business keys, or attachments within a Pega application.
---

## When to Use

- The request mentions "Case Type", "Data Object", "Data Model", "Fields".
- The user provides a business scenario and asks for modeling guidance.
- There is a need to change the data model to meet new or evolving requirements.
- The user asks how to decide between embedding data vs. referencing it.

---

## Overview

### Object Set

| Concept | Purpose | Class Hierarchy |
|---|---|---|
| Case Type | Procedural workflows — has stages, steps, SLAs, assignments | `<Org>-<App>-Work-<CaseName>` |
| Data Object | Reusable, non-process entities — CRUD-driven | `<Org>-<App>-Data-<Entity>` |

`pxObjClass` is stamped on every instance and drives rule resolution. It identifies which class an object belongs to — never omit or override it.

---

## What Makes a Good Case Type

- Has a process lifecycle — stages, steps, and a resolution.
- Has a deadline or SLA — time-sensitivity is a strong signal.
- Involves multiple actors or systems — human tasks, integrations, or approvals.
- Examples: Loan Application, Service Request, Claim Processing.

---

## What Makes a Good Data Object

- Information managed primarily via Create / Read / Update / Delete.
- Entities referenced by cases but not owned by a single process.
- Examples: Customer, Address, Product, Policy.
- When unsure whether something is a Case Type or Data Object — choose Case Type.

---

## Relationships

### Between Case Types — Parent / Child

Use when one case depends on or spawns another (e.g., a Service Request spawns a Field Visit). The child case inherits context from the parent and can run in parallel or sequentially.

### Between Case and Data Object — Reference or Embedded

| Pattern | When to Use |
|---|---|
| Reference (Page Property) | Data lives in a System of Record; the case only links to it. Changes in the SOR are reflected automatically. |
| Embedded (Embedded Page) | Data is unique to this case instance and stored inside the case BLOB (`pzPVStream`). Use for snapshots or derived data. |

### Between Data Objects — Peer

Use for lookup or join relationships (e.g., Order → Product). No lifecycle dependency.

---

## Fields, Primary Fields & Key Parts

**Primary Fields** — Mark the most important properties of a Data Object (e.g., "Full Name", "Account Number"). These auto-populate Create/Edit/Summary forms in the visual designer. Reorder thoughtfully; removing a primary field impacts generated views.

**Key Parts** — Defined on the General tab of the Class rule. One or more properties are nominated as Key Parts; their concatenated values form the `pzInsKey` — the physical primary key for every record in the Pega database. In the low-code designer, this surfaces as the Identifier field (defaulting to `pyGUID`). Define Key Parts before go-live — changing them post-production alters `pzInsKey` structures and causes data integrity issues.

**Automatically generate a unique ID (Identifier toggle)**

- When **enabled** (the default), Pega assigns `pyGUID` as the record's Identifier. The platform generates the value at record creation; no user input is required. Every save produces a new, unique record — no deduplication occurs. Use for entities where business-meaningful identity is irrelevant (e.g., audit events, case-level snapshots).
- When **disabled**, the architect designates a meaningful property as the Identifier (e.g., `CustomerNumber`, `PolicyID`). Pega uses this value to construct `pzInsKey`. If a record with the same Identifier value already exists, the platform updates it rather than inserting a duplicate. Use when records must align with a System of Record or when deduplication by a real-world key is required. Define the Identifier before go-live — changing it post-production restructures `pzInsKey` for all existing records and causes data integrity issues.

**Calculated Fields** — Use when a value is always derived (e.g., Total = Quantity × Price). Backed by a Decision rule or expression; do not allow manual override.

**Attachment Fields** — Add when attachments must be addressable in forms or business logic (e.g., a signed contract linked to a specific case stage).

To make a field searchable or reportable, expose it as a database column — by default, Pega stores all properties in a compressed BLOB.

---

## Creating Data Objects

Creating Data Objects is not supported through the agent. This operation must be performed directly in the Data Designer in App Studio.

---

## Case Type Design

### Name after real business processes

Case types should map to actual business processes, not technical operations:
- **Good:** `ServiceRequest`, `InsuranceClaim`, `LoanApplication`
- **Bad:** `ProcessData`, `RunBatch`, `CallExternalSystem`

### Use stages to model lifecycle phases

Stages represent major phases of a business process:
```
Create → Review → Approve → Fulfill → Resolve
```
Each stage should have:
- A clear entry and exit criteria
- One or more steps (assignments or automations)
- A meaningful name from the business domain

### Separate work classes from data classes

- **Work classes** (`-Work-`) are for case types — things that have a lifecycle
- **Data classes** (`-Data-`) are for reference data — things that are looked up or stored
- Don't put case logic in data classes or static data in work classes

---

## Data Model Design

### Use meaningful property names

Properties should describe what they hold, not how they're used:
- **Good:** `CustomerEmailAddress`, `PolicyEffectiveDate`, `ClaimAmount`
- **Bad:** `Field1`, `TempValue`, `Data`

### Use appropriate property types

| Use Case | Property Type | Notes |
|----------|--------------|-------|
| Single value | Single Value (Text, Integer, etc.) | Most properties |
| Related entity | Page | Embedded object — one related record |
| List of entities | Page List | Embedded list — multiple related records |
| Key/value pairs | Page Group | Keyed collection — lookup by key |
| Fixed choices | Single Value with local list | Constrained values |
| Cross-case reference | Page (with automatic retrieval) | Point to a data page that loads the referenced case by ID |

### Design for reuse with Data Types

If multiple case types need the same data structure (e.g., Address, ContactInfo), define it as a Data Type:
- Data Types get their own class, properties, views, and data source
- They can be embedded in any case type as a Page or Page List property
- Changes to the Data Type automatically apply everywhere it's used

---

## Tips

- **Access control:** Any new Case Type or Data Object requires explicit RBAC permissions. Update the Access Role rule (`AccessRole-`) to grant the appropriate personas Create/Read/Update/Delete access — otherwise, users cannot interact with the new type.
- **Case vs. Data — context is king:** A vendor list in a Purchase Request app is a Data Object. The same vendor list in a Vendor Management app may be a Case Type (with onboarding workflows, SLA tracking, and approvals). When in doubt, choose Case Type.
- **Embedded vs. Reference — choose intentionally:** Embedded data is fast to access but creates data drift if the source changes. Reference data stays current but introduces a dependency on the SOR's availability.
- **Visual Data Model:** Use App Studio's visual data modeler to audit relationships across Case Types and Data Objects before delivery.
- **Flat data model:** Putting everything in one class makes rules unresolvable and breaks specialization — always separate work, data, and integration classes.
- **Overloaded case type:** One case type handling multiple unrelated processes creates unmaintainable flows — create separate case types and use child cases for dependencies.

---

## References

| Skill | When to load |
|-------|--------------|
| `rules-rule-obj-property` | Creating or modifying properties on a Case Type or Data Object |
| `rules-rule-declare-pages` | Creating or configuring Data Pages for a Data Object |
