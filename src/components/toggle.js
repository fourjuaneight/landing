import React, { useContext } from 'react';
import styled from '@emotion/styled';

import ThemeContext from '../context/themeContext';
import {
  absolute,
  backgroundAccentLight,
  bottom0,
  content,
  contentCenter,
  flex,
  itemsFlexStart,
  ma0,
  overflowHidden,
  right0,
  top0,
  transitionAll,
  z5,
} from './util/styleUtils';

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
