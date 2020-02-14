import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import base from '../styles/base.module.css';

const Title = ({ children }) => (
  <h1 className={cx(base.relative, base.ttc)}>{children}</h1>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
