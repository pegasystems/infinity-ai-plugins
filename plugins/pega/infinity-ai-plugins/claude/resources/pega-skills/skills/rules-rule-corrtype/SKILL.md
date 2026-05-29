---
name: rules-rule-corrtype
description: Schema and authoring guide for Pega Correspondence Type rules (Rule-CorrType), including delivery channels, address classes, and correspondence classes
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|-------|-------------|
| `Minimal Correspondence Type` | Minimal correspondence type -- smallest valid create payload |
| `Postal Mail Correspondence Type` | Postal mail type with a data transform model applied to the correspondence class |
| `Fax Correspondence Type` | Fax-based correspondence type for outbound fax delivery |
| `Phone/Text Correspondence Type` | Phone and text message correspondence type for outbound SMS or voice delivery |

## Authoring notes

- **Classless rule type**: Rule-CorrType has no `pyClassName` -- it is not scoped to an applies-to class.
- **Key triad**: Every correspondence type requires three linked fields:
  - `pyCorrType` -- the channel name (e.g. Email, Fax, Mail, PhoneText)
  - `pyAddressClass` -- the `Data-Address-*` subclass for recipient addressing
  - `pyCorrClass` -- the `Data-Corr-*` subclass for correspondence content
- **pyCorrClassModel**: Optional. When set (e.g. `"pyDefault"`), a data transform is applied to initialize the correspondence page.
- **pyHistoryObject**: Controls whether correspondence instances are stored as history objects. Defaults to `"false"` in all OOTB instances.
- **pyRuleName and pyCorrType**: Typically identical. Both identify the correspondence channel.
- **OOTB channels**: Pega ships four correspondence types -- Email, Fax, Mail, PhoneText -- all in the `Pega-ProCom` ruleset.
