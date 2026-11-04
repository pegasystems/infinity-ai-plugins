# Infinity Authoring Plugins

This folder contains the plugin source trees for the Infinity Authoring surfaces built around `infinity-rules-mcp`.

It includes plugins for the following clients:

- `claude/`
- `copilot/`
- `codex/`
- `devin/`
- `opencode/`

## Claude, Copilot, Codex, and Devin

The source trees are directly installable from this repository.

Each plugin's `.mcp.json` starts the pinned npm package `@pega/infinity-authoring-plugin` with `npx`. On
first start the package downloads the MCP server JAR and the skills from a GitHub release, verifies their
SHA-256 hashes, and caches them in `~/.infinity-rules-mcp/`. The runtime selects the skills version using
`pega_infinity_version` from `~/.infinity-rules-mcp/config.json`.

Node.js 22.14 or later and Java 17 or later are required.

For Devin, install the `devin/` plugin with `devin plugins install`; see the
[Devin README](devin/README.md).

## OpenCode

The opencode plugin requires manual MCP and skill setup. It downloads the MCP server JAR and skills from the GitHub releases page; see its README.
