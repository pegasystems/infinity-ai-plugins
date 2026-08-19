---
name: "Embedded Data Chain"
description: "Safe workflow index for creating an Embedded Data field chain. Links to verified fragments and append examples without inventing full live Pega output."
---

# Embedded Data Chain

Use this when a parent view must render a Page or PageList object inline through an
embedded sub-view.

## Rule Chain

1. Data class: create or verify with `rules-rule-obj-class`.
2. Data-class properties: create or verify with `rules-rule-obj-property`.
3. Sub-view on the data class: create a `Rule-UI-View` using the target fields.
4. Parent Page/PageList property: use `rules-rule-obj-property/examples/page` or
   `rules-rule-obj-property/examples/page-list`.
5. Parent view append: use `rules-rule-ui-view/examples/append/embedded-data-field`.

## Required References

- `rules-rule-ui-view/references/data-field-decision-tree`
- `rules-rule-ui-view/references/path-a-embedded-data`
- `rules-rule-ui-view/examples/pyContent/embedded-data`
- `rules-rule-ui-view/examples/pxViewMetadata/embedded-data`
- `rules-rule-ui-view/examples/append/embedded-data-field`

## Verification

- Parent property exists and points to the data class.
- Sub-view exists and renders the data-class properties.
- Parent view `pyContent` contains `Pega-UI-Content-Field-Data-Embedded`.
- Parent view `pxViewMetadata` has a `reference` child for the sub-view.
- Parent view `pxContextMetadata.$views` contains the sub-view entry.
