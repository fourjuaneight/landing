import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import CleanTweet from './util/cleanTweet';
import Title from './title';
import fmtDate from './util/fmtDate';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Update = ({ date, id, single, tweet }) => (
  <article className={cx(base.w100, main.microWrap)}>
    <Link className={cx(base.dib, base.tdn)} to={`/microblog/${id}`}>
      {single ? (
        <Title>
          <span className={main.sr}>Published </span>
          {fmtDate(date).micro}
        </Title>
      ) : (
        <h2 className={base.pa0}>
          <span className={main.sr}>Published </span>
          {fmtDate(date).micro}
        </h2>
      )}
    </Link>
    <CleanTweet string={tweet} />
  </article>
);

Update.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  single: PropTypes.string,
  tweet: PropTypes.string.isRequired,
};

Update.defaultProps = {
  single: null,
};

export default Update;
