import scrollIt from './smooth-scrolling';

const navLinks = document.querySelectorAll(`a.header__link--nav`);
const home = document.querySelector(`nav.header__nav.home`);

if (home) {
  navLinks.forEach(link => {
    const target = link.getAttribute(`data-target`);
    link.addEventListener(`click`, () => {
      scrollIt(document.querySelector(`#${target}`), 500, `easeOutQuad`);
    });
    link.removeAttribute(`href`);
  });
}
