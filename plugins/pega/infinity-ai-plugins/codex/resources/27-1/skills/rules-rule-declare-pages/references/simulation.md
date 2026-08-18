---
name: rules-rule-declare-pages/references/simulation
description: Load when authoring or reviewing simulated data pages that replace a real source with canned data while preserving the original source in pyDisabledSource.
---

# Simulated Data Pages

- Use this reference for simulated data pages that temporarily replace a live connector or other source with canned data.
- Preserve `pyDisabledSource`, `pyDataSourceHolder`, `pyDescription`, and `pyDSSystemName` exactly when updating an existing simulated data page.
- Do not hand-author simulated data pages unless the user explicitly asks for that pattern; prefer App Studio simulation support when available.

## Key checks

| Check | Why it matters |
|-------|----------------|
| `pyIsSimulated: "true"` | Authoritative simulation flag |
| `pyDisabledSource` preserved verbatim | Needed to reverse the simulation later |
| Replacement source uses `DataTransform` | Typical simulation pattern for canned data |
| Production source is not deleted | Simulation should be reversible |
