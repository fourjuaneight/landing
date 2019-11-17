import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

const Header = ({ title }) => (
  <header
    className={cx(
      styles.grid,
      styles.ma0,
      styles.pb1,
      styles.pl2,
      styles.pr2,
      styles.pt1,
      styles.relative,
      styles.w100
    )}
  >
    <div
      className={cx(
        styles.contentBetween,
        styles.grid,
        styles.heade_inner,
        styles.w100
      )}
    >
      <h1
        className={cx(
          styles.contentFlexStart,
          styles.flex,
          styles.flexColumn,
          styles.home,
          styles.itemsFlexStart,
          styles.mb0,
          styles.mra,
          styles.noUnderline,
          styles.pb1,
          styles.pt1,
          styles.relative
        )}
      >
        <Link to="/" rel="me" className={styles.font_inverted} id="title">
          <strong>{title}</strong>
        </Link>
      </h1>
      <nav
        className={cx(
          styles.contentBetween,
          styles.flex,
          styles.pb1,
          styles.pt1,
          styles.w100
        )}
      >
        <Link to="/posts/" className={styles.font_inverted}>
          <strong>Posts</strong>
        </Link>
        <span aria-hidden="true" className={styles.sep}>
          ::
        </span>
        <Link to="/about/" className={styles.font_inverted}>
          <strong>About</strong>
        </Link>
      </nav>
    </div>
    <label
      htmlFor="theme"
      className={cx(
        styles.absolute,
        styles.contentCenter,
        styles.flex,
        styles.itemsFlexStart,
        styles.theme_wrap
      )}
    >
      <input
        type="checkbox"
        name="theme-switcher"
        className={cx(styles.sr, styles.theme, styles.zUnder)}
        id="theme"
      />
      <span className={styles.sr}>Theme Switcher</span>
      <span aria-hidden="true" className={styles.toggle} />
    </label>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
