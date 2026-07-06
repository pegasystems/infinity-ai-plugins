---
name: rules-rule-decision-dataset
description: Schema and authoring guide for Pega dataset rules (Rule-Decision-DataSet), including Database Table type configuration with keys, partition keys, and table mapping
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Pre-creation checklist

Before calling `create-rule` for a Dataset, confirm the following:

| # | Field | Description | Required |
|---|-------|-------------|----------|
| 1 | **Branch / ChangeRequest ID** | The ChangeRequest ID to create the dataset in | Yes — always ask |
| 2 | **RuleSet** | Target ruleset name — pass as `ruleSet` parameter to `create-rule` to override | No — auto-derived from the ChangeRequest branch. Only ask if the user explicitly wants to target a different ruleset. |
| 3 | **RuleSet Version** | Target ruleset version | No — auto-derived from the ChangeRequest branch. Only ask if the user explicitly provides one. Do **not** pass `pyRuleSetVersion` in the content payload unless the user specifies it. |

> **RuleSet and RuleSet Version are auto-derived from the ChangeRequest branch by default.**
> Do not ask for or pass these fields unless the user explicitly requests an override.

## Pre-creation property check (Snowflake)

Before calling `create-rule` for a **Snowflake** dataset, verify that every property referenced in `pyMappings`, `pySelectKeys`, `pyResumeKeys`, and `pyPartitionKey` exists on the target class (`pyClassName`).

1. For each `.PropertyName` in the mappings, use `search-rules` or `list-rules` with `ruleType=Rule-Obj-Property` to check if the property exists on the target class.
2. If a property **does not exist**, create it first using `create-rule` with `ruleType=Rule-Obj-Property` and the same `changeRequestID`. Use `pyPropertyMode: "String"` and `pyStringType: "Text"` as defaults unless the user specifies otherwise.
3. Only proceed with the dataset `create-rule` call after **all** mapped properties exist.

> **Important — dot-prefix rule:**
> In dataset mappings, properties use dot-notation (e.g., `.CUSTID`, `.Birthdate`).
> When creating the property rule itself, **strip the leading dot**. The `pyPropertyName` field in `Rule-Obj-Property` must be the bare name without a dot prefix.
>
> - Mapping reference: `".CUSTID"` → Property rule: `"pyPropertyName": "CUSTID"`
> - Mapping reference: `".Birthdate"` → Property rule: `"pyPropertyName": "Birthdate"`
>
> Pega rejects property names that start with a dot.

> **Why:** Pega's server-side `DataSetRuleMappingsValidator` checks that every mapped property exists in the data dictionary on the specified class. If any property is missing, the entire dataset creation fails. Creating properties first avoids this failure.

## Supported Dataset Types

| Type | `pyType` / `pyCategory` | `pyConfiguration.pxObjClass` | Status |
|------|-------------------------|------------------------------|--------|
| **Database Table** | `Data-Admin-DataSet-DB` | `Data-Admin-DataSet-DB` | ✅ Supported |
| **Snowflake** | `Data-Admin-DataSet-Snowflake` | `Data-Admin-DataSet-Snowflake` | ✅ Supported |
| Kafka | `Data-Admin-DataSet-Kafka` | `Data-Admin-DataSet-Kafka` | ⏳ Not yet supported |
| BigQuery | `Data-Admin-DataSet-BigQuery` | `Data-Admin-DataSet-BigQuery` | ⏳ Not yet supported |
| File/S3 | `Data-Admin-DataSet-File` | `Data-Admin-DataSet-File` | ⏳ Not yet supported |

> **Only Database Table and Snowflake are currently supported for creation via MCP tools.**
> Other types are listed for reference and will be added in future iterations.

## Examples

| File | Description |
|------|-------------|
| `database-table.md` | Complete Database Table dataset with keys and partition key |
| `snowflake.md` | Complete Snowflake dataset with column mappings, select keys, resume keys, and partition key |

## Authoring Notes

### Rule identity fields

| Field | Description |
|-------|-------------|
| `pxObjClass` | Always `"Rule-Decision-DataSet"` |
| `pyClassName` | The Pega class this dataset operates on (e.g., `"MyOrg-MyApp-Data-Customer"`) |
| `pyRuleName` | Dataset name — unique within the class (e.g., `"Customers"`) |
| `pyLabel` | Human-readable label shown in Dev Studio |
| `pyPurpose` | Must match `pyRuleName` exactly |
| `pyCategory` | Determines the dataset type — `"Data-Admin-DataSet-DB"` for Database Table |
| `pyType` | Must match `pyCategory` — `"Data-Admin-DataSet-DB"` for Database Table |
| `pyTypeLabel` | Human label for the type — `"Database Table"` |
| `pyCanTransfer` | `"true"` if this dataset can be used as a source/destination in data flows |
| `pyRuleAvailable` | `"Yes"` to make the rule active |

### `pyConfiguration` — Database Table

The `pyConfiguration` object contains all type-specific settings. For Database Table:

| Field | Required | Description |
|-------|----------|-------------|
| `pxObjClass` | Yes | Always `"Data-Admin-DataSet-DB"` |
| `pyImplementation` | Yes | Always `"Pega-DecisionEngine:DBDataSet"` |
| `pyTableName` | Yes | Database table name (e.g., `"pr_data_customer"`, `"PR_DATA_IH_ASSOCIATION"`) |
| `pySSLProtocolVersion` | Yes | SSL protocol — use `"TLSv1.2"` |
| `pyKeys` | Yes | Array of key columns — at least one required |
| `pyPartitionKey` | No | Property reference for partitioning (e.g., `".RegionCode"`) — use when the table is partitioned |

### `pyKeys` — Dataset key columns

Each entry in `pyKeys` identifies a column used as a primary/lookup key:

```json
{
  "pxObjClass": "Embed-DataSet-KeyValue",
  "pyKey": ".CustomerID"
}
```

- `pyKey` uses dot-notation property references (e.g., `.CustomerID`, `.pyGUID`, `.pyLabel`)
- Multiple keys form a composite key
- Keys determine how the dataset engine looks up and deduplicates records

### `pyPartitionKey` — Optional partitioning

When the underlying database table is partitioned, set `pyPartitionKey` to the property
reference used as the partition column. This enables the dataset engine to route
read/write operations to the correct partition for performance.

- Example: `".RegionCode"`, `".pyAssociationStrength"`
- Omit entirely if the table is not partitioned

### Table naming conventions

- Pega auto-generated tables use the prefix `pr_` followed by the class path
  (e.g., `pr_data_dms_customer_data` for class `DMOrg-DMSample-Data-Customer`)
- Custom tables can use any name the DBA provides
- Table name is case-insensitive in most databases but stored as provided

### `pyPagesAndClasses`

Always include this as a stub array — it's required by the rule structure:

```json
"pyPagesAndClasses": [
  {
    "pxObjClass": "Embed-PagesAndClasses"
  }
]
```

---

## `pyConfiguration` — Snowflake

The `pyConfiguration` object for Snowflake datasets connects to a pre-configured Snowflake data instance.

### Required fields

| Field | Description |
|-------|-------------|
| `pxObjClass` | Always `"Data-Admin-DataSet-Snowflake"` |
| `pyClassName` | Must match the top-level `pyClassName` — needed for server-side property validation |
| `pyImplementation` | Always `"Pega-DecisionEngine:SnowflakeDataSet"` |
| `pySnowflake` | Name of the Snowflake data instance (connection profile configured in Pega) |
| `pyTableNameType` | `"Single"` (direct table name) or `"Settings"` (from application settings) |
| `pyTableName` | Snowflake table/view name — required when `pyTableNameType = "Single"` |
| `pySSLProtocolVersion` | SSL protocol — use `"TLSv1.2"` |
| `pyMappings` | Array of column-to-property mappings — at least one required |

### Optional fields

| Field | Description |
|-------|-------------|
| `pyTableNameApplicationSettings` | App setting key name — required when `pyTableNameType = "Settings"` |
| `pySelectAll` | `"true"` to select all columns; `"false"` for mapped columns only |
| `pySelectKeys` | Keys for browse-by-key lookups (array of `Embed-DataSet-Snowflake-Select`) |
| `pyResumeKeys` | Keys for resumable/paginated reads (array of `Embed-DataSet-Snowflake-Resume`) |
| `pyPartitionKey` | Single partition key object (`Embed-DataSet-Snowflake-Partition`) |

### `pyMappings` — Column-to-property mappings

Each mapping connects a Snowflake column to a Pega property:

```json
{
  "pxObjClass": "Embed-DataSet-Snowflake-Mappings",
  "pyColumnName": "CUSTOMERID",
  "pyPropertyName": ".CustomerID"
}
```

- `pyColumnName`: Snowflake column name (typically uppercase)
- `pyPropertyName`: Pega property in dot-notation

### `pySelectKeys` — Lookup keys

Used for browse-by-key and delete-by-key operations:

```json
{
  "pxObjClass": "Embed-DataSet-Snowflake-Select",
  "pyColumnName": "CUSTOMERID",
  "pyPropertyName": ".CustomerID"
}
```

### `pyResumeKeys` — Pagination keys

Used for resumable reads (large result set pagination):

```json
{
  "pxObjClass": "Embed-DataSet-Snowflake-Resume",
  "pyColumnName": "CUSTOMERID",
  "pyPropertyName": ".CustomerID"
}
```

### `pyPartitionKey` — Partition key

A single object (not array) for partitioned tables:

```json
{
  "pxObjClass": "Embed-DataSet-Snowflake-Partition",
  "pyColumnName": "REGION",
  "pyPropertyName": ".Region"
}
```

### `pyTableNameType` — Table source

| Value | Behavior |
|-------|----------|
| `"Single"` | Table name comes directly from `pyTableName` field |
| `"Settings"` | Table name is read at runtime from application settings using the key in `pyTableNameApplicationSettings` |

### Snowflake data instance

The `pySnowflake` field references a `Data-Admin-Snowflake` instance that must already exist in Pega.
This instance holds connection details (account, warehouse, database, schema, credentials).
The dataset rule does NOT contain connection credentials — only the instance name.
