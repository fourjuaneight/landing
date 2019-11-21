import React, { useContext } from 'react';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import ThemeContext from '../context/themeContext';

const ThemeToggle = () => {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={cx(
        styles.absolute,
        styles.contentCenter,
        styles.flex,
        styles.itemsFlexStart,
        styles.themeWrap
      )}
      onClick={toggle}
    >
      <span className={styles.sr}>Theme Switcher</span>
      <span
        aria-hidden="true"
        className={cx(styles.toggle, { [styles.themeDark]: dark })}
      />
    </button>
  );
};

export default ThemeToggle;
