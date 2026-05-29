---
name: methodology-retrieve-case-work-history
description: "Load when the user asks about case history, timeline, past actions, or audit trail for a specific case. Contains step-by-step instructions for calling D_pyWorkHistory and presenting results."
---
# Recipe: Retrieve Case Work History

Retrieve the complete work history for a given case instance. This recipe shows how to call the
`D_pyWorkHistory` data page using the `run-data-page` tool to extract historical events,
assignments, and actions taken on a case.

## Goal

Answer prompts like the following using the work history data page:
- "Show me the work history for case US-7"
- "What actions have been taken on this case?"
- "Fetch the case timeline events for case X"
- "What is the history of changes for this case?"

Expected result:
- A complete time-ordered list of work history events
- Each event includes timestamp, action taken, and user context

## When to Use

| Situation | Use this recipe |
|-----------|------------------|
| Case activity audit | Build a full timeline of case events |
| Case investigation | Explain what happened on a specific case |
| Compliance/review | Produce event history for review evidence |
| User behavior analysis | Attribute actions to performers over time |
| Downstream reporting | Export normalized timeline events |

**Prerequisite:** You must have the case `CaseInstanceKey` input value (the case's `pzInsKey`),
typically in the format `{Work-Class} {Case-ID}` (e.g., `ACME-WORK W-1006`).

## Primary Path: Fetch Work History

### Step 1: Determine case context

Check whether the case `CaseInstanceKey` is already known from the conversation context.

- **If known:** Proceed directly to Step 2 with the `CaseInstanceKey` value.
- **If not known:** Ask the user for the case ID (e.g., "W-1006"). Then call `list-cases` to
  find the matching case row, read its `pzInsKey`, and use that value as `CaseInstanceKey`.
- **If `list-cases` is unavailable:** Ask the user to provide the full case instance key (`CaseInstanceKey`).

### Step 2: Call the data page with the instance key

**Tool:** `run-data-page`

**Parameters:**
- `dataPage`: `"D_pyWorkHistory"`
- `dataPageType`: `"list"`
- `payload`: JSON-encoded string containing the full POST body with `dataViewParameters.CaseInstanceKey`

`payload` must be passed as a JSON-encoded string. Do not pass a raw JSON object.
For `D_pyWorkHistory`, pass `CaseInstanceKey` only under `dataViewParameters`.

**Example call:**
```json
{
  "dataPage": "D_pyWorkHistory",
  "dataPageType": "list",
  "payload": "{\"dataViewParameters\":{\"CaseInstanceKey\":\"ACME-WORK W-1006\"}}"
}
```

**Expected response structure:**
- `resultCount` — total number of results returned
- `data[]` — array of work history entries
- `hasMoreResults` — boolean; indicates if more results exist beyond current page
- `pxObjClass` — response class type (value can vary by Pega version and implementation)
- `fetchDateTime` — timestamp when data was fetched

If this call returns an error payload or transport failure, stop normal flow and follow
`Notes -> Error handling` before continuing.

For field-level definitions (including `pyMessageKey`, `pzInsKey`, and `pxHistoryForReference`),
see `Response Interpretation`.

### Step 3: Parse and present the history

Extract the `data[]` array from the response. Each entry represents a historical event on
the case in time-order.

If `data[]` is empty, inform the user that no work history was found for the case and stop.

**Common patterns:**
- **Filter by performer** — if the user asks only about actions by a specific user, filter
  `data` by `pyPerformer`
- **Interpret message keys safely** — `pyMessageKey` contains message-rule keys (e.g., `HistoryWork!ASSIGNED`),
  not human-readable text. When presenting to users, either resolve the key or construct a narrative
  from `pyPerformer`, `pxTimeCreated`, and `pyMemo` fields. Never display raw keys.
- **Sort by timestamp** — Pega work history is typically returned most-recent-first (descending
  `pxTimeCreated`). Re-sort ascending only if the user asks for oldest-first timeline output.
- **Summarize activity** — group events by user or date range if the history is very long

### Step 4: Report findings

Return the work history with:
- Timeline of events (timestamps in readable format)
- Actions taken and by whom
- Assignment and lifecycle-related events present in history messages
- If `data[]` is empty: clearly state that no work history was found

## Call Discipline

| Rule | Agent behavior |
|------|----------------|
| Start with one call | Make one initial `run-data-page` call to `D_pyWorkHistory` per request |
| Parse once | Derive answers from `data[]`; do not issue variant calls with extra `payload` keys |
| Parameter discipline | Pass only `dataViewParameters.CaseInstanceKey` in `payload` for `D_pyWorkHistory` |
| No speculative fetching | Do not fetch work history unless the user asks for it |
| Read-only only | `D_pyWorkHistory` is retrieval-only; do not attempt create/update/delete |

## Response Interpretation

The work history data page returns a paginated list of historical events. Key fields:

| Field | Type | Description |
|-------|------|-------------|
| `pxTimeCreated` | string | ISO timestamp when the event occurred |
| `pyPerformer` | string | User ID or name who performed the action |
| `pyMessageKey` | string | Message rule key identifier (e.g., `HistoryWork!ASSIGNED`) |
| `pxHistoryForReference` | string | Case reference shown on history rows (e.g., `ACME-WORK W-1006`); informational, not the `CaseInstanceKey` input |
| `pzInsKey` | string | Canonical unique key for a history row (different from the case `CaseInstanceKey` input); use this when referencing a specific history entry |
| `pxInsName` | string | Display-oriented instance name for the same history row; useful for readability, not as the primary lookup key |
| `pxObjClass` | string | Class type of history entry (e.g., `History-{ClassRefName}`) |
| `pyMemo` | string \| null | Optional memo or additional notes on the event |
| `pxLatitude` / `pxLongitude` | number \| null | Location data if available (usually null) |

## Anti-Patterns

- **Don't fetch work history without a valid instance key.** The call will fail or return
  no results if `CaseInstanceKey` is incorrect or empty.
- **Don't assume history is always present.** Some cases may have no work history events
  (newly created cases with minimal activity).
- **Don't parse raw timestamps directly in conversation.** Always convert ISO `pxTimeCreated`
  timestamps to human-readable format (e.g., "May 21, 2026 at 9:23 AM").
- **Don't display raw `pyMessageKey` values to users.** Message-rule keys (e.g., `HistoryWork!ASSIGNED`)
  are not human-readable. Either resolve them through message rules or build a narrative from supporting
  fields (`pyPerformer`, `pxTimeCreated`, `pyMemo`).
- **Don't pass extra parameters to this data page.** `D_pyWorkHistory` accepts only
  `dataViewParameters.CaseInstanceKey` in `payload`.
- **Don't assume all fields are populated.** Fields like `pyMemo`, `pxLatitude`, `pxLongitude`
  may be null depending on the event type.

## Notes

### Data page availability

`D_pyWorkHistory` is a standard Pega DX API data page available in most rule authorization contexts.
If the call fails with "Data page not found," verify:
- The case instance key is correct and in the format `{Work-Class} {Case-ID}`
- The user has read access to the case
- The application is configured to track work history

`CaseInstanceKey` must be the case `pzInsKey` (for example, `ACME-WORK W-1006`). Do not pass
`pxHistoryForReference` from history rows as the input key.

### Error handling

If `run-data-page` returns an error payload (for example `isError: true` or a transport error):
- Validate `CaseInstanceKey` format and retry once with the corrected key
- Confirm the operator has access to the case class and instance
- Return a concise failure summary with the original tool error for troubleshooting

### Pagination

If `hasMoreResults` is `true`, more work history events exist beyond the current page.
`D_pyWorkHistory` does not support pagination parameters — only `CaseInstanceKey` is a valid input.
If `hasMoreResults` is `true`, the full history is not available in a single call.
Report this limitation to the user: "The work history data page returned partial results.
The complete history may not be accessible through this data page."

### Performance

Work history can be large for old cases. If performance is a concern, consider:
- Filtering `data` client-side by performer or message key after fetching
- Limiting initial result display to the most recent N events
