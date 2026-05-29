---
name: canvas-structure
description: "Load when updating an existing flow's shapes or connectors. Explains which fields must stay in sync when shapes are added or removed, and how deep-merge works for partial updates."
---

A flow rule stores its canvas in three linked fields. They must stay in sync — the
flow engine reads `pyModelProcess` to execute shapes but uses `pyFromTasks` as the
routing table; inconsistency leads to runtime errors or shapes that never fire.

## The Three Canvas Fields

| Field | Type | Role |
|-------|------|------|
| `pyModelProcess` | Embedded page (`Embed-Rule-Obj-Flow-ProcessModel`) | The **canvas** — every shape, every connector, coordinates, layout |
| `pyFromTasks` | Page list (`Embed-Rule-Obj-Flow-FromTasks`) | The **routing table** — which shape connects to which, and under what condition |
| `pyEndingActivities` | String array | Names of shapes that terminate the flow |

> **Verbatim legacy IDs in `pyEndingActivities`.** Values must
> match the End shape's `pyMOId` **verbatim** — including legacy
> uppercase / non-contiguous forms like `"END52"`, `"END8"`, `"End51"`.
> Do **not** normalize to a canonical `"End1"` when recreating a flow
> whose actual End shape carries a legacy ID. The server uses this
> string as a direct key lookup into `pyShapes`; a mismatch silently
> drops the terminal from the status index (`pyTaskStatusXml`) and from
> `pyFromTasks`.

### `pyModelProcess` structure

```
pyModelProcess (Embed-Rule-Obj-Flow-ProcessModel)
  ├─ pyShapes (PageGroup keyed by pyMOId)
  │    e.g., { "Start1": { ... }, "Assignment1": { ... }, "End1": { ... } }
  ├─ pyConnectors (PageGroup keyed by connector ID)
  │    e.g., { "Transition1": { pyFrom: "Start1", pyTo: "Assignment1", ... } }
  ├─ pyAnnotationShapes (usually empty)
  ├─ pyContexts (usually empty)
  └─ pyModifiers (usually empty)
```

`get-rule(detail="full")` may instead serialize `pyShapes` and `pyConnectors` as
arrays. Preserve the fetched representation exactly when building `updates` — do not
normalize between map-backed and list-backed forms.

### `pyFromTasks` structure

One entry per source shape. Each entry carries a `pyToTasks` PageGroup keyed by the
destination shape name.

```
pyFromTasks = [
  {
    pyFromTaskName: "Start1",
    pyToTasks: {
      "Assignment1": {
        pyID: "Transition1",
        pyTaskStatusOrWhen: "ALWAYS",
        pyLikelihood: "100",
        pxSubscript: "Assignment1"
      }
    }
  },
  {
    pyFromTaskName: "Assignment1",
    pyToTasks: {
      "End1": {
        pyID: "Transition2",
        pyTaskStatusOrWhen: "STATUS",
        pyTaskStatus: "Complete",
        pyLikelihood: "100",
        pxSubscript: "End1"
      }
    }
  }
]
```

### `pyToTasks` entry fields

| Field | Description |
|-------|-------------|
| `pyID` | Connector ID — must match a key in `pyModelProcess.pyConnectors` |
| `pyTaskStatusOrWhen` | `ALWAYS` / `STATUS` / `WHEN` / `ELSE` |
| `pyTaskStatus` | FlowAction name on `STATUS` rows. Usually empty on `ALWAYS`, `WHEN`, and `ELSE` rows. |
| `pyTaskWhen` | Mirrors `pyTaskStatus` on `STATUS` and `ELSE` rows (same value — so also empty when the ELSE target is an End shape). When-rule name on `WHEN` rows. Empty on `ALWAYS` rows. |
| `pyLikelihood` | Routing probability. `"100"` on ALWAYS branches. STATUS and WHEN branches vary (e.g., `"100"`, `"50"`, `"30"`). ELSE branches typically use `"0"` or `"0.0"`. Preserve the server's value on update. |
| `pxSubscript` | Destination shape name (= object key) |
| `pyHistoryText` | Usually `""` but can contain status labels or expressions on STATUS/WHEN/ELSE branches (e.g., `"Duplicate Cases Found"`). Preserve the server's value on update. |
| `pyPropertySet` | Single empty-row placeholder: `[{ "pxObjClass": "Embed-ModelParams", "pyPropertiesName": "", "pyPropertiesValue": "" }]`. Present on every row, even when no property-sets are configured. |

## Consistency Rules

| Action | Updates required |
|--------|-----------------|
| Add a shape | • Add to `pyModelProcess.pyShapes`<br>• Add a `pyFromTasks` entry if it has outgoing connectors<br>• Add to `pyEndingActivities` if it is an End shape |
| Remove a shape | • Remove from `pyModelProcess.pyShapes`<br>• Remove its entry from `pyFromTasks`<br>• Remove any `pyConnectors` referencing it<br>• Remove `pyToTasks` entries pointing to it from other shapes<br>• Remove from `pyEndingActivities` if present |
| Add a connector | • Add to `pyModelProcess.pyConnectors`<br>• Add a `pyToTasks` entry under the source shape in `pyFromTasks`<br>• Set `pyFromClass` on the connector to the source shape's `pxObjClass` |
| Change a connector's Flow Action | • Update `pyExpression` on the connector<br>• Update `pyTaskStatus` on the matching `pyToTasks` entry |
| Change a shape's routing activity | • Update `pyImplementation` on the shape in `pyShapes` |

> **Always set `pyFromClass` on every connector.** `pyFromClass` must equal the
> source shape's `pxObjClass` (e.g., `Data-MO-Event-Start`,
> `Data-MO-Activity-Assignment`, `Data-MO-Gateway-Decision`). Omitting it causes
> the connector to render incorrectly in Process Modeler even though runtime may
> still work.

> **Two coordinate systems coexist in one flow.** Server-authored flows use
> **two different coordinate encodings** for different placement contexts;
> preserve whichever format the server wrote verbatim on recreation:
>
> | Where | Fields | Units | Typical range |
> |---|---|---|---|
> | Shape placement | `pyShapes[i].pyCoordX`, `pyCoordY`, `pyWidth`, `pyHeight` | **float-string inches** (Visio-style) | `"0.0"` – `"10.0"` (e.g. End shapes `0.48 × 0.48`, Decision/SplitJoin `0.96 × 0.48`) |
> | Connector waypoints | `pyConnectors[i].pyConnectorPoints[N].pyPointX`, `pyPointY` | **integer-string pixels** | hundreds (e.g. `"540"`, `"360"`) |
>
> Do not normalize between the two systems. Some older (2013-era) flows
> additionally use a bare-numeric `pyConnectorPoints` encoding (e.g.
> `[100, 200, 300]`) — see `references/connectors.md` waypoint-formatting note
> and preserve that variant verbatim where present.

### Fresh-authoring guidance for Shape placement

> If you invent coordinates
> (no server payload to copy), keep shape coordinates in the `0.0–10.0`
> fractional-inch range (e.g. Start at `"0.24"`/`"0.24"`, next shape at
> `"1.2"`/`"0.24"`, End at `"2.64"`/`"0.24"`; widths `"0.48"` for Start /
> End, `"0.96"` for Utility / Assignment / Decision / SubProcess /
> Spinoff; heights `"0.48"`).

### Fresh-authoring guidance for Connector waypoints

> Omit `pyConnectorPoints` when creating flows — the server auto-routes
> connectors. When updating existing flows, preserve any `pyConnectorPoints`
> the server wrote.

## Minimum Valid Canvas

The server rejects flows without a Start shape connected to something else. The
smallest accepted canvas is Start → End:

```json
{
  "pyEndingActivities": ["End1"],
  "pyFromTasks": [
    {
      "pyFromTaskName": "Start1",
      "pyToTasks": {
        "End1": {
          "pyID": "Transition1",
          "pyTaskStatusOrWhen": "ALWAYS",
          "pyLikelihood": "100",
          "pxSubscript": "End1"
        }
      }
    }
  ],
  "pyModelProcess": {
    "pyShapes": {
      "Start1": { "pxObjClass": "Data-MO-Event-Start", "pyMOId": "Start1", "pyFromMODefName": "Start", "pyCoordX": "0.24", "pyCoordY": "0.24", "pyWidth": "0.48", "pyHeight": "0.48" },
      "End1":   { "pxObjClass": "Data-MO-Event-End",   "pyMOId": "End1",   "pyFromMODefName": "End",   "pyCoordX": "2.64", "pyCoordY": "0.24", "pyWidth": "0.48", "pyHeight": "0.48" }
    },
    "pyConnectors": {
      "Transition1": { "pyFrom": "Start1", "pyFromClass": "Data-MO-Event-Start", "pyTo": "End1", "pyConditionType": "Always", "pyLikelihood": "100" }
    }
  }
}
```

See `examples/stub.md` for the full payload.

## Deep-Merge Update Workflow

`update-rule` deep-merges the fetched flow JSON. Always mirror the structure returned
by `get-rule(detail="full")` for the specific flow you are editing.

### Merge rules

- **Maps / PageGroups** merge recursively — you can target one nested shape or one
  nested field without disturbing sibling keys.
- **Lists** default to `listUpdateMode="patch"` — every list reached during the
  updated subtree merges positionally by index. Omitted trailing base elements are
  preserved. Extra update elements are appended. Use `{}` as a no-op placeholder only
  for map-backed elements.
- **`listUpdateMode="replace"`** wholesale-replaces every list reached during the
  updated subtree. Use it when you are sending the complete desired list state or need
  deletions / reordering.
- **`listUpdateModeOverrides`** mixes modes for exact list field paths. Use it when an
  outer list should stay patch but a nested list should replace.

### Flow-specific guidance

- Sparse updates are safe for `pyModelProcess`, `pyShapes`, single shape maps,
  `pyCallParams`, `pzRuleParamsHolder`, and other map-backed fields.
- Sparse positional patches are also safe for list-backed fields such as
  `pyFromTasks`, `pyEndingActivities`, `pyUseCaseLinks`,
  `pyModelProcess.pyShapes`, and `pyModelProcess.pyConnectors` when the fetched flow
  serializes them as arrays. Use `{}` placeholders to skip untouched rows.
- Nested waypoint-style lists often need exact-path replacement. Example: keep
  `pyModelProcess.pyConnectors` in patch mode but replace each touched connector's
  `pyWaypoints` with
  `listUpdateModeOverrides={"pyModelProcess.pyConnectors.pyWaypoints":"replace"}`.

### Example — change one shape's implementation

```json
{
  "pyModelProcess": {
    "pyShapes": {
      "Utility1": {
        "pyImplementation": "pzRunDataTransform",
        "pyCallParams": { "DataTransformName": "NewDataTransform" },
        "pzRuleParamsHolder": { "pxObjClass": "MyOrg-MyApp-Work-MyCase" }
      }
    }
  }
}
```

Deep merge preserves all other shapes, connectors, and unmentioned fields on `Utility1`.

### Dot-notation paths in `updates` are not supported

Do NOT send dot-separated keys:

```json
// WRONG — server rejects this
{ "pyModelProcess.pyShapes.Utility1.pyImplementation": "pzRunDataTransform" }
```

Use nested JSON objects instead.

The only supported dot notation in `update-rule` is `listUpdateModeOverrides`, where
keys are exact list field paths such as
`pyModelProcess.pyConnectors.pyWaypoints`. Override paths use field names only,
never indices.

## REST API Read Behavior

The REST API returns only a stub for `pyModelProcess` on read:

```json
{ "pyModelProcess": { "pxObjClass": "Embed-Rule-Obj-Flow-ProcessModel", "pyRefreshViewHint": true } }
```

To inspect a flow's shapes and transitions through the API, read `pyFromTasks` —
it lists every shape by name and every outgoing connector's ID, condition, and target.
The full `pyModelProcess` is available via XML export but not via REST.


## See Also


- Top-level reference and link rows (`pyUseCaseLinks`, `pyCoveredBy`, `pyTaskInfo`, `pxDataReferences`) — `references/top-level-rollups.md`.
- Connector boilerplate, constraint-point asymmetry, and authoring-order IDs — `references/connectors.md`.
