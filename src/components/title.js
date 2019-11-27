import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {
  absolute,
  backgroundAccent,
  bottom0,
  content,
  f2,
  left0,
  mra,
  relative,
  z1,
} from './styleUtils';

const H1 = styled.h1`
  ${f2};
  ${mra};
  ${relative};

  margin-top: 0.75rem;

  &::before {
    ${absolute};
    ${backgroundAccent};
    ${bottom0};
    ${content};
    ${left0};
    ${z1};

    height: 0.15rem;
    width: 3rem;
  }
`;

const Title = ({ text }) => <H1>{text}</H1>;

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
