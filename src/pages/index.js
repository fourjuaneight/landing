import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import List from '../components/list';
import Layout from '../components/layout';

const Index = ({ location }) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query HomeQuery {
      allMarkdownRemark(
        limit: 5
        sort: { fields: frontmatter___date, order: DESC }
      ) {
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
    <Layout location={location}>
      <h1
        className={cx(styles.mra, styles.relative, styles.marked, styles.title)}
      >
        Recent Posts
      </h1>
      <List edges={edges} />
    </Layout>
  );
};

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Index;
