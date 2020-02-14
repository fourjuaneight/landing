import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import Title from './title';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const createMarkup = content => ({ __html: content });

const Article = ({ appearance, date, html, index, list, slug, tag, title }) => (
  <article className={base.w100} key={list && index}>
    {/* eslint-disable-next-line no-nested-ternary */}
    {list && appearance ? (
      <a
        className={cx(base.dib, base.tdn, main.externalLink)}
        href={slug}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={base.pa0}>
          {title}
          <span className={base.dib} aria-hidden="true">
            {String.fromCharCode(8594)}
          </span>
        </h2>
      </a>
    ) : list && !appearance ? (
      <Link className={cx(base.dib, base.tdn)} to={slug}>
        <h2 className={base.pa0}>{title}</h2>
      </Link>
    ) : (
      <Title>{title}</Title>
    )}
    {date && (
      <section
        className={cx(
          base.flex,
          base.itemsCenter,
          base.justifyBetween,
          base.w100,
          main.metaWrap
        )}
      >
        <p className={main.meta}>
          <time dateTime={date}>{date}</time>
        </p>
        <p className={main.meta}>
          <span aria-hidden="true">#</span>
          <Link className={base.tdn} to={`/${tag}/`}>
            {tag}
          </Link>
        </p>
      </section>
    )}
    {list ? (
      <section
        className={cx(
          base.flex,
          base.flexColumn,
          base.itemsStart,
          base.justifyBetween,
          base.w100,
          main.content
        )}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <p className={base.tj} dangerouslySetInnerHTML={createMarkup(html)} />
      </section>
    ) : (
      <section
        className={cx(
          base.flex,
          base.flexColumn,
          base.itemsStart,
          base.justifyBetween,
          base.w100,
          main.content
        )}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={createMarkup(html)}
      />
    )}
  </article>
);

Article.propTypes = {
  appearance: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  index: PropTypes.number,
  list: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Article.defaultProps = {
  index: 0,
  list: false,
};

export default Article;
