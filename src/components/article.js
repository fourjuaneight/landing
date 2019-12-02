import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import CleanHTML from './util/cleanHTML';
import Title from './title';
import { ArticleMain, Meta, MetaWrap, Permalink } from './util/styleEl';

const Article = ({ date, html, index, list, slug, tag, title }) => (
  <ArticleMain key={list && index}>
    {list ? (
      <Permalink to={`/posts${slug}`}>
        <h2>{title}</h2>
      </Permalink>
    ) : (
      <Title text={title} />
    )}
    {date && (
      <MetaWrap>
        <Meta>
          <span aria-label="Posted on">&tau; </span>
          <time dateTime={date}>{date}</time>
        </Meta>
        <Meta>
          <span aria-hidden="true"># </span>
          <Link to={`/${tag}/`}>{tag}</Link>
        </Meta>
      </MetaWrap>
    )}
    <CleanHTML html={html} />
  </ArticleMain>
);

Article.propTypes = {
  date: PropTypes.string,
  html: PropTypes.string.isRequired,
  index: PropTypes.number,
  list: PropTypes.bool,
  slug: PropTypes.string,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Article;
