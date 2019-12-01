import React from 'react';
import PropTypes from 'prop-types';

import CleanHTML from './util/cleanHTML';
import Title from './title';
import {
  ArticleMain,
  Hash,
  MetaWrap,
  Permalink,
  PermaTitle,
  Tag,
  TagLink,
  Time,
} from './util/styleEl';

const Article = ({ date, html, index, list, slug, tag, title }) => (
  <ArticleMain key={list && index}>
    {list ? (
      <Permalink to={`/posts${slug}`}>
        <PermaTitle>{title}</PermaTitle>
      </Permalink>
    ) : (
      <Title text={title} />
    )}
    {date && (
      <MetaWrap>
        <Time dateTime={date}>
          <span aria-label="Posted on">&tau; </span>
          {date}
        </Time>
        <Tag>
          <Hash aria-hidden="true"># </Hash>
          <TagLink to={`/${tag}/`} itemProp="about">
            {tag}
          </TagLink>
        </Tag>
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
