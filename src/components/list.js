import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import cx from 'classnames';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const List = ({ data, short }) => {
  return (
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
          { [main.list2]: short }
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
            { [main.listItem2]: short },
            main.listHeader
          )}
        >
          <p className={base.ma0}>Title</p>
          {!short && <p className={base.ma0}>Creator</p>}
          <p className={base.ma0}>Category</p>
        </li>
        {/* eslint-disable-next-line react/prop-types */}
        {data.map(item => {
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
                  { [main.listItem2]: short }
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
                {!short && <p className={base.ma0}>{item.creator}</p>}
                <p className={base.ma0}>{category}</p>
              </li>
            </LazyLoad>
          );
        })}
      </ul>
    </section>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  short: PropTypes.bool,
};

List.defaultProps = {
  short: false,
};

export default List;
