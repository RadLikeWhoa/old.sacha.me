---
title: "JSONP, Demystified"
caption: "When dealing with APIs, JSONP is all the rage these days. There is a number of reasons as to why this specification reached such popularity, but there's also a lot of uncertainity when it comes to actually using it. Most people would be all like 'Ugh, JSONP is easy, just use jQuery!' But as usual, 'just use jQuery' is not an acceptable answer for everyone."
---

JSONP is a way to share data between different domains. As the name suggests, it stems from JSON ("JavaScript Object Notation"), but with a wrapper around it (called "padding").

Now, you might be wondering what's wrong with using plain JSON. Most browsers follow the so-called [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy "Same-origin policy on MDN") which prevents websites from accessing files from other domains unless that permission is explicitly granted through [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing "CORS on Wikipedia"). The only part of a website that isn't subject to this is the script tag.

Knowing that we can use this trick to get around the same origin policy we can embed a script file served from a different domain containing something a little like the following.

```html
<script src="http://example.com/people/1234?callback=awesome"></script>
```

```javascript
awesome({"Id": 1234, "Name": "Foo", "Job": "Bar"});
```

What exactly have we done here? We've added a script tag with its source set to a JSON resource on a different domain. But in the src-attribute we specify a callback parameter—`callback=`, sometimes also `jsonp=`—which you'll notice again in the actual response. This is the "P" in JSONP, the padding. Ideally, the callback you specify should exist before requesting the external resource.

To sum it up, a JSONP script calls a function with the data you've requested as the only argument.

# But I want an easy-to-use function!

It can be very much cumbersome to always go through the following steps:

1. Define a callback function that will receive the data later on.
2. Add the script tag to request the data.
3. Clean up?

That's why libraries like jQuery have [made it easy](http://api.jquery.com/jQuery.getJSON/ "jQuery's getJSON function") to request JSONP data. Note the callback parameter. This tells jQuery that it should perform a JSONP request, otherwise you'd get an error because it would try to perform an AJAX request.

```javascript
$.getJSON('http://example.com/people/1234?callback=?', function (data) {
  // ...
})
```

But in the end it's pretty easy to define such a function to properly understand it. So let's do just that. Don't worry, I'll walk you through it step by step in just a second.

```javascript
(function () {
  var _callbacks = 0

  window.jsonp = function (url, callback) {
    var id = 'jsonp_cb_' + _callbacks,
        existing = document.scripts[0],
        script = document.createElement('script')

    script.src = url + (~url.indexOf('?') ? '&' : '?') + 'callback=' + id
    existing.parentNode.insertBefore(script, existing)

    window[id] = function (data) {
      script.parentNode.removeChild(script)
      callback(data)
      delete window[id]
    }

    _callbacks += 1
  }
}())
```

This piece of code adds a `jsonp` function to the `window` that accepts the url you want to send a request to and a callback to exectue once this request has finished. The callback you specify is attached to the window so the requested script has no problem finding and calling it. After the callback has finished, both the external resource and the `window`'s newly attached callback function will be removed.

First off, we wrap everything in an [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Ben Alman on IIFE") so we can mind our own business without interfering with any other scripts on the page.

```javascript
(function () {
  // ...
}())
```

Next we'll take care of the ID. We need a unique identifier to name our callback so we don't clash with any other callbacks. We use the `_callbacks` variable to store a simple number which we'll increment with every function call.

In the actual `jsonp` function we set up our variables first.

```javascript
var id = 'jsonp_cb_' + _callbacks,
    existing = document.getElementsByTagName('script')[0],
    script = document.createElement('script')
```

`id` holds the string "jsonp_cb_" joined with our previously defined number because, as you might know, variables in JavaScript must not start with a number. Also, just the number might not be so unique after all. The next two variables are references to the first script on the page (`existing`) which we'll use insert our new script (`script`).

(Note: If you want to support Firefox < 9 you'll have to use `document.getElementsByTagName('script')[0]` instead of `document.scripts[0]`.)

After setting all our variables we'll have to build up the scripts source and actually insert it into the page.

```
script.src = url + (~url.indexOf('?') ? '&' : '?') + 'callback=' + id
existing.parentNode.insertBefore(script, existing)
```

When setting the src-attribute we check if it contains a question mark already. If it does we'll have to add the callback parameter preceded by an ampersand, otherwise preceded by a question mark. This is simply how query strings are handled. The callback parameter is set to a function with the unique name we have stored in our ID. You'll see this function in a second.

Inserting a DOM node isn't the prettiest thing in JavaScript, but it's easy. We'll insert the newly created script right before the first existing script. To do that, we'll have to access the existing script's parent—usually the `<head>` or the `<body>`—and call the `insertBefore` method on it. This method receives the new DOM node to be insterted and the node it should be insterted before.

At this point we'll have to attach the callback function to the window.

```javascript
window[id] = function (data) {
  script.parentNode.removeChild(script)
  callback(data)
  delete window[id]
}
```

You might be suprised that this is not the function you actually define when calling `jsonp`. This is because this function also handles the cleaning up for you. First it removes the requested script from the page, then it calls your callback from the function call and at the end it will remove itself from the window. That means that there are no unnecessary traces left from your request and you can handle the data however you want.

(Note: Deleting a property on the window might cause errors in older browsers. There are [easy ways](http://stackoverflow.com/questions/1073414/deleting-a-window-property-in-ie "Solution for the delete property bug in older browsers") around this though.)

As a last step we have to increase the ID. Now we can be sure that our request will work out just fine and everything will be cleaned up. But is it too early to party?

# Even JSONP has downsides

JSONP has downsides. Some pretty major downsides, even. First off, there is no proper error handling. As there are no satus codes and no response codes sent, you'll have to hope for the best to happen. And there is more than one place where things can go wrong.

The url you requested can be outdated or simply contain a typo. The `jsonp` function has no way to know about this as it just insterts a script onto the page. But even if the request is successful you'll have to check if the data returned is correct and there is no standardised way to do this. Some APIs offer error messages, some don't. And usually, no two API providers structure their content the same way.

As with every other technology, security concerns are raised, but with JSONP, the concerns have a valid point. A script requested through JSONP can hold any JavaScript. There is no globally accepted specification that forces a specific format. That means your requested file can happily execute whatever it wants to and you probably won't even notice it. There are [proposals for a safer solution](http://json-p.org "Proposal for safer JSONP"), but they have yet to be enforced.

# Conclusion

There's not too much of a conclusion to draw here. Use JSONP if you want to use an API that doesn't support CORS. Don't use JSONP if you're too concerned about security issues or want proper error handling.

Note that, while this function is rather robust and works in most situations, some APIs don't use `callback` for the parameter name. If that's the case, just change the line in the function.