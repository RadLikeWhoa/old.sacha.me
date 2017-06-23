---
title: Countable
tags:
  - Web
  - Library
  - JavaScript
learned:
  - Development
  - Open Source
  - Testing
  - Documentation
  - Design
  - Continuous Integration
  - Package Managers
  - Versioning
technologies:
  - JavaScript
  - HTML
  - CSS
  - Sass
pattern: cloth
background: rgb(235, 164, 76)
link: https://sacha.me/Countable/
repo: https://github.com/RadLikeWhoa/Countable
team: 1
---

Countable is a JavaScript library to add live paragraph-, word- and character-counting to an HTML element. I created it because I was unsatisfied with existing solutions for this problem.

This project started when I was working on another side project where users would be able to enter text into an input field and the app would generate certain statistics about the entered text, this included basic information like a word count. I was browsing the internet to look for a similar idea I could use as a starting point, but all the existing solutions seemed unpolished or didn't even work properly. That's when I decided to start working on Countable.

It didn't take me very long to cover the basic functionality. However, when I got to testing my code in different browsers, things started to go downhill very quickly. It turns out many of the techniques I relied on worked vastly differently in all browsers. This was an interesting challenge and I was curious to find a solution that worked everywhere.

Apparently there was a strong desire in the web development community for a project like this. Countable quickly gained popularity and is now at over 1000 stars on GitHub. It's used in projects like the [Ghost blogging platform](https://ghost.org).

# Things I've learned

{% include tags.html tags = page.learned %}

When I first started out working on the project I assumed it would be rather simple, but it didn't take long until I ran into the first problems. Luckily, the open source community was [very interested](https://github.com/RadLikeWhoa/Countable/pulls?q=is%3Apr+is%3Aclosed) in Countable so there were lots of people willing to help improve the library.

This was more or less the first time I worked on a repository with multiple contributors so I had to learn how to manage issues, pull requests and how to communicate with people efficiently.

It was also very interesting to take testing more seriously than I have before. I've tried to include tests for all use cases and I'm monitoring tests using [TravisCI](http://travis-ci.org). While the setup was a little tedious at first I can now clearly see the benefits of automating tests in order to achieve better quality and to catch errors.

To make it easier for people to install and use Countable I chose to make them available through [bower](http://bower.io) and [npm](https://npmjs.com). This means I had to respect the semantic versioning conventions, which seem rather simple even though it's actually quite hard to know when a new version is needed.

# Technologies I've used

{% include tags.html tags = page.technologies %}

The library itself is just plain JavaScript. Additionally, there are no dependencies, which keeps the size low and makes it easier to use Countable in an environment without dependency management. Still, Countable is fully compatible with module loaders like AMD or CommonJS / Node.

For the demo and documentation site I wrote a static site using mostly just HTML, Sass and very little JavaScript. I use [gulp](http://gulpjs.com) to combine and minify assets and to set up a live testing server while I'm working on the site.
