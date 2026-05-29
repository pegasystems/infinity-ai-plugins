---
name: Association Join (pyAssociations) — explicit row
description: A single Embed-ReportAssociation entry. Author this only when you want the association preserved without a current field/filter reference, or when round-tripping a payload. Usually the save activity auto-populates pyAssociations from your <AssociationName>.<Property> field references — see association-implicit-worked.md.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-Patient",
  "pyPurpose": "AppointmentSchedulingReference",
  "pyAssociatedClass": "MyOrg-MyApp-Work-Appointment"
}
```
