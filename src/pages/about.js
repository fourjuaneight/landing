import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

const About = ({ location }) => {
  const {
    markdownRemark: {
      excerpt,
      frontmatter: { title },
      html,
    },
  } = useStaticQuery(graphql`
    query AboutQuery {
      markdownRemark(fileAbsolutePath: { regex: "/single/" }) {
        excerpt(format: PLAIN, truncate: false)
        frontmatter {
          title
        }
        html
      }
    }
  `);

  return (
    <Layout location={location} pageDescription={excerpt} pageTitle={title}>
      <Article html={html} title={title} />
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.string.isRequired,
};

export default About;
