---
name: Theme Definition Token Inventory
description: Confirmed base/components token structure inside pyDefinition, covering both the flat literal shape and the $type/$value token shape observed across live Rule-UI-Theme instances.
---

# Theme Definition Token Inventory

Two distinct `pyDefinition` shapes have been confirmed on live `Rule-UI-Theme` instances. Always fetch the live instance first to see which shape it uses, and preserve that shape — do not convert between them.

1. **Flat literal shape** — every token is its raw value directly (e.g. `"border-radius": "0.75rem"`). Confirmed on `RULE-UI-THEME PZAURIGA #...` and a second instance — see `theme-pydefinition-flat-sample`.
2. **`$type`/`$value` token shape** — every leaf token is `{"$type": "literal", "$value": <value>}` or `{"$type": "inherited", "$value": "<dot.path.to.another.token>"}` (an alias that resolves to another token's current value). A leaf may also carry an optional `$constant` (boolean) or `$comment` (string) sibling key alongside `$type`/`$value`; both are metadata only and are stripped when the runtime resolves the token, so preserve them if present but never treat them as themselves needing a value. This is the more complete shape and is the one to use as the authoritative key catalogue — see `theme-pydefinition-token-shape-sample` for the full confirmed payload.

Both shapes agree on core keys (`border-radius`, `font-family`, `spacing`, `palette.*`, `button`, `card`, `table`, etc.); the `$type`/`$value` sample additionally confirms many more `base` and `components` keys not present in the flat samples.

This inventory and the full payload in `theme-pydefinition-token-shape-sample`
were verified key-for-key against the published upstream Constellation/Cosmos
design-token contract from the `@pega/cosmos-react-core` package, which is the
default theme definition consumed by `ThemeMachine` at runtime. Treat
`theme-pydefinition-token-shape-sample` as the authoritative local reference for
key names, default values, and the leaf shape
(`$type`/`$value`/`$constant`/`$comment`); treat live
`get-rule(detail="full")` results as authoritative for which keys are actually
present, overridden, and populated on a given theme instance.

## `base` — global tokens

- `colors`: primitive color ramp — `white`, `black` (single value each), and `gray`, `slate`, `red`, `orange`, `green`, `blue`, `purple`, `yellow` (each with `extra-light`, `light`, `medium`, `dark`, `extra-dark`)
- `palette`: semantic aliases, mostly `inherited` references into `colors` or other `palette` entries — `ai`, `app-background`, `app-foreground`, `primary-background`, `secondary-background`, `foreground-color`, `brand-primary`, `brand-secondary`, `brand-accent`, `brand-background`, `brand-foreground`, `urgent`, `warn`, `success`, `pending`, `info`, `interactive`, `border-line`, `skeleton`, `light`, `dark`, `background-color`, `supplemental-colors.color-1..8` (literal hex)
- `font-family`, `font-size`, `font-scale`, `font-stretch`, `letter-spacing`, `line-height`, `scale`
- `font-weight`: `bold`, `semi-bold`, `normal` (numeric weights)
- `border-radius`, `spacing`
- `hit-area`: `compact`, `compact-min`, `mouse`, `mouse-min`, `finger`, `finger-min`
- `custom-scrollbar`
- `animation`: `speed`, `timing.{ease,ease-out,ease-in}`
- `transparency`: `transparent-1..5`
- `disabled-opacity` (inherits `transparency.transparent-4`)
- `shadow`: `high`, `low`, `high-filter`, `low-filter`, `focus`, `focus-group`, `focus-group-inset`, `focus-inset`, `focus-solid`, `focus-filter`
- `z-index`: `popover`, `drawer`, `modal`, `alert`, `backdrop`, `toast`, `tooltip`, `max`
- `breakpoints`: `xs`, `sm`, `md`, `lg`, `xl`
- `content-width`: `xs`, `sm`, `md`, `lg`, `xl`
- `icon-set`, `icon-fill`, `case-type-colors`, `css`

## `components` — per-component overrides

Confirmed top-level component keys (each nests further, e.g. into pseudo-states like `:hover`/`:focus`/`:disabled`, or sub-parts):

`agent` (incl. `user-message`, `coach-message.avatar`, `history.item`, `questionnaire`), `app-shell` (`nav` incl. `expand-button.{background,foreground-color}`, `header` incl. `search-input`), `case-view` (`header`, `icon`, `summary`, `utilities`, `assignments`, `stages.status.{completed,current,pending}`), `announcement`, `avatar`, `badges` (`status`, `tag`, `count`, `alert`, `keyboard`), `banner` (`urgent`, `warning`, `success`, `ai`, `info`), `button` (incl. `touch`), `card`, `checkbox`, `field-group-list`, `field-value-list`, `details`, `form-control` (incl. `:hover`, `:active`, `:focus`, `:disabled`, `:read-only`), `form-field`, `input`, `icon` (`size`, `border-radius-multiplier`), `interaction-timer` (`sla.{goal,deadline,past-deadline}`), `label`, `link`, `modal`, `popover`, `lifecycle` (`task`, `stage.{start,default,resolution,alternate}`), `mark`, `multi-step-form`, `progress`, `qr-code` (`size.{s,m,l}`), `radio-check` (incl. `:checked`), `radio-button`, `rating`, `search-input`, `select`, `sentiment` (`positive`, `negative`, `neutral`), `shortcuts`, `summary-item`, `switch` (`off`, `on`), `tabs`, `table` (`typography`, `header`, `body`, `border`, `spacing`), `task-manager.task-icon` (`banner`, `action`, `task-drawer`, `wrap-up`, `suggested`, `queued`, `in-progress`, `resolved`), `tasks`, `text` (`primary`, `secondary`, `h1`–`h6`, `brand-primary`), `text-area`, `tooltip`.

## How to use this inventory

- Treat this as a confirmed floor, not an exhaustive ceiling — other component keys may exist in other themes or platform versions. Confirm with `get-rule(detail="full")` before assuming a key not listed here exists.
- When updating a token, parse `pyDefinition` as JSON, change only the requested key inside `base` or `components`, and re-serialize the full object back — see `theme-pydefinition-merge-pattern`.
- Color values are hex strings or CSS `linear-gradient(...)` expressions; some component overrides reference CSS custom properties (e.g. `var(--gradient-start)`).
- Value types and units may vary by theme and are not guaranteed to be fixed for a given key. For example, `button.border-radius` may be a bare number (`3` or `9999`) or a decimal (`0.5`), while `button.height`, `select.height`, and `input.height` may use values such as `"44px"`, `"2rem"`, or `"2.5rem"` depending on the theme. In the `$type`/`$value` shape, a token may be either a `"literal"` value or an `"inherited"` alias to another token path. Preserve the existing value's type, unit, and shape when editing a token. Do not normalize units or convert between `inherited` and `literal` unless the user explicitly requests it.
