import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';

import base from '../styles/base.module.css';
import color from '../styles/color.module.css';
import main from '../styles/main.module.css';

import { ReactComponent as GitHub } from '../images/github.svg';
import { ReactComponent as Twitter } from '../images/twitter.svg';
import { ReactComponent as RSS } from '../images/rss.svg';

const size = {
  height: '6.75em',
  width: '6.75em',
};

const wrapStyles = {
  ...size,
  margin: '0',
};

const imgStyles = {
  ...size,
  borderRadius: '50%',
};

const Footer = ({ description, location, social }) => {
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
    <footer
      className={cx(
        base.grid,
        base.relative,
        base.w100,
        color.bgPrimaryB,
        color.bgPrimaryLightA,
        main.footer,
        main.left0A,
        main.left0B,
        main.right0B,
        main.rightAB
      )}
    >
      <Img
        fixed={fixed}
        alt="Juan's avatar."
        style={wrapStyles}
        imgStyle={imgStyles}
        fadeIn
        durationFadeIn={1152}
      />
      <section className={cx(base.w100, main.footerCopy)}>
        <h2 className={base.pa0}>Hi, I&rsquo;m Juan</h2>
        <p className={main.footerBody}>A {description}</p>
      </section>
      <dl
        className={cx(
          base.flex,
          base.itemsCenter,
          base.justifyBetween,
          base.w100,
          main.dl
        )}
      >
        <dt className={main.sr}>GitHub</dt>
        <dd className={main.dd}>
          <a
            className={cx(base.relative, base.tdnH, main.socialLink)}
            href={`https://www.github.com/${social}`}
            title="Follow me on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </dd>
        <dt className={main.sr}>Twitter</dt>
        <dd className={main.dd}>
          <a
            className={cx(base.relative, base.tdnH, main.socialLink)}
            href={`https://www.twitter.com/${social}`}
            title="Follow me on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
        </dd>
        <dt className={main.sr}>RSS</dt>
        <dd className={main.dd}>
          <a
            className={cx(base.relative, base.tdnH, main.socialLink)}
            href={
              location.pathname.match(/bookmarks/g) !== null
                ? '/bookmarks/index.xml'
                : location.pathname.match(/microblog/g) !== null
                ? '/microblog/index.xml'
                : '/index.xml'
            }
            title="View the RSS feed of this page"
          >
            <RSS />
          </a>
        </dd>
      </dl>
    </footer>
  );
};

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  social: PropTypes.string.isRequired,
};

export default Footer;
