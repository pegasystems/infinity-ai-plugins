---
name: "Blueprint Delivered phase two part three"
description: "Authoring Case and Usability Configuration stage -- Load this when a user is interested in learning more about this part of the Blueprint Delivered methodology. Specifically, routing and queues, SLAs, view refinement, landing pages, and theme/branding. This is typically done after Phase Two, part two Security & Data Integration is complete"
---

## Purpose

The third stage of the Authoring phase. Focuses on **refining the user experience and
case management** within a running application. By this point the application is running
end-to-end with real data and real personas -- this stage iteratively enhances it based
on actual usage and feedback.

All enhancements are driven by observed behavior in a live environment, not speculative
design.

## Configure Routing and Queues

### Goal
Ensure work items reach the right people or teams at the right time.

### Activities

1. **Validate Blueprint Routing** -- Review the routing rules auto-generated from the
   Blueprint import. Confirm assignments route to the correct personas and workbaskets.
2. **Configure Work Queues** -- Set up work queues (workbaskets) for team-based
   assignment where individual routing is not appropriate
3. **Implement Intelligent Routing** -- Configure routing based on:
   - Operator skills and availability
   - Business rules (e.g., region, case type, priority)
   - Load balancing across team members
4. **Enable Get Next Work** -- Configure the Get Next Work feature so operators pull
   work from queues in priority order rather than cherry-picking

### Key Considerations
- Start with the Blueprint-generated routing and refine based on testing
- Prefer queue-based routing for high-volume, interchangeable work
- Use skill-based routing when specific expertise is required

## Configure SLAs (Service-Level Agreements)

### Goal
Define and enforce time-based goals and deadlines for task completion, ensuring work
progresses through the lifecycle at the expected pace.

### Configuration Elements

| Element | Purpose |
|---------|---------|
| **Goal** | Target time for task completion (advisory, triggers notifications) |
| **Deadline** | Hard limit; triggers escalation actions when exceeded |
| **Passed Deadline** | Final escalation; may reassign or auto-complete the work |

### Activities

1. **Define SLAs per Assignment** -- Set goal and deadline durations for each assignment
   step in the case lifecycle
2. **Configure Escalation Actions** -- Define what happens when goals or deadlines are
   missed:
   - Send notification to the assignee or their manager
   - Increase urgency/priority of the work item
   - Reassign to a different operator or queue
   - Auto-complete with a default resolution
3. **Automate Notifications** -- Configure email or in-app notifications triggered by
   SLA events
4. **Test SLA Behavior** -- Verify escalation chains fire correctly using accelerated
   time in test environments

## Configure and Refine Views

### Goal
Ensure UIs are clear, consistent, accessible, and aligned with enterprise standards.

### Activities

1. **Review Initial Views** -- The Blueprint import generated default views for each
   assignment step. Review these for completeness and usability.
2. **Add and Adjust Fields** -- Add missing fields, remove unnecessary ones, reorder
   for logical flow
3. **Configure Conditional Visibility** -- Show/hide fields or sections based on case
   data or user role
4. **Apply Layout and Formatting** -- Use Constellation UX patterns for consistent
   layout: headings, groupings, field widths, required field indicators
5. **Add Validation** -- Configure inline validation for required fields, format checks,
   and cross-field rules
6. **Test with Personas** -- Verify each persona sees the appropriate fields and layout
   for their role

### Key Principles
- Start from Blueprint-generated views and refine -- do not rebuild from scratch
- Follow Constellation design patterns for consistency
- Validate views with actual users early and iterate

## Landing Pages

### Goal
Create personalized, role-based workspaces that consolidate information and tasks for
each persona.

### Activities

1. **Define Landing Page per Persona** -- Each persona should have a landing page
   tailored to their responsibilities
2. **Configure Widgets** -- Add relevant widgets:
   - My work list (assigned cases)
   - Team work queue (for managers)
   - Case creation shortcuts
   - Dashboards and KPIs relevant to the role
3. **Set as Default** -- Configure each persona's landing page as their default entry
   point after login

## Theme and Branding

### Goal
Align the application's look and feel with enterprise brand identity.

### Activities

1. **Configure Theme** -- Set brand colors, logos, fonts, and other visual elements
   using the Constellation theming system
2. **Ensure Consistency** -- Verify branding is consistent across all channels (web,
   mobile, portals)
3. **Confirm with Stakeholders** -- Get approval from brand/UX stakeholders that the
   application meets visual identity standards
