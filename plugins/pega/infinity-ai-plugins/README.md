# Pega Infinity Authoring Plugins

This folder contains the plugin source trees for the Pega Infinity Authoring surfaces built around `infinity-rules-mcp`.

It includes the Claude Code plugin in `claude/`.

## Claude Code

The checked-in source trees are directly installable from this repository.

The plugin launches `resources/infinity-rules-mcp.jar` directly with `java -jar` and
points `PEGA_SKILLS_PATH` at the plugin `resources` directory. The runtime selects the version
under that directory using `pega_infinity_version` from `~/.infinity-rules-mcp/config.json`.

Each `resources/` directory contains `24-2/`, `25-1/`, and `26-1/`. Each version directory
contains its own `manifest.json`, `library/`, and `skills/` payload.

Each plugin directory is self-contained and does not rely on wrapper scripts or runtime extraction.

There is no bootstrap download step, lock file, or separate artifact hosting location.
