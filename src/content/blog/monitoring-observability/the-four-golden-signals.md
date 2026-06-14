---
title: "The four golden signals"
description: "Latency, traffic, errors and saturation — the smallest set of metrics that tells you if a service is healthy."
category: monitoring-observability
date: 2026-06-01
tags: [sre, metrics, prometheus]
draft: false
---

When you don't know what to monitor, start with Google's four golden signals.
They cover most of what you need to know about a user-facing system without
drowning you in dashboards.

## The four signals

1. **Latency** — how long requests take. Track success and failure latency
   *separately*; a fast stream of errors can hide a real problem.
2. **Traffic** — how much demand the system is under (requests/sec, messages
   consumed, etc.).
3. **Errors** — the rate of failing requests, explicit (HTTP 500) or implicit
   (wrong content, too slow).
4. **Saturation** — how "full" the system is. The resource closest to its limit
   (CPU, memory, IO, connections) is what matters.

## A starting point in Prometheus

```text
# Error ratio over 5 minutes (PromQL)
sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
sum(rate(http_requests_total[5m]))
```

Alert on the *ratio*, not raw counts — 50 errors means nothing without knowing
the total.

## Why this scales

Alert on symptoms (the golden signals), not causes. A page that says "error rate
> 2%" is actionable. A page that says "CPU > 80%" often isn't — high CPU may be
perfectly fine if latency and errors are healthy.
