---
title: "Idempotency is the whole point of Ansible"
description: "What idempotency means in practice, and how to spot tasks that quietly break it."
category: configuration-management
date: 2026-06-03
tags: [ansible, playbooks]
draft: false
---

Idempotency means running the same playbook ten times leaves the system in the
same state as running it once. It's what separates configuration management from
"a shell script someone wrapped in YAML."

## Modules are idempotent; commands are not

Most Ansible modules check current state before changing anything:

```yaml
- name: Ensure nginx is installed
  ansible.builtin.dnf:
    name: nginx
    state: present
```

Run this twice — the second run reports `ok`, not `changed`, because the package
is already there.

Contrast with `command` / `shell`, which always run:

```yaml
# Not idempotent — runs every time, always reports "changed"
- name: Restart something
  ansible.builtin.command: systemctl restart nginx
```

## Making imperative tasks safe

Use `creates`/`removes` guards, or `changed_when` / handlers:

```yaml
- name: Initialise the database once
  ansible.builtin.command: /opt/app/init-db.sh
  args:
    creates: /var/lib/app/.initialised
```

## A quick self-check

After a playbook converges, run it again. If you still see `changed=` on tasks
that shouldn't have changed anything, you have a non-idempotent task to fix.
That second run is the cheapest test you'll ever write.
