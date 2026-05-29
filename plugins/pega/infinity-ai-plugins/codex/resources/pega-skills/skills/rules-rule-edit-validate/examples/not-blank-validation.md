---
name: Not-blank validation
description: Edit validate that rejects empty or blank values with an error message.
---

```json
{
  "pyLabel": "Value cannot be blank",
  "pyValidateName": "ValidateNotBlank",
  "pyDescription": "Validates that the property value is not empty or blank.",
  "pyJavaCode": "if (theValue == null || theValue.trim().length() == 0) {\n\ttheProperty.addMessage(\"Value cannot be blank.\");\n\treturn false;\n}\nreturn true;"
}
```
