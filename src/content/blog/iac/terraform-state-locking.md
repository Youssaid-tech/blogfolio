---
title: "Why remote state and locking matter in Terraform"
description: "Local state works until two people run apply at once. Remote backends with locking are how teams stay sane."
category: iac
date: 2026-06-05
tags: [terraform, state, backends]
draft: false
---

Terraform's state file is the source of truth that maps your configuration to
real infrastructure. On a solo project, `terraform.tfstate` on disk is fine. On a
team, it becomes a liability fast.

## The problem with local state

- It lives on one machine — nobody else can run `apply` safely.
- Two concurrent `apply` runs can corrupt state or double-create resources.
- It often contains secrets in plain text.

## Remote backend with locking

Using an Azure Storage backend, state lives centrally and Terraform takes a
**lease-based lock** during writes:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstatesa9421"
    container_name       = "state"
    key                  = "prod.terraform.tfstate"
  }
}
```

While one `apply` holds the lock, a second one waits or fails fast instead of
racing:

```text
Error: Error acquiring the state lock
Lock Info:
  ID:        7c1f...
  Operation: OperationTypeApply
  Who:       youssef@workstation
```

## Rules I follow

1. Never commit `.tfstate` to git.
2. One backend key per environment (`dev`, `staging`, `prod`).
3. Enable versioning on the storage container so you can roll back a bad state.
