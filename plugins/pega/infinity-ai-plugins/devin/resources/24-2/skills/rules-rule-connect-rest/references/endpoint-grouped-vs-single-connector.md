---
name: rest-endpoint-grouped-vs-single-connector
description: "When authoring manual/no-OAS REST connectors for full CRUD on a Data Type, explains why to group connectors by endpoint shape (collection vs. instance) instead of building one connector that handles both."
---

Two connectors for full CRUD on a Data Type, grouped by endpoint shape:
- **Collection**: GET list + POST create on the collection endpoint (e.g. `/employees`)
- **Instance**: GET single + PATCH update + DELETE on the instance endpoint (e.g. `/employees/{id}`)

This is the recommended manual/no-OAS pattern for Data Page integration. OAS or
Blueprint import may instead generate one connector per operation. When
generated artifacts already exist, activate and complete them instead of
recreating this endpoint-grouped pattern.

## Why endpoint-grouped, not a single CRUD connector

| Concern | Endpoint-grouped (recommended) | Single connector |
|---------|------------------------------|------------------|
| Response DT mapping | Unambiguous: one DT per method | Must handle array AND object |
| `{id}` parameter | Only on the instance connector | Must be optional (empty for list) |
| Data Page source wiring | LIST -> collection, SAVABLE -> instance | Same connector for both = ambiguous |
| Save plan clarity | Each save plan targets a specific connector | All point to the same connector |
| Manual/no-OAS clarity | Matches collection vs. instance endpoint shapes | Requires optional `{id}` hacks |

## Anti-pattern: single CRUD connector

Do not create a single connector like this:

```json
{
  "pyServiceName": "EmployeeCRUD",
  "pyParameters": [
    { "pyParametersParamName": "id", "pyEmptyBehavior": "SKIP" }
  ]
}
```

Problems:
- GET returns an array (list) or object (instance) depending on whether `id` is populated
- The response DT must handle both shapes — error-prone
- `pyEmptyBehavior: "SKIP"` is a hack to make `{id}` optional
- Data Page source wiring: both list and savable point to the same connector with the same method
- Save plans are indistinguishable from the lookup source
