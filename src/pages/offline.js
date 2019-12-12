import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import { ErrSubtitle, ErrTitle, ErrWrap } from '../components/util/styleEl';

const Offline = ({ location }) => (
  <Layout location={location}>
    <ErrWrap>
      <ErrTitle>Looks like you're offline.</ErrTitle>
      <ErrSubtitle>
        Head back to the pages you've already visiting, which should work
        offline.
      </ErrSubtitle>
    </ErrWrap>
  </Layout>
);

Offline.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Offline;
