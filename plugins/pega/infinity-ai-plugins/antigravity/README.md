# Infinity Authoring for Google Antigravity

The Google Antigravity plugin bundles the `pega-infinity-authoring` MCP server and the
`pega-setup` / `pega-assistant` skills for the Antigravity App, Antigravity CLI (`agy`), and
Antigravity IDE.

You can install it as a **plugin** (requires Node.js 22.14+ and Java 17+) or configure it
**manually without Node.js** (requires Java 17+ only).

## Option 1: Install as a plugin (Node.js 22.14+ and Java 17+)

The plugin starts the MCP server with `npx`; on first use the launcher downloads the server JAR
and skills from this repository's [GitHub releases](https://github.com/pegasystems/infinity-ai-plugins/releases),
verifies their SHA-256 hashes, and caches them in `~/.infinity-rules-mcp/`.

### Prerequisites

- Node.js 22.14 or later and Java 17 or later on the machine running Antigravity.
- Access to npm and GitHub on first use, and to your Pega Infinity environment.

### Install the plugin

Clone this repository and install the plugin directory with the Antigravity CLI (`agy`):

```bash
git clone https://github.com/pegasystems/infinity-ai-plugins.git
agy plugin install ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity
```

Alternatively, inside an interactive `agy` session, run:

```text
/plugin install ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity
```

Plugins installed via the CLI are staged in `~/.gemini/config/plugins/infinity-authoring/` and
automatically synchronize with the Antigravity App and Antigravity IDE. To scope the plugin to a
single workspace instead, copy the `antigravity` directory into
`<workspace>/.agents/plugins/infinity-authoring/`.

The skills are then available as `/pega-setup` and `/pega-assistant`.

If the client times out on the first start, download the runtime ahead of time:

```bash
npx -y --package=@pega/infinity-authoring-plugin@0.2.2 infinity-authoring-plugin prefetch
```

### Updating the plugin

Pull the latest changes in your clone and reinstall the plugin directory:

```bash
git -C ./infinity-ai-plugins pull
agy plugin install ./infinity-ai-plugins/plugins/pega/infinity-ai-plugins/antigravity
```

## Option 2: Manual setup without Node.js (Java 17+ only)

If you cannot use the plugin or Node.js, download the MCP server JAR and skills directly and
register them in Antigravity.

### 1. Download and verify the MCP server and skills

Download `infinity-rules-mcp-<version>.jar`, `infinity-skills-<version>.zip`, and their `.sha256`
files from the [releases page](https://github.com/pegasystems/infinity-ai-plugins/releases).
Check the release page for the latest release tag and asset versions.

On macOS or Linux:

```bash
MCP_TAG=release-0.2.2; MCP=0.7.17; SKILLS_TAG=release-0.2.1; SKILLS=0.1.14
BASE=https://github.com/pegasystems/infinity-ai-plugins/releases/download
mkdir -p ~/.infinity-rules-mcp/manual/skills && cd ~/.infinity-rules-mcp/manual
curl -fLO "$BASE/$MCP_TAG/infinity-rules-mcp-$MCP.jar" && curl -fLO "$BASE/$MCP_TAG/infinity-rules-mcp-$MCP.jar.sha256" && shasum -a 256 -c "infinity-rules-mcp-$MCP.jar.sha256"
curl -fLO "$BASE/$SKILLS_TAG/infinity-skills-$SKILLS.zip" && curl -fLO "$BASE/$SKILLS_TAG/infinity-skills-$SKILLS.zip.sha256" && shasum -a 256 -c "infinity-skills-$SKILLS.zip.sha256"
unzip -oq "infinity-skills-$SKILLS.zip" -d skills
```

On Windows (PowerShell):

```powershell
$MCP_TAG = "release-0.2.2"; $MCP = "0.7.17"; $SKILLS_TAG = "release-0.2.1"; $SKILLS = "0.1.14"
$BASE = "https://github.com/pegasystems/infinity-ai-plugins/releases/download"
$ROOT = Join-Path $HOME ".infinity-rules-mcp\manual"
$SKILLS_DIR = Join-Path $ROOT "skills"

New-Item -ItemType Directory -Force -Path $SKILLS_DIR | Out-Null
Set-Location $ROOT
$assets = @(
    @{ Url = "$BASE/$MCP_TAG/infinity-rules-mcp-$MCP.jar"; File = "infinity-rules-mcp-$MCP.jar" },
    @{ Url = "$BASE/$SKILLS_TAG/infinity-skills-$SKILLS.zip"; File = "infinity-skills-$SKILLS.zip" }
)
foreach ($item in $assets) {
    Invoke-WebRequest -Uri $item.Url -OutFile $item.File
    Invoke-WebRequest -Uri "$($item.Url).sha256" -OutFile "$($item.File).sha256"
    $expected = (Get-Content "$($item.File).sha256").Split()[0].ToLower()
    $actual = (Get-FileHash $item.File -Algorithm SHA256).Hash.ToLower()
    if ($expected -ne $actual) { throw "SHA-256 mismatch for $($item.File)" }
}
Expand-Archive -Path "infinity-skills-$SKILLS.zip" -DestinationPath $SKILLS_DIR -Force
```

`PEGA_SKILLS_PATH` must point to the extracted `skills` directory that directly contains `24-2`,
`25-1`, and `26-1`, not to a version-specific subdirectory.

### 2. Register the MCP server

Add the server with `agy mcp add`:

```bash
agy mcp add --env PEGA_SKILLS_PATH=/absolute/path/to/.infinity-rules-mcp/manual/skills pega-infinity-authoring -- java -jar /absolute/path/to/.infinity-rules-mcp/manual/infinity-rules-mcp-<version>.jar --spring.profiles.active=stdio
```

Or add the entry manually to global `~/.gemini/config/mcp_config.json`
(`%USERPROFILE%\.gemini\config\mcp_config.json` on Windows), or to an installed/workspace plugin's
`mcp_config.json` (`.agents/plugins/infinity-authoring/mcp_config.json`):

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

### 3. Copy the skills

Copy `pega-setup` and `pega-assistant` from `plugins/pega/infinity-ai-plugins/antigravity/skills/`
into `.agents/skills/` (workspace) or `~/.gemini/config/skills/` (global):

```bash
mkdir -p .agents/skills
cp -r plugins/pega/infinity-ai-plugins/antigravity/skills/pega-setup plugins/pega/infinity-ai-plugins/antigravity/skills/pega-assistant .agents/skills/
```

## Configure the Pega connection

Start a new Antigravity session and run `/pega-setup`, or create
`~/.infinity-rules-mcp/config.json` (Windows: `%USERPROFILE%\.infinity-rules-mcp\config.json`)
yourself:

```json
{
  "pega_base_url": "https://your-pega-environment.example.com",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Set `pega_base_url` to the Pega environment root URL only; do not include `/prweb` or
another path segment. Set `pega_infinity_version` to the directory name that matches
the target environment:

- Pega Infinity 24.2: `24-2`
- Pega Infinity 25.1: `25-1`
- Pega Infinity 26.1: `26-1`

Keep the file private because it is stored in plaintext: `chmod 600 ~/.infinity-rules-mcp/config.json`.
Restart the MCP server (via `/mcp` in the CLI or **Customizations > Installed > MCP Servers** in the
App) or start a new session after changing it.

## Verify the setup

Start a new session and confirm that the `pega-infinity-authoring` MCP server is enabled.
Verify the local run time and remote Pega connection separately:

1. Use `list-skills` to confirm the bundled Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Antigravity can connect
   to the configured Pega environment.

The first Pega call opens a browser OAuth sign-in (callback `http://localhost:8888/callback`),
which requires the browser to run on the same machine as the MCP server.
