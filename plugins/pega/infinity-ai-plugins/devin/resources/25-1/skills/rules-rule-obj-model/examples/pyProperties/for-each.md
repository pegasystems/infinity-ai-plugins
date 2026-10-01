---
name: Data Transform pyProperties FOR_EACH_PAGE_IN / EXIT_FOR_EACH
description: Iterate over each page in a list. Child steps run in the context of each iterated page. EXIT_FOR_EACH breaks out of the loop early.
---

```json
{
  "pyActionName": "FOR_EACH_PAGE_IN",
  "pyPropertiesName": ".SearchResults",
  "pyUpdateSourceContext": "true",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "WHEN",
      "pyPropertiesName": ".Status==\"Found\"",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".MatchedItem",
          "pyPropertiesValue": ".Name"
        },
        {
          "pyActionName": "EXIT_FOR_EACH"
        }
      ]
    }
  ]
}
```
