---
title: "Managing users and groups on RHEL"
description: "The core commands for creating, modifying and auditing local users and groups — the bread and butter of the RHCSA exam."
category: rhcsa
date: 2026-06-10
tags: [users, permissions, rhel]
draft: false
---

A big chunk of the RHCSA comes down to confidently managing local users and
groups. Here are the commands I reach for and the details that are easy to forget
under exam pressure.

## Creating users

```bash
# Create a user with a specific UID, comment and login shell
useradd -u 1500 -c "Service account" -s /bin/bash svc

# Set or change a password non-interactively
echo 'S3cret!' | passwd --stdin svc
```

The defaults `useradd` applies live in `/etc/default/useradd` and
`/etc/login.defs`. Worth a quick read once so nothing surprises you.

## Groups and supplementary membership

```bash
groupadd ops
usermod -aG ops svc      # -a is critical: append, don't replace
id svc                   # verify primary + supplementary groups
```

> Forgetting `-a` with `usermod -G` wipes the user's other supplementary
> groups. It is the classic foot-gun.

## Password aging

```bash
chage -M 90 -W 7 svc     # max 90 days, warn 7 days before
chage -l svc             # list current aging policy
```

## What I drill before the exam

- Create users with explicit UID, comment and shell
- Add and remove supplementary group membership without clobbering
- Set password expiry and force a change at next login (`chage -d 0`)
- Lock and unlock accounts (`usermod -L` / `-U`)

Short, mechanical, and very repeatable — exactly the kind of task to make muscle
memory.
