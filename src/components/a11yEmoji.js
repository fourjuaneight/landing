import React from 'react';
import PropTypes from 'prop-types';

const A11yEmoji = ({ label, symbol }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

A11yEmoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string.isRequired,
};

A11yEmoji.defaultProps = {
  label: null,
};

export default A11yEmoji;
