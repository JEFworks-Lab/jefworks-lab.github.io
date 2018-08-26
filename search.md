---
layout: default
title: Search
permalink: /search/
sectionid: search
---

# SEARCH BLOG POSTS
<form>
<div id="search-container" class="form-group">
<input class="form-control" type="text" id="search-input" placeholder="search...">
</div>
</form>

<br>
<hr>

# SEARCH RESULTS
<ul id="results-container"></ul>

<script src="/js/simple-jekyll-search.min.js" type="text/javascript"></script>
<script>
 SimpleJekyllSearch({
     searchInput: document.getElementById('search-input'),
     resultsContainer: document.getElementById('results-container'),
     json: '/search.json'
 })
</script>

