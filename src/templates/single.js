import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

export const query = graphql`
  query SingleQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(format: PLAIN, pruneLength: 256, truncate: false)
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
    <Layout
      location={location}
      pageDescription={excerpt}
      pageTitle={title}
      postPublishDate={date}
    >
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
