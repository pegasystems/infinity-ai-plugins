---
name: usecase-dropdown-sources
description: "Reference for fixed and application-defined field values in Rule-Application-UseCase."
---

# Field Values

## Local Enum Fields

These fields use a fixed set of values defined directly in the schema:

| Field | Values                                                                                                                                                                                                            |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pyCategory` | `Complete`, `Deferred`, `Implemented`, `New`, `Open`, `Pending Info`, `Pending-Blocked`, `Pending-Development`, `Pending-Implement`, `Pending-Plan`, `Pending-Review`, `Pending-Tasks`, `Withdrawn` | Actual stored values. UI labels include `Pending-Deferred`, `InProgress`, and `Pending-Details` for `Deferred`, `Open`, and `Pending Info`. |
| `pyEstimatedDevelopmentEffort` | `Low`, `Medium`, `High`                                                                                                                                                                                           |
| `pyBusinessImpact` | `Low`, `Medium`, `High`                                                                                                                                                                                           |
| `pySpecFormat` | `UserStory`                                                                                                                                                                                                       |

## Application-Defined Fields

The following fields accept values defined by the application. Their values are not
resolved by this schema:

| Field | Meaning |
|---|---|
| `pyUsedAs` | Specification type for the use case. |
| `pyRelease` | Application release targeted by the use case. |
| `pyIteration` | Application iteration assigned to the use case. |
| `pyBusinessObjectivesList[].pyDescription` | Description of the associated business objective. |

## Notes

- `pyRelease` and `pyIteration` both depend on `pyProductName` being set first — populate `pyProductName` before prompting for these fields.
- `pyUsedAs` holds the specification type value (e.g. `pxFlowaction`), not a free-text description.
