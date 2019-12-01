import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import { ReactComponent as GitHub } from '../images/github.svg';
import { ReactComponent as Twitter } from '../images/twitter.svg';
import { ReactComponent as RSS } from '../images/rss.svg';
import {
  absolute,
  aSelfCenter,
  backgroundAccentLight,
  bottom0,
  content,
  contentBetween,
  contentCenter,
  flex,
  flexColumn,
  f4,
  f5,
  grid,
  itemsCenter,
  itemsFlexStart,
  itemsStart,
  jSelfEnd,
  left0,
  ma0,
  mb1,
  mHorizontal,
  normal,
  noUnderline,
  overflowHidden,
  pa2,
  relative,
  right0,
  w100,
  zUnder,
} from './util/styleUtils';

const size = {
  height: '6.5em',
  width: '6.5em',
};
const wrapStyles = {
  ...size,
  margin: '0 auto',
};
const imgStyles = {
  ...size,
  borderRadius: '50%',
};

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

const Footer = ({ description, social }) => {
  const {
    imageSharp: { fixed },
  } = useStaticQuery(graphql`
    query Avatar {
      imageSharp(sizes: { originalName: { regex: "/avatar/" } }) {
        fixed(height: 104, quality: 95, width: 104) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  `);

  return (
    <FooterMain>
      <Img
        fixed={fixed}
        alt="Juan's avatar."
        style={wrapStyles}
        imgStyle={imgStyles}
      />
      <FooterCopy>
        <FootHead>Hi, I'm Juan</FootHead>
        <FootBody>A {description}</FootBody>
      </FooterCopy>
      <DL>
        <DT>GitHub</DT>
        <DD>
          <SocialLink
            href={`https://www.github.com/${social}`}
            title="Follow me on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </SocialLink>
        </DD>
        <DT>Twitter</DT>
        <DD>
          <SocialLink
            href={`https://www.twitter.com/${social}`}
            title="Follow me on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </SocialLink>
        </DD>
        <DT>RSS</DT>
        <DD>
          <SocialLink href="/index.xml" title="View the RSS feed of this page">
            <RSS />
          </SocialLink>
        </DD>
      </DL>
    </FooterMain>
  );
};

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  social: PropTypes.string.isRequired,
};

export default Footer;
