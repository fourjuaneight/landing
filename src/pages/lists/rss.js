import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../../components/layout';
import List from '../../components/list';
import Title from '../../components/title';

const RSS = ({ location }) => {
  const {
    erebor: { rss },
  } = useStaticQuery(graphql`
    query RSSQuery {
      erebor {
        rss(order_by: { category: asc, title: asc }) {
          category
          id
          title
          url
        }
      }
    }
  `);

  return (
    <Layout pageTitle="RSS List" location={location}>
      <Title>RSS</Title>
      <List data={rss} short />
    </Layout>
  );
};

RSS.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RSS;
