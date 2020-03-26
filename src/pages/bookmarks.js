import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import Layout from '../components/layout';
import Title from '../components/title';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Posts = ({ location }) => {
  const {
    erebor: { bookmarks },
  } = useStaticQuery(graphql`
    query BookmarksQuery {
      erebor {
        bookmarks(order_by: { category: asc, creator: asc, title: asc }) {
          category
          creator
          id
          title
          url
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Bookmarks" location={location}>
      <Title>Bookmarks</Title>
      <section className={cx(base.w100, main.bookmarks)}>
        <ul
          className={cx(
            base.flex,
            base.flexColumn,
            base.itemsStart,
            base.justifyStart,
            base.ma0,
            base.pa0,
            base.w100,
            main.bookmarksList
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
              main.bookmarksItem,
              main.bookmarksHeader
            )}
          >
            <p className={base.ma0}>Title</p>
            <p className={base.ma0}>Creator</p>
            <p className={base.ma0}>Category</p>
          </li>
          {bookmarks.map(item => {
            const { category, creator, id, title, url } = item;
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
                    main.bookmarksItem
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
                  <p className={base.ma0}>{creator}</p>
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

Posts.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Posts;
