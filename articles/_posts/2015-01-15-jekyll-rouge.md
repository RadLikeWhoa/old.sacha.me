---
title: "Syntax Highlighting in Jekyll With Rouge"
caption: "Many blogs on the web are centred around code so syntax highlighting in code blocks is useful to help readers better understand the displayed code. Jekyll offers easy ways to integrate highlighting into the build chain, for example using Rouge."
---

Code, no matter what language it is in, can be complicated to read. That's why many blogs use syntax highlighting on their code blocks to help their readers better understand the displayed code.

Jekyll was created with this in mind so it offers easy integration with tools like [Pygments](http://pygments.org "Pygments' project page") to automatically highlight all code blocks in your posts. However, Pygments is written in Python, while Jekyll is written in Ruby. Because of this a [Ruby wrapper](https://github.com/tmm1/pygments.rb "Pygments.rb on GitHub") for the Python tool is needed, slowing builds down significantly.

Because of this, developers have come up with alternatives. One of those is called [Rouge](https://github.com/jneen/rouge "Rouge on GitHub") and in this post I will show you how you can (and why you should) integrate Rouge into your Jekyll setup.

# Benefits of using Rouge

First of all, it's a lot cleaner to use a Ruby-based syntax highlighter in a Ruby-based setup. You eliminate the need to spawn Python processes right away, which reduces your build time considerably.

At this point you might think of [CodeRay](http://coderay.rubychan.de "CodeRay's project page"), another Ruby-based syntax highlighter. You could also use that, but Rouge comes with support for all Pygments themes, making it easier to discover new styles for your code blocks. Also, Rouge is just a little bit faster.

On my admittedly small site, a standard `jekyll build` command took about 28 seconds to complete. Using CodeRay, the build time reduced to 18 seconds, while using Rouge cut the build time by another 2 seconds down to 16 seconds. A total saving of about **40%** is amazing, especially when you want to preview your posts regularly while you're writing them.

# Installing Rouge

The easiest way to use Rouge is using the [kramdown](http://kramdown.gettalong.org "kramdown's project page") markdown parser. They recently added native support for Rouge and Jekyll has been supporting kramdown for a while now.

First, make sure you're using a recent version of Jekyll (for example **2.5.0**). You can check your installed version using `jekyll -v`. Next up, you need to install kramdown and Rouge.

``` bash
gem install kramdown rouge
```

If you already have a version of kramdown on your machine, make sure it's at least on version **1.5.0**. If you've followed these steps so far you're now ready to use kramdown and Rouge within your Jekyll setup.

An earlier version of this article stated that GitHub could enable Rouge as an alternative syntax highlighter on GitHub Pages. However, due to [security concerns](https://github.com/github/pages-gem/pull/79#issuecomment-85997762 "Explanation on why GitHub isn't using Rouge for Pages"), it appears that they have decided not to add Rouge to the available toolset, but rather focus on their own highlighter, called PrettyLights. That highlighter is also written in Ruby, so most of the benefits of Rouge apply here as well. As of May 31, 2015 it is still not known when PrettyLights will be released, or when we'll be able to use it on GitHub Pages.
{: data-block="info" }

By the way, if, like me, you're always getting errors doing anything with Rouge, remember _it's called Rouge, not Rogue_.

# Using Rouge with Jekyll

As with all options concerning your builds, the place to add them is in your `_config.yml`. You might have an entry like `highlighter: pygments` in there, make sure to remove that. In my site's configuration I'm using the following options:

``` yaml
markdown: kramdown

kramdown:
  input: GFM
  syntax_highlighter: rouge
```

This tells Jekyll to use kramdown when parsing markdown files and to pass the two settings to kramdown whenever it's run. `input: GFM` allows me to use the same syntax for markdown files I'd use on GitHub, which is especially useful for code blocks. You can now write code blocks like this:

``` liquid
`​`` html
<a href="#">Hello world</a>
`​``
```

Note the `html` after the first pair of triple backticks (`). This tells Rouge what language to use for the code block. You can view all supported languages with samples on [Rouge's demo site](http://rouge.jayferd.us/demo "Rouge language demos").

Rouge adds classes to your code blocks, allowing you to style parts of your code from a stylesheet. Rouge has the added benefit of being compatible with stylesheets created for Pygments (of which there are _[lots](https://github.com/search?q=pygments+style "Find new Pygments themes")_).

The only drawback for now is that kramdown only lets you define the standard language to use for your code blocks, all other options are not yet supported. This also means that line numbers are not yet supported. If you absolutely want that feature, you'll have to wait for a little while.