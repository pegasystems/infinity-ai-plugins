# Pega Infinity Authoring opencode Plugin

This directory contains the source template for the opencode plugin variant of Pega Infinity Authoring.

The opencode plugin reuses the `claude/` plugin directory for the bundled MCP server JAR and
runtime skills payload. Only opencode-specific skills and MCP wiring are kept here.

This source tree is not the final packaged artifact.

## Setup

opencode does not have a plugin marketplace yet. Configure the MCP server manually by merging
the `opencode.json` snippet from this directory into your project's `opencode.json` or the
global `~/.config/opencode/opencode.json`.

### 1. Add the MCP server

Copy the `mcp` block from `opencode.json` into your opencode config and set `cwd` to the
absolute path of the `claude/` sibling directory, which contains the bundled JAR and runtime
skills:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "pega-infinity-authoring": {
      "type": "local",
      "command": [
        "java",
        "-jar",
        "./resources/infinity-rules-mcp.jar",
        "--spring.profiles.active=stdio"
      ],
      "cwd": "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/claude",
      "environment": {
        "PEGA_SKILLS_PATH": "./resources/pega-skills",
        "PEGA_CLIENT_MODE": "opencode-plugin",
        "PEGA_BASE_URL": "https://your-pega-environment.example.com"
      },
      "enabled": true
    }
  }
}
```

Set `PEGA_BASE_URL` to the environment root URL only. Do not include `/prweb` or any other
path segment.

### 2. Install skills

Copy the skills from `skills/` into `.opencode/skills/` in your project, or into
`~/.config/opencode/skills/` to make them available globally:

```bash
# Project-level
cp -r skills/pega-assistant .opencode/skills/
cp -r skills/pega-setup .opencode/skills/

# Or globally
cp -r skills/pega-assistant ~/.config/opencode/skills/
cp -r skills/pega-setup ~/.config/opencode/skills/
```

### 3. Restart opencode

Restart opencode for the MCP server and skills to take effect.

### 4. Verify and configure

Start a new session and ask the assistant to run `pega-setup`. The skill guides you through
verifying the connection and completing configuration.

## Prerequisites

- Java 17 or later must be installed and `java` must be on the PATH.

## Local Skills Override

To test local `infinity-skills`, set `PEGA_LOCAL_SKILLS_PATH` in the `environment` block of
your opencode MCP config:

```json
"environment": {
  "PEGA_SKILLS_PATH": "./resources/pega-skills",
  "PEGA_CLIENT_MODE": "opencode-plugin",
  "PEGA_BASE_URL": "https://your-pega-environment.example.com",
  "PEGA_LOCAL_SKILLS_PATH": "/path/to/infinity-skills"
}
```

Point `PEGA_LOCAL_SKILLS_PATH` at the directory that contains `manifest.json`. The `cwd` for
the MCP server is the `claude/` directory, so all relative paths resolve from there.
