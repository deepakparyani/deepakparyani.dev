// Renders the latest posts into the homepage "Latest writing" card.
// Uses the same build-time index as /blog/ search (/blog/search.json), so there
// is nothing to update by hand when a post is published. If the fetch fails the
// static fallback paragraph stays visible.

(function () {
    'use strict';

    var container = document.getElementById('latest-posts');
    var fallback = document.getElementById('latest-posts-fallback');
    if (!container) return;

    var MAX = 2;

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    fetch('/blog/search.json')
        .then(function (response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(function (posts) {
            if (!Array.isArray(posts) || !posts.length) return;

            container.innerHTML = posts
                .slice(0, MAX)
                .map(function (post) {
                    return (
                        '<a href="' + escapeHtml(post.url) + '" class="block group">' +
                        '<p class="font-semibold text-white group-hover:text-cyan-400 transition">' + escapeHtml(post.title) + '</p>' +
                        '<p class="text-sm text-gray-500">' + escapeHtml(post.date) + '</p>' +
                        '</a>'
                    );
                })
                .join('');

            container.removeAttribute('hidden');
            if (fallback) fallback.setAttribute('hidden', '');
        })
        .catch(function () {
            // Keep the static fallback; nothing else to do.
        });
})();
