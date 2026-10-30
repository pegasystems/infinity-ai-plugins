# Pega Infinity Authoring OpenCode Plugin

This directory contains the source template for the Pega Infinity Authoring plugin for OpenCode.

The OpenCode plugin uses the MCP server JAR and the run-time skills downloaded from the
[GitHub releases](https://github.com/pegasystems/infinity-ai-plugins/releases) of this repository. This directory
contains only OpenCode-specific skills and MCP wiring.

This source tree is not the final packaged artifact.

## Setup

OpenCode does not have a plugin marketplace yet. Configure the MCP server manually by merging
the `opencode.json` snippet from this directory into your project's `opencode.json` or the
global `~/.config/opencode/opencode.json`.

### 1. Download the MCP server and skills

The MCP server JAR and the Pega skills are published as assets of the
[GitHub releases](https://github.com/pegasystems/infinity-ai-plugins/releases) of this repository. Use the
newest release that lists `infinity-rules-mcp-<version>.jar` and `infinity-skills-<version>.zip`. Each file
has a `.sha256` file next to it.

For example, on macOS or Linux (replace the tag and versions with the release you chose):

```bash
TAG=release-0.2.1; MCP=0.7.11; SKILLS=0.1.14
BASE=https://github.com/pegasystems/infinity-ai-plugins/releases/download/$TAG
mkdir -p ~/.infinity-rules-mcp/manual/skills && cd ~/.infinity-rules-mcp/manual
for f in infinity-rules-mcp-$MCP.jar infinity-skills-$SKILLS.zip; do
  curl -fLO $BASE/$f && curl -fLO $BASE/$f.sha256 && shasum -a 256 -c $f.sha256
done
unzip -oq infinity-skills-$SKILLS.zip -d skills
```

On Windows, download the two files from the release page and extract the ZIP into a `skills` folder next to the JAR.
After extracting, `skills/` must directly contain the Pega version folders (`24-2`, `25-1`, `26-1`).

### 2. Add the MCP server

Copy the `mcp` block from `opencode.json` into your OpenCode config. Replace the JAR path and
`PEGA_SKILLS_PATH` with the absolute paths of the files you downloaded:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "pega-infinity-authoring": {
      "type": "local",
      "command": [
        "java",
        "-jar",
        "/absolute/path/to/.infinity-rules-mcp/manual/infinity-rules-mcp-<version>.jar",
        "--spring.profiles.active=stdio"
      ],
      "environment": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/.infinity-rules-mcp/manual/skills",
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

### 3. Install skills

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

### 4. Restart OpenCode

Restart OpenCode to load the MCP server and skills.

### 5. Verify and configure

Start a new session and ask the assistant to run `pega-setup`. The skill guides you through
verifying the connection and completing configuration.

## Prerequisites

- Install Java 17 or later and add `java` to the PATH.
