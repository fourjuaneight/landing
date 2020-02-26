import React from 'react';
import PropTypes from 'prop-types';

const CleanTweet = ({ string }) => {
  const createMarkup = content => ({ __html: content });
  const unicode = string.replace(/U\+([a-zA-Z0-9]+)/g, '&#x$1;');
  const withAts = unicode.replace(
    /(@)([a-zA-Z0-9_]+)/g,
    '<a href="https://twitter.com/$2" target="_blank" rel="nofollow noreferrer">$1$2</a>'
  );
  const withLink = withAts.replace(
    /(https:\/\/t.co\/[a-zA-z0-9]+)/g,
    '<a href="$1" target="_blank" rel="nofollow noreferrer">$1</a>'
  );

  // eslint-disable-next-line react/no-danger
  return <p dangerouslySetInnerHTML={createMarkup(withLink)} />;
};

CleanTweet.propTypes = {
  string: PropTypes.string.isRequired,
};

export default CleanTweet;
