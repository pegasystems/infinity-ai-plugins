---
name: "Blueprint Delivered phase two part one"
description: "Authoring Foundation stage -- Load this when a user is interested in learning more about this part of the Blueprint Delivered methodology. Specifically, Blueprint import process, validation against preview, CI/CD setup, branch merge, and user story refinement in Agile Workbench. This is typically done after Phase One Blueprinting is complete"
---

## Purpose

The Foundation stage is the **first stage of the Authoring phase**. It rapidly transforms
the Blueprint into a working application by importing and validating core assets, then
establishes the baseline for all subsequent development.

This stage bridges design and delivery -- the Blueprint stops being a design document and
becomes a living application.

## Core Principles

1. **Respect the Blueprint as the Source of Truth** -- If the application does not mirror
   the Blueprint preview, refine the Blueprint and re-import. Do not improvise in App
   Studio.
2. **Bias Toward Working Software** -- Prioritize end-to-end working cases over
   documentation or theoretical completeness.
3. **Embrace Automation and Modularity** -- Trust the import tooling to generate rules.
   Consciously decide when to build new vs. inherit vs. reuse.
4. **Merge the Import Branch Before Feature Development** -- Establish a clean baseline
   before any feature branches are created.

## Step 1: The Import

### What Happens
The Blueprint `.Blueprint` file is imported into App Studio, either by:
- **New Application wizard** -- For net-new applications
- **Extend Application** -- For adding to existing applications

### Import Modes

| Mode | When to use | Behavior |
|------|-------------|----------|
| **Build Now** | Simpler Blueprints | Imports everything at once |
| **Customize Build** | Complex Blueprints with multiple containers | Select which containers to import |

### Automatically Generated Rules

The import process auto-generates the following rule categories:

**Case Type Rules:**
- Workflow stages and steps
- Initial views for each step
- Data model (properties on the case type class)
- Default routing assignments

**Data Object Rules:**
- Classes for each data object
- Properties on each data class
- System of Record (SOR) integration stubs
- Data references between objects

**Persona and Access Control Rules:**
- Access groups mapped to personas
- Roles with appropriate permissions
- Channel configurations
- Workbasket assignments

**Other Generated Artifacts:**
- Sample data for testing
- Records Manager configuration
- **User Stories** -- Blueprint notes become user stories in Agile Workbench
  (class `Pega-Agile-Work-UserStory`; use `list-cases` with
  `ObjClass=Pega-Agile-Work-UserStory` to list them)

### Gap Filling

The import intelligently fills gaps when the Blueprint is underspecified:
- Creates default views for steps without explicit view definitions
- Generates alternate stages for exception handling
- Adds data references between related objects
- Applies access controls based on persona definitions
- Follows Pega naming conventions for all generated rules

### Manual Steps Required Post-Import

Not everything can be auto-generated. These typically require manual configuration:
- Complex business logic (decision tables, declare expressions, custom activities)
- Custom UI beyond standard Constellation patterns
- Advanced integrations (REST/SOAP connectors with custom mapping)
- Synchronization for "Use Existing" assets that reference pre-existing rules

## Step 2: The Validation

After import, validate the generated application against the Blueprint preview:

1. **End-to-end testing** -- Run cases with generated sample data through every stage
2. **Compare with Blueprint preview** -- Verify views, lifecycle stages, and data model
   match the Blueprint design
3. **Identify discrepancies** -- Document any differences between import result and
   Blueprint intent
4. **Resolve by re-import** -- If discrepancies are found, refine the Blueprint and
   re-import. Do not fix divergences by editing rules directly in App Studio.

## Step 3: CI/CD Setup

Establish CI/CD pipelines in **Deployment Manager** before merging the import branch.
Four pipelines should be configured:

| Pipeline | Purpose |
|----------|---------|
| **Standard Merge** | Merge feature branches into the main development branch |
| **Exception Merge** | Merge the initial import branch (used once for the Foundation) |
| **Development Validation** | Validate builds in development/staging environments |
| **Production Release** | Deploy to production with all quality gates |

Setting up CI/CD before the first merge ensures that every subsequent change flows
through automated quality gates.

## Step 4: The Merge

Once validation passes and CI/CD is configured:

1. Merge the import branch using the **Exception Merge Pipeline**
2. This creates the **integrated baseline** -- the clean starting point for all
   subsequent development
3. All new work proceeds in **separate feature branches** created from this baseline
4. This minimizes technical debt and enables parallel development across team members

## Refinement: Preparing User Stories

### Purpose
Bridges the gap between the auto-generated foundation and detailed authoring. The import
creates user stories (class `Pega-Agile-Work-UserStory`) from Blueprint notes --
refinement makes them actionable.

### Development Overview in App Studio
After import, App Studio provides instant visibility into:
- Auto-generated work items (case types, data objects, personas, user stories)
- Hierarchy of components and their relationships
- Prioritization guidance based on Blueprint structure

### Agile Workbench -- The Refinement Board

The Refinement Board in Agile Workbench is where teams collaboratively prepare work:

**Workflow stages for user stories:**

| Board Column | What happens | Who participates |
|---|---|---|
| **To-Do** | Auto-populated by Blueprint import | -- |
| **Doing** | Collaborative refinement; simple items can be "fast-tracked" | Business Architects, Product Owners |
| **Needs Review** | Complex items requiring System Architect input | System Architects, Tech Leads |
| **Done** | Ready for build; acceptance criteria defined | -- |

### Refinement Mindset
- **Embrace the auto-generated backlog** -- Start from what the import produced, not a
  blank slate
- **Prioritize live design over static documents** -- Refine in the Refinement Board,
  not in external documents
- **Collaborate in the board** -- Use it as the shared workspace for all refinement
  discussions
- **Separate simple from complex** -- Fast-track straightforward stories; flag complex
  ones for deeper review
