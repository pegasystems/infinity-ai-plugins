# Pega Infinity Authoring Claude Code Plugin

This directory contains the source template for the Claude Code variant of Pega Infinity Authoring plugin.

The final packaged plugin bundles:

- the pinned `infinity-rules-mcp` run-time JAR
- the pinned `infinity-skills` payloads for versions `24-2`, `25-1`, and `26-1`
- Claude-facing skills and configuration

The plugin supplies its bundled skills directory automatically. Set `pega_infinity_version` to
`26-1` in `~/.infinity-rules-mcp/config.json` for a Pega Infinity 26.1 environment; it selects the
bundled `resources/26-1/` directory.
