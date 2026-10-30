# Pega Infinity Authoring for Devin CLI

To set up Pega Infinity Authoring for Devin, configure the MCP server and install the skills manually. Devin uses the MCP server JAR and skills downloaded from the release page of this repository.

## Prerequisites

- Install Java 17 or later and make it available as `java` in the environment where Devin runs the MCP server.
- Clone this repository, or just copy the two skill folders from it (step 3).
- Configure the target Pega Infinity environment URL and version.

## Download the MCP server and skills

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

## 1. Add the MCP server

Add the following server to Devin's MCP metadata file. Use a project-level `.devin/mcp_config.json` to share non-sensitive configuration with a project, or a user-level file to make the server available to all projects:

- macOS and Linux: `~/.config/devin/mcp_config.json`
- Windows: `%APPDATA%\devin\mcp_config.json` (open the Run dialog box with Windows + R and enter `%appdata%`)
  - If `devin` directory does not exist already, please create a new directory

Use absolute paths to the files you downloaded and replace the placeholder values:

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/.infinity-rules-mcp/manual/infinity-rules-mcp-<version>.jar",
        "--spring.profiles.active=stdio"
      ],
      "env": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/.infinity-rules-mcp/manual/skills"
      }
    }
  }
}
```

`PEGA_SKILLS_PATH` must point to the extracted `skills` directory that contains `24-2`, `25-1`, and `26-1`, not to a version-specific subdirectory. The MCP run time uses the configured Infinity version to select the skills.

## 2. Configure the Pega connection

Create or update the MCP run-time configuration file:

- macOS and Linux: `~/.infinity-rules-mcp/config.json`
- Windows: `%USERPROFILE%\.infinity-rules-mcp\config.json`

```json
{
  "pega_base_url": "https://your-pega-environment.example.com",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Set `pega_infinity_version` to the directory name that matches the target environment:

- Pega Infinity 24.2: `24-2`
- Pega Infinity 25.1: `25-1`
- Pega Infinity 26.1: `26-1`

At run time, the MCP reads the Pega connection settings from this file. Set `pega_base_url` to the Pega environment root URL only; do not include `/prweb` or another path segment. Use a different `pega_oauth_client_id` only when the Pega environment requires a custom client ID.

## 3. Install the Devin skills

Copy the shared Pega setup and assistant skills into a Devin skill discovery path. For a project, use `.devin/skills/`. To make the skills available globally, use `~/.config/devin/skills/` on macOS or Linux, or `%APPDATA%\devin\skills\` on Windows. If the `skills` directory does not already exist, create it.

From the repository root, copy the following directories:

```text
plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-setup
plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-assistant
```

For example, for project-level skills on macOS or Linux:

```bash
mkdir -p .devin/skills
cp -r plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-setup .devin/skills/
cp -r plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-assistant .devin/skills/
```

The MCP server exposes version-specific Pega authoring skills through its `list-skills` and `get-skill` tools. The copied Devin skills guide initial configuration and general Pega assistance.

## 4. Verify the setup

Start a new Devin session after changing MCP metadata or skills. Confirm that the `pega-infinity-authoring` MCP server is enabled, then ask Devin to use the `pega-setup` skill. Verify the local run time and remote Pega connection separately:

1. Use `list-skills` to confirm the Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Devin can connect to the configured Pega environment.

If the server does not start, run `java -version` to confirm that Java 17 or later is available. Confirm that the JAR path exists and that `PEGA_SKILLS_PATH` points to the extracted `skills` directory.

## Updating

Download the newer JAR and skills ZIP from the latest release, extract the skills again, point the MCP `args` and `PEGA_SKILLS_PATH` at the new files, and start a new Devin session. Run `git pull` and copy the two shared skill directories again if they changed.

For Devin MCP metadata locations and configuration details, see the [Devin MCP configuration documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration.md). For Devin skill discovery paths, see the [Devin Skills documentation](https://docs.devin.ai/product-guides/skills.md).