---
name: Boolean true validation
description: Edit validate that checks a boolean property is true and adds an error message if false.
---

```json
{
  "pyLabel": "Must be true",
  "pyValidateName": "ValidateIsTrue",
  "pyJavaCode": "if (!\"true\".equalsIgnoreCase(theValue)) {\n\ttheProperty.addMessage(\"This field must be true.\");\n\treturn false;\n}\nreturn true;"
}
```
