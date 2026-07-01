---
description: "Pega standard library for filtering, sorting, counting, and aggregating PageList and PageGroup collections"
---
# Collection Operations

Reusable Pega assets for working with PageLists, PageGroups, and other collections.

## Category Scope

- Filtering a PageList by criteria
- Sorting a PageList by property
- Iterating over a PageList or PageGroup
- Aggregating values (sum, count, average, min, max)
- Adding and removing items from a PageList or PageGroup
- Copying and merging PageLists
- Searching within a PageList
- PageGroup key-based lookups
- Measuring collection size and position

## Bootstrap Hints

To populate this file during bootstrap:
- Search for `@baseclass` activities related to page and list operations
- Look for activities like `pxSortPageList`, `AppendToPageGroup`, `RemoveFromPageGroup`
- Search for `PageList` and `PageGroup` related utility methods in the `Utilities` and
  `Page` libraries
- Search for `Rule-Alias-Function` on `@baseclass` with "PageList" in the name
- Search for `Rule-Obj-When` rules on `@baseclass` related to list position/size
- Inspect Data Transform actions that operate on lists (append, remove, for-each)
- Look for Declare Expression aggregation types (SUM, COUNT, MAX, MIN, AVG)

---

## Function Alias Reference

Several `Utilities` library functions have `@baseclass` Function Alias
(`Rule-Alias-Function`) shortcuts for use in When rules and expression conditions.

**Available aliases:**

| Alias | Pattern | Underlying Function |
|---|---|---|
| `@pxValueIsInPageList()` | "{3} contains a page where {2} equals {1}" | `Utilities.IsInPageList(String, String, ClipboardProperty)` |
| `@pxValueIsNotInPageList()` | "{3} does not contain a page where {2} equals {1}" | `Utilities.pxIsNotInPageList(String, String, ClipboardProperty)` |
| `@pxIsInListOfValuesInPageList()` | -- | `Utilities.pxIsInListOfValuesInPageList(...)` |
| `@pxIsNotInListOfValuesInPageList()` | -- | inverse of above |
| `@pxIsInListOfValuesWCBInPageList()` | -- | wildcard variant |
| `@pxIsNotInListOfValuesWCBInPageList()` | -- | inverse wildcard variant |
| `@pxIsInPageListWhen()` | -- | `Utilities.IsInPageListWhen(...)` |
| `@pxHasPagesCountInPageListWhen()` | -- | `Utilities.pxHasPagesCountInPageListWhen(...)` |
| `@pxPageListLengthCompare()` | -- | `Page.pxPageListLengthCompare(...)` |

**Important:** These aliases are designed for use in When rule conditions and expression
conditions (boolean context). They are not general-purpose data extraction functions.
All return `boolean`. Use the fully-qualified syntax for the underlying utility functions
when you need direct programmatic access.

---

## Known Items

### Check if a PageList contains a value

- **How:** `@pxValueIsInPageList(lookFor, lookAt, lookIn)` function alias
  (`Rule-Alias-Function` on `@baseclass`), which calls
  `@(Pega-RULES:Utilities).IsInPageList(lookFor, lookAt, lookIn)`
- **Where:** When rules, expressions (boolean context), Data Transform conditions
- **Example:** `@pxValueIsInPageList("Active", "pyStatus", .pyLineItems)` -- returns
  `true` if any page in `.pyLineItems` has `.pyStatus == "Active"`
- **Notes:** Parameters: `lookFor` (String -- value to find), `lookAt` (String --
  property name to check on each page, unquoted property reference), `lookIn`
  (ClipboardProperty -- the PageList). The pattern reads: "{lookIn} contains a page
  where {lookAt} equals {lookFor}". Availability: Final. RuleSet: Pega-WB 08-02-01.
  The comparison is case-sensitive and uses string equality.
- **Status:** *(validated)*

### Check if a PageList does NOT contain a value

- **How:** `@pxValueIsNotInPageList(lookFor, lookAt, lookIn)` function alias
  (`Rule-Alias-Function` on `@baseclass`), which calls
  `@(Pega-RULES:Utilities).pxIsNotInPageList(lookFor, lookAt, lookIn)`
- **Where:** When rules, expressions (boolean context), Data Transform conditions
- **Example:** `@pxValueIsNotInPageList("Closed", "pyStatus", .pyLineItems)` --
  returns `true` if no page in `.pyLineItems` has `.pyStatus == "Closed"`
- **Notes:** Parameters are identical to `@pxValueIsInPageList` -- `lookFor` (String),
  `lookAt` (String), `lookIn` (ClipboardProperty). The pattern reads: "{lookIn} does not
  contain a page where {lookAt} equals {lookFor}". Availability: Final. RuleSet:
  Pega-WB 08-02-01. This is the logical inverse of `pxValueIsInPageList`.
- **Status:** *(validated)*

### Check if a value is in a list of values in a PageList

- **How:** `@pxIsInListOfValuesInPageList(lookAt, listOfValues, lookIn)` function
  alias (`Rule-Alias-Function` on `@baseclass`), which calls
  `@(Pega-RULES:String).pxIsInListOfValues(lookAt, listOfValues, lookIn)`
- **Where:** When rules, expressions (boolean context)
- **Example:** `@pxIsInListOfValuesInPageList("pyStatus", "Active,Pending",
  .pyLineItems)` -- returns `true` if any page in `.pyLineItems` has `pyStatus`
  matching any value in the comma-delimited list
- **Notes:** Parameters: `lookAt` (Freeform -- property name to get value of),
  `listOfValues` (Freeform -- comma-delimited list of values to compare against),
  `lookIn` (Freeform -- the PageList property to look in). The pattern reads:
  "{lookIn} contains a page where {lookAt} is in {listOfValues}". Underlying
  function is in the `String` library (`Pega-RULES` ruleset). A wildcard-capable
  variant exists as `@pxIsInListOfValuesWCBInPageList()`. Inverse variants:
  `@pxIsNotInListOfValuesInPageList()` and `@pxIsNotInListOfValuesWCBInPageList()`.
  Availability: Final. RuleSet: Pega-RulesEngine 08-02-01.
- **Status:** *(validated)*

### Check if a PageList contains pages matching a When condition

- **How:** `@pxIsInPageListWhen(whenName, lookIn)` function alias
  (`Rule-Alias-Function` on `@baseclass`), which calls
  `@(Pega-RULES:Utilities).IsInPageListWhen(whenName, lookIn)`
- **Where:** When rules, expressions (boolean context)
- **Example:** `@pxIsInPageListWhen("IsHighPriority", .pyLineItems)` -- returns
  `true` if any page in `.pyLineItems` satisfies the `IsHighPriority` When rule
- **Notes:** Parameters: `whenName` (HTMLProperty -- When rule name to evaluate on
  each page), `lookIn` (Freeform -- PageList property to look in). The pattern reads:
  "{lookIn} contains a page where {whenName} evaluates to true". Unlike
  `pxValueIsInPageList` which does simple property-value equality, this variant
  evaluates a When rule against each page in the list. More flexible but slower for
  simple checks. Availability: Final. RuleSet: Pega-RulesEngine 08-04-01.
- **Status:** *(validated)*

### Check if a PageList has a specific count of matching pages

- **How:** `@pxHasPagesCountInPageListWhen(whenName, lookIn, countToCheck,
  comparator)` function alias (`Rule-Alias-Function` on `@baseclass`), backed by
  `@(Pega-RULES:Utilities).pxHasPagesCountInPageListWhen(whenName, lookIn,
  countToCheck, "comparator")` utility function
- **Where:** When rules, expressions (boolean context)
- **Example:** `@pxHasPagesCountInPageListWhen("IsHighPriority", .pyLineItems, 3,
  ">=")` -- returns `true` if `.pyLineItems` has at least 3 pages matching the
  `IsHighPriority` When rule
- **Notes:** Parameters: `whenName` (HTMLProperty -- When rule name), `lookIn`
  (Freeform -- PageList property), `countToCheck` (Textbox -- numeric threshold,
  default "1"), `comparator` (Values -- comparison operator). The pattern reads:
  "{lookIn} contains pages with count {comparator} {countToCheck} where {whenName}
  evaluates to true". Combines the "count" and "When condition" patterns. Both the
  function alias and the underlying utility function exist. Availability: Final.
  RuleSet: Pega-RulesEngine 08-05-01.
- **Status:** *(validated)*

### Case-insensitive PageList value check

- **How:** `@(Pega-NLP:NLPUtilities).pxIsInPageListIgnoreCase(lookFor, lookAt, lookIn)`
  utility function (`Rule-Utility-Function` in `NLPUtilities` library, `Pega-NLP`
  ruleset)
- **Where:** Activities (Java steps), Data Transforms, expressions
- **Example:** `@(Pega-NLP:NLPUtilities).pxIsInPageListIgnoreCase("active", "pyStatus",
  .pyLineItems)` -- returns `true` if any page has `pyStatus` matching "active"
  case-insensitively
- **Notes:** Parameters: `lookFor` (String -- value to look for), `lookAt` (String --
  property name to look at), `lookIn` (ClipboardProperty -- PageList to look in).
  Same signature as `IsInPageList` but with case-insensitive comparison using
  `equalsIgnoreCase()`. Iterates via `Iterator` over the PageList, gets each page,
  checks `getIfPresent(lookAt)` with null guard. From the NLP module but usable as a
  general-purpose function. No `@baseclass` alias exists -- must use the
  fully-qualified syntax. Availability: Final. RuleSet: Pega-NLP 08-03-01.
- **Status:** *(validated)*

### Compare PageList length

- **How:** `@pxPageListLengthCompare(pageListProp, comparator, compareValue)` function
  alias (`Rule-Alias-Function` on `@baseclass`), which calls
  `@(Pega-RULES:Page).pxPageListLengthCompare(pageListProp, "comparator",
  compareValue)`
- **Where:** When rules, expressions (boolean context)
- **Example:** `@pxPageListLengthCompare(.pyLineItems, ">", 5)` -- returns `true` if
  `.pyLineItems` has more than 5 pages
- **Notes:** Parameters: `pageListProp` (Freeform -- a PageList property),
  `comparator` (Values -- one of `Less Than|<`, `Greater Than|>`, `Equal To|=`),
  `compareValue` (Freeform -- numeric value to compare against). The pattern reads:
  "length of {pageListProp} is {comparator} {compareValue}". The underlying function
  is in the `Page` library (`Pega-RULES` ruleset), not the `Utilities` library.
  Availability: Final. RuleSet: Pega-WB 08-01-01.
- **Status:** *(validated)*

### Get the length of a PageList

- **How:** `@(Pega-RULES:Utilities).LengthOfPageList(PageList)` utility function
  (`Rule-Utility-Function` in `Utilities` library, `Pega-RULES` ruleset)
- **Where:** Expressions, Data Transforms, When rules, Activities
- **Example:** `@(Pega-RULES:Utilities).LengthOfPageList(.pyLineItems)` -- returns the
  integer count of pages in `.pyLineItems`
- **Notes:** Parameters: `PageList` (ClipboardProperty -- the PageList to measure).
  Returns `int`. Java implementation: `if(PageList != null) return PageList.size();
  else return 0;` -- returns 0 for null/non-existent PageList. No `@baseclass` alias
  exists -- must use the fully-qualified syntax. This is the foundational function
  used internally by several When rules (e.g., `pxIsLastItemInPagelist`,
  `pxHasMultipleItemsInList`). Availability: Yes. RuleSet: Pega-RULES 08-01-01.
- **Status:** *(validated)*

### Get the current page index within a PageList iteration

- **How:** `@(Pega-RULES:Utilities).pxGetActiveIndex(myStepPage)` or
  `@(Pega-RULES:Utilities).getActiveIndex(myStepPage)` utility function
- **Where:** Expressions inside Data Transform For-Each loops, Activities with page
  iteration
- **Example:** Inside a For-Each over `.pyLineItems`, use
  `@(Pega-RULES:Utilities).pxGetActiveIndex(myStepPage)` to get the 1-based index of
  the current page
- **Notes:** Parameters: `myStepPage` (ClipboardPage -- the current page in
  iteration). Returns `int`. Java implementation: checks `myStepPage != null`, then
  calls `myStepPage.getParentProperty().indexOf()` to get the index; returns `-1` if
  page is null. Two variants exist: `pxGetActiveIndex` (Pega-RulesEngine ruleset) and
  the older `getActiveIndex` (Pega-ProcessCommander ruleset). Both return the 1-based
  integer index of the page within its parent list. Availability: Final. RuleSet:
  Pega-RulesEngine 08-01-01.
- **Status:** *(validated)*

### Get the parent PageList property of a page

- **How:** `@(Pega-RULES:Utilities).pxGetParentListProperty(myStepPage)` utility
  function (`Rule-Utility-Function` in `Utilities` library)
- **Where:** Activities, Data Transforms, expressions inside iteration
- **Example:** `@(Pega-RULES:Utilities).pxGetParentListProperty(myStepPage)` -- returns
  the ClipboardProperty reference of the PageList that contains `myStepPage`
- **Notes:** Parameters: `myStepPage` (ClipboardPage -- page to get list parent
  property of). Returns `ClipboardProperty`. Java implementation: checks
  `myStepPage != null`, then calls `myStepPage.getParentProperty()` to get the
  container, then `cpContainer.getParentProperty()` to get the list property; returns
  `null` if page is null or not embedded in a list. Useful for writing generic
  iteration logic that needs to access the parent list from within a loop (e.g.,
  comparing current index to total length). Availability: Final. RuleSet:
  Pega-RulesEngine 08-04-01.
- **Status:** *(validated)*

### Check if current page is first in a PageList

- **How:** `pxIsFirstElementInPageList` When rule (`Rule-Obj-When` on `@baseclass`)
- **Where:** When conditions in Data Transforms, UI visibility conditions, flow actions
- **Example:** Use `pxIsFirstElementInPageList` as a When condition inside a For-Each
  Data Transform to apply special logic only to the first item
- **Notes:** Internally evaluates
  `@(Pega-RULES:ExpressionEvaluators).compareTwoValues(@pxGetActiveIndex(myStepPage),
  "=", 1)` -- checks whether the current page index equals 1 using the
  `CompareTwoValues` function. The When condition structure uses a simple condition
  (`pySimpleCondition: true`) with logic label "A". Availability: Final. RuleSet:
  Pega-RulesEngine 08-01-01.
- **Status:** *(validated)*

### Check if current page is last in a PageList

- **How:** `pxIsLastItemInPagelist` When rule (`Rule-Obj-When` on `@baseclass`)
- **Where:** When conditions in Data Transforms, UI visibility conditions, flow actions
- **Example:** Use `pxIsLastItemInPagelist` as a When condition inside a For-Each to
  apply special logic to the last item (e.g., suppress a trailing comma or separator)
- **Notes:** Internally evaluates
  `@(Pega-RULES:Utilities).LengthOfPageList(@(Pega-RULES:Utilities).pxGetParentListProperty(myStepPage))
  == @(Pega-RULES:Utilities).getActiveIndex(myStepPage)`. Checks whether the current
  index equals the total list length. Availability: Final. RuleSet:
  Pega-SystemArchitect 08-04-01. Created by Mike Degatano.
- **Status:** *(validated)*

### Check if a PageList has multiple items

- **How:** `pxHasMultipleItemsInList` When rule (`Rule-Obj-When` on `@baseclass`)
- **Where:** When conditions in Data Transforms, UI visibility conditions
- **Example:** Use `pxHasMultipleItemsInList` as a When condition to show a "Compare"
  button only when there are at least 2 items in a list
- **Notes:** Internally evaluates
  `@(Pega-RULES:Utilities).LengthOfPageList(@(Pega-RULES:Utilities).pxGetParentListProperty(myStepPage))
  > 1`. Usage text: "Used to check if there are more than one item in the parent page
  list property". Availability: Final. RuleSet: Pega-SystemArchitect 08-04-01.
  Description: "Checks if there are multiple items in the parent pagelist property".
- **Status:** *(validated)*

### Sort a PageList

- **How:** `@(Pega-RULES:Utilities).pxSortPageList(aPageList, aSortByProperty)` utility
  function (`Rule-Utility-Function` in `Utilities` library). Two overloads exist:
  1. `pxSortPageList(ClipboardProperty, String)` -- sort by property (defaults to
     ascending). Java implementation: delegates to
     `pxSortPageList(aPageList, aSortByProperty, "asc")`
  2. `pxSortPageList(ClipboardProperty, String, String)` -- sort with explicit
     direction ("asc" or "desc")
- **Where:** Activities (Java steps), Data Transforms (set step calling the function)
- **Example:** `@(Pega-RULES:Utilities).pxSortPageList(.pyLineItems, "pyAmount")` --
  sorts `.pyLineItems` by `pyAmount` in ascending order (default)
- **Notes:** Parameters (2-arg overload): `aPageList` (ClipboardProperty -- the
  PageList), `aSortByProperty` (String -- property name to sort by). Returns
  `boolean`. Availability: Final. RuleSet: Pega-RulesEngine 08-01-01. No `@baseclass`
  function alias exists -- use the fully-qualified syntax. The seeded `@sortPageList`
  and `@filterPageList` aliases do **not** exist in Pega.
- **Status:** *(validated)*

### Remove empty pages from a PageList

- **How:** `@(Pega-RULES:Utilities).pxRemoveEmptyPagesFromPageList(myStepPage,
  thePageList, thePropertyToCheck)` utility function (`Rule-Utility-Function` in
  `Utilities` library)
- **Where:** Activities (Java steps), Data Transforms
- **Example:**
  `@(Pega-RULES:Utilities).pxRemoveEmptyPagesFromPageList(MyPage, ".pxResults",
  ".pyLabel")` -- removes each subpage in `MyPage.pxResults()` where `pyLabel` is
  blank
- **Notes:** Parameters: `myStepPage` (ClipboardPage), `thePageList` (String --
  usually ".pxResults", but any PageList property reference), `thePropertyToCheck`
  (String -- usually ".pyLabel" or similar). Returns `void`. Java implementation:
  iterates in reverse (`for(int i = pageList.size(); i > 0; i--)`) and removes pages
  where `cPage.getString(thePropertyToCheck).length()==0`. Note: does not do input
  formatting, so whitespace-only values like `"   "` are not considered empty.
  Availability: Final. RuleSet: Pega-RulesEngine 08-01-01. No `@baseclass` alias
  exists.
- **Status:** *(validated)*

### Append a page to a PageList (Data Transform)

- **How:** Use the **Append** action in a Data Transform (`Rule-Obj-DataTranform`)
- **Where:** Data Transforms
- **Example:** In a Data Transform, add an Append step targeting `.pyLineItems`. This
  creates a new page at the end of the list. Use subsequent Set steps under the Append
  to populate the new page's properties.
- **Notes:** The Append action is a built-in Data Transform action, not a standalone
  rule -- it cannot be discovered via `search-rules`. There is no `pxAppendPage`
  activity or function in Pega (the seeded entry was incorrect). For Activities, use
  the `Page-New` method to create a page and property-set methods to add it to a list.
  For PageGroups, use the `AppendToPageGroup` activity (see below).
- **Status:** *(validated -- built-in DT action, confirmed by absence in search)*

### Remove a page from a PageList (Data Transform)

- **How:** Use the **Remove** action in a Data Transform (`Rule-Obj-DataTranform`)
- **Where:** Data Transforms
- **Example:** In a Data Transform, add a Remove step targeting
  `.pyLineItems(<CURRENT>)` inside a For-Each loop to remove the current page based on
  a condition.
- **Notes:** The Remove action is a built-in Data Transform action, not a standalone
  rule. To remove by index outside of iteration, use `.pyLineItems(3)` to remove the
  3rd page. For removing empty pages programmatically, see
  `pxRemoveEmptyPagesFromPageList` above.
- **Status:** *(validated -- built-in DT action)*

### Iterate over a PageList (Data Transform)

- **How:** Use the **For Each** action in a Data Transform (`Rule-Obj-DataTranform`)
- **Where:** Data Transforms
- **Example:** In a Data Transform, add a For-Each step targeting `.pyLineItems`. Steps
  nested inside the For-Each execute for every page in the list. Use `myStepPage` to
  reference the current page.
- **Notes:** The For-Each action is a built-in Data Transform action. Inside the loop,
  `myStepPage` refers to the current page. You can use `pxGetActiveIndex(myStepPage)`
  to get the 1-based position, `pxIsFirstElementInPageList` and
  `pxIsLastItemInPagelist` When rules for boundary conditions. For Activity-based
  iteration, use a Loop shape or Java step iterating over the ClipboardProperty.
- **Status:** *(validated -- built-in DT action)*

### Update a property on every page in a PageList (Data Transform)

- **How:** Use a **For Each** action wrapping a **Set** step in a Data Transform
- **Where:** Data Transforms
- **Example:** For-Each over `.pyLineItems`, set `.pyTaxAmount` to
  `.pyAmount * 0.1` on each page
- **Notes:** This is the standard pattern for bulk property updates. The For-Each
  provides the iteration context; Set steps inside operate on each page. For
  conditional updates, add a When condition to the Set step. This replaces the need
  for any custom "update all" function.
- **Status:** *(validated -- built-in DT pattern)*

### Append a page to a PageGroup

- **How:** `AppendToPageGroup` activity (`Rule-Obj-Activity` on `@baseclass`)
- **Where:** Activities
- **Example:** Call the `AppendToPageGroup` activity with parameters:
  `PageGroupProperty=".pyItems"`, `Subscript="NewKey"`,
  `ClassName="Data-MyClass"` to add a new page keyed as "NewKey"
- **Notes:** Parameters (7): `PageGroupProperty` (String, required -- name of
  property containing the PageGroup), `BaseReference` (String, required -- base
  reference for the page group, blank assumes primary page), `ClassName` (String,
  required -- class to use for the new page), `Model` (String, optional -- model to
  apply, defaults to "pyDefault"), `Subscript` (String, required -- subscript key for
  the new page), `PageName` (String, optional -- page name for the
  PageGroupProperty), `FinishingActivity` (String, optional -- activity to run at the
  end). Activity has 3 steps: (1) sets default Model to "pyDefault" if blank, (2)
  Java step creates the page and appends it to the group, (3) optionally calls the
  finishing activity. Availability: Final. RuleSet: Pega-ProCom 08-06-01.
- **Status:** *(validated)*

### Remove a page from a PageGroup

- **How:** `RemoveFromPageGroup` activity (`Rule-Obj-Activity` on `@baseclass`)
- **Where:** Activities
- **Example:** Call the `RemoveFromPageGroup` activity with parameters:
  `PageGroupProperty=".pyItems"`, `Subscript="OldKey"` to remove the page keyed as
  "OldKey"
- **Notes:** Parameters (5): `PageGroupProperty` (String, required -- name of
  property containing the PageGroup), `BaseReference` (String, optional -- base
  reference, blank uses primary page), `Subscript` (String, required -- subscript key
  of the page to delete), `FinishingActivity` (String, required -- activity to run
  after removal, blank to skip), `PageName` (String, optional -- page name). Activity
  has 2 steps: (1) Java step resolves the page group property (handling base
  references with `.` prefix) and calls `aPageGroup.remove(Subscript)`, (2)
  optionally calls the finishing activity (precondition:
  `param.FinishingActivity==""`). Availability: Final. RuleSet: Pega-ProCom 08-01-01.
- **Status:** *(validated)*

### Look up a subscript (key) in a PageGroup

- **How:** `@(Pega-RULES:Utilities).pxSubscriptInPageGroup(lookFor, lookAt, lookIn)`
  utility function (`Rule-Utility-Function` in `Utilities` library)
- **Where:** Activities (Java steps), Data Transforms, expressions
- **Example:** `@(Pega-RULES:Utilities).pxSubscriptInPageGroup("Active", "pyStatus",
  .pyItems)` -- returns the subscript key of the first page in the PageGroup where
  `pyStatus` equals "Active"
- **Notes:** Parameters: `lookFor` (String -- value to look for), `lookAt` (String --
  property name to look at), `lookIn` (ClipboardProperty -- PageGroup to look in).
  Returns `String` -- the subscript key of the first matching page, or empty string
  if no match found. Java implementation: iterates via `Iterator`, checks
  `getIfPresent(lookAt)` with null guard, uses `equals()` (case-sensitive, not
  `equalsIgnoreCase`), and reads `pxSubscript` from the matching page. Similar to
  `IsInPageList` but operates on PageGroups and returns the key rather than a boolean.
  Availability: Final. RuleSet: Pega-RulesEngine 08-01-01.
- **Status:** *(validated)*

### Aggregate values in a PageList (Declare Expression)

- **How:** Use a **Declare Expression** (`Rule-Declare-Expression`) with an aggregation
  function: `SUM`, `COUNT`, `MAX`, `MIN`, or `AVG`
- **Where:** Declare Expressions (declarative rules)
- **Example:** Create a Declare Expression on `.pyTotalAmount` that computes
  `SUM(.pyLineItems.pyAmount)` -- automatically recalculates whenever any
  `.pyLineItems.pyAmount` changes
- **Notes:** Declare Expressions are the preferred Pega pattern for computed aggregates
  because they are declarative -- the engine automatically recomputes the target
  property when source values change. Available aggregation types: `SUM` (total),
  `COUNT` (number of items), `MAX` (highest value), `MIN` (lowest value), `AVG`
  (arithmetic mean). No `@countOf` function alias exists in Pega (the seeded entry was
  incorrect) -- use a Declare Expression with COUNT or
  `@(Pega-RULES:Utilities).LengthOfPageList()` for a simple count.
- **Status:** *(validated -- standard Pega pattern)*

### Join PageList values into a string

- **How:** `@(Pega-NLP:NLPUtility).pxJoin(propertyToJoin, separator, inputProperty)`
  utility function (`Rule-Utility-Function` in `NLPUtility` library, `Pega-NLP`
  ruleset)
- **Where:** Activities (Java steps), Data Transforms
- **Example:** `@(Pega-NLP:NLPUtility).pxJoin("pyLabel", ", ", .pyItems)` -- extracts
  `pyLabel` from each page in `.pyItems` and joins them with `", "`
- **Notes:** Parameters: `propertyToJoin` (String -- property name to extract from each
  page), `separator` (String), `inputProperty` (ClipboardProperty -- the PageList).
  This function is also documented in `string-manipulation.md` since it bridges
  collection iteration and string building. Originally from the NLP module but usable
  as a general-purpose join. Availability: Final. No `@baseclass` alias exists.
- **Status:** *(validated)*

---

## Notes

- **No `@filterPageList`, `@sortPageList`, or `@countOf` aliases exist.** The original
  seeded entries referenced these, but they do not exist as Pega rules. Filtering is
  done via Data Transform For-Each with conditional Remove steps or conditional Set
  steps. Sorting uses the fully-qualified
  `@(Pega-RULES:Utilities).pxSortPageList(...)`. Counting uses
  `@(Pega-RULES:Utilities).LengthOfPageList(...)` for total count or Declare Expression
  COUNT for conditional counting.

- **No `pxAppendPage` activity exists.** Appending to a PageList is done via the
  Data Transform Append action or via Activity Java steps using clipboard API methods
  (`getPropertyInfoValue`, `createPage`, etc.). For PageGroups, the
  `AppendToPageGroup` activity is the OOTB approach.

- **PageList vs. PageGroup:** A PageList is an ordered, index-based collection
  (1-indexed). A PageGroup is a keyed collection (subscript-based, like a map). Most
  collection operations (`pxValueIsInPageList`, `pxSortPageList`, For-Each, Append,
  Remove) work on PageLists. PageGroup-specific operations include
  `AppendToPageGroup`, `RemoveFromPageGroup`, and `pxSubscriptInPageGroup`.

- **Data Transform actions vs. utility functions:** Data Transform built-in actions
  (Append, Remove, For-Each, Update Page) are the preferred approach for collection
  manipulation in modern Pega. They are visual, auditable, and work within the
  declarative Data Transform framework. Utility functions are needed when you need
  programmatic access (e.g., sorting, length checks, value lookups) that Data Transform
  actions don't directly support.

- **`myStepPage` context:** Inside a Data Transform For-Each loop, `myStepPage`
  refers to the current page being iterated. Utility functions like
  `pxGetActiveIndex(myStepPage)`, `pxGetParentListProperty(myStepPage)`, and When rules
  like `pxIsFirstElementInPageList` and `pxIsLastItemInPagelist` all use `myStepPage`
  as their context parameter.

- **Performance with large PageLists:** `pxValueIsInPageList` performs a linear scan
  of the list on every call. For frequently-checked large lists, consider using a
  PageGroup (O(1) key lookup) or a dedicated Data Page with indexed storage.
  `pxSortPageList` likely uses Java's built-in sort (TimSort, O(n log n)) but creates
  overhead from clipboard property access. For lists exceeding ~1000 pages, consider
  server-side sorting via a Report Definition or Data Page with ORDER BY.

- **1-based indexing:** Pega PageList indices are 1-based (`.pyLineItems(1)` is the
  first element), consistent with Pega conventions but different from Java's 0-based
  arrays. `pxGetActiveIndex` returns 1 for the first element.
