import React from 'react';
import PropTypes from 'prop-types';

import base from '../styles/base.module.css';

const Title = ({ text }) => <h1 className={base.relative}>{text}</h1>;

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
