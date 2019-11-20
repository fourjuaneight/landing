import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

let osTheme = false;
const defaultState = {
  dark: false,
  toggle: () => {},
};

if (typeof window !== 'undefined') {
  osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  // localStorage bool comes back as string
  const darkTheme = localStorage.getItem('darkTheme');
  // strict operator for localStorage conversion to bool
  const localTheme = darkTheme === 'true';
  // if no localStorage present, use prefers-color-scheme
  const curTheme = darkTheme === null ? osTheme : localTheme;
  const [dark, setDark] = useState(curTheme);

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem('darkTheme', isDark);
    setDark(isDark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
export { ThemeProvider };
