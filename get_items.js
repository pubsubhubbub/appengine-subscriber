/**
 * Refresh items by fetching recent entries.
 */
function refreshItems() {
  var req = new XMLHttpRequest();
  req.open('GET', '/items' + location.search, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        updateContent(req.responseText);
      }
    }
  };
  req.send(null);
}

/**
 * Update subscribers page content.
 * @param {string} response JSON response containing the serialized items list.
 */
function updateContent(response) {
  var now = new Date();
  var content = ['<div class="header">',
                 '<strong>Last update:</strong> ', now.toTimeString(),
                 '</div>',
                 '<hr />'];
  var items = JSON.parse(response);
  if (items.length == 0) {
    content.push('<div>Nothing yet.</div>');
  } else {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      var item_time = new Date(item.time_s * 1000);
      content.push('<div class="entry">');

      content.push('<div><strong>', item.title, '</strong> ');
      content.push('at <em>', item_time.toTimeString(), '</em>');
      content.push('</div>');

      content.push('<div>from ');
      if (item.topic)
        content.push('<a href="', item.topic, '">', item.topic, '</a> => ');
      content.push('<a href="', item.source, '">', item.source, '</a> ');
      content.push('via ', item.callback, '</div>');

      content.push('<div>', item.content, '</div>');

      content.push('</div>');
    }
  }

  document.getElementById('content').innerHTML = content.join('');
}

/**
 * Start the initial refresh on load.
 */
window.onload = refreshItems;
window.setInterval(refreshItems, 30 * 1000);
