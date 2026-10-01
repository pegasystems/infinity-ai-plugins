---
name: "Data Reference Chain"
description: "Safe workflow index for creating a Data Reference field chain. Includes Infinity 24/25-compatible template-view wiring and Infinity 26+ ObjectReference routing, while deferring data page payload details to extracted/live Pega guidance."
---

# Data Reference Chain

Use this when a parent view must select or display a related data record. Use the
DataReference template-view pattern for Infinity 24/25 compatibility. Use
ObjectReference only when the target environment is Infinity 26 or later.

## Rule Chain

1. Data class: create or verify with `rules-rule-obj-class`.
2. Data-class properties: create or verify with `rules-rule-obj-property`.
3. Data page: create or verify separately; see `rules-rule-declare-pages` and note
   the known API create caveats there.
4. DataReference UI pattern:
   - Single-select search box: `rules-rule-ui-view/examples/data-reference-autocomplete-view`
   - Multi-select table picker: `rules-rule-ui-view/examples/data-reference-table-select-view`
   - Readonly display link: `rules-rule-ui-view/examples/data-reference-readonly-view`
   - Infinity 26+ direct ObjectReference: `rules-rule-ui-view/examples/append/object-reference-data-reference-field`
5. Parent Page/PageList property:
   - Single-select: `rules-rule-obj-property/examples/page`
   - Multi-select: `rules-rule-obj-property/examples/page-list`
6. Parent view append:
   - Template-view pattern: `rules-rule-ui-view/examples/append/data-reference-field`
   - Infinity 26+ ObjectReference: `rules-rule-ui-view/examples/append/object-reference-data-reference-field`

## Required References

- `rules-rule-ui-view/references/data-field-decision-tree`
- `rules-rule-ui-view/references/path-b-data-reference`
- `rules-rule-ui-view/references/view-template-patterns`
- `rules-rule-ui-view/examples/pyContent/data-reference`
- `rules-rule-ui-view/examples/pxViewMetadata/data-reference`
- `rules-rule-ui-view/examples/pyContent/object-reference-data-reference` (Infinity 26+ only)
- `rules-rule-ui-view/examples/pxViewMetadata/object-reference-data-reference` (Infinity 26+ only)

## Verification

- Data page exists and returns the data class rows expected by the template view.
- Template-view pattern: DataReference template view has `pyTemplateName: "DataReference"` and
  `pxViewType: "datareference"`.
- Parent property exists and points to the data class.
- Parent view `pyContent` contains `Pega-UI-Content-Field-Data-Reference`.
- Template-view pattern: parent view `pxContextMetadata.$views` contains the DataReference template view.
- ObjectReference pattern: parent view `pyContent` contains `pyComponentName: "ObjectReference"`.
- ObjectReference pattern: parent view `pxContextMetadata.$classesmetadata` contains
  the data class and `$pagelists` contains the data page.
