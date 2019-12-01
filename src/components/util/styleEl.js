import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import {
  absolute,
  aSelfCenter,
  backgroundAccent,
  backgroundAccentLight,
  bottom0,
  content,
  contentBetween,
  contentCenter,
  contentFlexStart,
  f2,
  f3,
  f4,
  f5,
  f6,
  flex,
  flexColumn,
  flexWrap,
  grid,
  itemsCenter,
  itemsFlexStart,
  itemsStart,
  jSelfEnd,
  left0,
  ma0,
  mb0,
  mb1,
  meta,
  mHorizontal,
  mr1,
  mra,
  normal,
  noUnderline,
  overflowHidden,
  pa2,
  pb1,
  pb2,
  pl2,
  pr2,
  pt1,
  pt2,
  relative,
  right0,
  top0,
  transitionAll,
  w100,
  z1,
  z5,
  zUnder,
} from './styleUtils';

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

// Header
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
  ${itemsCenter};
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

// Toggle
const Toggle = styled.button`
  ${absolute};
  ${contentCenter};
  ${flex};
  ${itemsFlexStart};
  ${right0};

  cursor: pointer;
  background: none;
  border: none;
  grid-column: 3/4;
  height: 1.05rem;
  margin: 0.35rem 0.25rem 0.25rem;
  outline: none;
  top: 1.85rem;
  width: 1.05rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Name = styled.span`
  ${absolute};
  ${overflowHidden};

  clip: rect(0.1rem, 0.1rem, 0.1rem, 0.1rem);
  height: 0.1rem;
  width: 0.1rem;
`;

const Icon = styled.span`
  height: 1.05rem;
  min-width: 1.05rem;

  &::after,
  &::before {
    animation: ${fadeIn} 2s;
  }

  &::after {
    ${absolute};
    ${content};
    ${ma0};
    ${transitionAll};

    border-radius: 1rem;
    display: inherit;
    height: 1.05rem;
    vertical-align: middle;
    width: 1rem;
  }

  &::before {
    ${absolute};
    ${backgroundAccentLight};
    ${bottom0};
    ${content};
    ${top0};
    ${transitionAll};
    ${z5};

    background: transparent;
    box-shadow: 0.3125rem 0.3125rem 0 0 var(--primary-light);
    border-radius: 100%;
    height: 1rem;
    right: 1rem;
    transform: rotate(-45deg);
    width: 1rem;
  }

  ${({ dark }) =>
    dark &&
    `
    &::before {
      background: var(--primary-light);
      box-shadow: unset;
      right: 0.5rem;
    }
  `};
`;

// Footer
const FooterMain = styled.footer`
  ${contentCenter};
  ${grid};
  ${itemsStart};
  ${mHorizontal};
  ${pa2};
  ${relative};
  ${w100};

  background-color: var(--bg-dark);
  border-color: var(--primary);
  border-style: solid;
  border-width: 1rem 0 0;
  grid-column: 1/4;
  grid-gap: 1em;
  grid-row: 3/4;
  grid-template-columns: 6.5em minmax(10.5em, 32em);
  grid-template-rows: min-content 2.5em;

  &::before {
    ${absolute};
    ${backgroundAccentLight};
    ${bottom0};
    ${content};
    ${left0};
    ${right0};
    ${w100};
    ${zUnder};

    top: -2rem;
    min-height: 1rem;
  }
`;

const FooterCopy = styled.section`
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${mb1};
  ${normal};
  ${w100};

  max-width: 32rem;

  &,
  &:hover,
  &:visited {
    ${f4};

    color: hsl(64, 32%, 96%);
  }
`;

const FootHead = styled.h3`
  ${f4};
  ${ma0};
  ${mb1};
`;

const FootBody = styled.p`
  ${f5};

  max-width: 32rem;
`;

const DL = styled.dl`
  ${aSelfCenter};
  ${contentBetween};
  ${flex};
  ${itemsCenter};
  ${jSelfEnd};
  ${ma0};
  ${w100};

  grid-column: 2/3;
  grid-row: 2/3;
  max-width: 8rem;
`;

const DT = styled.dt`
  ${absolute};
  ${overflowHidden};

  clip: rect(0.1rem, 0.1rem, 0.1rem, 0.1rem);
  height: 0.1rem;
  width: 0.1rem;
`;

const DD = styled.dd`
  ${ma0};

  height: 2.5em;
  width: 2.5em;
`;

const SocialLink = styled.a`
  ${contentCenter};
  ${flex};
  ${itemsCenter};
  ${noUnderline};
  ${relative};

  height: 2.5em;
  width: 2.5em;

  svg {
    fill: #fff;
    transition: fill var(--duration) ease-in-out;
  }

  &:hover {
    svg {
      fill: var(--primary-light);
    }
  }
`;

// Title
const H1 = styled.h1`
  ${f2};
  ${mra};
  ${relative};

  margin-top: 0.75rem;

  &::before {
    ${absolute};
    ${backgroundAccent};
    ${bottom0};
    ${content};
    ${left0};
    ${z1};

    height: 0.15rem;
    width: 3rem;
  }
`;

// Article
const ArticleMain = styled.article`
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${mHorizontal};
  ${w100};
`;

const Permalink = styled(Link)`
  margin: 1rem 0;
`;

const PermaTitle = styled.h2`
  ${f3};
  ${ma0};
`;

const MetaWrap = styled.section`
  ${contentBetween};
  ${flex};
  ${flexWrap};
  ${w100};

  margin-bottom: 0.75rem;
`;

const Time = styled.time`
  ${f6};
  ${meta};
  ${mra};
`;

const Tag = styled.p`
  ${f6};
  ${ma0};
  ${mr1};
`;

const Hash = styled.span`
  ${meta};
`;

const TagLink = styled(Link)`
  ${meta};

  &:hover {
    color: var(--font);
  }
`;

// List
const Feed = styled.section`
  ${contentFlexStart};
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${w100};
`;

// Layout
const Main = styled.main`
  ${mHorizontal};
  ${pb2};
  ${pt2};
  ${w100};
  grid-column: 2/3;
  grid-row: 2/3;
  min-height: calc(100vh - 22rem);
`;

export {
  ArticleMain,
  DD,
  DL,
  DT,
  Feed,
  FootBody,
  FooterCopy,
  FooterMain,
  FootHead,
  H1,
  Hash,
  HeaderInner,
  HeaderMain,
  Home,
  Icon,
  Main,
  MetaWrap,
  Name,
  Nav,
  NavLink,
  Permalink,
  PermaTitle,
  Sep,
  SocialLink,
  Tag,
  TagLink,
  Time,
  Toggle,
};
