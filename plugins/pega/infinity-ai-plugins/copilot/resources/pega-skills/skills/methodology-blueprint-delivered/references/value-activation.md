---
name: "Blueprint Delivered phase three - Value activation"
description: "Value Activation phase -- Load this file when the user wants to plan to migrate/deploy their application to a production environment"
---

## Purpose

The final phase of Blueprint Delivered. Transforms the vision and application into
**tangible business outcomes**. The "golden thread" completes its journey, delivering a
production-ready solution.

Unlike traditional high-risk go-live events, Value Activation is designed to be
**predictable and structured**. This predictability comes from upstream discipline:
scope locked during Blueprinting, quality embedded during Authoring, and CI/CD pipelines
validated throughout.

## Critical Prerequisites

Success depends on the discipline and quality of work from the preceding phases.

### From Blueprinting

| Prerequisite | Why it matters |
|---|---|
| **Clearly Defined MLP (Minimum Lovable Product)** | Locks scope and requirements; prevents scope creep; provides clear "definition of done" |
| **Business Stakeholder Engagement** | Stakeholders aligned on MLP goals and go-live process; avoids late-stage resistance |
| **Acceptance Criteria and Success Metrics** | Drives readiness checks; provides objective go/no-go basis |
| **Data Migration Strategy** | Prevents last-minute surprises that could derail the timeline |

### From Authoring

| Prerequisite | Why it matters |
|---|---|
| **Blueprint Import** | Design fidelity directly drives application design |
| **Refined, Blueprint-linked Backlog** | Development adheres to original design; golden thread preserved |
| **Mature CI/CD Pipeline** | Repeatable, low-risk, efficient deployments |
| **Comprehensive Testing Framework** | Quality built in through automated and manual tests (unit, functional, performance, security) |
| **Defect Management and Issue Log** | Critical defects resolved before go-live |
| **Tested Rollback Plan** | Safety net for critical issues; tested before it is needed |
| **Support and Communication Plans** | Operational support and stakeholder communication ready |

## Stage 1: Readiness -- Final Validation

### Final Signoff Testing
- Conduct **User Acceptance Testing (UAT)** in a staging environment that mirrors
  production
- Run comprehensive test scenarios covering all case types and personas
- Manage defects through the established defect tracking process
- Secure **formal business sign-off** that the application meets requirements

### Data Migration
- Execute the predefined data migration plan:
  1. **Extract** data from source systems
  2. **Transform** data to match Pega data model
  3. **Load** into the production environment
  4. **Reconcile** -- verify data quality and completeness
- Run reconciliation tests to confirm data integrity

### Final Release Testing
- **Performance testing** -- Verify the application meets performance targets under
  expected load
- **Security testing** -- Confirm authentication, authorization, and data protection
  controls are effective

## Stage 2: Release -- Deploying with Confidence

### Production Deployment
- Deploy using the **automated CI/CD pipeline** established during Authoring
- Schedule during a **maintenance window** to minimize business impact
- Follow the deployment runbook with all pre-validated steps

### Smoke Testing
- Run predefined smoke tests **immediately after deployment** to verify:
  - Core case creation and processing works
  - Key integrations are responding
  - User login and persona-based access functions correctly

### Monitoring
- Monitor system health and business metrics for **24-48 hours** post-deployment
- Use diagnostic tools to track:
  - Application performance (response times, error rates)
  - Integration health (connector success/failure rates)
  - Business metrics (case throughput, SLA compliance)

### Stakeholder Communication
- Keep stakeholders informed at every milestone:
  - Deployment started
  - Deployment completed
  - Smoke testing passed
  - Application live and stable

## Stage 3: Rollback -- The Safety Net

### Predefined Criteria
Clear conditions for initiating a rollback:
- Critical defects that prevent core business processes
- Data corruption or integrity issues
- Severe performance degradation
- Security vulnerabilities discovered post-deployment

### Automated Rollback
- Execute the **pre-tested rollback plan** to restore the previous stable state
- Rollback is automated through the CI/CD pipeline -- not a manual, ad-hoc process
- Minimize business disruption by restoring quickly and cleanly

### Transparent Communication
- Inform stakeholders promptly about:
  - The decision to roll back and why
  - Expected timeline for resolution
  - Next steps for re-deployment

## Value Activation Checklist

Use this checklist to verify readiness:

- [ ] MLP scope locked and agreed upon
- [ ] UAT completed and formally signed off
- [ ] Data migration plan executed and reconciled
- [ ] Performance and security testing passed
- [ ] Rollback plan tested and documented
- [ ] CI/CD pipeline validated for production deployment
- [ ] Production deployment scheduled with maintenance window
- [ ] Smoke test scripts prepared
- [ ] Monitoring dashboards configured
- [ ] Stakeholder communication plan active
- [ ] Support team trained and on standby

## After Go-Live

Value Activation marks the **beginning of continuous innovation**, not the end. After
successful deployment:
- Monitor and optimize based on real-world usage data
- Feed learnings back into the Blueprint for future iterations
- Use the established CI/CD pipeline for ongoing improvements
- Continue the golden thread into the next delivery cycle
- 