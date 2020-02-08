import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import A11yEmoji from './a11yEmoji';
import CleanTweet from './util/cleanTweet';
import { Meta, MetaWrap, Sr, TweetWrap } from './util/styleEl';
import fmtDate from './util/fmtDate';

const Tweet = ({ date, favorited, id, list, retweeted, tweet }) => (
  <TweetWrap>
    <CleanTweet string={tweet} />
    <MetaWrap tweets>
      {list && (
        <Meta>
          <A11yEmoji symbol="🔗" />
          <Link to={`/status/${id}`}>Permalink</Link>
        </Meta>
      )}
      <Meta>
        <A11yEmoji symbol="↗️" />
        <a
          href={`https://twitter.com/fourjuaneight/status/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </Meta>
      <Meta>
        <Sr>Retweets</Sr>
        <A11yEmoji symbol="♻️" label="Retweeted" />
        {retweeted}
      </Meta>
      <Meta>
        <Sr>Favorites</Sr>
        <A11yEmoji symbol="❤️" label="Favorited" />
        {favorited}
      </Meta>
      <Meta>
        <A11yEmoji symbol="📆" label="Posted" />
        <time dateTime={fmtDate(date).iso}>{fmtDate(date).standard}</time>
      </Meta>
    </MetaWrap>
  </TweetWrap>
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
