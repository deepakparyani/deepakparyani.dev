---
title: "The only test that matters for an agentic flow"
description: "Before automating a workflow, ask how many hours of a real person's week it removes. Demos are cheap; reclaimed time is not."
date: 2026-11-09
tags: [agentic-ai, engineering]
---

Most agent demos are built backwards. Someone wires a model to five tools, records a happy path,
and calls it automation. Then it meets a real workflow - tickets with missing context, documents
that arrived as scans, a team spread across three time zones - and it quietly stops being used.

The flows I build at Finarkein are measured against one thing: hours of a developer's day that
stop being spent on the repetitive parts of the job. That single constraint changes every design
decision, so it is the filter I apply before writing a single tool definition.

## Start from the clock, not the model

Before choosing a framework, write down the manual workflow as a timeline. Who does what, in
what order, and how long each step takes. The interesting number is not the total - it is the
number of steps a person does *without making a decision*. Those are the parts a flow can own.

Anything requiring judgement about risk, money, or a customer relationship stays with a human,
even if a model could technically produce an answer. Automating the judgement away does not
remove work; it moves the work to whoever has to clean up after it.

## Design for the day it breaks

An agent that works when every input is well-formed is a demo. Production inputs are partial,
duplicated and occasionally wrong. Every step needs a defined failure mode:

- If a document cannot be parsed, the flow stops and says why, instead of guessing a value.
- If a tool call returns something unexpected, the run is retried with the same inputs recorded.
- If confidence is low, the output is queued for review rather than written downstream.

That is unglamorous engineering, and it is the difference between a flow that survives contact
with a team and one that gets switched off in a fortnight.

## Keep a human at the seam

The useful mental model is not "replace the developer". It is "hand over the boring middle".
A person starts the run with intent, the flow does the mechanical work, and a person approves the
result. The seam stays human, and the audit trail makes that seam cheap to review.

## What I look for

- A workflow that already has a written process, however informal.
- Repetition measured in hours per week, not minutes per month.
- A clear pass/fail signal, so the flow knows when it is done.
- Someone who will notice and complain when it produces a bad result.

If a candidate fails any of those, the tooling will not save it. If it passes all four, the model
choice matters far less than the plumbing around it - and the plumbing is where the hours
actually get reclaimed.

That is the whole thesis: automate the hours, not the demo. Everything else is a detail of how.
