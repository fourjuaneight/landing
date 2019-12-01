import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Article from './article';
import {
  contentFlexStart,
  flex,
  flexColumn,
  itemsFlexStart,
  w100,
} from './util/styleUtils';

const Feed = styled.section`
  ${contentFlexStart};
  ${flex};
  ${flexColumn};
  ${itemsFlexStart};
  ${w100};
`;

const List = ({ edges }) => (
  <Feed>
    {edges.map(({ node }, i) => {
      const {
        excerpt,
        fields: { slug },
        frontmatter: { date, tag, title },
      } = node;

      return (
        <Article
          key={i}
          date={date}
          html={excerpt}
          index={i}
          list
          slug={slug}
          tag={tag}
          title={title}
        />
      );
    })}
  </Feed>
);

List.propTypes = {
  edges: PropTypes.array.isRequired,
};

export default List;
