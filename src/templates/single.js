import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Article from '../components/article';

export const query = graphql`
  query SingleQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(format: PLAIN, truncate: false)
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        tag
        title
      }
      html
    }
  }
`;

const Single = ({ data, location }) => {
  const {
    markdownRemark: {
      excerpt,
      frontmatter: { date, tag, title },
      html,
    },
  } = data;

  return (
    <Layout pageDescription={excerpt} pageTitle={title} location={location}>
      <Article date={date} html={html} tag={tag} title={title} />
    </Layout>
  );
};

Single.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default Single;
