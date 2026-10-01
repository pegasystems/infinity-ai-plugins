---
name: json-dt-empty-fields-after-successful-call
description: Resolve "Data Page connector call succeeded but all mapped properties are empty" — diagnose and fix a hybrid JSON/Clipboard Rule-Obj-Model that combines the bridge and mapper roles into one malformed rule instead of the required two-rule pattern.
---

# Troubleshooting: "Connector call succeeded (confirmed in the external system) but every Data Page property came back empty"

## Symptom

A Data Page with a Connector-type source calls an external API. The call is confirmed
successful independently — the external system's own dashboard/logs show the request
arrived and (for a create/POST) a real record was created. No error is thrown, and
`pxDataPageHasErrors` is not set. But every clipboard property the Data Page was
supposed to populate from the response comes back empty/blank.

This is caused by a single malformed `Rule-Obj-Model` that a human built directly in
Dev Studio, trying to make one JSON-format rule serve as **both** the Clipboard bridge
and the JSON mapper. Dev Studio's rule form does **not** block this invalid
combination — a human using the UI directly produced exactly this shape. Do not
assume a Dev-Studio-authored or Blueprint-generated response DT is well-formed just
because it saved without error.

## Diagnostic checklist (in order)

1. **`get-rule` the EXACT response DT wired as `pyResDataTransform` on the Data Page
   source.** Read the Data Page's `pyDataSourceList` entry first to get the real rule
   name — do not assume based on a similarly-named or conceptually-related rule
   elsewhere in the app. Fetch that exact rule with `detail='full'`.
2. **Check `pyDataModelFormat` against `pyParameters` shape.**
   - If `pyDataModelFormat: "JSON"`, the rule's mapping engine (`pyMappingModel`) only
     ever binds to a `jsonData` parameter of type `STRING` containing raw JSON text —
     it has no mechanism to read from a `PAGE` reference.
   - **Red flag:** a JSON-format rule whose declared parameter is named `DataSource`
     with type `PAGE` (that shape belongs on the *Clipboard* bridge DT, not the JSON
     DT — see `rules-rule-obj-model` → `JSON Response Bridge DT (Clipboard Wrapper)`
     example). If you find this, the rule is the hybrid anti-pattern described below.
3. **Check the `executionMode` value actually being passed**, wherever it is set (the
   DT's own parameter default, or a Data Page source's DT-parameter override). For a
   response/deserialization DT, this must resolve to `"DESERIALIZE"` at call time.
   `"SERIALIZE"` is the wrong direction — it builds an outgoing JSON string from
   clipboard, not parse an incoming one, and combined with a missing/wrong `jsonData`
   input it silently produces no field mappings.

## Root cause (confirmed)

Two independent, compounding defects were found on the actual malformed rule:

1. **Wrong parameter shape** — declared `DataSource` (`PAGE`) instead of the mandatory
   `jsonData` (`STRING`), so the mapping engine had no JSON text to parse.
2. **Wrong execution direction** — the Data Page source's DT-parameter override for
   this response DT had `executionMode: "SERIALIZE"` instead of `"DESERIALIZE"`.

**Fixing only #2 does not resolve the symptom.** Both must be corrected — a JSON DT with
the right `executionMode` but no `jsonData` string still has nothing to deserialize, and
a JSON DT with a `jsonData` parameter but the wrong `executionMode` runs in the wrong
direction. Confirm both are fixed before re-testing.

## Resolution

Do not attempt to patch parameters onto the single hybrid rule in place. The confirmed
working fix is to split it into the standard two-rule bridge pattern:

- A **Clipboard-format** DT (parameter `DataSource`, type `PAGE`) whose only job is an
  `APPLY_MODEL` step calling a separate JSON-format DT, passing
  `jsonData: DataSource.pyResponseData` and `executionMode: "DESERIALIZE"` explicitly,
  with `pyPassCurrentParameterPage: "false"` on that `APPLY_MODEL` step.
- A **JSON-format** DT (parameters `jsonData` STRING + `executionMode` STRING) whose
  `pyMappingModel` contains the real field mappings (SET actions from JSON response
  keys to clipboard properties).

See `rules-rule-obj-model` → `JSON Response Bridge DT (Clipboard Wrapper)` example for
the exact proven shape of the Clipboard half.

The Data Page source's `pyResDataTransform` must point at the **Clipboard bridge DT**,
never directly at the JSON DT — this is already covered in `model-json-data-transforms`'
bridge-pattern section; do not restate it, just verify the wiring points at the correct
rule after the split.
