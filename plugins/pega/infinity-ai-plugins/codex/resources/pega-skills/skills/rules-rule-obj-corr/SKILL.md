---
name: rules-rule-obj-corr
description: Schema and authoring guide for Pega Correspondence rules (Rule-Obj-Corr), including email and mail content templates, email view modes, and templated email configuration
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | pyCorrType | Description |
|-------|------------|-------------|
| `minimal-email-payload` | Email | Minimal email -- smallest valid create payload |
| `raw-html-email` | Email | Raw HTML source editing mode for full markup control |
| `verify-email-before-send` | Email | Requires user verification before dispatch |
| `email-with-multiple-page-contexts` | Email | References properties from multiple page contexts |
| `privilege-guarded-email` | Email | Privilege-based access control and when-condition visibility |
| `prompted-and-validated-email` | Email | pyHTMLPrompt and pyPromptValidate for user-editable correspondence |
| `basic-templated-email` | Email | Templated email with named template and template stream |
| `templated-email-with-region-content` | Email | Templated email with pyEmailRegions for named template regions |
| `email-with-mixed-include-directives` | Email | All pySourceStream directive types (sections, fragments, when, withPage) |
| `printable-mail-document` | Mail | Document-based correspondence for printed letters or PDF output |
| `attach-summary-report-to-case` | Mail | Attaches document to case instead of sending |
| `mail-with-printer-settings` | Mail | pyFormPrinter and pyFormPrintMethod references |
| `mail-with-word-template` | Mail | pyWordTemplate for Word document output |
| `generate-fax-cover-sheet` | Fax | Fax cover sheet with recipient and sender details |
| `mobile-text-notification` | PhoneText | SMS notification for mobile text messages |

## Authoring notes

- **pyStreamName**: The identifier of the rule. A valid name starts with an alphabet and contains alphabets, digits or underscores. Used, along with pyCorrType, as the identifier for this rule.
- **pyCorrType**: Must match an existing `Rule-CorrType` rule name (e.g. `"Email"`, `"Fax"`, `"Mail"`, `"PhoneText"`). The system derives `pzCorrTypeClass` from this value.
- **Email view modes** (`pyEmailViewMode`):
  - `"basic"` -- rich text editor (default for Email type)
  - `"source"` -- raw HTML source editing
  - `"templated"` -- uses a named email template; requires both `pyEmailTemplateName` and `pyEmailTemplateStream`
- **Template selection (mandatory confirmation)**: When creating a templated email (`pyEmailViewMode: "templated"`), the agent must **always** ask the user to confirm or select the email template before proceeding. Do not auto-select a template name. Retrieve available templates from the `pzGetEmailTemplates` Report Definition output, present them to the user, and let the user choose. If no templates exist, inform the user and ask whether to create a new one or use a custom template name.
- **dependentRequired**: When `pyEmailTemplateName` is present, `pyEmailTemplateStream` must also be provided.
- **pyNextAction**: Controls post-generation behavior. `"Send"` (most common), `"Verify"` (requires user review before sending), `"Attach"` (attaches to the work object without sending).
- **pySourceStream**: Contains the HTML body content. Supports Pega markup directives for dynamic content (see pySourceStream directives below).
- **pyFormSizeHoriz / pyFormSizeVert**: Editor dimensions (integer). Default `60` x `80`.
- **Mail vs Email**: Mail type correspondence (`pyCorrType: "Mail"`) typically uses `pySourceOnlyMode: true` for direct HTML editing and may set `pyVerifyCorr: true` for pre-send review. Email type always has `pyEmailViewMode` set.
- **pyPagesAndClasses**: Optional array mapping page names to class contexts. Include it when the correspondence body switches page context with `<pega:withPage>`.

## pySourceStream directives

The `pySourceStream` and `pyEmailRegions` content fields support Pega-specific XML directives for dynamic content. All referenced rules must be accessible from the correspondence rule's `pyClassName`.

### Property references

Two syntaxes for embedding property values:

- **Simple**: `<<.propertyName>>` — Resolves at runtime (e.g. `<<.pyID>>`, `<<.pyLabel>>`)
- **Formatted**: `<pega:reference name=".propertyName" format="FormatName"></pega:reference>` — Applies a display format (e.g. `format="Accel_ExpandableCheckBox"`)

### Including other rules

Use `<pega:include>` to embed content from other rules:

| type | Description | Name format | Example |
|------|-------------|-------------|---------|
| `Rule-HTML-Section` | HTML section rule | Rule name | `<pega:include name="ActivityStatusSuccess" type="Rule-HTML-Section">` |
| `Rule-HTML-Paragraph` | HTML paragraph rule | Rule name | `<pega:include name="ErrorStatus" type="Rule-HTML-Paragraph">` |
| `Rule-Obj-Corr` | Nested correspondence rule | `streamName.corrType` | `<pega:include name="pyEmailReplyTemplate_Clear.Email" type="Rule-Obj-Corr">` |
| `Rule-Corr-Fragment` | Correspondence fragment | `fragmentName.corrType` | `<pega:include name="pzUserInfo.Email" type="Rule-Corr-Fragment">` |
| `standard` | Standard include | Include name | `<pega:include name="Header.Email" type="standard"/>` |

### Conditional and context directives

- **When condition**: `<pega:when name="WhenRuleName">...content...</pega:when>` — Renders content only if the named when rule evaluates to true.
- **Page context**: `<pega:withPage name="PageName">...content...</pega:withPage>` — Switches context to a named page. Declare the page in `pyPagesAndClasses` when you need a non-primary page context.
- **Embedded page**: `<pega:withEmbedded name=".path(key)">...content...</pega:withEmbedded>` — Switches context to an embedded page using a property path expression (e.g. `.pyWorkParty($save(role))`).
- **Save variable**: `<pega:save name="varName" ref="propertyRef"></pega:save>` — Saves a property value to a variable for use in expressions (e.g. `$save(varName)`).

## Fields

Fields are categorized as: **Identity** (set at creation, identifies the rule),
**System** (managed by Pega, read-only), **Versioning** (ruleset/version info),
or **Authored** (developer-editable, the most important for create/update).

### Authored Fields

#### Core Metadata

| Field | Type | Sample Value | Description |
|-------|------|--------------|-------------|
| `pyLabel` | String | `"Order Confirmation Email"` | Required: Human-readable display label |
| `pyDescription` | String | `"Sent after order is confirmed"` | Developer-facing description |
| `pyStreamName` | String | `"OrderConfirmation"` |  Required: Uniquely identifies this Corr rule |
| `pyCorrType` | String | `"Email"` | Required: Correspondence type -- must match a `Rule-CorrType` rule name |
| `pyCategory` | String | `""` | Optional category for grouping |
| `pyUsage` | String | `""` | Usage notes |

#### Email Configuration

| Field | Type | Sample Value | Description |
|-------|------|--------------|-------------|
| `pyEmailViewMode` | String | `"basic"` | Email editing mode: `"basic"` (rich text), `"source"` (HTML), `"templated"` (template) |
| `pyEmailTemplateName` | String | `"StandardEmailTemplate"` | Template name (required when `pyEmailViewMode: "templated"`) |
| `pyEmailTemplateStream` | String | `"<template content>"` | Template stream content (required when using templated mode) |
| `pyNextAction` | String | `"Send"` | Post-generation behavior: `"Send"`, `"Verify"`, `"Attach"` |
| `pyVerifyCorr` | String (TrueFalse) | `"false"` | `"true"` to require user verification before sending |
| `pySubject` | String | `"Order Confirmation #<<.pyID>>"` | Email subject line (supports property references) |
| `pyFrom` | String | `"noreply@company.com"` | Sender email address |
| `pyTo` | String | `"<<.pyEmailAddress>>"` | Recipient email (supports property references) |
| `pyCC` | String | `""` | CC recipients |
| `pyBCC` | String | `""` | BCC recipients |

#### Content and Layout

| Field | Type | Sample Value | Description |
|-------|------|--------------|-------------|
| `pySourceStream` | String | `"<p>Dear <<.pyFirstName>>...</p>"` | HTML body content with Pega markup directives |
| `pySourceOnlyMode` | String (TrueFalse) | `"false"` | `"true"` for direct HTML editing (common for Mail type) |
| `pyFormSizeHoriz` | Number | `60` | Editor width in characters |
| `pyFormSizeVert` | Number | `80` | Editor height in characters |
| `pyEmailRegions` | Page Group / object map | *(see EmailRegions section)* | Named regions for templated emails |

#### Pages, Privileges, and References

| Field | Type | Sample Value | Description |
|-------|------|--------------|-------------|
| `pyPagesAndClasses` | Array | *(see Pages and Classes section)* | Named pages with class contexts for `<pega:withPage>` references |
| `pyPrivilegeList` | Array | *(empty)* | Access privileges required to use this correspondence |
| `pyWhensList` | Array | *(empty)* | When conditions referenced in `pySourceStream` |
| `pyHTMLPrompt` | String | `""` | Rule-HTML-Prompt rule for user-editable correspondence |
| `pyPromptValidate` | String | `""` | Validate rule for prompt validation |

#### Mail-Specific Fields

| Field | Type | Sample Value | Description |
|-------|------|--------------|-------------|
| `pyFormPrinter` | String | `"HP_LaserJet_400"` | `Rule-COS-Admin-Printer` name for mail output |
| `pyFormPrintMethod` | String | `"PrintMethodActivity"` | Activity rule that handles printing |
| `pyWordTemplate` | String | `"ContractTemplate"` | `Rule-Template-Word` name for Word document output |

## Email View Modes (`pyEmailViewMode`)

| Mode | Description | Required Additional Fields |
|------|-------------|---------------------------|
| `"basic"` | Rich text editor (default for Email type) | None |
| `"source"` | Raw HTML source editing for full markup control | `pySourceOnlyMode: true` |
| `"templated"` | Uses a named email template | `pyEmailTemplateName`, `pyEmailTemplateStream` |

### Template Selection (Mandatory Confirmation)

When creating a templated email (`pyEmailViewMode: "templated"`), the agent must **always**
ask the user to confirm or select the email template before proceeding. Do not auto-select
a template name. Retrieve available templates from the `pzGetEmailTemplates` Report Definition
output, present them to the user, and let the user choose.


## EmailRegions Structure (`pyEmailRegions`)

For templated emails, `pyEmailRegions` defines content for named regions in the template.
Represent it as an object map keyed by the template region identifier.

| Field | Type | Description |
|-------|------|-------------|
| map key | String | Region identifier matching the template region name |
| `pyRegionName` | String | Region identifier matching a region in the template |
| `pyRegionContent` | String | HTML content for the region (supports same directives as `pySourceStream`) |

---

## Pages and Classes Structure (`pyPagesAndClasses`)

Each element is an `Embed-PagesAndClasses` page:

| Field | Type | Sample | Description |
|-------|------|--------|-------------|
| `pyPagesAndClassesPage` | String | `"CustomerPage"` | Clipboard page name referenced by `<pega:withPage>` |
| `pyPagesAndClassesClass` | String | `"MyOrg-MyApp-Data-Customer"` | Class of the named page |
| `pyPagesAndClassesMode` | String | `""` | Optional mode; use `"Prompt"` only when the runtime should supply the page |

---

## Valid Values

| Field | Valid Values |
|-------|-------------|
| `pyCorrType` | `"Email"`, `"Fax"`, `"Mail"`, `"PhoneText"` (must match a `Rule-CorrType` rule) |
| `pyEmailViewMode` | `"basic"`, `"source"`, `"templated"` |
| `pyNextAction` | `"Send"`, `"Verify"`, `"Attach"` |

---

## Related Rule Types

- **`Rule-CorrType`** -- Defines correspondence types (Email, Mail, etc.)
- **`Rule-HTML-Section`** -- HTML sections included via `<pega:include>`
- **`Rule-HTML-Paragraph`** -- HTML paragraphs included via `<pega:include>`
- **`Rule-Corr-Fragment`** -- Correspondence fragments for modular content
- **`Rule-Template-Word`** -- Word templates for mail correspondence
- **`Rule-Obj-When`** -- When conditions for conditional rendering
