import React from 'react';
import PropTypes from 'prop-types';

import A11yEmoji from './a11yEmoji';
import CleanTweet from './util/cleanTweet';
import { Meta, MetaWrap, Sr, TweetWrap } from './util/styleEl';

const fmtDate = date => {
  const original = date.replace(/\+00:00/g, '-05:00');
  const rawDate = new Date(original);
  const day = rawDate.toLocaleDateString('en-US', {
    day: 'numeric',
  });
  const month = rawDate.toLocaleDateString('en-US', {
    month: 'short',
  });
  const year = rawDate.toLocaleDateString('en-US', {
    year: 'numeric',
  });
  const time = rawDate.toLocaleDateString('en-US', {
    timeStyle: 'short',
  });

  const dates = {
    iso: original,
    traditional: `${month} ${day}, ${year} ${time}`,
  };

  return dates;
};

const Tweet = ({ date, favorited, id, retweeted, tweet }) => (
  <TweetWrap>
    <CleanTweet string={tweet} />
    <MetaWrap tweet>
      <Meta>
        <A11yEmoji symbol="↗️" label="link" />
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
        <A11yEmoji symbol="♻️" label="retweet" />
        {retweeted}
      </Meta>
      <Meta>
        <Sr>Favorites</Sr>
        <A11yEmoji symbol="❤️" label="favorite" />
        {favorited}
      </Meta>
      <Meta>
        <A11yEmoji symbol="📆" label="posted" />
        <time dateTime={fmtDate(date).iso}>
          <Sr>Posted on</Sr> {fmtDate(date).traditional}
        </time>
      </Meta>
    </MetaWrap>
  </TweetWrap>
);

Tweet.propTypes = {
  date: PropTypes.string.isRequired,
  favorited: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  retweeted: PropTypes.number.isRequired,
  tweet: PropTypes.string.isRequired,
};

export default Tweet;
