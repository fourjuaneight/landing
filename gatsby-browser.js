// Browser APIs
// https://www.gatsbyjs.org/docs/browser-apis/

require('./src/styles/critical.scss');

const addButtons = elements => {
  const fragment = document.createDocumentFragment();

  elements.forEach(el => {
    const button = document.createElement('button');

    fragment.appendChild(button);
    button.classList.add('copy-code');
    button.innerHTML = 'Copy';
    el.prepend(fragment);
  });
};

exports.onInitialClientRender = () => {
  const codeBlocks = document.querySelectorAll('div.gatsby-highlight > pre');

  addButtons(codeBlocks);
};

// Load Service Worker on production only.
exports.registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return true;
};
