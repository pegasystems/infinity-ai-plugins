---
name: customer-service-application
description: Load when the current Pega application is built on Customer Service and uses the PegaCS-Constellation ruleset stack. Provides Customer Service-specific application-test discovery and data guidance.
---

# Customer Service Application Variant

Apply this reference in addition to the standard application-test methodology when `get-application` confirms that the current application is built on Customer Service and its `RulesetStack` contains `PegaCS-Constellation`.

## Retrieve Customer Service Context

1. Call Data Page `D_pyApplicationInstructionsCS` with `dataPageType="list"` to retrieve the Customer Service-specific instructions. Treat these instructions as additive; the standard methodology remains in effect.
2. Call Data Page `D_pxAvailableCaseTypesForPortal` with `dataPageType="page"`:

   ```
   run-data-page(
     dataPage="D_pxAvailableCaseTypesForPortal",
     dataPageType="page",
     payload="{\"PortalName\":\"InteractionPortal\"}"
   )
   ```

3. Read the `pyCaseTypesAvailableToCreate` array from the page response. For each entry, use `pyClassName`, `pyLabel`, `pyStartingFields`, and `pyMetaData` as the available Interaction and Service Case metadata.
4. For demo customer entries, parse `pyActionMeta.pyPayload` and use its values as runtime test data, including `caseType` and `startingFields`.
5. Combine the instructions, case-type metadata, and payloads into one active Customer Service context before continuing.

## Apply the Context

Retain this Customer Service context throughout all subsequent phases. It governs:

- scope definition in Phase 1
- existing Business Action discovery in Phase 2
- scenario generation in Phase 4
- Business Action creation in Phase 5
- Application Test creation in Phase 6

Use the sample scenarios from the Customer Service instructions as references when generating Phase 4 scenarios. Derive available case types and customer test data from the portal response rather than from assumptions or static examples.
