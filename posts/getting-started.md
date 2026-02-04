---
title: Getting Started
date: 2026-02-04
excerpt: A quick walkthrough of how this blog is set up and how to add new posts.
---

## How this works

Posts live in the `posts/` folder as plain Markdown files. The blog reads `posts.json` to know which posts exist, then fetches and renders them on the fly.

## Adding a new post

1. Create a new `.md` file inside `posts/` — e.g. `posts/my-new-post.md`.
2. Add front-matter at the top:

```markdown
---
title: My New Post
date: 2026-02-10
excerpt: A one-line summary shown on the home page.
---

Your content here.
```

3. Add an entry to `posts.json`:

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "date": "2026-02-10",
  "excerpt": "A one-line summary shown on the home page."
}
```

That's it. The slug must match the filename (without `.md`).

## Deploying

Push the repo to GitHub and enable **GitHub Pages** from the repo settings. The site will be live at `https://<your-username>.github.io/<repo-name>/`.
