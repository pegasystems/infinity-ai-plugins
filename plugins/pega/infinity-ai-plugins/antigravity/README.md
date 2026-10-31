# Pega Infinity Authoring Google Antigravity Plugin

This directory contains the source for the Google Antigravity (`agy`, Antigravity App, and Antigravity IDE) variant of the Pega Infinity Authoring plugin.

The plugin bundles:

- An MCP server configuration (`mcp_config.json`) that launches `@pega/infinity-authoring-plugin@0.2.1` via `npx`
- Antigravity skills (`pega-setup` and `pega-assistant`) with progressive-disclosure reference guides and a cross-platform Node.js setup/diagnostics helper (`skills/pega-setup/scripts/pega-doctor.mjs`)
- Always-on governance rules (`rules/AGENTS.md`) and a `PreToolUse` lifecycle hook (`hooks.json` -> `scripts/pega-guard.mjs`) that prevent credential exposure in transcripts and require human confirmation before finalizing `ChangeRequest` reviews or deleting rules
- Opt-in specialized agents (`pega-explorer` and `pega-author`)

On first start, `@pega/infinity-authoring-plugin` downloads the MCP server JAR and Pega runtime skills (`~40 MB`) from a GitHub release, verifies their SHA-256 digests, and caches them in `~/.infinity-rules-mcp/`. Node.js 22.14 or later, Java 17 or later, and network access to npm and GitHub on first run are required.

## Installation

Clone this repository and install the Antigravity plugin directory (when updating an existing installation, close active Antigravity sessions first so open plugin file handles are released on Windows):

```bash
git clone https://github.com/pegasystems/infinity-ai-plugins.git
agy plugin install ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity
```

To pre-download the MCP server JAR and runtime skills ahead of first launch:

```bash
node ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity/skills/pega-setup/scripts/pega-doctor.mjs prefetch
```

## Configuration

Start a new Antigravity session and run `/pega-setup` (or ask the agent to run `pega-setup`), or configure `~/.infinity-rules-mcp/config.json` (`%USERPROFILE%\.infinity-rules-mcp\config.json` on Windows) directly via the helper CLI:

```bash
node ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity/skills/pega-setup/scripts/pega-doctor.mjs configure --url "https://example.pega.net" --version "26-1"
```

Replace `https://example.pega.net` with your Pega environment root URL only (do not include `/prweb` or trailing path segments). Supported `pega_infinity_version` values are `24-2`, `25-1`, and `26-1`.

Run the presence-only environment check anytime without printing configuration values:

```bash
node ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity/skills/pega-setup/scripts/pega-doctor.mjs check
```

## Validation

From the repository root (or this plugin directory), validate the manifest, components, and security hooks:

```bash
agy plugin validate --strict ./plugins/pega/infinity-ai-plugins/antigravity
node --test ./plugins/pega/infinity-ai-plugins/antigravity/tests/plugin.test.mjs
```
