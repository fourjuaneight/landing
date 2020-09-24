import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Archive from '../../components/archiveLink';
import Layout from '../../components/layout';
import Title from '../../components/title';
import Update from '../../components/update';

const Microblog = ({ location }) => {
  const {
    allAirtable: { nodes },
  } = useStaticQuery(graphql`
    query {
      allAirtable(limit: 5, sort: { fields: data___date, order: DESC }) {
        nodes {
          fields {
            twtId
          }
          data {
            date
            tweet
          }
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Recent Updates" location={location}>
      <Title>Recent Updates</Title>
      <section>
        {nodes.map(({ data: { date, tweet }, fields: { twtId } }) => (
          <Update
            key={twtId}
            date={date}
            id={twtId}
            path={location.pathname}
            tweet={tweet}
          />
        ))}
      </section>
      <Archive link="/microblog/archive/" />
    </Layout>
  );
};

Microblog.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Microblog;
