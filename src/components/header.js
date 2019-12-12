import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { HeaderInner, HeaderMain, HomeLink, Nav, Sep } from './util/styleEl';

const Header = ({ title }) => (
  <HeaderMain>
    <HeaderInner>
      <HomeLink to="/" rel="me" id="title">
        <strong>{title}</strong>
      </HomeLink>
      <Nav>
        <Link to="/posts/">
          <strong>Posts</strong>
        </Link>
        <Sep aria-hidden="true">::</Sep>
        <Link to="/about/">
          <strong>About</strong>
        </Link>
      </Nav>
    </HeaderInner>
  </HeaderMain>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
