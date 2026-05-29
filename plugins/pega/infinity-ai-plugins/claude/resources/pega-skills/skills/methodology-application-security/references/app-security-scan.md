---
name: security-app-scan
description: Use when assessing a Pega Infinity application's security posture, checklist readiness, and platform security controls.
---

# Pega Infinity Security Scanner

## Purpose

Use this skill to assess a Pega Infinity application's security posture against the
platform's native security model and leading practices documented in the Pega security
guides. Focus on configuration first, not custom code first.

The main security domains in Pega are:
- Authentication
- Authorization
- Auditing and monitoring
- Encryption and key management
- Browser and UI hardening
- Secret management and identity federation
- Operational security controls
- Checklist-driven governance

## Security Baseline and Governance

### Security Checklist

Pega's Security Checklist is the main built-in governance mechanism for secure delivery.
It:
- Tracks core and additional security tasks
- Supports spinning off work into stories
- Helps teams complete hardening before production
- Can block production promotion when Deployment Manager is used and the checklist is incomplete

### Guardrail Compliance

Guardrail compliance is treated as a security control. Pega explicitly recommends:
- Prefer built-in platform security features over custom Java or custom HTML
- Review the Application Guardrails landing page regularly
- Remove non-compliant rules early, not at deployment time

### Scan Guidance

When assessing an application, first verify:
- Security Checklist ownership and completion state
- Presence of custom Java, custom HTML, and custom SQL
- Whether the application is public-facing or internal-only
- Whether the deployment is Pega Cloud or client-managed

## Authentication

### Supported Authentication Models

Pega supports these authentication service types for user access:
- SAML 2.0
- OpenID Connect
- Token credentials
- Kerberos
- Anonymous
- Custom authentication
- Basic credentials

Basic credentials remain supported for some use cases but are deprecated for creating new
authentication services in recent platform versions. Prefer enterprise IdPs and SSO for
higher environments.

### Where Authentication Is Configured

Key configuration surfaces:
- Authentication Service rules
- Authentication Profile records
- OAuth 2.0 Client Registration records
- Service Package instances for inbound services
- Web Service Security Profiles
- Security Policies landing page
- Access Group timeout settings

### Authentication Flow Concepts

During login, Pega can:
- Start an unauthenticated session
- Run pre-authentication activity
- Validate operator credentials or delegate to IdP
- Provision operators if enabled
- Map identity data to the clipboard
- Apply security policies such as MFA, CAPTCHA, and attestation
- Establish the authenticated application context
- Run post-authentication activity

### Important Security Design Rule

The browser requestor type for unauthenticated traffic should use an authentication-only
Access Group, not a full application ruleset stack. Using the full application context for
unauthenticated requests increases exposure.

### Session Management Controls

Pega documents session controls for:
- Requestor timeout
- Session termination
- Operator inactivity handling
- CORS-related session protections
- CSRF-related session protections

### What To Inspect In a Scan

Check for:
- SSO usage in non-lower environments
- MFA, CAPTCHA, or attestation policies where required
- Access Group timeout configuration
- Login failure handling and monitoring
- Whether inbound and outbound APIs use OAuth 2.0 instead of shared basic credentials

## Authorization

Pega offers four complementary authorization models.

### RBAC

Role-based access control limits actions based on Access Group derived roles and privileges.

Key artifacts:
- Data-Admin-Operator-AccessGroup
- Rule-Access-Role-Name
- Rule-Access-Role-Obj
- Rule-Access-Deny-Obj
- Rule-Access-Privilege

Use RBAC for:
- Create, read, update, delete permissions by class
- UI actions and privileges
- Feature access based on role

### ABAC

Attribute-based access control restricts access to specific instances or properties.

Key artifacts:
- Rule-Access-Policy
- Rule-Access-PolicyCondition

Use ABAC for:
- Row-level access control
- Property-level access control
- Owner-based access, jurisdiction-based access, and exception-list models

ABAC applies broadly, not only in UI. Pega enforces it in:
- Reporting
- Search
- Custom SQL
- General data access paths

Access is granted only when both RBAC and ABAC conditions succeed.

### CBAC

Client-based access control supports privacy-oriented protection of personal data and is
positioned for GDPR-like requirements.

### BAC

Basic access control protects requests that originate from the UI layer, such as:
- Harnesses
- Sections
- Custom controls

### What To Inspect In a Scan

Check for:
- Over-broad Access Groups
- Missing or weak ABAC on sensitive work and data classes
- Privileges protecting only UI but not data access
- Missing deny rules or weak RARO design
- Lack of jurisdiction, ownership, or tenant isolation policies where needed

## Auditing and Monitoring

### Security Event Configuration

Pega supports auditing of multiple security event classes through Security Event Configuration.

Categories include:
- Authentication events
- Data access events
- Security administration events
- OAuth 2.0 events
- Custom events

### Examples of Auditable Events

Authentication-related:
- Successful and failed login attempts
- Password changes
- Session terminations
- Logouts
- Operator changes

Data access-related:
- Work object opens
- Failed opens caused by security policy
- SQL query execution
- Report execution
- Report filter changes
- Search queries
- Malformed client requests

Security administration-related:
- ABAC changes
- CBAC changes
- Dynamic system setting changes
- CSP changes
- Authentication policy changes
- RBAC changes
- Access Group changes
- Workbasket role changes
- Operator enable or disable actions

OAuth-related:
- Invalid token requests
- Invalid client credentials
- Token revocation
- Client secret regeneration
- Dynamic client registration
- Invalid access token API calls

### Data Auditing

The History- class supports auditing of changes to rules and cases. Standard field-level
tracking and operator changes can be captured there.

### Where Configured

Security Event Configuration is accessed from Dev Studio under Org and Security tools.

### What To Inspect In a Scan

Check for:
- Whether failed logins are being audited
- Whether security admin changes are audited
- Whether OAuth events are being tracked
- Whether field-level auditing is enabled on sensitive data
- Whether security alerts are actively monitored, not just logged

## Data Encryption and Key Management

### Encryption Model

Pega uses envelope encryption. The platform-managed data encryption key encrypts data and
an external master key encrypts the data encryption key.

Key properties:
- AES-256 for data encryption
- External master key is not stored in the Pega database
- Data encryption keys rotate on a schedule
- Master key lifecycle remains the client's responsibility when using external KMS

### What Can Be Encrypted

Pega supports encryption for:
- Individual case properties
- Entire case data via class-level BLOB encryption
- Sensitive configuration data in rules that store secrets

### Property-Level Encryption

Configure by creating an Access Control Policy with action `PropertyEncrypt` for the target
case class, then list the optimized properties that must be encrypted.

### Class-Level Encryption

Configure by opening the class definition and enabling `Encrypt BLOB`.

Important limitation:
- Enable BLOB encryption before the first instance of that class is created

### BYOK and External KMS

Supported external key management options include:
- AWS KMS
- Azure Key Vault
- Google Cloud KMS
- HashiCorp Vault
- Custom KMS through a Data Page

### Where Configured

Main configuration surfaces:
- Keystore rules
- Data Encryption landing page
- Class definition for BLOB encryption
- Access Control Policy rules for PropertyEncrypt

### Standard Setup Flow

1. Create master key in external KMS
2. Create Pega keystore referencing the master key
3. Activate the keystore from the Data Encryption landing page
4. Configure property-level or class-level encryption as needed

### What To Inspect In a Scan

Check for:
- Presence of active keystore for sensitive applications
- Property-level encryption on regulated fields
- BLOB encryption on fully sensitive case types
- Key activation state and recent key history
- Whether old master keys were disabled rather than deleted
- Whether secrets are still stored directly in rules instead of being externally referenced

## Identity Federation and External Secret Stores

### Purpose

Identity federation and external secret stores allow Pega to retrieve secrets from the cloud
provider instead of storing them directly in Pega-managed records.

### Supported Patterns

AWS support includes:
- OAuth 2.0 authentication profile secrets
- OAuth client registration secrets
- Keystore file and password references
- Kafka and Avro-related secrets
- Redshift integration credentials
- S3 repository identity federation

Azure support includes:
- OAuth 2.0 authentication profile external secret references

GCP support includes:
- Identity federation for select services such as BigQuery and Pub/Sub

### Where Configured

Configured in Dev Studio through external secret store and identity federation setup. Pega or
an external OIDC-compliant IdP can be used as the identity provider for the cloud trust setup.

### What To Inspect In a Scan

Check for:
- Secrets embedded directly in integration rules
- Use of external references for OAuth profiles and client registrations
- Proper cloud trust relationship setup
- Secret rotation processes that do not require manual Pega updates

## Content Security Policy and UI Hardening

### CSP Support

Pega supports Content Security Policy through dedicated Content Security Policy records.

Create or open them from:
- Records > Security > Content Security Policy
- Create > Security > Content Security Policy

### Directive Families

Pega exposes configuration for directives including:
- Default-Src
- Base-URI
- Connect-Src
- Font-Src
- Form-Action
- Frame-Ancestors
- Child Frame-Src
- Img-Src
- Media-Src
- Object-Src
- Plugin-Types
- Sandbox
- Script-Src
- Style-Src

### Directive Options

For many directives, Pega supports:
- None
- Allow-All
- Self
- Data
- Explicit Allowed Websites list
- Nonce for Constellation-specific strict compliance scenarios
- Blob where appropriate

### Important Product Constraints

Traditional UI often requires more permissive settings such as `unsafe-inline` or
`unsafe-eval` for some directives.

Constellation portals support stronger CSP patterns, including Nonce for Script-Src and
Style-Src, and Blob in some directives.

### Best-Practice Scan Checks

Check for:
- Allow-All usage in directives
- Missing Frame-Ancestors restrictions
- Missing Base-URI restrictions
- Overly broad Connect-Src for integrations
- Lack of Nonce in Constellation portals where stricter compliance is required
- Reliance on legacy unsafe-inline and unsafe-eval without documented need

## HTTP Response Headers, CORS, CSRF, and Related Browser Protections

Pega documents browser-facing protections for:
- HTTP response headers
- CORS policies
- CSRF protections
- Deserialization filter configuration
- Unauthorized activity access prevention

### CORS

Pega supports defining cross-origin resource sharing policies through dedicated policy
configuration. Scan for:
- Wildcard origins
- Credentialed cross-origin access
- Overly broad methods
- Overly broad headers
- Insecure origin exceptions

### CSRF

Pega documents CSRF protections as an explicit security control. Scan for:
- Missing CSRF protections in authenticated UI flows
- Unsafe cross-origin form or state-changing patterns

### Deserialization Filter

Pega provides a configurable deserialization filter to reduce integrity and remote-code risk
from unsafe serialized content. Scan for:
- Whether the filter is configured
- Whether allowlists are too broad

### Secure Activities

Activities can and should be secured to prevent unauthorized invocation.

## Operational Security Controls

Pega exposes additional operational controls including:
- FIPS 140-3 compliance mode
- Keystore management
- Token profile instances
- Web Service Security profiles
- Servlet and filter management
- Secure activity configuration

### What To Inspect In a Scan

Check for:
- FIPS requirements in regulated environments
- Outdated or unmanaged keystore usage
- Weak servlet and filter exposure
- Insecure inbound service definitions
- Activities callable without appropriate protection

## Virus Scanning and Attachments

Pega supports integration with third-party virus scanning for email and attachment handling.

### What To Inspect In a Scan

Check for:
- Whether attachment scanning is enabled
- Whether uploaded content is scanned before processing
- Whether public-facing applications allow attachments without malware controls

## How Pega Maps to Common Vulnerabilities

Pega documentation explicitly aligns controls to major web security risks.

### Broken Access Control

Primary mitigations:
- RBAC
- ABAC
- BAC
- Access control checks

### Cryptographic Failures

Primary mitigations:
- Case data encryption
- Sensitive property encryption
- Keystore and BYOK support
- Security policy settings

### Injection

Primary mitigations:
- Prepared statements and parameterized database access
- Java injection checks
- Custom HTML security guidance
- XSS guidance
- CSP

### Security Misconfiguration

Primary mitigations:
- Security policies landing page
- HTTP response headers
- CSP
- CORS policies
- Deserialization filters

### Identification and Authentication Failures

Primary mitigations:
- Strong authentication services
- SSO with trusted IdPs
- Timeout controls
- MFA and related login policies

### Security Logging and Monitoring Failures

Primary mitigations:
- Security Event Configuration
- Data auditing
- Custom security events
- Monitoring security alerts and events

## Recommended Security Scan Order

Use this order when reviewing an application:

1. Security Checklist completion and guardrail posture
2. Authentication model, timeout settings, and MFA posture
3. Access Group and role model review
4. ABAC and sensitive-data authorization review
5. Auditing coverage for auth, admin, and OAuth events
6. Encryption posture for case data and configuration secrets
7. External secret store and identity federation adoption
8. CSP, headers, CORS, CSRF, and deserialization hardening
9. Attachment scanning and public-facing upload protections
10. Operational controls such as FIPS, keystores, activities, and inbound service security

## Red Flags During a Security Review

Treat these as high-priority findings:
- Basic credentials used as the primary authentication strategy in higher environments
- Full application Access Group exposed to unauthenticated browser requestors
- Sensitive case types without property or class encryption
- Missing ABAC for regulated or tenant-scoped data
- Security events not enabled for failed logins or admin security changes
- Secrets stored directly in rules where external secret stores are available
- CSP directives using Allow-All without a strong reason
- Public-facing attachments without malware scanning
- Activities exposed without appropriate authorization controls
- Dynamic system settings changed without audit visibility

## Preferred Platform-First Design Principles

- Prefer declarative Pega security rules over custom enforcement code
- Prefer enterprise SSO over local password-based authentication
- Prefer ABAC for sensitive row and property protection
- Prefer BYOK and external secret stores over embedded secrets
- Prefer explicit CSP and CORS allowlists over broad wildcards
- Prefer auditability by default for security-relevant changes

## Bottom Line

Pega Infinity's strongest native security capabilities are:
- Declarative authentication and SSO integration
- Layered authorization using RBAC plus ABAC
- Built-in security event auditing
- BYOK-based encryption and keystore management
- CSP and browser hardening controls
- External secret store integration and identity federation
- Security Checklist-driven governance

A strong security scan should treat these native controls as the primary evidence of a
well-secured application.
