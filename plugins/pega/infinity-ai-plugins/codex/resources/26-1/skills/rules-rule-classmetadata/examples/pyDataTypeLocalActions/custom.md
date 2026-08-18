---
name: Custom Action
description: A Custom data-type action — pick this subclass when the action is not one of the OOTB UpdateDetails / Add / Delete operations. Wire pyActionName / pyActionLabel to the application-specific behaviour.
---

```json
{
  "pxObjClass": "Embed-Pega-DataTypeAction-Custom",
  "pyActionName": "MyCustomAction",
  "pyActionLabel": "Run custom action",
  "pyActionType": "Custom",
  "pyClassName": "MyOrg-MyApp-Data-MyDataObject",
  "pyImage": "pi pi-cog actionDragDropIcon pi-cd-custom"
}
```
