---
name: legacy-shape-ids
description: "Load when updating or recreating a pre-2020 imported flow that uses semantic shape IDs like FLOWEND, Fork592, or UTILITY12 instead of modern auto-generated IDs."
---

## Legacy semantic-name shape-ID convention

Pre-2020 imported flows (Pega-ProCom-era, 2013-imported ScreenFlow flows
in particular — e.g. `CustomerFeedback` in `PegaSample-CustomerRequest`)
use **semantic names** as `pxSubscript` / `pyMOId` shape IDs rather than
the modern auto-generated `Start62` / `AssignmentSF1..N` / `Decision1` /
`End1` pattern. The `pyShapes` map keys, all `pxSubscript` / `pyMOId`
values, and all `pyFromTasks` keys match the semantic IDs.

| Shape kind | Modern auto-ID | Legacy semantic-ID convention |
|---|---|---|
| Start (FlowStandard) | `Start1` | `STARTFLOW` |
| Start (ScreenFlow) | `Start62` | `STARTFLOW` |
| End | `End1` / `End2` | `FLOWEND` (single end) or `END52` / `END66` (multi-end variants) |
| Assignment / AssignmentSF | `Assignment1` / `AssignmentSF1..N` | the **flow-action name** the assignment exposes (e.g. `VerifyCompletion`, `ProvideReasons`, `Suggestions`). Disambiguation suffix only on collisions — e.g. when an assignment's display label `UpdateSatisfaction` differs from its flow-action name `PickSatisfaction`, the shape ID is the **display-label** form (`UpdateSatisfaction`). |
| Decision (DataXOR fork) | `Decision1` | `Fork<3-digit-N>` (e.g. `Fork592`) — the 3-digit suffix is server-assigned at import |
| Utility | `Utility1` | `UTILITY<N>` (e.g. `UTILITY12`) |
| SubProcess | `SubProcess1` | `SUBPROCESS<N>` |

**Triggers indicating legacy semantic-name provenance:**
- Non-contiguous `Transition<N>` connector IDs (e.g. `Transition4..Transition10`,
  no `Transition1/2/3`) — strong signal of import history.
- `pyRuleSet` is `Pega-ProCom`, `Pega-ProcessEngine`, or another shipped /
  legacy ruleset.
- Flow self-registers (`pyFlowType == pyRuleName`).
- Spec describes shapes by their semantic / display names rather than
  generic class+index identifiers.

When any of these triggers apply, choose semantic-name shape IDs and
preserve them verbatim on update. The semantic-name pattern is **not** a
rename target on modern fresh authoring — for new flows from scratch use
the modern `Start1` / `AssignmentSF1` / `Decision1` / `End1` IDs.
