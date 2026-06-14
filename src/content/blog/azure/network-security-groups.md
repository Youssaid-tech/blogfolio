---
title: "Network Security Groups: priority is everything"
description: "How NSG rule evaluation actually works in Azure, and why the lowest priority number wins."
category: azure
date: 2026-06-08
tags: [networking, security, az-104]
draft: false
---

Network Security Groups (NSGs) filter traffic to and from Azure resources. The
single most important thing to internalise: **rules are evaluated by priority,
lowest number first, and the first match wins.**

## Rule anatomy

Each rule has a priority (100–4096), direction, source/destination, port,
protocol and an allow/deny action.

```text
Priority  Name              Port   Source        Action
100       Allow-HTTPS       443    Internet      Allow
200       Allow-SSH-Admin   22     10.0.0.0/24   Allow
4096      DenyAllInbound    *      *             Deny  (default)
```

Because 100 < 200, the HTTPS rule is checked first. Once a packet matches a rule,
evaluation stops — later rules never see it.

## Default rules you can't delete

Azure adds default rules at very high numbers (65000+):

- Allow VNet-to-VNet traffic
- Allow Azure Load Balancer probes
- Deny everything else

Your custom rules (lower numbers) always take precedence over these.

## Gotchas worth remembering

- NSGs can attach to a **subnet** *and* a **NIC** — both sets are evaluated.
- Deny rules aren't special; they win only if they have a lower priority number
  than a competing allow rule.
- Use **service tags** (`Internet`, `AzureLoadBalancer`, `Storage`) instead of
  hard-coded IP ranges where you can.
