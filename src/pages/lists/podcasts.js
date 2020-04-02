import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../../components/layout';
import List from '../../components/list';
import Title from '../../components/title';

const Podcasts = ({ location }) => {
  const {
    erebor: { podcasts },
  } = useStaticQuery(graphql`
    query PodcastsQuery {
      erebor {
        podcasts(order_by: { category: asc, title: asc }) {
          category
          id
          title
          url
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Podcasts List" location={location}>
      <Title>Podcasts</Title>
      <List data={podcasts} short />
    </Layout>
  );
};

Podcasts.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Podcasts;
