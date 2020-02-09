import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import A11yEmoji from './a11yEmoji';
import CleanTweet from './util/cleanTweet';
import fmtDate from './util/fmtDate';

import base from '../styles/base.module.css';
import color from '../styles/color.module.css';
import main from '../styles/main.module.css';

const Tweet = ({ date, favorited, id, list, retweeted, tweet }) => (
  <article className={cx(base.w100, main.tweetWrap)}>
    <CleanTweet string={tweet} />
    <section
      className={cx(
        base.flex,
        base.itemsCenter,
        base.justifyStart,
        base.w100,
        main.metaWrap
      )}
    >
      {list && (
        <p className={cx(main.meta, main.mainTweet)}>
          <A11yEmoji symbol="🔗" />
          <Link className={color.primary} to={`/status/${id}`}>
            Permalink
          </Link>
        </p>
      )}
      <p className={cx(main.meta, main.mainTweet)}>
        <A11yEmoji symbol="↗️" />
        <a
          className={color.primary}
          href={`https://twitter.com/fourjuaneight/status/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </p>
      <p className={cx(main.meta, main.mainTweet)}>
        <span className={main.sr}>Retweets</span>
        <A11yEmoji symbol="♻️" label="Retweeted" />
        {retweeted}
      </p>
      <p className={cx(main.meta, main.mainTweet)}>
        <span className={main.sr}>Favorites</span>
        <A11yEmoji symbol="❤️" label="Favorited" />
        {favorited}
      </p>
      <p className={cx(main.meta, main.mainTweet)}>
        <A11yEmoji symbol="📆" label="Posted" />
        <time dateTime={fmtDate(date).iso}>{fmtDate(date).standard}</time>
      </p>
    </section>
  </article>
);

Tweet.propTypes = {
  date: PropTypes.string.isRequired,
  favorited: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  list: PropTypes.bool,
  retweeted: PropTypes.number.isRequired,
  tweet: PropTypes.string.isRequired,
};

Tweet.defaultProps = {
  list: false,
};

export default Tweet;
