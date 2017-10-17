(function () {
  const loop = function (el, cb) {
    Array.prototype.forEach.call(el, cb)
  }

  // This fixes the sometimes jumping animation of the active navigation item
  // backdrop.

  setTimeout(function () {
    document.body.className += 'has-transitions'
  }, 0)

  // Get all the links on post pages and create a list of all in-post URLs.

  ;(function () {
    const links = document.querySelectorAll('.post-body a')
    const list = document.getElementById('post-links-list')
    let counter = 0
    let html = ''

    if (!links || !list) {
      return
    }

    loop(links, function (link) {
      const href = link.href

      // If the link doesn't have an href or if it's a link on the same page,
      // ignore it and continue.

      if (!href || href.indexOf(window.location.host + window.location.pathname) !== -1) return

      // All links get an auto-incremented counter, unless they already have
      // a defined ID.

      link.id = link.id || 'p-ref-' + (counter++)

      // The final HTML is one half-width column, including the link itself,
      // the title and the backref.

      html += '<div class="post-link-entry" data-col="M1-2">' +
                '<a class="post-link" href="' + href + '">' + href.replace(/https?:\/\//, '') + '</a>' +
                '<div>' +
                  '[<a href="#' + link.id + '" title="Jump to context">' +
                    '<span data-icon="up"></span>' +
                  '</a>] ' +
                  link.title +
                '</div>' +
              '</div>'
    })

    // The list is only displayed if there are any links.

    list.innerHTML = html
    list.parentNode.style.display = 'block'
  }())

  // Smooth-scroll to top function, largely based on
  // https://github.com/cferdinandi/smooth-scroll

  ;(function () {
    document.getElementById('topLink').addEventListener('click', function (e) {
      let position = window.pageYOffset
      let time = 0
      let raf, percentage

      e.preventDefault()

      // The easing function is an easeInOutQuad function.

      const easing = function (time) {
        return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time
      }

      // The distance to scroll for each iteration is calculated using the
      // passed time and the overall distance. Using requestAnimationFrame we
      // can achieve 30fps.

      const scroll = function () {
        if (window.pageYOffset > position) return

        percentage = (time += 60) / 3000

        position -= (position * easing(Math.min(1, percentage)))
        window.scrollTo(0, Math.floor(position))

        if (position > 0) {
          raf = requestAnimationFrame(scroll)
        }
      }

      raf = requestAnimationFrame(scroll)
    })
  }())

  ;(function () {
    const anchor = document.getElementById('content-start')

    document.getElementById('skip').addEventListener('click', function () {
      anchor.tabIndex = -1
      anchor.focus()
    })
  }())

  ;(function () {
    const filtersContainer = document.querySelector('.filters')

    if (!filtersContainer) {
      return
    }

    const filters = filtersContainer.querySelectorAll('.tag')
    const projects = document.querySelectorAll('.post-inline')
    let lastFilter = undefined

    loop(filters, function (f) {
      f.addEventListener('click', function (e) {
        e.preventDefault()

        filtersContainer.classList.remove('is-overlaid')

        const prev = document.querySelector('.tag.is-active')
        let prevSide = 'right'

        if (prev) {
          prev.classList.remove('is-active')
        }

        lastFilter = lastFilter === e.target.textContent ? undefined : e.target.textContent

        if (lastFilter) {
          f.classList.add('is-active')
          filtersContainer.classList.add('is-filtered')
        } else {
          filtersContainer.classList.remove('is-filtered')
        }

        Array.prototype.forEach.call(projects, function (p) {
          p.classList.remove('is-last')

          if (!lastFilter || p.getAttribute('data-project-tags').indexOf(lastFilter) !== -1) {
            p.querySelector('[data-grid]').setAttribute('data-grid', prevSide === 'right' ? '' : 'rev')
            prevSide = prevSide === 'right' ? 'left' : 'right'
            p.classList.remove('is-hidden')
            p.classList.add('is-visible')
          } else {
            p.classList.add('is-hidden')
            p.classList.remove('is-visible')
          }
        })

        const visibles = document.querySelectorAll('.is-visible')
        visibles[visibles.length - 1].classList.add('is-last')
      })
    })

    document.querySelector('.filter-toggle').addEventListener('click', function () {
      filtersContainer.classList.add('is-overlaid')
      document.body.classList.add('is-locked')
    })

    loop(document.querySelectorAll('.filter-close'), function (c) {
      c.addEventListener('click', function () {
        filtersContainer.classList.remove('is-overlaid')
        document.body.classList.remove('is-locked')
      })
    })
  }())
}())
