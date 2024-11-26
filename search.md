---
layout: default
title: Search
permalink: /search/
sectionid: search
---

## SEARCH BLOG POSTS

<form id="search-form">
    <div id="search-container" class="form-group">
      <input class="form-control" type="text" id="search-box" name="query" placeholder="Search...">
      <br>
    </div>
</form>

<hr>

## SEARCH RESULTS

<ul id="search-box-results">
<li>Type in the search box to get started</li>
</ul>

<script>    
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "tags": "{{ post.tags | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
<script src="/js/lunr.min.js"></script>
<script src="/js/search.js"></script>
