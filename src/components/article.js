import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import CleanHTML from './cleanHTML';
import {
  absolute,
  backgroundAccent,
  bottom0,
  content,
  contentBetween,
  f2,
  f3,
  f6,
  flex,
  flexColumn,
  flexWrap,
  itemsFlexStart,
  left0,
  ma0,
  meta,
  mHorizontal,
  mr1,
  mra,
  relative,
  w100,
  z1,
} from './styleUtils';

const ArticleMain = styled.article`
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${mHorizontal};
  ${w100};
`;

const Permalink = styled(Link)`
  margin: 1rem 0;
`;

const PermaTitle = styled.h2`
  ${f3};
  ${ma0};
`;

const Title = styled.h1`
  ${f2};
  ${mra};
  ${relative};

  margin-top: 0.75rem;

  &::before {
    ${absolute};
    ${backgroundAccent};
    ${bottom0};
    ${content};
    ${left0};
    ${z1};

    height: 0.15rem;
    width: 3rem;
  }
`;

const MetaWrap = styled.section`
  ${contentBetween};
  ${flex};
  ${flexWrap};
  ${w100};

  margin-bottom: 0.75rem;
`;

const Time = styled.time`
  ${f6};
  ${meta};
  ${mra};
`;

const Tag = styled.p`
  ${f6};
  ${ma0};
  ${mr1};
`;

const Hash = styled.span`
  ${meta};
`;

const TagLink = styled(Link)`
  ${meta};

  &:hover {
    color: var(--font);
  }
`;

const Article = ({ date, html, index, list, slug, tag, title }) => (
  <ArticleMain key={list && index}>
    {list ? (
      <Permalink to={`/posts${slug}`}>
        <PermaTitle>{title}</PermaTitle>
      </Permalink>
    ) : (
      <Title>{title}</Title>
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
