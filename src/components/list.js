import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Article from './article';

const List = ({ edges }) => (
  <section
    className={cx(
      styles.contentFlexStart,
      styles.flex,
      styles.flexColumn,
      styles.itemsFlexStart,
      styles.w100
    )}
  >
    {edges.map(({ node }, i) => {
      const {
        excerpt,
        fields: { slug },
        frontmatter: { date, tag, title },
      } = node;

      return (
        <Article
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
  </section>
);

List.propTypes = {
  edges: PropTypes.object.isRequired,
};

export default List;
