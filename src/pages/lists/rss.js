import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import Layout from '../../components/layout';
import Title from '../../components/title';

import base from '../../styles/base.module.css';
import main from '../../styles/main.module.css';

const RSS = ({ location }) => {
  const {
    erebor: { rss },
  } = useStaticQuery(graphql`
    query RSSQuery {
      erebor {
        rss(order_by: { category: asc, title: asc }) {
          category
          id
          title
          url
        }
      }
    }
  `);

  return (
    <Layout pageTitle="RSS List" location={location}>
      <Title>RSS</Title>
      <section className={cx(base.w100, main.listMain)}>
        <ul
          className={cx(
            base.flex,
            base.flexColumn,
            base.itemsStart,
            base.justifyStart,
            base.ma0,
            base.pa0,
            base.w100,
            main.list,
            main.list2
          )}
        >
          <li
            className={cx(
              base.grid,
              base.itemsCenter,
              base.justifyBetween,
              base.ma0,
              base.pa0,
              base.w100,
              main.listItem,
              main.listItem2,
              main.listHeader
            )}
          >
            <p className={base.ma0}>Title</p>
            <p className={base.ma0}>Category</p>
          </li>
          {rss.map(item => {
            const { category, id, title, url } = item;
            return (
              <LazyLoad key={id} height={36.5} once>
                <li
                  className={cx(
                    base.grid,
                    base.itemsCenter,
                    base.justifyBetween,
                    base.ma0,
                    base.pa0,
                    base.w100,
                    main.listItem,
                    main.listItem2
                  )}
                >
                  <a
                    className={base.ma0}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                  <p className={base.ma0}>{category}</p>
                </li>
              </LazyLoad>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

RSS.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RSS;
