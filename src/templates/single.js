import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

export const query = graphql`
  query SingleQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 272)
      frontmatter {
        code
        date(formatString: "YYYY-MM-DD")
        tag
        title
      }
      body
    }
  }
`;

const Single = ({ data, location }) => {
  const {
    mdx: {
      excerpt,
      frontmatter: { code, date, tag, title },
      body,
    },
  } = data;

  return (
    <Layout
      code={code}
      location={location}
      pageDescription={excerpt}
      pageTitle={title}
      postPublishDate={date}
    >
      <Article date={date} html={body} tag={tag} title={title} />
    </Layout>
  );
};

Single.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Single;
