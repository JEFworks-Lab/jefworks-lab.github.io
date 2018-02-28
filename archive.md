---
layout: default
title: Archive
permalink: /archive/
---

# Archive

{% for post in site.posts %}

{% assign year = post.date | date: "%Y" %}

{% if year != previous_year %}
<h2 id="y{{ year }}" class="year">{{ year }}</h2>
{% assign previous_year = year %}
{% endif %}

<p>
    <a href="{{ post.url }}">{{ post.title }}</a>
    |
    <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date: "%b %-d" }}</time>
</p>

{% endfor %}
