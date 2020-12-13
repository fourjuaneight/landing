import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../../components/layout';
import Title from '../../components/title';
import Update from '../../components/update';

import main from '../../styles/main.module.css';

const MicroblogArchive = ({ location }) => {
  const {
    allAirtable: { group },
  } = useStaticQuery(graphql`
    query {
      allAirtable(sort: { fields: data___date, order: DESC }) {
        group(field: fields___year) {
          nodes {
            data {
              date
              tweet
            }
            fields {
              twtId
              year
            }
          }
          fieldValue
        }
      }
    }
  `);

  const years = group.sort((a, b) => (a.fieldValue < b.fieldValue ? 1 : -1));

  return (
    <Layout pageTitle="Microblog Archive" location={location}>
      <Title>Microblog Archive</Title>
      <section>
        {years.map(({ fieldValue, nodes }) => (
          <div key={fieldValue}>
            <h2 className={main.subtitle}>{fieldValue}</h2>
            {nodes.map(({ data: { date, tweet }, fields: { twtId } }) => (
              <Update
                key={twtId}
                date={date}
                id={twtId}
                path={location.pathname}
                tweet={tweet}
              />
            ))}
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
