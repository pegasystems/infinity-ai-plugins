---
name: "Blueprint Delivered phase two part two"
description: "Authoring Security and Data Integration stage -- Load this when a user is interested in learning more about this part of the Blueprint Delivered methodology. Specifically, SSO authentication, persona-based authorization, and data integration with REST/SOAP/SQL connectors. Typically this is done after Blueprint Delivered phase two part one"
---

## Purpose

The second stage of the Authoring phase. Configures **secure access**, activates personas,
and **integrates external data sources** so the application can run cases with authentic,
live data and real users.

This stage is done early because real users and real data are prerequisites for meaningful
validation of everything that follows (case configuration, business logic, integrations).

## Authentication

### Goal
Implement Single Sign-On (SSO) so users authenticate through the enterprise identity
provider rather than Pega-managed credentials.

### Supported Protocols

| Protocol | When to use |
|----------|-------------|
| **SAML 2.0** | Enterprise IdPs (ADFS, Okta, Ping) |
| **OAuth 2.0 / OpenID Connect** | Modern cloud-based IdPs, API-based auth |

### Implementation Steps

1. **Create Authentication Service** -- Configure the authentication service rule in
   Pega, specifying the protocol and IdP connection details
2. **Configure IdP Metadata** -- Import or configure the Identity Provider metadata
   (entity ID, SSO URL, certificates)
3. **Map Identity Attributes** -- Map IdP claims/assertions to Pega operator attributes
   (operator ID, access group, email)
4. **Test Authentication Flow** -- Verify end-to-end login with real IdP credentials
5. **Monitor and Audit** -- Enable authentication logging for security monitoring

### Key Considerations
- SSO centralizes security management and improves user experience
- Authentication must be configured before persona-based authorization is meaningful
- Test with multiple personas to verify role mapping works correctly

## Persona-Based Authorization

### Goal
Define and enforce who can access what within the application, following the principle
of **least-privilege access**.

### Configuration Steps

1. **Define User Personas** -- Confirm the personas identified during Blueprinting
   (e.g., Manager, Analyst, Reviewer)
2. **Map Personas to Access Groups** -- Each persona maps to one or more Pega access
   groups that define their permissions
3. **Configure Roles** -- Assign roles within access groups that control:
   - Which case types they can create/view/modify
   - Which stages and steps they can perform
   - Which data they can see (field-level security)
4. **Secure Workbaskets** -- Assign workbaskets to personas so work is routed to the
   correct teams
5. **Enforce Least Privilege** -- Grant only the minimum permissions needed for each
   persona to perform their function
6. **Test Authorization** -- Log in as each persona and verify they see only what they
   should

### Blueprint-Generated Artifacts
The Foundation import already created access groups, roles, and workbaskets based on the
Blueprint. This stage **validates and refines** those auto-generated artifacts -- it does
not start from scratch.

## Data Integration

### Goal
Connect the application to external data sources so cases operate on authentic data
rather than generated samples.

### Integration Planning

1. **Identify Data Sources and Targets** -- Determine which external systems provide
   data (databases, APIs, SaaS platforms) and which receive updates
2. **Map to Data Types** -- Connect each external data source to the corresponding Pega
   data type (data class) defined in the Blueprint
3. **Determine Integration Pattern** -- Choose the appropriate connector type

### Connector Types

| Connector | When to use |
|-----------|-------------|
| **REST Connector** | Modern APIs, JSON payloads, RESTful services |
| **SOAP Connector** | Legacy web services, XML-based WSDL contracts |
| **SQL Connector** | Direct database access, stored procedures |

### Configuration Steps

1. **Configure Integration Connectors** -- Create connector rules (REST, SOAP, or SQL)
   with connection endpoints, authentication, request/response mapping
2. **Configure Data Pages** -- Set up data pages that use the connectors to source data.
   Data pages cache and serve data to the application UI and logic.
3. **Map Request/Response** -- Map Pega properties to external API fields for both
   inbound and outbound data flows
4. **Implement Error Handling** -- Configure retry logic, timeout handling, and fallback
   behavior for integration failures
5. **Test Integration Rules** -- Validate each connector independently, then test
   end-to-end data flow through the application

### Key Principles
- Integrate real data as early as possible -- this reveals data quality issues, mapping
  gaps, and performance characteristics before they become expensive to fix
- Use Data Pages as the abstraction layer between connectors and the application -- this
  enables switching data sources without changing application logic
- The Blueprint specified integration points during the Design stage; this stage
  **implements** those specifications
