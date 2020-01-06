import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import Tweet from '../components/tweet';

const Twitter = ({ location }) => {
  const {
    erebor: { tweets },
  } = useStaticQuery(graphql`
    query {
      erebor {
        tweets(order_by: { date: desc }, limit: 10) {
          date
          favorited
          id
          retweeted
          tweet
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Posts" location={location}>
      <section>
        {tweets.map(({ date, favorited, id, retweeted, tweet }) => (
          <Tweet
            key={id}
            date={date}
            favorited={favorited}
            id={id}
            path={location.pathname}
            retweeted={retweeted}
            tweet={tweet}
          />
        ))}
      </section>
    </Layout>
  );
};

Twitter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Twitter.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Twitter;
