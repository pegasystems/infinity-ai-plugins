---
name: "methodology-blueprint-delivered"
description: "Blueprint Delivered methodology overview -- Load when a user is interested in learning more about what to do before or after they create a Blueprint. This will help with general application building questions such as - What are the steps to building a Pega Application"
---

## What Is Blueprint Delivered?

Pega Blueprint Delivered is a **modern, rapid delivery methodology** for workflows and
decisions. It is a transformative, product-led, prescriptive approach that combines Pega
Blueprint (an AI-powered design tool) with a structured delivery process. It is not
optional best practices -- it is the prescribed way to deliver Pega applications.

## Three Phases

| Phase | Purpose | Output |
|-------|---------|--------|
| **Blueprinting** | Capture business intent, produce high-fidelity Blueprint | Validated, import-ready Blueprint |
| **Authoring** | Transform Blueprint into working application | Production-ready application |
| **Value Activation** | Deploy to production, realize business outcomes | Live application generating value |

## Methodology at a Glance

```
Blueprinting                  Authoring                           Value Activation
├── Discover                  ├── Foundation                      ├── Readiness
│   ├── Kick-off              │   ├── Import Blueprint            │   ├── Final Signoff (UAT)
│   ├── App Discovery         │   ├── Validate vs Preview         │   ├── Data Migration
│   └── Completeness Check    │   ├── CI/CD Setup                 │   └── Final Release Testing
├── Design                    │   ├── Merge Import Branch         ├── Release
│   ├── Blueprint Generation  │   └── Refine User Stories         │   ├── Production Deploy
│   ├── Workflow Detailing    ├── Security & Data Integration     │   ├── Smoke Testing
│   ├── Collaborative Review  │   ├── Authentication (SSO)        │   └── Monitoring
│   └── High-Fidelity Check   │   ├── Persona Authorization       └── Rollback
└── Prepare                   │   └── Data Connectors                 ├── Predefined Criteria
    ├── Blueprint Readiness   ├── Case & Usability Config             ├── Automated Rollback
    ├── Project Readiness     │   ├── Routing & Queues                └── Communication
    └── Team & Governance     │   ├── SLAs
                              │   ├── Views & Landing Pages
                              │   └── Theme & Branding
                              └── Automation & Integration
                                  ├── Business Logic
                                  ├── External Integrations
                                  ├── Insights & Dashboards
                                  └── Localization
```

## The Golden Thread

The **golden thread** is the principle of continuous fidelity from vision to outcome. It
means the original business intent is faithfully carried through every stage:

- Blueprint captures the vision as a structured, machine-readable design
- Import translates that design into application components with no manual transcription
- Authoring refines while maintaining traceability to the Blueprint
- Value Activation delivers exactly what was designed

If the application diverges from the Blueprint, the correct response is to **refine the
Blueprint and re-import** -- not to improvise in App Studio.

## Foundational Tools

### Pega Blueprint (the Tool)
- AI-powered, collaborative design tool
- Creates a dynamic, visual "digital twin" of the intended solution
- Replaces static requirements documents with a living, import-ready model
- Serves as the **single source of truth** for all delivery phases

### App Studio and Pega GenAI
- Where Blueprints are imported and transformed into working applications
- **Pega Autopilot** automates routine configuration: Case Types, Data Models, workflows
- Enforces best practices and enables real-time validation

### Agile Workbench
- Integrated with Autopilot for seamless authoring
- Embedded within App Studio for rapid configuration and iteration
- Supports **live refinement sessions** where teams collaboratively prepare user stories
  (class `Pega-Agile-Work-UserStory`)

### Pega Cloud
- Secure, scalable, resilient environment for enterprise applications
- Supports rapid deployment and continuous improvement

## Strategic Enablers

Nine capabilities spanning people, processes, and technology. They shape three dimensions:

1. **Integrated Lifecycle** -- Supports every phase from vision to outcome. Includes
   high fidelity design, estimation, project readiness, import, CI/CD, Constellation UX,
   refinement, and data migration.

2. **Acceleration with Quality Assurance** -- Reduces time-to-value while elevating
   quality. Minimizes delays and rework through AI-powered automation and embedded
   validation.

3. **AI-driven Automation** -- Streamlines routine tasks, maintains best practices, and
   validates results at each step.

## Key Roles

### Solution Designer
- **Accountable for:** Capturing business ideas and producing a complete, ready-to-build
  Blueprint
- **Activities:** Defines business processes, information models, Personas, high-fidelity
  designs; coordinates feasibility assessments
- **Primary phase:** Blueprinting (but collaborates through Authoring)

### Solution Builder
- **Accountable for:** Ensuring designs are efficiently implemented and deliver business
  value
- **Activities:** Refines case structures, determines data architectures, assesses
  integration constraints, builds and validates the application
- **Primary phase:** Authoring (but participates in Blueprinting design reviews)

## Mindset Shift

Blueprint Delivered requires a fundamental shift from traditional delivery:

| Traditional approach | Blueprint Delivered approach |
|---|---|
| Lengthy requirements documents | AI-powered structured design in Blueprint |
| Sequential handoffs (design then build) | Parallel design, build, and validation |
| Manual coding and configuration | Autopilot auto-generates rules from Blueprint |
| Separate design and build teams | Solution Designers and Builders collaborate from the start |
| Build deviates from design over time | Blueprint remains the source of truth; re-import to correct drift |
| Quality checked at the end | Embedded validation at every stage |

## What Makes It Different

- **AI-first Requirements** -- Structured, import-ready application design generated from
  business intent, eliminating ambiguity
- **The Golden Thread** -- Continuous fidelity maintained from vision to outcome
- **Import with Guardrails** -- High-fidelity Blueprints import directly into App Studio,
  conforming to Pega best practices with Constellation UX patterns
- **Real-time Refinement** -- Teams build and validate simultaneously with AI in App Studio
- **Designed for Scale** -- Applicable to new builds and modernization of existing systems

## Additional resources
| User intent | Skill |
|---|---|
| Blueprinting phase, discovery, design workshops, prepare stage | `Blueprint Delivered phase one - Blueprinting` |
| Blueprint import, foundation stage, CI/CD setup, refinement | `Blueprint Delivered phase two part one` |
| Authentication, SSO, persona authorization, data integration | `Blueprint Delivered phase two part two` |
| Routing, SLAs, views, landing pages, branding | `Blueprint Delivered phase two part three` |
| Business logic, decision tables, integrations, localization | `Blueprint Delivered phase two part four` |
| Go-live, UAT, deployment, rollback, value activation | `Blueprint Delivered phase three - Value activation` |
