---
name: Primary Fields reference
description: "What pyPrimaryFields is — design-time metadata that drives Case Designer, default views, and agent reliability. What it is NOT (not keys, not required, not enforced)."
---
# Primary Fields

## What Are Primary Fields?

Primary Fields are a **design-time metadata designation** stored on a class that
identifies a small, curated set of properties as the most important fields for that
class. They are not database primary keys, not required fields, and not enforced at
runtime — they are purely metadata-driven designations that drive UI behaviour and
authoring experiences in Pega Infinity / Constellation DX.

## Where Primary Fields Are Stored

Primary Fields are stored in **Class Metadata** (`Rule-ClassMetadata`) in the
`pyPrimaryFields` property. This is an ordered array of `Pega-Fields` objects, each
identifying a property by name (without dot prefix).

## What Primary Fields Are Used For

### 1. Default UI surfacing

Primary Fields control which fields are shown prominently in default or
auto-generated views:

- Create forms
- Case summary views
- Headline / primary details areas

The `pyDefaultHeading` in view metadata is often set to `"Primary fields"` to
surface these fields as a named group in the generated layout.

### 2. Authoring and design-time guidance

Primary Fields influence what **Case Designer and App Studio** present first when:

- Adding fields to a case
- Auto-generating views
- Guiding low-code users toward what matters most on a case

Updating `pyPrimaryFields` is described as an **optional but important** step for a
complete authoring experience. A field can exist, be added to views, and work
perfectly at runtime without being listed here — the only consequence is that Case
Designer will not surface it as a "primary field" and auto-generated views may not
pick it up.

### 3. AI / agent reliability

Agents rely on `pyPrimaryFields` to understand which properties define the case,
improving reliability when auto-creating views or guiding field placement. Without
it, agents must infer importance by traversing the lifecycle and views manually,
which is harder and more error-prone.

### 4. Consistency across generated artifacts

When fields are added or removed, the platform regenerates related metadata. Removing
a field from `pyPrimaryFields` is a standard Pega cleanup step alongside blocking
the property.

## Effect of not updating pyPrimaryFields

If a property exists, is added to views, and works at runtime but is **not** listed
in `pyPrimaryFields`:

- Runtime UI works normally
- Case Designer will not surface it as a "primary field"
- Auto-generated views may not include it
