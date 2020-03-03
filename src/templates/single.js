import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import cx from 'classnames';

import Layout from '../components/layout';
import Title from '../components/title';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const createMarkup = content => ({ __html: content });

export const query = graphql`
  query SingleQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 272)
      frontmatter {
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
      frontmatter: { title },
      html,
    },
  } = data;

  return (
    <Layout location={location} pageDescription={excerpt} pageTitle={title}>
      <article className={base.w100}>
        <Title>{title}</Title>
        <section
          className={cx(
            base.flex,
            base.flexColumn,
            base.itemsStart,
            base.justifyBetween,
            base.w100,
            main.content
          )}
          dangerouslySetInnerHTML={createMarkup(html)}
        />
      </article>
    </Layout>
  );
};

Single.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default Single;
