(function () {

  // Get all the links on post pages and create a list of all in-post URLs.

  if ('querySelector' in document) {
    var links = document.querySelectorAll('.post-body a'),
        list = document.getElementById('post-links-list'),
        counter = 1,
        html = ''

    if (links && list) {
      for (var i = 0, j = links.length; i < j; i++) {
        var link = links[i],
            href = link.href.replace(/https?:\/\//, ''),
            title = link.title,
            backref

        // If the link doesn't have an href or if it's a link on the same page,
        // ignore it and continue.

        if (!href || window.location.origin + window.location.pathname === link.href.replace(/#(.*)/, '')) {
          continue
        }

        link.id = link.id || 'post-reference-' + counter
        counter += 1

        backref = '<a href="#' + link.id + '" title="Jump to context">' +
                    '<span class="icon icon-up"></span>' +
                  '</a>'

        html += '<div class="post-link-entry col med-col-1-2">' +
                  '<a class="post-link" href="' + href + '">' + href + '</a>' +
                  '<div>' + (title ? backref + ' ' + title : backref) + '</div>' +
                '</div>'
      }

      if (html) {
        list.innerHTML = html
        list.parentNode.style.display = 'block'
      }
    }
  }

  // Smooth-scroll to top function, largely based on
  // https://github.com/cferdinandi/smooth-scroll

  if ('requestAnimationFrame' in window && 'addEventListener' in window) {
    document.getElementById('topLink').addEventListener('click', function (e) {
      var start = window.pageYOffset
      var distance = start * -1
      var time = 0
      var raf, percentage, position

      e.preventDefault()

      var easing = function (time) {
        return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time
      }

      var scroll = function () {
        time += 30

        percentage = time / 1000
        percentage = percentage > 1 ? 1 : percentage

        position = start + (distance * easing(percentage))
        window.scrollTo(0, Math.floor(position))

        if (position > 0) {
          raf = requestAnimationFrame(scroll)
        }
      }

      raf = requestAnimationFrame(scroll)
    })
  }
}())