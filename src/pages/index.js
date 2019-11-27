import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import List from '../components/list';
import Layout from '../components/layout';
import {
  absolute,
  backgroundAccent,
  bottom0,
  content,
  f2,
  left0,
  mra,
  relative,
  z1,
} from '../components/styleUtils';

const Title = styled.h1`
  ${f2};
  ${mra};
  ${relative};

  margin-top: 0.75rem;

  &::before {
    ${absolute};
    ${backgroundAccent};
    ${bottom0};
    ${content};
    ${left0};
    ${z1};

    height: 0.15rem;
    width: 3rem;
  }
`;

const Index = ({ location }) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query HomeQuery {
      allMarkdownRemark(
        limit: 5
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            excerpt(format: HTML, truncate: false)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM D, YYYY")
              tag
              title
            }
          }
        }
      }
    }
  `);

  return (
    <Layout location={location}>
      <Title>Recent Posts</Title>
      <List edges={edges} />
    </Layout>
  );
};

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Index;
