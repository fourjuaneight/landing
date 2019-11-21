import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

let osTheme;
const defaultState = {
  dark: false,
  toggle: () => {},
};

if (typeof window !== 'undefined') {
  osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem('darkTheme', isDark);
    setDark(isDark);
  };

  useEffect(() => {
    // localStorage bool comes back as string
    const darkTheme = localStorage.getItem('darkTheme');

    if (darkTheme !== null) {
      // strict operator for localStorage conversion to bool
      setDark(darkTheme === 'true');
    } else if (osTheme) {
      setDark(osTheme);
    }
  }, []);

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
