# Authoring guide — adding articles

How to add articles (topic pages) to the blog, add new sections, preview locally,
and publish. No prior MkDocs knowledge needed — just follow the steps.

---

## How the blog is organised

Each **section** is a folder under `docs/blog/`, and each **article** is a
Markdown (`.md`) file inside it:

```
docs/blog/
  azure/
    index.md              -> section overview  (/blog/azure/)
    getting-started.md     -> an article        (/blog/azure/getting-started/)
  linux/
  terraform/
  ansible/
  kubernetes/
  monitoring/
```

The left-hand sidebar and its order are driven by the `nav:` block in
**`mkdocs.yml`**. A page only appears in the sidebar if it's listed there, so
adding an article is always **two steps: create the file, then list it in `nav`.**

---

## Add an article to an existing section

Say you want to add "Taints and tolerations" under **Kubernetes**.

### 1. Create the file

Create `docs/blog/kubernetes/taints-and-tolerations.md`:

```markdown
---
title: Taints and tolerations
description: How taints repel pods and tolerations let them stay.
---

# Taints and tolerations

Your content starts here...
```

- The **file name** becomes the URL: `.../kubernetes/taints-and-tolerations/`.
  Use lowercase words separated by hyphens.
- `title:` sets the sidebar/tab label. If you omit it, the first `# Heading` is
  used instead.
- `description:` is optional (used for SEO / link previews).

### 2. List it in the sidebar

Open `mkdocs.yml` and find the `Kubernetes` block under `nav:`. Add your file:

```yaml
  - Kubernetes:
      - blog/kubernetes/index.md
      - blog/kubernetes/getting-started.md
      - blog/kubernetes/taints-and-tolerations.md   # <-- new line
```

The order of lines here is the order in the sidebar. The **first** item
(`index.md`) is always the section's overview page.

That's it — [preview](#preview-locally) and [publish](#publish).

> **Note:** the site is built with `--strict`, so every article **must** be
> listed in `nav`. If you add a `.md` file but forget to add it to `nav`, the
> build will fail with a "page exists but is not included in the nav" error.

---

## Add a brand-new section

Say you want a new **Networking** section.

1. Create the folder and an overview page
   `docs/blog/networking/index.md`:

   ```markdown
   # Networking

   _Coming soon._ Notes and how-tos on Networking will land here.
   ```

2. Add the section to `nav:` in `mkdocs.yml` (place it where you want it in the
   sidebar order):

   ```yaml
     - Networking:
         - blog/networking/index.md
   ```

3. Add articles to it exactly like the steps above.

---

## Writing content — formatting you can use

Standard Markdown works, plus these extras are enabled:

**Code blocks** with syntax highlighting and a copy button:

    ```bash
    kubectl get pods -A
    ```

**Callouts / admonitions:**

```markdown
!!! note "Optional title"
    Body of the note.

!!! warning
    A word of caution.

!!! tip
    A helpful tip.
```

**Tables, task lists, footnotes:**

```markdown
| Command | What it does |
| ------- | ------------ |
| `ls`    | list files   |

- [x] done
- [ ] todo

Some claim.[^1]

[^1]: The footnote text.
```

**Content tabs:**

```markdown
=== "Debian/Ubuntu"
    ```bash
    apt install nginx
    ```

=== "RHEL"
    ```bash
    dnf install nginx
    ```
```

**Images** — put the file in `docs/blog/<section>/` (or `docs/assets/`) and
reference it relatively:

```markdown
![Architecture diagram](diagram.png)
```

---

## Preview locally

From the project root:

```bash
. .venv/bin/activate      # activate the Python environment (first time each shell)
mkdocs serve              # http://localhost:8000  (auto-reloads as you edit)
```

Optional — reproduce exactly what CI builds (catches nav/strict errors early):

```bash
mkdocs build --strict
```

---

## Publish

Everything is push-to-deploy. Once you're happy with the preview:

```bash
git add -A
git commit -m "Add Kubernetes taints article"
git push
```

Pushing to `main` triggers the GitHub Actions workflow, which builds the site and
deploys it to **https://youssef.oussaid.net/** automatically (about a minute).

> If a deploy ever fails with *"Deployment failed, try again later"*, that's a
> transient GitHub Pages hiccup — just re-run it:
> `gh run rerun <run-id> --failed` (or push again).

---

## Quick reference

| Task | Do this |
| --- | --- |
| New article | Create `docs/blog/<section>/<name>.md` → add it under that section in `nav:` |
| New section | Create `docs/blog/<name>/index.md` → add a `- <Name>:` block in `nav:` |
| Rename sidebar label | Change the `title:` front-matter, or the `nav:` key for a section |
| Reorder sidebar | Reorder the lines under the section in `nav:` |
| Hide a draft | Keep the file out of `nav:` **and** add it to the `not_in_nav:` list |
| Preview | `. .venv/bin/activate && mkdocs serve` |
| Publish | `git add -A && git commit -m "..." && git push` |
