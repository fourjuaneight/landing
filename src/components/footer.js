import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

const date = new Date();
const year = date.getFullYear();

const Footer = ({ author, description, social }) => (
  <footer
    className={cx(
      styles.contentCenter,
      styles.grid,
      styles.itemsStart,
      styles.m_horizontal,
      styles.pa2,
      styles.relative,
      styles.w100
    )}
  >
    <section
      className={cx(
        styles.flex,
        styles.flexColumn,
        styles.font_inverted,
        styles.foot_copy,
        styles.itemsFlexStart,
        styles.mb1,
        styles.w100
      )}
    >
      <h3 className={cx(styles.ma0, styles.mb1, styles.foot_head)}>
        Hi, I'm Juan
      </h3>
      <p className={cx(styles.foot_body)}>A {description}</p>
    </section>
    <dl
      className={cx(
        styles.aSelfCenter,
        styles.contentBetween,
        styles.flex,
        styles.itemsCenter,
        styles.jSelfEnd,
        styles.ma0,
        styles.w100
      )}
    >
      <dt className={styles.sr}>GitHub</dt>
      <dd className={styles.ma0}>
        <a
          href={`https://www.github.com/${social}`}
          title="Follow me on GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className={cx(
            styles.contentCenter,
            styles.flex,
            styles.icon,
            styles.itemsCenter,
            styles.noUnderline,
            styles.relative
          )}
        >
          GitHub
        </a>
      </dd>
      <dt className={styles.sr}>Twitter</dt>
      <dd className={styles.ma0}>
        <a
          href={`https://www.twitter.com/${social}`}
          title="Follow me on Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className={cx(
            styles.contentCenter,
            styles.flex,
            styles.icon,
            styles.itemsCenter,
            styles.noUnderline,
            styles.relative
          )}
        >
          Twitter
        </a>
      </dd>
      <dt className={styles.sr}>RSS</dt>
      <dd className={styles.ma0}>
        <Link
          to="/index.xml"
          title="View the RSS feed of this page"
          className={cx(
            styles.contentCenter,
            styles.flex,
            styles.icon,
            styles.itemsCenter,
            styles.noUnderline,
            styles.relative
          )}
        >
          RSS
        </Link>
      </dd>
    </dl>
    <section>
      <p>&copy; {year}</p>
      <span aria-hidden="true" className={styles.sep}>
        ::
      </span>
      <Link to="/">{author}</Link>
    </section>
  </footer>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  social: PropTypes.string.isRequired,
};

export default Footer;
