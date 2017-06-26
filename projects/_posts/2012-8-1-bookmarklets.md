---
title: bookmarklets
tags:
  - Web
  - Site
  - Node.js
learned:
  - Open Source
  - Build Processes
  - Templating
  - Design
  - Development
technologies:
  - HTML
  - CSS
  - Sass
  - Node.js
pattern: checker
background: rgb(122, 124, 115)
link: https://sacha.me/bookmarklets/
repo: https://github.com/RadLikeWhoa/bookmarklets
team: 1
---

Many internet users, even casual ones, use bookmarklets on a regular basis. bookmarklets are little links that reside in the browser's bookmarks bar that, when clicked, do things like tweeting the current website or saving a site's images to *Pinterest*.

The idea came to me when I read some articles by [Federico Viticci](http://macstories.net) about his workflows and techniques for automation. A huge part of those techniques relied on bookmarklets. I decided to look for a nice website that collected those little tools and when I couldn't find one I liked, I decided to come up with my own.

I first released a demo on [CodePen](http://codepen.io), but later I decided to turn it into a full-fledged website. People like it, there's a steady stream of visitors to the site and since the initial release, the open source community added several new bookmarklets.

# Things I've learned

{% include tags.html tags = page.learned %}

The most interesting part about this project is working with the community. As a single person, I can't even begin to cover a decent amount of bookmarklets, so I depend on other people adding their own contributions. So far, those collaborative efforts have been very enjoyable and they've helped the site grow quite a bit.

<figure>
  <img src="/assets/img/bookmarklets/overview.png">
  <figcaption data-marginalia="right">Colour is an important part of the project. It helps users quickly discover their favourite networks.</figcaption>
</figure>

Other than that, this was one of my first projects to rely on a build system, specifically [gulp](http://gulpjs.com). While this involved lots of head-scratching at first, it didn't take very long until I started seeing the benefits of my setup. And now, I would never create this site without a build system again.

# Technologies I've used

{% include tags.html tags = page.technologies %}

I experimented with different approaches to templating. This includes [Underscore](http://underscorejs.org) and [Handlebars](http://handlebarsjs.com) templates, but I ended up using [Mustache](http://mustache.github.io) templates, because they fit best with what I wanted to achieve.

All bookmarklets are saved within their own JSON data files. This makes it easier to maintain, but it also means there needs to be some sort of concatenation. That's where [Node.js](http://mustache.github.io) cam into the play. Using plain Node inside my gulp setup allowed me to easily concatenate the files, feed all the data into my templates and generate the full site very efficiently.
