import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import ThemeToggle from './toggle';
import {
  absolute,
  content,
  contentBetween,
  contentFlexStart,
  flex,
  flexColumn,
  f4,
  grid,
  itemsFlexEnd,
  itemsFlexStart,
  left0,
  ma0,
  mb0,
  mra,
  normal,
  noUnderline,
  pb1,
  pl2,
  pr2,
  pt1,
  relative,
  right0,
  top0,
  w100,
  zUnder,
} from './styleUtils';

const HeaderMain = styled.header`
  ${grid};
  ${ma0};
  ${pb1};
  ${pl2};
  ${pr2};
  ${pt1};
  ${relative};
  ${w100};

  background-color: var(--bg-dark);
  border-color: var(--primary);
  border-style: solid;
  border-width: 0 0 1rem 0;
  grid-column: 1/4;
  grid-row: 1/2;
  grid-template-columns: auto minmax(11.5rem, 73rem) 2rem auto;

  &::before {
    ${absolute};
    ${content};
    ${left0};
    ${right0};
    ${top0};
    ${w100};
    ${zUnder};

    background-color: var(--primary-light);
    bottom: -2rem;
    min-height: 1rem;
  }
`;

const HeaderInner = styled.div`
  ${contentBetween};
  ${grid};
  ${w100};

  grid-column: 2/3;
  grid-template-columns: repeat(auto-fit, 12rem);
`;

const Home = styled.h1`
  ${contentFlexStart};
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${mb0};
  ${mra};
  ${noUnderline};
  ${pb1};
  ${pt1};
  ${relative};

  grid-column: 1/2;
  width: 7.5rem;
`;

const Nav = styled.nav`
  ${contentBetween};
  ${flex};
  ${itemsFlexEnd};
  ${pb1};
  ${pt1};
  ${w100};

  max-height: 3.5rem;
  max-width: 10.5rem;
`;

const NavLink = styled(Link)`
  ${normal};

  &,
  &:hover,
  &:visited {
    ${f4};

    color: hsl(64, 32%, 96%);
  }
`;

const Sep = styled.span`
  color: var(--meta);
  line-height: 1.5;
`;

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
