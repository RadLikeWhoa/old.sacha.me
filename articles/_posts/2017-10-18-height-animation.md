---
title: "Quick Tip: Animating height: auto;"
caption: "By default, height: auto; value cannot be used in CSS transitions or animations. However, there is a trick to getting it working."
---

<style>
	.demo-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 15em;
		padding: 1.5em;
		margin-bottom: 1.5em;
	}

  .demo-element {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 15em;
		color: #fff;
		text-align: center;
		border-radius: 3px;
		box-shadow: 0 2px 4px rgba(51, 51, 51, 0.25);
		overflow: hidden;
	}

	.demo-element p {
		margin: 1.5em;
	}

	.demo-auto {
		background-color: #4cadeb;
		animation: height-auto 3s ease-in-out infinite both alternate;
	}

	.demo-max {
		background-color: #eb894c;
		animation: height-max 3s ease-in-out infinite both alternate;
	}

	@keyframes height-auto {
		0% {
			height: 0;
		}

		100% {
			height: auto;
		}
	}

	@keyframes height-max {
		0% {
			max-height: 0;
		}

		100% {
			max-height: 15em;
		}
	}
</style>

Very often, applications rely on some kind of slide effect when toggling an element. This is quite common with things like accordions, where clicking on a heading toggles the following section open and closes all other sections. There you expect the opening section to start with a height of 0, and then expand to its full height. This state transformation is usually handled with a quick transition of the `height` property, in order to make the change less jarring to the user.

This all works fine when all sections have the same height. Then you can directly transition from `height: 0;` to `height: xy;`. If you don't know the sections height in advance, you might be tempted to transition to `height: auto;`, which doesn't really work.

<div class="demo-wrapper">
	<div class="demo-element demo-auto"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus consequat, fringilla turpis vel, blandit mi.</p></div>
</div>

```css
@keyframes height-auto {
  0% {
    height: 0;
  }

  100% {
    height: auto;
  }
}
```

The above example uses the `height-auto` animation. Clearly, no animation is happening. This is due to the fact that browsers can't handle the `auto` value. Now, the trick is to forget about `height` altogether, and instead focus on `max-height`.

<div class="demo-wrapper">
	<div class="demo-element demo-max"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus consequat, fringilla turpis vel, blandit mi.</p></div>
</div>

```css
@keyframes height-max {
  0% {
    max-height: 0;
  }

  100% {
    max-height: 15em;
  }
}
```

The above example uses the `height-max` animation. Immediately, you'll notice that the box is now animated, yay! We don't need to know the element's actual height in advance, all we need is an estimate as to what the height could be.

What you want to do is animate to a `max-height` that you expect to be larger than your element. Of course, this involves a bit of guessing, but in many cases you'll be able to make those guesses pretty accurately. This way, you can handle multiple different elements and still have all of them take up just the space they need.
