import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import Title from '../components/title';
import { Content } from '../components/util/styleEl';

export const query = graphql`
  query SingleQuery($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 272)
      frontmatter {
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
      frontmatter: { title },
      body,
    },
  } = data;

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

Single.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default Single;
