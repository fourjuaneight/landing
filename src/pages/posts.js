import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Article from '../components/article';
import Layout from '../components/layout';

const Posts = ({ location }) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query TagsQuery {
      allMarkdownRemark {
        edges {
          node {
            excerpt(format: HTML, truncate: false)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM D, YYYY")
              tag
              title
            }
          }
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Posts" location={location}>
      <h1
        className={cx(
          styles.mra,
          styles.relative,
          styles.marked,
          styles.list_title
        )}
      >
        Posts
      </h1>
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
    </Layout>
  );
};

Posts.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Posts;
