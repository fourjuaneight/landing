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
      <div className={cx(base.flex, base.justifyEnd, base.w100, main.twtLink)}>
        <a
          className={base.tdnH}
          data-testid="archive"
          href={`https://twitter.com/fourjuaneight/status/${id}`}
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
