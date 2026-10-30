# Pega Infinity Authoring GitHub Copilot Plugin

This directory contains the source for the GitHub Copilot CLI variant of the Pega Infinity Authoring plugin.

The plugin contains:

- Copilot-facing setup and authoring skills
- an MCP server entry that starts the npm launcher `@pega/infinity-authoring-plugin` at the version pinned in `.mcp.json`

On first start the launcher downloads the MCP server JAR and the Pega skills from a GitHub release, checks them
against pinned SHA-256 hashes, and caches them in `~/.infinity-rules-mcp/`. It needs Node.js 22.14 or later,
Java 17 or later, and access to npm and GitHub on the first run.

Set `pega_infinity_version` to `26-1` in `~/.infinity-rules-mcp/config.json` for a Pega Infinity 26.1
environment. It selects the matching skills version.
