(function () {

  // This fixes the sometimes jumping animation of the active navigation item
  // backdrop.

  setTimeout(function () {
    document.getElementById('activeItem').className += ' transitioning'
  }, 0)

  // Get all the links on post pages and create a list of all in-post URLs.
  // querySelector is a requirement for this function. If it's not available,
  // the function won't run.

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

        // All links get an auto-incremented counter, unless they already have
        // a defined ID.

        backref = '<a href="#' + link.id + '" title="Jump to context">' +
                    '<span data-icon="up"></span>' +
                  '</a>'

        // The final HTML is one half-width column, including the link itself,
        // the title and the backref.

        html += '<div class="post-link-entry col med-col-1-2">' +
                  '<a class="post-link" href="' + href + '">' + href + '</a>' +
                  '<div>' + (title ? backref + ' ' + title : backref) + '</div>' +
                '</div>'
      }

      // The list is only displayed if there are any links.

      if (html) {
        list.innerHTML = html
        list.parentNode.style.display = 'block'
      }
    }
  }

  // Smooth-scroll to top function, largely based on
  // https://github.com/cferdinandi/smooth-scroll
  // Both requestAnimationFrame and addEventListener are required for this
  // function to run.

  if ('requestAnimationFrame' in window && 'addEventListener' in window) {
    document.getElementById('topLink').addEventListener('click', function (e) {
      var start = window.pageYOffset
      var distance = start * -1
      var time = 0
      var raf, percentage, position

      e.preventDefault()

      // The easing function is an easeInOutQuad function.

      var easing = function (time) {
        return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time
      }

      // The distance to scroll for each iteration is calculated using the
      // passed time and the overall distance. Using requestAnimationFrame we
      // can achieve 30fps.

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