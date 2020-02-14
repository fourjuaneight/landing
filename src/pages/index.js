import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Archive from '../components/archiveLink';
import Article from '../components/article';
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
            excerpt(pruneLength: 272)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              tag
              title
              url
            }
            id
          }
        }
      }
    }
  `);

  return (
    <Layout location={location}>
      <Title text="Recent Articles" />
      <section>
        {edges.map(({ node }, i) => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, tag, title, url },
            id,
          } = node;

          return (
            <Article
              appearance={url != null}
              date={date}
              html={excerpt}
              index={i}
              key={id}
              list={location.pathname === '/'}
              slug={url || slug}
              tag={tag}
              title={title}
            />
          );
        })}
      </section>
      <Archive link="/posts/" />
    </Layout>
  );
};

Index.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Index;
