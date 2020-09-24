import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import cx from 'classnames';

import { ReactComponent as LinkIcon } from '../images/link.svg';
import Layout from '../components/layout';
import Update from '../components/update';
import fmtDate from '../components/util/fmtDate';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

export const query = graphql`
  query StatusQuery($twtId: String!) {
    airtable(fields: { twtId: { eq: $twtId } }) {
      data {
        date
        tweet
        url
      }
      fields {
        twtId
      }
    }
  }
`;

const Status = ({ data, location }) => {
  const {
    airtable: {
      data: { date, tweet, url },
      fields: { twtId },
    },
  } = data;

  return (
    <Layout pageTitle={`Posted on ${fmtDate(date).micro}`} location={location}>
      <section>
        <Update
          key={twtId}
          date={date}
          id={twtId}
          path={location.pathname}
          single
          tweet={tweet}
        />
      </section>
      <div className={cx(base.flex, base.justifyEnd, base.w100, main.twtLink)}>
        <a
          className={base.tdnH}
          data-testid="archive"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Link
          <span className={base.dib} aria-hidden="true">
            <LinkIcon />
          </span>
        </a>
      </div>
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
