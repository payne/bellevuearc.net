---
layout: base.njk
title: Blog
permalink: /blog/
---

{% assign posts = collections.post | reverse %}
{% if posts.size > 0 %}
<div class="blog-list">
{% for post in posts %}
  <div class="blog-post-item">
    <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    {% if post.data.author %}<span class="post-author">by {{ post.data.author }}</span>{% endif %}
  </div>
{% endfor %}
</div>
{% else %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}
