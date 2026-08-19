---
name: methodology-integration
description: Use when working on Infinity integrations, including external systems, REST connectors, authentication, JSON Data Transforms, Data Pages, save plans, or OpenAPI-based integration design.
---

## Integration in Infinity

Integration in Infinity enables your application to **communicate with external systems** using industry-standard protocols.

### Connect to External Systems
Infinity supports outbound integrations using standard HTTP methods: **GET**, **POST**, **PUT**, **PATCH**, and **DELETE**. Supported connection standards include:
- **REST** — the primary and most commonly used protocol
- **OData** — for OData-compatible endpoints
- **OpenAPI** — import an OpenAPI spec to auto-generate connectors
- **SOAP** — for legacy web services

### Authenticate Securely
Three authentication methods are built in:
- **Basic Authentication** — username/password for simple API connections
- **OAuth 2.0** — token-based authentication for modern APIs (Client Credentials and JWT Bearer grant types); supports services like DocuSign, Salesforce, and others
- **AWS Signature** — cryptographic signature-based authentication for AWS services (S3, Lambda, DynamoDB, etc.)

All credentials are **automatically encrypted** and can be **overridden on subscription** using configuration sets — so Subscribers can use their own credentials without modifying the application.

### Read Data from External Systems
Pull data from external sources and surface it in your Infinity application as if it were local data. Externally sourced Data Types behave identically to local ones — you can use them on landing pages, as data references in Cases, in views. Note: external data sources have known limitations with Insights — Insight rules may not work correctly with externally sourced Data Types. Business key fields ensure deduplication when reading external records.

### Write Data to External Systems
Push new records to external systems or update and delete existing ones using a **Savable Data Page** with a configured **save plan**. Each save plan specifies a condition (When rule) and the HTTP method (POST, PUT, PATCH, or DELETE). A save is triggered in one of three ways:
- **Flow action post-processing** — save fires after the user submits a form
- **Save Data Page step** — explicit step added in Case Designer or a flow
- **Save-DataPage activity method** — programmatic save inside an Activity

### Map Data with JSON Data Transforms
**JSON Data Transforms** (rule type: Rule-Obj-Model) convert between Pega Clipboard format and JSON. In an integration, there are two specific roles configured on the Data Page's data source definition:
- **Request Data Transform** — maps Clipboard properties to the JSON payload sent to the external system (outbound)
- **Response Data Transform** — maps the JSON response from the external system back to Clipboard properties (inbound)

### Bulk-Create Integrations via OpenAPI
Import an **OpenAPI specification file** (JSON or YAML) to automatically generate multiple REST Connectors and Integration Systems at once — saving time and reducing manual errors.

## How Integration Fits into the Platform

Integration is tightly woven into the rest of Infinity:

- **Data Model** — External data maps to your Data Types just like local data. Fields, references, and calculated fields are all supported.
- **Workflow** — Automations can call Data Pages and data connectors as workflow steps, enabling integrations to fire during case processing (e.g., "on case creation, push record to SAP").
- **User Experience** — Externally sourced data appears on views, landing pages, and portals with the same authoring experience as local data.
- **Security** — Authentication profiles live under Rules Library → Security, and credentials are encrypted and environment-specific.
- **Business Rules** — Pre/post-processing logic (validations, defaults, transformations) can be applied through Automations before or after external calls.

## Architecture at a Glance

The four integration elements that work together for external CRUD:

| Element | Role |
|---|---|
| **Integration System** | A label that identifies the external system of record (e.g., "Salesforce", "SAP"). Associated with Data Objects, connectors, and Data Pages to indicate which SOR they belong to. Contains basic system info such as the URL. |
| **REST Connector (data connector)** | Defines the HTTP exchange — method, endpoint path, parameters, headers, body, and authentication. |
| **JSON Data Transform** | Converts between Clipboard format and JSON. A **Request Data Transform** prepares the outbound payload; a **Response Data Transform** maps the inbound response. Rule type: Rule-Obj-Model. |
| **Savable Data Page** | The runtime layer connecting the Data Object to the SOR. For reads: configured with a data connector as its source. For writes: save plans specify the HTTP method (POST, PUT/PATCH, DELETE). |

When you create a Data Object, Pega Platform automatically creates three default Data Pages: a **List page** (multiple records), a **Lookup page** (single record), and a **Savable page** (CRUD operations).

## Authoring Order for New Integrations

When building a new integration from scratch (all rules need to be created),
follow this strict order:

1. **Data model first** — Create all properties on the data class that the
   integration will read from or write to. This includes both flat scalar
   properties and Page/PageList properties for nested structures.
2. **Connector second** — Create the REST Connector rule.
3. **Data Transforms third** — Create the JSON DT and the clipboard wrapper DT.
   These reference the properties from step 1 — they will fail if properties
   don't exist.
4. **Data Page last** — Wire the connector and response DT together.

**Why this order matters:** Data Transforms validate property references at
creation time. If the referenced properties don't exist on the class, the
create/update call fails. Always ensure the data model is complete before
authoring DTs that reference it.

## Common Integration Scenarios

| Scenario | Example |
|---|---|
| **CRM sync** | Read customer records from Salesforce; create/update customers back |
| **ERP integration** | Pull product or order data from SAP for case processing |
| **Document signing** | Send contracts to DocuSign via OAuth 2.0 JWT Bearer |
| **Cloud services** | Call AWS Lambda functions or read from S3 using AWS Signature auth |
| **Location lookup** | Retrieve address data from a geolocation API using GET |
| **Healthcare data** | Use POST-for-read pattern to securely retrieve patient records |
| **Bulk onboarding** | Import an OpenAPI spec to set up dozens of connectors at once |

## Key Constraints and Considerations

- **HTTPS only** — base URLs must use HTTPS
- **OpenAPI limitations** — only GET and POST methods are supported; the spec file cannot be changed after creation
- **No nested lists** — JSON Data Transforms support only one reference list in the hierarchy (no lists within lists)
- **Parameter renaming** — renaming a parameter in one rule does NOT auto-update references in other rules; manual updates are required
- **ID/Business ID** — never map external data to internal ID or Business ID fields
- **Delete requires alternate key storage** — enable the "Alternate key storage" checkbox in Dev Studio; without it Delete cannot resolve the key
- **Reference fields** — reference fields do not support CRUD operations; use an Activity as the save plan as a workaround
- **CRUD in UI must be enabled** — after all backend configuration, enable CRUD on the list View by selecting "Allow edit, delete, and create"; without this, user changes at runtime do not persist

## Data Pages

Data Pages (rule type: Rule-Declare-Pages) are the caching and integration layer between a Data Object and its system of record. They separate the Data Model from the integration — changes to the SOR do not require changes to the Data Model. The data source of a Data Object is determined by the sources configured on its associated Data Pages — not on the Data Object itself.

### Types

| Type | Characteristics |
|---|---|
| **Read-only** | Loaded on demand, cached; supports refresh strategies; scope can be thread, requestor, or node. |
| **Editable** | Read-write in memory; no refresh strategy or save plan; cannot be node scope. |
| **Savable** | Has save plans for writing to a SOR; only type that can be referenced in Save Data Page locations (flow action, Save Data Page step, Save-DataPage method). |

### Scopes

| Scope | Shared by | Restrictions |
|---|---|---|
| **Thread** | Single requestor, single thread | Supports all refresh strategies |
| **Requestor** | All threads of one user session | Supports all refresh strategies |
| **Node** | All users on the server node | Read-only only; TTL refresh only; must not apply to classes with access control policies |

### Refresh strategies (read-only and editable pages)

- **Reload once per interaction** — refresh once per user interaction; thread/requestor scope only
- **Do not reload when** — refresh when a When rule evaluates to false; thread/requestor scope only
- **Reload if older than (TTL)** — refresh after a configured time window; valid for all scopes

## Local vs External System of Record

| SOR type | Setup required | Default save plans |
|---|---|---|
| **Local (Pega database)** | None — save plans are created automatically when the Data Object is created | Database save, Database update, Database delete |
| **External (REST, OData, SOAP)** | Data connector + JSON Data Transforms + reconfigure Savable Data Page save plan | Custom; select the connector and HTTP method (POST, PUT/PATCH, DELETE) |

## Developing Before the External System is Ready

Use simulation to build and test case processing and UI before an external service is available or finalized. The simulation approach depends on whether a connector exists:

| Situation | Approach |
|---|---|
| Service not yet defined, interface unknown | Simulate the **Data Page source** |
| Connector exists, service not yet deployed | Simulate the **Connector** |

### Simulating a Data Page source (App Studio)
- On the Data Page Definition tab, enable **"Simulate data source"** and specify a System name
- The simulation source can be a **Data Transform**, **Report Definition**, or **Activity** pre-populated with sample data
- The real source configuration is preserved — disabling simulation automatically restores it; no rework needed when the real service is ready
- In App Studio Integration Designer, simulated Data Pages are marked with an **orange triangle**; production-ready sources show a **green dot**

### Simulating a Connector (Dev Studio)
- Create a **simulation Data Transform** in the same class as the connector: set response-page properties based on request-page inputs
- Create a **simulation Activity** in the same class that applies the Data Transform
- Configure on the connector (Simulations tab): choose **Global** (all users) or **User session** (current user only)
- Not available for SQL connectors
