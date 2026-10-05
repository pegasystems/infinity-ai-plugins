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

Each supported client launches `resources/infinity-rules-mcp.jar` directly with `java -jar` and
points `PEGA_SKILLS_PATH` at the plugin `resources` directory. The runtime selects the version
under that directory using `pega_infinity_version` from `~/.infinity-rules-mcp/config.json`.

Each `resources/` directory contains `24-2/`, `25-1/`, and `26-1/`. Each version directory
contains its own `manifest.json`, `library/`, and `skills/` payload.

Each plugin directory is self-contained and does not rely on wrapper scripts or runtime extraction.

There is no bootstrap download step, lock file, or separate artifact hosting location.

## Devin and OpenCode

Devin and OpenCode plugins require manual MCP and skill setup. Both clients reuse the bundled runtime and skills from the `claude/` plugin directory.