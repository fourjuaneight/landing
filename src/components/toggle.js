import React, { useContext } from 'react';

import ThemeContext from '../context/themeContext';
import { Icon, Name, Toggle } from './util/styleEl';

const ThemeToggle = () => {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <Toggle type="button" onClick={toggle}>
      <Name>Theme Switcher</Name>
      <Icon aria-hidden="true" dark={dark} />
    </Toggle>
  );
};

export default ThemeToggle;
