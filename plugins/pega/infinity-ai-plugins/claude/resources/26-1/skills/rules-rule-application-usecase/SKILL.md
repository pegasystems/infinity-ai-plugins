---
name: rules-rule-application-usecase
description: Authoring guide for Pega specification rules (Rule-Application-UseCase, also called Use Case rules), including lifecycle categories, acceptance criteria, linked implementation patterns, and attachment-aware authoring
---

## Overview

Rule-Application-UseCase (commonly referred to in Pega as a specification rule) defines a catalog entry for a reusable capability or feature in a Pega application. Use cases wrap underlying implementation rules (activities, flows, data transforms) and provide:

- **Discovery** — use cases appear in catalogs for selection in App Studio and Dev Studio
- **Categorization** — organize capabilities by category and sub-category
- **Interface** — define parameters for invoking the capability
- **Linking** — associate use cases with case types and applications

## Key Properties

| Property | Description |
|----------|-------------|
| `pyLabel` | Display label shown in catalogs |
| `pyPurpose` | Purpose key used in the rule identity; keep to 15 characters or fewer |
| `pyUseCaseType` | Type of implementing rule (Activity, Flow, DataTransform, etc.) |
| `pyImplementationRule` | Name of the underlying rule that executes |
| `pyProductName` | Application name for which this use case is created |
| `pyOwner` | Owner identifier for governance tracking |
| `pyCategory` | Lifecycle status category; defaults to `New` |
| `pySubCategory` | Catalog organization and further grouping within a category |
| `pyExposed` | Whether the use case appears in catalogs |

## Notes

### Use Case Types

- **Activity** — wraps a Rule-Obj-Activity
- **Flow** — wraps a Rule-Obj-Flow (process or screen flow)
- **DataTransform** — wraps a Rule-Obj-Model
- **Section** — wraps a Rule-UI-Section
- **Utility** — general-purpose utility operation
- **API** — external API endpoint

### `pyCategory` Values

Use one of the following values for the use case lifecycle status:

| Value | Meaning |
|---|---|
| `New` | Newly created use case that has not entered planning. |
| `Pending Info` | Additional requirements or details are needed. UI label: `Pending-Details`. |
| `Pending-Plan` | Ready for or awaiting development planning. |
| `Pending-Tasks` | Plan is complete and backlog tasks are being prepared. |
| `Pending-Implement` | Backlog tasks are ready for implementation. |
| `Pending-Development` | Development work is pending. |
| `Open` | Work is currently in progress. UI label: `InProgress`. |
| `Pending-Blocked` | Work cannot proceed because of a blocker. |
| `Deferred` | Work has been intentionally deferred. UI label: `Pending-Deferred`. |
| `Pending-Review` | Implementation is complete and awaiting review. |
| `Implemented` | The use case has been implemented. |
| `Complete` | The use case lifecycle is complete. |
| `Withdrawn` | The use case has been withdrawn. |

### Relationship to Flow Shapes

Flow shapes that reference use cases populate `pyUseCaseApplication`, `pyUseCaseName`, and `pyUseCaseWorkType` on the shape definition (see Rule-Obj-Flow schema). The use case rule provides the catalog entry and parameter interface.

### Common Rulesets

Use cases are commonly found in:
- **PegaRULES** — platform-level use cases for system operations
- **Application rulesets** — application-specific capabilities

## Implementation Tab — Linked Implementations

The **Implementation tab** on a specification rule displays `pyLinkedImps`, a page list linking the spec to its implementing Pega rules (activities, properties, views, data transforms, etc.).

### How it works

`pyLinkedImps` is a **runtime page list** (`Data-Rule-Summary`) — it is **not stored on the rule record** and will not appear in `get-rule` output. When a spec is saved with this list populated, Pega automatically creates or updates **`Link-UseCase`** instances to persist the links between the spec and its implementing rules.

To populate the Implementation tab when creating or updating a spec, pass `pyLinkedImps` as a page list in `pageInstructions` using `APPEND` operations.

### `pyLinkedImps` entry structure (class: `Data-Rule-Summary`)

Each entry identifies one linked implementation rule:

| Field | Required | Description |
|---|---|---|
| `pxObjClass` | Yes | Always `Data-Rule-Summary` |
| `pzInsKey` | Yes* | Full instance key of the linked rule (e.g. `RULE-OBJ-ACTIVITY @BASECLASS MYACTIVITY #...`) |
| `pyRuleKey` | Yes* | Same value as `pzInsKey` |
| `pxInsName` | Yes* | Short instance name (e.g. `@BASECLASS!MYACTIVITY`) |
| `pyRuleName` | Yes | Rule name (e.g. `MyActivity`) |
| `pyClassName` | Yes | Applies-to class of the linked rule (e.g. `@baseclass`) |
| `pyClass` | Yes | Rule type class (e.g. `Rule-Obj-Activity`, `Rule-Obj-Property`, `Rule-UI-View`, `Rule-Obj-Model`) |
| `pyClassLabel` | Yes | Human-readable rule type label (e.g. `Activity`, `Property`, `View`, `Data Transform`) |
| `pyLabel` | No | Display label of the linked rule |
| `pyRuleSet` | No | Ruleset of the linked rule |
| `pyRuleSetVersion` | No | Ruleset version (e.g. `01-01-01`) |
| `pyProductName` | No | Application name of the linked rule |
| `pyProductVersion` | No | Application version |
| `pyRuleAvailable` | No | Availability (`Yes`, `Final`) |
| `pyTempText` | No | Set to `ShowAppliesTo` to display the applies-to class in the UI |
| `pyTempIdentifier` | No | Class name; used when `pzInsKey` is not yet resolved for a new rule |

*Required for existing rules with a known `pzInsKey`. For new/unresolved rules, omit `pzInsKey`/`pyRuleKey`/`pxInsName` and use `pyTempIdentifier` instead.

### Nested `pxPages.LinkTB` (class: `Link-UseCase`)

Each entry contains a named page `pxPages.LinkTB` that holds the persisted link reference:

| Field | Description |
|---|---|
| `pxObjClass` | Always `Link-UseCase` |
| `pxLinkedRefTo` | Full `pzInsKey` of the linked rule — same as `pzInsKey` on the parent entry |
| `pyTaskID` | Task ID; use `0` for unassigned |
| `pyTaskName` | Task name; leave empty if not assigned |
| `pxSubscript` | Always `LinkTB` |

### Supported linked rule types

| `pyClass` | `pyClassLabel` |
|---|---|
| `Rule-Obj-Activity` | `Activity` |
| `Rule-Obj-Property` | `Property` |
| `Rule-UI-View` | `View` |
| `Rule-Obj-Model` | `Data Transform` |

### pageInstructions pattern

`pyLinkedImps` is a page list — always pass it via `pageInstructions`, never inside
`content`.

Use one `APPEND` instruction per linked implementation entry, and ensure
`pxPages.LinkTB.pxLinkedRefTo` matches the parent entry `pzInsKey`.

For concrete payload examples, use the files under
`rules-rule-application-usecase/examples/`.

## Examples

| Skill | Label | Description |
|---|---|---|
| `rules-rule-application-usecase/examples/stub` | usecase-stub | Minimal create payload for a valid use case rule |
| `rules-rule-application-usecase/examples/complete-api-usecase` | usecase-complete-api | End-to-end API-oriented use case with richer metadata |
| `rules-rule-application-usecase/examples/with-acceptance-criteria` | usecase-with-acceptance-criteria | Adds `pyAcceptanceCriteriaList` entries for testable outcomes |
| `rules-rule-application-usecase/examples/with-actors-triggers-criteria` | usecase-with-actors-triggers-criteria | Expands planning context with actors, triggers, and criteria |
| `rules-rule-application-usecase/examples/lifecycle-categories` | usecase-lifecycle-categories | Shows `pyCategory` progression states used across specification lifecycle stages |
| `rules-rule-application-usecase/examples/application-defined-fields` | usecase-application-defined-fields | Demonstrates custom fields that teams may add for governance |
| `rules-rule-application-usecase/examples/with-linked-implementations` | usecase-with-linked-implementations | Uses `pageInstructions` to append `pyLinkedImps` entries safely |
| `rules-rule-application-usecase/examples/with-attachment` | usecase-with-attachment | Demonstrates attachment metadata shape for specification-related files |

## References

| Skill | Label | When to load |
|---|---|---|
| `rules-rule-application-usecase/references/dropdown-sources` | usecase-dropdown-sources | When a specification/use case needs dropdown-backed fields; explains allowed source patterns and when to use each |
