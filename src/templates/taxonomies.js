import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Article from '../components/article';
import Layout from '../components/layout';

const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const query = graphql`
  query TaxonomiesQuery($tag: String!) {
    allMarkdownRemark(
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
    allMarkdownRemark,
    markdownRemark: { frontmatter: tag },
  } = data;

  const currentTag = tag.tag;

  return (
    <Layout pageTitle={titleCase(currentTag)} location={location}>
      <h1
        className={cx(
          styles.mra,
          styles.relative,
          styles.marked,
          styles.list_title
        )}
      >
        {currentTag}
      </h1>
      <section>
        {allMarkdownRemark.edges.map(({ node }, i) => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, title },
          } = node;

          return (
            <Article
              key={i}
              date={date}
              html={excerpt}
              index={i}
              list
              slug={slug}
              tag={currentTag}
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
    allMarkdownRemark: PropTypes.object.isRequired,
    markdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default Taxonomies;
