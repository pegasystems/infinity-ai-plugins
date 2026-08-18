---
description: "Pega standard library for accessing operator info, application settings, system data pages, and clipboard data"
---
# Data Access

Reusable Pega assets for looking up system information -- current operator, access
groups, application settings, and other system-level data.

## Category Scope

- Current operator information (name, ID, email, organization)
- Access group and role lookups
- Application and environment settings
- System-level data pages
- Clipboard and thread-level data access
- Node and requestor information

## Bootstrap Hints

To populate this file during bootstrap:
- Search for data pages starting with `D_px` and `D_py` -- these are standard system
  data pages
- Look for `D_pxOperator`, `D_pxCurrentAccessGroup`, `D_pxApplication`
- Search for system activities that return operator or environment info
- Inspect `@baseclass` for system-level properties and methods
- Look for `Declare_` pages (node-level cached system data)

## Known Items

*(All items below are seeded from domain knowledge and marked unvalidated. Update
status after confirming on a live Pega instance.)*

### Get current operator information

- **How:** `D_pxOperator` data page
- **Where:** Expressions, When rules, Data Transforms, Activities
- **Example:** `D_pxOperator.pyUserName` returns the current user's name;
  `D_pxOperator.pyUserIdentifier` returns the operator ID
- **Status:** *(unvalidated)*

### Get current operator's access group

- **How:** `D_pxCurrentAccessGroup` data page or `pxRequestor.pxReqAccessGroup`
- **Where:** Expressions, When rules, Data Transforms
- **Example:** `D_pxCurrentAccessGroup.pyAccessGroup` returns the access group name
- **Status:** *(unvalidated)*

### Check if operator has a role

- **How:** Access role lookup via the access group data page or When rule
- **Where:** When rules, Flow decision shapes, Visibility conditions
- **Example:** Check if current operator's access group contains a specific role
- **Status:** *(unvalidated)*

### Get application name and version

- **How:** `D_pxApplication` data page or `pxRequestor.pxReqApplication`
- **Where:** Expressions, Data Transforms
- **Example:** `D_pxApplication.pyApplicationName` returns the application name
- **Status:** *(unvalidated)*

### Get the current operator ID

- **How:** `@GetOperatorID` function or `pxRequestor.pxReqUserID`
- **Where:** Expressions, Data Transforms, Activities
- **Example:** Set `.pyOperator` to `@GetOperatorID`
- **Status:** *(unvalidated)*

## Notes

*(No notes yet. Document lessons learned about data access here -- caching behavior
of system data pages, requestor vs. node scope, thread-safety considerations, etc.)*
