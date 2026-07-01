# Pega Infinity Rules MCP Plugins

This directory contains the plugin source trees for the Pega Infinity Authoring surfaces built around `infinity-rules-mcp`.

Client-specific plugin source trees live under:

- `claude/`
- `copilot/`
- `codex/`

The checked-in source trees are directly installable from this repository.

Each supported client launches `resources/infinity-rules-mcp.jar` directly with `java -jar` and points `PEGA_SKILLS_PATH` at `resources/pega-skills` inside the installed plugin directory.

Each plugin directory is self-contained and does not rely on wrapper scripts or runtime extraction.

There is no bootstrap download step, lock file, or separate artifact hosting location.
