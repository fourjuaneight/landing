import scrollIt from './smooth-scrolling';

const footnoteLink = document.querySelectorAll(`a.footnote__link`);
const footnoteReturn = document.querySelectorAll(`a.footnote__return`);
const writing = document.querySelector(`nav.header__nav.writing`);

const smoothScroll = (el, target) => {
  el.forEach(link => {
    const anchor = link.getAttribute(target);
    link.addEventListener(`click`, () => {
      scrollIt(document.getElementById(`${anchor}`), 500, `easeOutQuad`);
    });
    link.removeAttribute(`href`);
  });
};

if (writing) {
  smoothScroll(footnoteLink, `data-foot`);
  smoothScroll(footnoteReturn, `data-note`);
}
