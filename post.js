/**
 * post.js – Single post page logic
 *
 * Reads ?slug=<name> from the URL, fetches posts/<name>.md,
 * strips front-matter, and renders the body with marked.
 */

(function () {
  "use strict";

  const container = document.getElementById("post-container");

  function parseFrontMatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    const meta = {};
    let body = raw;
    if (match) {
      match[1].split("\n").forEach((line) => {
        const [key, ...val] = line.split(":");
        if (key) meta[key.trim()] = val.join(":").trim();
      });
      body = raw.slice(match[0].length);
    }
    return { meta, body };
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    if (!slug) {
      container.innerHTML = '<p class="state-msg">No post specified.</p>';
      return;
    }

    try {
      const res = await fetch(`posts/${slug}.md`);
      if (!res.ok) throw new Error(`Post not found (${res.status})`);
      const raw = await res.text();
      const { meta, body } = parseFrontMatter(raw);

      document.title = meta.title || slug;

      container.innerHTML = `
        <a href="index.html" class="back-link">&#8592; Back to posts</a>
        <div class="post-header">
          <h1>${meta.title || slug}</h1>
          <div class="post-meta">${formatDate(meta.date)}</div>
        </div>
        <article class="post-body">
          ${marked.parse(body)}
        </article>`;
    } catch (err) {
      container.innerHTML = `<p class="state-msg">Could not load post.<br><small>${err.message}</small></p>`;
    }
  }

  loadPost();
})();
