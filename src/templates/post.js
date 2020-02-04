import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

export const query = graphql`
  query PostQuery($id: String!) {
    mdx(id: { eq: $id }) {
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

const Post = ({ data, location }) => {
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

Post.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default Post;
