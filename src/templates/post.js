import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/article';
import Layout from '../components/layout';

export const query = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 272)
      fields {
        slug
      }
      frontmatter {
        code
        date(formatString: "YYYY-MM-DD")
        tag
        title
        url
      }
      html
    }
  }
`;

const Post = ({ data, location }) => {
  const {
    markdownRemark: {
      excerpt,
      fields: { slug },
      frontmatter: { code, date, tag, title, url },
      html,
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
      <Article
        appearance={url != null}
        date={date}
        html={html}
        slug={slug}
        tag={tag}
        title={title}
      />
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default Post;
