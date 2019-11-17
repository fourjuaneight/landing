import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import List from '../components/list';
import Layout from '../components/layout';

const Posts = ({ location }) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query PostsQuery {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
      <List edges={edges} />
    </Layout>
  );
};

Posts.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Posts;
