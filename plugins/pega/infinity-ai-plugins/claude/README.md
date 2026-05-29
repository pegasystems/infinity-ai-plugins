# Pega Infinity Authoring Claude Code Plugin

This directory contains the source template for the Claude Code plugin variant of Pega Infinity Authoring.

The final packaged plugin is expected to bundle:

- the pinned `infinity-rules-mcp` runtime JAR
- the pinned `infinity-skills` payload
- Claude-facing skills and configuration

This source tree is not the final packaged artifact.

For direct installs from the repository, Claude Code launches the checked-in bootstrap and downloads the pinned runtime inputs on first start.
