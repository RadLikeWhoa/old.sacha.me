var _body = document.body,
    _menuToggle = document.querySelector('.js-menu-toggle')

function getBase (url) {
  return url.replace(/(http(s)?:\/\/)?(www\.)?/, '').split('/')[0]
}

function getPostLinks () {
  var links = document.querySelectorAll('.post-body a'),
      list = document.querySelector('.post-links ol'),
      html = ''

  for (var i = 0, j = links.length; i < j; i++) {
    var href = links[i].href,
        title = links[i].title,
        base = getBase(href),
        prefix = getBase(window.location.href) !== base ? '→ ' : ''

    if (!href || window.location.origin + window.location.pathname === href.replace(/#(.*)/, '')) continue

    html += '<li><a href="' + href + '">' + prefix + base + '</a>' + (title ? '<div>' + title + '</div>' : '') + '</li>'
  }

  if (!html || !list) return

  list.innerHTML = html
  list.parentNode.style.display = 'block'
}

function init () {
  if (_body.classList.contains('page-post')) {
    getPostLinks()
  }

  if (_menuToggle) {
    _menuToggle.addEventListener('click', function () {
      this.parentNode.classList.toggle('is-open')
    })
  }
}

init()