---
name: pega-setup
description: Use when the Pega Infinity Authoring Devin plugin needs connection setup help, environment configuration, or troubleshooting. Guides first-time setup in the Devin CLI, Devin Desktop, or Devin Cloud, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for Devin.

## Overview

The plugin starts a bundled MCP server, `pega-infinity-authoring`, with
`java -jar resources/infinity-rules-mcp.jar`. The server needs Java 17+ on the machine that runs
the Devin session and a connection to a Pega Infinity environment.

The plugin supplies the bundled skills parent directory through `PEGA_SKILLS_PATH`. Do not ask
users to set `pega_skills_path` for normal bundled use.

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`

Set the version explicitly to `26-1` for a 26.1 environment, even though the runtime defaults to
that version when it is omitted.

Authentication is OAuth-only. Use `34233104330833666523` as the standard client ID. The server
opens a browser sign-in on the machine that runs it and receives the callback on `localhost`.

This is an interactive step-by-step guide. Detect the user's current configuration and give
tailored instructions, but **never ask for or handle secrets directly** - users add connection
values to the config file, their environment, or the Devin Connect sheet themselves. Make this
clear whenever secrets come up.

## Where Values Come From

The runtime reads connection settings from these sources, highest priority first:

1. `~/.infinity-rules-mcp/config.json` (non-empty values only)
2. `PEGA_*` environment variables: `PEGA_BASE_URL`, `PEGA_OAUTH_CLIENT_ID`, and
   `PEGA_INFINITY_VERSION`

The plugin declares `PEGA_BASE_URL` and `PEGA_INFINITY_VERSION` as `${NAME}` placeholders:

- **Devin CLI and Devin Desktop** resolve them from the environment that launched Devin.
- **Devin Cloud** resolves them from the values saved in **Customize -> MCPs ->
  pega-infinity-authoring -> Connect**.

`PEGA_OAUTH_CLIENT_ID` is not a placeholder. The server inherits it from the environment that
launched Devin when it is set, and otherwise uses the standard client ID.

## Step 1: Check Existing Configuration

First, try calling `list-skills`. If it succeeds, the bundled plugin runtime and skills are
available. Do not treat this as proof that the remote Pega environment is reachable or configured.
Check the configuration separately even when `list-skills` succeeds.

If `list-skills` is not available at all, the MCP server did not start. Go to Troubleshooting.

Use a presence-only check. Never print the contents of the config file or the values of `PEGA_*`
variables into the session transcript:

```bash
config="$HOME/.infinity-rules-mcp/config.json"
if [ -f "$config" ]; then
    printf 'config.json: present\n'
    for key in pega_base_url pega_oauth_client_id pega_infinity_version; do
        grep -qE "\"$key\"[[:space:]]*:" "$config" && printf '%s: [set]\n' "$key" || printf '%s: [missing]\n' "$key"
    done
    mode=$(stat -c '%a' "$config" 2>/dev/null || stat -f '%Lp' "$config" 2>/dev/null)
    [ "$mode" = "600" ] && printf 'permissions: restricted\n' || printf 'permissions: check chmod 600\n'
else
    printf 'config.json: missing\n'
fi
for var in PEGA_BASE_URL PEGA_OAUTH_CLIENT_ID PEGA_INFINITY_VERSION; do
    [ -n "$(printenv "$var")" ] && printf '%s: [set]\n' "$var" || printf '%s: [missing]\n' "$var"
done
```

**Interpretation:**

- Treat `pega_base_url` / `PEGA_BASE_URL` as configured only if the value is non-empty, not a
  placeholder such as `<paste-your-pega-url-here>`, and uses the environment root URL without
  `/prweb`
- Treat `pega_oauth_client_id` / `PEGA_OAUTH_CLIENT_ID` as configured when it is the standard value
  `34233104330833666523` or an explicitly required custom value. The runtime uses the standard
  value when neither is set.
- Treat `pega_infinity_version` / `PEGA_INFINITY_VERSION` as configured only if it exactly matches
  `24-2`, `25-1`, or `26-1`.
- The `PEGA_*` check shows the shell the agent runs in. That is usually, but not always, the
  environment the MCP server was started with.

**Partial Configuration Handling:**

- User wants to update the base URL or other connection settings -> skip to Step 3
- Everything is configured -> continue to Step 4 to verify the remote connection

## Step 2: Confirm Setup Inputs

If no valid configuration exists, confirm the user has:

- the Pega base URL, for example `https://example.pega.net` or `https://example.pega.example.com`
- use the environment root URL only; do not include `/prweb` or any other path segment
- the Infinity version to use: 24.2 (`24-2`), 25.1 (`25-1`), or 26.1 (`26-1`)
- where they run Devin: the Devin CLI or Devin Desktop on their own machine, or Devin Cloud

Use the standard OAuth client ID. Only use a different client ID if the user explicitly says their
environment requires a custom override.

## Step 3: Configure Connection

**Do not ask for or handle secrets** - provide exact instructions so the user can add connection
values directly.

### Option A: Config File (Devin CLI and Devin Desktop; recommended)

This file is shared by every Infinity Rules MCP client on the machine and takes priority over
environment variables.

First ensure the config directory exists:

```bash
mkdir -p ~/.infinity-rules-mcp
```

Instruct the user to create or edit `~/.infinity-rules-mcp/config.json` directly with:

```json
{
  "pega_base_url": "<paste-your-pega-url-here>",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

`26-1` selects the bundled `resources/26-1/` directory.

After creating the file, instruct the user to restrict permissions:

```bash
chmod 600 ~/.infinity-rules-mcp/config.json
```

⚠️ `~/.infinity-rules-mcp/config.json` is stored in plaintext. Do not commit it to version control.

### Option B: Environment Variables (Devin CLI; temporary or CI sessions)

Instruct the user to store the values in a dedicated file, not directly in the shell profile:

**`~/.pega-env`:**

```bash
export PEGA_BASE_URL="<paste-your-pega-url-here>"
export PEGA_OAUTH_CLIENT_ID="34233104330833666523"
export PEGA_INFINITY_VERSION="26-1"
```

After creating the file:

```bash
chmod 600 ~/.pega-env
```

Detect the user's shell by running `echo $SHELL`, then instruct them to add `source ~/.pega-env`
to their profile (for example `~/.zshrc` or `~/.bashrc`). The variables must be set in the shell
that launches `devin`.

⚠️ `~/.pega-env` is stored in plaintext. Do not commit it to version control.

Non-empty values in `~/.infinity-rules-mcp/config.json` override these variables.

### Option C: Devin Cloud

Cloud sessions run on Devin's machine, so a config file on the user's laptop is not used. Instruct
the user to:

1. Open **Customize -> MCPs**, select `pega-infinity-authoring`, and choose **Connect**.
2. Enter `PEGA_BASE_URL` and `PEGA_INFINITY_VERSION` in the Connect sheet. If the environment
   requires a custom OAuth client ID, make `PEGA_OAUTH_CLIENT_ID` available as an environment
   variable in the session environment.
3. Make sure the session environment has Java 17+ on the `PATH`. If it does not, add a Java 17+
   install step to the environment blueprint.
4. Make sure the Pega environment accepts connections from Devin's machines.

The OAuth sign-in opens on the cloud session's machine, so the user completes it in the session
browser.

Proceed to Step 4.

## Step 4: Verify and Next Steps

### 4.1: Start a New Session

Plugins and MCP servers load when a session starts. The user must start a new Devin session for
changes to take effect:

- **Config file**: start a new Devin session
- **Environment variables**: reload the shell profile first (`source ~/.zshrc` or equivalent), then
  start `devin` from that same terminal
- **Devin Cloud**: save the Connect sheet, then start a new cloud session

### 4.2: Verify Connection

After the new session starts, verify two things separately:

1. Call `list-skills` to confirm the bundled plugin runtime and skills are available.
2. Call `list-available-applications` or `get-application` to confirm the remote Pega environment
   is reachable with the configured base URL. The first call may open the OAuth sign-in.

**Expected results:**

- `list-skills` returns available bundled Pega runtime skills.
- `list-available-applications` or `get-application` returns application data from the target Pega
  environment.

**If verification fails**, check:

- Is the base URL correct, reachable from the machine that runs the session, and set to the
  environment root URL without `/prweb`?
- If the environment requires a non-default OAuth client ID, was that override configured?
- Is Java 17+ installed and on the `PATH`? (`java -version`)

### 4.3: Next Steps

1. **Confirm remote app context**: Call `list-available-applications` to see available applications
2. **Load runtime skills**: Call `list-skills` then `get-skill` to load Pega-specific guidance
3. **For authoring changes**: Use `get-skill("methodology-change-request-workflow")` to learn the
   authoring workflow

## Troubleshooting

- **Server won't start / no Pega tools**: Check that Java 17+ is installed (`java -version`). In the
  Devin CLI, run `devin plugins info pega-infinity-authoring` to confirm the plugin is installed and
  `devin mcp list` to confirm the `pega-infinity-authoring` server is configured.
- **Connection refused**: Verify the base URL is correct, uses the environment root URL without
  `/prweb` or other path segments, and the Pega environment is accessible from the machine running
  the session.
- **Authentication failed**: Confirm the base URL and the standard OAuth client ID. If the
  environment requires a custom client ID, set `pega_oauth_client_id` in the config file, or
  `PEGA_OAUTH_CLIENT_ID` when no conflicting config value exists. The OAuth callback uses
  `localhost` port 8888 by default; make sure nothing else is listening on it.
- **Tools not appearing after config change**: Start a new Devin session. If the plugin itself was
  updated, run `devin plugins update pega-infinity-authoring` first.
- **Config file not loading**: Ensure `~/.infinity-rules-mcp/config.json` is valid JSON. Check for
  trailing commas or missing quotes.
- **Env vars ignored**: Non-empty config-file values take priority over `PEGA_*` environment
  variables. Remove stale config values or update the file when changing the effective connection.
  In the Devin CLI, the variables must be exported in the shell that launched `devin`.
- **Permission denied on config file**: Run `chmod 600 ~/.infinity-rules-mcp/config.json` and ensure
  the file is owned by your user.
- **fish/PowerShell**: Syntax differs - use `set -x` (fish) or `$env:` (PowerShell) instead of
  `export`.
