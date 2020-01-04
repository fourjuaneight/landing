import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

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
      <Article html={body} title={title} />
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

About.defaultProps = {
  location: {
    pathname: '',
  },
};

export default About;
