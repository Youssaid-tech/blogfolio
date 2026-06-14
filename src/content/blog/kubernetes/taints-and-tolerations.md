---
title: "Taints and tolerations, explained simply"
description: "How taints repel pods, how tolerations let them stay, and when to reach for node affinity instead."
category: kubernetes
date: 2026-06-12
tags: [scheduling, nodes]
draft: false
---

Taints and tolerations are Kubernetes' way of letting a node say *"keep away
unless you have permission."* They're a repelling mechanism — the opposite of how
people often first imagine them.

## Tainting a node

```bash
kubectl taint nodes node1 dedicated=gpu:NoSchedule
```

This says: no pod schedules onto `node1` unless it explicitly tolerates
`dedicated=gpu`. The effect can be:

- `NoSchedule` — new pods without a toleration won't be placed here
- `PreferNoSchedule` — soft version, best-effort
- `NoExecute` — also evicts already-running pods that don't tolerate it

## Tolerating the taint

```yaml
tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

## The mental model

| Concept | Lives on | Question it answers |
| --- | --- | --- |
| Taint | Node | "Who am I repelling?" |
| Toleration | Pod | "Which taints can I ignore?" |
| Node affinity | Pod | "Which nodes do I *want*?" |

Tolerations only grant permission — they don't *attract* a pod to the node. If
you need pods to actively prefer GPU nodes, pair the toleration with node
affinity.
