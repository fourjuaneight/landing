import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';
import Title from '../components/title';
import { Subtitle } from '../components/util/styleEl';

const Posts = ({ location }) => {
  const {
    allMdx: { group },
  } = useStaticQuery(graphql`
    query PostsQuery {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { appearance: { eq: false }, draft: { eq: false } }
        }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        group(field: fields___year) {
          fieldValue
          edges {
            node {
              excerpt(pruneLength: 272)
              fields {
                slug
              }
              frontmatter {
                appearance
                date(formatString: "YYYY-MM-DD")
                tag
                title
              }
              id
            }
          }
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Posts" location={location}>
      <Title text="Posts" />
      <section>
        {group.map(gp => (
          <>
            <Subtitle>{gp.fieldValue}</Subtitle>
            {gp.edges.map(({ node }, i) => {
              const {
                excerpt,
                fields: { slug },
                frontmatter: { appearance, date, tag, title },
                id,
              } = node;

              return (
                <Article
                  appearance={appearance}
                  date={date}
                  html={excerpt}
                  index={i}
                  key={id}
                  list={location.pathname !== '/'}
                  slug={slug}
                  tag={tag}
                  title={title}
                />
              );
            })}
          </>
        ))}
      </section>
    </Layout>
  );
};

Posts.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Posts;
