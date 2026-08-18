# Pega Infinity Authoring Codex Plugin

This directory contains the source template for the Codex plugin variant of Pega Infinity Authoring.

The final packaged plugin is expected to bundle:

- the pinned `infinity-rules-mcp` runtime JAR
- the pinned `infinity-skills` payloads for versions `24-2`, `25-1`, `26-1`, and `27-1`
- Codex-facing skills and launcher wiring

The plugin supplies its bundled skills directory automatically. Set `pega_infinity_version` to
`26-1` in `~/.infinity-rules-mcp/config.json` for a Pega Infinity 26.1 environment; it selects the
bundled `resources/26-1/` directory.
