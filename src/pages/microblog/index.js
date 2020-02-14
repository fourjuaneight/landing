import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import Layout from '../../components/layout';
import Title from '../../components/title';
import Update from '../../components/update';

import base from '../../styles/base.module.css';
import main from '../../styles/main.module.css';

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
    <Layout pageTitle="Recent Updates" location={location}>
      <Title text="Recent Updates" />
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
      <div
        className={cx(base.flex, base.justifyEnd, base.w100, main.microArchive)}
      >
        <Link to="/microblog/archive/">
          <h3 className={base.pa0}>
            Archive
            <span className={base.dib} aria-hidden="true">
              {String.fromCharCode(8594)}
            </span>
          </h3>
        </Link>
      </div>
    </Layout>
  );
};

Microblog.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Microblog;
