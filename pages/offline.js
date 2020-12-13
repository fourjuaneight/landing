import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Offline = ({ location }) => (
  <Layout location={location}>
    <section className={base.w100}>
      <h1 className={main.errTitle}>Looks like you&rsquo;re offline.</h1>
      <h3 className={main.errSubtitle}>
        Head back to the pages you&rsquo;ve already visiting, which should work
        offline.
      </h3>
    </section>
  </Layout>
);

Offline.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Offline;
