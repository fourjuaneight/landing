import { Link } from 'gatsby';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

// Helpers
const absolute = `
  position: absolute;
`;

const content = `
  content: '';
`;

const backgroundAccentLight = `
  background-color: var(--primary-light);
`;

const hideVisually = `
  clip: rect(0.1rem, 0.1rem, 0.1rem, 0.1rem);
  height: 0.1rem;
  overflow: hidden;
  position: absolute;
  width: 0.1rem;
`;

const transitionAll = `
  transition: all var(--duration) ease;
`;

/* eslint-disable quotes */
const cover = area => {
  let props = `width: 100%; position: absolute;`;

  switch (area) {
    case 'top':
      props += ` left: 0; right: 0; top: 0;`;
      break;
    case 'bottom':
      props += ` bottom: 0; left: 0; right: 0;`;
      break;
    case 'left':
      props += ` bottom: 0; left: 0; top: 0;`;
      break;
    case 'right':
      props += ` bottom: 0; right: 0; top: 0;`;
      break;
    default:
      props += ` bottom: 0; left: 0; right: 0; top: 0;`;
      break;
  }

  return props;
};

/* eslint-disable id-length */
const sizes = (h, w) =>
  h && !w ? `height: ${h}; width: ${h};` : `height: ${h}; width: ${w};`;

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

// Header
const HeaderMain = styled.header`
  background-color: var(--bg-dark);
  border-color: var(--primary);
  border-style: solid;
  border-width: 0 0 0.75rem 0;
  grid-column: 1/4;
  grid-row: 1/2;
  grid-template-columns: auto minmax(11.5rem, 73rem) 2rem auto;
  padding: 1.6875rem 1.5rem;

  &::before {
    ${content};
    ${cover('bottom')};

    background-color: var(--primary-light);
    bottom: -1.5rem;
    min-height: 0.75rem;
  }

  a {
    &,
    &:hover,
    &:visited {
      color: hsl(64, 32%, 96%);
      font-size: 1.5rem;
      line-height: 1.25;
    }
  }
`;

const HeaderInner = styled.div`
  grid-column: 2/3;
  grid-row-gap: 1.15rem;
  grid-template-columns: repeat(auto-fit, 12rem);
`;

const HomeLink = styled(Link)`
  grid-column: 1/2;
  margin-right: auto;
  width: 9rem;
`;

const Nav = styled.nav`
  max-height: 4.5rem;
  max-width: 10.5rem;
`;

const Sep = styled.span`
  color: var(--meta);
  line-height: 1.5;
`;

// Toggle
const Toggle = styled.button`
  ${absolute};
  ${sizes('1.05rem')};

  cursor: pointer;
  background: none;
  border: none;
  grid-column: 3/4;
  left: 0;
  margin: 0 0.25rem;
  outline: none;
  top: 2.15rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Name = styled.span`
  ${hideVisually};
`;

const Icon = styled.span`
  ${sizes('1.05rem')};

  min-width: 1.05rem;

  &::after,
  &::before {
    animation: ${fadeIn} 2s;
  }

  &::after {
    ${absolute};
    ${content};
    ${transitionAll};
    ${sizes('1.05rem', '1rem')};

    border-radius: 1rem;
    display: inherit;
    vertical-align: middle;
  }

  &::before {
    ${backgroundAccentLight};
    ${content};
    ${transitionAll};
    ${cover('left')};
    ${sizes('1rem')};

    background: transparent;
    box-shadow: 0.3125rem 0.3125rem 0 0 var(--primary-light);
    border-radius: 100%;
    right: 1rem;
    transform: rotate(-45deg);
    z-index: 5;
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
  background-color: var(--bg-dark);
  border-color: var(--primary);
  border-style: solid;
  border-width: 0.75rem 0 0;
  grid-column: 1/4;
  grid-gap: 1.5rem;
  grid-row: 3/4;
  grid-template-columns: 6.75rem minmax(10.5rem, 31.5rem);
  grid-template-rows: min-content 2.25rem;
  justify-content: center;
  margin: 0 auto;
  padding: 3rem 1.5rem;

  &::before {
    ${content};
    ${backgroundAccentLight};
    ${cover('top')};

    top: -1.5rem;
    min-height: 0.75rem;
  }
`;

const FooterCopy = styled.section`
  max-width: 32rem;

  &,
  &:hover,
  &:visited {
    color: hsl(64, 32%, 96%);
  }
`;

const FootBody = styled.p`
  max-width: 32rem;
`;

const DL = styled.dl`
  align-self: center;
  grid-column: 2/3;
  grid-row: 2/3;
  justify-self: end;
  max-width: 7.5rem;
  min-height: 1.5rem;
`;

const DT = styled.dt`
  ${hideVisually};
`;

const DD = styled.dd`
  ${sizes('1.5rem')};
`;

const SocialLink = styled.a`
  min-height: 1.5rem;
  text-decoration: none;

  &,
  svg {
    ${sizes('1.5rem')};
  }

  svg {
    fill: #fff;
    transition: fill var(--duration) ease-in-out;
    vertical-align: middle;
  }

  &:hover {
    svg {
      fill: var(--primary-light);
    }
  }
`;

const Permalink = styled(Link)`
  display: inline-block;
  margin-bottom: 0.75rem;

  > h2 {
    padding: 0;
  }
`;

const MetaWrap = styled.section`
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const Meta = styled.p`
  &,
  > *,
  a:visited {
    color: var(--meta);
  }

  a:hover {
    color: var(--font);
  }

  span {
    margin-right: 0.1875rem;
  }
`;

// Layout
const Main = styled.main`
  grid-column: 2/3;
  grid-row: 2/3;
  min-height: calc(100vh - 23.25rem);
  padding: 3rem 0;
`;

// Noise
const BgNoise = styled.div`
  ${cover()};

  animation: ${fadeIn} 2s;
  background-image: url(${props => props.bg});
  background-size: calc(0.125em * 64);
  opacity: 0.012;
  pointer-events: none;
  z-index: 20;
`;

export {
  BgNoise,
  DD,
  DL,
  DT,
  FootBody,
  FooterCopy,
  FooterMain,
  HeaderInner,
  HeaderMain,
  HomeLink,
  Icon,
  Main,
  Meta,
  MetaWrap,
  Name,
  Nav,
  Permalink,
  Sep,
  SocialLink,
  Toggle,
};
