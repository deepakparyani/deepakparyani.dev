// Client-side search for /blog/.
// Loads /blog/search.json (generated at build time by Liquid) and filters it in
// the browser - no third-party service, no network calls beyond our own file.

(function () {
    'use strict';

    var block = document.getElementById('blog-search-block');
    var input = document.getElementById('blog-search');
    var results = document.getElementById('blog-search-results');
    var status = document.getElementById('blog-search-status');

    // The markup ships hidden so the page is still usable without JS.
    if (!block || !input || !results || !status) return;
    block.classList.remove('hidden');

    var posts = null;
    var loading = false;

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function load() {
        if (posts || loading) return;
        loading = true;

        fetch('/blog/search.json')
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (data) {
                posts = Array.isArray(data) ? data : [];
                loading = false;
                if (input.value.trim()) render();
            })
            .catch(function () {
                loading = false;
                status.textContent = 'Search is unavailable right now.';
            });
    }

    function matches(post, query) {
        var haystack = [post.title, post.description]
            .concat(post.tags || [])
            .join(' ')
            .toLowerCase();
        return haystack.indexOf(query) !== -1;
    }

    function render() {
        var query = input.value.trim().toLowerCase();

        if (!query) {
            results.innerHTML = '';
            status.textContent = '';
            return;
        }

        load();
        if (!posts) {
            status.textContent = 'Searching...';
            return;
        }

        var found = posts.filter(function (post) {
            return matches(post, query);
        });

        if (!found.length) {
            results.innerHTML = '';
            status.textContent = 'No posts match "' + input.value.trim() + '".';
            return;
        }

        status.textContent = found.length + (found.length === 1 ? ' post' : ' posts') + ' found';
        results.innerHTML = found
            .map(function (post) {
                var tags = (post.tags || [])
                    .map(function (tag) {
                        return '<span class="skill-pill px-2 py-0.5 rounded-full text-xs">#' + escapeHtml(tag) + '</span>';
                    })
                    .join(' ');

                return (
                    '<a href="' + escapeHtml(post.url) + '" class="block glass-card p-4 rounded-lg neon-border hover:scale-[1.01] transition">' +
                    '<p class="font-semibold text-white">' + escapeHtml(post.title) + '</p>' +
                    '<p class="text-sm text-gray-400 mb-2">' + escapeHtml(post.date) + '</p>' +
                    '<div class="flex flex-wrap gap-2">' + tags + '</div>' +
                    '</a>'
                );
            })
            .join('');
    }

    var debounce;
    input.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(render, 120);
    });

    // Warm the index once the page is quiet.
    window.addEventListener('load', function () {
        setTimeout(load, 1500);
    });
})();
