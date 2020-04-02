import React from 'react';
import PropTypes from 'prop-types';

const CleanTweet = ({ string }) => {
  const createMarkup = content => ({ __html: content });
  const unicode = string.replace(/U\+([a-z0-9]{5})/g, '&#x$1;');
  const withLink = unicode.replace(
    /(https?:\/\/?[\w/\-+:?=%.#]+\.[\w/\-+:?=%.#]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  const withAts = withLink.replace(
    /(@)([a-zA-Z0-9_]+)/g,
    '<a href="https://twitter.com/$2" target="_blank" rel="noopener noreferrer">$1$2</a>'
  );

  return <p dangerouslySetInnerHTML={createMarkup(withAts)} />;
};

CleanTweet.propTypes = {
  string: PropTypes.string.isRequired,
};

export default CleanTweet;
