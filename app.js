/**
 * app.js – Index page logic
 *
 * Reads posts.json (the manifest) and renders the post list.
 * posts.json is a simple array — add one entry per post:
 *
 *   [
 *     { "slug": "my-post", "title": "My Post", "date": "2026-02-01", "excerpt": "..." },
 *     ...
 *   ]
 *
 * slug must match the filename inside posts/ (without .md).
 */

(function () {
  "use strict";

  const listEl = document.getElementById("post-list");

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  async function loadPosts() {
    try {
      const res = await fetch("posts.json");
      if (!res.ok) throw new Error("posts.json not found");
      const posts = await res.json();

      if (!posts.length) {
        listEl.innerHTML = '<li class="state-msg">No posts yet.</li>';
        return;
      }

      // Sort newest first
      posts.sort((a, b) => (b.date > a.date ? 1 : -1));

      listEl.innerHTML = posts
        .map(
          (p) => `
            <li>
              <a href="post.html?slug=${encodeURIComponent(p.slug)}">
                <div class="post-meta">${formatDate(p.date)}</div>
                <h2>${p.title}</h2>
                ${p.excerpt ? `<p class="post-excerpt">${p.excerpt}</p>` : ""}
              </a>
            </li>`
        )
        .join("");
    } catch (err) {
      listEl.innerHTML = `<li class="state-msg">Failed to load posts.<br><small>${err.message}</small></li>`;
    }
  }

  loadPosts();
})();
