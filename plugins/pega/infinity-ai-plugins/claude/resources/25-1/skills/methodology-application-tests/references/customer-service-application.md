---
name: customer-service-application
description: Load when the current Pega application is built on Customer Service and uses the PegaCS-Constellation ruleset stack. Provides Customer Service-specific application test discovery and data guidance.
---

# Customer Service Application Variant

Apply this reference in addition to the standard application-test methodology when `get-application` confirms that the current application is built on Customer Service and its `RulesetStack` contains `PegaCS-Constellation`.

## Retrieve Customer Service Context

1. Call Data Page `D_pyApplicationInstructionsCS` with `dataPageType="list"`:

   ```
   run-data-page(
     dataPage="D_pyApplicationInstructionsCS",
     dataPageType="list"
   )
   ```

  For every `pxResults` entry, add `pyApplicationInstructions` to the active context as mandatory Customer Service guidance and `pySampleScenarios` as template-only guidance for scenario structure, Business Action naming, and wiring. The standard methodology remains in effect, and application-specific steps must come from the actual rules.
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
5. Combine the returned Customer Service instructions and sample-scenario templates, case-type metadata, and payloads into one active Customer Service context before continuing.

## Use This Context

1. Keep the assembled Customer Service context active for the remaining methodology phases.
2. Before authoring scenarios, read the Interaction case type, all stage flows, and recursively call subflows. Derive every Interaction assignment through the flow-discovered Service Case launch assignment from ordered Assignment shapes and connector paths; each reachable Assignment shape is a separate Gherkin and Business Action step. Group assignments by their actual connector path and decision variant. Assignments on mutually exclusive decision branches must be represented in separate scenarios, never combined into one scenario.
3. Decisions select a path but are not steps. Then derive Service Case steps from its actual post-launch flow and customer test data from the portal response.