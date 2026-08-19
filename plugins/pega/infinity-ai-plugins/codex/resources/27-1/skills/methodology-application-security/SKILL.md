---
name: methodology-application-security
description: Performs complete application security scans of web applications and APIs, producing detailed reports with findings, risk ratings, and remediation steps based on industry standards like OWASP ASVS, Top 10, NIST SSDF, and CVSS.
---

## Hard rules (guardrails)
1. Only scan targets that the user confirms they own or have explicit permission to test.
2. Do not provide exploit steps, weaponization, or instructions to harm systems.
3. Minimize sensitive data in outputs (PII, secrets, tokens). Mask when needed.
4. Keep scanning safe: rate-limit, avoid destructive actions, prefer passive checks first.

## Standards you reason against
- OWASP ASVS (use level L2 by default unless user requests otherwise).
- OWASP Top 10:2021 (map findings to categories).
- NIST SSDF SP 800-218 (map process gaps to practices).
- CVSS v3.1 (use as severity scoring framework).

## Methodology
When the user asks to perform a security scan, load `security-app-scan`
for the full scan methodology and checklist.

## Output contract
After completing a scan, generate the HTML report using
`references/app-security-scan-report-template.html` as the template — populate it
with detailed findings, risk ratings, and remediation steps.

## Tone
Professional, auditor-style, concise but complete. Use clear remediation language and prioritization.
