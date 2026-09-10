---
name: theme-pydefinition-flat-sample
description: Second pyDefinition payload (decoded, flat literal shape) for a Rule-UI-Theme instance, showing every base and components key together. Load when authoring or verifying a theme that uses the flat literal token shape -- see Theme Definition Token Inventory for the key list and theme-pydefinition-merge-pattern for how to re-serialize this as the pyDefinition string.
---

```json
{
  "base": {
    "border-radius": "0.75rem",
    "font-family": "'Open Sans', sans-serif",
    "font-size": "1rem",
    "font-scale": "majorSecond",
    "palette": {
      "app-background": "#E9ECF2",
      "secondary-background": "#F3F4FA",
      "interactive": "#3f57e4",
      "foreground-color": "#001d54",
      "dark": "#003B70",
      "border-line": "#cfd5e2"
    },
    "line-height": "1.28",
    "case-type-colors": "ignored",
    "spacing": "0.75rem",
    "icon-set": "streamline"
  },
  "components": {
    "agent": {
      "background": "linear-gradient(90deg, #f7f5ff 0%, #eff6fe 100%)",
      "user-message": {
        "background": "#681fc31a",
        "foreground-color": "#001d54"
      },
      "foreground-color": "#001d54",
      "history": {
        "item": {
          "selected-background": "#cfd5e2"
        }
      },
      "questionnaire": {
        "background": "#ffffff"
      }
    },
    "app-shell": {
      "nav": {
        "detached": true,
        "background": "#E9ECF2",
        "border-color": "transparent",
        "create-button-background": "#f5f5fc",
        "nested-list-background": "#f5f5fc",
        "expand-button": {
          "background": "#cfd5e2",
          "foreground-color": "#001F5F"
        },
        "item-border-radius": "0.5rem",
        "selected-background": "#f5f5fc"
      },
      "header": {
        "border-color": "#E9ECF2"
      }
    },
    "case-view": {
      "icon": {
        "background": "linear-gradient(45deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))"
      },
      "summary": {
        "detached": true
      },
      "assignments": {
        "detached": true,
        "background": "#fff"
      },
      "header": {
        "background": "#fff",
        "foreground-color": "#001f5f"
      }
    },
    "card": {
      "background": "#FFF",
      "border-radius": ".75rem",
      "foreground-color": "#001d54"
    },
    "button": {
      "border-radius": 3,
      "color": "#3F57E4",
      "secondary-color": "#3F57E4",
      "foreground-color": "#FFF",
      "height": "44px"
    },
    "form-control": {
      "border-radius": 0.5,
      "border-color": "#8a8a8a",
      ":hover": {
        "border-color": "#3f57e4"
      }
    },
    "icon": {
      "border-radius-multiplier": "99"
    },
    "tabs": {
      "detached": true
    },
    "announcement": {
      "background": "white",
      "foreground-color": "#001f5f"
    },
    "avatar": {
      "background-color": "#000000"
    },
    "table": {
      "header": {
        "background-color": "#F3F4FA",
        "border-color": "transparent"
      },
      "body": {
        "border-color": "transparent",
        "secondary-background-color": "#F3F4FA"
      },
      "spacing": {
        "horizontal-inner": true
      }
    },
    "label": {
      "foreground-color": "#001d54b3"
    },
    "progress": {
      "progress-color": "#3f57e4"
    },
    "select": {
      "border-color": "#8a8a8a",
      "height": "44px"
    },
    "summary-item": {
      "vertical-gap": "0.4rem"
    },
    "tasks": {
      "button-style": "icon"
    },
    "input": {
      "height": "44px"
    }
  }
}
```
