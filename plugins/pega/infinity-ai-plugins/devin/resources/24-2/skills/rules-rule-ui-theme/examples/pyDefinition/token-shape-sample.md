---
name: theme-pydefinition-token-shape-sample
description: Third pyDefinition payload, in the $type/$value token shape ("literal" values and "inherited" alias references), covering the entire base and components token catalogue -- verified key-for-key against the published Constellation/Cosmos design-token contract from the @pega/cosmos-react-core package. Load when authoring or verifying a theme that uses this wrapped token shape -- see theme-pydefinition-merge-pattern for how to detect the shape and edit literal vs inherited tokens without converting between shapes.
---

```json
{
  "base": {
    "colors": {
      "white": { "$type": "literal", "$value": "#ffffff" },
      "black": { "$type": "literal", "$value": "#000000" },
      "gray": {
        "extra-light": { "$type": "literal", "$value": "#f5f5f5" },
        "light": { "$type": "literal", "$value": "#cfcfcf" },
        "medium": { "$type": "literal", "$value": "#939393" },
        "dark": { "$type": "literal", "$value": "#676767" },
        "extra-dark": { "$type": "literal", "$value": "#3f3f3f" }
      },
      "slate": {
        "extra-light": { "$type": "literal", "$value": "#e9eef3" },
        "light": { "$type": "literal", "$value": "#cbd4dc" },
        "medium": { "$type": "literal", "$value": "#8397ab" },
        "dark": { "$type": "literal", "$value": "#4c5a67" },
        "extra-dark": { "$type": "literal", "$value": "#252c32" }
      },
      "red": {
        "extra-light": { "$type": "literal", "$value": "#ffdbde" },
        "light": { "$type": "literal", "$value": "#f66f78" },
        "medium": { "$type": "literal", "$value": "#d91c29" },
        "dark": { "$type": "literal", "$value": "#a6020d" },
        "extra-dark": { "$type": "literal", "$value": "#570006" }
      },
      "orange": {
        "extra-light": { "$type": "literal", "$value": "#feede2" },
        "light": { "$type": "literal", "$value": "#ffaa75" },
        "medium": { "$type": "literal", "$value": "#fd6000" },
        "dark": { "$type": "literal", "$value": "#b54703" },
        "extra-dark": { "$type": "literal", "$value": "#5a2401" }
      },
      "green": {
        "extra-light": { "$type": "literal", "$value": "#d4f7d5" },
        "light": { "$type": "literal", "$value": "#7ee791" },
        "medium": { "$type": "literal", "$value": "#20aa50" },
        "dark": { "$type": "literal", "$value": "#156f35" },
        "extra-dark": { "$type": "literal", "$value": "#0b381a" }
      },
      "blue": {
        "extra-light": { "$type": "literal", "$value": "#e2f1ff" },
        "light": { "$type": "literal", "$value": "#71baff" },
        "medium": { "$type": "literal", "$value": "#076bc9" },
        "dark": { "$type": "literal", "$value": "#054a8a" },
        "extra-dark": { "$type": "literal", "$value": "#00284c" }
      },
      "purple": {
        "extra-light": { "$type": "literal", "$value": "#f1e9fb" },
        "light": { "$type": "literal", "$value": "#d6bcf5" },
        "medium": { "$type": "literal", "$value": "#ac75f0" },
        "dark": { "$type": "literal", "$value": "#681fc3" },
        "extra-dark": { "$type": "literal", "$value": "#341061" }
      },
      "yellow": {
        "extra-light": { "$type": "literal", "$value": "#fffce5" },
        "light": { "$type": "literal", "$value": "#fff5b3" },
        "medium": { "$type": "literal", "$value": "#ffdd33" },
        "dark": { "$type": "literal", "$value": "#c29b00" },
        "extra-dark": { "$type": "literal", "$value": "#856600" }
      }
    },
    "palette": {
      "ai": { "$type": "inherited", "$value": "base.colors.purple.dark" },
      "app-background": { "$type": "inherited", "$value": "base.colors.slate.extra-light" },
      "app-foreground": { "$type": "literal", "$value": "auto" },
      "primary-background": { "$type": "inherited", "$value": "base.colors.white" },
      "secondary-background": { "$type": "inherited", "$value": "base.colors.gray.extra-light" },
      "foreground-color": { "$type": "inherited", "$value": "base.palette.dark" },
      "brand-primary": { "$type": "inherited", "$value": "base.colors.blue.medium" },
      "brand-secondary": { "$type": "inherited", "$value": "base.palette.primary-background" },
      "brand-accent": { "$type": "literal", "$value": "auto" },
      "brand-background": { "$type": "inherited", "$value": "base.palette.brand-primary" },
      "brand-foreground": { "$type": "literal", "$value": "auto" },
      "urgent": { "$type": "inherited", "$value": "base.colors.red.medium" },
      "warn": { "$type": "inherited", "$value": "base.colors.orange.medium" },
      "success": { "$type": "inherited", "$value": "base.colors.green.medium" },
      "pending": { "$type": "inherited", "$value": "base.colors.purple.dark" },
      "info": { "$type": "inherited", "$value": "base.colors.slate.medium" },
      "interactive": { "$type": "inherited", "$value": "base.palette.brand-primary" },
      "border-line": { "$type": "inherited", "$value": "base.colors.gray.light" },
      "skeleton": { "$type": "inherited", "$value": "base.colors.gray.extra-light" },
      "light": { "$type": "inherited", "$value": "base.colors.white" },
      "dark": { "$type": "inherited", "$value": "base.colors.black" },
      "background-color": { "$type": "inherited", "$value": "base.palette.light" },
      "supplemental-colors": {
        "color-1": { "$type": "literal", "$value": "#005fa8" },
        "color-2": { "$type": "literal", "$value": "#00a395" },
        "color-3": { "$type": "literal", "$value": "#8397ab" },
        "color-4": { "$type": "literal", "$value": "#7d5fbf" },
        "color-5": { "$type": "literal", "$value": "#da4644" },
        "color-6": { "$type": "literal", "$value": "#ff6100" },
        "color-7": { "$type": "literal", "$value": "#a2918b" },
        "color-8": { "$type": "literal", "$value": "#27823d" }
      }
    },
    "font-family": { "$type": "literal", "$value": "'Open Sans', sans-serif" },
    "font-size": { "$type": "literal", "$value": "0.875rem" },
    "font-scale": { "$type": "literal", "$value": "linear" },
    "font-stretch": { "$type": "literal", "$value": "normal" },
    "letter-spacing": { "$type": "literal", "$value": "normal" },
    "font-weight": {
      "bold": { "$type": "literal", "$value": 700 },
      "semi-bold": { "$type": "literal", "$value": 600 },
      "normal": { "$type": "literal", "$value": 400 }
    },
    "line-height": { "$type": "literal", "$value": "normal" },
    "scale": { "$type": "literal", "$value": 1 },
    "border-radius": { "$type": "literal", "$value": "0.5rem" },
    "spacing": { "$type": "literal", "$value": "0.5rem" },
    "hit-area": {
      "compact": { "$type": "literal", "$value": "1.5rem" },
      "compact-min": { "$type": "literal", "$value": "24px" },
      "mouse": { "$type": "literal", "$value": "2rem" },
      "mouse-min": { "$type": "literal", "$value": "32px" },
      "finger": { "$type": "literal", "$value": "2.75rem" },
      "finger-min": { "$type": "literal", "$value": "44px" }
    },
    "custom-scrollbar": { "$type": "literal", "$value": true },
    "animation": {
      "speed": { "$type": "literal", "$value": "0.25s" },
      "timing": {
        "ease": { "$type": "literal", "$value": "cubic-bezier(0.4, 0.6, 0.1,1)" },
        "ease-out": { "$type": "literal", "$value": "ease-out" },
        "ease-in": { "$type": "literal", "$value": "ease-in" }
      }
    },
    "transparency": {
      "transparent-1": { "$type": "literal", "$value": 0.8 },
      "transparent-2": { "$type": "literal", "$value": 0.7 },
      "transparent-3": { "$type": "literal", "$value": 0.6 },
      "transparent-4": { "$type": "literal", "$value": 0.4 },
      "transparent-5": { "$type": "literal", "$value": 0.3 }
    },
    "disabled-opacity": { "$type": "inherited", "$value": "base.transparency.transparent-4" },
    "shadow": {
      "high": { "$type": "literal", "$value": "0 0.125rem 1.5rem rgba(0,0,0,.3)" },
      "low": { "$type": "literal", "$value": "0 0.125rem 0.5rem rgba(0,0,0,.2)" },
      "high-filter": { "$type": "literal", "$value": "drop-shadow(0 0.125rem 0.75rem rgba(0,0,0,.3))" },
      "low-filter": { "$type": "literal", "$value": "drop-shadow(0 0.125rem 0.25rem rgba(0,0,0,.2))" },
      "focus": { "$type": "literal", "$value": "0 0 0 0.11rem #fff, 0 0 0 0.18rem #076bc9, 0 0 0 0.3rem #076bc91a" },
      "focus-group": { "$type": "literal", "$value": "0 0 0 0.125rem #076bc966" },
      "focus-group-inset": { "$type": "literal", "$value": "inset 0 0 0 0.125rem #076bc966" },
      "focus-inset": { "$type": "literal", "$value": "inset 0 0 0 0.11rem #fff, inset 0 0 0 0.18rem #076bc9, inset 0 0 0 0.3rem #076bc91a" },
      "focus-solid": { "$type": "literal", "$value": "0 0 0 0.0625rem rgb(0, 118, 209)" },
      "focus-filter": { "$type": "literal", "$value": "drop-shadow(0 0 0.125rem rgba(0, 118, 209, 0.30))" }
    },
    "z-index": {
      "popover": { "$type": "literal", "$value": 1000 },
      "drawer": { "$type": "literal", "$value": 2000 },
      "modal": { "$type": "literal", "$value": 3000 },
      "alert": { "$type": "literal", "$value": 4000 },
      "backdrop": { "$type": "literal", "$value": 7000 },
      "toast": { "$type": "literal", "$value": 8000 },
      "tooltip": { "$type": "literal", "$value": 9000 },
      "max": { "$type": "literal", "$value": 2147483647 }
    },
    "breakpoints": {
      "xs": { "$type": "literal", "$value": "0em" },
      "sm": { "$type": "literal", "$value": "31.25em" },
      "md": { "$type": "literal", "$value": "62.5em" },
      "lg": { "$type": "literal", "$value": "93.75em" },
      "xl": { "$type": "literal", "$value": "125em" }
    },
    "content-width": {
      "xs": { "$type": "literal", "$value": "20ch" },
      "sm": { "$type": "literal", "$value": "40ch" },
      "md": { "$type": "literal", "$value": "60ch" },
      "lg": { "$type": "literal", "$value": "80ch" },
      "xl": { "$type": "literal", "$value": "100ch" }
    },
    "icon-set": { "$type": "literal", "$value": "budicon" },
    "icon-fill": { "$type": "literal", "$value": null },
    "case-type-colors": { "$type": "literal", "$value": "ignored" },
    "css": { "$type": "literal", "$value": "" }
  },
  "components": {
    "app-shell": {
      "nav": {
        "background": { "$type": "inherited", "$value": "components.app-shell.nav.background-color" },
        "foreground-color": { "$type": "literal", "$value": "auto" },
        "background-color": { "$type": "inherited", "$value": "base.colors.slate.extra-dark" },
        "border-color": { "$type": "inherited", "$value": "base.palette.border-line" },
        "separator-color": { "$type": "inherited", "$value": "components.app-shell.nav.border-color" },
        "create-button-background": { "$type": "literal", "$value": "auto" },
        "nested-list-background": { "$type": "literal", "$value": "auto" },
        "expand-button": {
          "background": { "$type": "literal", "$value": "auto" },
          "foreground-color": { "$type": "inherited", "$value": "components.app-shell.nav.foreground-color" }
        },
        "detached": { "$type": "literal", "$value": false },
        "item-border-radius": { "$type": "literal", "$value": "1.25rem" },
        "selected-background": { "$type": "literal", "$value": "auto" }
      },
      "header": {
        "app-name-color": { "$type": "inherited", "$value": "base.palette.brand-accent" },
        "background": { "$type": "inherited", "$value": "components.app-shell.header.background-color" },
        "foreground-color": { "$type": "literal", "$value": "auto" },
        "background-color": { "$type": "inherited", "$value": "base.palette.brand-secondary" },
        "border-color": { "$type": "inherited", "$value": "base.palette.border-line" },
        "search-input": {
          "background-color": { "$type": "literal", "$value": "transparent" },
          "foreground-color": { "$type": "inherited", "$value": "components.app-shell.header.foreground-color" },
          "border-color": { "$type": "inherited", "$value": "components.app-shell.header.foreground-color" }
        }
      }
    },
    "case-view": {
      "header": {
        "background": { "$type": "inherited", "$value": "components.case-view.header.background-color" },
        "background-color": { "$type": "inherited", "$value": "base.palette.brand-background" },
        "foreground-color": { "$type": "inherited", "$value": "base.palette.brand-foreground" }
      },
      "icon": {
        "background": { "$type": "literal", "$value": "auto" },
        "box-shadow": { "$type": "literal", "$value": "auto" },
        "color": { "$type": "inherited", "$value": "base.palette.brand-foreground" }
      },
      "summary": { "detached": { "$type": "literal", "$value": false } },
      "utilities": {
        "detached": { "$type": "literal", "$value": true },
        "background": { "$type": "literal", "$value": "transparent" },
        "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" },
        "icon-color": { "$type": "literal", "$value": false }
      },
      "assignments": {
        "background": { "$type": "inherited", "$value": "components.card.background" },
        "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
        "detached": { "$type": "literal", "$value": false }
      },
      "stages": {
        "status": {
          "completed": {
            "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
            "background": { "$type": "inherited", "$value": "components.card.background" }
          },
          "current": {
            "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
            "background": { "$type": "inherited", "$value": "components.card.background" }
          },
          "pending": {
            "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
            "background": { "$type": "inherited", "$value": "components.card.background" }
          }
        }
      }
    },
    "announcement": {
      "background": { "$type": "inherited", "$value": "base.palette.brand-primary" },
      "foreground-color": { "$type": "literal", "$value": "auto" }
    },
    "avatar": {
      "background": { "$type": "inherited", "$value": "components.avatar.background-color" },
      "foreground-color": { "$type": "literal", "$value": "auto" },
      "background-color": { "$type": "inherited", "$value": "base.colors.slate.dark" }
    },
    "agent": {
      "background": { "$type": "inherited", "$value": "components.card.background" },
      "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
      "ai": { "$type": "inherited", "$value": "base.palette.ai" },
      "user-message": {
        "background": { "$type": "inherited", "$value": "components.card.secondary-background" },
        "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" }
      },
      "coach-message": {
        "avatar": {
          "background": { "$type": "inherited", "$value": "components.card.secondary-background" },
          "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" }
        }
      },
      "history": {
        "background": { "$type": "inherited", "$value": "components.card.background" },
        "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" },
        "item": { "selected-background": { "$type": "inherited", "$value": "base.palette.secondary-background" } }
      },
      "questionnaire": {
        "background": { "$type": "inherited", "$value": "components.card.background" },
        "foreground-color": { "$type": "inherited", "$value": "components.card.foreground-color" }
      }
    },
    "badges": {
      "font-stretch": { "$type": "inherited", "$value": "base.font-stretch" },
      "status": {
        "success": { "foreground": { "$type": "inherited", "$value": "base.colors.green.dark" }, "background": { "$type": "inherited", "$value": "base.colors.green.extra-light" } },
        "urgent": { "foreground": { "$type": "inherited", "$value": "base.colors.red.dark" }, "background": { "$type": "inherited", "$value": "base.colors.red.extra-light" } },
        "warn": { "foreground": { "$type": "inherited", "$value": "base.colors.orange.dark" }, "background": { "$type": "inherited", "$value": "base.colors.orange.extra-light" } },
        "pending": { "foreground": { "$type": "inherited", "$value": "base.colors.purple.dark" }, "background": { "$type": "inherited", "$value": "base.colors.purple.extra-light" } },
        "info": { "foreground": { "$type": "inherited", "$value": "base.colors.slate.dark" }, "background": { "$type": "inherited", "$value": "base.colors.slate.extra-light" } }
      },
      "tag": {
        "foreground": { "$type": "inherited", "$value": "base.palette.interactive" },
        "background": { "$type": "inherited", "$value": "base.palette.interactive" }
      },
      "count": {
        "default": { "foreground": { "$type": "inherited", "$value": "base.colors.slate.dark" }, "background": { "$type": "inherited", "$value": "base.colors.slate.extra-light" } },
        "urgent": { "foreground": { "$type": "inherited", "$value": "base.palette.light" }, "background": { "$type": "inherited", "$value": "base.palette.urgent" } }
      },
      "alert": {
        "urgent": { "background": { "$type": "inherited", "$value": "base.palette.urgent" } },
        "success": { "background": { "$type": "inherited", "$value": "base.palette.success" } },
        "base": { "border-color": { "$type": "inherited", "$value": "base.palette.light" } }
      },
      "keyboard": {
        "background-color": { "$type": "inherited", "$value": "base.colors.slate.extra-light" },
        "border-color": { "$type": "inherited", "$value": "base.colors.slate.light" }
      }
    },
    "banner": {
      "icon-color": { "$type": "inherited", "$value": "base.palette.light" },
      "urgent": { "background": { "$type": "inherited", "$value": "base.palette.urgent" }, "background-mix": { "$type": "literal", "$value": 0.2 } },
      "warning": { "background": { "$type": "inherited", "$value": "base.palette.warn" }, "background-mix": { "$type": "literal", "$value": 0.2 } },
      "success": { "background": { "$type": "inherited", "$value": "base.palette.success" }, "background-mix": { "$type": "literal", "$value": 0.2 } },
      "ai": { "background": { "$type": "inherited", "$value": "base.palette.ai" }, "background-mix": { "$type": "literal", "$value": 0.2 } },
      "info": { "background": { "$type": "inherited", "$value": "base.palette.info" }, "background-mix": { "$type": "literal", "$value": 0.2 } }
    },
    "button": {
      "height": { "$type": "inherited", "$value": "base.hit-area.mouse-min" },
      "border-width": { "$type": "literal", "$value": "0.0625rem" },
      "border-radius": { "$type": "literal", "$value": 9999 },
      "color": { "$type": "inherited", "$value": "base.palette.interactive" },
      "foreground-color": { "$type": "inherited", "$value": "base.palette.brand-foreground" },
      "secondary-color": { "$type": "inherited", "$value": "base.palette.interactive" },
      "secondary-fill-style": { "$type": "literal", "$value": "outline" },
      "focus-shadow": { "$type": "inherited", "$value": "base.shadow.focus" },
      "padding": { "$type": "literal", "$value": "0 1rem" },
      "touch": { "height": { "$type": "inherited", "$value": "base.hit-area.finger-min" }, "padding": { "$type": "literal", "$value": "0 1.5rem" } }
    },
    "card": {
      "border-radius": { "$type": "inherited", "$value": "base.border-radius" },
      "background": { "$type": "inherited", "$value": "base.palette.primary-background" },
      "secondary-background": { "$type": "inherited", "$value": "base.palette.secondary-background" },
      "foreground-color": { "$type": "literal", "$value": "auto" },
      "padding": { "$type": "inherited", "$value": "base.spacing" },
      "border-color": { "$type": "inherited", "$value": "base.palette.interactive" }
    },
    "checkbox": { "border-radius": { "$type": "inherited", "$value": "components.form-control.border-radius" } },
    "field-group-list": { "group-colors": { "$type": "literal", "$value": true } },
    "field-value-list": { "inline": { "detached": { "$type": "literal", "$value": false }, "border-style": { "$type": "literal", "$value": "dashed" } } },
    "details": { "field-label": { "$type": "literal", "$value": "inline" } },
    "form-control": {
      "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" },
      "background-color": { "$type": "inherited", "$value": "base.palette.primary-background" },
      "border-color": { "$type": "inherited", "$value": "base.colors.gray.medium" },
      "border-width": { "$type": "literal", "$value": "0.0625rem" },
      "border-radius": { "$type": "literal", "$value": 0.5 },
      "padding": { "$type": "inherited", "$value": "base.spacing" },
      ":hover": { "border-color": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } },
      ":active": { "border-color": { "$type": "literal", "$value": "transparent" } },
      ":focus": { "border-color": { "$type": "literal", "$value": "transparent" }, "box-shadow": { "$type": "inherited", "$value": "base.shadow.focus" } },
      ":disabled": { "background-color": { "$type": "inherited", "$value": "base.colors.gray.extra-light" }, "border-color": { "$type": "inherited", "$value": "base.colors.gray.light" } },
      ":read-only": { "background-color": { "$type": "inherited", "$value": "base.colors.gray.extra-light" }, "border-color": { "$type": "literal", "$value": "transparent" } }
    },
    "form-field": {
      "error": { "status-color": { "$type": "inherited", "$value": "base.palette.urgent" } },
      "success": { "status-color": { "$type": "inherited", "$value": "base.palette.success" } },
      "warning": { "status-color": { "$type": "inherited", "$value": "base.palette.warn" } },
      "pending": { "status-color": { "$type": "inherited", "$value": "base.palette.pending" } },
      "layout": { "$type": "literal", "$value": "stacked" },
      "helper-text-position": { "$type": "literal", "$value": "below" }
    },
    "input": {
      "height": { "$type": "literal", "$value": "2rem" },
      "padding": { "$type": "inherited", "$value": "components.form-control.padding" },
      "background-color": { "$type": "inherited", "$value": "components.form-control.background-color" },
      "border-color": { "$type": "inherited", "$value": "components.form-control.border-color" },
      "border-width": { "$type": "inherited", "$value": "components.form-control.border-width" },
      "border-radius": { "$type": "inherited", "$value": "components.form-control.border-radius" }
    },
    "icon": {
      "size": { "s": { "$type": "literal", "$value": "1.125rem" }, "m": { "$type": "literal", "$value": "2rem" }, "l": { "$type": "literal", "$value": "4rem" } },
      "border-radius-multiplier": { "$comment": "Base border radius multiplier used for background border radius.", "$type": "literal", "$value": "0.5" }
    },
    "interaction-timer": {
      "notification-indicator": { "$type": "inherited", "$value": "base.colors.red.light" },
      "sla": {
        "goal": { "progress": { "primary-color": { "$type": "inherited", "$value": "base.colors.green.medium" }, "secondary-color": { "$type": "inherited", "$value": "base.colors.green.extra-dark" } } },
        "deadline": { "progress": { "primary-color": { "$type": "inherited", "$value": "base.colors.orange.medium" }, "secondary-color": { "$type": "inherited", "$value": "base.colors.orange.extra-dark" } } },
        "past-deadline": { "progress": { "primary-color": { "$type": "inherited", "$value": "base.colors.red.medium" }, "secondary-color": { "$type": "inherited", "$value": "base.colors.red.extra-dark" } } }
      }
    },
    "label": {
      "color": { "$type": "inherited", "$value": "base.palette.foreground-color" },
      "font-size": { "$type": "literal", "$value": "xs" },
      "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" },
      "foreground-color": { "$type": "literal", "$value": "auto" }
    },
    "link": { "color": { "$type": "inherited", "$value": "base.palette.interactive" } },
    "modal": { "background": { "$type": "inherited", "$value": "base.palette.primary-background" } },
    "popover": { "background": { "$type": "inherited", "$value": "base.palette.primary-background" } },
    "lifecycle": {
      "background": { "$type": "inherited", "$value": "base.palette.app-background" },
      "task": { "background": { "$type": "inherited", "$value": "base.palette.primary-background" }, "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" } },
      "stage": {
        "background": { "$type": "inherited", "$value": "base.palette.app-background" },
        "foreground-color": { "$type": "inherited", "$value": "base.palette.light" },
        "start": { "background": { "$type": "inherited", "$value": "base.colors.blue.dark" }, "hover-color": { "$type": "inherited", "$value": "base.colors.blue.medium" } },
        "default": { "background": { "$type": "inherited", "$value": "base.colors.blue.medium" }, "hover-color": { "$type": "inherited", "$value": "base.colors.blue.light" } },
        "resolution": { "background": { "$type": "inherited", "$value": "base.colors.green.medium" }, "hover-color": { "$type": "inherited", "$value": "base.colors.green.light" } },
        "alternate": {
          "background": { "$type": "inherited", "$value": "base.colors.slate.dark" },
          "hover-color": { "$type": "inherited", "$value": "base.colors.slate.medium" },
          "resolution-highlight": { "$type": "inherited", "$value": "base.colors.green.medium" }
        }
      }
    },
    "mark": {
      "background-color": { "$type": "inherited", "$value": "base.colors.yellow.light" },
      "font-weight": { "$type": "inherited", "$value": "base.font-weight.bold" }
    },
    "multi-step-form": { "bar-indicator-border-radius": { "$type": "inherited", "$value": "base.border-radius" } },
    "progress": { "progress-color": { "$type": "inherited", "$value": "base.palette.interactive" } },
    "qr-code": { "size": { "s": { "$type": "literal", "$value": "6.25rem" }, "m": { "$type": "literal", "$value": "9.375rem" }, "l": { "$type": "literal", "$value": "12.5rem" } } },
    "radio-check": {
      "border-color": { "$type": "inherited", "$value": "components.form-control.border-color" },
      "border-width": { "$type": "inherited", "$value": "components.form-control.border-width" },
      "background-color": { "$type": "inherited", "$value": "components.form-control.background-color" },
      "foreground-color": { "$type": "inherited", "$value": "base.palette.interactive" },
      "label": { "color": { "$type": "inherited", "$value": "base.palette.foreground-color" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.normal" } },
      "size": { "$type": "literal", "$value": "1.25rem" },
      "touch-size": { "$type": "literal", "$value": "1.75rem" },
      ":checked": { "background-color": { "$type": "inherited", "$value": "base.palette.interactive" }, "border-color": { "$type": "inherited", "$value": "base.palette.interactive" } }
    },
    "radio-button": { "border-radius": { "$type": "literal", "$value": "50%" } },
    "rating": { "color": { "$type": "inherited", "$value": "base.palette.foreground-color" } },
    "search-input": { "border-radius": { "$type": "literal", "$value": 9999 } },
    "select": {
      "height": { "$type": "literal", "$value": "2rem" },
      "padding": { "$type": "inherited", "$value": "components.form-control.padding" },
      "border-color": { "$type": "inherited", "$value": "components.form-control.border-color" },
      "border-width": { "$type": "inherited", "$value": "components.form-control.border-width" },
      "border-radius": { "$type": "inherited", "$value": "components.form-control.border-radius" }
    },
    "sentiment": {
      "positive": { "color": { "$type": "inherited", "$value": "base.palette.success" } },
      "negative": { "color": { "$type": "inherited", "$value": "base.palette.urgent" } },
      "neutral": { "color": { "$type": "inherited", "$value": "base.palette.foreground-color" } }
    },
    "shortcuts": { "icon": { "background": { "$type": "inherited", "$value": "base.palette.brand-accent" }, "foreground": { "$type": "literal", "$value": "auto" } } },
    "summary-item": { "vertical-gap": { "$type": "literal", "$value": "0rem" } },
    "switch": {
      "height": { "$type": "literal", "$value": "1.5rem" },
      "width": { "$type": "literal", "$value": "3rem" },
      "touch-height": { "$type": "literal", "$value": "2rem" },
      "touch-width": { "$type": "literal", "$value": "4rem" },
      "off": { "color": { "$type": "inherited", "$value": "base.colors.gray.medium" } },
      "on": { "color": { "$type": "inherited", "$value": "base.palette.interactive" } }
    },
    "tabs": { "detached": { "$type": "literal", "$value": false } },
    "table": {
      "typography": { "font-stretch": { "$type": "inherited", "$value": "base.font-stretch" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "header": {
        "font-size": { "$type": "literal", "$value": "s" },
        "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" },
        "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" },
        "background-color": { "$type": "inherited", "$value": "base.palette.secondary-background" },
        "vertical-spacing": { "$type": "literal", "$value": 1 },
        "horizontal-spacing": { "$type": "literal", "$value": 2 },
        "border-width": { "$type": "literal", "$value": "0.0625rem" },
        "border-color": { "$type": "inherited", "$value": "base.palette.border-line" }
      },
      "striped-rows": { "$type": "literal", "$value": true },
      "body": {
        "foreground-color": { "$type": "inherited", "$value": "base.palette.foreground-color" },
        "background-color": { "$type": "inherited", "$value": "base.palette.primary-background" },
        "secondary-background-color": { "$type": "inherited", "$value": "base.palette.secondary-background" },
        "vertical-spacing": { "$type": "literal", "$value": 1 },
        "horizontal-spacing": { "$type": "literal", "$value": 1 },
        "border-width": { "$type": "literal", "$value": "0.0625rem" },
        "border-color": { "$type": "inherited", "$value": "base.palette.border-line" }
      },
      "border": {
        "horizontal-inner": { "$type": "literal", "$value": true },
        "horizontal-outer": { "$type": "literal", "$value": true },
        "vertical-inner": { "$type": "literal", "$value": true },
        "vertical-outer": { "$type": "literal", "$value": true }
      },
      "spacing": {
        "horizontal-inner": { "$type": "literal", "$value": true },
        "horizontal-outer": { "$type": "literal", "$value": true },
        "vertical-inner": { "$type": "literal", "$value": true },
        "vertical-outer": { "$type": "literal", "$value": true }
      }
    },
    "task-manager": {
      "task-icon": {
        "banner": { "background": { "$type": "inherited", "$value": "base.colors.orange.medium" }, "foreground": { "$type": "inherited", "$value": "base.colors.white" } },
        "action": { "background": { "$type": "inherited", "$value": "base.palette.interactive" }, "foreground": { "$type": "inherited", "$value": "base.colors.white" } },
        "task-drawer": { "background": { "$type": "inherited", "$value": "base.colors.gray.extra-light" }, "foreground": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } },
        "wrap-up": { "background": { "$type": "inherited", "$value": "base.palette.dark" }, "foreground": { "$type": "inherited", "$value": "base.colors.white" } },
        "suggested": { "background": { "$type": "inherited", "$value": "base.colors.slate.light" }, "foreground": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } },
        "queued": { "background": { "$type": "inherited", "$value": "base.colors.slate.light" }, "foreground": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } },
        "in-progress": { "background": { "$type": "inherited", "$value": "base.colors.slate.light" }, "foreground": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } },
        "resolved": { "background": { "$type": "inherited", "$value": "base.colors.slate.light" }, "foreground": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } }
      }
    },
    "tasks": { "button-style": { "$type": "literal", "$value": "text" } },
    "text": {
      "primary": { "font-size": { "$type": "literal", "$value": "s" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.normal" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "secondary": { "font-size": { "$type": "literal", "$value": "xxs" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.normal" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h1": { "font-size": { "$type": "literal", "$value": "xl" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h2": { "font-size": { "$type": "literal", "$value": "l" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h3": { "font-size": { "$type": "literal", "$value": "m" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h4": { "font-size": { "$type": "literal", "$value": "s" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h5": { "font-size": { "$type": "literal", "$value": "xs" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "h6": { "font-size": { "$type": "literal", "$value": "xxs" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "font-family": { "$type": "inherited", "$value": "base.font-family" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } },
      "brand-primary": { "font-family": { "$type": "inherited", "$value": "components.text.primary.font-family" }, "font-size": { "$type": "literal", "$value": "s" }, "font-weight": { "$type": "inherited", "$value": "base.font-weight.semi-bold" }, "text-transform": { "$type": "literal", "$value": "none" }, "letter-spacing": { "$type": "inherited", "$value": "base.letter-spacing" } }
    },
    "text-area": { "min-height": { "$type": "literal", "$value": "3.75rem" }, "padding": { "$type": "inherited", "$value": "components.form-control.padding" } },
    "tooltip": { "foreground-color": { "$type": "inherited", "$value": "base.colors.gray.extra-light" }, "background-color": { "$type": "inherited", "$value": "base.colors.gray.extra-dark" } }
  }
}
```
