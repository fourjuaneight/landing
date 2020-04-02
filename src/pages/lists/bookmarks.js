import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../../components/layout';
import List from '../../components/list';
import Title from '../../components/title';

const Bookmarks = ({ location }) => {
  const {
    erebor: { bookmarks },
  } = useStaticQuery(graphql`
    query BookmarksQuery {
      erebor {
        bookmarks(order_by: { category: asc, creator: asc, title: asc }) {
          category
          creator
          id
          title
          url
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Bookmarks List" location={location}>
      <Title>Bookmarks</Title>
      <List data={bookmarks} />
    </Layout>
  );
};

Bookmarks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Bookmarks;
