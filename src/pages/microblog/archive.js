import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../../components/layout';
import Title from '../../components/title';
import Update from '../../components/update';

import main from '../../styles/main.module.css';

const MicroblogArchive = ({ location }) => {
  const {
    erebor: { tweets },
  } = useStaticQuery(graphql`
    query {
      erebor {
        tweets: tweet_by_year(order_by: { created_at: desc }) {
          created_at
          id
          tweet
          year
        }
      }
    }
  `);

  // group by year created
  const groupBy = (array, key) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      const newObject = objectsByKeyValue;
      newObject[value] = (objectsByKeyValue[value] || []).concat(obj);

      return newObject;
    }, {});

  const yearGroup = groupBy(tweets, 'year');
  // get years available
  const years = Object.keys(yearGroup).reverse();

  return (
    <Layout pageTitle="Microblog Archive" location={location}>
      <Title>Microblog Archive</Title>
      <section>
        {years.map(year => (
          <div key={year}>
            <h2 className={main.subtitle}>{year}</h2>
            {yearGroup[year].map(tweet => {
              const date = tweet.created_at;
              return (
                <Update
                  key={tweet.id}
                  date={date}
                  id={tweet.id}
                  path={location.pathname}
                  tweet={tweet.tweet}
                />
              );
            })}
          </div>
        ))}
      </section>
    </Layout>
  );
};

MicroblogArchive.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default MicroblogArchive;
