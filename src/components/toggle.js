import React from 'react';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import ThemeContext from '../context/themeContext';

const ThemeToggle = () => (
  <ThemeContext.Consumer>
    {theme => (
      <button
        type="button"
        className={cx(
          styles.absolute,
          styles.contentCenter,
          styles.flex,
          styles.itemsFlexStart,
          styles.themeWrap
        )}
        onClick={theme.toggle}
      >
        <span className={styles.sr}>Theme Switcher</span>
        <span
          aria-hidden="true"
          data-dark={theme.dark}
          className={cx(styles.toggle, { [styles.themeDark]: theme.dark })}
        />
      </button>
    )}
  </ThemeContext.Consumer>
);

export default ThemeToggle;
