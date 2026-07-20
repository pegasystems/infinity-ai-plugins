---
name: business-action-ui-automation
description: Load when generating Playwright code for a Business Action. Covers standard field-type-to-locator mapping, opener logic, CaseID capture, and form submission. For reference and embedded data fields load business-action-reference-field-mapping instead.
---

# UI Automation (Playwright)

Generates `pyPlaywrightScript` and `pyPlaywrightMethod` from the view rule output.
Load a matching example first to see the full structural pattern — this reference
covers the lookup tables and rules that examples cannot teach.

**Skip rule:** Skip readOnly and calculatedField fields. Also skip Declare Expression
targets — run `list-rules(ruleType="Rule-Declare-Expressions", className=CLASS)` and
skip any field whose property reference matches a returned rule's `pyTargetProperty`.

---

## Step type opening

| Step type | Opening code |
|-----------|-------------|
| CreateCase | `await userPortal.createCase(page, 'CASE_TYPE_LABEL');` |
| PerformAssignment (standalone) | `await caseUtils.clickGo(page, "ASSIGNMENT_NAME");` |
| PerformAssignment (screen flow) | No opener — auto-navigates |
| PerformAction | `await caseUtils.openCaseWideActions(page, "ACTION_LABEL");` |

- `CASE_TYPE_LABEL`: Fetch via `get-rule` on `Rule-Obj-CaseType` → use `pyLabel`. Never guess.
- `ASSIGNMENT_NAME`: Fetch flow rule (`Rule-Obj-Flow`, detail=full) → `pyShapes.AssignmentN.pyMOName` exactly. For approval shapes use `"Get Approval"`.
- `ACTION_LABEL`: `pyActionLabel` from the case type flow.

> **Screen flow vs standalone — critical:**
> - Screen flow BAs (shape names `AssignmentSF1`…`AssignmentSFN`) → NO opener.
> - Everything else → MUST have `clickGo`. Missing opener = runtime failure.

---

## Field-type-to-locator table

Here `LABEL` means the extracted DOM test-id base from
`business-action-view-field-extraction`, not always the visible label.

| `pyComponentName` | Code |
|-------------------|------|
| `TextInput` | `if (param) { await page.getByTestId('LABEL:input:control').fill(param); }` |
| `TextArea` | `if (param) { await page.getByTestId('LABEL:text-area:control').fill(param); }` |
| `Currency` | `if (param) { await page.getByTestId('LABEL:currency-input:control').fill(param); }` |
| `Decimal` | `if (param) { await page.getByTestId('LABEL:number-input:control').fill(param); }` |
| `Dropdown` | `if (param) { await page.getByTestId('LABEL:select:control').selectOption(param); }` |
| `RadioButtons` | `if (param) { await page.locator("//fieldset[@data-testid='LABEL']//label[text()='" + param + "']").click(); }` |
| `Checkbox` | `if (param) { await page.locator("//label[text()='CAPTION']//ancestor::div[@data-testid=':checkbox:']//input[@type='checkbox']//following-sibling::label").click(); }` |
| `pxDateTime` | `if (param) { await commonUtils.Handle_Date(page, 'LABEL', param); }` |
| `DateTime` | `if (param) { await commonUtils.Handle_DateTime(page, 'LABEL', param); }` |
| `pxAutoComplete` | `if (param) { await commonUtils.Handle_AutoComplete(page, 'LABEL', param); }` |
| `RichTextEditor` | `if (param) { await commonUtils.Handle_RichText(page, 'LABEL', param); }` |
| `Location` | `if (param) { await page.getByTestId('LABEL:location-input:control').fill(param); }` |
| `Email` | `if (param) { await page.getByTestId('LABEL:input:control').fill(param); }` |
| `Integer` | `if (param) { await page.getByTestId('LABEL:number-input:control').fill(param); }` |
| `Percentage` | `if (param) { await page.getByTestId('LABEL:number-input:control').fill(param); }` |
| `URL` | `if (param) { await page.getByTestId('LABEL:input:control').fill(param); }` |
| `Phone` | `if (param) { await page.getByTestId('LABEL:phone-input:control').fill(param); }` |
| `Integer` (slider: `config.displayAs: "slider"`) | `if (param) { await page.getByTestId('LABEL:slider:control').fill(param); }` |
| `Time only` | `if (param) { await commonUtils.Handle_Time(page, 'LABEL', param); }` |
| `Attachments` | `if (param) { await commonUtils.Handle_Attachments(page, 'LABEL', param); }` |


- **LABEL** = exact resolved label from the view rule. When the view shows `@FL .propertyName`, fetch the property rule and use its `pyLabel`. Never guess.
- **CAPTION** = `pyCaptionText` for Checkbox fields.
- **Labels with single quotes** — use template literals:
  ```typescript
  await page.getByTestId(`What's your address?:input:control`).fill(param);
  ```

---

## Reference and embedded data fields

For `ObjectReference`, `UserReference`, `EmbeddedDataMulti`, and `reference`
components, load `business-action-reference-field-mapping` — it covers DX API
mapping and Playwright patterns for reference and embedded-data fields.

---

## CaseID capture

After `clickSubmit` — add ONLY to the LAST screen flow step (or the CreateCase BA):

```typescript
try {
await page.getByTestId(':case-view:subheading').waitFor({ state: 'visible', timeout: 5000 });
((config.outputParameters ??= {}) as Record<string, string>).UNIQUE_NAME = (await page.locator('[data-testid=":case-view:subheading"] li').count()) > 0
  ? await page.locator('[data-testid=":case-view:subheading"] li').last().textContent()
  : await page.locator('[data-testid=":case-view:subheading"]').textContent();
}catch(error){
  console.log("Not a parent case ID to capture")
}
```

- `UNIQUE_NAME` = `{CaseTypeName}CaseID` (e.g., `ExpenseCaseID`)
- Screen flow: ONLY the LAST step captures. NOT intermediate steps.
  The screen flow modal stays open until the final submit — `:case-view:subheading` is not visible until the modal closes.

## Child case ID capture (CaptureChildCase step)

```typescript
await userPortal.search(page, (config.outputParameters as Record<string, string>).PARENT_UNIQUE_NAME); await page.keyboard.press('Enter'); await page.waitForTimeout(2000);
if(await page.locator(`//span[@data-testid=':case:id' and contains(text(),'${Child_Case_Prefix}')]`).count() > 0) {
  ((config.outputParameters ??= {}) as Record<string, string>).UNIQUE_NAME = await page.locator(
    `//span[@data-testid=':case:id' and contains(text(),'${Child_Case_Prefix}')]`).textContent();
} else {
  console.log("Not a child case ID to capture");
}
```

- `PARENT_UNIQUE_NAME` = the parent case's unique parameter name from the test case — the `pyParameterUniqueName` of the parent `CreateCase` output (e.g., `FlightBookingCaseID`)
- `UNIQUE_NAME` = `{ChildCaseTypeName}CaseID` (e.g., `BaggageClaimCaseID`) — the child case's unique parameter name used by subsequent keywords in the test case

---

## Form submission

| Scenario | Code |
|----------|------|
| Standard | `await caseUtils.clickSubmit(page);` |
| Approve | `await caseUtils.clickApprove(page);` |
| Reject | `await caseUtils.clickReject(page);` |
