import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import { ErrSubtitle, ErrTitle, ErrWrap } from '../components/util/styleEl';

const Err = ({ location }) => (
  <Layout location={location}>
    <ErrWrap>
      <ErrTitle>Page doesn't exit.</ErrTitle>
      <ErrSubtitle>
        But I guess, neither do we... What is reality, really?
      </ErrSubtitle>
    </ErrWrap>
  </Layout>
);

Err.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Err;
