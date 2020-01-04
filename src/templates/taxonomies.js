import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';
import Title from '../components/title';

const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const query = graphql`
  query TaxonomiesQuery($tag: String!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { draft: { eq: false }, tag: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 272)
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
    mdx(frontmatter: { tag: { eq: $tag } }) {
      frontmatter {
        tag
      }
    }
  }
`;

const Taxonomies = ({ data, location }) => {
  const {
    allMdx: { edges },
    mdx: { frontmatter },
  } = data;

  const currentTag = frontmatter.tag;

  return (
    <Layout pageTitle={titleCase(currentTag)} location={location}>
      <Title text={currentTag} />
      <section>
        {edges.map(({ node }, i) => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, tag, title },
          } = node;

          return (
            <Article
              key={slug}
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

Taxonomies.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.object.isRequired,
    mdx: PropTypes.object.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Taxonomies.defaultProps = {
  data: {
    allMdx: null,
    mdx: null,
  },
  location: {
    pathname: '',
  },
};

export default Taxonomies;
