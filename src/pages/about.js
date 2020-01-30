import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import Title from '../components/title';
import { Content } from '../components/util/styleEl';

const About = ({ location }) => {
  const {
    mdx: {
      excerpt,
      frontmatter: { title },
      body,
    },
  } = useStaticQuery(graphql`
    query AboutQuery {
      mdx(fileAbsolutePath: { regex: "/single/" }) {
        excerpt(pruneLength: 272)
        frontmatter {
          title
        }
        body
      }
    }
  `);

  return (
    <Layout location={location} pageDescription={excerpt} pageTitle={title}>
      <article>
        <Title text={title} />
        <Content>
          <MDXRenderer>{body}</MDXRenderer>
        </Content>
      </article>
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default About;
