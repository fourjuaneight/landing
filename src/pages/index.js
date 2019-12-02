import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import List from '../components/list';
import Layout from '../components/layout';
import Title from '../components/title';

const Index = ({ location }) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query HomeQuery {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false } }
        }
        limit: 5
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            excerpt(format: HTML, pruneLength: 272, truncate: false)
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
      <Title text="Recent Posts" />
      <List edges={edges} />
    </Layout>
  );
};

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Index;
