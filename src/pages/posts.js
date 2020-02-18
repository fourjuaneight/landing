import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import Article from '../components/article';
import Layout from '../components/layout';
import Title from '../components/title';

import base from '../styles/base.module.css';
import color from '../styles/color.module.css';
import main from '../styles/main.module.css';

const Posts = ({ location }) => {
  const {
    allMarkdownRemark: { group },
  } = useStaticQuery(graphql`
    query PostsQuery {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false }, url: { eq: null } }
        }
        sort: { fields: frontmatter___date, order: DESC }
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
    }
  `);

  return (
    <Layout pageTitle="Posts Archive" location={location}>
      <Title>Posts Archive</Title>
      <section className={base.w100}>
        {group.reverse().map(gp => (
          <div key={gp.fieldValue}>
            <h2 className={cx(color.brdPrimary, main.subtitle)}>
              {gp.fieldValue}
            </h2>
            {gp.edges.map(({ node }, i) => {
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
                  list={location.pathname !== '/'}
                  slug={slug}
                  tag={tag}
                  title={title}
                />
              );
            })}
          </div>
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
