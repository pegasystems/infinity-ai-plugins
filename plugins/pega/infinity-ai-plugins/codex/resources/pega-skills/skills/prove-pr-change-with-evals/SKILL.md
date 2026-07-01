---
name: prove-pr-change-with-evals
description: Use when a goal in infinity-skills or infinity-rules-mcp should be turned into a grounded eval scenario, run, reported, and refined for future reruns.
---

# Prove PR Change With Evals

Turn a real goal into a runnable eval loop: write scenario, run eval, report the result, refine the scenario, and rerun as needed.

## Use This When

- a change in `infinity-skills` or `infinity-rules-mcp` should lead to one or more eval scenarios
- the user wants proof that a skill, builder, prompt, rule-authoring path, or repo change works
- the result should be rerunnable later for regression analysis or future comparison

## Start With Goal

Before writing a scenario, clarify the goal in plain language.

The goal can be anything that should lead to an eval scenario, for example:

- prove a `Rule-Obj-Validate` skill can create a real validate rule
- test a prompt or schema change in `infinity-skills`
- validate a builder path in `infinity-rules-mcp`
- exercise a rule-authoring flow on a live surface

Restate or ask for these points first:

- what is the goal
- which repo, branch, PR, or changed surface is involved
- whether the user wants capability validation or comparative proof

If the goal is unclear, stop and clarify before writing a scenario.

## Choose Eval Path

After the goal is clear, choose one of these three eval paths and tell the user which one you recommend.

### 1. Example-grounded (recommended when examples exist)

Start from the closest existing example, adapt it to the actual goal and live surface, then turn it into a concrete eval scenario.

Use this first when:

- the changed surface already has strong examples
- the examples are close to the intended authoring pattern
- you want the fastest grounded path to a reliable eval

### 2. Goal-first custom

Write a fresh scenario directly from the user goal when no useful example exists.

Use this when:

- no good example exists
- the changed surface is novel
- the user goal is more specific than any existing example

### 3. Comparative

Add baseline-versus-candidate comparison only when the user asks a comparative question such as whether one branch, prompt, builder, or approach is better than another.

Use this when:

- the user wants A-B proof
- the change claim is explicitly comparative
- future analysis needs relative performance or quality, not just capability validation

## Choose Execution Mode

After choosing the eval path, choose the execution mode separately.

Eval path and execution mode are different decisions: eval path defines what kind of proof is needed, while execution mode defines where or how the eval run is executed.

### Local

Run the eval directly in the current working session.

Prefer local when:

- you need the fastest loop for scenario writing, debugging, and refinement
- the run is a single-scenario or small-scope proof
- you need direct access to local artifacts while iterating

### Dispatched

Run the eval through a dispatched or remote execution path instead of directly in the current session.

Prefer dispatched when:

- the work originates from a PR and the proof should attach back to that PR
- branch-aware proof matters and baseline-versus-candidate refs must stay explicit
- the PR-to-evals dispatcher path is available and should be used for formal proof
- baseline/candidate comparison needs repo or ref control beyond the current local session

Before dispatch, gather these required control-plane inputs:

- source repo
- source PR number
- candidate ref for the source PR repo
- paired repo ref when branch-aware proof depends on another repo such as `infinity-skills` or `infinity-rules-mcp`
- baseline ref when comparative proof is required
- eval target or suite

Treat these as mandatory pre-dispatch inputs so the run stays branch-aware, preserves repo pairing, and reports the proof back to the originating PR without losing source linkage.

### Dispatched PR-proof workflow

Use this when the proof should be executed through the PR-to-evals pipeline instead of fully inside the current session.

1. gather the required source repo, source PR, repo refs, and eval target or suite
2. confirm the scenario and local shaping are already specific enough to dispatch cleanly
3. dispatch through the PR-to-evals pipeline when that path is available
4. capture the baseline and candidate repo or ref context attached to the downstream run
5. report the downstream proof result back to the source PR context

## Core Loop

The skill is about this loop:

1. write scenario
2. run eval locally or dispatch the eval run
3. report result
4. refine scenario
5. rerun as needed

The output should be a rerunnable eval artifact, not just a one-off claim.

## Grounding Rules

1. Start from the actual goal, not from a guessed story.
2. Probe the live product surface before writing the scenario.
3. Discover real rule types, real rule names, and real structural fields from the running system.
4. Inspect existing live rules on the target surface before inventing a scenario or authoring path.
5. Refuse guessed rule names, guessed payloads, and guessed end-to-end stories when live inspection has not confirmed them.
6. Do not switch to an easier but different proving surface unless the user explicitly narrows scope.
7. Preserve artifacts for every required eval run.
8. Distinguish environment failure from product-surface failure.

## Exploration First

Before writing the scenario, run a live discovery pass on the exact surface involved in the goal.

Minimum exploration standard:

1. confirm the real rule type names from the live system
2. find at least one existing live rule on that surface when possible
3. inspect the live rule content closely enough to identify the authored structure
4. record what is proven, what is blocked, and what remains unknown

If this discovery has not happened yet, the next step is exploration, not scenario authoring.

### Required Discovery Questions

- What are the actual rule type class names on this surface?
- Which live rules already exist for that rule type?
- Which fields or embedded structures appear on the live rules?
- Which failures come from environment setup or intake flow problems versus the product surface under evaluation?

## Path Workflows

### Example-grounded

1. inspect the changed examples or example corpus on the target surface
2. choose the closest example for the user goal
3. map the example to a safe live target
4. write one concrete eval scenario from that example
5. run the eval locally
6. report the result with assertions and artifacts
7. refine the scenario if the goal is only partially covered
8. rerun and preserve the updated artifacts

### Goal-first custom

1. restate the goal as a single scenario objective
2. identify the live target surface
3. write one grounded custom scenario
4. run the eval locally
5. report the result with assertions and artifacts
6. refine the scenario if it misses part of the goal
7. rerun and preserve the updated artifacts

### Comparative

1. define the baseline surface
2. define the candidate surface
3. keep the baseline and candidate tasks aligned
4. write the paired scenarios
5. run the baseline scenarios locally
6. run the candidate scenarios locally
7. compare pass/fail, score, time, tokens, tool calls, and repair behavior where relevant
8. report the comparison result from actual run data
9. refine the scenarios if the comparison is not yet well grounded

## Required Outputs

Every run must produce:

1. discovery notes confirming the real product surface and grounding evidence
2. at least one eval scenario
3. run artifacts from the eval
4. reported results from observed assertions or observed comparison data
5. when dispatched, source PR linkage plus the branch or ref context used for the run

Add these outputs by path:

### Example-grounded or goal-first custom

1. one grounded scenario
2. one run artifact bundle
3. assertion results
4. a result note or experiment record when the repo workflow requires it

### Comparative

1. an eval suite entry in `infinity-evals`
2. paired baseline and candidate scenarios for each affected surface
3. comparison run artifacts
4. an experiment record in `vibe-coding`

### Dispatched

1. preserved source PR linkage
2. candidate ref for the source PR repo, plus paired repo ref when branch-aware proof depends on another repo
3. baseline ref context when applicable, plus the eval target or suite identity used for the run
4. downstream run identifiers or artifacts sufficient to trace the proof result back to the source PR

## Result Labels

For single-scenario capability validation:

- `validated`
- `failed`
- `inconclusive`

`validated` means the scenario satisfied the grounded checks that were run.
It does not mean the candidate improved over any baseline.

For comparative proof:

- `improved`
- `equivalent`
- `regressed`
- `inconclusive`

## Failure Handling

- If a single-scenario run fails its grounded assertions, the result is `failed`.
- If a baseline is broken, do not treat candidate success as proof of improvement. The result is `inconclusive` unless the baseline break is unrelated and explicitly documented.
- If a candidate breaks while baseline passes, the result is `regressed`.
- If both sides pass but the claimed advantage is not demonstrated, the result is `equivalent` or `inconclusive`.
- If environment or auth differences distort the run, document them explicitly instead of attributing them to the product change.
- If an intake flow, branch setup, ruleset configuration, or auth problem blocks authoring before the target surface is reached, classify that as environment failure unless you have proof the product surface itself caused it.
- If the live product surface fails after the environment path is known-good, classify that as product-surface failure.

## Rationalizations To Block

| Rationalization | Why it is wrong |
|-----------------|-----------------|
| "We can skip goal clarification" | A vague goal produces weak scenarios and weak proof. |
| "We don't need discovery if the scenario sounds plausible" | Ungrounded scenarios often target the wrong surface. |
| "Candidate-only proof is enough" | Candidate-only capability validation is valid, but it is not comparative proof. |
| "A requested single-scenario validation proves improvement" | It only shows whether the grounded scenario passed. |
| "Use different tasks for baseline and candidate" | Task drift hides whether the change itself mattered. |
| "Switch to an easier eval-surface change" | A substitute surface proves something else, not the actual goal. |
| "Write the experiment later" | The recorded run result is part of the proof artifact, not cleanup. |

## Quick Reference

| Situation | Required move |
|-----------|---------------|
| Goal is clear and examples exist | Recommend example-grounded first |
| Goal is clear but no example exists | Use goal-first custom |
| User asks "is this better than X?" | Use comparative |
| PR-backed proof needs branch comparison | Prefer dispatched mode when the PR-to-evals path is available |
| Discovery is still incomplete | Stay local first and finish grounding before formal proof |
| Local single scenario passes | Report `validated`, `failed`, or `inconclusive` only |
| Baseline and candidate both pass | Use metrics and assertions to classify comparative outcome |
| Setup drift appears | Document drift before interpreting results |

## Example Patterns

### Rule-Obj-Validate example-grounded path

For `Rule-Obj-Validate`, start from the closest validate example when examples exist.

The loop should be:

1. inspect the changed validate examples
2. choose the nearest example for the intended rule behavior
3. map it to a safe live class and property
4. write the scenario from that example
5. run the eval
6. report whether the scenario was `validated`, `failed`, or `inconclusive`
7. refine and rerun if needed

This is the preferred starting path for validate because the example corpus already contains many grounded authoring patterns.

### Builder or tooling comparison example

If the change affects builder logic or MCP tooling, the proving bundle should follow the actual surfaces touched by that change, which can mean paired baseline and candidate scenarios plus one experiment record summarizing the comparison.

Example PR proof can be shaped locally first, then dispatched once the scenario and branch pairing are specific enough for formal proof.

### Prompt or schema custom example

If no useful example exists, write one custom scenario from the goal, run it, report the result, then refine it into a reusable eval artifact for later reruns.
