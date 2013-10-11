var _menuToggle = document.getElementById('menu-toggle')

function getBase (url) {
  return url.match(/(https?:\/\/)?(www\.)?([^\/]+)/).pop()
}

function getPostLinks () {
  if (!('querySelector' in document)) return

  var links = document.querySelectorAll('.post-body a'),
      list = document.querySelector('.post-links ol'),
      counter = 1,
      html = ''

  if (!links || !list) return

  for (var i = 0, j = links.length; i < j; i++) {
    var link = links[i],
        href = link.href,
        title = link.title,
        base = getBase(href),
        prefix = getBase(window.location.href) !== base ? '<span class="icon icon-external"></span> ' : '',
        backref

    if (!href || window.location.origin + window.location.pathname === href.replace(/#(.*)/, '')) continue

    link.id = link.id || 'post-reference-' + counter
    counter += 1

    backref = '[<a href="#' + link.id + '" title="Jump to context"><span class="icon icon-up"></span></a>]'

    html += '<li class="small">' +
              '<a href="' + href + '">' + prefix + base + '</a>' +
              (title ? '<div>' + title + ' ' + backref + '</div>' : ' ' + backref) +
            '</li>'
  }

  if (!html) return

  list.innerHTML = html
  list.parentNode.style.display = 'block'
}

function init () {
  if (_menuToggle && 'addEventListener' in window) {
    _menuToggle.addEventListener('click', function () {
      this.parentNode.classList.toggle('is-open')
    })
  }

  getPostLinks()
}

init()
