import React from 'react';
import PropTypes from 'prop-types';

import Article from './article';
import { Feed } from './util/styleEl';

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
