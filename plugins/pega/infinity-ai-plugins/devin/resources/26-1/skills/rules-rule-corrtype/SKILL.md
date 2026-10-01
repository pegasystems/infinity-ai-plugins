---
name: rules-rule-corrtype
description: Authoring guide for Pega Correspondence Type rules (Rule-CorrType), including delivery channels, address classes, and correspondence classes
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Label | Description |
|---|---|---|
| `rules-rule-corrtype/examples/stub` | Minimal Correspondence Type | Minimal correspondence type -- smallest valid create payload |
| `rules-rule-corrtype/examples/postal-mail-type` | Postal Mail Correspondence Type | Postal mail type with a data transform model applied to the correspondence class |
| `rules-rule-corrtype/examples/fax-type` | Fax Correspondence Type | Fax-based correspondence type for outbound fax delivery |
| `rules-rule-corrtype/examples/phone-text-type` | Phone/Text Correspondence Type | Phone and text message correspondence type for outbound SMS or voice delivery |

## Authoring notes

- **Classless rule type**: Rule-CorrType has no `pyClassName` -- it is not scoped to an applies-to class.
- **Key triad**: Every correspondence type requires three linked fields:
  - `pyCorrType` -- the channel name (e.g. Email, Fax, Mail, PhoneText)
  - `pyAddressClass` -- the `Data-Address-*` subclass for recipient addressing
  - `pyCorrClass` -- the `Data-Corr-*` subclass for correspondence content
- **pyCorrClassModel**: Optional. When set (e.g. `"pyDefault"`), a data transform is applied to initialize the correspondence page.
- **pyHistoryObject**: Controls whether correspondence instances are stored as history objects. Defaults to `"false"` in all OOTB instances.
- **OOTB channels**: Pega ships four correspondence types -- Email, Fax, Mail, PhoneText -- all in the `Pega-ProCom` ruleset.
