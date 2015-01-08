(function () {
  if (!('querySelector' in window)) {
    return false
  }

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

      if (!href || window.location.origin + window.location.pathname === link.href.replace(/#(.*)/, '')) continue

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
}())