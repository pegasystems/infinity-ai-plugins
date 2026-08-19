---
name: view-property-first-authoring
description: "Property-first Rule-UI-View authoring workflow, required tool sequence, blocking contract, acceptance criteria, and invalid anti-patterns"
---
# Property-First View Authoring

## Data Field Authoring

When adding data-related fields (Embedded Data, Data Reference, User Reference,
Simple Table), consult the reference files below. They provide the full dependency
chain and correct creation order for each field type.

| Path | Field type | Reference |
|------|-----------|-----------|
| A | Embedded Data (`Pega-UI-Content-Field-Data-Embedded`) | `rules-rule-ui-view/references/path-a-embedded-data` |
| B | Data Reference (`Pega-UI-Content-Field-Data-Reference`) | `rules-rule-ui-view/references/path-b-data-reference` |
| C | User Reference (`Pega-UI-Content-Field-Text-UserReference`) | `rules-rule-ui-view/references/path-c-user-reference` |
| D | Simple Table (`SimpleTable` template) | `rules-rule-ui-view/references/path-d-simple-table` |

Start with `rules-rule-ui-view/references/data-field-decision-tree` for the decision tree, dependency
graphs, and shared prerequisite steps (class/property creation).
See `rules-rule-ui-view/references/data-field-troubleshooting` for common problems and variations.

**Field-level vs template-level Data Reference:** A Data Reference **field**
(`Pega-UI-Content-Field-Data-Reference`) embeds a sub-view inside a parent view.
That sub-view is typically a separate DataReference **template** view
(`pyTemplateName: "DataReference"`). The field says "embed this view here"; the
template view provides the actual lookup/display UI. See `rules-rule-ui-view/references/path-b-data-reference`.

For view template patterns (Landing Page, DataReference AutoComplete/TableSelect,
SimpleTable, Edit Action, Step Form, Details), see `rules-rule-ui-view/references/view-template-patterns`.

## Critical Authoring Rules

1. Always fetch the current rule with `get-rule(detail="full")` before update.
2. Always update `pyContent`, `pxViewMetadata`, and `pxContextMetadata` together.
3. For list updates, use `{}` no-op placeholders to preserve existing elements.
4. For Dropdown fields, wire datasource in all three surfaces in a single update.
5. Property-first workflow is mandatory for all field additions:
   - If a field's backing property does not exist, create the property first.
   - After property creation succeeds, create or update the view.
   - If the property already exists, do not recreate it; append the field wiring only.

## Property-First Orchestration (All Rule Types)

This behavior is not view-specific. It applies to any view authoring request that
introduces new fields:

1. Resolve target field list and backing property names.
2. **Verify each property exists** — for every `pyFieldReference` in the planned
   `pyContent`, call:
   ```
   list-rules(ruleType="Rule-Obj-Property", className="<target-class>", ruleName="<PropertyName>")
   ```
   If the result set is empty the property does not exist.
3. Create every missing property using `rules-rule-obj-property` (schema +
   examples) before proceeding. Do not batch property creation with the view
   create — each property must succeed independently first.
4. Re-read the view rule and append field entries for all requested properties.

Never attempt to create a new view field that references a property that is not yet
present in the system. A view referencing non-existent properties will render with
empty labels at runtime and produce no authoring-time error.

## Blocking Contract

- Create every `Rule-Obj-Property` before creating the `Rule-UI-View` that references it.
- If property verification fails or returns an unexpected result, diagnose the cause
  (wrong class, inherited property, API format change) before retrying.
- Do not mark the task complete until verification steps pass.

## Required Tool Sequence

0. **Pre-flight check** — for every field in the planned view, run
   `list-rules(ruleType="Rule-Obj-Property", className=<cls>, ruleName=<prop>)`.
   Collect the list of missing properties.
1. `create-rule` for each missing `Rule-Obj-Property`.
2. **Re-verify** — repeat step 0 for properties created in step 1; all must now
   return a result. Abort if any are still missing.
3. `create-rule` (or `update-rule`) for `Rule-UI-View`.
   **Do not use the `fields` shorthand** — it only stores field metadata and does not
   generate the Constellation three-surface structure. Provide the full `pyContent`,
   `pxViewMetadata`, and `pxContextMetadata` in the `content` object.
4. Verify View references every property (`get-rule` with `detail="full"`).

## Acceptance Criteria

- AC1: Property key exists and is in the target class/ruleset.
- AC2: View contains `pyFieldReference` to that property.
- AC3: `pxContextMetadata` includes that property.
- AC4: Report both created keys in final output.

## Completion Guard

If any AC fails, diagnose the root cause and fix before proceeding.
Common causes: property on a parent class (verify with `className` of the ancestor),
unexpected API response format, or a timing issue after recent creation.

## Negative Example

Creating a View with `.MyTextField` without first creating `MyTextField` in the
branch is invalid.
