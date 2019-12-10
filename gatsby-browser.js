import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from './src/context/themeContext';

import './src/styles/critical.scss';

const addButtons = elements => {
  const fragment = document.createDocumentFragment();

  for (const el of elements) {
    const button = document.createElement('button');

    fragment.appendChild(button);
    button.classList.add('copy-code');
    button.innerHTML = 'Copy';
    el.prepend(fragment);
  }
};

export const onInitialClientRender = () => {
  const codeBlocks = document.querySelectorAll('div.gatsby-highlight > pre');

  addButtons(codeBlocks);
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

export const registerServiceWorker = () => true;

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
