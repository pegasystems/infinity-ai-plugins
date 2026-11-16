# Infinity Authoring Antigravity Plugin

This directory contains the official Google Antigravity variant of the Pega Infinity Authoring plugin.

## Overview

The Infinity Authoring plugin connects Google Antigravity to Pega Infinity via the Model Context Protocol (MCP), enabling conversational low-code development directly inside Antigravity:
- Inspect applications, case types, and rule hierarchies
- Author and edit Pega rules (properties, views, data transforms, activities, decision tables)
- Safe, branch-based change request workflows (ChangeRequest pattern)
- Pre-packaged Pega authoring recipes and skills for Infinity 24.2, 25.1, and 26.1

## Prerequisites

- **Google Antigravity**
- **Node.js 22.14 or newer** (`node --version`)
- **Java 17 or newer** (`java -version`)

On the first run, the MCP launcher automatically downloads and verifies the Pega MCP server JAR and skills payload, caching them locally in `~/.infinity-rules-mcp/`.

## Directory Structure

```text
antigravity/
├── plugin.json         # Antigravity plugin manifest
├── mcp_config.json     # MCP server configuration
├── README.md           # Documentation
├── assets/
│   └── icon.png        # Pega brand icon
├── rules/
│   └── AGENTS.md       # Antigravity Pega authoring operating guidelines
└── skills/
    ├── pega-assistant/ # Assistant workflow skill
    └── pega-setup/     # Setup and verification runbook
```

## Setup & Configuration

1. Configure your Pega instance in `~/.infinity-rules-mcp/config.json`:
   ```json
   {
     "pega_base_url": "https://your-pega-host.com",
     "pega_oauth_client_id": "your-client-id",
     "pega_infinity_version": "24-2"
   }
   ```
   > **Note:** Use the environment root URL only for `pega_base_url` (do not append `/prweb`).

2. Start a conversation in Antigravity and ask:
   > *"Run pega-setup to verify my Pega Infinity Authoring connection."*

## Usage Examples

Once connected, you can interact with Pega Infinity in Antigravity using natural language:
- *"Explore the case types in application IslandAI."*
- *"Create a new text property 'CustomerEmail' on class Sri-IslandAI-Work-TourBooking."*
- *"Create a ChangeRequest branch for adding meal preference options to the booking view."*
