import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Tweet from '../components/tweet';
import fmtDate from '../components/util/fmtDate';

export const query = graphql`
  query TweetQuery($id: String!) {
    erebor {
      tweets_by_pk(id: $id) {
        date
        favorited
        id
        retweet
        retweeted
        tweet
      }
    }
  }
`;

const Twitter = ({ data, location }) => {
  const {
    erebor: {
      tweets_by_pk: { date, favorited, id, retweeted, tweet },
    },
  } = data;

  return (
    <Layout
      pageTitle={`Tweeted on ${fmtDate(date).standard}`}
      location={location}
    >
      <section>
        <Tweet
          key={id}
          date={date}
          favorited={favorited}
          id={id}
          path={location.pathname}
          retweeted={retweeted}
          tweet={tweet}
        />
      </section>
    </Layout>
  );
};

Twitter.propTypes = {
  data: PropTypes.shape.isRequired,
  location: PropTypes.shape.isRequired,
};

export default Twitter;
