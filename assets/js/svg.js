const icons = document.querySelectorAll(`.social__icon`);
const iconPaths = document.querySelectorAll(`.social__icon`);

if (`caches` in window) {
  caches.open(`static`).then(cache => {
    iconPaths.forEach(el => {
      cache.put(
        `/img/${el.id}.svg`,
        new Response(el.outerHTML, {
          headers: { 'Content-Type': `image/svg+xml` },
        })
      );
    });
  });
}

icons.forEach(icon => {
  const url = icon.querySelector(`use`).getAttribute(`xlink:href`); // Might wanna look for href also
  fetch(url)
    .then(response => {
      return response.text();
    })
    .then(data => {
      // This is probably a bit layout-thrashy. Someone smarter than me could probably fix that up.

      // Replace the <svg><use></svg> with inline SVG
      const newEl = document.createElement(`span`);
      newEl.innerHTML = data;
      icon.parentNode.replaceChild(newEl, icon);

      // Remove the <span>s
      const parent = newEl.parentNode;
      while (newEl.firstChild) parent.insertBefore(newEl.firstChild, newEl);
      parent.removeChild(newEl);
    });
});
