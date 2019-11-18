import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import CleanHTML from './cleanHTML';

const Article = ({ date, html, index, list, slug, tag, title }) => (
  <article
    key={list && index}
    className={cx(
      styles.flex,
      styles.flexColumn,
      styles.itemsFlexStart,
      styles.m_horizontal,
      styles.w100
    )}
  >
    {list ? (
      <Link to={`/posts${slug}`} className={styles.permalink}>
        <h2 className={cx(styles.ma0, styles.list_title)}>{title}</h2>
      </Link>
    ) : (
      <h1
        className={cx(styles.mra, styles.relative, styles.marked, styles.title)}
      >
        {title}
      </h1>
    )}
    <section
      className={cx(
        styles.contentBetween,
        styles.flex,
        styles.flexWrap,
        styles.meta_wrap,
        styles.w100
      )}
    >
      <time dateTime={date} className={cx(styles.f7, styles.mra, styles.meta)}>
        <span aria-label="Posted on">&tau;</span>
        {date}
      </time>
      <p className={cx(styles.f7, styles.ma0, styles.mr1)}>
        <span aria-hidden="true" className={styles.meta}>
          #
        </span>
        <Link to={`/tags/${tag}/`} itemProp="about" className={styles.meta}>
          {tag}
        </Link>
      </p>
    </section>
    <CleanHTML html={html} />
  </article>
);

Article.propTypes = {
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  index: PropTypes.number,
  list: PropTypes.bool,
  slug: PropTypes.string,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Article;
