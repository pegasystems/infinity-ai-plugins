---
name: business-action-common-utils-api
description: Load when generating Playwright code for a Business Action. TypeScript API reference for CommonUtils, UserPortal, and CaseUtils — method signatures for dates, autocomplete, tables, reference lists, attachments, and case navigation.
---

# CommonUtils API Reference

Core utility classes for Pega Playwright test automation. These are available in
every Business Action's `pyPlaywrightScript` context.

---

## CommonUtils

```typescript
import { Page, Locator, FrameLocator } from '@playwright/test';

export class CommonUtils {

    /**
     * Handles autocomplete/combobox fields by typing a value and selecting from the dropdown list.
     *
     * @param page - The Playwright page instance
     * @param label - The label/data-testid prefix of the autocomplete field
     * @param input - The value to type and select from the dropdown
     * @param rowLocator - Optional row locator for table-embedded autocomplete fields
     *
     * @example
     * await commonUtils.Handle_AutoComplete(page, 'Country', 'United States');
     * await commonUtils.Handle_AutoComplete(page, 'City', 'Chicago', rowLocator);
     */
    Handle_AutoComplete: (page: Page, label: string, input: string, rowLocator?: Locator) => Promise<void>;

    
    /**
     * This method is used to handle advancedSearch single select
     * @param page is playwright page
     * @param label is the label of the advancedSearch field
     * @param searchCriterion is the value to be selected in search by dropdown; pass an empty string when the picker has only one search group and set it only when multiple groups exist
     * @param searchFields is the array of fields in advancedSearch
     * @param searchPick is the value which want to select
     * Let say for Search and Select with search by as Calendar year
     * searchCriterion = "Calendar year"
     * searchFields = [{label : "Calendar year", type : "pxAutoComplete", value : "2024"}, {label : "Code", type : "TextInput", value : "FY24"}, {label : "From Date", type : "pxDateTime", value : "06/01/2024"}]
     * searchPick = "Name1:ID1" //Single select
     *
     * @example
     * await commonUtils.Handle_SearchAndSelectSingle(page, 'Transaction search', "Search by transaction reference", [{label: "Transaction reference number", type: "TextInput", value: "1"}], "Powertronix:P1");
     */
    Handle_SearchAndSelectSingle = async (page: Page, label: string, searchCriterion: string, searchFields: any, searchPick: string): Promise<void>;

    /**
     * This method is used to handle advancedSearch multi select
     * @param page is playwright page
     * @param label is the label of the advancedSearch field
     * @param searchCriterion is the value to be selected in search by dropdown; pass an empty string when the picker has only one search group and set it only when multiple groups exist
     * @param searchFields is the array of fields in advancedSearch
     * @param searchPicks are the values which want to select
     * Let say for Search and Select with search by as Calendar year
     * searchCriterion = "Calendar year"
     * searchFields = [{label : "Calendar year", type : "pxAutoComplete", value : "2024"}, {label : "Code", type : "TextInput", value : "FY24"}, {label : "From Date", type : "pxDateTime", value : "06/01/2024"}]
     * searchPicks = ["Name1", "Name2"] //Multi select
     *
     * @example
     * await commonUtils.Handle_SearchAndSelectMulti(page, 'Transaction search', "Search by transaction reference", [{label: "Transaction reference number", type: "TextInput", value: "1"}], ["Powertronix", "Greentech"]);
     */
    Handle_SearchAndSelectMulti = async (page: Page, label: string, searchCriterion: string, searchFields: any, searchPicks: string[]): Promise<void>;

    /**
     * Handles rich text editor fields that are embedded in iframes.
     *
     * @param page - The Playwright page instance
     * @param label - The aria-label of the rich text textarea
     * @param input - The text content to fill in the editor
     * @param rowLocator - Optional row locator for table-embedded rich text fields
     *
     * @example
     * await commonUtils.Handle_RichText(page, 'Description', 'This is the description text.');
     */
    Handle_RichText: (page: Page, label: string, input: string, rowLocator?: Locator) => Promise<void>;

    /**
     * Handles date input fields by parsing the input date and filling month, day, year separately.
     * Supports: MM/DD/YYYY, YYYY-MM-DD. Defaults to current date if null.
     *
     * @param page - The Playwright page instance
     * @param label - The visible label text of the date field
     * @param inputDate - The date value in YYYY-MM-DD format
     * @param rowLocator - Optional row locator for table-embedded date fields
     *
     * @example
     * await commonUtils.Handle_Date(page, 'Start date', '2025-06-01');
     */
    Handle_Date: (page: Page, label: string, inputDate: string, rowLocator?: Locator) => Promise<void>;

    /**
     * Handles date-time input fields. Supports YYYY-MM-DD HH:MM:SS format.
     * Defaults to current date and time if null.
     *
     * @param page - The Playwright page instance
     * @param label - The visible label text of the date-time field
     * @param inputDate - The date-time value (YYYY-MM-DD HH:MM:SS format)
     * @param rowLocator - Optional row locator for table-embedded date-time fields
     *
     * @example
     * await commonUtils.Handle_DateTime(page, 'Appointment time', '2025-06-01 18:01:20');
     */
    Handle_DateTime: (page: Page, label: string, inputDate: string, rowLocator?: Locator) => Promise<void>;

    /**
     * Handles time-only input fields by filling hour, minute, and AM/PM period controls.
     * Expects `inputTime` in `HH:MM AM/PM` format, such as `09:30 AM` or `6:45 PM`.
     *
     * @param page - The Playwright page instance
     * @param label - The visible label text of the time field
     * @param inputTime - The time value in hours:minutes AM/PM format
     * @param rowLocator - Optional row locator for table-embedded time fields
     *
     * @example
     * await commonUtils.Handle_Time(page, 'Appointment time', '09:30 AM');
     * await commonUtils.Handle_Time(page, 'Start time', '6:45 PM', rowLocator);
     */
    Handle_Time: (page: Page, label: string, inputTime: string, rowLocator?: Locator) => Promise<void>;

    /**
     * Handles multi-select combobox fields. Supports comma-separated values.
     *
     * @param page - The Playwright page instance
     * @param label - The label of the multi-select combobox field
     * @param inputValue - Single value or comma-separated values to select
     *
     * @example
     * await commonUtils.Handle_ComboBoxModeAsMultiSelect(page, 'Skills', 'JavaScript');
     * await commonUtils.Handle_ComboBoxModeAsMultiSelect(page, 'Skills', 'JavaScript, TypeScript, Python');
     */
    Handle_ComboBoxModeAsMultiSelect: (page: Page, label: string, inputValue: string) => Promise<void>;

    /**
     * Handles reference list/data page fields based on display type and selection mode.
     *
     * Supported combinations:
     * - `table` + `multiselect` → selects listed records (checkboxes); pass string[]
     * - `table` + `singleselect` → selects one listed record (radio); pass string
     * - `simpletable` + `multiselect` → selects listed records (checkboxes); pass string[]
     * - `simpletable` + `singleselect` → selects first record (radio)
     * - `combobox` + `multiselect` → multi-select combobox handler
     * - `checkboxgroup` + `multiselect` → selects first checkbox item
     * - `autocomplete` + `singleselect` → autocomplete handler
     * - `dropdown` + `singleselect` → native select dropdown
     *
     * @param page - The Playwright page instance
     * @param displayAs - Display type ('table', 'simpletable', 'combobox', 'checkboxgroup', 'autocomplete', 'dropdown')
     * @param label - The label/identifier of the reference field
     * @param mode - Selection mode ('singleselect' or 'multiselect')
     * @param inputValue - The value(s) to select. Pass string for singleselect;
     *                     pass string[] for multiselect, even for a single value.
     *
     * @example
     * await commonUtils.Handle_ReferenceListMethods(page, 'autocomplete', 'Country', 'singleselect', 'USA');
     * await commonUtils.Handle_ReferenceListMethods(page, 'table', 'Products', 'multiselect', ['Mac Mini']);
     * await commonUtils.Handle_ReferenceListMethods(page, 'dropdown', 'Status', 'singleselect', 'Active');
     */
    Handle_ReferenceListMethods: (page: Page, displayAs: string, label: string, mode: string, inputValue: any) => Promise<void>;

    /**
     * Handles multi-record/embedded list fields (tables with add/delete row).
     * Deletes existing default rows, then adds and fills new rows from input data.
     *
     * @param page - The Playwright page instance
     * @param label - The aria-label of the table/grid
     * @param displayAs - Display type (e.g., 'table', 'repeating view')
     * @param editMode - Edit mode ('tableRows' for inline, 'modal' for popup form)
     * @param buttonLocator - Full XPath for the Add button, built from its aria-label
     *                        (e.g. "//button[@aria-label='Add Employee']")
     * @param locators - Map of field names to their row field test-id locator strings
     *                   (e.g. "First Name:input:control")
     * @param inputValues - Array of row data objects (field name → value)
     *
     * @example
     * const locators = {
     *   "First Name": "First Name:input:control",
     *   "Salary": "Salary:currency-input:control",
     *   "Age": "Age:number-input:control"
     * };
     * const data = [
     *   { "First Name": "John", "Salary": "2000", "Age": "18" },
     *   { "First Name": "Harry", "Salary": "5000", "Age": "20" }
     * ];
     * await commonUtils.Handle_MultiRecordMethods(
     *   page, 'Employees', 'table', 'tableRows',
     *   "//button[@aria-label='Add Employee']", locators, data
     * );
     */
    Handle_MultiRecordMethods: (page: Page, label: string, displayAs: string, editMode: string, buttonLocator: string, locators: any, inputValues: any) => Promise<void>;

    /**
     * Handles file upload for single or multiple attachments.
     * Files must exist in the `resources/` directory.
     *
     * @param page - The Playwright page instance
     * @param fieldLabel - The label text of the file upload field
     * @param files - Single filename or comma-separated filenames to upload
     *
     * @example
     * await commonUtils.Handle_Attachments(page, 'Upload document', 'contract.pdf');
     * await commonUtils.Handle_Attachments(page, 'Supporting documents', 'doc1.pdf, photo.png');
     */
    Handle_Attachments: (page: Page, fieldLabel: string, files: string) => Promise<void>;

    /**
     * Logs into the Pega portal with the given credentials.
     *
     * @param page - The Playwright page instance
     * @param url - The portal URL to navigate to
     * @param username - The login username
     * @param password - The login password
     * @returns A new UserPortal instance after successful login
     *
     * @example
     * await commonUtils.loginToPortal(page, config.url, username, password);
     */
    loginToPortal: (page: Page, url: string, username: string, password: string) => Promise<UserPortal>;

    /**
     * Switches context to an iframe on the page.
     *
     * @param page - The Playwright page instance
     * @param frameSelector - The CSS/XPath selector for the iframe element
     * @returns The Playwright FrameLocator for the target iframe
     *
     * @example
     * const frame = await commonUtils.switchToFrame(page, 'iframe#content');
     */
    switchToFrame: (page: Page, frameSelector: string) => Promise<FrameLocator>;
}
```

---

## UserPortal

```typescript
export class UserPortal {

    /**
     * Creates a new case via the navigation menu.
     *
     * @param page - The Playwright page instance
     * @param caseName - The display name of the case type (e.g., "Home loan")
     *
     * @example
     * await userPortal.createCase(page, 'Home loan');
     * await userPortal.createCase(page, 'Service Request');
     */
    createCase: (page: Page, caseName: string) => Promise<void>;

    /**
     * Performs a sitewide search in the portal.
     *
     * @param page - The Playwright page instance
     * @param searchInput - The search query (e.g., case ID)
     *
     * @example
     * await userPortal.search(page, (config.outputParameters as Record<string, string>).HomeLoanCaseID);
     * await page.keyboard.press('Enter');
     * await page.waitForTimeout(2000);
     */
    search: (page: Page, searchInput: string) => Promise<void>;

    /**
     * Logs off the current user from the portal.
     *
     * @param page - The Playwright page instance
     *
     * @example
     * await userPortal.logoffFromPortal(page);
     */
    logoffFromPortal: (page: Page) => Promise<void>;
}
```

---

## CaseUtils

```typescript
export class CaseUtils {

    /**
     * Opens the case-wide actions menu and clicks a specific action.
     *
     * @param page - The Playwright page instance
     * @param flowActionName - The action name (e.g., "Edit", "Transfer")
     *
     * @example
     * await caseUtils.openCaseWideActions(page, 'Edit');
     * await caseUtils.openCaseWideActions(page, 'Change stage');
     */
    openCaseWideActions: (page: Page, flowActionName: string) => Promise<void>;

    /**
     * Verifies the current case status matches the expected value.
     *
     * @param page - The Playwright page instance
     * @param status - Expected status (e.g., "Resolved-Completed", "Open")
     *
     * @example
     * await caseUtils.verifyCaseStatus(page, 'Resolved-Completed');
     */
    verifyCaseStatus: (page: Page, status: string) => Promise<void>;

    /**
     * Verifies the current active stage matches the expected stage name.
     *
     * @param page - The Playwright page instance
     * @param stageName - Expected stage name (e.g., "Review", "Closing")
     *
     * @example
     * await caseUtils.verifyCaseStage(page, 'Underwriter Review');
     */
    verifyCaseStage: (page: Page, stageName: string) => Promise<void>;

    /**
     * Clicks the Submit button on the current assignment form.
     *
     * @param page - The Playwright page instance
     *
     * @example
     * await caseUtils.clickSubmit(page);
     */
    clickSubmit: (page: Page) => Promise<void>;

    /**
     * Clicks the Approve button on the current assignment.
     *
     * @param page - The Playwright page instance
     *
     * @example
     * await caseUtils.clickApprove(page);
     */
    clickApprove: (page: Page) => Promise<void>;

    /**
     * Clicks the Reject button on the current assignment.
     *
     * @param page - The Playwright page instance
     *
     * @example
     * await caseUtils.clickReject(page);
     */
    clickReject: (page: Page) => Promise<void>;

    /**
     * Clicks the Cancel button on the current assignment.
     *
     * @param page - The Playwright page instance
     *
     * @example
     * await caseUtils.clickCancel(page);
     */
    clickCancel: (page: Page) => Promise<void>;

    /**
     * Clicks the "Go" button for a specific assignment in the assignment list.
     * Handles collapsed navigation and child case expansion.
     *
     * @param page - The Playwright page instance
     * @param assignmentName - Exact display name of the assignment
     *
     * @example
     * await caseUtils.clickGo(page, "Living situation");
     */
    clickGo: (page: Page, assignmentName: string) => Promise<void>;

    /**
     * Asserts that an error banner contains the expected error message.
     * Does nothing if expectedValue is empty string.
     *
     * @param page - The Playwright page instance
     * @param expectedValue - Expected error message text (case-insensitive)
     *
     * @example
     * await caseUtils.assertError(page, 'Please provide a valid email address');
     */
    assertError: (page: Page, expectedValue: string) => Promise<void>;
}
```
