import './src/styles/critical.scss';

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

export const onInitialClientRender = () => {
  const codeBlocks = document.querySelectorAll('div.gatsby-highlight > pre');

  addButtons(codeBlocks);
};

export const registerServiceWorker = () => true;
