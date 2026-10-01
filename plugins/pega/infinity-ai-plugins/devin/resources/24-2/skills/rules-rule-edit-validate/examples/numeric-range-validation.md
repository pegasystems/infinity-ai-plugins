---
name: Numeric range validation
description: Edit validate that checks a value is a valid integer within a specified range.
---

```json
{
  "pyLabel": "Must be a number between 1 and 100",
  "pyValidateName": "ValidateNumericRange",
  "pyClassName": "MyOrg-MyApp-Data-Config",
  "pyDescription": "Validates that the property value is an integer between 1 and 100.",
  "pyJavaCode": "Integer intValue;\ntry {\n\tintValue = Integer.valueOf(theValue);\n} catch (NumberFormatException ex) {\n\ttheProperty.addMessage(\"Must be a valid number.\");\n\treturn false;\n}\nif (intValue < 1 || intValue > 100) {\n\ttheProperty.addMessage(\"Must be between 1 and 100.\");\n\treturn false;\n}\nreturn true;",
  "pyMemo": "Initial creation"
}
```
