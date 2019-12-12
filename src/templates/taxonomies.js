import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import List from '../components/list';
import Title from '../components/title';

const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const query = graphql`
  query TaxonomiesQuery($tag: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { draft: { eq: false }, tag: { eq: $tag } } }
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
    markdownRemark(frontmatter: { tag: { eq: $tag } }) {
      frontmatter {
        tag
      }
    }
  }
`;

const Taxonomies = ({ data, location }) => {
  const {
    allMarkdownRemark: { edges },
    markdownRemark: { frontmatter: tag },
  } = data;

  const currentTag = tag.tag;

  return (
    <Layout pageTitle={titleCase(currentTag)} location={location}>
      <Title text={currentTag} />
      <List edges={edges} />
    </Layout>
  );
};

Taxonomies.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
    markdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default Taxonomies;
