import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import base from '../styles/base.module.css';
import color from '../styles/color.module.css';
import main from '../styles/main.module.css';

const Header = ({ title }) => (
  <header
    className={cx(
      base.contentEmptyA,
      base.contentEmptyB,
      base.grid,
      base.relative,
      base.w100,
      color.bgBaseDark,
      color.bgPrimaryB,
      color.bgPrimaryLightA,
      color.brdSecondary,
      main.bottom0A,
      main.bottom0B,
      main.header,
      main.left0A,
      main.left0B,
      main.right0B,
      main.rightAB
    )}
  >
    <div
      className={cx(
        base.grid,
        base.justifyBetween,
        base.w100,
        main.headerInner
      )}
    >
      <Link
        className={cx(base.relative, base.tdn, main.homeLink)}
        to="/"
        rel="me"
        id="title"
      >
        <strong>{title}</strong>
      </Link>
      <nav
        className={cx(
          base.flex,
          base.itemsCenter,
          base.justifyBetween,
          base.w100,
          main.nav
        )}
      >
        <Link className={cx(base.tdn)} to="/posts/">
          <strong>Posts</strong>
        </Link>
        <span className={color.meta} aria-hidden="true">
          ::
        </span>
        <Link className={cx(base.tdn)} to="/about/">
          <strong>About</strong>
        </Link>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
