import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Update from '../components/update';
import fmtDate from '../components/util/fmtDate';

export const query = graphql`
  query StatusQuery($id: String!) {
    erebor {
      tweets_by_pk(id: $id) {
        date
        id
        tweet
      }
    }
  }
`;

const Status = ({ data, location }) => {
  const {
    erebor: {
      tweets_by_pk: { date, id, tweet },
    },
  } = data;

  return (
    <Layout pageTitle={`Posted on ${fmtDate(date).micro}`} location={location}>
      <section>
        <Update
          key={id}
          date={date}
          id={id}
          path={location.pathname}
          single
          tweet={tweet}
        />
      </section>
    </Layout>
  );
};

Status.propTypes = {
  data: PropTypes.shape.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Status;
