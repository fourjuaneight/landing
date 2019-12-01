import React from 'react';
import PropTypes from 'prop-types';

import ThemeToggle from './toggle';
import {
  HeaderInner,
  HeaderMain,
  Home,
  Nav,
  NavLink,
  Sep,
} from './util/styleEl';

const Header = ({ title }) => (
  <HeaderMain>
    <HeaderInner>
      <Home>
        <NavLink to="/" rel="me" id="title">
          <strong>{title}</strong>
        </NavLink>
      </Home>
      <Nav>
        <NavLink to="/posts/">
          <strong>Posts</strong>
        </NavLink>
        <Sep aria-hidden="true">::</Sep>
        <NavLink to="/about/">
          <strong>About</strong>
        </NavLink>
      </Nav>
    </HeaderInner>
    <ThemeToggle />
  </HeaderMain>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
