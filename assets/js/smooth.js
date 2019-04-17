const anchorLinkHandler = link => {
  const distanceToTop = el => {
    return Math.floor(el.getBoundingClientRect().top);
  };

  const targetAnchor = document.getElementById(link);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);

  window.scrollBy({ behavior: `smooth`, left: 0, top: originalTop });

  const checkIfDone = setInterval(() => {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = `-1`;
      targetAnchor.focus();
      clearInterval(checkIfDone);
    }
  }, 100);

  window.history.pushState(``, ``, `#${link}`);
};

const navLinks = document.querySelectorAll(`a.header__link--nav`);

navLinks.forEach(link => {
  const target = link.getAttribute(`data-target`);
  link.addEventListener(`click`, () => {
    link.onclick = anchorLinkHandler(target);
  });
  link.removeAttribute(`href`);
});
