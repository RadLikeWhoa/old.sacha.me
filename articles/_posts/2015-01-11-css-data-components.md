---
title: "How I'm Using Data Attributes to Write CSS Components"
caption: "With BEM, SMACSS, OOCSS and other methodologies for CSS architecture there's been a lot of debating around which method is better than the others. AMCSS is a new contender for the throne and in this post I will outline how I'm using it to write CSS components."
---

In recent years, CSS architecture has become more and more important when authoring websites. No longer would web developers just throw some selectors around until everything looks the way it should. Instead we think about the architecture of our CSS files and how they help us become more efficient in creating our websites. After the recent redesign of my website, I thought I'd share some thoughts about how I write my CSS components.

# Basic principles

The focus of this whole debate lies on creating reusable modules that are decoupled from their content. This way stylesheets become much DRYer and writing HTML documents becomes a lot easier as you can rely on your modules to do much of the heavy lifting.

This basic principle remains the same throughout all methodologies. However, the execution of those ideas differs. Sometimes components are grouped and prefixed (as in [smacss](https://smacss.com "Scalable and Modular Architecture for CSS")), sometimes the focus lies on making the structure clearly visible (as in [BEM](https://bem.info "Base Object Modifier")) and sometimes the architecture just defines the mindset, without giving too much guidelines on writing the CSS (like [OOCSS](http://oocss.org "Object Oriented CSS")).

# The problem with those approaches

While all these architecture styles have good ideas and do a nice job at guiding CSS authors into the right direction, they all have their downsides. Consider, for example, a button with some different styles, written using the BEM ("Base, Element, Modifier") style.

``` html
<a class="button button--primary button--wide">Button</a>
```

``` css
.button {
  // ...
}

.button--primary {
  // ...
}

.button--wide {
  // ...
}
```

The problem is instantly visible. We end up with three classes. One for the basic button (`button`) and two for its modifiers (`button--primary button--wide`). Using a preprocessor you could extend the base class from within the modifiers, but this is also not a very elegant solution. To solve this exact problem, Glen Maddern and Ben Schwarz came up with [AMCSS](http://amcss.github.io "Attribute Module CSS").

# Attribute Modules

The idea is to use custom attributes on your HTML elements, instead of using classes. On their website, they provide the following example.

``` html
<!-- Large primary button -->
<a class="btn btn-primary btn-lg">Large primary button</a>
<!-- becomes -->
<a am-Button="primary large">Large primary button</a>
```

This way, you don't have to use a base class as the attribute itself acts as the base. It's also more readable and, in my opinion, easier to write. In your CSS you would use attribute selectors, like this:

``` css
[data-button] {
  // ...
}

[data-button~="primary"] {
  // ...
}

[data-button~="large"] {
  // ...
}
```

This example uses the tilde-attribute selector. This matches a keyword in a space-separated list. You could also use other attribute selectors, but this way you have a strict format to follow, preventing you from making mistakes.

As you can see, AMCSS doesn't let you write any less CSS. Instead, the CSS is more efficient and you can see clear benefits in your HTML.

I follow this style most of the time. However, I'm using standard `data-*` attributes, instead of custom attributes like `am-button`. This allows me to add and remove modifiers through JavaScript more easily.

``` javascript
link.dataset.button = 'primary large'
```

# An example: grid columns

To give you an example of how I use this style I'd like to show you my grid columns. The grid itself is a `data-grid` component, while the columns are `data-col` components. Just including those attributes in an HTML tag is enough, they don't need to have a value.

``` html
<div data-grid>
  <div data-col="1-2 M1-4 L1-5"></div>
  <div data-col="1-2 M1-4 L1-5"></div>
  <!-- ... -->
</div>
```

As you can see I'm using a standard grid component (possible modifiers would be `gutterless` or `rev`) wrapping some column components. My setup allows me to define columns for different breakpoints using a custom prefix. No prefix applies to all screens (no media query), 'M' applies to medium screens and 'L' applies to large screens.

``` css
[data-col~="1-2"] {
  width: 50%;
}

// ...

@media (min-width: 40em) {
  [data-col~="M1-4"] {
    width: 25%;
  }

  // ...
}

@media (min-width: 60em) {
  [data-col~="L1-5"] {
    width: 20%;
  }

  // ...
}
```

I've created a [Sass mixin](https://github.com/RadLikeWhoa/radlikewhoa.github.io/blob/master/_src/scss/_grid.scss "This site's source code for grids") to set up the column components in order to make the whole setup even more flexible.

# Conclusion

If, like me, you could never really get comfortable with BEM or similar concepts, AMCSS might just be perfect for you. It solves many of the problems other concepts face and it makes writing your HTML much easier and, honestly, even a bit more fun.

*[DRYer]: Don't repeat yourself