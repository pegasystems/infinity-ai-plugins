---
name: flowaction-assignment-preview
title: Constellation Assignment Preview Pattern
description: How to display external data on a Constellation assignment view with live field-change refresh — architecture, timing, and wiring.
---

# Constellation Assignment Preview Pattern

## Architecture

When an assignment view needs to display data from an external integration
(API-sourced data pages), use this pattern:

```
External API data pages
  -> orchestration data page (activity-backed)
  -> work-class embedded display page (.WeatherForecast, .PricingResult, etc.)
  -> work-class card view (reads embedded page fields)
  -> assignment view (includes card view)
```

**Do not** render data-class views directly in a work-class assignment view.
The assignment view runs in the work-class context. Data-class views
introduce class-context ambiguity that causes rendering and picker failures.

**Do not** render external data pages directly. Copy external data into a
work-class embedded page so the assignment view reads only work-class
properties.

## Refresh timing

Three hooks exist for populating the embedded display page. Each has a
different timing relative to user interaction:

| Hook | When it runs | Use for |
|---|---|---|
| `pyPreProcessingActivity` | Before form display | Loading dropdown values, initializing pages. **Not useful** for values the user types into the same form — pre-processing runs before the user sees the form. |
| `pxFARefreshSettingsOfView` | On field value change (while user is on form) | **Live preview** — trigger a Data Transform when the user changes a driving field (e.g., `.Location`, `.GameDate`). The DT populates the embedded display page and the UI refreshes the card. |
| `pyActionTransformRule` | After submit (after validation) | Submit-time safety — ensure the embedded page has current data before the flow advances. **Too late for preview** in screen flows that immediately move to the next assignment. |

### Recommended wiring for live preview

Use **both** `pxFARefreshSettingsOfView` and `pyActionTransformRule`:

- `pxFARefreshSettingsOfView` gives the user a live preview while editing.
- `pyActionTransformRule` ensures data is current on submit.
- `pyPreProcessingActivity` stays blank (or handles unrelated initialization).

### `pxFARefreshSettingsOfView` shape

Each entry maps a field change to a Data Transform:

```json
{
  "pxFARefreshSettingsOfView": [
    {
      "pxObjClass": "Embed-FARefreshSettingsOfView",
      "pyPropertyName": ".Location",
      "pyDataTransform": "UpdateWeatherForecast",
      "pyDataTransformCallParams": {}
    },
    {
      "pxObjClass": "Embed-FARefreshSettingsOfView",
      "pyPropertyName": ".GameDate",
      "pyDataTransform": "UpdateWeatherForecast",
      "pyDataTransformCallParams": {}
    }
  ]
}
```

- `pyPropertyName` — the work-class property whose change triggers refresh
  (dot-prefixed, e.g., `.Location`). Cannot be blank.
- `pyDataTransform` — the DT to run. Cannot be blank.
- `pyDataTransformCallParams` — optional parameters passed to the DT.

### Warning: `pyAdditionalSubmitFieldsDataTransform`

This field runs a DT on submit that can set additional fields. **Be careful:**
if the DT sets driving fields (e.g., `.Location`, `.GameDate`) to blank or
default values, it can overwrite user input. Only use this for fields that
are genuinely computed on submit, never for fields the user edits.

## Embedded display page update pattern

When the refresh DT populates the embedded page, prefer explicit field-level
SET operations over page-level copy:

```
.WeatherForecast.StatusMessage = D_GameSessionWeather[...].StatusMessage
.WeatherForecast.DisplaySummary = D_GameSessionWeather[...].DisplaySummary
.WeatherForecast.TemperatureSummary = D_GameSessionWeather[...].TemperatureSummary
```

`UPDATE_PAGE .WeatherForecast WITH_VALUES_FROM D_GameSessionWeather[...]`
may not reliably update the Constellation assignment UI during field-change
refresh. Explicit SET rows are more predictable for embedded display pages
rendered in assignment views.

## Implementation checklist

- [ ] External data is on a work-class embedded `Page` property (not rendered from a data page directly)
- [ ] Card view is on the work-class (not data-class)
- [ ] `pxFARefreshSettingsOfView` wires each driving field to the update DT
- [ ] `pyActionTransformRule` also points to the update DT for submit-time safety
- [ ] `pyPreProcessingActivity` is blank (or handles only unrelated initialization)
- [ ] Update DT uses explicit SET for each field the card view renders
- [ ] Card view reads only work-class embedded page properties (`.WeatherForecast.*`)
