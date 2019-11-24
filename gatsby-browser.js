import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from './src/context/themeContext';

import './src/styles/critical.scss';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};