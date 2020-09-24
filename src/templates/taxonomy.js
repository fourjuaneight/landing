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
    allMarkdownRemark(
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
            url
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
    markdownRemark: { frontmatter },
  } = data;

  const currentTag = frontmatter.tag;

  return (
    <Layout pageTitle={titleCase(currentTag)} location={location}>
      <Title>{currentTag}</Title>
      <section>
        {edges.map(({ node }, i) => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, tag, title, url },
          } = node;

          return (
            <Article
              appearance={url != null}
              date={date}
              html={excerpt}
              index={i}
              key={slug}
              list={location.pathname !== '/'}
              slug={url || slug}
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
    allMarkdownRemark: PropTypes.shape({}).isRequired,
    markdownRemark: PropTypes.shape({}).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Taxonomies;
