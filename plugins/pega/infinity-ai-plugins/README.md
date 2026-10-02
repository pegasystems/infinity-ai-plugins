# Pega Infinity Authoring Plugins

This folder contains the plugin source trees for the Pega Infinity Authoring surfaces built around `infinity-rules-mcp`.

It includes plugins for the following clients:

- `claude/`
- `copilot/`
- `codex/`
- `devin/`
- `opencode/`

## Claude, Copilot, and Codex

The checked-in source trees are directly installable from this repository.

Each of these clients launches `resources/infinity-rules-mcp.jar` directly with `java -jar` and
points `PEGA_SKILLS_PATH` at the plugin `resources` directory. The runtime selects the version
under that directory using `pega_infinity_version` from `~/.infinity-rules-mcp/config.json`.

Each `resources/` directory contains `24-2/`, `25-1/`, and `26-1/`. Each version directory
contains its own `manifest.json`, `library/`, and `skills/` payload.

Each plugin directory is self-contained and does not rely on wrapper scripts or runtime extraction.

There is no bootstrap download step, lock file, or separate artifact hosting location.

## Devin

The Devin plugin contains only metadata and skills, so it stays well within Devin's plugin size
limit. Its MCP server runs `npx -y @pega/infinity-rules-mcp@<version>`. The
[`@pega/infinity-rules-mcp`](../../../packages/infinity-rules-mcp/README.md) npm package contains the
same runtime JAR and `resources/` payload, plus a dependency-free Node launcher that finds Java 17+
and starts the JAR. The package version is pinned exactly and always equals the Devin plugin
version.

## OpenCode

The OpenCode plugin requires manual MCP and skill setup. It reuses the bundled runtime and skills from the `claude/` plugin directory.
