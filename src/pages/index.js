import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';
import Title from '../components/title';

const Index = ({ location }) => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query HomeQuery {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false } }
        }
        limit: 5
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            excerpt(pruneLength: 272)
            frontmatter {
              appearance
              date(formatString: "YYYY-MM-DD")
              slug
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
      <section>
        {edges.map(({ node }, i) => {
          const {
            excerpt,
            frontmatter: { appearance, date, slug, tag, title },
          } = node;

          return (
            <Article
              appearance={appearance}
              date={date}
              html={excerpt}
              index={i}
              key={slug}
              list={location.pathname === '/'}
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

Index.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Index;
