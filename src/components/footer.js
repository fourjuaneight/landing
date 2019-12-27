import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

import { ReactComponent as GitHub } from '../images/github.svg';
import { ReactComponent as Twitter } from '../images/twitter.svg';
import { ReactComponent as RSS } from '../images/rss.svg';
import {
  DD,
  DL,
  DT,
  FootBody,
  FooterCopy,
  FooterMain,
  SocialLink,
} from './util/styleEl';

const size = {
  height: '6.75em',
  width: '6.75em',
};
const wrapStyles = {
  ...size,
  margin: '0 auto',
};
const imgStyles = {
  ...size,
  borderRadius: '50%',
};

const Footer = ({ description, social }) => {
  const {
    imageSharp: { fixed },
  } = useStaticQuery(graphql`
    query Avatar {
      imageSharp(sizes: { originalName: { regex: "/avatar/" } }) {
        fixed(height: 108, quality: 95, width: 108) {
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
        fadeIn
        durationFadeIn={1152}
      />
      <FooterCopy>
        <h3>Hi, I&rsquo;m Juan</h3>
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
