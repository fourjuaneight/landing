import React from 'react';
import PropTypes from 'prop-types';

import { H1 } from './util/styleEl';

const Title = ({ text }) => <H1>{text}</H1>;

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
