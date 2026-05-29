# Pega Infinity Rules MCP Plugins

This directory contains the plugin source trees for the Pega Infinity Authoring surfaces built around `infinity-rules-mcp`.

Pinned external inputs live here:

- `artifacts.lock.json`

Client-specific plugin source trees live under:

- `claude/`
- `copilot/`
- `codex/`
- `opencode/`
- `vscode-extension/`

The checked-in source trees are packaging inputs rather than final packaged plugin artifacts.

Each supported client tree also carries a checked-in `bootstrap/` directory. On raw marketplace installs from this repository, the client launches `bootstrap/Bootstrap.java`, which downloads and verifies the pinned runtime and skills inputs on first use.

Downloaded bootstrap payloads are cached outside the plugin directory under the user's cache location. When a newly pinned runtime or skills version is downloaded successfully, the bootstrap installs that version into a new cache directory and leaves older cached payload versions in place. Failed or interrupted installs may also leave retry directories behind, which are ignored unless they contain a complete usable payload.

There is no repository-level uninstall hook for Claude Code, GitHub Copilot CLI, or Codex in this source tree. If a client does not remove cached bootstrap payloads automatically on plugin uninstall, remove the `pega-agent-plugins/infinity-rules-mcp` cache directory manually from the platform cache root.

Packaged plugin zips continue to embed the runtime JAR and extracted skills payload so they can start without a network fetch.
