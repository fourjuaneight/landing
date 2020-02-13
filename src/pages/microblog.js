import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import Title from '../components/title';
import Update from '../components/update';

const Microblog = ({ location }) => {
  const {
    erebor: { tweets },
  } = useStaticQuery(graphql`
    query {
      erebor {
        tweets(order_by: { date: desc }, limit: 5) {
          date
          id
          tweet
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Recent Tweets" location={location}>
      <Title text="Recent Tweets" />
      <section>
        {tweets.map(({ date, id, tweet }) => (
          <Update
            key={id}
            date={date}
            id={id}
            path={location.pathname}
            tweet={tweet}
          />
        ))}
      </section>
    </Layout>
  );
};

Microblog.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Microblog;
